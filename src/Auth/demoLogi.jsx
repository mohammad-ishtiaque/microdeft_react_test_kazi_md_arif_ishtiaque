import { useState, useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data.data.token) {
        setToken(data.data.token);
        setError(null);
        localStorage.setItem("token", data.data.token);
        console.log("Authentication token:", data.data.token);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await response.json();
          setUserData(data);
          localStorage.setItem("userData", JSON.stringify(data));
          console.log(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchUserData();
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <div className="wrapper">
        {token && !userData && <div>Loading user data...</div>}

        {userData && (
        <div>
            <h3>User Information</h3>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
        )}
    <div className="title"><span>Login Form</span></div>
    <form  onSubmit={handleSubmit}>
      <div className="row">
        <i className="fas fa-user"></i>
        <input 
        type="email" 
        id="email" 
        placeholder="Email or Phone" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required />
      </div>
      <div className="row">
        <i className="fas fa-lock"></i>
        <input 
        type="password" 
        placeholder="Password" 
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required />
      </div>
      <div className="pass"><a href="#">Forgot password?</a></div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="row button">
        <input type="submit" value="Login" />
      </div>
      <div className="signup-link">Not a member? <a href="#">Signup now</a></div>
    </form>


  </div>
  );
};

export default Login;
