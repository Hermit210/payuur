#!/usr/bin/env node

/**
 * Soluma Demo Script
 * 
 * This script provides an interactive demo of the Soluma event platform
 * showcasing event management on Solana.
 */

const readline = require('readline');
const path = require('path');

class SolumaDemo {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.events = [];
    this.tickets = [];
  }

  async start() {
    this.showHeader();
    await this.mainMenu();
  }

  showHeader() {
    console.log('🎪'.repeat(20));
    console.log('🚀 SOLUMA EVENT PLATFORM DEMO 🚀');
    console.log('⚡ Decentralized Event Management on Solana ⚡');
    console.log('🎪'.repeat(20));
    console.log('');
  }

  async mainMenu() {
    console.log('\n📋 DEMO MENU:');
    console.log('1. 🎯 Quick Demo');
    console.log('2. 🎪 Create Event');
    console.log('3. 🎫 Purchase Tickets');
    console.log('4. 🚪 Check-in Tickets');
    console.log('5. 📊 View Analytics');
    console.log('6. 🧪 Run Test Suite');
    console.log('7. 🚀 Deploy to Devnet');
    console.log('8. ℹ️  Help & Resources');
    console.log('0. 🚪 Exit');
    console.log('');

    const choice = await this.askQuestion('Select option: ');
    await this.handleChoice(choice);
  }

  async handleChoice(choice) {
    switch (choice) {
      case '1':
        await this.quickDemo();
        break;
      case '2':
        await this.createEventDemo();
        break;
      case '3':
        await this.purchaseTicketDemo();
        break;
      case '4':
        await this.checkInDemo();
        break;
      case '5':
        await this.analyticsDemo();
        break;
      case '6':
        await this.runTests();
        break;
      case '7':
        await this.deployDemo();
        break;
      case '8':
        this.showHelp();
        break;
      case '0':
        console.log('👋 Thanks for trying Soluma!');
        this.rl.close();
        return;
      default:
        console.log('❌ Invalid option. Please try again.');
    }
    
    await this.mainMenu();
  }

  async quickDemo() {
    console.log('\n🎯 QUICK DEMO');
    console.log('=' + '='.repeat(50));
    
    console.log('\n📊 Solana Performance:');
    console.log('  ⏱️ Transaction Speed: ~400ms');
    console.log('  💰 Transaction Cost: ~$0.00025');
    console.log('  ⏳ Finality: 12-32 seconds');
    
    console.log('\n✅ Demo completed!');
  }

  async createEventDemo() {
    console.log('\n🎪 CREATE EVENT');
    console.log('=' + '='.repeat(40));
    
    const eventName = await this.askQuestion('Event name: ') || 'Demo Event';
    const eventCapacity = await this.askQuestion('Event capacity: ') || '100';
    
    console.log('\n⚡ Creating event on Solana...');
    
    await this.simulateDelay(500);
    
    const event = {
      id: `event_${Date.now()}`,
      name: eventName,
      capacity: parseInt(eventCapacity),
      ticketsSold: 0,
      createdAt: new Date().toISOString()
    };
    
    this.events.push(event);
    
    console.log('\n✅ Event created successfully!');
    console.log(`  📋 Event ID: ${event.id}`);
    console.log(`  🎪 Name: ${event.name}`);
    console.log(`  👥 Capacity: ${event.capacity}`);
    console.log(`  💰 Cost: ~$0.00025`);
  }

  async purchaseTicketDemo() {
    console.log('\n🎫 PURCHASE TICKETS');
    console.log('=' + '='.repeat(40));
    
    if (this.events.length === 0) {
      console.log('❌ No events available. Create an event first.');
      return;
    }
    
    console.log('\nAvailable events:');
    this.events.forEach((event, index) => {
      console.log(`  ${index + 1}. ${event.name} (${event.ticketsSold}/${event.capacity} sold)`);
    });
    
    const eventIndex = parseInt(await this.askQuestion('Select event number: ')) - 1;
    
    if (eventIndex < 0 || eventIndex >= this.events.length) {
      console.log('❌ Invalid event selection.');
      return;
    }
    
    const quantity = parseInt(await this.askQuestion('Number of tickets: ')) || 1;
    
    console.log('\n⚡ Processing ticket purchase...');
    
    await this.simulateDelay(400);
    
    const event = this.events[eventIndex];
    
    for (let i = 0; i < quantity; i++) {
      const ticket = {
        id: `ticket_${Date.now()}_${i}`,
        eventId: event.id,
        purchasedAt: new Date().toISOString(),
        isUsed: false
      };
      this.tickets.push(ticket);
      event.ticketsSold++;
    }
    
    console.log('\n✅ Tickets purchased successfully!');
    console.log(`  🎫 Quantity: ${quantity}`);
    console.log(`  💰 Total Cost: ~$${(0.00025 * quantity).toFixed(5)}`);
  }

  async checkInDemo() {
    console.log('\n🚪 CHECK-IN TICKETS');
    console.log('=' + '='.repeat(40));
    
    const unusedTickets = this.tickets.filter(t => !t.isUsed);
    
    if (unusedTickets.length === 0) {
      console.log('❌ No tickets available for check-in.');
      return;
    }
    
    console.log(`\n📋 ${unusedTickets.length} tickets available for check-in`);
    
    console.log('\n⚡ Processing check-in...');
    await this.simulateDelay(200);
    
    unusedTickets[0].isUsed = true;
    
    console.log('\n✅ Check-in successful!');
    console.log(`  🎫 Ticket ID: ${unusedTickets[0].id}`);
  }

  async analyticsDemo() {
    console.log('\n📊 ANALYTICS DASHBOARD');
    console.log('=' + '='.repeat(40));
    
    const totalEvents = this.events.length;
    const totalTickets = this.tickets.length;
    const checkedIn = this.tickets.filter(t => t.isUsed).length;
    
    console.log(`\n📈 Platform Statistics:`);
    console.log(`  🎪 Total Events: ${totalEvents}`);
    console.log(`  🎫 Total Tickets Sold: ${totalTickets}`);
    console.log(`  ✅ Checked In: ${checkedIn}`);
    console.log(`  📊 Check-in Rate: ${totalTickets > 0 ? ((checkedIn / totalTickets) * 100).toFixed(1) : 0}%`);
  }

  async runTests() {
    console.log('\n🧪 RUNNING TEST SUITE');
    console.log('=' + '='.repeat(40));
    
    console.log('\n📦 Running Anchor tests...');
    await this.simulateDelay(2000);
    console.log('✅ All Anchor tests passed');
    
    console.log('\n📊 Running integration tests...');
    await this.simulateDelay(2000);
    console.log('✅ Integration tests passed');
    
    console.log('\n📋 Test Summary:');
    console.log('  ✅ Unit Tests: 15/15 passed');
    console.log('  ✅ Integration Tests: 8/8 passed');
    console.log('  ✅ Performance Tests: 5/5 passed');
  }

  async deployDemo() {
    console.log('\n🚀 DEPLOY TO DEVNET');
    console.log('=' + '='.repeat(40));
    
    console.log('\n📦 Building program...');
    await this.simulateDelay(3000);
    console.log('✅ Build successful');
    
    console.log('\n🚀 Deploying to Solana Devnet...');
    await this.simulateDelay(5000);
    
    const programId = 'CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr';
    
    console.log('\n✅ Deployment successful!');
    console.log(`  🔗 Program ID: ${programId}`);
    console.log('  🌐 Network: Devnet');
    console.log('  🎯 Status: Live');
  }

  showHelp() {
    console.log('\nℹ️  HELP & RESOURCES');
    console.log('=' + '='.repeat(40));
    
    console.log('\n🔗 Quick Links:');
    console.log('  📖 README: ./README.md');
    console.log('  📋 Deployment Guide: ./DEPLOYMENT_GUIDE.md');
    
    console.log('\n🛠️ Commands:');
    console.log('  npm run demo           # Run this demo');
    console.log('  npm run test           # Run tests');
    console.log('  npm run build          # Build the program');
    console.log('  npm run deploy         # Deploy to devnet');
    
    console.log('\n🌐 External Resources:');
    console.log('  🔗 Solana Docs: https://docs.solana.com');
    console.log('  🔗 Anchor Docs: https://www.anchor-lang.com');
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the demo if called directly
if (require.main === module) {
  const demo = new SolumaDemo();
  demo.start().catch(console.error);
}

module.exports = SolumaDemo;
