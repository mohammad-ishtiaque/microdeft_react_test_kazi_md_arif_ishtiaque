import { useState } from "react";
import axios from "axios";
import "./CourseForm.css";
import { useAuth } from "../AuthContext";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  });

  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/course",
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Course added successfully:", response.data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <>
      <form action="thank-you.html" onSubmit={handleSubmit}>
        <h2>Add Course</h2>
        <div className="form-group fullname">
          <label>Course Title</label>
          <input 
              type="text"
              placeholder="Enter Course Title"
              name="title"
              value={course.title}
              onChange={handleChange}
              required 
            />
        </div>
        <div className="form-group email">
          <label>Course Description</label>
          <textarea
            type="text"
            name="description"
            placeholder="Enter Course Description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group password">
          <label>Badge Text</label>
          <input
            type="text"
            placeholder="Enter Course Badge"
            name="badge_text"
            value={course.badge_text}
            onChange={handleChange}
            required
          />
          {/* <i id="pass-toggle-btn" className="fa-solid fa-eye"></i> */}
        </div>

        <div className="form-group email">
          <label>Course Badge Color</label>
          <input
            type="text"
            placeholder="Enter Course Badge Color"
            name="badge_color"
            value={course.badge_color}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group email">
          <label>Course Instructor</label>
          <input
            type="text"
            placeholder="Enter Course Instructor"
            name="instructor_name"
            value={course.instructor_name}
            onChange={handleChange}
            required
          />
        </div>
       
        <div className="form-group submit-btn">
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  );
};

export default AddCourse;
