import React, { useEffect, useState } from "react";
import { GithubProfile } from "./types";
import "./styles.css";
import { IoLogoGithub, IoMdLink, IoMdSearch } from "react-icons/io";

const Github = () => {
  const [userName, setUserName] = useState<string>("Sid797");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [enteredVal, setEnteredVal] = useState<string>("");

  const [profile, setProfile] = useState<GithubProfile | null>(null);

  async function fetchGithubProfile() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${userName}`);
      const data: GithubProfile = await res.json();
      setLoading(false);
      setProfile(data);
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    }
  }

  const handleProfileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredVal(e.target.value);
  };

  const handleSubmit = () => {
    setUserName(enteredVal);
    setEnteredVal("");
  };

  useEffect(() => {
    fetchGithubProfile();
  }, [userName]);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile || profile.message === "Not Found") {
    return <div>Username does not exist. Please check the name again</div>;
  }

  return (
    <div className="github-profile-finder">
      <header className="input-wrapper">
        <IoLogoGithub className="profile-github-icon" />
        <input
          className={"profile-input"}
          onChange={handleProfileName}
          type="text"
          name="search-name"
          placeholder="Enter The Name..."
          value={enteredVal}
        />
        <button disabled={enteredVal.trim()===""?true:false} className="profile-search-button" onClick={handleSubmit}>
          <IoMdSearch className="profile-search-icon" />
        </button>
      </header>
      <main className="profile-container">
        <section className="profile-intro">
          <img
            className="profile-img"
            src={profile.avatar_url}
            alt={`Profile photo of ${userName}`}
          />
          <h1 className="profile-name">{profile.name}</h1>
          <a className="profile-handle" href={profile.html_url}>
            @{profile.login}
          </a>
        </section>
        <h4 className="profile-bio">{profile.bio}</h4>
        <section className="profile-follower">
          <p>Follower count: {profile.followers}</p>
          <p>Following count: {profile.following}</p>
          <p>No of repos: {profile.public_repos}</p>
        </section>
        <a className="profile-repo-url" href={profile.repos_url}>
          <IoMdLink /> URL of repo
        </a>
      </main>
    </div>
  );
};

export default Github;
