// script.js
const calendarContainer = document.getElementById('calendar-container');
const percentageElement = document.getElementById('percentage');

// Object to store attendance for each day of the year (true = present, false = absent)
let attendanceData = {};

// Function to generate the year-based calendar
function generateCalendar() {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, monthIndex) => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');

        const monthName = document.createElement('div');
        monthName.classList.add('month-name');
        monthName.textContent = month;
        monthDiv.appendChild(monthName);

        const gridDays = document.createElement('div');
        gridDays.classList.add('grid-days');
        
        const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
        const firstDay = new Date(2024, monthIndex, 1).getDay();  // Get the first day of the month

        // Add empty cells for the days before the start of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            gridDays.appendChild(emptyCell);
        }

        // Create date cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.classList.add('date');
            dateCell.textContent = day;

            // Add event listener to toggle attendance
            dateCell.addEventListener('click', function() {
                toggleAttendance(monthIndex, day, dateCell);
            });

            gridDays.appendChild(dateCell);
        }

        monthDiv.appendChild(gridDays);
        calendarContainer.appendChild(monthDiv);
    });
}

// Toggle attendance for a day
function toggleAttendance(monthIndex, day, dateCell) {
    const dateKey = `${monthIndex + 1}-${day}`; // Unique key for each date (e.g., "1-15" for January 15th)
    
    if (!attendanceData[dateKey]) {
        attendanceData[dateKey] = 'present';
        dateCell.classList.add('present');
        dateCell.classList.remove('absent');
    } else if (attendanceData[dateKey] === 'present') {
        attendanceData[dateKey] = 'absent';
        dateCell.classList.add('absent');
        dateCell.classList.remove('present');
    } else {
        attendanceData[dateKey] = 'present';
        dateCell.classList.add('present');
        dateCell.classList.remove('absent');
    }

    // Update the attendance percentage
    updateAttendancePercentage();
}

// Update attendance percentage
function updateAttendancePercentage() {
    const totalDays = Object.keys(attendanceData).length;
    const presentDays = Object.values(attendanceData).filter(status => status === 'present').length;
    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    percentageElement.textContent = `${percentage}%`;
}

// Initialize the calendar when the page loads
window.onload = generateCalendar;
