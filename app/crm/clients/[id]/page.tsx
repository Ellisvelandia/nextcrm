import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClientById } from '@/lib/clients';
import { formatDistance } from 'date-fns';
import { Users, Phone, Mail, Calendar, MapPin, Tag, Edit } from 'lucide-react';

interface ClientDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ClientDetailsPage({ params }: ClientDetailsPageProps) {
  const client = await getClientById(params.id);
  
  if (!client) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Client Details</h1>
        </div>
        
        <Link
          href={`/crm/clients/${client.id}/edit`}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Edit className="h-4 w-4" />
          <span>Edit Client</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-background border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground">Full Name</label>
                <p className="text-lg font-medium">{client.first_name} {client.last_name}</p>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${client.email}`} className="text-primary hover:underline">
                    {client.email}
                  </a>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground">Phone</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${client.phone}`} className="text-primary hover:underline">
                    {client.phone}
                  </a>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground">Birthdate</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{client.birthdate ? new Date(client.birthdate).toLocaleDateString() : '-'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {client.address && (
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Address</h2>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  {client.address.street && <p>{client.address.street}</p>}
                  <p>
                    {[
                      client.address.city,
                      client.address.state,
                      client.address.postal_code
                    ].filter(Boolean).join(', ')}
                  </p>
                  {client.address.country && <p>{client.address.country}</p>}
                </div>
              </div>
            </div>
          )}
          
          {client.notes && (
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Notes</h2>
              <p className="whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Client Since</h2>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span title={client.created_at}>
                {formatDistance(new Date(client.created_at), new Date(), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          {client.tags && client.tags.length > 0 && (
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {client.preferences && (
            <div className="bg-background border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Preferences</h2>
              
              {client.preferences.gemstones && client.preferences.gemstones.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Gemstones</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.preferences.gemstones.map((stone: string) => (
                      <span
                        key={stone}
                        className="inline-block px-2 py-1 text-xs rounded-md bg-accent"
                      >
                        {stone}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {client.preferences.metals && client.preferences.metals.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Preferred Metals</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.preferences.metals.map((metal: string) => (
                      <span
                        key={metal}
                        className="inline-block px-2 py-1 text-xs rounded-md bg-accent"
                      >
                        {metal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {client.preferences.styles && client.preferences.styles.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Style Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.preferences.styles.map((style: string) => (
                      <span
                        key={style}
                        className="inline-block px-2 py-1 text-xs rounded-md bg-accent"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 