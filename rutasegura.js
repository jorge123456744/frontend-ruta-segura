
let routes = [
];

let originalRouteNumber = "";

let Students=[];
let originalStudentName="";

let mostrarEventos = false;

function mostrarSeccion() {
const eventsSection = document.getElementById('eventsSection');
const mapContainer = document.getElementById('map'); 

if (mostrarEventos) {
  mapContainer.style.display = 'none';
  eventsSection.style.display = 'block';
} else {
  mapContainer.style.display = 'block';
  eventsSection.style.display = 'none';
}
}


window.onload = mostrarSeccion; 


const viewEventsButton = document.getElementById('viewEventsButton');
viewEventsButton.addEventListener('click', () => {
mostrarEventos = true; 
mostrarSeccion(); 
});


const backToCalendarButton = document.getElementById('backToCalendarButton');
backToCalendarButton.addEventListener('click', () => {
mostrarEventos = false;
mostrarSeccion(); 
});

function openModal(modalId) {
var modal=  document.getElementById(modalId);
modal.style.display = "block";
}

function closeModal(modalId) {
var modal=  document.getElementById(modalId);
modal.style.display = "none";
}

function toggleMenu() {
const menu = document.getElementById('menu');
menu.classList.toggle('active');
}

function showModal(modalId) {

  const modal = document.getElementById(modalId);
modal.style.display = "block";
}

document.getElementById('addTravelBtn').addEventListener('click', function() {
  const TravelContainer = document.createElement('div');
  TravelContainer.classList.add('Travel');
  TravelContainer.innerHTML = `
      <label for="StudentName">Nombre del Estudiante:</label>
      <input type="text" class="StudentName" name="StudentName" required>

      <label for="TravelsStudents">viajes:</label>
      <input type="number" class="TravelsStudents" name="TravelsStudents" required>

      <label for="TravelsPrice">Precio:</label>
      <input type="number" class="TravelsPrice" name="TravelsPrice" required>
  `;
  document.getElementById('TravelsContainer').appendChild(TravelContainer);
});

document.getElementById('invoiceForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const customerName = document.getElementById('customerName').value;
  const invoiceDate = document.getElementById('invoiceDate').value;

  const estudentsTravels = [];
  document.querySelectorAll('.Travels').forEach(Travel => {
      const nameStudent = Travel.querySelector('.Traveli').value;
      const quantity = Travel.querySelector('.TravelsQuantity').value;
      const price = Travel.querySelector('.TravelsPrice').value;
      const totalPrice = quantity *price;
      estudentsTravels.push({ nameStudent, quantity, price, totalPrice });
     
  });

  let invoiceHTML = `<h2>Factura</h2>
                     <p>Nombre del Cliente: ${customerName}</p>
                     <p>Fecha: ${invoiceDate}</p>
                     <h3>viajes</h3>
                     <ul>`;
                     console.log('mando la facturainvoicehtml')

  estudentsTravels.forEach(Travel => {
      invoiceHTML += `<li> estudiante: ${Travel.nameStudent} - Cantidad: ${Travel.quantity},
       Precio por viaje: ${Travel.price}, precio total: ${Travel.totalPrice}</li>`;
      console.log('mando la factura1')
  });

  invoiceHTML += `</ul>`;

  document.getElementById('invoiceOutput').innerHTML = invoiceHTML;
});

/*termino de agreagrlo*/


function showAddRouteForm() {
document.getElementById('addRouteForm').style.display = "block";
document.getElementById('addRouteBtn').style.display = "none";
document.getElementById('cancelBtn').classList.remove('hidden');
document.getElementById('routeNumber').value = "";
document.getElementById('driverName').value = "";
document.getElementById('departureTime').value = "";
document.getElementById('origin').value = "";
document.getElementById('destination').value = "";
document.getElementById('saveRouteBtn').textContent = "Guardar Ruta";
originalRouteNumber = "";
console.log("doy clik en el boton agregar ruta")
}

function hideAddRouteForm() {
document.getElementById('addRouteForm').style.display = "none";
document.getElementById('addRouteBtn').style.display = "block";
document.getElementById('cancelBtn').classList.add('hidden');
}

