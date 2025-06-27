const cancelRecurringReminder = (id) => {
  clearInterval(id);
};

const cancelNormalReminder = (id) => {
  clearTimeout(id);
};

const getTaskStatus = (task) => {
  const elapsedSeconds = (Date.now() - task.createdAt) / 1000;
  const remaining = Math.max(0, task.delay - elapsedSeconds);
  const isPending = remaining > 0;
  const status = isPending ? "pending" : "completed";

  return {
    status,
    remaining: Math.round(remaining),
    nextExecution: task.createdAt + task.delay * 1000,
  };
};

const calcTime = () => {
  const [hours, minutes, seconds] = Date().split(" ")[4].split(":");
  return [hours, minutes, seconds];
};

const recurringTask = (description, time) => {
  const createdAt = Date.now();
  const timerId = setInterval(() => {
    console.log(`🔔 Reminder: ${description}`);
  }, time * 1000);

  return {
    id: timerId,
    description,
    type: "recurring",
    createdAt,
    delay: time,
    timerId,
    status: "pending",
  };
};
const normalTask = (description, time) => {
  const createdAt = Date.now();
  const timerId = setTimeout(() => {
    console.log(`🔔 Reminder: ${description}`);
  }, time * 1000);

  return {
    id: timerId,
    description,
    type: "normal",
    createdAt,
    delay: time,
    timerId,
    status: "pending",
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
  return tasks.map((task) => {
    const { status, remaining } = getTaskStatus(task);
    return `ID: ${task.id} | ${task.description} | ${status} | Next: ${remaining}s`;
  });
};

const extractChoice = () => {
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark As Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));

  if (isNaN(choice) || choice > 5 || choice < 1) {
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
      console.log(taskObj.description);
      break;

    case 2:
      console.log(taskLists(tasksList).join("\n"));
      break;

    case 3:
      if (tasksList.length === 0) {
        console.log("No Tasks Added Yet");
        return commands(tasksList);
      }
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
