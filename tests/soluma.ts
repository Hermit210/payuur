import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Soluma } from "../target/types/soluma";
import { expect } from "chai";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { it } from "node:test";
import { it } from "node:test";
import { it } from "node:test";
import { it } from "node:test";
import { it } from "node:test";
import { it } from "node:test";
import { it } from "node:test";
import { it } from "node:test";
import { before } from "node:test";
import { describe } from "node:test";

describe("Soluma", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Soluma as Program<Soluma>;
  
  // Test accounts
  const organizer = Keypair.generate();
  const buyer = Keypair.generate();
  
  // Event details
  const eventTitle = "Web3 Summit 2024";
  const eventDescription = "The biggest Web3 event of the year";
  const priceInLamports = anchor.web3.LAMPORTS_PER_SOL * 0.1; // 0.1 SOL
  const capacity = 100;
  const startsAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  const endsAt = startsAt + 86400; // 24 hours later

  let eventPda: PublicKey;
  let ticketPda: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(
      organizer.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    
    await provider.connection.requestAirdrop(
      buyer.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );

    // Wait for airdrops to confirm
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Derive PDAs
    [eventPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("event"), organizer.publicKey.toBuffer(), Buffer.from(eventTitle)],
      program.programId
    );

    [ticketPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("ticket"), eventPda.toBuffer(), buyer.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Initializes an event", async () => {
    const tx = await program.methods
      .initializeEvent(
        eventTitle,
        eventDescription,
        new anchor.BN(priceInLamports),
        capacity,
        new anchor.BN(startsAt),
        new anchor.BN(endsAt)
      )
      .accounts({
        event: eventPda,
        organizer: organizer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([organizer])
      .rpc();

    console.log("Initialize event transaction signature:", tx);

    // Fetch the event account
    const eventAccount = await program.account.event.fetch(eventPda);
    
    expect(eventAccount.title).to.equal(eventTitle);
    expect(eventAccount.description).to.equal(eventDescription);
    expect(eventAccount.organizer.toString()).to.equal(organizer.publicKey.toString());
    expect(eventAccount.priceInLamports.toNumber()).to.equal(priceInLamports);
    expect(eventAccount.capacity).to.equal(capacity);
    expect(eventAccount.ticketsSold).to.equal(0);
    expect(eventAccount.isActive).to.be.true;
  });

  it("Purchases a ticket", async () => {
    const organizerBalanceBefore = await provider.connection.getBalance(organizer.publicKey);
    
    const tx = await program.methods
      .purchaseTicket()
      .accounts({
        event: eventPda,
        ticket: ticketPda,
        buyer: buyer.publicKey,
        organizerAccount: organizer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([buyer])
      .rpc();

    console.log("Purchase ticket transaction signature:", tx);

    // Fetch the ticket account
    const ticketAccount = await program.account.ticket.fetch(ticketPda);
    
    expect(ticketAccount.event.toString()).to.equal(eventPda.toString());
    expect(ticketAccount.buyer.toString()).to.equal(buyer.publicKey.toString());
    expect(ticketAccount.ticketId).to.equal(0);
    expect(ticketAccount.isUsed).to.be.false;

    // Check event was updated
    const eventAccount = await program.account.event.fetch(eventPda);
    expect(eventAccount.ticketsSold).to.equal(1);

    // Check payment was transferred
    const organizerBalanceAfter = await provider.connection.getBalance(organizer.publicKey);
    expect(organizerBalanceAfter).to.be.greaterThan(organizerBalanceBefore);
  });

  it("Checks in a ticket", async () => {
    const tx = await program.methods
      .checkInTicket()
      .accounts({
        ticket: ticketPda,
        organizer: organizer.publicKey,
      })
      .signers([organizer])
      .rpc();

    console.log("Check-in ticket transaction signature:", tx);

    // Fetch the ticket account
    const ticketAccount = await program.account.ticket.fetch(ticketPda);
    
    expect(ticketAccount.isUsed).to.be.true;
    expect(ticketAccount.checkInTime).to.not.be.null;
  });

  it("Updates event capacity", async () => {
    const newCapacity = 150;
    
    const tx = await program.methods
      .updateEventCapacity(newCapacity)
      .accounts({
        event: eventPda,
        organizer: organizer.publicKey,
      })
      .signers([organizer])
      .rpc();

    console.log("Update capacity transaction signature:", tx);

    // Check event was updated
    const eventAccount = await program.account.event.fetch(eventPda);
    expect(eventAccount.capacity).to.equal(newCapacity);
  });

  it("Gets event stats", async () => {
    const stats = await program.methods
      .getEventStats()
      .accounts({
        event: eventPda,
      })
      .view();

    console.log("Event stats:", stats);
    
    expect(stats.ticketsSold).to.equal(1);
    expect(stats.capacity).to.equal(150);
    expect(stats.revenue.toNumber()).to.equal(priceInLamports);
    expect(stats.isActive).to.be.true;
  });

  // MagicBlock Ephemeral Rollup Tests
  it("Delegates event to MagicBlock ER", async () => {
    const tx = await program.methods
      .delegateEvent()
      .accounts({
        event: eventPda,
        organizer: organizer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([organizer])
      .rpc();

    console.log("Delegate event transaction signature:", tx);
  });

  it("Purchases ticket with commit via MagicBlock ER", async () => {
    const buyer2 = Keypair.generate();
    
    // Airdrop SOL to buyer2
    await provider.connection.requestAirdrop(
      buyer2.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await new Promise(resolve => setTimeout(resolve, 1000));

    const [ticket2Pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("ticket"), eventPda.toBuffer(), buyer2.publicKey.toBuffer()],
      program.programId
    );

    const tx = await program.methods
      .purchaseTicketAndCommit()
      .accounts({
        event: eventPda,
        ticket: ticket2Pda,
        buyer: buyer2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([buyer2])
      .rpc();

    console.log("Purchase ticket and commit transaction signature:", tx);

    // Verify ticket was created
    const ticketAccount = await program.account.ticket.fetch(ticket2Pda);
    expect(ticketAccount.buyer.toString()).to.equal(buyer2.publicKey.toString());
    expect(ticketAccount.isUsed).to.be.false;
  });

  it("Undelegates event from MagicBlock ER", async () => {
    const tx = await program.methods
      .undelegateEvent()
      .accounts({
        event: eventPda,
        organizer: organizer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([organizer])
      .rpc();

    console.log("Undelegate event transaction signature:", tx);
  });
});