const isPending = (taskTime, nextReminder) => {
  const [hours, minutes, seconds] = Date().split(" ")[4].split(":");
  const isHoursCompleted = taskTime[0] - hours <= 0;
  const isMinutesCompleted = taskTime[1] - minutes <= 0;
  const isSecondsCompleted = taskTime[2] - seconds <= 0;
  const reminingHours = hours - taskTime[0];
  const reminingMinutes = reminingHours * 60 + (minutes - taskTime[1]);
  const reminingSeconds = reminingMinutes * 60 + (seconds - taskTime[2]);
  const timeCompleted = reminingSeconds % nextReminder;
  const reminder = timeCompleted === 0 ? nextReminder : timeCompleted;
  return [
    isHoursCompleted || isMinutesCompleted || isSecondsCompleted,
    reminder,
  ];
};

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
    list: [description, intervalId, calcTime(), time],
  };
};

const normalTask = (description, time) => {
  const timeOutId = setTimeout(() => {
    console.log(description);
  }, time * 1000);
  return {
    msg: `Task ${description} scheduled in ${time} seconds.`,
    list: [description, timeOutId, calcTime(), time],
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
    const [description, id, time, nextReminder] = taskInfo;
    const [completedOrNot, reminder] = isPending(time, nextReminder);
    const pendingOrCompleted = completedOrNot ? "Pending" : "Completed";
    return `${id} ${description} ${pendingOrCompleted} ${reminder}`;
  });
};

const commands = (tasksList) => {
  const operations = [addTask, list];
  console.clear();
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
    return list(tasksList).join("\n");
  }
  const continueOrNot = confirm("Enter Want To Continue Or Not");
  return continueOrNot ? commands(tasksList) : "Tasks Saved";
};

console.log(commands([]));
