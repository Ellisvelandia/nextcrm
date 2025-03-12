import { Users } from 'lucide-react';

export default function ClientDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Client Details</h1>
        </div>
        
        <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-background border rounded-lg p-6">
            <div className="h-6 w-48 bg-muted rounded mb-6 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <div className="h-4 w-24 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-6 w-full bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-background border rounded-lg p-6">
            <div className="h-6 w-32 bg-muted rounded mb-6 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-full bg-muted rounded animate-pulse" />
              <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
          
          <div className="bg-background border rounded-lg p-6">
            <div className="h-6 w-24 bg-muted rounded mb-6 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background border rounded-lg p-6">
            <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse" />
            <div className="h-5 w-40 bg-muted rounded animate-pulse" />
          </div>
          
          <div className="bg-background border rounded-lg p-6">
            <div className="h-6 w-24 bg-muted rounded mb-4 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-8 w-24 bg-muted rounded-full animate-pulse" />
              ))}
            </div>
          </div>
          
          <div className="bg-background border rounded-lg p-6">
            <div className="h-6 w-36 bg-muted rounded mb-6 animate-pulse" />
            
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="h-4 w-32 bg-muted rounded mb-3 animate-pulse" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 