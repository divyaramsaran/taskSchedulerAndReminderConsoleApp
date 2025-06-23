# Project Title

**TimeKeeper: Task Scheduler & Reminder Console App**

---

## Overview

Create a console-based Task Scheduler and Reminder application using JavaScript’s `setTimeout()` and `setInterval()` functions. This project will help you understand asynchronous code execution, scheduling tasks, and managing periodic and delayed events in JavaScript.

---

## Functional Requirements

- **Add Task with Reminder:**  
  Users can add tasks with a description and a reminder time (in seconds or minutes).  
  The app should display a reminder message when the time is up (using `setTimeout`).

- **Recurring Reminders:**  
  Users can set up recurring reminders for specific tasks (e.g., "Drink Water every 30 minutes") using `setInterval`.

- **Cancel Reminders:**  
  Users can cancel any scheduled or recurring reminder.

- **List All Tasks:**  
  Display all scheduled tasks, their status (pending, completed, recurring), and remaining time.

- **Mark Task as Completed:**  
  Users can mark a task as completed, which should cancel any pending reminders for that task.

---

## Input and Output Specifications

### Inputs

- **Task Description:**  
  String input from the user.

- **Reminder Time:**  
  Number input (in seconds or minutes).

- **Recurring Interval (optional):**  
  Number input for recurring reminders (in seconds or minutes).

- **User Commands:**
  - Add Task
  - List Tasks
  - Cancel Reminder
  - Mark as Completed
  - Exit

### Outputs

- **Task Added Confirmation:**  
  Message confirming the task and reminder time.

- **Reminder Alert:**  
  Console message when a reminder is triggered.

- **Recurring Reminder Alert:**  
  Console message at each interval.

- **Task List:**  
  Display all tasks with their status and timing.

- **Cancellation/Completion Confirmation:**  
  Message confirming cancellation or completion.

- **Error Messages:**  
  For invalid input or actions (e.g., trying to cancel a non-existent reminder).

---

## Example Input/Output

### Example 1: Add Task

Command: Add Task
Enter task description: Take medicine
Enter reminder time (in seconds): 10

Task "Take medicine" scheduled in 10 seconds.

### Example 2: Reminder Triggered

(Reminder after 10 seconds)
🔔 Reminder: Take medicine!

### Example 3: Add Recurring Task

Command: Add Task
Enter task description: Drink water
Enter reminder time (in seconds): 0
Set as recurring? (y/n): y
Enter recurring interval (in seconds): 20

Recurring reminder "Drink water" set for every 20 seconds.

### Example 4: List Tasks

Command: List Tasks

ID | Description | Status | Next Reminder (s)
1 | Take medicine | Pending | 5
2 | Drink water | Recurring | 15

### Example 5: Cancel Reminder

Command: Cancel Reminder
Enter Task ID: 2

Recurring reminder for "Drink water" cancelled.

### Example 6: Mark as Completed

Command: Mark as Completed
Enter Task ID: 1

Task "Take medicine" marked as completed and reminder cancelled.

### Example 7: Error Handling

Command: Cancel Reminder
Enter Task ID: 5

Error: Task ID 5 does not exist or is already completed/cancelled.

## Validations

- **Reminder Time & Interval:**  
  Must be positive numbers.

- **Task Description:**  
  Cannot be empty.

- **No Duplicate Task Descriptions:**  
  Each task should have a unique description.

- **Cancel/Complete:**  
  Only possible for existing tasks.
