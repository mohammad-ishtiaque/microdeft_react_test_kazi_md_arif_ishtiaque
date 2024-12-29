import { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
// import { useAuth } from "../AuthContext";

function Register() {

  // const { clearToken, clearUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        "https://react-interview.crd4lc.easypanel.host/api/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      const data = await response.json();
      setUserInfo(data);
      console.log(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form Data:", formData); // Log formData before sending

    try {
      const response = await fetch(
        "https://react-interview.crd4lc.easypanel.host/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Corrected casing
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData); // Log the *full* error object
        // More user-friendly error display :
        alert(
          `Registration failed: ${
            errorData.message || "Please check the form"
          }. See console for details`
        );

        // Display errors in the UI

        throw new Error(errorData.message || "Registration failed.");
      }

      // Handle successful registration
      const data = await response.json();
      console.log("Success:", data);
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
      navigate(-1);
      console.log("Success:", data.data.token);
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle the error
    }
  };

 
  return (
    <div className="container">
      <div className="wrapper">
        {token ? (
          <div>
            {userInfo && (
              <div className="user-info">
                <h3 className="title">User Information</h3>
                <div className="user-text">
                  <p>
                    <strong>Name:</strong> {userInfo.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userInfo.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="title">
              <span>Reistration Form</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="pass">
                {message && <p className="message">{message}</p>}
              </div>
              <div className="row button">
                <input type="submit" value="Register" />
              </div>
              <div className="signup-link">
                <span className="sign-text">Already have an account?</span>{" "}
                <NavLink to="/login" end>
                  Login
                </NavLink>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
