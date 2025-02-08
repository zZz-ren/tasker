import { useParams } from "react-router";

const TaskDetails = () => {
  const params = useParams();

  return <div>{params.taskId}</div>;
};

export default TaskDetails;
