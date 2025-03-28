import { favoriteReposVar } from './apolloClient';

export default function RepoCard({ repo }) {
  const toggleFavorite = () => {
    const favorites = favoriteReposVar();
    if (favorites.some(fav => fav.id === repo.id)) {
      favoriteReposVar(favorites.filter(fav => fav.id !== repo.id));
    } else {
      favoriteReposVar([...favorites, repo]);
    }
  };

  return (
    <div className="repo-card">
      <h3>
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h3>
      <p>{repo.description}</p>
      <div className="repo-stats">
        <span>⭐ {repo.stars}</span>
        <button onClick={toggleFavorite} className="favorite-btn">
          {favoriteReposVar().some(fav => fav.id === repo.id) ? '❤️' : '♡'}
        </button>
      </div>
    </div>
  );
}