'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { RolePermissions, Permission } from '@/lib/auth';
import { CheckCircle, XCircle } from 'lucide-react';

type PermissionDisplayProps = {
  userId: string;
};

export default function PermissionDisplay({ userId }: PermissionDisplayProps) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<RolePermissions | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createBrowserClient();
  
  useEffect(() => {
    async function fetchUserPermissions() {
      try {
        setLoading(true);
        
        // Fetch user profile with role information
        const { data: userProfile, error: profileError } = await supabase
          .from('user_profiles')
          .select(`
            *,
            employee_roles (
              id,
              name,
              permissions
            )
          `)
          .eq('id', userId)
          .single();
        
        if (profileError) {
          throw new Error(profileError.message);
        }
        
        if (!userProfile) {
          throw new Error('User profile not found');
        }
        
        setRole(userProfile.employee_roles.name);
        setPermissions(userProfile.employee_roles.permissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserPermissions();
  }, [userId, supabase]);
  
  if (loading) {
    return <div className="text-center p-4">Loading permissions...</div>;
  }
  
  if (error) {
    return <div className="text-destructive p-4">Error: {error}</div>;
  }
  
  if (!role || !permissions) {
    return <div className="text-muted-foreground p-4">No permission data available</div>;
  }
  
  // Resources to display
  const resources = [
    { key: 'clients', label: 'Clients' },
    { key: 'products', label: 'Products' },
    { key: 'vendors', label: 'Vendors' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'users', label: 'Users' }
  ];
  
  // Actions to display
  const actions: Array<keyof Permission> = ['read', 'create', 'update', 'delete'];
  
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Role: {role}</h3>
        <p className="text-sm text-muted-foreground">Permissions for user ID: {userId}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-2 px-3 text-left">Resource</th>
              {actions.map((action) => (
                <th key={action} className="py-2 px-3 text-left capitalize">
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.key} className="border-t hover:bg-muted/20">
                <td className="py-2 px-3 font-medium">{resource.label}</td>
                {actions.map((action) => {
                  // Get permission status or default to false
                  const hasPermission = !!permissions?.[resource.key as keyof RolePermissions]?.[action];
                  
                  return (
                    <td key={`${resource.key}-${action}`} className="py-2 px-3">
                      {hasPermission ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 