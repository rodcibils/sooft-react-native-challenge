import { create } from "zustand";
import { Notification } from "../model/notification";

interface NotificationState {
  inbox: Notification[];
  channelId: string;
  addToInbox: (notification: Notification) => void;
  setChannelId: (channelId: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  inbox: [],
  channelId: "",
  addToInbox: (notification) => {
    const currentInbox = get().inbox;
    set({ inbox: [notification, ...currentInbox] });
  },
  setChannelId: (channelId) => {
    set({ channelId });
  },
}));
