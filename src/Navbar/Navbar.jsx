import { Link, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext'; 
import './Navbar.css'; 
const Navbar = () => {
  const { token, clearToken, clearUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    clearUser();
    navigate(-1);
  };

  return (
    <nav>
     <div className="navbar">
     <div className="logo">
        <Link className="a" to="/">Microdeft</Link>
      </div>
      <ul className="menu">
        {token ? (
          <>
           <li>
              <Link className="a" to="/addCourse">Add Course</Link>
            </li>
            <li>
              <Link className="a" to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link className='a' onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
           <li>
              <Link className="a" to="/addCourse">Add Course</Link>
            </li>
            <li>
              <Link className="a" to="/login">Login</Link>
            </li>
            <li>
              <Link className="a" to="/">Register</Link>
            </li>
          </>
        )}
      </ul>
     </div>
    </nav>
  );
};

export default Navbar;