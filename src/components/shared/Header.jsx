import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { username } = props;
  return (
    <div>
      <h1>MusicList</h1>
      <div className="user-name">
        <h2>Welcome {username}</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account/profile/jward">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
