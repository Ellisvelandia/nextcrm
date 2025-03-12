-- Supabase Schema for Zafiro Jewelry CRM
-- This file defines the complete database schema including tables, indexes, and RBAC configuration

-------------------------------------------
-- 1. Enable required extensions
-------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------
-- 2. Define Schema Tables
-------------------------------------------

-- USERS & AUTHENTICATION TABLES
-- Note: auth.users is automatically created by Supabase

-- Employee Roles Table
CREATE TABLE employee_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}'::JSONB
);

-- User Profile with Role Association
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role_id UUID REFERENCES employee_roles(id) NOT NULL,
  avatar_url TEXT,
  active BOOLEAN DEFAULT TRUE NOT NULL
);

-- CLIENTS (renamed from customers)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  birthdate DATE,
  preferences JSONB DEFAULT '{"gemstones": [], "metals": [], "styles": []}'::JSONB,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  notes TEXT,
  address JSONB
);

-- PRODUCTS (renamed from inventory)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  material JSONB NOT NULL DEFAULT '{"metal": null, "gemstones": []}'::JSONB,
  certifications TEXT[] DEFAULT '{}'::TEXT[],
  cost DECIMAL(10, 2) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  weight DECIMAL(10, 2),
  dimensions JSONB,
  images TEXT[] DEFAULT '{}'::TEXT[],
  location TEXT NOT NULL,
  qr_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('in_stock', 'sold', 'reserved', 'repair', 'exhibition')),
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 1,
  reorder_threshold INTEGER DEFAULT 0,
  meta_data JSONB DEFAULT '{}'::JSONB
);

-- VENDORS
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address JSONB,
  contract_terms TEXT,
  commission_rate DECIMAL(5, 2),
  payment_terms TEXT,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  notes TEXT
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  transaction_number TEXT NOT NULL UNIQUE,
  transaction_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE RESTRICT NOT NULL,
  employee_id UUID REFERENCES user_profiles(id) ON DELETE RESTRICT NOT NULL,
  items JSONB NOT NULL, -- Array of {product_id, quantity, price, discount}
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded')),
  transaction_status TEXT NOT NULL CHECK (transaction_status IN ('completed', 'refunded', 'exchanged', 'cancelled')),
  notes TEXT
);

-- PRODUCT MOVEMENTS
CREATE TABLE product_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  employee_id UUID REFERENCES user_profiles(id) ON DELETE RESTRICT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  reason TEXT NOT NULL,
  notes TEXT
);

-- AUDITING
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT
);

-------------------------------------------
-- 3. Create Indexes
-------------------------------------------
-- Products indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_vendor ON products(vendor_id);

-- Clients indexes
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_name ON clients(last_name, first_name);

