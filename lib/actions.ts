'use server';
import { auth } from '@/auth';
import { writeClient } from '@/sanity/lib/write-client';
import slugify from 'slugify';

export const createPitch = async (data: FormData) => {
  const session = await auth();

  if (!session) return;

  const slug = slugify(data.get('title') as string, {
    lower: true,
    strict: true,
  });
  const newStartUp = {
    title: data.get('title'),
    slug: {
      _type: slug,
      current: slug,
    },
    author: {
      _type: 'reference',
      _ref: session.id,
    },
    category: data.get('category'),
    views: 0,
    description: data.get('description'),
    image: data.get('image'),
    pitch: data.get('pitch'),
  };

  try {
    const result = await writeClient.create({
      _type: 'startup',
      ...newStartUp,
    });

    return { startup: result, error: '', status: 'SUCCESS' };
  } catch (err) {
    return { error: JSON.stringify(err), status: 'SUCCESS' };
  }
};
