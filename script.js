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
async function addEvent(events) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(
        "Unable to add event due to Http error: " + response.status
      )
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderEvents() {}
async function render(event) {
  await getList();
  renderEvents();
  const form = document.getElementById("addEvent");
  const button = document.getElementById("add-event");
  button.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  const formData = new FormData(form);
  const newEvent = {
    id: formData.get("id"),
    name: formData.get("eventName"),
    description: formData.get("description"),
    date: formData.get("date"),
    location: formData.get("location"),
  };
  addEvent(newEvent);
}

render();
