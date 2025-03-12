import { notFound } from 'next/navigation';
import { getClientById, updateClient } from '@/lib/clients';
import { ClientForm } from '../../components/client-form';
import { Users } from 'lucide-react';

interface EditClientPageProps {
  params: {
    id: string;
  };
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const client = await getClientById(params.id);
  
  if (!client) {
    notFound();
  }
  
  const handleUpdate = async (data: any) => {
    'use server';
    await updateClient(params.id, data);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Edit Client</h1>
      </div>
      
      <div className="mx-auto max-w-2xl">
        <ClientForm client={client} onSubmit={handleUpdate} />
      </div>
    </div>
  );
} 