function saveRoute() {
const routeNumber = document.getElementById('routeNumber').value;
const driverName = document.getElementById('driverName').value;
const departureTime = document.getElementById('departureTime').value;
const origin = document.getElementById('origin').value;
const destination = document.getElementById('destination').value;

if (originalRouteNumber) {
const route = routes.find(r => r.routeNumber === originalRouteNumber);
route.routeNumber = routeNumber;
route.driverName = driverName;
route.departureTime = departureTime;
route.origin = origin;
route.destination = destination; 
} else {
const newRoute = { routeNumber, driverName, departureTime, origin, destination };
routes.push(newRoute);
}
hideAddRouteForm();
renderRoutes();
}

function renderRoutes() {
const routesTable = document.getElementById('routesTable');
routesTable.innerHTML = "";

routes.forEach((route) => {  
const row = routesTable.insertRow();
row.insertCell().textContent = route.routeNumber;
row.insertCell().textContent = route.driverName;
row.insertCell().textContent = route.departureTime;
row.insertCell().textContent = route.origin;
row.insertCell().textContent = route.destination;
const actionsCell = row.insertCell();
const editBtn = document.createElement('button');
editBtn.textContent = "Editar";
editBtn.onclick = () => editRoute(route.routeNumber);
actionsCell.appendChild(editBtn);
const deleteBtn = document.createElement('button');
deleteBtn.textContent = "Eliminar";
deleteBtn.onclick = () => deleteRoute(route.routeNumber);
actionsCell.appendChild(deleteBtn);
console.log("agrego los datos de laruta o actualizo los datos de la ruta")
});
}


function editRoute(routeNumber) {
  const route = routes.find(r => r.routeNumber === routeNumber);
  document.getElementById('routeNumber').value = route.routeNumber;
  document.getElementById('driverName').value = route.driverName;
  document.getElementById('departureTime').value = route.departureTime;
  document.getElementById('origin').value = route.origin;
  document.getElementById('destination').value = route.destination;
  document.getElementById('addRouteForm').style.display = "block";
  document.getElementById('addRouteBtn').style.display = "none";
  document.getElementById('cancelBtn').classList.remove('hidden');
  document.getElementById('saveRouteBtn').textContent = "Actualizar Ruta";
  originalRouteNumber = route.routeNumber;
  console.log("doy click en el boton editar")
}
function deleteRoute(routeNumber) {
   routes = routes.filter(r => r.routeNumber !== routeNumber);
   renderRoutes();
   console.log("elimino la ruta")
}

