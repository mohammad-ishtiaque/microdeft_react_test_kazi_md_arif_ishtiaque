import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import './CourseDashboard.css'; // Assuming you have a CSS file for styling

const CourseDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const { token } = useAuth(); // Replace with the actual token from authProvider

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://react-interview.crd4lc.easypanel.host/api/course', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setCourses(data.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, [token]);

    if (loading) {
      return <div className="loader"></div>; // Show spinner while loading
    }

    return (
        <div className="">
            {/* <h1>All Courses</h1> */}
           <ul className='cards'>
            {courses?.map((course) => (
                    <li  key={course.id} className={`card ${course.badgeColor} `}>
                    <div className="card__img">
                      <div className="img__cover">
                        <img src={course.image} alt="" />
                      </div>
                      <div className="img__profile">
                        <h3>{course.badge_text}</h3>
                      </div>
                    </div>
                    <div className="[ card__text ] [ flow ]">
                      <h1 className='card_title'>
                        {course.title}
                      </h1>
                      <div className="meta">
                        <p className="meta__info">
                          <span className="meta__posts"><b>Instructor : {course.instructor_name} &nbsp;</b></span>
                          {/* <span className="visually-hidden">And </span> */}
                          <span className="meta__creators">Crated By: {course.author.name}</span>
                        </p>
                      </div>
                      <p>{course.description}</p>
                      <small>
                        <span className="visuallyhidden">Uploaded </span>
                            {course.created_at}
                      </small>
                    </div>
                  </li>
                ))}
           </ul>
        </div>
    );
};

export default CourseDashboard;

