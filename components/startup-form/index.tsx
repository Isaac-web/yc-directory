'use client';

import React, { useActionState, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { validationSchema } from '@/lib/validator';
import { z } from 'zod';
import { createPitch } from '@/lib/actions';
import { Startup } from '@/sanity/sanity.types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const StartupForm = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState('');
  const router = useRouter();

  const handleCreateStartup = async (prevState: any, formData: FormData) => {
    try {
      formData.set('pitch', pitch);
      const formValues = {
        title: formData.get('title') || '',
        description: formData.get('description') || '',
        category: formData.get('category') || '',
        image: formData.get('image') || '',
        pitch: formData.get('pitch'),
      };

      await validationSchema.parseAsync(formValues);

      const { startup, status } = (await createPitch(formData)) as {
        error: string;
        status: string;
        startup?: Startup;
      };

      if (status === 'SUCCESS') {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Your startup pitch has been created successfully',
        });
        router.replace(`/startups/${startup?._id}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Validation failed.',
        });
        return { ...prevState, status: 'ERROR', error: 'Validation failed.' };
      }

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });

      return {
        ...prevState,
        status: 'ERROR',
        error: 'An unexpected error occured.',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleCreateStartup, {
    error: '',
    status: 'INITIAL',
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          className="startup-form_input w-full"
          id="title"
          name="title"
          placeholder="Startup title..."
        />
        {errors.title && (
          <p className="startup-form_error">{errors.title[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <textarea
          className="startup-form_textarea w-full"
          id="description"
          name="description"
          placeholder="Startup description..."
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          className="startup-form_input w-full"
          id="category"
          name="category"
          placeholder="Startup category (EdTech, Robotics, Health, AI, ...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Image
        </label>
        <Input
          className="startup-form_input w-full"
          id="image"
          name="image"
          placeholder="Please provide a valid image url..."
        />
        {errors.image && <p className="startup-form_error">{errors.image}</p>}
      </div>

      <div>
        <MDEditor
          data-color-mode="light"
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder:
              'Briefly describe your idea and what problem it solves',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <div>
        <Button
          type="submit"
          className="startup-form_btn text-white"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit Your Pitch'}
          <Send className="size-6 ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default StartupForm;
