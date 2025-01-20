import { client } from '@/sanity/lib/client';
import { GET_STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React, { Suspense } from 'react';
import StartUpCard from '../startup-card';
import { StartupType } from '../startup-card';

const UserStartups = async ({ authorId }: { authorId: string }) => {
  const startups = await client
    .withConfig({ useCdn: false })
    .fetch(GET_STARTUP_BY_AUTHOR_QUERY, { authorId });

  return (
    <>
      {startups.length ? (
        startups.map((startup: StartupType) => (
          <li>
            <StartUpCard key={startup._id} startup={startup} />
          </li>
        ))
      ) : (
        <div className="py-10">
          <p className="no-result">No startups yet.</p>
        </div>
      )}
    </>
  );
};

export default UserStartups;
