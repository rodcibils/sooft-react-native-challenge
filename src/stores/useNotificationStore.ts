import { create } from "zustand";
import { Notification } from "../model/notification";

interface NotificationState {
  inbox: Notification[];
  channelId: string;
  unreadCount: number;
  addToInbox: (notification: Notification) => void;
  setChannelId: (channelId: string) => void;
  markAsRead: (timestampMs: number) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  inbox: [],
  channelId: "",
  unreadCount: 0,
  addToInbox: (notification) => {
    const currentInbox = get().inbox;
    const updatedInbox = [notification, ...currentInbox];
    const unreadCount = updatedInbox.reduce((count, item) => {
      return item.isUnread === true ? count + 1 : count;
    }, 0);
    set({ inbox: updatedInbox, unreadCount });
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
    const unreadCount = currentInbox.reduce((count, item) => {
      return item.isUnread === true ? count + 1 : count;
    }, 0);
    set({ inbox: currentInbox, unreadCount });
  },
}));