function searchRoutes() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredRoutes = routes.filter(route =>
      route.routeNumber.toLowerCase().includes(searchInput) ||
      route.driverName.toLowerCase().includes(searchInput) ||
      route.departureTime.toLowerCase().includes(searchInput) ||
      route.origin.toLowerCase().includes(searchInput) ||
      route.destination.toLowerCase().includes(searchInput)
    );
    renderFilteredRoutes(filteredRoutes);
  }

  function renderFilteredRoutes(filteredRoutes) {
    const routesTable = document.getElementById('routesTable');
    routesTable.innerHTML = "";

    filteredRoutes.forEach((route) => {  
      const row = routesTable.insertRow();
      row.insertCell().textContent = route.routeNumber;
      row.insertCell().textContent = route.driverName;
      row.insertCell().textContent = route.departureTime;
      row.insertCell().textContent = route.origin;
      row.insertCell().textContent = route.destination;
      const actionsCell = row.insertCell();
      const editBtn = document.createElement('button');
      editBtn.textContent = "Editar";
      editBtn.onclick = () => editRoute(route.routeNumber);
      actionsCell.appendChild(editBtn);
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Eliminar";
      deleteBtn.onclick = () => deleteRoute(route.routeNumber);
      actionsCell.appendChild(deleteBtn);
      console.log("agrego los datos de la ruta o actualizo los datos de la ruta");
    });
  }

  function showAddStudentForm() {
    document.getElementById('addStudentForm').style.display = "block";
    document.getElementById('addStudentBtn').style.display = "none";
    document.getElementById('cancelBtn').classList.remove('hidden');
    document.getElementById('StudentName').value = "";
    document.getElementById('FatherName').value = "";
    document.getElementById('Address').value = "";
    document.getElementById('Telephone').value = "";
    document.getElementById('ContractPrice').value = "";
    document.getElementById('SaveBtn').textContent = "Guardar";
    originalStudentName = "";
 
  }

  function hideAddStudentForm() {
    document.getElementById('addStudentForm').style.display = "none";
    document.getElementById('addStudentBtn').style.display = "block";
    document.getElementById('cancelBtn').classList.add('hidden');
  }

  function saveStudent() {
    const StudentName =document.getElementById('StudentName').value;
    const FatherName = document.getElementById('FatherName').value;
    const Address = document.getElementById('Address').value;
    const Telephone = document.getElementById('Telephone').value;
    const ContractPrice = document.getElementById('ContractPrice').value;

    if (originalStudentName) {
      const Student= Students.find(r => r.StudentName === originalStudentName);
      Student.StudentName = StudentName;
      Student.FatherName = FatherName;
      Student.Address = Address;
      Student.Telephone =Telephone ;
      Student.ContractPrice = ContractPrice; 
    } else {
      const newStudent = { StudentName, FatherName, Address, Telephone, ContractPrice };
      Students.push(newStudent);
    }

    hideAddStudentForm();
    renderStudents();
  }

  function renderStudents() {
    const StudentsTable = document.getElementById('StudentsTable');
    StudentsTable.innerHTML = "";

    Students.forEach((Student) => {  
      const row = StudentsTable.insertRow();
      row.insertCell().textContent = Student.StudentName;
      row.insertCell().textContent = Student.FatherName;
      row.insertCell().textContent = Student.Address;
      row.insertCell().textContent = Student.Telephone;
      row.insertCell().textContent = Student.ContractPrice;
      const actionsCell = row.insertCell();
      const editBtn = document.createElement('button');
      editBtn.textContent = "Editar";
      editBtn.onclick = () => editStudent(Student.StudentName);
      actionsCell.appendChild(editBtn);
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Eliminar";
      deleteBtn.onclick = () => deleteStudent(Student.StudentName);
      actionsCell.appendChild(deleteBtn);
  
    });
  }

  function editStudent(StudentName) {
    const Student = Students.find(r => r.StudentName === StudentName);
    document.getElementById('StudentName').value = Student.StudentName;
    document.getElementById('FatherName').value = Student.FatherName;
    document.getElementById('Address').value = Student.Address;
    document.getElementById('Telephone').value = Student.Telephone;
    document.getElementById('ContractPrice').value = Student.ContractPrice;
    document.getElementById('addStudentForm').style.display = "block";
    document.getElementById('addStudentBtn').style.display = "none";
    document.getElementById('cancelBtn').classList.remove('hidden');
    document.getElementById('SaveBtn').textContent = "Actualizar Ruta";
    originalStudentName = Student.StudentName;
 
  }

  function deleteStudent(StudentName) {
    Students = Students.filter(r => r.StudentName !==StudentName);
    renderStudents();
    console.log("elimino la ruta");
  }

  function searchStudents() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = Students.filter(Student =>
      Student.StudentName.toLowerCase().includes(searchInput) ||
      Student.FatherName.toLowerCase().includes(searchInput) ||
      Student.Address.toLowerCase().includes(searchInput) ||
      Student.Telephone.toLowerCase().includes(searchInput) ||
      Student.ContractPrice.toLowerCase().includes(searchInput)
    );
    renderFilteredStudents(filteredStudents);
  }

  function renderFilteredStudents(filteredStudents) {
    const StudentsTable = document.getElementById('StudentsTable');
    StudentsTable.innerHTML = "";

    filteredStudents.forEach((Student) => {  
      const row = StudentsTable.insertRow();
      row.insertCell().textContent = Student.StudentName;
      row.insertCell().textContent = Student.FatherName;
      row.insertCell().textContent = Student.Address;
      row.insertCell().textContent = Student.Telephone;
      row.insertCell().textContent = Student.ContractPrice;
      const actionsCell = row.insertCell();
      const editBtn = document.createElement('button');
      editBtn.textContent = "Editar";
      editBtn.onclick = () => editStudent(Student.StudentName);
      actionsCell.appendChild(editBtn);
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Eliminar";
      deleteBtn.onclick = () => deleteStudent(Student.StudentName);
      actionsCell.appendChild(deleteBtn);
   

    console.log("clik en buscar")
    });
  }

