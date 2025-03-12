# Zafiro CRM Database Schema and RBAC Configuration

This document provides an overview of the database schema and Role-Based Access Control (RBAC) configuration for the Zafiro CRM system.

## Database Tables

### Core Entities

#### 1. Clients
Stores information about customers of the jewelry business.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| first_name | TEXT | Client's first name |
| last_name | TEXT | Client's last name |
| email | TEXT | Unique email address |
| phone | TEXT | Contact phone number |
| birthdate | DATE | Client's date of birth |
| preferences | JSONB | Preferences for gemstones, metals, styles |
| tags | TEXT[] | Custom categorization tags |
| notes | TEXT | Additional notes about the client |
| address | JSONB | Structured address information |

#### 2. Products
Inventory of jewelry items available for sale.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| sku | TEXT | Unique stock keeping unit |
| name | TEXT | Product name |
| description | TEXT | Detailed description |
| category | TEXT | Product category |
| material | JSONB | Metals and gemstones used |
| certifications | TEXT[] | Any product certifications |
| cost | DECIMAL | Cost price |
| price | DECIMAL | Retail price |
| weight | DECIMAL | Weight in grams |
| dimensions | JSONB | Product dimensions |
| images | TEXT[] | Array of image URLs |
| location | TEXT | Storage location |
| qr_code | TEXT | Unique QR code identifier |
| status | TEXT | Current product status |
| vendor_id | UUID | Foreign key to vendors |
| stock_quantity | INTEGER | Current stock level |
| reorder_threshold | INTEGER | Level at which to reorder |
| meta_data | JSONB | Additional metadata |

#### 3. Vendors
Information about suppliers and artisans.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| name | TEXT | Vendor company name |
| contact_name | TEXT | Primary contact person |
| email | TEXT | Contact email |
| phone | TEXT | Contact phone |
| address | JSONB | Structured address |
| contract_terms | TEXT | Terms of agreement |
| commission_rate | DECIMAL | Commission percentage |
| payment_terms | TEXT | Payment terms |
| active | BOOLEAN | Whether vendor is active |
| notes | TEXT | Additional notes |

#### 4. Transactions
Records of sales and other transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| transaction_number | TEXT | Unique transaction ID |
| transaction_date | TIMESTAMPTZ | When transaction occurred |
| client_id | UUID | Foreign key to clients |
| employee_id | UUID | Foreign key to user_profiles |
| items | JSONB | Array of items in transaction |
| subtotal | DECIMAL | Sum before tax/discounts |
| tax | DECIMAL | Tax amount |
| discount | DECIMAL | Total discounts applied |
| total | DECIMAL | Final transaction amount |
| payment_method | TEXT | Method of payment |
| payment_status | TEXT | Current payment status |
| transaction_status | TEXT | Overall transaction status |
| notes | TEXT | Additional notes |

### Supporting Entities

#### 5. Product Movements
Tracks physical movement of inventory items.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation timestamp |
| product_id | UUID | Foreign key to products |
| from_location | TEXT | Original location |
| to_location | TEXT | New location |
| employee_id | UUID | Who moved the item |
| quantity | INTEGER | Quantity moved |
| reason | TEXT | Reason for movement |
| notes | TEXT | Additional notes |

#### 6. Audit Log
Records all significant changes for compliance and security.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | When action occurred |
| user_id | UUID | Who performed the action |
| action | TEXT | Type of action |
| table_name | TEXT | Affected table |
| record_id | UUID | Affected record ID |
| old_data | JSONB | Previous state |
| new_data | JSONB | New state |
| ip_address | TEXT | IP address |

### Authentication & Authorization

#### 7. Employee Roles
Defines roles and their permissions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| name | TEXT | Role name (Admin, Manager, etc.) |
| description | TEXT | Role description |
| permissions | JSONB | Granular permission object |

#### 8. User Profiles
Extended user information with role association.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, links to auth.users |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| first_name | TEXT | User's first name |
| last_name | TEXT | User's last name |
| email | TEXT | User's email |
| phone | TEXT | Contact phone |
| role_id | UUID | Foreign key to employee_roles |
| avatar_url | TEXT | Profile picture URL |
| active | BOOLEAN | Account status |

