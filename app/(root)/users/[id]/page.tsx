import { auth } from '@/auth';
import StartUpCard, { StartupType } from '@/components/startup-card';
import UserStartups from '@/components/user-startups';
import { client } from '@/sanity/lib/client';
import {
  FETCH_STARTUPS_QUERY,
  GET_USER_BY_ID_QUERY,
} from '@/sanity/lib/queries';
import { Author } from '@/sanity/sanity.types';
import Image from 'next/image';
import React, { Suspense } from 'react';

export const experimental = true;

const UserDetailsPage = async ({
  params,
}: {
  params: { id: Promise<string> };
}) => {
  const userId = await params.id;
  const session = await auth();

  const { name, bio, username, image } = (await client.fetch(
    GET_USER_BY_ID_QUERY,
    {
      id: userId,
    }
  )) as Author;

  const startups = await client.fetch(FETCH_STARTUPS_QUERY, { search: null });

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {name}
            </h3>
          </div>
          <Image
            src={image as string}
            alt={name as string}
            height={220}
            width={220}
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">
            @<span>{username}</span>
          </p>
          {bio && (
            <p className="mt-1 text-center text-14-normal">
              <span>{bio}</span>
            </p>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <h3 className="text-30-bold">
            {session?.id === userId ? 'Your' : 'All'} startups
          </h3>

          <ul className="card_grid-sm">
            <UserStartups />
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserDetailsPage;
