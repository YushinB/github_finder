import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

import { Link } from 'react-router-dom';
import { exportComponentAsPNG } from 'react-component-export-image';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    follwers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  const componentRef = React.createRef();

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          back to search
        </Link>
        hireable: {''}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2" ref={componentRef}>
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt=""
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
            <button
              className="btn btn-dark btn"
              onClick={() => exportComponentAsPNG(componentRef)}
            >
              Export Fig
            </button>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {follwers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-white">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
};

export default User;
