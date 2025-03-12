'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Client, NewClient } from '@/lib/clients';
import { X } from 'lucide-react';

// Client form schema
const clientSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  birthdate: z.string().optional().nullable(),
  preferences: z.object({
    gemstones: z.array(z.string()).optional(),
    metals: z.array(z.string()).optional(),
    styles: z.array(z.string()).optional(),
  }).optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  notes: z.string().optional().nullable(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  }).optional().nullable(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: NewClient) => Promise<void>;
}

export function ClientForm({ client, onSubmit }: ClientFormProps) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>(client?.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      ...client,
      birthdate: client?.birthdate ? new Date(client.birthdate).toISOString().split('T')[0] : null,
    },
  });
  
  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  
  const handleFormSubmit = async (data: ClientFormData) => {
    try {
      await onSubmit({
        ...data,
        tags,
      });
      router.push('/crm/clients');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      // TODO: Show error toast
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            {...register('first_name')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-destructive">{errors.first_name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            {...register('last_name')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-destructive">{errors.last_name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium">
            Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            {...register('birthdate')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="street" className="block text-sm font-medium">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            {...register('address.street')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            {...register('address.city')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium">
            State/Province
          </label>
          <input
            type="text"
            id="state"
            {...register('address.state')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        
        <div>
          <label htmlFor="postal_code" className="block text-sm font-medium">
            Postal Code
          </label>
          <input
            type="text"
            id="postal_code"
            {...register('address.postal_code')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium">
            Country
          </label>
          <input
            type="text"
            id="country"
            {...register('address.country')}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags
        </label>
        <div className="mt-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="ml-1 rounded-full p-1 hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
            placeholder="Add a tag"
            className="block w-full rounded-md border border-input bg-background px-3 py-2"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Add
          </button>
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-input px-4 py-2 hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : client ? 'Update Client' : 'Create Client'}
        </button>
      </div>
    </form>
  );
} 