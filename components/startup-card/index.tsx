import Image from 'next/image';
import React from 'react';

const StartUpCard = () => {
  return (
    <div className="startup-card">
      <div className="flex justify-between items-center">
        <div>{new Date().toLocaleDateString()}</div>
        <div className="flex justify-center gap-2">
          <div>11</div>
          <div>e</div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-16-medium line-clamp-1">Isaac Takiy</p>
        <div className="flex justify-between items-center">
          <p className="text-26-semibold line-clamp-1">Title</p>
          <Image
            className="rounded-full"
            src={'https://placehold.co/48X48'}
            alt="image"
            width={48}
            height={48}
          />
        </div>
        <p className="line-clamp-2 mt-5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          reiciendis atque eligendi cupiditate velit vitae, excepturi aspernatur
          ipsa doloremque quisquam!
        </p>
      </div>
      <div className="mt-10">
        <div
          className={`h-40 bg-[url('https://placehold.co/500X100')] bg-center bg-cover rounded-lg`}
        />
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-16-medium">EdTec</p>

        <button className="startup-card_btn">Details</button>
      </div>
    </div>
  );
};

export default StartUpCard;
