import SearchInput from '@/components/search-input';
import StartUpCard, { StartupType } from '@/components/startup-card';
import { sanityFetch } from '@/sanity/lib/live';
import { FETCH_STARTUPS_QUERY } from '@/sanity/lib/queries';
import { Startup } from '@/sanity/sanity.types';
import { SearchParams } from 'next/dist/server/request/search-params';
import React from 'react';

const HomePage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams?.query;

  const { data: startups = [] } = await sanityFetch({
    query: FETCH_STARTUPS_QUERY,
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

        <ul className="mt-7 card_grid">
          {startups.map((startup: StartupType) => (
            <StartUpCard startup={startup} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default HomePage;
