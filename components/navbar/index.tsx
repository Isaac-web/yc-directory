import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="flex justify-between items-center p-5 py-3">
        <div>
          <Link href={'/'}>
            <Image src={'/logo.png'} width={145} height={65} alt="Logo" />
          </Link>
        </div>
        <div>
          {!session?.user ? (
            <form
              action={async () => {
                'use server';

                await signIn('github');
              }}
            >
              <button type="submit">Login</button>
            </form>
          ) : (
            <div className="flex items-center gap-5">
              <div>
                <button>Create</button>
              </div>

              <form
                action={async () => {
                  'use server';

                  await signOut();
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <div>{session?.user?.name}</div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
