import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Workers from './components/Workers';
import AddWorkerModal from './components/AddWorkerModal'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        workers: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const worker = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})

function App() {
  return (
  <>
    <ApolloProvider client={worker}>
      <Header />
      <div className="container">
        <AddWorkerModal />
        <Workers />
      </div>
    </ApolloProvider>
  </>
  );
}

export default App;
