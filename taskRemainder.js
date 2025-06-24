const recurringTask = (description, time) => {
  const intervalId = setInterval(() => {
    console.log(description);
  }, time * 1000);
  return "Task Added Successfully";
};

const normalTask = (description, time) => {
  const timeOutId = setTimeout(() => {
    console.log(description);
  }, time * 1000);
  return "Task Added Successfully";
};

const exit = () => {
  return "Thanks for using our Task Reminder App";
};

const addTask = () => {
  console.log("1.Normal Task\n2.Recurring Task");
  const taskType = Number(prompt("Enter task type"));

  if (taskType > 2 || taskType < 1) {
    console.log("Enter A Valid Task Type");
    return addTask();
  }
  const description = prompt("Enter task description");
  const time = Number(prompt("Enter time in (Seconds):"));
  return taskType === 1
    ? normalTask(description, time)
    : recurringTask(description, time);
};

const commands = () => {
  const operations = [addTask];
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark as Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));
  if (choice === 5) {
    return exit();
  }
  console.log(operations[choice - 1]());
  const continueOrNot = confirm("Enter Want To Continue Or Not");
  return continueOrNot ? commands() : "Tasks Saved";
};

console.log(commands());
