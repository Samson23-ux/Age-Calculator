const input = document.querySelectorAll("input");
const label = document.querySelectorAll("label");
const button = document.getElementById("submit-button");
const date = document.querySelectorAll("label");
const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");
const validDate = document.createElement("p")
validDate.classList.add("valid_day")

button.addEventListener("click", validateInput)

// A function to validate the input fields
function validateInput() {
    if (dayInput.value > 31 || dayInput.value < 1) {
        validDate.innerHTML = "<em>Must be a valid day</em>"
        dayInput.insertAdjacentElement("afterend", validDate)
        dayInput.style.border = "1px solid red"
        label[0].style.color = "red"

        if (!dayInput.value) {
            validDate.innerHTML = "<em>This field is required</em>"
            dayInput.insertAdjacentElement("afterend", validDate)
        }
        return;

    } else if (monthInput.value > 12 || monthInput.value < 1) {
        validDate.innerHTML = "<em>Must be a valid month</em>"
        monthInput.insertAdjacentElement("afterend", validDate)
        monthInput.style.border = "1px solid red"
        label[1].style.color = "red"

        if (!monthInput.value) {
            validDate.innerHTML = "<em>This field is required</em>"
            monthInput.insertAdjacentElement("afterend", validDate)
        }
        return;

    } else if (yearInput.value.length < 4) {
        validDate.innerHTML = "<em>Must be a valid year</em>"
        yearInput.insertAdjacentElement("afterend", validDate)
        yearInput.style.border = "1px solid red"
        label[2].style.color = "red"
        return;

    } else if (yearInput.value > year) {
        validDate.innerHTML = "<em>Must be in the past</em>"
        yearInput.insertAdjacentElement("afterend", validDate)
        yearInput.style.border = "1px solid red"
        label[2].style.color = "red"

        if (!yearInput.value) {
            validDate.innerHTML = "<em>This field is required</em>"
            yearInput.insertAdjacentElement("afterend", validDate)
        }
        return;

    } else {
        validDate.remove()
        input.forEach((inputs) => {
            inputs.style.border = "1px solid #e0dddd"
        })
        label.forEach((labels) => {
            labels.style.color = "#787878"
        })
        if (yearInput.value < 1900) {
            alert("Year must be greater than 1899")
            return;
        }
    }

    if ((Number(monthInput.value) === 4 || Number(monthInput.value) === 6 || Number(monthInput.value) === 9 || Number(monthInput.value) === 11) && dayInput.value > 30) {
        validDate.innerHTML = "<em>Must be a valid<br> day of the month</em>"
        dayInput.insertAdjacentElement("afterend", validDate)
        dayInput.style.border = "1px solid red"
        label[1].style.color = "red"
        return;

    } else if (Number(monthInput.value) === 2 && dayInput.value > 28) {
        validDate.innerHTML = "<em>Must be a valid day of<br> the month</em>"
        dayInput.insertAdjacentElement("afterend", validDate)
        dayInput.style.border = "1px solid red"
        label[1].style.color = "red"
        return;
    }

    calculateAgeInMonth();
}

const todayDate = new Date();
const year = todayDate.getFullYear();
const month = todayDate.getMonth();
const day = todayDate.getDate();
const yearText = document.querySelector("#yy-line");
const monthText = document.querySelector("#mm-line");
const dayText = document.querySelector("#dd-line");



// Function to calculate the age in months
function calculateAgeInMonth() {
    if (!input[0].value || !input[1].value || !input[2].value) {
        return
    } else if (Number(monthInput.value) > month + 1) {
        const userMonth = (monthInput.value - (month));
        const userYear = year - yearInput.value - 1;
        yearText.textContent = userYear
        monthText.textContent = 12 - userMonth;

        if (Number(dayInput.value <= day)) {
            monthText.textContent = (12 - userMonth) + 1;
        }

    } else if (Number(monthInput.value) < month + 1) {
        const userMonth = ((month + 1) - monthInput.value);
        const userYear = year - yearInput.value;
        yearText.textContent = userYear
        monthText.textContent = userMonth;

        if (Number(dayInput.value > day)) {
            monthText.textContent = userMonth - 1;
        }

    } else if (Number(monthInput.value) === (month + 1) && Number(dayInput.value) === day) {
        const userYear = year - yearInput.value;
        yearText.textContent = userYear
        monthText.textContent = 0
        dayText.textContent = 0
        return;
    }


    calculateAgeInDays();
}




// Function to calculate the age in days
function calculateAgeInDays() {
    let days;
    const birthDay = Number(dayInput.value);
    const birthMonth = Number(monthInput.value);
    const birthYear = Number(yearInput.value);

    // Adjusting days based on the day input
    if (birthDay === day) {
        dayText.textContent = 0;

        // Adjusting days for February
    } else if ((birthMonth === 2) && day < birthDay) {
        days = getDaysInMonth(birthYear, month);
        const userDay = (days + day) - birthDay;
        dayText.textContent = userDay;

        // Adjusting the days and months for months with 30 days
    } else if ((birthMonth === 4 || birthMonth === 6 || birthMonth === 9 || birthMonth === 11) && birthDay > day) {
        days = getDaysInMonth(birthYear, month);
        const userDay = (days + day) - birthDay;
        dayText.textContent = userDay;

        // Adjusting the day text for months with 31 days
    } else if (birthDay > day) {
        days = getDaysInMonth(birthYear, month);
        const userDay = ((days + day) - birthDay) + 1;
        dayText.textContent = userDay;

        if (birthMonth === 3 || birthMonth === 5 || birthMonth === 8) {
            days = getDaysInMonth(birthYear, month);
            const userDay = ((days + day) - birthDay) + 1;
            dayText.textContent = userDay;
        }

        // Adjusting the day text based on the day input
    } else if (birthDay < day) {
        const userDay = day - birthDay;
        dayText.textContent = userDay;
    }

    // Adjusting the month and year text based on the day and month input
    if (birthDay > day && birthMonth === (month + 1)) {
        yearText.textContent = year - yearInput.value - 1;
        monthText.textContent = 11;
    } else if (birthDay < day && birthMonth === (month + 1)) {
        monthText.textContent = 0;
        yearText.textContent = year - yearInput.value;
    }
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate()
    }
}
