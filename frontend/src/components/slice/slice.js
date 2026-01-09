import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../services/service";

/* -------------------------------
   INITIAL STATE
-------------------------------- */
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  allusers: [],
  allTrips: [],
  allVehicles: [],
  tripsPerDriver: [],
  fuelEfficiencyPerDriver: [],
  distancePerDay: [],
  fuelPerVehicle: [],
  avgSpeedPerDriver: [],
};


/* -------------------------------
   REGISTER
-------------------------------- */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await services.registerUser(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* -------------------------------
   LOGIN
-------------------------------- */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await services.loginUser(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* -------------------------------
   GET ALL USERS
-------------------------------- */
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.allUser(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* -------------------------------
   GET ALL TRIPS  
-------------------------------- */
export const getAllTrips = createAsyncThunk(
  "auth/getAllTrips",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const id = getState().auth.user._id;
      const res = await services.allTrips(token,id);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


/* -------------------------------
   GET  TRIPS BY ID  
-------------------------------- */
export const getTripsById = createAsyncThunk(
  "auth/getTripsById",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.allTrips(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* -------------------------------
   GET ALL VEHICLES
-------------------------------- */
export const getAllVehicles = createAsyncThunk(
  "auth/getAllVehicles",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.getAllVehicles(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);



/* -------------------------------
   ADD VEHICLE
-------------------------------- */
export const addVehicle = createAsyncThunk(
  "auth/addVehicle",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.addVehicle(payload, token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* -------------------------------
   ADD TRIP
-------------------------------- */
export const addTrip = createAsyncThunk(
  "auth/addTrip",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.addTrip(payload, token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);



/* -------------------------------
   GRAPH DATA THUNKS
-------------------------------- */
export const getTripsPerDriver = createAsyncThunk(
  "auth/getTripsPerDriver",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.getTripsPerDriver(token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getFuelEfficiencyPerDriver = createAsyncThunk(
  "auth/getFuelEfficiencyPerDriver",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.getFuelEfficiencyPerDriver(token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getDistancePerDay = createAsyncThunk(
  "auth/getDistancePerDay",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.getDistancePerDay(token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getFuelPerVehicle = createAsyncThunk(
  "auth/getFuelPerVehicle",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.getFuelPerVehicle(token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getAvgSpeedPerDriver = createAsyncThunk(
  "auth/getAvgSpeedPerDriver",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await services.getAvgSpeedPerDriver(token);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
/* -------------------------------
   SLICE
-------------------------------- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.allusers = [];
      state.allTrips = []; 
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* REGISTER */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL USERS */
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allusers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL TRIPS */
      .addCase(getAllTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTrips.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.loading = false;
        state.allTrips = action.payload;
      })
      .addCase(getAllTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      /* GET ALL TRIPS BY ID*/
      .addCase(getTripsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTripsById.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.loading = false;
        state.allTrips = action.payload;
      })
      .addCase(getTripsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* GET ALL VEHICLES */
      .addCase(getAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.allVehicles = action.payload;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(getTripsPerDriver.fulfilled, (state, action) => {
  state.tripsPerDriver = action.payload;
})
.addCase(getFuelEfficiencyPerDriver.fulfilled, (state, action) => {
  state.fuelEfficiencyPerDriver = action.payload;
})
.addCase(getDistancePerDay.fulfilled, (state, action) => {
  state.distancePerDay = action.payload;
})
.addCase(getFuelPerVehicle.fulfilled, (state, action) => {
  state.fuelPerVehicle = action.payload;
})
.addCase(getAvgSpeedPerDriver.fulfilled, (state, action) => {
  state.avgSpeedPerDriver = action.payload;
})/* ADD VEHICLE */
.addCase(addVehicle.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(addVehicle.fulfilled, (state, action) => {
  state.loading = false;
  state.allVehicles.push(action.payload);
})
.addCase(addVehicle.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

/* ADD TRIP */
.addCase(addTrip.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(addTrip.fulfilled, (state, action) => {
  state.loading = false;
  state.allTrips.push(action.payload);
})
.addCase(addTrip.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
