## GraphQL Workshop

The goal is to write the resolvers for "Query search" and "SearchResults products" that will simulate data retrieval from the mock `db.js` data.

The `search` query resolver, should take a `query` argument and lookup product ids from the mock `db.js` data.
The `products` search results resolver, should take an array ids and by using `db.js` should resolve them to a list of products.

In the `solution` branch, there is an example on how this can be done.

## Setup

Alternative to cloning the repo, there is a Codesandbox link where you can work in the browser: https://tinyurl.com/socrates-gql

Setup dependencies:

```
yarn install
```

Run apollo server:

```
yarn start
```

## Goal

Implement the search query resolver to return search result products,
by reading data from the mock `db.js` file.

## Resource

Here is a short [intro to GraphQL](https://gist.github.com/colmarius/4e097c07acb41f8a56319a01fa7ba4f1) with links to nice resources.
