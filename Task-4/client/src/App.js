import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { Register,Login, AdminPanel } from "./pages";
import { AuthRoute,NonAuthRoute } from "./WrapperComponents";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
 

const router=createBrowserRouter([
  {
    path:"/register",
    element:<NonAuthRoute><Register/></NonAuthRoute>

  },
  {
    path:"/login",
    element:<NonAuthRoute><Login/></NonAuthRoute>
  },
  {
    path:"/",
    element:<AuthRoute><AdminPanel/></AuthRoute>
  }
])

function App() {
  const client=new QueryClient();
  return (
    <QueryClientProvider client={client}>
     <RouterProvider router={router}/>
     </QueryClientProvider>
  );
}

export default App;
