import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Default from "./Components/Layouts/Default";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./Store/store";
import { checkAuth } from "./Store/slices/userSlice";
import { Loader } from "lucide-react";
import Dashboard from "./Components/Pages/Dashboard";
import Login from "./Components/Pages/Login";
import Tasks from "./Components/Pages/Tasks";
import { Toaster } from "react-hot-toast";
import TaskDetails from "./Components/TaskDetails";
import { getTeamsData } from "./Store/slices/TaskSlice";
import PersonalTasks from "./Components/Pages/PersonalTasks";
function App() {
  const uad = useAppDispatch();
  const { user, isLoading,  isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    // implement Authentication
    uad(checkAuth());
  }, [uad]);

  useEffect(() => {
    if (user) {
      uad(getTeamsData());
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      element: <Default />,
      children: [
        {
          path: "/",
          element: user ? <Dashboard /> : <Navigate to="/signup" />,
        },
        {
          path: "/personal/task",
          element: user ? <PersonalTasks /> : <Navigate to="/signup" />,
        },
        {
          path: "/team/:teamId",
          children: [
            {
              index: true,
              element: user ? <Tasks /> : <Navigate to="/signup" />,
            },
            {
              path: "task/:taskId",
              element: user ? <TaskDetails /> : <Navigate to="/signup" />,
            },
          ],
        },
        {
          path: "/contact",
          element: user ? <h1>Contact</h1> : <Navigate to="/signup" />,
        },
        {
          path: "/signup",
          element: user ? <Navigate to="/" /> : <Login />,
        },
      ],
    },
  ]);

  if (isLoading && !user) {
    console.log(isLoading, isAuthenticated, user);

    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading ? <Loader className="size-10 animate-spin" /> : <Login />}
      </div>
    );
  } else {
    console.log(isAuthenticated, isLoading, user);
    return (
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </div>
    );
  }
}

export default App;
