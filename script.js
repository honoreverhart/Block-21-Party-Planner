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

async function deleteEvent(event) {
  try {
    const response = await fetch(API_URL + "/" + event.id, {
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

function renderEvents(event) {
  //Button to Delete the Artist
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.display = "block";
  deleteButton.addEventListener("click", async () => {
    await deleteArtist(event);
  });

  const ul = document.getElementById("event");
  state.events.forEach((event) => {
    const li = document.createElement("li");
    li.textContent = event.name;
    ul.appendChild(li);
  });
}

async function render(event) {
  await getList();
  renderEvents(event);
}

render();

const form = document.getElementById("addEvent");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newEvent = {
    name: form.eventName.value,
    description: form.description.value,
    date: form.date.value,
    location: form.location.value,
  };
  await addEvent(newEvent);
  render();
});

// addEvent({name: "Example Event",
//   description: "example description",
//   date: "2023-12-05T15:30:00Z",
//   location: "Denver, CO"
// })
// const form = document.getElementById("add-event");
// form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   console.log("submit");
//   const newEvent = {
//     name: form.eventName.value,
//     description: form.description.value,
//     date: form.date.value,
//     location: form.location.value
//   };
