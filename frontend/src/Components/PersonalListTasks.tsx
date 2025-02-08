import {
  AlarmClockOffIcon,
  DeleteIcon,
  EllipsisVerticalIcon,
  Loader,
  TrashIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { KeyboardEvent, useEffect, useState } from "react";
import {
  updateTask,
  getPersonalTasks,
  deleteTask,
  TaskStatus,
  changeTaskStatus,
} from "../Store/slices/TaskSlice";
import toast, { Toaster } from "react-hot-toast";
import { Task } from "../utils/types";

const PersonalListTask = () => {
  const [TaskData, setTaskData] = useState<Task>({
    _id: "",
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "PERSONAL",
    access: [],
    comments: [],
    creator: "",
    description: "",
    isDaily: false,
    points: 5,
    isSpecial: false,
    priority: "LOW",
    subtasks: [],
    tags: [],
    title: "",
    deadline: "",
  });
  const [isNotCreator, setIsNotCreator] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [subTaskInput, setSubTaskInput] = useState("");
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.user);
  const uad = useAppDispatch();

  useEffect(() => {
    user?._id && uad(getPersonalTasks(user._id));
  }, [user]);

  useEffect(() => {
    console.log("creator", TaskData.creator, "user", user?._id);

    setIsNotCreator(TaskData.creator != user?._id);
  }, [TaskData._id]);

  const handleTaskStatusChange = async (data: TaskStatus) => {
    const result = await uad(changeTaskStatus(data));

    if (changeTaskStatus.fulfilled.match(result)) {
      toast.success("Task status changed!");
    } else if (changeTaskStatus.rejected.match(result)) {
      toast.error(result.payload || "Task status change failed"); // Uses rejectWithValue
    }
  };

  const handleUpdateTask = async () => {
    console.log("handle card create task");

    if (TaskData.description === "" || TaskData.title == "") {
      toast.error("Fill all the fields properly");
      return;
    } else {
      const result = await uad(updateTask(TaskData));
      if (updateTask.fulfilled.match(result)) {
        toast.success("Task updated successfully!");
        user?._id && uad(getPersonalTasks(user._id));
      } else if (updateTask.rejected.match(result)) {
        toast.error(result.payload || "Task updation failed"); // Uses rejectWithValue
      }
    }
  };

  const handleAddTag = (e: KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!TaskData.tags.includes(tagInput.trim())) {
        setTaskData({
          ...TaskData,
          tags: [...TaskData.tags, tagInput.trim()],
        });
      }
      setTagInput(""); // Clear input field
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTaskData({
      ...TaskData,
      tags: TaskData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleAddSubTask = (e: KeyboardEvent) => {
    if (e.key === "Enter" && subTaskInput.trim() !== "") {
      e.preventDefault();
      if (
        TaskData.subtasks.filter((st) => st.title == subTaskInput.trim())
          .length <= 0
      ) {
        setTaskData({
          ...TaskData,
          subtasks: [
            ...TaskData.subtasks,
            { title: subTaskInput.trim(), isCompleted: true },
          ],
        });
      }
      setSubTaskInput(""); // Clear input field
    }
  };

  const handleRemoveSubTack = (tagToRemove: string) => {
    setTaskData({
      ...TaskData,
      subtasks: TaskData.subtasks.filter((st) => st.title !== tagToRemove),
    });
  };

  const handleTaskDelete = async () => {
    const result = await uad(deleteTask(TaskData._id));
    if (updateTask.fulfilled.match(result)) {
      toast.success("Task deleted successfully!");
      user?._id && uad(getPersonalTasks(user._id));
    } else if (updateTask.rejected.match(result)) {
      toast.error(result.payload || "Task deletion failed"); // Uses rejectWithValue
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  } else
    return (
      <div className="">
        {/* alert section */}
        {error && (
          <div role="alert" className="alert alert-error">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! {error}</span>
          </div>
        )}

        {/* dialog modal */}
        {TaskData && (
          <dialog
            id="detail_modal"
            className="modal  modal-bottom sm:modal-middle"
          >
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
            <Toaster />
            <div className="modal-box card  w-full shadow-xl">
              <h3 className="font-bold text-lg flex justify-between">
                Update Task{" "}
                {isNotCreator && (
                  <span
                    className="ms-10 text-error cursor-pointer"
                    onClick={handleTaskDelete}
                  >
                    <TrashIcon />
                  </span>
                )}
              </h3>
              <div className="">
                <div className="card-body">
                  {/* Task Name */}
                  <label className="label">
                    <span className="label-text">Task Name</span>
                  </label>
                  <input
                    disabled={isNotCreator}
                    value={TaskData.title}
                    onChange={(e) => {
                      setTaskData({
                        ...TaskData,
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
                    disabled={isNotCreator}
                    value={TaskData.description}
                    onChange={(e) => {
                      setTaskData({
                        ...TaskData,
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
                    disabled={isNotCreator}
                    type="range"
                    min={5}
                    max={25}
                    value={TaskData.points}
                    onChange={(e) => {
                      setTaskData({
                        ...TaskData,
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
                    disabled={isNotCreator}
                    value={
                      TaskData.deadline
                        ? new Date(TaskData.deadline)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      setTaskData({
                        ...TaskData,
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
                        disabled={isNotCreator}
                        type="checkbox"
                        checked={TaskData.isDaily}
                        onChange={(e) => {
                          setTaskData({
                            ...TaskData,
                            isDaily: e.target.checked,
                          });
                        }}
                      />
                      <span className="checkbox-text">Daily Task</span>
                    </label>

                    {/* Special Task Checkbox */}
                    <label className="checkbox-label col-span-6">
                      <input
                        disabled={isNotCreator}
                        type="checkbox"
                        checked={TaskData.isSpecial}
                        onChange={(e) => {
                          setTaskData({
                            ...TaskData,
                            isSpecial: e.target.checked,
                          });
                        }}
                      />
                      <span className="checkbox-text">Daily Task</span>
                    </label>
                  </div>
                  {/* Priority Selection */}
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>
                  <select
                    disabled={isNotCreator}
                    value={TaskData.priority}
                    onChange={(e) => {
                      setTaskData({
                        ...TaskData,
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
                    {TaskData.tags.map((tag, index) => (
                      <span key={index} className="badge badge-accent">
                        {tag}
                        <DeleteIcon onClick={() => handleRemoveTag(tag)} />
                      </span>
                    ))}
                  </div>
                  <input
                    disabled={isNotCreator}
                    type="text"
                    placeholder="Enter a tag here"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="input outline-0 input-ghost w-full max-w-xs"
                  />
                  <div className="gap-1 mt-1">
                    {TaskData.subtasks.map((subTask, index) => (
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
                    disabled={isNotCreator}
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
                            "detail_modal"
                          ) as HTMLDialogElement) || null;
                        if (myModal) {
                          myModal.close();
                        }
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isNotCreator}
                      onClick={() => handleUpdateTask()}
                      className="btn btn-primary"
                    >
                      Update Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}

        {/*  table */}
        {tasks.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-left"></th>
                    <th className="text-left">Title</th>
                    <th className="hidden md:table-cell text-left">
                      Description
                    </th>
                    <th className="hidden md:table-cell text-left">Deadline</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <th>
                        <label
                          className="md:tooltip tooltip-right tooltip-warning"
                          data-tip={
                            task.creator != user?._id
                              ? "Another users task"
                              : "Change status"
                          }
                        >
                          <input
                            disabled={task.creator != user?._id}
                            type="checkbox"
                            checked={task.status == "COMPLETED"}
                            onChange={(e) =>
                              handleTaskStatusChange({
                                status: e.target.checked
                                  ? "COMPLETED"
                                  : "PENDING",
                                taskId: e.target.value,
                              })
                            }
                            value={task._id}
                            className="checkbox "
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{task.title}</div>
                            <div className="text-sm opacity-50">
                              {task.isDaily}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        {task.description}
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
                        {task.deadline ? (
                          new Date(task.deadline).toLocaleString()
                        ) : (
                          <AlarmClockOffIcon />
                        )}
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
                      <th>
                        <button
                          className="cursor-pointer hover:text-white text-neutral-300 md:tooltip md:tooltip-left font-light"
                          data-tip="Details"
                          onClick={() => {
                            setTaskData(task);
                            let modal = document.getElementById(
                              "detail_modal"
                            ) as HTMLDialogElement;
                            modal.showModal();
                          }}
                        >
                          <EllipsisVerticalIcon />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>No Task to show here, start by adding task</span>
          </div>
        )}
      </div>
    );
};

export default PersonalListTask;
