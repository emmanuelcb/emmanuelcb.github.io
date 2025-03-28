import { useQuery, gql } from '@apollo/client';
import RepoCard from './RepoCard';

const GET_USER = gql`
  query GetUser {
    currentUser {
      id
      username
      avatar
      repositories {
        id
        name
        description
        stars
      }
    }
  }
`;

export default function UserProfile() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error loading profile: {error.message}</div>;

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={data.currentUser.avatar} alt={data.currentUser.username} className="avatar" />
        <h1>{data.currentUser.username}</h1>
      </div>
      <h2>Repositories</h2>
      <div className="repo-list">
        {data.currentUser.repositories.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}