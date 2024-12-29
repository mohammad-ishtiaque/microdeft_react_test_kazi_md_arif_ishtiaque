import { useState } from "react";
import "./CourseForm.css";
import { useAuth } from "../AuthContext";

const AddCourse = () => {

  const initialCourseState = {
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  };
  const [course, setCourse] = useState(initialCourseState);


  // console.log(course)

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
      const response = await fetch(
        "https://react-interview.crd4lc.easypanel.host/api/course",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Course added successfully:", data);
      console.log(data.data)
      setCourse(initialCourseState)
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <>
      
        <form className="course-form" onSubmit={handleSubmit}>
          <h2>Add Course Form</h2>
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
          </div>

          <div className="form-group email">
            <label>Course Badge Color</label>
            <input
              type="text"
              placeholder="Enter Course Badge Color (ex: #000000)"
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
