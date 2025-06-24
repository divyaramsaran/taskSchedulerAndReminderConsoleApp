const addTask = () => {
  console.log("1.Normal Task\n2.Recurring Task");
  const taskType = Number(prompt("Enter task type"));
  if (taskType > 2 || taskType < 1) {
    console.log("Enter A Valid Task Type");
    return addTask();
  }
  const description = prompt("Enter task description");
  const time = Number(prompt("Enter time in (Seconds):"));
  return taskType === 1 ? "normalTask" : "recurringTask";
};

const commands = () => {
  const operations = [addTask];
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark as Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));
  return operations[choice - 1]();
};

console.log(commands());
