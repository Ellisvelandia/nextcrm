import { Users } from 'lucide-react';

export default function ClientsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>
        
        <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
      </div>
      
      <div className="relative mb-6">
        <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
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
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                      <div className="h-4 w-36 bg-muted rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                      <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                      <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 