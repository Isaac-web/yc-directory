import Image from 'next/image';
import React from 'react';
import { Author, Startup } from '@/sanity/sanity.types';

export type StartupType = Omit<Startup, 'author'> & { author?: Author };

type Props = {
  startup: StartupType;
};

const StartUpCard = ({ startup }: Props) => {
  const { title, category, description, views, image, author } = startup;

  return (
    <div className="startup-card">
      <div className="flex justify-between items-center">
        <div>{new Date().toLocaleDateString()}</div>
        <div className="flex justify-center gap-2">
          <div>{views}</div>
          <div>e</div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-16-medium line-clamp-1">{author?.name}</p>
        <div className="flex justify-between items-center">
          <p className="text-26-semibold line-clamp-1">{title}</p>
          <Image
            className="rounded-full"
            src={author?.image as string}
            alt="image"
            width={48}
            height={48}
          />
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
        <p className="text-16-medium">{category}</p>

        <button className="startup-card_btn">Details</button>
      </div>
    </div>
  );
};

export default StartUpCard;
