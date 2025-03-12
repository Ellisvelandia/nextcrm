'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Bell, Search, Sun, Moon, User } from 'lucide-react';
import { useSidebar } from '@/components/providers/sidebar-provider';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { toggle } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <button
        onClick={toggle}
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </button>
      
      <div className="flex-1">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          <Link href="/">Zafiro</Link>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <form className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </form>
        
        <button className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </button>
        
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        )}
        
        <div className="relative">
          <button className="inline-flex items-center justify-center rounded-full overflow-hidden border border-primary h-8 w-8">
            <User className="h-5 w-5 text-primary" />
            <span className="sr-only">User menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}