## Indexes

- **Products**: Indexes on SKU, status, and vendor_id
- **Clients**: Indexes on email and name
- **Transactions**: Indexes on client_id, employee_id, transaction_date, and status
- **User Profiles**: Index on role_id

## Role-Based Access Control (RBAC)

### Predefined Roles

1. **Admin**
   - Full access to all system features
   - Can manage users and permissions
   - Can access sensitive data
   - Can delete records

2. **Manager**
   - Can view all data
   - Can create and update most records
   - Cannot delete records or manage users
   - Read-only access to user data

3. **Sales**
   - Can manage clients and transactions
   - Read-only access to products and vendors
   - No access to user management

4. **Inventory**
   - Can manage products and movements
   - Read-only access to vendors
   - No access to clients, transactions, or users

### Permission Structure

Permissions are stored as a JSONB object in the following format:

```json
{
  "resource_name": {
    "read": boolean,
    "create": boolean,
    "update": boolean,
    "delete": boolean
  }
}
```

Resources include:
- clients
- products
- vendors
- transactions
- users

### Security Implementation

The RBAC system is implemented using multiple layers:

1. **Database-level**:
   - Row-Level Security (RLS) policies
   - Database roles with limited permissions

2. **Application-level**:
   - User role verification on routes
   - Permission checking on actions
   - Middleware for protected routes

3. **UI-level**:
   - Conditional rendering of UI elements
   - Disabled actions based on permissions

### Default Permission Matrix

| Resource | Action | Admin | Manager | Sales | Inventory |
|----------|--------|-------|---------|-------|-----------|
| clients | read | ✅ | ✅ | ✅ | ❌ |
| clients | create | ✅ | ✅ | ✅ | ❌ |
| clients | update | ✅ | ✅ | ✅ | ❌ |
| clients | delete | ✅ | ❌ | ❌ | ❌ |
| products | read | ✅ | ✅ | ✅ | ✅ |
| products | create | ✅ | ✅ | ❌ | ✅ |
| products | update | ✅ | ✅ | ❌ | ✅ |
| products | delete | ✅ | ❌ | ❌ | ❌ |
| vendors | read | ✅ | ✅ | ✅ | ✅ |
| vendors | create | ✅ | ✅ | ❌ | ❌ |
| vendors | update | ✅ | ✅ | ❌ | ❌ |
| vendors | delete | ✅ | ❌ | ❌ | ❌ |
| transactions | read | ✅ | ✅ | ✅ | ❌ |
| transactions | create | ✅ | ✅ | ✅ | ❌ |
| transactions | update | ✅ | ✅ | ✅ | ❌ |
| transactions | delete | ✅ | ❌ | ❌ | ❌ |
| users | read | ✅ | ✅ | ❌ | ❌ |
| users | create | ✅ | ❌ | ❌ | ❌ |
| users | update | ✅ | ❌ | ❌ | ❌ |
| users | delete | ✅ | ❌ | ❌ | ❌ |

## How to Use in the Application

### Checking Permissions

```typescript
// In server components
import { requirePermission } from '@/lib/auth';

// This will redirect to /unauthorized if user doesn't have permission
await requirePermission('clients', 'update');

// Or check conditionally
import { hasPermission } from '@/lib/auth';
const canUpdateClients = await hasPermission('clients', 'update');
```

### Checking Roles

```typescript
// In server components
import { requireRole, ROLES } from '@/lib/auth';

// This will redirect to /unauthorized if user doesn't have the required role
await requireRole(ROLES.ADMIN);

// Or check for multiple roles
await requireRole([ROLES.ADMIN, ROLES.MANAGER]);
```

### Protecting Routes

Use middleware or layout components to protect routes:

```typescript
// In a layout.tsx file
export default async function AdminLayout({ children }) {
  // Only Admin users can access this layout and its children
  await requireRole(ROLES.ADMIN);
  
  return <div>{children}</div>;
}
``` 