import { Task } from "./Task";
import { TaskQueue } from "./TaskQueue";
import { Priority, TaskStatus } from "./types";

const fastTask = new Task(
  "Fast Task",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Fast task completed!");
  },
  Priority.High,
  3
);

const slowTask = new Task(
  "Slow Task",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Slow task completed!");
  },
  Priority.Medium,
  3
);

const lowPriorityTask = new Task(
  "Low Priority Task",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Low priority task done!");
  },
  Priority.Low,
  3
);

const failingTask = new Task(
  "Failing Task",
  async () => {
    throw new Error("This task always fails!");
  },
  Priority.Critical,
  3
);

const queue = new TaskQueue(1);

queue.addTask(fastTask);
queue.addTask(slowTask);
queue.addTask(lowPriorityTask);
queue.addTask(failingTask);

console.log("\n=== Initial Tasks ===");
console.log(queue.getTasks());

console.log("\n=== Starting Queue ===");
queue.start();

setTimeout(() => {
  console.log("\n=== Final Tasks ===");
  console.log(queue.getTasks());

  console.log("\n=== Completed Tasks ===");
  console.log(queue.getTaskByStatus(TaskStatus.Completed));

  console.log("\n=== Failed Tasks ===");
  console.log(queue.getTaskByStatus(TaskStatus.Failed));
}, 10000);
