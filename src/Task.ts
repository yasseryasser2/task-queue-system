import { TaskStatus, Priority, ITask } from "./types";

export class Task implements ITask {
  public id: string;
  public name: string;
  public priority: Priority;
  public status: TaskStatus;
  public execute: () => Promise<void>;
  public retryCount: number;
  public maxRetries: number;
  public createdAt: Date;

  constructor(
    name: string,
    execute: () => Promise<void>,
    priority: Priority = Priority.Medium,
    maxRetries: number = 3
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.priority = priority;
    this.execute = execute;

    this.status = TaskStatus.Pending;
    this.retryCount = 0;
    this.maxRetries = maxRetries;
    this.createdAt = new Date();
  }

  public async run(): Promise<void> {
    this.status = TaskStatus.Running;

    try {
      await this.execute();
      this.status = TaskStatus.Completed;
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        this.status = TaskStatus.Pending;
        throw error;
      }
      this.status = TaskStatus.Failed;
      throw error;
    }
  }
}