// Función para abrir una pestaña específica en el modal de mensajes
function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.remove('active'); 
  });
  document.getElementById(tabId).classList.add('active'); 
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach(button => {
    button.classList.remove('active'); 
  });
  event.target.classList.add('active'); 
}
// Manejar el envío de un nuevo mensaje
document.getElementById('nuevoMensajeForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  alert('Mensaje enviado: ' + document.getElementById('mensaje').value); 
  closeModal('mensajesModal'); 
});
renderRoutes();

document.addEventListener("DOMContentLoaded", function() {
 const daysContainer = document.getElementById('days');
 const monthSelect = document.getElementById('monthSelect');
 const yearSelect = document.getElementById('yearSelect');
 const eventForm = document.getElementById('eventForm');
 const eventTextInput = document.getElementById('eventText');
 const saveEventButton = document.getElementById('saveEvent');
 const eventList = document.getElementById('eventList');
 const viewEventsButton = document.getElementById('viewEventsButton');
 const backToCalendarButton = document.getElementById('backToCalendarButton');
 const calendarSection = document.getElementById('calendarSection');
 const eventsSection = document.getElementById('eventsSection');
 const closeButton = document.getElementById('closeButton'); // Nuevo
 let currentDate = new Date();
 let selectedDate = null;
 let events = [];

 const renderMonthYearSelectors = () => {
 const currentYear = currentDate.getFullYear();
 const currentMonth = currentDate.getMonth();

for (let i = 0; i < 12; i++) {
 const option = document.createElement('option');
 option.value = i;
 option.text = new Date(0, i).toLocaleString('default', { month: 'long' });
 if (i === currentMonth) option.selected = true;
 option.classList.add('month-option');
 monthSelect.appendChild(option);
}
for (let i = currentYear - 50; i <= currentYear + 50; i++) {
 const option = document.createElement('option');
 option.value = i;
 option.text = i;
if (i === currentYear) option.selected = true;
 option.classList.add('year-option');
 yearSelect.appendChild(option);
}
};

const renderCalendar = () => {
 daysContainer.innerHTML = '';
 const year = parseInt(yearSelect.value);
 const month = parseInt(monthSelect.value);
 const firstDayOfMonth = new Date(year, month, 1).getDay();
 const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let i = 0; i < firstDayOfMonth; i++) {
 const emptyDiv = document.createElement('div');
 daysContainer.appendChild(emptyDiv);
}

for (let day = 1; day <= daysInMonth; day++) {
  const dayDiv = document.createElement('div');
  dayDiv.textContent = day;
  dayDiv.addEventListener('dblclick', () => openEventForm(new Date(year, month, day)));
  daysContainer.appendChild(dayDiv);
}
};

const openEventForm = (date) => {
  selectedDate = date;
  eventForm.style.display = 'block';
};

  const closeEventForm = () => {
  eventForm.style.display = 'none';
};

const saveEvent = () => {
if (selectedDate && eventTextInput.value.trim() !== '') {
  events.push({
  date: selectedDate,
  text: eventTextInput.value.trim()
  });
  renderEvents();
  eventTextInput.value = '';
  closeEventForm();
}
};

const renderEvents = () => {
  eventList.innerHTML = '';
  events.forEach((event, index) => {
  const li = document.createElement('li');
  li.textContent = `${event.date.toLocaleDateString()}: ${event.text}`;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Borrar';
  deleteButton.addEventListener('click', () => {
  events.splice(index, 1);
 renderEvents();
});
 li.appendChild(deleteButton);
eventList.appendChild(li);
});
};

const showEventsSection = () => {
calendarSection.style.display = 'none';
eventsSection.style.display = 'block';
};

const backToCalendar = () => {
calendarSection.style.display = 'block';
eventsSection.style.display = 'none';
};

monthSelect.addEventListener('change', renderCalendar);
yearSelect.addEventListener('change', renderCalendar);
saveEventButton.addEventListener('click', saveEvent);
viewEventsButton.addEventListener('click', showEventsSection);
backToCalendarButton.addEventListener('click', backToCalendar);
closeButton.addEventListener('click', closeEventForm); // Nuevo

renderMonthYearSelectors();
renderCalendar();
});