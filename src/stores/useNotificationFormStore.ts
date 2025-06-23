import { create } from "zustand";

type NotificationType = "info" | "warning" | "error";

interface NotificationFormState {
  title: string;
  body: string;
  type: NotificationType;
  seconds: string;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setType: (type: NotificationType) => void;
  setSeconds: (seconds: string) => void;
  reset: () => void;
}

export const useNotificationFormStore = create<NotificationFormState>(
  (set) => ({
    title: "",
    body: "",
    type: "info",
    seconds: "",
    setTitle: (title) => set({ title }),
    setBody: (body) => set({ body }),
    setType: (type) => set({ type }),
    setSeconds: (seconds) => set({ seconds }),
    reset: () =>
      set({
        title: "",
        body: "",
        type: "info",
        seconds: "",
      }),
  })
);
