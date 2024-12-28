import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AddCourse from './Courses/AddCourse';
import PrivateOutlet from './Private/PrivateOutlet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateOutlet />}>
          <Route path="/addCourse" element={<AddCourse title="AddCourse" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;