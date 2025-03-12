
import Link from 'next/link';
import { Gem, Users, Package, ShoppingCart, Truck, BarChart3, QrCode } from 'lucide-react';

const modules = [
  {
    title: 'Customer Management',
    description: 'Manage customer profiles, preferences, and purchase history',
    icon: <Users className="h-8 w-8" />,
    href: '/crm/customers',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Inventory',
    description: 'Track jewelry items, materials, and stock levels',
    icon: <Package className="h-8 w-8" />,
    href: '/inventory/items',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'QR Scanner',
    description: 'Scan QR codes to quickly access item information',
    icon: <QrCode className="h-8 w-8" />,
    href: '/inventory/scanner',
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Point of Sale',
    description: 'Process sales, returns, and manage transactions',
    icon: <ShoppingCart className="h-8 w-8" />,
    href: '/pos',
    color: 'bg-emerald/10 text-emerald-500',
  },
  {
    title: 'Vendor Management',
    description: 'Manage suppliers, contracts, and commission rates',
    icon: <Truck className="h-8 w-8" />,
    href: '/vendors',
    color: 'bg-sapphire/10 text-sapphire-500',
  },
  {
    title: 'Analytics',
    description: 'View sales reports, inventory metrics, and business insights',
    icon: <BarChart3 className="h-8 w-8" />,
    href: '/analytics',
    color: 'bg-ruby/10 text-ruby-500',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="flex items-center justify-center mb-6 p-4 rounded-full bg-primary/10">
          <Gem className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Zafiro Jewelry Management</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Comprehensive jewelry business management system with customer tracking, inventory management, and sales processing
        </p>
      </section>

      {/* Modules grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">System Modules</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link 
              key={module.title} 
              href={module.href}
              className="flex flex-col p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-md w-fit mb-4 ${module.color}`}>
                {module.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
              <p className="text-muted-foreground">{module.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick stats */}
      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-6">Quick Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Customers</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">Inventory Items</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">Today's Sales</p>
            <p className="text-3xl font-bold">$0</p>
          </div>
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">Active Vendors</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </section>
    </div>
  );
}
