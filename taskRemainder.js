const commands = () => {
  console.log(
    "1.Add Task\n2.List Tasks\n3.Cancel Reminder\n4.Mark as Completed\n5.Exit"
  );
  const choice = Number(prompt("Enter your choice:"));
  return choice;
};

console.log(commands());
