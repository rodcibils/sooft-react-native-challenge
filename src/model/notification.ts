export enum NotificationType {
  INFO = "Info",
  WARN = "Warning",
  ERROR = "Error",
}

export interface Notification {
  readonly title: string;
  readonly body: string;
  readonly type: NotificationType;
  /**
   * UTC Timestamp in ms
   */
  readonly timestampMs: number;
  isUnread: boolean;
}
