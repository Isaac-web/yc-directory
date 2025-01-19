import { client } from '@/sanity/lib/client';
import { GET_STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import { StartupType } from '../startup-card';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';
import { Eye } from 'lucide-react';

type Props = {
  id: string;
};

const ViewsCount = async ({ id }: Props) => {
  const { views: viewsCount = 0 } = (await client
    .withConfig({ useCdn: false })
    .fetch(GET_STARTUP_BY_ID_QUERY, { id })) as StartupType;

  after(async () => {
    writeClient
      .patch(id)
      .set({ views: viewsCount + 1 })
      .commit();
  });

  return (
    <div className="fixed bottom-10 right-5 py-3 px-5 bg-primary-100 rounded-lg text-16-normal flex items-center gap-3">
      <Eye /> <span>{viewsCount}</span>
    </div>
  );
};

export default ViewsCount;
