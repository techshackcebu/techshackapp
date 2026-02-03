import { useState } from 'react';
import { supabase } from '../lib/supabase';

const IntakeScreen = () => {
  const [formData, setFormData] = useState({ name: '', mobile: '', device: 'Desktop' as 'Laptop' | 'Desktop' | 'Console', issues: [] as string[] });

  const handleFinalizeTicket = async () => {
    let { data: customer } = await supabase.from('customers').select('id').eq('mobile_number', formData.mobile).single();
    if (!customer) {
      const { data: newCustomer } = await supabase.from('customers').insert({ name: formData.name, mobile_number: formData.mobile }).select('id').single();
      customer = newCustomer;
    }
    await supabase.from('tickets').insert({ customer_id: customer!.id, device_type: formData.device, issue_list: formData.issues });
    alert('Ticket created!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">New Ticket Intake</h2>
      <div className="space-y-3">
        <input className="w-full p-3 border rounded-lg" placeholder="Customer Name" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input className="w-full p-3 border rounded-lg" placeholder="Mobile Number" onChange={e => setFormData({...formData, mobile: e.target.value})} />
        <button onClick={handleFinalizeTicket} className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold">FINALIZE TICKET</button>
      </div>
    </div>
  );
};
export default IntakeScreen;
