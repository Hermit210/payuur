// Real-time event updates using WebSockets
import { useState, useEffect } from 'react';
import { EventDoc, OrderDoc } from '../types/ticketing';

export class RealtimeEventUpdates {
  private ws: WebSocket | null = null;
  private eventId: string;
  private callbacks: {
    onTicketSold?: (order: OrderDoc) => void;
    onCapacityUpdate?: (remaining: number) => void;
    onEventUpdate?: (event: EventDoc) => void;
  } = {};

  constructor(eventId: string) {
    this.eventId = eventId;
  }

  connect() {
    // In a real implementation, this would connect to your WebSocket server
    this.ws = new WebSocket(`wss://your-websocket-server.com/events/${this.eventId}`);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'TICKET_SOLD':
          this.callbacks.onTicketSold?.(data.order);
          break;
        case 'CAPACITY_UPDATE':
          this.callbacks.onCapacityUpdate?.(data.remaining);
          break;
        case 'EVENT_UPDATE':
          this.callbacks.onEventUpdate?.(data.event);
          break;
      }
    };
  }

  onTicketSold(callback: (order: OrderDoc) => void) {
    this.callbacks.onTicketSold = callback;
  }

  onCapacityUpdate(callback: (remaining: number) => void) {
    this.callbacks.onCapacityUpdate = callback;
  }

  onEventUpdate(callback: (event: EventDoc) => void) {
    this.callbacks.onEventUpdate = callback;
  }

  disconnect() {
    this.ws?.close();
  }
}

// Real-time ticket sales counter
export const useRealtimeTicketSales = (eventId: string) => {
  const [ticketsSold, setTicketsSold] = useState(0);
  const [recentSales, setRecentSales] = useState<OrderDoc[]>([]);

  useEffect(() => {
    const realtime = new RealtimeEventUpdates(eventId);
    
    realtime.onTicketSold((order) => {
      setTicketsSold((prev: number) => prev + order.qty);
      setRecentSales((prev: OrderDoc[]) => [order, ...prev.slice(0, 9)]); // Keep last 10
    });

    realtime.connect();
    
    return () => realtime.disconnect();
  }, [eventId]);

  return { ticketsSold, recentSales };
};