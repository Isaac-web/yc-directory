import { auth } from '@/auth';
import { Skeleton } from '@/components/ui/skeleton';
import UserStartups from '@/components/user-startups';
import { cn } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { GET_USER_BY_ID_QUERY } from '@/sanity/lib/queries';
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
            {session?.id === userId ? 'Your' : `${name}'s`} startups
          </h3>

          <ul className="card_grid-sm">
            <Suspense
              fallback={[1, 2, 3, 4, 5].map((value) => (
                <Skeleton
                  key={cn('skeleton', value)}
                  className="startup-card_skeleton"
                />
              ))}
            >
              <UserStartups authorId={userId} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserDetailsPage;
