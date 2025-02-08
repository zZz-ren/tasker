import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Access, Subtask, Task, Team } from "../../utils/types";
import api from "../../utils/api";
import { UserState } from "./userSlice";

interface TaskState {
  tasks: Task[];
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}

export interface taskData {
  title: string;
  description: string;
  isDaily: boolean;
  isSpecial: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  points: number;
  type: "TEAM" | "PERSONAL";
  deadline: string;
  team?: string; // Team ID for team tasks
  access: Access[]; // Access permissions
  comments: Comment[]; // Task comments
  subtasks: Subtask[]; // Subtasks
  tags: string[]; // Tags for categorization
  subTasks: {
    title: { type: String; required: true };
    isCompleted: { type: Boolean; default: false };
  }[];
}

export interface teamData {
  name: string;
  description: string;
  members: UserState[];
}

const initialState: TaskState = {
  tasks: [],
  teams: [],
  isLoading: false,
  error: null,
};

interface GetTeamsExpected {
  data: Team[];
  success: boolean;
  message: string;
}

interface CreateTeamExpected {
  data: Team;
  success: boolean;
  message: string;
}

interface GetAllTaskExpected {
  data: Task[];
  success: boolean;
  message: string;
}
interface CreateTaskExpected {
  data: Task;
  success: boolean;
  message: string;
}
interface DeleteTaskExpected {
  success: boolean;
  message: string;
  data: string;
}
export interface TaskStatus {
  status: "COMPLETED" | "PENDING" | "BACKLOG";
  taskId: string;
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamTasks.fulfilled, (state, action) => {
        state.error = null;
        state.tasks = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getTeamTasks.rejected, (state, action) => {
        state.error =
          action.payload || "Task fetch Failed || Internal Server error";
        state.isLoading = false;
      })
      .addCase(getPersonalTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPersonalTasks.fulfilled, (state, action) => {
        state.error = null;
        state.tasks = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getPersonalTasks.rejected, (state, action) => {
        state.error =
          action.payload || "Task fetch Failed || Internal Server error";
        state.isLoading = false;
      })
      .addCase(getTeamsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamsData.fulfilled, (state, action) => {
        state.error = null;
        state.teams = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getTeamsData.rejected, (state, action) => {
        state.error =
          action.payload || "Teams Data fetch Failed || Internal Server error";
        state.isLoading = false;
      })
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.error = null;
        state.teams = [...state.teams, action.payload.data];
        state.isLoading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.error = action.payload || "Create team Failed";
        state.isLoading = false;
      })
      .addCase(updateTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload.data) {
          const index = state.teams.findIndex(
            (team) => team._id === action.payload.data._id
          );
          if (index !== -1) {
            state.teams[index] = action.payload.data;
          }
        }
        state.isLoading = false;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.error = action.payload || "Create team Failed";
        state.isLoading = false;
      })
      .addCase(changeTaskStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload.data) {
          const index = state.tasks.findIndex(
            (task) => task._id === action.payload.data._id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload.data;
          }
        }
        state.isLoading = false;
      })
      .addCase(changeTaskStatus.rejected, (state, action) => {
        state.error = action.payload || "Create team Failed";
        state.isLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        // state.error = action.payload || "Create Failed";
        state.isLoading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id != action.payload.data);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state) => {
        // state.error = action.payload || "Create Failed";
        state.isLoading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload.data) {
          const index = state.tasks.findIndex(
            (task) => task._id === action.payload.data._id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload.data;
          }
        }
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateTask.rejected, (state) => {
        // state.error = action.payload || "update Failed";
        state.isLoading = false;
      });
  },
});

export const getTeamsData = createAsyncThunk<
  GetTeamsExpected,
  void,
  { rejectValue: string }
>("task/getTeamsData", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/team/get-all-team/`);

    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Error fetching teams data"
    );
  }
});

export const createTeam = createAsyncThunk<
  CreateTeamExpected,
  teamData,
  { rejectValue: string }
>("task/createTeam", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/team/create`, data);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Team Creation failed"
    );
  }
});
export const updateTeam = createAsyncThunk<
  CreateTeamExpected,
  teamData,
  { rejectValue: string }
>("task/updateTeam", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/team/update`, data);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Team Creation failed"
    );
  }
});

export const getPersonalTasks = createAsyncThunk<
  GetAllTaskExpected,
  string,
  { rejectValue: string }
>("task/getPersonalTasks", async (userId, thunkAPI) => {
  try {
    const response = await api.get(`/task/get-personal-task/${userId}`);

    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Error fetching tasks"
    );
  }
});

export const getTeamTasks = createAsyncThunk<
  GetAllTaskExpected,
  string,
  { rejectValue: string }
>("task/getTeamTasks", async (teamId, thunkAPI) => {
  try {
    const response = await api.get(`/task/get-team-task/${teamId}`);

    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Error fetching tasks"
    );
  }
});
export const createTask = createAsyncThunk<
  CreateTaskExpected,
  taskData,
  { rejectValue: string }
>("task/createTask", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/task/create`, data);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Task Creation failed"
    );
  }
});

export const updateTask = createAsyncThunk<
  CreateTaskExpected,
  Task,
  { rejectValue: string }
>("task/updateTask", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/task/update`, data);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Task updation failed"
    );
  }
});
export const changeTaskStatus = createAsyncThunk<
  CreateTaskExpected,
  TaskStatus,
  { rejectValue: string }
>("task/statusChange", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/task/change-status`, data);
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Task updation failed"
    );
  }
});

export const deleteTask = createAsyncThunk<
  DeleteTaskExpected,
  string,
  { rejectValue: string }
>("task/deleteTask", async (id, thunkAPI) => {
  try {
    const response = await api.post(`/task/delete`, { taskId: id });
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Task Creation failed"
    );
  }
});

export default taskSlice.reducer;
