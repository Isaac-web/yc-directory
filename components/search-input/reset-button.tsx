'use client';

import React from 'react';
import Link from 'next/link';

const ResetButton = () => {
  const form = document.querySelector('.search-form') as HTMLFormElement;

  return (
    <Link
      href={'/'}
      onClick={() => {
        if (form) {
          form.reset();
        }
      }}
    >
      <button className="search-btn text-white">X</button>
    </Link>
  );
};

export default ResetButton;
