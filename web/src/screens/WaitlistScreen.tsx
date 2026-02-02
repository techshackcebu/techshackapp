import { useEffect, useState } from 'react';
import { Phone, UserCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Ticket { id: string; ticket_number: string; customer: { name: string; mobile_number: string }; device_type: string; issue_list: string[]; status: string; }

const WaitlistScreen = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
    const subscription = supabase.channel('tickets_channel').on('postgres_changes', { event: '*', table: 'tickets' }, () => { fetchTickets(); }).subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from('tickets').select(`id, ticket_number, status, device_type, issue_list, customer:customers(name, mobile_number)`).eq('status', 'waitlist').order('created_at', { ascending: true });
    if (error) console.error('Error fetching tickets:', error); else setTickets(data as any || []);
    setLoading(false);
  };
  const grabTicket = async (ticketId: string) => {
    const { error } = await supabase.from('tickets').update({ status: 'grabbed' }).eq('id', ticketId);
    if (error) alert('Error grabbing ticket');
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-4 space-y-3">
      <h2>Today's Waitlist</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white border rounded-lg p-4">
          <h3>{ticket.customer?.name}</h3>
          <p>{ticket.issue_list?.join(', ')}</p>
          <a href={`tel:${ticket.customer?.mobile_number}`}>CALL</a>
          <button onClick={() => grabTicket(ticket.id)}>GRAB</button>
        </div>
      ))}
    </div>
  );
};
export default WaitlistScreen;
