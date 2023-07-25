import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin';
import User from './Components/User';
import AllowLogin from './Components/AllowLogin';
import RedirectLogin from './Components/AllowLogin/RedirectLogin';
import { createContext, useState } from 'react'
import { appDataType } from './Types';
export const AppContext = createContext<appDataType | null>(null);
function App() {
  const [appData, setAppData] = useState({
    selectedTime: {
      week: '', month: '', date: { from: '', to: '' }
    },
    namesSearchData: '',
    getData: [{ id: 0, name: '', points: 0 }],
    fileUpload_State: { done: false, status: false },
    nameUpload_State: { done: false, status: false }
  })
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RedirectLogin><Login /></RedirectLogin>
    },
    {
      path: "/admin",
      element: <AllowLogin name='admin'><Admin /></AllowLogin>
    },
    {
      path: "/user",
      element: <AllowLogin name='user'><User /></AllowLogin>
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
