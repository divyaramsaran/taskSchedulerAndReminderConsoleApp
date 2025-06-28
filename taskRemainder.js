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

const recurringTask = (description, time, count) => {
  const createdAt = Date.now();
  const timerId = setInterval(() => {
    console.log(`🔔 Reminder: ${description}`);
  }, time * 1000);

  return {
    id: count,
    description,
    type: "recurring",
    createdAt,
    delay: time,
    timerId,
    status: "pending",
  };
};
const normalTask = (description, time, count) => {
  const createdAt = Date.now();
  const timerId = setTimeout(() => {
    console.log(`🔔 Reminder: ${description}`);
  }, time * 1000);

  return {
    id: count,
    description,
    type: "normal",
    createdAt,
    delay: time,
    timerId,
    status: "pending",
  };
};

const taskManager = () => {
  let taskIdCounter = 0;
  return (description, time, type) => {
    taskIdCounter++;
    console.log(taskIdCounter);

    return type === 1
      ? normalTask(description, time, taskIdCounter)
      : recurringTask(description, time, taskIdCounter);
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

const extractTypeAndDescription = () => {
  console.log("1.Normal Task\n2.Recurring Task");
  const taskType = Number(prompt("Enter task type"));

  if (taskType > 2 || taskType < 1) {
    console.log("Enter A Valid Task Type");
    return extractTypeAndDescription();
  }

  const description = extractDescription();
  const time = Number(prompt("Enter time in (Seconds):"));

  return [description, time, taskType];
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
  taskManager(description, time, targetObj.type);
  return tasksList.filter((task) => {
    return task.timerId != cancelTaskId;
  });
};

const commands = (tasksList, createTask) => {
  console.clear();
  const choice = extractChoice();
  switch (choice) {
    case 1:
      const [description, time, taskType] = extractTypeAndDescription();
      const taskObj = createTask(description, time, taskType);
      tasksList.push(taskObj);
      console.log(taskObj.description);
      break;

    case 2:
      console.log(taskLists(tasksList).join("\n"));
      break;

    case 3:
      if (tasksList.length === 0) {
        console.log("No Tasks Added Yet");
        return commands(tasksList, createTask);
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
  return continueOrNot ? commands(tasksList, createTask) : exit();
};
const createTask = taskManager();

console.log(commands([], createTask));
