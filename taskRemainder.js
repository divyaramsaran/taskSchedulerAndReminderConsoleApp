const cancelRecurringReminder = (id) => {
  console.log("Successfully Cancled The Task");
  clearInterval(id);
};

const cancelNormalReminder = (id) => {
  console.log("Successfully Cancled The Task");
  clearTimeout(id);
};

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

const taskLists = (tasks) => {
  return tasks.map((taskInfo) => {
    const { task, timerId, reminderTime, intervalTime } = taskInfo;
    const [completedOrNot, reminder] = isPending(reminderTime, intervalTime);
    const pendingOrCompleted = completedOrNot ? "Pending" : "Completed";
    return `${timerId} ${task} ${pendingOrCompleted} ${reminder}`;
  });
};

const commands = (tasksList) => {
  const operations = [addTask, taskLists];
  console.clear();
  console.log("1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Exit");
  const choice = Number(prompt("Enter your choice:"));

  switch (choice) {
    case 1:
      const taskObj = operations[choice - 1]();
      tasksList.push(taskObj);
      console.log(taskObj.msg);
      break;

    case 2:
      console.log(taskLists(tasksList).join("\n"));
      break;

    case 3:
      const cancelTaskId = Number(prompt("Enter Task Id To Cancel"));
      const targetObj = tasksList.filter((task) => {
        return task.timerId === cancelTaskId;
      });
      targetObj.type === 1
        ? cancelNormalReminder(cancelTaskId)
        : cancelRecurringReminder(cancelTaskId);

      tasksList = tasksList.filter((task) => {
        return task.timerId != cancelTaskId;
      });

    case 4:
      return exit();
  }
  const continueOrNot = confirm("Enter Want To Continue Or Not");
  return continueOrNot ? commands(tasksList) : "Tasks Saved";
};

console.log(commands([]));
