// Simulated database
const users = [];
const attendanceData = {};

let currentUser = null;

function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if username exists and password matches
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
  } else {
    alert('Invalid credentials!');
  }
}

function signup(event) {
  event.preventDefault();
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;

  // Save user to the "database"
  users.push({ username, password });
  alert('User registered successfully!');
  window.location.href = 'login.html';
}

function loadUser() {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    document.getElementById('usernameDisplay').textContent = currentUser.username;
  } else {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUser = null;
  window.location.href = 'login.html';
}

function generateCalendar() {
  const calendar = document.getElementById('calendar');
  const daysInMonth = new Date(2024, 0, 0).getDate(); // Total days in current month

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.classList.add('day');
    dayDiv.onclick = () => toggleAttendance(day);
    calendar.appendChild(dayDiv);
  }
}

function toggleAttendance(day) {
  const dayDiv = document.querySelector(`#calendar div:nth-child(${day})`);
  
  if (!attendanceData[currentUser.username]) {
    attendanceData[currentUser.username] = [];
  }
  
  if (attendanceData[currentUser.username].includes(day)) {
    attendanceData[currentUser.username] = attendanceData[currentUser.username].filter(d => d !== day);
    dayDiv.classList.remove('present');
    dayDiv.classList.add('absent');
  } else {
    attendanceData[currentUser.username].push(day);
    dayDiv.classList.add('present');
  }

  calculateAttendancePercentage();
}

function calculateAttendancePercentage() {
  const totalDays = Object.keys(attendanceData).length;
 
