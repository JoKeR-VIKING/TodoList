let tasks = [];
let completedTasks = [];
let pendingNotifications = 0;

document.getElementsByClassName("notification")[0].addEventListener("click", function () {
    let pending = document.getElementsByClassName("unread")[0];
    pending.style.display = "none";
    pendingNotifications = 0;

    let completedDisplay = document.getElementsByClassName("completed-display")[0];
    if (completedDisplay.style.display === "block")
    {
        completedDisplay.style.display = "none";
        return;
    }

    completedDisplay.style.display = "block";
    completedDisplay.innerHTML = "";

    for (let task of completedTasks)
    {
        let complete = document.createElement("div");
        complete.className = "complete-task";
        complete.textContent = task + " completed!";
        completedDisplay.appendChild(complete);
        completedDisplay.appendChild(document.createElement("hr"));
    }
});

document.getElementsByClassName("add")[0].addEventListener("click", function () {
    addTask();
});

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter")
    {
        event.preventDefault();
        event.stopPropagation();
        addTask();
    }
});

function addTask()
{
    tasks.push(document.getElementsByClassName("task-entry")[0].value);
    document.getElementsByClassName("task-entry")[0].value = "";

    fillPages();
    displayTask(tasks.length % 15 === 0 ? tasks.length / 15 - 1 : Math.floor(tasks.length / 15));
}

function fillPages()
{
    let pages = document.getElementsByClassName("pages")[0];
    pages.innerHTML = "";

    let x = 0;
    for (let i=0;i<tasks.length;i+=15,x++)
    {
        let pageButton = document.createElement("span");
        pageButton.className = "page-button";
        pageButton.id = x.toString();
        pages.appendChild(pageButton);
    }

    let pageButtons = document.getElementsByClassName("page-button");
    for (let button of pageButtons)
    {
        button.addEventListener("click", function () {
            displayTask(parseInt(button.id));
        });
    }
}

function displayTask(start)
{
    let display = document.getElementsByClassName("task-display")[0];
    display.innerHTML = "";

    start = start > 0 ? start : 0;
    start *= 15;
    for (let i=start;i<start + 15 && i<tasks.length;i++)
    {
        let taskCard = document.createElement("div");
        let taskCardDetails = document.createElement("p");
        let doneButton = document.createElement("button");
        doneButton.className = "done";
        doneButton.id = i.toString();
        taskCardDetails.textContent = tasks[i];
        taskCard.className = "card";
        taskCard.appendChild(taskCardDetails);
        taskCard.appendChild(doneButton);

        display.appendChild(taskCard);
    }

    let done = document.getElementsByClassName("done");
    for (let button of done)
    {
        button.addEventListener("click", function () {
            completedTasks.push(tasks[parseInt(button.id)]);
            if (completedTasks.length > 5)
                completedTasks.splice(0, 1);

            notify();
            tasks.splice(parseInt(button.id), 1);
            fillPages();
            displayTask(tasks.length % 15 === 0 ? tasks.length / 15 - 1 : Math.floor(tasks.length / 15));
        });
    }
}

function notify()
{
    let pending = document.getElementsByClassName("unread")[0];
    pending.textContent = (++pendingNotifications).toString();
    pending.style.display = "flex";
}
