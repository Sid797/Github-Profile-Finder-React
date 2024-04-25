import { useEffect, useState } from "react";
import ProfileComponent from "./ProfileComponent";

const Github = () => {
  const [userName, setUserName] = useState("Sid797");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [enteredVal, setEnteredVal] = useState("");
  const [profile, setProfile] = useState({});

  async function fetchGithubProfile() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${userName}`);

      const data = await res.json();

      setLoading(false);
      setProfile(data);
      
      console.log(data);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  const handleProfileName = (e) => {
    setEnteredVal(e.target.value);
  };

  const handleSubmit = () => {
    setUserName(enteredVal);
    setEnteredVal("");
  };

  useEffect(() => {
    fetchGithubProfile();
  }, [userName]);


  if (profile.message==="Not Found") {
    return <div>Username does not exist.Please check the name again</div>
  }
  if (errorMsg) {
    return <div>{errorMsg}</div>
  }
  if (loading) {
    return (
      <div>
        Loading Please wait!  Check your Network Connection if it is taking too
        much time
      </div>
    );
  }
  return (
    <div className="github-profile-finder">
      <div className="input-wrapper">
        <input
          onChange={handleProfileName}
          type="text"
          name="search-name"
          placeholder="Enter the name"
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div className="profile-container">
        <ProfileComponent />
        <h1>{profile.login}</h1>
          <img src={profile.avatar_url} alt={`Profile photo of ${userName}`} />
          <p>Link:{profile.html_url}</p>
          <p>Bio:{profile.bio}</p>
          <p>Created at:{profile.created_at}</p>
          <p>Follower count:{profile.followers}</p>
          <p>Following count:{profile.following}</p>
          <p>Name:{profile.name}</p>
          <p>No of repos:{profile.public_repos}</p>
          <p>URL of repos:{profile.repos_url}</p>
          <p>Last updated:{profile.updated_at}</p>
      </div>
    </div>
  );
};

export default Github;