-- Transactions indexes
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_employee ON transactions(employee_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_status ON transactions(transaction_status);

-- User profiles indexes
CREATE INDEX idx_user_profiles_role ON user_profiles(role_id);

-------------------------------------------
-- 4. Create Triggers for Updated_at
-------------------------------------------
-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables with updated_at
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at
BEFORE UPDATE ON vendors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_roles_updated_at
BEFORE UPDATE ON employee_roles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-------------------------------------------
-- 5. RBAC Configuration
-------------------------------------------
-- Create application roles
CREATE ROLE admin;
CREATE ROLE manager;
CREATE ROLE sales;
CREATE ROLE inventory;

-- Grant permissions to roles
-- Admin: Full access to all tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin;

-- Manager: Can read everything, and modify most tables except sensitive data
GRANT SELECT, INSERT, UPDATE ON clients, products, vendors, transactions, product_movements TO manager;
GRANT SELECT ON user_profiles, employee_roles, audit_log TO manager;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO manager;

-- Sales: Can manage clients and transactions
GRANT SELECT, INSERT, UPDATE ON clients, transactions TO sales;
GRANT SELECT ON products, vendors TO sales;
GRANT USAGE ON SEQUENCE clients_id_seq, transactions_id_seq TO sales; -- Added this line

-- Inventory: Can manage products and movements
GRANT SELECT, INSERT, UPDATE ON products, product_movements TO inventory;
GRANT SELECT ON vendors TO inventory;z
GRANT USAGE ON SEQUENCE products_id_seq, product_movements_id_seq TO inventory;

-------------------------------------------
-- 6. Row Level Security (RLS)
-------------------------------------------
-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies for each table
-- Admin has full access to all tables
CREATE POLICY admin_all_access ON clients TO admin USING (true);
CREATE POLICY admin_all_access ON products TO admin USING (true);
CREATE POLICY admin_all_access ON vendors TO admin USING (true);
CREATE POLICY admin_all_access ON transactions TO admin USING (true);
CREATE POLICY admin_all_access ON product_movements TO admin USING (true);
CREATE POLICY admin_all_access ON user_profiles TO admin USING (true);
CREATE POLICY admin_all_access ON employee_roles TO admin USING (true);
CREATE POLICY admin_all_access ON audit_log TO admin USING (true);

-- Manager policies
CREATE POLICY manager_access ON clients TO manager USING (true);
CREATE POLICY manager_access ON products TO manager USING (true);
CREATE POLICY manager_access ON vendors TO manager USING (true);
CREATE POLICY manager_access ON transactions TO manager USING (true);
CREATE POLICY manager_access ON product_movements TO manager USING (true);
CREATE POLICY manager_read_only ON user_profiles TO manager USING (true) WITH CHECK (false);
CREATE POLICY manager_read_only ON employee_roles TO manager USING (true) WITH CHECK (false);
CREATE POLICY manager_read_only ON audit_log TO manager USING (true) WITH CHECK (false);

-- Sales policies
CREATE POLICY sales_access ON clients TO sales USING (true);
CREATE POLICY sales_access ON transactions TO sales USING (true);
CREATE POLICY sales_read_only ON products TO sales USING (true) WITH CHECK (false);
CREATE POLICY sales_read_only ON vendors TO sales USING (true) WITH CHECK (false);

-- Inventory policies
CREATE POLICY inventory_access ON products TO inventory USING (true);
CREATE POLICY inventory_access ON product_movements TO inventory USING (true);
CREATE POLICY inventory_read_only ON vendors TO inventory USING (true) WITH CHECK (false);

-------------------------------------------
-- 7. Supabase Auth Configuration
-------------------------------------------
-- Create default roles in the employee_roles table
INSERT INTO employee_roles (name, description, permissions) VALUES 
('Admin', 'System administrators with full access', '{"clients": {"read": true, "create": true, "update": true, "delete": true}, "products": {"read": true, "create": true, "update": true, "delete": true}, "vendors": {"read": true, "create": true, "update": true, "delete": true}, "transactions": {"read": true, "create": true, "update": true, "delete": true}, "users": {"read": true, "create": true, "update": true, "delete": true}}'),
('Manager', 'Store managers with broad access but limited user management', '{"clients": {"read": true, "create": true, "update": true, "delete": false}, "products": {"read": true, "create": true, "update": true, "delete": false}, "vendors": {"read": true, "create": true, "update": true, "delete": false}, "transactions": {"read": true, "create": true, "update": true, "delete": false}, "users": {"read": true, "create": false, "update": false, "delete": false}}'),
('Sales', 'Sales staff with client and transaction access', '{"clients": {"read": true, "create": true, "update": true, "delete": false}, "products": {"read": true, "create": false, "update": false, "delete": false}, "vendors": {"read": true, "create": false, "update": false, "delete": false}, "transactions": {"read": true, "create": true, "update": true, "delete": false}, "users": {"read": false, "create": false, "update": false, "delete": false}}'),
('Inventory', 'Inventory staff with product management access', '{"clients": {"read": false, "create": false, "update": false, "delete": false}, "products": {"read": true, "create": true, "update": true, "delete": false}, "vendors": {"read": true, "create": false, "update": false, "delete": false}, "transactions": {"read": false, "create": false, "update": false, "delete": false}, "users": {"read": false, "create": false, "update": false, "delete": false}}');

-- Create function to handle user registration and role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  default_role_id UUID;
BEGIN
  -- Get the default role (Sales in this case)
  SELECT id INTO default_role_id FROM employee_roles WHERE name = 'Sales' LIMIT 1;
  
  -- Create a new profile with the default role
  INSERT INTO user_profiles (id, first_name, last_name, email, role_id)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''), 
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    default_role_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  role_name TEXT;
BEGIN
  SELECT er.name INTO role_name
  FROM user_profiles up
  JOIN employee_roles er ON up.role_id = er.id
  WHERE up.id = user_id;
  
  RETURN role_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a user has a specific permission
CREATE OR REPLACE FUNCTION public.user_has_permission(user_id UUID, resource TEXT, action TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_permissions JSONB;
BEGIN
  SELECT er.permissions INTO user_permissions
  FROM user_profiles up
  JOIN employee_roles er ON up.role_id = er.id
  WHERE up.id = user_id;
  
  RETURN COALESCE(user_permissions->resource->action, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 