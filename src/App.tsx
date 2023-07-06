import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin';
import User from './Components/User';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/user",
      element: <User />
    }
  ]);

  return (
    <RouterProvider
      router={router}
    />
  )
}

export default App
