import { StartupType } from '@/components/startup-card';
import { client } from '@/sanity/lib/client';
import { GET_STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import React, { Suspense } from 'react';
import markdownIt from 'markdown-it';
import ViewsCount from '@/components/views-count';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const experimental = true;

const md = markdownIt();

const StartupDetailsPage = async ({
  params,
}: {
  params: { id: Promise<string> };
}) => {
  const startupId = await params.id;

  const startup = (await client.fetch(GET_STARTUP_BY_ID_QUERY, {
    id: startupId,
  })) as StartupType;

  if (!startup) return notFound();

  const { _createdAt, title, author, image, pitch, description } = startup;

  const parsedContent = md.render(pitch || '');

  return (
    <>
      <section className="pink_container !min-h-[230px] mb-10">
        <p className="tag">{new Date(_createdAt).toLocaleString()}</p>

        <h1 className="heading">{title}</h1>

        <p className="sub-heading line-clamp-2">{description}</p>
      </section>

      <section className="w-11/12 md:w-10/12 mx-auto mb-10">
        <img
          src={image}
          alt={`Image of ${title}`}
          className="w-full rounded-xl"
        />
      </section>

      <section className="w-11/12 md:w-7/12 max-w-[70em] mx-auto mb-10">
        <Link href={`/users/${author?._id}`}>
          <div className="flex gap-5 items-center mb-10">
            <Image
              src={author?.image as string}
              height={65}
              width={65}
              alt={author?.name as string}
              className="rounded-full bg-gray-50 shadow-md"
            />
            <div className="flex flex-col">
              <p className="text-20-medium">{author?.name}</p>
              <p className="text-16-medium !text-black-300">
                {author?.username}
              </p>
            </div>
          </div>
        </Link>

        {parsedContent && (
          <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        )}
      </section>

      <hr className="divider w-full" />

      <Suspense>
        <ViewsCount id={startupId} />
      </Suspense>
    </>
  );
};

export default StartupDetailsPage;
