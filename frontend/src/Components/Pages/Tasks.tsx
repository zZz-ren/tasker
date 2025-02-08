import ListTask from "../ListTask";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { DeleteIcon, PlusIcon } from "lucide-react";
import React, { KeyboardEvent, useEffect, useState } from "react";
import {
  createTask,
  updateTeam,
  getTeamTasks,
  taskData,
} from "../../Store/slices/TaskSlice";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import { Team } from "../../utils/types";
import { UserState } from "../../Store/slices/userSlice";
import api from "../../utils/api";

const Tasks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { teams } = useAppSelector((state) => state.tasks);
  const uad = useAppDispatch();

  const params = useParams();

  const initialState: taskData = {
    description: "",
    isDaily: false,
    points: 5,
    type: "TEAM",
    subTasks: [],
    team: params.teamId,
    deadline: new Date().toString(),
    access: [],
    comments: [],
    isSpecial: false,
    priority: "LOW",
    subtasks: [],
    tags: [],
    title: "",
  };

  const [newTaskData, setNewTaskData] = useState<taskData>(initialState);
  const [tagInput, setTagInput] = useState("");
  const [subTaskInput, setSubTaskInput] = useState("");
  const [users, setUsers] = useState<UserState[]>([]);

  const [currTeam] = teams.filter((team) => team._id === params.teamId);
  const [updateTeamData, setUpdateTeamData] = useState<Team>(currTeam);

  useEffect(() => {
    setUpdateTeamData(currTeam);
  }, [currTeam]);

  useEffect(() => {
    const usersFetch = async () => {
      let response = await api.get("/auth/users");
      if (response.data.success) {
        setUsers(response.data.users);
      }
    };

    usersFetch();
  }, []);



  const handleCreateTask = async () => {
    console.log("handle card create task");

    if (newTaskData.description === "" || newTaskData.title == "") {
      toast.error("Fill all the fields properly");
      return;
    } else {
      const result = await uad(createTask(newTaskData));
      if (createTask.fulfilled.match(result)) {
        toast.success("Task created successfully!");
        params.teamId && uad(getTeamTasks(params.teamId));
        setNewTaskData(initialState);
      } else if (createTask.rejected.match(result)) {
        toast.error(result.payload || "Task creation failed"); // Uses rejectWithValue
      }
    }
  };

  const handleUpdateTeamData = async () => {
    if (updateTeamData.description === "" || updateTeamData.name == "") {
      toast.error("Fill all the fields properly");
      return;
    } else if (currTeam == updateTeamData) {
      toast.success("Nothing to update");
    } else {
      const result = await uad(updateTeam(updateTeamData));
      console.log(result);
      if (createTask.rejected.match(result)) {
        toast.error(result.payload || "Team updation failed"); // Uses rejectWithValue
      } else {
        toast.success("Team updated successfully!");
        // uad(getTeamsData());
        var myModal =
          (document.getElementById("team_modal") as HTMLDialogElement) || null;
        if (myModal) {
          myModal.close();
        }
      }
    }
  };

  const handleAddTag = (e: KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!newTaskData.tags.includes(tagInput.trim())) {
        setNewTaskData({
          ...newTaskData,
          tags: [...newTaskData.tags, tagInput.trim()],
        });
      }
      setTagInput(""); // Clear input field
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewTaskData({
      ...newTaskData,
      tags: newTaskData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleAddSubTask = (e: KeyboardEvent) => {
    if (e.key === "Enter" && subTaskInput.trim() !== "") {
      e.preventDefault();
      if (
        newTaskData.subtasks.filter((st) => st.title == subTaskInput.trim())
          .length <= 0
      ) {
        setNewTaskData({
          ...newTaskData,
          subtasks: [
            ...newTaskData.subtasks,
            { title: subTaskInput.trim(), isCompleted: true },
          ],
        });
      }
      setSubTaskInput(""); // Clear input field
    }
  };

  const handleRemoveSubTack = (tagToRemove: string) => {
    setNewTaskData({
      ...newTaskData,
      subtasks: newTaskData.subtasks.filter((st) => st.title !== tagToRemove),
    });
  };

  const handleMembersAdd = (userId: string) => {
    console.log("dfeefeerer");

    if (
      updateTeamData.members.filter((member) => member._id === userId).length <=
      0
    ) {
      setUpdateTeamData({
        ...updateTeamData,
        members: [
          ...updateTeamData.members,
          users.filter((usr) => usr._id == userId)[0],
        ],
      });
    }
  };
  const handleMembersRemove = (userId: string) => {
    console.log("dfeefeerer");

    setUpdateTeamData({
      ...updateTeamData,
      members: updateTeamData.members.filter((member) => member._id != userId),
    });
  };

  return (
    <div className="tasks h-[90%]">
      <div className="p-5 m-0 md:m-3 block  md:flex md:justify-between">
        <div className="flex md:items-center flex-col md:flex-row  md:place-items-center">
          <span>
            <span className="text-2xl"> Good Morning,</span> {user?.name}👋
          </span>
          {updateTeamData && updateTeamData?.creator == user?._id ? (
            <>
              <span
                className=" ms-5 underline cursor-pointer tooltip-bottom text-info"
                data-tip="Team Details"
                onClick={() => {
                  setUpdateTeamData(currTeam);
                  let modal = document.getElementById(
                    "team_modal"
                  ) as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              >
                {currTeam.name}
              </span>
              <dialog id="team_modal" className="modal">
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
                <div className="modal-box card  w-full shadow-xl">
                  <h3 className="font-bold text-lg">
                    Update {updateTeamData.name}
                  </h3>
                  <div className="">
                    <div className="card-body">
                      {/* Task Name */}
                      <label className="label">
                        <span className="label-text">Team Name</span>
                      </label>
                      <input
                        value={updateTeamData.name}
                        onChange={(e) => {
                          setUpdateTeamData({
                            ...updateTeamData,
                            name: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="Enter team name"
                        className="input input-bordered w-full"
                      />

                      {/* Team Description */}
                      <label className="label">
                        <span className="label-text">Team Description</span>
                      </label>
                      <textarea
                        value={updateTeamData.description}
                        onChange={(e) => {
                          setUpdateTeamData({
                            ...updateTeamData,
                            description: e.target.value,
                          });
                        }}
                        placeholder="Enter team details"
                        className="textarea textarea-bordered w-full"
                      ></textarea>
                      {/* Members Selection */}
                      <div className="flex gap-1 mt-1">
                        {updateTeamData.members.map((member, index) => (
                          <span key={index} className="badge badge-accent">
                            {member.name}
                            <DeleteIcon
                              onClick={() => handleMembersRemove(member._id)}
                            />
                          </span>
                        ))}
                      </div>
                      <label className="label">
                        <span className="label-text">Members</span>
                      </label>
                      <select
                        value="Select Users"
                        className="select select-bordered w-full"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          console.log(e.target.value);
                          if (e.target.value != "")
                            handleMembersAdd(e.target.value);
                        }}
                      >
                        <option value="">Select Users</option>
                        {users &&
                          users.map((usr) => (
                            <option key={usr._id} value={usr._id}>
                              {usr.name}
                            </option>
                          ))}
                      </select>
                      {/* Action Buttons */}
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          className="btn btn-ghost"
                          type="button"
                          onClick={() => {
                            var myModal =
                              (document.getElementById(
                                "team_modal"
                              ) as HTMLDialogElement) || null;
                            if (myModal) {
                              myModal.close();
                            }
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateTeamData()}
                          className="btn btn-primary"
                        >
                          Update Team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="mt-5 md:mt-0">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
              <span
                onClick={() => {
                  const modal = document.getElementById(
                    "create_modal"
                  ) as HTMLDialogElement | null;
                  if (modal) modal.showModal();
                }}
              >
                <PlusIcon />
                <span>Create new Task</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <dialog id="create_modal" className="modal  modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <Toaster />
        <div className="modal-box card  w-full shadow-xl">
          <h3 className="font-bold text-lg">Create new Task</h3>
          <div className="">
            <div className="card-body">
              {/* Task Name */}
              <label className="label">
                <span className="label-text">Task Name</span>
              </label>
              <input
                value={newTaskData.title}
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    title: e.target.value,
                  });
                }}
                type="text"
                placeholder="Enter task name"
                className="input input-bordered w-full"
              />

              {/* Task Description */}
              <label className="label">
                <span className="label-text">Task Description</span>
              </label>
              <textarea
                value={newTaskData.description}
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    description: e.target.value,
                  });
                }}
                placeholder="Enter task details"
                className="textarea textarea-bordered w-full"
              ></textarea>

              {/* Task Points Range */}
              <label className="label">
                <span className="label-text">Task Points</span>
              </label>
              <input
                type="range"
                min={5}
                max={25}
                value={newTaskData.points}
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    points: parseInt(e.target.value),
                  });
                }}
                className="range w-full"
                step={5}
              />
              <div className="flex w-full justify-between px-2 text-xs">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
              </div>

              {/* Due Date */}
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                value={
                  newTaskData.deadline
                    ? new Date(newTaskData.deadline).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    deadline: e.target.value,
                  });
                }}
                type="date"
                className="input input-bordered w-full"
              />

              <div className="grid grid-cols-12">
                {/* Daily Task Checkbox */}
                <label className="checkbox-label col-span-6">
                  <input
                    type="checkbox"
                    checked={newTaskData.isDaily}
                    onChange={(e) => {
                      setNewTaskData({
                        ...newTaskData,
                        isDaily: e.target.checked,
                      });
                    }}
                  />
                  <span className="checkbox-text">Daily Task</span>
                </label>

                {/* Special Task Checkbox */}
                <label className="checkbox-label col-span-6">
                  <input
                    type="checkbox"
                    checked={newTaskData.isSpecial}
                    onChange={(e) => {
                      setNewTaskData({
                        ...newTaskData,
                        isSpecial: e.target.checked,
                      });
                    }}
                  />
                  <span className="checkbox-text">Special Task</span>
                </label>
              </div>

              {/* Priority Selection */}
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                value={newTaskData.priority}
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    priority: e.target.value as "LOW" | "MEDIUM" | "HIGH",
                  });
                }}
                className="select select-bordered w-full"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <div className="flex gap-1 mt-1">
                {newTaskData.tags.map((tag, index) => (
                  <span key={index} className="badge badge-accent">
                    {tag}
                    <DeleteIcon onClick={() => handleRemoveTag(tag)} />
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Enter a tag here"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="input outline-0 input-ghost w-full max-w-xs"
              />
              <div className="gap-1 mt-1">
                {newTaskData.subtasks.map((subTask, index) => (
                  <div key={index + subTask.title[4]} className="flex">
                    Task {index + 1}:
                    <span className="ms-1 text-neutral-200">
                      {" "}
                      {subTask.title.slice(0, 30)}...
                    </span>
                    <DeleteIcon
                      onClick={() => handleRemoveSubTack(subTask.title)}
                    />
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="enter a subtask here"
                value={subTaskInput}
                onChange={(e) => setSubTaskInput(e.target.value)}
                onKeyDown={handleAddSubTask}
                className="input outline-0 input-ghost w-full max-w-xs"
              />

              {/* Action Buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => {
                    var myModal =
                      (document.getElementById(
                        "create_modal"
                      ) as HTMLDialogElement) || null;
                    if (myModal) {
                      myModal.close();
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCreateTask()}
                  className="btn btn-primary"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <ListTask />
    </div>
  );
};

export default Tasks;
