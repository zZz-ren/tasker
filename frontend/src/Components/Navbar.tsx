import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../Store/store";
import {
  GoalIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  LucideTarget,
  PlusIcon,
  Users,
} from "lucide-react";
import { logout } from "../Store/slices/userSlice";
import { baseUrl } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { createTeam, getTeamsData, teamData } from "../Store/slices/TaskSlice";

const Navbar = () => {
  //in future to add routes from API
  const uad = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { teams } = useAppSelector((state) => state.tasks);

  const initalTeamData: teamData = {
    description: "",
    members: [],
    name: "",
  };
  const [newTeamData, setNewTeamData] = useState<teamData>(initalTeamData);

  const handleLogOut = () => {
    uad(logout());
  };

  const handleSignup = () => {
    window.open(`${baseUrl}/auth/google`, "_self");
  };

  const handleCreateTeam = async () => {
    if (newTeamData.description === "" || newTeamData.name == "") {
      toast.error("Fill all the fields properly");
      return;
    } else {
      const result = await uad(createTeam(newTeamData));
      if (createTeam.fulfilled.match(result)) {
        toast.success("Team created successfully!");
        uad(getTeamsData)
        setNewTeamData(initalTeamData);
      } else if (createTeam.rejected.match(result)) {
        toast.error(result.payload || "Team creation failed"); // Uses rejectWithValue
      }
    }
  };

  const location = useLocation();

  return (
    <div className="navbar bg-base-100 h-[10%] shadow-sm">
      <div className="navbar-start">
        {/* <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div> */}

        <div className="drawer z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            {user ? (
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <div className="flex m-2 justify-between items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src={user.avatar || "/avatar.png"} />
                      </div>
                    </div>
                    <h2>{user.name}</h2>
                    <LogOutIcon className="tooltip tooltip-right" data-tip="Logout" onClick={handleLogOut} />
                  </div>
                </li>
                <li>
                  {/* Dashboard Link */}
                  <Link
                    className={` m-2 p-2 ${
                      location.pathname == "/" ? "bg-gray-600/30 " : ""
                    }`}
                    to={"/"}
                  >
                    <LayoutDashboardIcon />
                    <span className="ms-5">Dashboard</span>
                  </Link>
                </li>
                <li>
                  {/* Personal Tasks Link */}
                  <Link
                    className={` m-2 p-2 ${
                      location.pathname == "/personal/task" ? "bg-gray-600/30 " : ""
                    }`}
                    to={"/personal/task"}
                  >
                    <GoalIcon />
                    <span className="ms-5">Personal Tasks</span>
                  </Link>
                </li>
                <li>
                  {/* Task link */}
                  <Link
                    className={` m-2 p-2${
                      location.pathname == "/task" ? "bg-gray-600/30 " : ""
                    }`}
                    to={"#"}
                  >
                    <Users />
                    <span className="ms-5">Projects | Teams</span>
                  </Link>
                  <ul>
                    {user ? (
                      <>
                        {teams.map((team) => (
                          <li key={team._id}>
                            <Link
                              className={` m-2 p-2 ${
                                location.pathname == `/team/${team._id}`
                                  ? "bg-gray-600/30 "
                                  : ""
                              }`}
                              to={`/team/${team._id}`}
                            >
                              <LucideTarget />
                              <span className="ms-5">{team.name}</span>
                            </Link>
                          </li>
                        ))}
                        <li
                          onClick={() => {
                            const modal = document.getElementById(
                              "add_team_modal"
                            ) as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                          }}
                        >
                          <span className={`m-2 p-2}`}>
                            <PlusIcon />
                            <span className="ms-5">Add New Project | Team</span>
                          </span>
                        </li>
                      </>
                    ) : (
                      <li
                        onClick={() => {
                          const modal = document.getElementById(
                            "add_team_modal"
                          ) as HTMLDialogElement | null;
                          if (modal) modal.showModal();
                        }}
                      >
                        <span className={`m-2 p-2}`}>
                          <PlusIcon />
                          <span className="ms-5"> Add New Project | Team</span>
                        </span>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}

                <div className="flex m-2 justify-between items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={"/avatar.png"} />
                    </div>
                  </div>
                  <h2>Login First</h2>
                  <LogInIcon onClick={handleSignup} />
                </div>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <div className="w-52">
          <img
            src="/icons/Karma-white-2.png"
            alt="Tailwind-CSS-Avatar-component"
          />
        </div>
      </div>
      <div className="navbar-end">
        <input
          type="text"
          placeholder="search"
          className="input rounded-3xl hidden md:block"
        />
        <button className="btn btn-ghost btn-circle hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>

      <dialog
        id="add_team_modal"
        className="modal  modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <Toaster />
        <div className="modal-box card  w-full shadow-xl">
          <h3 className="font-bold text-lg">Create new Team</h3>
          <div className="">
            <div className="card-body">
              {/* Task Name */}
              <label className="label">
                <span className="label-text">Team Name</span>
              </label>
              <input
                value={newTeamData?.name}
                onChange={(e) => {
                  setNewTeamData({
                    ...newTeamData,
                    name: e.target.value,
                  });
                }}
                type="text"
                placeholder="Enter team name"
                className="input input-bordered w-full"
              />

              {/* Task Description */}
              <label className="label">
                <span className="label-text">Team Description</span>
              </label>
              <textarea
                value={newTeamData.description}
                onChange={(e) => {
                  setNewTeamData({
                    ...newTeamData,
                    description: e.target.value,
                  });
                }}
                placeholder="Enter task details"
                className="textarea textarea-bordered w-full"
              ></textarea>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => {
                    var myModal =
                      (document.getElementById(
                        "add_team_modal"
                      ) as HTMLDialogElement) || null;
                    if (myModal) {
                      myModal.close();
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCreateTeam()}
                  className="btn btn-primary"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Navbar;
