import { create } from "zustand";
import { Notification } from "../model/notification";

interface NotificationState {
  inbox: Notification[];
  channelId: string;
  addToInbox: (notification: Notification) => void;
  setChannelId: (channelId: string) => void;
  markAsRead: (timestampMs: number) => void;
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
  /**
   * We're gonna assume that there cannot be multiple notifications with the
   * same timestamp - that would allow us to use timestamp as identifier for
   * notifications
   */
  markAsRead: (timestampMs) => {
    const currentInbox = get().inbox;
    currentInbox.forEach((i) => {
      if (i.timestampMs === timestampMs) {
        i.isUnread = false;
      }
    });
    set({ inbox: currentInbox });
  },
}));
