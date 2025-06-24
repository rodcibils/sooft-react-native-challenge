import { create } from "zustand";
import { NotificationType } from "../model/notification";
import { parseDelayInSeconds } from "../utils/timeUtils";

interface NotificationFormState {
  title: string;
  body: string;
  type: NotificationType;
  seconds: number;
  isLoading: boolean;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setType: (type: NotificationType) => void;
  setSeconds: (seconds: string) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useNotificationFormStore = create<NotificationFormState>(
  (set) => ({
    title: "",
    body: "",
    type: NotificationType.INFO,
    seconds: 0,
    isLoading: false,
    setTitle: (title) => set({ title }),
    setBody: (body) => set({ body }),
    setType: (type) => set({ type }),
    setSeconds: (seconds) => set({ seconds: parseDelayInSeconds(seconds) }),
    setLoading: (isLoading) => set({ isLoading }),
    reset: () =>
      set({
        title: "",
        body: "",
        type: NotificationType.INFO,
        seconds: 0,
      }),
  })
);
