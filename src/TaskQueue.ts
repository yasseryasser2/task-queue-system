import { Task } from "./Task";
import { TaskStatus } from "./types";

export class TaskQueue {
  private tasks: Task[];
  private isProcessing: boolean;
  private concurrentLimit: number;
  private activeTasks: number;

  constructor(concurrentLimit: number = 1) {
    this.tasks = [];
    this.isProcessing = false;
    this.concurrentLimit = concurrentLimit;
    this.activeTasks = 0;
  }
  public addTask(task: Task): void {
    this.tasks.push(task);
    console.log("Task added: " + [task.name]);
  }
  public start(): void {
    this.isProcessing = true;
    console.log("Queue is running!");
    this.processNext();
  }

  public stop(): void {
    this.isProcessing = false;
    console.log("Queue is stopped!");
  }
  private async processNext(): Promise<void> {
    if (!this.isProcessing || this.activeTasks >= this.concurrentLimit) {
      return;
    }

    const pendingTasks = this.tasks.filter(
      (task) => task.status === TaskStatus.Pending
    );

    if (pendingTasks.length === 0) {
      return;
    }

    pendingTasks.sort((a, b) => b.priority - a.priority);
    const nextTask = pendingTasks[0]!;

    this.activeTasks++;
    console.log("Starting task: " + nextTask.name);

    try {
      await nextTask.run();
      console.log("Task completed: " + nextTask.name);
    } catch (error) {
      if (nextTask.status === TaskStatus.Pending) {
        console.log("Task failed, retrying: " + nextTask.name);
      } else {
        console.log("Task failed permanently: " + nextTask.name);
      }
    }
    this.activeTasks--;

    this.processNext();
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getTaskByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }
}
