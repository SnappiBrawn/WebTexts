import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './style.scss';
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const {currentUser} = useContext(AuthContext); 
  console.log(currentUser);
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    else{
      return children;
    }
  }


  const router = createBrowserRouter([
    
    {
      path: '/',
      element: <ProtectedRoute><Home/></ProtectedRoute>,
    },
    {
      path: "/login",
      element: <Login/>,
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
