import { client } from '@/sanity/lib/client';
import { FETCH_STARTUPS_QUERY } from '@/sanity/lib/queries';
import React, { Suspense } from 'react';
import StartUpCard from '../startup-card';
import { StartupType } from '../startup-card';

const UserStartups = async () => {
  const startups = await client
    .withConfig({ useCdn: false })
    .fetch(FETCH_STARTUPS_QUERY, { search: null });

  return (
    <Suspense fallback={'Loading....'}>
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
    </Suspense>
  );
};

export default UserStartups;
