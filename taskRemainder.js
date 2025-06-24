const recurringTask = (description, time, tastsList) => {
  const intervalId = setInterval(() => {
    console.log(description);
  }, time * 1000);
  tastsList.push(description);
  return {
    description: `Task ${description} scheduled in ${time} seconds.`,
    list: [tastsList, intervalId],
  };
};

const normalTask = (description, time, tastsList) => {
  const timeOutId = setTimeout(() => {
    console.log(description);
  }, time * 1000);
  tastsList.push(description);
  return {
    description: `Task ${description} scheduled in ${time} seconds.`,
    list: [tastsList, timeOutId],
  };
};

const exit = () => {
  return "Thanks for using our Task Reminder App";
};

const addTask = (tastsList) => {
  console.log("1.Normal Task\n2.Recurring Task");
  const taskType = Number(prompt("Enter task type"));

  if (taskType > 2 || taskType < 1) {
    console.log("Enter A Valid Task Type");
    return addTask();
  }
  const description = prompt("Enter task description");
  const time = Number(prompt("Enter time in (Seconds):"));
  return taskType === 1
    ? normalTask(description, time, tastsList)
    : recurringTask(description, time, tastsList);
};

const commands = () => {
  const operations = [addTask];
  const tastsList = [];
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark as Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));

  if (choice === 1) {
    const { description, list } = operations[choice - 1](tastsList);
    tastsList.push(list);
    console.log(description);
  }
  const continueOrNot = confirm("Enter Want To Continue Or Not");
  return continueOrNot ? commands() : "Tasks Saved";
};

console.log(commands());
