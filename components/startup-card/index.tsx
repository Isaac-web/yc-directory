import Image from 'next/image';
import React from 'react';
import { Author, Startup } from '@/sanity/sanity.types';
import { Eye } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export type StartupType = Omit<Startup, 'author'> & { author?: Author };

type Props = {
  startup: StartupType;
};

const StartUpCard = ({ startup }: Props) => {
  const { _id, title, category, description, views, image, author } = startup;

  return (
    <Link href={`/startups/${_id}`}>
      <div className="startup-card">
        <div className="flex justify-between items-center">
          <div>{new Date().toLocaleDateString()}</div>
          <div className="flex justify-center items-center gap-2">
            <div>{views}</div>
            <div>
              <Eye className="size-5" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link href={`/users/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <div className="flex justify-between items-center">
            <p className="text-26-semibold line-clamp-1">{title}</p>
            <Link href={`/users/${author?._id}`}>
              <Image
                className="rounded-full"
                src={author?.image as string}
                alt="image"
                width={48}
                height={48}
              />
            </Link>
          </div>
          <p className="line-clamp-2 mt-5">{description}</p>
        </div>
        <div className="mt-10">
          <div
            className={`h-40 bg-center bg-gray-100 bg-cover rounded-lg`}
            style={{
              backgroundImage: `url('${image || ''}')`,
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-5">
          <Link href={`/?query=${category}`}>
            <p className="text-16-medium">{category}</p>
          </Link>

          <Button className="startup-card_btn" asChild>
            <Link href={`/startups/${_id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default StartUpCard;
