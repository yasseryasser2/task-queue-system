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
  private async processNext(): Promise<void> {}
}
