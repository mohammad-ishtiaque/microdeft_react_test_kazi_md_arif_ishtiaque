import { useEffect, useState } from "react";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        if (token) {
          fetchUserData(token);
        }
      }, [token]);



      const fetchUserData = async (authToken) => {
        try {
          const response = await fetch(
            "https://react-interview.crd4lc.easypanel.host/api/user",
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "Application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data.");
          }
          const data = await response.json();
          setUserInfo(data);
          console.log(data)
        } catch (error) {
          setMessage(error.message);
        }
      };
    


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const  handleSubmit = async (event) => {
        event.preventDefault();
      
        console.log("Form Data:", formData); // Log formData before sending
      
        try {
          const response = await fetch(
            "https://react-interview.crd4lc.easypanel.host/api/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", // Corrected casing
              },
              body: JSON.stringify(formData),
            }
          );
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Registration failed:", errorData); // Log the *full* error object
            // More user-friendly error display (consider a component for this):
            alert(`Registration failed: ${errorData.message || 'Please check the form'}. See console for details`);
      
            // Display errors in the UI (use conditional rendering based on errorData.errors)
            // Example: setErrors(errorData.errors);
      
            throw new Error(errorData.message || "Registration failed.");
          }
      
          // Handle successful registration
          const data = await response.json();
          console.log('Success:', data);
          setToken(data.data.token);
          localStorage.setItem("token", data.data.token);
          console.log('Success:', data.data.token);
        } catch (error) {
          console.error("Error during registration:", error);
          // Handle the error (display a message to the user)
        }
      }


      const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        setMessage("Logged out successfully.");
      };
  
    return (
      <div className="form-container">
        {token ? (
        <div className="logged-in">
          <h2 className="welcome">Welcome back!</h2>
          {userInfo && (
            <div className="user-info">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
        {message && <p className="message">{message}</p>}
      </div>
    );
  }
  

export default Register;
