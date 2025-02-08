import { useAppDispatch, useAppSelector } from "../../Store/store";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { KeyboardEvent } from "react";
import {
  createTask,
  getPersonalTasks,
  taskData,
} from "../../Store/slices/TaskSlice";
import toast, { Toaster } from "react-hot-toast";
import PersonalListTask from "../PersonalListTasks";
import { useState } from "react";

const PersonalTasks = () => {
  const { user } = useAppSelector((state) => state.user);
  const uad = useAppDispatch();

  const initialState: taskData = {
    description: "",
    isDaily: false,
    points: 5,
    type: "PERSONAL",
    subTasks: [],
    team: undefined,
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

  const handleCreateTask = async () => {
    console.log("handle card create task");

    if (newTaskData.description === "" || newTaskData.title == "") {
      toast.error("Fill all the fields properly");
      return;
    } else {
      const result = await uad(createTask(newTaskData));
      if (createTask.fulfilled.match(result)) {
        toast.success("Task created successfully!");
        user?._id && uad(getPersonalTasks(user?._id));
        setNewTaskData(initialState);
      } else if (createTask.rejected.match(result)) {
        toast.error(result.payload || "Task creation failed"); // Uses rejectWithValue
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

  return (
    <div className="tasks h-[90%]">
      <div className="p-5 m-0 md:m-3 block  md:flex md:justify-between">
        <div className="flex md:items-center flex-col md:flex-row  md:place-items-center">
          <span>
            <span className="text-2xl"> Good Morning,</span> {user?.name}👋
          </span>
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
      <PersonalListTask />
    </div>
  );
};

export default PersonalTasks;
