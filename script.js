const COHORT = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

//TO-DO:
//display current list of events usint GET and fetch function
//add a delete button
//delete button deleates that party
//add a form that allows a user to enter information about a new party using POST
//add submit button
//submit button adds new party to list of parties
//don't forget to use await and fetch where needed

const state = {
  events: [],
};

async function getList() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (!data.success) {
      throw data.error;
    }
    console.log(data.data);
    state.events = data.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function addEvent(event) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`Failed to add event: ${response.status}`);
    }
    const newEvent = await response.json();
    state.events.push(newEvent); // Update the state of the new event
    renderEvents(); // Rerender the events
  } catch (error) {
    console.error("Error adding event:", error);
  }
}

async function deleteEvent(eventID) {
  try {
    const response = await fetch(API_URL + "/" + eventID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        "Unable to delete artist due to Http error: " + response.status
      );
    }
    render();
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderEvents() {
  //Button to Delete the Artist

  const ul = document.getElementById("event");
  ul.innerHTML = "";
  state.events.forEach((event) => {
    const eventCard = document.createElement("section");
    eventCard.innerHTML = `
      <div>
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <p>${event.date}</p>
        <p>${event.location}</p>
      </div>`; //event.date not printing correctly
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", async () => {
      await deleteEvent(event.id);
    });
    eventCard.append(deleteButton);
    ul.appendChild(eventCard);
  });
}

async function render() {
  await getList();
  renderEvents();
}

render();

const form = document.getElementById("addEvent");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dateVal = form.date.value;
  const isoDate = new Date(dateVal).toISOString();

  const newEvent = {
    name: form.eventName.value,
    description: form.description.value,
    date: isoDate,
    location: form.location.value,
  };
  await addEvent(newEvent);
  render();
});
