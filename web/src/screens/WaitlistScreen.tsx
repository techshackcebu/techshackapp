import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Ticket {
  id: string;
  customer: {
    name: string;
  };
  issue_list: string[];
}

const WaitlistScreen = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data } = await supabase
        .from('tickets')
        .select(`id, issue_list, customer:customers(name)`)
        .eq('status', 'waitlist');
      setTickets(data || []);
    };
    fetchTickets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Waitlist</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white p-4 rounded-lg shadow mb-3">
          <h3 className="font-bold text-lg">{ticket.customer?.name || 'N/A'}</h3>
          <p className="text-gray-600">{ticket.issue_list.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default WaitlistScreen;
