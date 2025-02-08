import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { Task } from "../../utils/types";

interface pieChartData {
  name: string;
  value: number;
}

interface barChartData {
  name: string;
  points: number;
}

interface commonState {
  totalPoints: number;
  usersAllTasks: Task[];
  taskStatusData: pieChartData[];
  taskPointsData: barChartData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: commonState = {
  totalPoints: 0,

  usersAllTasks: [],
  taskStatusData: [],
  taskPointsData: [],
  isLoading: false,
  error: null,
};

interface ChartDataExpected {
  totalPoints: number;
  taskStatusData: pieChartData[];
  taskPointsData: barChartData[];
  usersAllTasks: Task[];
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChartsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChartsData.fulfilled, (state, action) => {
        state.taskStatusData = action.payload.taskStatusData;
        state.taskPointsData = action.payload.taskPointsData;
        state.usersAllTasks = action.payload.usersAllTasks;
        state.totalPoints = action.payload.totalPoints;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getChartsData.rejected, (state, action) => {
        state.error = action.payload || "Chartdata getch failed";
        state.isLoading = false;
      });
  },
});

export const getChartsData = createAsyncThunk<
  ChartDataExpected,
  void,
  { rejectValue: string }
>("common/pieChartData", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/chart/data`);
    if (response.data.success) {
      let tasks: Task[] = response.data.tasks;

      const statusData = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {} as Record<Task["status"], number>);

      const taskStatusData = Object.entries(statusData).map(
        ([status, count]) => ({
          name: status,
          value: count,
        })
      );

      let usersAllTasks = tasks.sort((a, b) => {
        const createdDiff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (createdDiff !== 0) return createdDiff; // If different `createdAt`, sort by it
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      });

      const taskPointsData = tasks.map((task) => {
        return { name: task.title, points: task.points };
      });

      const totalPoints = tasks
        .filter((task) => task.status == "COMPLETED")
        .reduce((sum, task) => sum + task.points, 0);

      return { taskStatusData, taskPointsData, usersAllTasks, totalPoints };
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Chart Data Fetch Failed"
    );
  }
});

export default commonSlice.reducer;
