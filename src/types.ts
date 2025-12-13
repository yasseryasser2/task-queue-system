export enum TaskStatus {
  Pending,
  Running,
  Completed,
  Failed,
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
