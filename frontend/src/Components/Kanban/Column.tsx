import { useMemo } from "react";
import { Task } from "../../utils/types";
import { SortableContext, useSortable, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnProps {
  tasks: Task[];
}

const Column = ({ tasks }: ColumnProps) => {
  // Memoizing task IDs
  const taskIds = useMemo(() => tasks.map((task) => task._id), [tasks]);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className=" m-2 p-2 text-xl font-bold rounded flex justify-between">
        <span>{tasks[0].status}</span>
        {tasks.length > 0 && (
          <span className="text-sm font-light rounded-full px-1">
            {tasks.length} total
          </span>
        )}
      </div>
      <SortableContext items={taskIds}>
        {tasks.map((task) => (
          <SortableItem task={task} key={task._id} />
        ))}
      </SortableContext>
    </div>
  );
};

const SortableItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 m-2 bg-neutral-400/5 rounded"
    >
      <div className="tags flex gap-2">
        {task.tags.map((tag, index) => (
          <span
            className={` rounded-2xl px-2 ${
              index == 1
                ? " bg-emerald-200 text-emerald-800"
                : index == 2
                ? " bg-orange-200 text-orange-800"
                : " bg-sky-200 text-sky-800"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      {task.title}
    </div>
  );
};
export default Column;
