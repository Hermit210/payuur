// Soluma Event Platform - Solana Program
use anchor_lang::prelude::*;

declare_id!("CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr");

#[program]
pub mod soluma {
    use super::*;

    /// Initialize a new event
    pub fn initialize_event(
        ctx: Context<InitializeEvent>,
        title: String,
        description: String,
        price_lamports: u64,
        capacity: u32,
        starts_at: i64,
        ends_at: i64,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;
        event.organizer = ctx.accounts.organizer.key();
        event.title = title;
        event.description = description;
        event.price_lamports = price_lamports;
        event.capacity = capacity;
        event.tickets_sold = 0;
        event.starts_at = starts_at;
        event.ends_at = ends_at;
        event.is_active = true;
        event.bump = ctx.bumps.event;
        
        msg!("Event initialized: {}", event.title);
        Ok(())
    }

    /// Purchase ticket
    pub fn purchase_ticket(ctx: Context<PurchaseTicket>) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let ticket = &mut ctx.accounts.ticket;
        
        // Check event capacity
        require!(event.tickets_sold < event.capacity, EventError::EventSoldOut);
        require!(event.is_active, EventError::EventInactive);
        
        // Transfer payment
        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.buyer.key(),
            &event.organizer,
            event.price_lamports,
        );
        
        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                ctx.accounts.buyer.to_account_info(),
                ctx.accounts.organizer_account.to_account_info(),
            ],
        )?;

        // Create ticket
        ticket.event = event.key();
        ticket.buyer = ctx.accounts.buyer.key();
        ticket.purchase_time = Clock::get()?.unix_timestamp;
        ticket.is_used = false;
        ticket.ticket_id = event.tickets_sold;
        ticket.bump = ctx.bumps.ticket;
        
        // Update event stats
        event.tickets_sold += 1;
        
        msg!("Ticket purchased for event: {} by: {}", event.title, ctx.accounts.buyer.key());
        Ok(())
    }

    /// Check-in ticket
    pub fn check_in_ticket(ctx: Context<CheckInTicket>) -> Result<()> {
        let ticket = &mut ctx.accounts.ticket;
        
        require!(!ticket.is_used, EventError::TicketAlreadyUsed);
        
        ticket.is_used = true;
        ticket.check_in_time = Some(Clock::get()?.unix_timestamp);
        
        msg!("Ticket checked in: {} for event: {}", ticket.ticket_id, ticket.event);
        Ok(())
    }

    /// Update event capacity
    pub fn update_event_capacity(
        ctx: Context<UpdateEventCapacity>,
        new_capacity: u32,
    ) -> Result<()> {
        let event = &mut ctx.accounts.event;
        
        require!(
            ctx.accounts.organizer.key() == event.organizer,
            EventError::UnauthorizedOrganizer
        );
        
        event.capacity = new_capacity;
        
        msg!("Event capacity updated to: {}", new_capacity);
        Ok(())
    }

    /// Get event stats
    pub fn get_event_stats(ctx: Context<GetEventStats>) -> Result<EventStats> {
        let event = &ctx.accounts.event;
        
        Ok(EventStats {
            tickets_sold: event.tickets_sold,
            capacity: event.capacity,
            revenue: event.tickets_sold as u64 * event.price_lamports,
            is_active: event.is_active,
        })
    }
}

// Account Structures
#[account]
pub struct Event {
    pub organizer: Pubkey,
    pub title: String,
    pub description: String,
    pub price_lamports: u64,
    pub capacity: u32,
    pub tickets_sold: u32,
    pub starts_at: i64,
    pub ends_at: i64,
    pub is_active: bool,
    pub bump: u8,
}

#[account]
pub struct Ticket {
    pub event: Pubkey,
    pub buyer: Pubkey,
    pub ticket_id: u32,
    pub purchase_time: i64,
    pub check_in_time: Option<i64>,
    pub is_used: bool,
    pub bump: u8,
}

// Context Structures
#[derive(Accounts)]
#[instruction(title: String)]
pub struct InitializeEvent<'info> {
    #[account(
        init,
        payer = organizer,
        space = 8 + 32 + 4 + title.len() + 4 + 200 + 8 + 4 + 4 + 8 + 8 + 1 + 1,
        seeds = [b"event", organizer.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub event: Account<'info, Event>,
    
    #[account(mut)]
    pub organizer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PurchaseTicket<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    
    #[account(
        init,
        payer = buyer,
        space = 8 + 32 + 32 + 4 + 8 + 9 + 1 + 1,
        seeds = [b"ticket", event.key().as_ref(), buyer.key().as_ref()],
        bump
    )]
    pub ticket: Account<'info, Ticket>,
    
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    /// CHECK: This is the organizer's account to receive payment
    #[account(mut)]
    pub organizer_account: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CheckInTicket<'info> {
    #[account(mut)]
    pub ticket: Account<'info, Ticket>,
    
    pub organizer: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateEventCapacity<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    
    pub organizer: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetEventStats<'info> {
    pub event: Account<'info, Event>,
}

// Return Types
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct EventStats {
    pub tickets_sold: u32,
    pub capacity: u32,
    pub revenue: u64,
    pub is_active: bool,
}

// Error Types
#[error_code]
pub enum EventError {
    #[msg("Event is sold out")]
    EventSoldOut,
    #[msg("Event is not active")]
    EventInactive,
    #[msg("Ticket has already been used")]
    TicketAlreadyUsed,
    #[msg("Unauthorized organizer")]
    UnauthorizedOrganizer,
}
