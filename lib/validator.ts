import { z } from 'zod';

export const validationSchema = z.object({
  title: z.string().min(3).max(256),
  description: z.string().min(5),
  category: z.string().min(3).max(256),
  image: z.string().url(),
  pitch: z.string().min(10),
});
