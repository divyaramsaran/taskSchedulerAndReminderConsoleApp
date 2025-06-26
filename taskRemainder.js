const cancelRecurringReminder = (id) => {
  clearInterval(id);
};

const cancelNormalReminder = (id) => {
  clearTimeout(id);
};

const isPending = (taskTime, nextReminder) => {
  const [hours, minutes, seconds] = Date().split(" ")[4].split(":");
  const isHoursCompleted = taskTime[0] - hours <= 0;
  const isMinutesCompleted = taskTime[1] - minutes <= 0;
  const isSecondsCompleted = taskTime[2] - seconds <= 0;

  const currentTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  const timeWhenTaskInitialised =
    taskTime[0] * 3600 + taskTime[1] * 60 + taskTime[2];

  const timeCompleted = timeWhenTaskInitialised - currentTimeInSeconds;
  const reminder = timeCompleted <= 0 ? nextReminder : timeCompleted;
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
    task: description,
    type: 2,
    timerId: intervalId,
    reminderTime: calcTime(),
    intervalTime: time,
    status: "active",
  };
};

const normalTask = (description, time) => {
  const timeOutId = setTimeout(() => {
    console.log(description);
  }, time * 1000);
  return {
    msg: `Task ${description} scheduled in ${time} seconds.`,
    task: description,
    type: 1,
    timerId: timeOutId,
    reminderTime: calcTime(),
    intervalTime: time,
    status: "active",
  };
};

const exit = () => {
  return "Thanks for using our Task Reminder App";
};

const extractDescription = () => {
  const description = prompt("Enter task description");
  if (description.length === 0) {
    console.clear();
    console.log("Enter A Valid Description");
    return extractDescription();
  }
  return description;
};

const addTask = () => {
  console.log("1.Normal Task\n2.Recurring Task");
  const taskType = Number(prompt("Enter task type"));

  if (taskType > 2 || taskType < 1) {
    console.log("Enter A Valid Task Type");
    return addTask();
  }

  const description = extractDescription();
  const time = Number(prompt("Enter time in (Seconds):"));

  return taskType === 1
    ? normalTask(description, time)
    : recurringTask(description, time);
};

const taskLists = (tasks) => {
  return tasks.map((taskInfo) => {
    const { task, timerId, reminderTime, intervalTime } = taskInfo;
    const [completedOrNot, reminder] = isPending(reminderTime, intervalTime);
    const pendingOrCompleted = completedOrNot ? "Pending" : "Completed";
    return `${timerId} ${task} ${pendingOrCompleted} ${reminder}`;
  });
};

const extractChoice = () => {
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark As Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));

  if (isNaN(choice) || choice > 4 || choice < 1) {
    console.clear();
    console.log("Enter a Valid Choice");
    return extractChoice();
  }
  return choice;
};

const extractAndValidateCancelId = (tasksList) => {
  const cancelTaskId = Number(prompt("Enter Task Id:"));
  const targetObj = tasksList.filter((task) => {
    return task.timerId === cancelTaskId;
  });

  if (targetObj.length === 0) {
    return extractAndValidateCancelId(tasksList);
  }
  return [targetObj, cancelTaskId];
};

const markAsCompleted = () => {
  return `Task marked as completed and reminder cancelled.`;
};

const cancelTask = (tasksList) => {
  const [targetObj, cancelTaskId] = extractAndValidateCancelId(tasksList);
  targetObj.type === 1
    ? cancelNormalReminder(cancelTaskId)
    : cancelRecurringReminder(cancelTaskId);
  return tasksList.filter((task) => {
    return task.timerId != cancelTaskId;
  });
};

const commands = (tasksList) => {
  console.clear();
  const choice = extractChoice();
  switch (choice) {
    case 1:
      const taskObj = addTask();
      tasksList.push(taskObj);
      console.log(taskObj.msg);
      break;

    case 2:
      console.log(taskLists(tasksList).join("\n"));
      break;

    case 3:
      tasksList = cancelTask(tasksList);
      console.log("Successfully Cancled The Task");
      break;

    case 4:
      tasksList = cancelTask(tasksList);
      console.log(markAsCompleted());
      break;

    case 5:
      return exit();
  }
  const continueOrNot = confirm("Enter Want To Continue Or Not");
  return continueOrNot ? commands(tasksList) : exit();
};

console.log(commands([]));
