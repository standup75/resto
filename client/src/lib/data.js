import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`,
  credentials: 'include',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

