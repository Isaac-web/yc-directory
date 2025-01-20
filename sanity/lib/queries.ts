import { defineQuery } from 'next-sanity';

export const GET_USER_BY_GITHUB_ID = defineQuery(
  `*[_type == "author" && id == $id ][0]{_id, id, name, email, username, bio}`
);

export const FETCH_STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const GET_STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
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
  pitch,
  _createdAt
}`);

export const GET_STARTUP_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author->_id == $authorId]{
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
  pitch,
  _createdAt
}`);

export const GET_USER_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0]{
    _id,
    name,
    image,
    username,
    bio
  }`);
