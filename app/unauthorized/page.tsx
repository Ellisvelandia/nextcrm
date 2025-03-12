'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 mb-6">
        <ShieldAlert className="h-16 w-16 text-destructive" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        You don't have permission to access this resource.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
        
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
} 