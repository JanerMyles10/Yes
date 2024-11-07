const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventSubmit = document.querySelector(".add-event-btn");
  
let today = new Date(), activeDay, month = today.getMonth(), year = today.getFullYear();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const eventsArr = [];

getEvents();
console.log(eventsArr);

// Initialize Calendar
function initCalendar() {
  const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0),
    prevLastDay = new Date(year, month, 0), prevDays = prevLastDay.getDate(),
    lastDate = lastDay.getDate(), day = firstDay.getDay(), nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = `${months[month]} ${year}`;
  let days = "";

  for (let x = day; x > 0; x--) days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    eventsArr.forEach(eventObj => {
      if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) event = true;
    });
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      days += event ? `<div class="day today active event">${i}</div>` : `<div class="day today active">${i}</div>`;
    } else {
      days += event ? `<div class="day event">${i}</div>` : `<div class="day">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) days += `<div class="day next-date">${j}</div>`;
  daysContainer.innerHTML = days;
  addListner();
}

// Previous and Next Month
function prevMonth() { month--; if (month < 0) { month = 11; year--; } initCalendar(); }
function nextMonth() { month++; if (month > 11) { month = 0; year++; } initCalendar(); }

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
initCalendar();

// Active Day Handler
function addListner() {
  document.querySelectorAll(".day").forEach(day => {
    day.addEventListener("click", e => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      document.querySelectorAll(".day").forEach(day => day.classList.remove("active"));
      if (e.target.classList.contains("prev-date")) { prevMonth(); setTimeout(() => addActiveClass(e.target.innerHTML), 100); }
      else if (e.target.classList.contains("next-date")) { nextMonth(); setTimeout(() => addActiveClass(e.target.innerHTML), 100); }
      else e.target.classList.add("active");
    });
  });
}

function addActiveClass(day) {
  document.querySelectorAll(".day").forEach(dayEl => {
    if (!dayEl.classList.contains("prev-date") && dayEl.innerHTML === day) dayEl.classList.add("active");
  });
}

todayBtn.addEventListener("click", () => { today = new Date(); month = today.getMonth(); year = today.getFullYear(); initCalendar(); });

dateInput.addEventListener("input", e => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) dateInput.value += "/";
  if (dateInput.value.length > 7) dateInput.value = dateInput.value.slice(0, 7);
  if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) dateInput.value = dateInput.value.slice(0, 2);
});

gotoBtn.addEventListener("click", () => {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
    month = dateArr[0] - 1; year = dateArr[1]; initCalendar();
  } else alert("Invalid Date");
});

// Get Active Day Name and Date
function getActiveDay(date) {
  const day = new Date(year, month, date), dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName; eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Update Events
function updateEvents(date) {
  let events = "";
  eventsArr.forEach(event => {
    if (date === event.day && month + 1 === event.month && year === event.year) {
      event.events.forEach(event => {
        events += `<div class="event"><div class="title"><i class="fas fa-circle"></i><h3 class="event-title">${event.title}</h3></div><div class="event-time"><span class="event-time">${event.time}</span></div></div>`;
      });
    }
  });
  if (events === "") events = `<div class="no-event"><h3>No Events</h3></div>`;
  eventsContainer.innerHTML = events;
  saveEvents();
}

// Add Event
addEventBtn.addEventListener("click", () => addEventWrapper.classList.toggle("active"));
addEventCloseBtn.addEventListener("click", () => addEventWrapper.classList.remove("active"));
document.addEventListener("click", e => { if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) addEventWrapper.classList.remove("active"); });
addEventTo.addEventListener("input", e => { addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, ""); if (addEventTo.value.length === 2) addEventTo.value += ":"; if (addEventTo.value.length > 5) addEventTo.value = addEventTo.value.slice(0, 5); });

// Save Event
addEventSubmit.addEventListener("click", () => {
  const timeFromArr = eventTimeFrom.split(":"), timeToArr = eventTimeTo.split(":");
  if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) { alert("Invalid Time Format"); return; }
  const newEvent = { title: eventTitle, time: `${eventTimeFrom} - ${eventTimeTo}` };
  let eventAdded = false;
  eventsArr.forEach(item => { if (item.day === activeDay && item.month === month + 1 && item.year === year) { item.events.push(newEvent); eventAdded = true; } });
  if (!eventAdded) eventsArr.push({ day: activeDay, month: month + 1, year: year, events: [newEvent] });
  addEventWrapper.classList.remove("active");
  addEventTitle.value = ""; addEventFrom.value = ""; addEventTo.value = "";
  updateEvents(activeDay);
  const activeDayEl = document.querySelector(".day.active"); if (!activeDayEl.classList.contains("event")) activeDayEl.classList.add("event");
});

// Delete Event
eventsContainer.addEventListener("click", e => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach(event => {
        if (event.day === activeDay && event.month === month + 1 && event.year === year) {
          event.events.forEach((item, index) => { if (item.title === eventTitle) { event.events.splice(index, 1); } });
          if (event.events.length === 0) { eventsArr.splice(eventsArr.indexOf(event), 1); const activeDayEl = document.querySelector(".day.active"); if (activeDayEl.classList.contains("event")) activeDayEl.classList.remove("event"); }
        }
      });
      updateEvents(activeDay);
    }
  }
});

// Save Events in LocalStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Get Events from LocalStorage
function getEvents() {
  if (localStorage.getItem("events") !== null) eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

addEventSubmit.addEventListener("click", () => {
  // Get the values from the event time input fields
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  // Split the time input into hours and minutes for validation
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");

  // Validate the time format
  if (timeFromArr.length !== 2 || timeToArr.length !== 2 || 
      timeFromArr[0] > 23 || timeFromArr[1] > 59 || 
      timeToArr[0] > 23 || timeToArr[1] > 59) {
    alert("Invalid Time Format");
    return;
  }

  // Get the event title from the input field
  const eventTitle = addEventTitle.value;

  // Create a new event object
  const newEvent = { title: eventTitle, time: `${eventTimeFrom} - ${eventTimeTo}` };

  let eventAdded = false;

  // Add the event to the existing array of events
  eventsArr.forEach(item => {
    if (item.day === activeDay && item.month === month + 1 && item.year === year) {
      item.events.push(newEvent);
      eventAdded = true;
    }
  });

  // If no events exist for that day, create a new entry in the array
  if (!eventAdded) {
    eventsArr.push({ day: activeDay, month: month + 1, year: year, events: [newEvent] });
  }

  // Close the add event wrapper
  addEventWrapper.classList.remove("active");

  // Clear the input fields after adding the event
  addEventTitle.value = ""; 
  addEventFrom.value = ""; 
  addEventTo.value = "";

  // Update the events for the selected day
  updateEvents(activeDay);

  // Add event class to the active day if it doesn't already have it
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});
