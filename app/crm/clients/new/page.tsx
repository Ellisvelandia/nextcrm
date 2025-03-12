import { createClient } from '@/lib/clients';
import { ClientForm } from '../components/client-form';
import { Users } from 'lucide-react';

export default function NewClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">New Client</h1>
      </div>
      
      <div className="mx-auto max-w-2xl">
        <ClientForm onSubmit={createClient} />
      </div>
    </div>
  );
} 