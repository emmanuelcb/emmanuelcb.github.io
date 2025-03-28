import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import UserProfile from './UserProfile';
import RepoCard from './RepoCard';
import SearchRepos from './SearchRepos';
import { useReactiveVar } from '@apollo/client';
import { favoriteReposVar } from './apolloClient';
import './App.css';

function App() {
  const favorites = useReactiveVar(favoriteReposVar);

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <header className="app-header">
          <h1>GitHub Clone with Local GraphQL</h1>
        </header>

        <main className="app-content">
          <div className="app-layout">
            <div className="sidebar">
              <UserProfile />
            </div>
            <div className="main-content">
              <SearchRepos />
              
              {favorites.length > 0 && (
                <div className="favorites-section">
                  <h2>Favorite Repositories</h2>
                  <div className="repo-list">
                    {favorites.map(repo => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>This is a demo using React and local GraphQL data</p>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default App;