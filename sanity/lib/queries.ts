import { defineQuery } from 'next-sanity';

export const GET_USER_BY_GITHUB_ID = defineQuery(
  `*[_type == "author" && id == $id ][0]{_id, id, name, email, username, bio}`
);

export const FETCH_STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current)]{
  title,
  slug,
  image,
  author -> {
    _id,
    name,
    image,
    username,
    bio
  },
  views,
  description,
  category,
  pitch
}`);
