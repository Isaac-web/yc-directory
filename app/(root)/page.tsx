import SearchInput from '@/components/search-input';
import StartUpCard, { StartupType } from '@/components/startup-card';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { FETCH_STARTUPS_QUERY } from '@/sanity/lib/queries';
import { SearchParams } from 'next/dist/server/request/search-params';
import React from 'react';

const HomePage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = (await searchParams?.query) || null;

  const { data: startups = [] } = await sanityFetch({
    query: FETCH_STARTUPS_QUERY,
    params: { search: query },
  });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          and Connect With Entrepreneurs
        </h1>
        <p className="sub-heading">
          Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competetions
        </p>

        <SearchInput query={query as string} />
      </section>

      <section className="section_container">
        <h3 className="text-30-semibold">
          {query ? `Search results for '${query}'` : 'All Startups'}
        </h3>

        {startups.length ? (
          <ul className="mt-7 card_grid">
            {startups.map((startup: StartupType) => (
              <StartUpCard startup={startup} />
            ))}
          </ul>
        ) : (
          <div className="no-result flex justify-center items-center py-10">
            <p>Looks like there are no startups...</p>
          </div>
        )}
        <SanityLive />
      </section>
    </>
  );
};

export default HomePage;
