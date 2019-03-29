const { ApolloServer, gql } = require("apollo-server");
const db = require("./db");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  enum SortOrder {
    Ascending
    Descending
  }

  type SearchResult {
    products(
      offset: Int
      limit: Int
      sortOrder: SortOrder
    ): ProductsSearchResult
  }

  type ProductsSearchResult {
    total: Int!
    results: [Product!]!
    hasMore: Boolean!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Query {
    search(
      """
      Represents the search term(s)
      """
      query: String!
    ): SearchResult!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    search: (source, args, context, info) => {
      const { query } = args;
      // go to elastic and search for the product ids
      const result = db.searchIndex[query];

      return result;
    }
  },
  SearchResult: {
    products: (source, args) => {
      const ids = source;
      const resolvedProducts = db.products.filter(p => ids.indexOf(p.id) >= 0);

      return {
        total: resolvedProducts.length,
        results: resolvedProducts,
        hasMore: false
      };
    }
  },
  SortOrder: {
    Ascending: 0,
    Descending: 1
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
