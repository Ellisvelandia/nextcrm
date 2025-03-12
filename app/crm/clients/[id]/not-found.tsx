import Link from 'next/link';
import { Users } from 'lucide-react';

export default function ClientNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Client Not Found</h1>
      </div>
      
      <div className="bg-background border rounded-lg p-6 text-center">
        <p className="text-lg text-muted-foreground mb-4">
          The client you're looking for doesn't exist or has been deleted.
        </p>
        <Link
          href="/crm/clients"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Return to Clients
        </Link>
      </div>
    </div>
  );
} 