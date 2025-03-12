import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from './supabase';

/**
 * Authentication and RBAC utilities for the Zafiro CRM system
 */

/**
 * Employee role definitions with their permissions
 */
export type Permission = {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export type RolePermissions = {
  clients?: Permission;
  products?: Permission;
  vendors?: Permission;
  transactions?: Permission;
  users?: Permission;
};

/**
 * List of available role names in the system
 */
export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  SALES: 'Sales',
  INVENTORY: 'Inventory'
} as const;

export type RoleName = typeof ROLES[keyof typeof ROLES];

/**
 * Checks if the current user is authenticated
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return {
    session,
    userId: session.user.id,
  };
}

/**
 * Gets the current user's profile including role info
 */
export async function getCurrentUser() {
  const { session, userId } = await requireAuth();
  const supabase = createServerClient();
  
  const { data: userProfile, error } = await supabase
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
  
  if (error || !userProfile) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return {
    ...userProfile,
    role: userProfile.employee_roles.name as RoleName,
    permissions: userProfile.employee_roles.permissions as RolePermissions,
  };
}

/**
 * Checks if the current user has a specific role
 * Redirects to unauthorized page if role check fails
 */
export async function requireRole(allowedRoles: RoleName | RoleName[]) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  if (!roles.includes(user.role)) {
    redirect('/unauthorized');
  }
  
  return user;
}

/**
 * Checks if the current user has a specific permission
 * Returns boolean indicating if permission is granted
 */
export async function hasPermission(resource: keyof RolePermissions, action: keyof Permission): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }
  
  return !!user.permissions?.[resource]?.[action];
}

/**
 * Requires a specific permission to access a resource
 * Redirects to unauthorized page if permission check fails
 */
export async function requirePermission(resource: keyof RolePermissions, action: keyof Permission) {
  const hasAccess = await hasPermission(resource, action);
  
  if (!hasAccess) {
    redirect('/unauthorized');
  }
  
  return true;
}

/**
 * Signs out the current user
 */
export async function signOut() {
  const cookieStore = cookies();
  const supabase = createServerClient();
  await supabase.auth.signOut();
}

/**
 * Updates a user's role
 * Only admins can perform this action
 */
export async function updateUserRole(userId: string, roleId: string) {
  const currentUser = await getCurrentUser();
  
  if (currentUser?.role !== ROLES.ADMIN) {
    throw new Error('Only administrators can update user roles');
  }
  
  const supabase = createServerClient();
  const { error } = await supabase
    .from('user_profiles')
    .update({ role_id: roleId })
    .eq('id', userId);
    
  if (error) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }
  
  return true;
} 