import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Types for our Supabase tables
export type Database = {
  public: {
    Tables: {
      // Role-based access control
      employee_roles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          description: string | null;
          permissions: {
            clients?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            products?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            vendors?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            transactions?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            users?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
          };
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          description?: string | null;
          permissions?: {
            clients?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            products?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            vendors?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            transactions?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            users?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
          };
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          description?: string | null;
          permissions?: {
            clients?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            products?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            vendors?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            transactions?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
            users?: { read?: boolean; create?: boolean; update?: boolean; delete?: boolean };
          };
        };
      };
      
      user_profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          role_id: string;
          avatar_url: string | null;
          active: boolean;
        };
        Insert: {
          id: string;  // Must match auth.users id
          created_at?: string;
          updated_at?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          role_id: string;
          avatar_url?: string | null;
          active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          role_id?: string;
          avatar_url?: string | null;
          active?: boolean;
        };
      };
      
      // Clients (renamed from customers)
      clients: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          birthdate: string | null;
          preferences: { gemstones?: string[]; metals?: string[]; styles?: string[] } | null;
          tags: string[] | null;
          notes: string | null;
          address: { 
            street?: string; 
            city?: string; 
            state?: string; 
            postal_code?: string; 
            country?: string; 
          } | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          birthdate?: string | null;
          preferences?: { gemstones?: string[]; metals?: string[]; styles?: string[] } | null;
          tags?: string[] | null;
          notes?: string | null;
          address?: { 
            street?: string; 
            city?: string; 
            state?: string; 
            postal_code?: string; 
            country?: string; 
          } | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          birthdate?: string | null;
          preferences?: { gemstones?: string[]; metals?: string[]; styles?: string[] } | null;
          tags?: string[] | null;
          notes?: string | null;
          address?: { 
            street?: string; 
            city?: string; 
            state?: string; 
            postal_code?: string; 
            country?: string; 
          } | null;
        };
      };
      
      // Products (renamed from inventory)
      products: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          sku: string;
          name: string;
          description: string;
          category: string;
          material: { 
            metal?: string; 
            gemstones?: { 
              type: string; 
              carat?: number; 
              clarity?: string 
            }[] 
          };
          certifications: string[] | null;
          cost: number;
          price: number;
          weight: number | null;
          dimensions: { 
            length?: number; 
            width?: number; 
            height?: number; 
            unit?: string 
          } | null;
          images: string[] | null;
          location: string;
          qr_code: string;
          status: 'in_stock' | 'sold' | 'reserved' | 'repair' | 'exhibition';
          vendor_id: string | null;
          stock_quantity: number;
          reorder_threshold: number | null;
          meta_data: Record<string, any> | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          sku: string;
          name: string;
          description: string;
          category: string;
          material: { 
            metal?: string; 
            gemstones?: { 
              type: string; 
              carat?: number; 
              clarity?: string 
            }[] 
          };
          certifications?: string[] | null;
          cost: number;
          price: number;
          weight?: number | null;
          dimensions?: { 
            length?: number; 
            width?: number; 
            height?: number; 
            unit?: string 
          } | null;
          images?: string[] | null;
          location: string;
          qr_code: string;
          status?: 'in_stock' | 'sold' | 'reserved' | 'repair' | 'exhibition';
          vendor_id?: string | null;
          stock_quantity?: number;
          reorder_threshold?: number | null;
          meta_data?: Record<string, any> | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          sku?: string;
          name?: string;
          description?: string;
          category?: string;
          material?: { 
            metal?: string; 
            gemstones?: { 
              type: string; 
              carat?: number; 
              clarity?: string 
            }[] 
          };
          certifications?: string[] | null;
          cost?: number;
          price?: number;
          weight?: number | null;
          dimensions?: { 
            length?: number; 
            width?: number; 
            height?: number; 
            unit?: string 
          } | null;
          images?: string[] | null;
          location?: string;
          qr_code?: string;
          status?: 'in_stock' | 'sold' | 'reserved' | 'repair' | 'exhibition';
          vendor_id?: string | null;
          stock_quantity?: number;
          reorder_threshold?: number | null;
          meta_data?: Record<string, any> | null;
        };
      };
      
      vendors: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          contact_name: string;
          email: string;
          phone: string;
          address: { 
            street?: string; 
            city?: string; 
            state?: string; 
            postal_code?: string; 
            country?: string 
          } | null;
          contract_terms: string | null;
          commission_rate: number | null;
          payment_terms: string | null;
          active: boolean;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          contact_name: string;
          email: string;
          phone: string;
          address?: { 
            street?: string; 
            city?: string; 
            state?: string; 
            postal_code?: string; 
            country?: string 
          } | null;
          contract_terms?: string | null;
          commission_rate?: number | null;
          payment_terms?: string | null;
          active?: boolean;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          contact_name?: string;
          email?: string;
          phone?: string;
          address?: { 
            street?: string; 
            city?: string; 
            state?: string; 
            postal_code?: string; 
            country?: string 
          } | null;
          contract_terms?: string | null;
          commission_rate?: number | null;
          payment_terms?: string | null;
          active?: boolean;
          notes?: string | null;
        };
      };
      
      transactions: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          transaction_number: string;
          transaction_date: string;
          client_id: string;
          employee_id: string;
          items: { 
            product_id: string; 
            quantity: number; 
            price: number; 
            discount?: number 
          }[];
          subtotal: number;
          tax: number;
          discount: number;
          total: number;
          payment_method: string;
          payment_status: 'pending' | 'paid' | 'partial' | 'refunded';
          transaction_status: 'completed' | 'refunded' | 'exchanged' | 'cancelled';
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          transaction_number: string;
          transaction_date?: string;
          client_id: string;
          employee_id: string;
          items: { 
            product_id: string; 
            quantity: number; 
            price: number; 
            discount?: number 
          }[];
          subtotal: number;
          tax: number;
          discount?: number;
          total: number;
          payment_method: string;
          payment_status?: 'pending' | 'paid' | 'partial' | 'refunded';
          transaction_status?: 'completed' | 'refunded' | 'exchanged' | 'cancelled';
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          transaction_number?: string;
          transaction_date?: string;
          client_id?: string;
          employee_id?: string;
          items?: { 
            product_id: string; 
            quantity: number; 
            price: number; 
            discount?: number 
          }[];
          subtotal?: number;
          tax?: number;
          discount?: number;
          total?: number;
          payment_method?: string;
          payment_status?: 'pending' | 'paid' | 'partial' | 'refunded';
          transaction_status?: 'completed' | 'refunded' | 'exchanged' | 'cancelled';
          notes?: string | null;
        };
      };
      
      product_movements: {
        Row: {
          id: string;
          created_at: string;
          product_id: string;
          from_location: string;
          to_location: string;
          employee_id: string;
          quantity: number;
          reason: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          product_id: string;
          from_location: string;
          to_location: string;
          employee_id: string;
          quantity?: number;
          reason: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          product_id?: string;
          from_location?: string;
          to_location?: string;
          employee_id?: string;
          quantity?: number;
          reason?: string;
          notes?: string | null;
        };
      };
      
      audit_log: {
        Row: {
          id: string;
          created_at: string;
          user_id: string | null;
          action: string;
          table_name: string;
          record_id: string;
          old_data: Record<string, any> | null;
          new_data: Record<string, any> | null;
          ip_address: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          action: string;
          table_name: string;
          record_id: string;
          old_data?: Record<string, any> | null;
          new_data?: Record<string, any> | null;
          ip_address?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string | null;
          action?: string;
          table_name?: string;
          record_id?: string;
          old_data?: Record<string, any> | null;
          new_data?: Record<string, any> | null;
          ip_address?: string | null;
        };
      };
    };
    Functions: {
      get_user_role: {
        Args: { user_id: string };
        Returns: string;
      };
      user_has_permission: {
        Args: { user_id: string; resource: string; action: string };
        Returns: boolean;
      };
    };
  };
};

// For server components
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient<Database>(supabaseUrl, supabaseKey);
};

// For client components
export const createBrowserClient = () => {
  return createClientComponentClient<Database>();
};