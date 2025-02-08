import { useAppDispatch, useAppSelector } from "../../Store/store";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  
  Tooltip,
  BarChart,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { useEffect } from "react";
import { getChartsData } from "../../Store/slices/commonSlice";
import {
  DotIcon,
  Link2,
  ListCheckIcon,
  Loader,
  TargetIcon,
} from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
  const {
    usersAllTasks,
    totalPoints,
    taskStatusData,
    taskPointsData,
    isLoading,
    error,
  } = useAppSelector((state) => state.common);
  const { user } = useAppSelector((state) => state.user);
  const { teams } = useAppSelector((state) => state.tasks);

  const uad = useAppDispatch();

  useEffect(() => {
    uad(getChartsData());
  }, [uad]);
  return (
    <div className="h-[90%] w-screen">
      {/* Add your task statistics chart here */}
      {error ? (
        <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: Invalid email address!</span>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          <span className=" ms-14 text-4xl">
            Hola!!{" "}
            <span className="text-secondary text-lg">{user?.name}👋👋</span>
          </span>
          <div className="grid grid-cols-12 p-5 gap-3">
            {/* pie chart */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 h-72 rounded-lg bg-base-300 px-4 py-3 ">
              <span className="flex ms-4">
                <ListCheckIcon /> Task Overview
              </span>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                  <Pie
                    data={taskStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* bar chart */}
            <div className="col-span-12 md:col-span-6 lg:col-span-8 h-72 rounded-lg bg-base-300 px-4 py-3">
              <span className="flex ms-4">
                <ListCheckIcon />
                Top Task by points
              </span>
              <ResponsiveContainer width="100%" height="94%">
                <BarChart data={taskPointsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Tooltip />
                  <Bar dataKey="points" fill="#D4D884" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* links */}
            <div className="col-span-12 md:col-span-6 flex flex-col lg:col-span-7 h-80 rounded-lg bg-base-300 px-4 py-3 overflow-hidden">
              <span className="flex ms-4">
                <ListCheckIcon />
                Latest Tasks
              </span>
              <table className="table ">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-left">Title</th>
                    <th className="hidden lg:table-cell text-left">
                      Description
                    </th>
                    <th className="hidden md:table-cell text-left">Points</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {usersAllTasks.map(
                    (task, index) =>
                      index < 4 && (
                        <tr key={task._id}>
                          <td>
                            <div className="flex items-center gap-">
                              <div>
                                <div className="font-bold">{task.title}</div>
                                {/* <div className="text-sm opacity-50">
                                  {task.isDaily}
                                </div> */}
                              </div>
                            </div>
                          </td>
                          <td className="hidden lg:table-cell">
                            {task.description?.slice(0, 20)}
                            <br />
                            <div className="flex flex-wrap gap-1 mt-1">
                              {task.tags.map((tag, index) => (
                                <span
                                  key={tag + index}
                                  className={`badge ${
                                    index == 0
                                      ? "badge-info"
                                      : index == 1
                                      ? "badge-accent"
                                      : index == 2
                                      ? "badge-secondary"
                                      : index == 3
                                      ? "badge-primary"
                                      : "badge-ghost"
                                  } badge-sm`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="hidden md:table-cell">
                            {task.points}
                          </td>
                          <td
                            className={`badge badge-lg w-32 ${
                              task.status == "BACKLOG"
                                ? "badge-error"
                                : task.status == "PENDING"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {task.status}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-2 h-72 rounded-lg bg-base-300 px-4 py-3">
              <span className="flex ms-4">
                <TargetIcon /> Total Points
              </span>
              <span className="text-9xl">{totalPoints}</span>
              <span
                className={`relative bottom-0 ${
                  totalPoints < 50
                    ? "text-red-500"
                    : totalPoints < 80
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                {totalPoints < 50
                  ? "Average"
                  : totalPoints < 80
                  ? "Good"
                  : "Great"}
              </span>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3 h-80 rounded-lg bg-base-300 px-4 py-3">
              <span className="flex ms-4">
                <Link2 />
                Links
              </span>
              <div className="h-full flex items-start">
                <ol className="m-2 p-2">
                  <li className="m-2 p-2 text-lg flex">
                    <DotIcon />
                    <Link to={`/personal/task`}> Personal Tasks</Link>
                  </li>
                  {teams.map((team) => (
                    <li className="m-2 p-2 text-lg flex">
                      <DotIcon />
                      <Link to={`/team/${team._id}`}>{team.name}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
