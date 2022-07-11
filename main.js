//DATA
let contacts = []

//FUNCTIONS
function addContact(event) {
  event.preventDefault()
  let form = event.target
  let contactName = (form.name.value)
  let contactNumber = (form.phone.value)
  let contactEmergency = (form.emergencyContactBox.checked)

  let contact = {
    id: generateId(),
    name: contactName,
    phone: contactNumber,
    emergencyContact: contactEmergency
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  storedContacts = JSON.parse(window.localStorage.getItem("contacts"))

  if (storedContacts) {
    contacts = storedContacts
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = ""

  contacts.forEach(contact => {
    template += `
    <div class="card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
      <h3 class="mt-1 mb-1">${contact.name}</h3>
      <div class="d-flex space-between">
        <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>${contact.phone}</span>
        </p>
        <i class="action fa fa-trash text-danger" onclick = "removeContact('${contact.id}')"></i>
      </div>
    </div>
    `
  })

  document.getElementById("contact-list").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if(index == -1) {
    throw new Error("Invalid Contact ID")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle("hidden")
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()
