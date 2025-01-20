import React from 'react';
import ResetButton from './reset-button';
import Form from 'next/form';
import { Search } from 'lucide-react';

type Props = {
  query?: string;
};

const SearchInput = ({ query }: Props) => {
  return (
    <>
      <Form className="search-form" action={'/'} scroll={false}>
        <input
          className="search-input"
          placeholder="Search startups..."
          defaultValue={query}
          name="query"
        />
        <div className="flex gap-2 items-center">
          {query && <ResetButton />}
          <button type="submit" className="search-btn text-white">
            <Search />
          </button>
        </div>
      </Form>
    </>
  );
};

export default SearchInput;
