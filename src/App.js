import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './style.scss';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },{
      path: '/home',
      element: <Home/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
