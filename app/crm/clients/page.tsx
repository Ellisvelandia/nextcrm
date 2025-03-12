import Link from 'next/link';
import { getClients } from '@/lib/clients';
import { formatDistance } from 'date-fns';
import { Users, UserPlus, Search, Phone, Mail, Calendar, Edit, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const clients = await getClients();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>
        
        <Link 
          href="/crm/clients/new" 
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Client</span>
        </Link>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="search"
          placeholder="Search clients..."
          className="block w-full p-2 pl-10 text-sm border rounded-lg bg-background border-input"
        />
      </div>
      
      <div className="bg-background border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Contact</th>
                <th scope="col" className="px-6 py-3">Tags</th>
                <th scope="col" className="px-6 py-3">Added</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr className="border-b">
                  <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                    No clients found. Add your first client to get started.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">
                      <Link href={`/crm/clients/${client.id}`} className="hover:underline">
                        {client.first_name} {client.last_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" /> 
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" /> 
                          <span>{client.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {client.tags && client.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {client.tags.map((tag: string, index: number) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span title={client.created_at}>
                          {formatDistance(new Date(client.created_at), new Date(), { addSuffix: true })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/crm/clients/${client.id}/edit`}
                          className="p-2 rounded-md hover:bg-muted"
                          title="Edit client"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          className="p-2 rounded-md hover:bg-destructive/10 hover:text-destructive"
                          title="Delete client"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}