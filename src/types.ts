export enum TaskStatus {
  Pending = "Pending",
  Running = "Running",
  Completed = "Completed",
  Failed = "Failed",
}

export enum Priority {
  Low,
  Medium,
  High,
  Critical,
}

export interface ITask {
  id: string;
  name: string;
  priority: Priority;
  status: TaskStatus;
  execute: () => Promise<void>;
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
}
