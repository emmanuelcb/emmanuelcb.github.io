import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import RepoCard from './RepoCard';

const SEARCH_REPOS = gql`
  query SearchRepositories($query: String!) {
    searchRepositories(query: $query) {
      id
      name
      description
      stars
      primaryLanguage
    }
  }
`;

export default function SearchRepos() {
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, data, refetch } = useQuery(SEARCH_REPOS, {
    variables: { query: searchQuery },
    skip: !searchQuery,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch({ query: searchQuery });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search repositories..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div className="loading">Searching...</div>}
      {error && <div className="error">Error: {error.message}</div>}

      {data && (
        <div className="search-results">
          <h3>Search Results</h3>
          <div className="repo-list">
            {data.searchRepositories.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}