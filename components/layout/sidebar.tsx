'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/components/providers/sidebar-provider';
import { cn } from '@/lib/utils';
import {
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  QrCode,
  LogOut,
  Gem,
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  module: string;
};

const navItems: NavItem[] = [
  // ZafiroCRM Module
  {
    title: 'Customers',
    href: '/crm/customers',
    icon: <Users className="h-5 w-5" />,
    module: 'crm',
  },
  
  // ZafiroStock Module
  {
    title: 'Inventory',
    href: '/inventory/items',
    icon: <Package className="h-5 w-5" />,
    module: 'inventory',
  },
  {
    title: 'QR Scanner',
    href: '/inventory/scanner',
    icon: <QrCode className="h-5 w-5" />,
    module: 'inventory',
  },
  
  // ZafiroPOS Module
  {
    title: 'Point of Sale',
    href: '/pos',
    icon: <ShoppingCart className="h-5 w-5" />,
    module: 'pos',
  },
  
  // ZafiroVendors Module
  {
    title: 'Vendors',
    href: '/vendors',
    icon: <Truck className="h-5 w-5" />,
    module: 'vendors',
  },
  
  // Analytics
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    module: 'analytics',
  },
  
  // Settings
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
    module: 'settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background transition-transform lg:static lg:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Gem className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">Zafiro</span>
        </div>
        
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Modules
            </h3>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="border-t p-4">
          <button className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}