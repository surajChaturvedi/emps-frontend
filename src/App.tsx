import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin';
import User from './Components/User';
import AllowLogin from './Components/AllowLogin';
import RedirectLogin from './Components/AllowLogin/RedirectLogin';
import { createContext, useState } from 'react'
import { appDataType, namesDataType } from './Types';
export const AppContext = createContext<appDataType | null>(null);
function App() {
  const [appData, setAppData] = useState({
    selectedData: {
      week: '', month: '', date: { from: '', to: '' }
    },
    namesSearchData: [{ name: '' }]
  })
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RedirectLogin><Login /></RedirectLogin>
    },
    {
      path: "/admin",
      element: <AllowLogin name='Admin'><Admin /></AllowLogin>
    },
    {
      path: "/user",
      element: <AllowLogin name='User'><User /></AllowLogin>
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
