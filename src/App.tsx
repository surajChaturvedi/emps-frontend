import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin';
import User from './Components/User';
import AllowLogin from './Components/AllowLogin';
import RedirectLogin from './Components/AllowLogin/RedirectLogin';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RedirectLogin><Login /></RedirectLogin>
    },
    {
      path: "/admin",
      element: <AllowLogin><Admin /></AllowLogin>
    },
    {
      path: "/user",
      element: <AllowLogin><User /></AllowLogin>
    }
  ]);

  return (
    <RouterProvider
      router={router}
    />
  )
}

export default App
