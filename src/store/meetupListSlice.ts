import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export interface Meetup {
  id: number;
  name: string;
  description: string;
  time: string;
  duration: number;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  createdBy: string;
  owner: { id: string; fio: string; email: string };
  users: Array<number>;
}

export interface IMeetupList {
  meetups: Array<Meetup>;
}

export const fetchMeetupList = createAsyncThunk(
  "meetup/fetchMeetupList",
  async (token: string) => {
    const request = await axios.get(`${API_BASE_URL}/meetup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.data;
    return response;
  }
);

export const fetchSubUserOnMeetup = createAsyncThunk(
  "meetup/fetchSubUserOnMeetup",
  async (arg: { token: string; meetupId: number; userId: number }) => {
    const request = await axios.put(
      `${API_BASE_URL}/meetup`,
      {
        idMeetup: arg.meetupId,
        idUser: arg.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${arg.token}`,
        },
      }
    );
    const response = await request.data;
    return response;
  }
);

export const fetchUnsubUserOnMeetup = createAsyncThunk(
  "meetup/fetchUnSubUserOnMeetup",
  async (arg: { token: string; meetupId: number; userId: number }) => {
    const request = await axios.delete(`${API_BASE_URL}/meetup`, {
      headers: {
        Authorization: `Bearer ${arg.token}`,
      },
      data: {
        idMeetup: arg.meetupId,
        idUser: arg.userId,
      },
    });
    const response = await request.data;
    return response;
  }
);
export const fetchCreateMeetup = createAsyncThunk(
  "meetup/fetchCreateMettup",
  async (arg: {
    token: string;
    name: string;
    description: string;
    time: string;
    duration: number;
    targetAudience: string;
    location: string;
    needToKnow: string;
    willHappen: string;
    reasonToCome: string;
  }) => {
    let curr = {
      name: arg.name,
      description: arg.description,
      time: arg.time,
      duration: arg.duration,
      target_audience: arg.targetAudience,
      location: arg.location,
      need_to_know: arg.needToKnow,
      will_happen: arg.willHappen,
      reason_to_come: arg.reasonToCome,
    };
    console.log(curr);
    const request = await axios.post(`${API_BASE_URL}/meetup`, curr, {
      headers: {
        Authorization: `Bearer ${arg.token}`,
      },
    });
    const response = await request.data;
    return response;
  }
);

export const fetchEditMeetup = createAsyncThunk(
  "meetup/fetchEditMeetup",
  async (arg: {
    meetupId: number;
    token: string;
    name: string;
    description: string;
    time: string;
    duration: number;
    targetAudience: string;
    location: string;
    needToKnow: string;
    willHappen: string;
    reasonToCome: string;
  }) => {
    console.log(arg);
    let curr = {
      name: arg.name,
      description: arg.description,
      time: arg.time,
      duration: arg.duration,
      target_audience: arg.targetAudience,
      location: arg.location,
      need_to_know: arg.needToKnow,
      will_happen: arg.willHappen,
      reason_to_come: arg.reasonToCome,
    };
    const request = await axios.put(
      `${API_BASE_URL}/meetup/${arg.meetupId}`,
      curr,
      {
        headers: {
          Authorization: `Bearer ${arg.token}`,
        },
      }
    );
    const response = await request.data;
    return response;
  }
);

export const fetchDeleteMeetup = createAsyncThunk(
  "meetup/fetchDeleteMeetup",
  async (arg: { meetupId: number; token: string }) => {
    const request = await axios.delete(
      `${API_BASE_URL}/meetup/${arg.meetupId}`,
      {
        headers: {
          Authorization: `Bearer ${arg.token}`,
        },
      }
    );
    const response = await request.data;
    return response;
  }
);

const initialState: IMeetupList = {
  meetups: [],
};

export const meetupListSlice = createSlice({
  name: "meetupList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetupList.fulfilled, (state, action) => {
        let newMeetups: Array<Meetup> = [];
        action.payload.map((item: any) => {
          let curr: Meetup = {
            id: item.id,
            name: item.name,
            description: item.description,
            time: item.time,
            duration: item.duration,
            location: item.location,
            target_audience: item.target_audience,
            need_to_know: item.need_to_know,
            will_happen: item.will_happen,
            reason_to_come: item.reason_to_come,
            createdBy: item.createdBy,
            users: item.users.map((user: any) => user.id),
            owner: {
              id: item.owner.id,
              fio: item.owner.fio,
              email: item.owner.email,
            },
          };
          newMeetups.push(curr);
        }, (state.meetups = newMeetups));
      })
      .addCase(fetchCreateMeetup.fulfilled, () => {
        console.log("post created");
      })
      .addCase(fetchEditMeetup.fulfilled, () => {
        console.log("meetup edited");
      })
      .addCase(fetchDeleteMeetup.fulfilled, () => {
        console.log("meetup_edited");
      })
      .addCase(fetchSubUserOnMeetup.fulfilled, () => {
        console.log("uses subs on meetup");
      })
      .addCase(fetchUnsubUserOnMeetup.fulfilled, () => {
        console.log("user unsub from meetup");
      });
  },
});

export const {} = meetupListSlice.actions;
export default meetupListSlice.reducer;
