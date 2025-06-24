const calcTime = () => {
  const [hours, minutes, seconds] = Date().split(" ")[4].split(":");
  return [hours, minutes, seconds];
};

const recurringTask = (description, time) => {
  const intervalId = setInterval(() => {
    console.log(description);
  }, time * 1000);
  return {
    msg: `Task ${description} scheduled in ${time} seconds.`,
    list: [description, intervalId, calcTime()],
  };
};

const normalTask = (description, time) => {
  const timeOutId = setTimeout(() => {
    console.log(description);
  }, time * 1000);
  return {
    msg: `Task ${description} scheduled in ${time} seconds.`,
    list: [description, timeOutId, calcTime()],
  };
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

const list = (tasks) => {
  return tasks.map((taskInfo) => {
    const [description, id, time] = taskInfo;
    return `${taskInfo[id]} ${description} Status Next Reminder`;
  });
};

const commands = (tasksList) => {
  const operations = [addTask, list];
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark as Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));

  if (choice === 1) {
    const { msg, list } = operations[choice - 1]();
    tasksList.push(list);
    console.log(msg);
  }

  if (choice === 2) {
    return list(tasksList).join('\n');
  }
  const continueOrNot = confirm("Enter Want To Continue Or Not");
  return continueOrNot ? commands(tasksList) : "Tasks Saved";
};

console.log(commands([]));
