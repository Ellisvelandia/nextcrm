import { createServerClient } from './supabase';
import { Database } from './supabase';

export type Client = Database['public']['Tables']['clients']['Row'];
export type NewClient = Database['public']['Tables']['clients']['Insert'];
export type UpdateClient = Database['public']['Tables']['clients']['Update'];

/**
 * Fetches all clients from the database
 * @returns Array of clients
 */
export async function getClients() {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('last_name', { ascending: true });
    
  if (error) {
    console.error('Error fetching clients:', error);
    throw new Error('Failed to fetch clients');
  }
  
  return data;
}

/**
 * Fetches a single client by ID
 * @param id The client ID
 * @returns Client data or null if not found
 */
export async function getClientById(id: string) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error fetching client:', error);
    throw new Error('Failed to fetch client');
  }
  
  return data;
}

/**
 * Creates a new client
 * @param client The client data to insert
 * @returns The created client
 */
export async function createClient(client: NewClient) {
  const supabase = createServerClient();
  
  // Add created_at and updated_at timestamps
  const clientWithTimestamps = {
    ...client,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('clients')
    .insert(clientWithTimestamps)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating client:', error);
    throw new Error('Failed to create client');
  }
  
  return data;
}

/**
 * Updates an existing client
 * @param id The client ID
 * @param client The client data to update
 * @returns The updated client
 */
export async function updateClient(id: string, client: UpdateClient) {
  const supabase = createServerClient();
  
  // Add updated_at timestamp
  const clientWithTimestamp = {
    ...client,
    updated_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('clients')
    .update(clientWithTimestamp)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating client:', error);
    throw new Error('Failed to update client');
  }
  
  return data;
}

/**
 * Deletes a client
 * @param id The client ID
 * @returns Void
 */
export async function deleteClient(id: string) {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting client:', error);
    throw new Error('Failed to delete client');
  }
}

/**
 * Searches clients by name or email
 * @param query The search query
 * @returns Array of matching clients
 */
export async function searchClients(query: string) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
    .order('last_name', { ascending: true });
    
  if (error) {
    console.error('Error searching clients:', error);
    throw new Error('Failed to search clients');
  }
  
  return data;
} 