import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin';
import User from './Components/User';
import AllowLogin from './Components/AllowLogin';
import RedirectLogin from './Components/AllowLogin/RedirectLogin';
import { createContext, useState } from 'react'
import { appDataType } from './Types';
export const AppContext = createContext<appDataType|null>(null);
function App() {
  const [appData, setAppData] = useState({
    selectedData: {
      week: '', month: '', date: { from: '', to: '' }
    }
  })
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
    <AppContext.Provider value={{ appData, setAppData }} >
      <RouterProvider
        router={router}
      />
    </AppContext.Provider>
  )
}

export default App
