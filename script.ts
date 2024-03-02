// Selecting HTML elements
const input: HTMLInputElement = document.querySelector("input") as HTMLInputElement;
const addbtn: HTMLButtonElement = document.querySelector(".add") as HTMLButtonElement;
const boxes: HTMLElement = document.querySelector(".boxes") as HTMLElement;
const completed: HTMLButtonElement = document.querySelector(".completed") as HTMLButtonElement;
const active: HTMLButtonElement = document.querySelector(".active") as HTMLButtonElement;
const all: HTMLButtonElement = document.querySelector(".all") as HTMLButtonElement;

// Retrieving data from local storage
let item = localStorage.getItem("todo");
let localData: { value: string; color: boolean }[] = item ? JSON.parse(item) : [];

// Setting initial style for 'all' button
all.style.borderBottom = "7px solid rgb(43 127 124)"

// Event listener for 'completed' button
completed.addEventListener('click', () => {
    // Changing styles of buttons
    all.style.borderBottom = "7px solid rgb(255 255 255 / 71%)"
    active.style.borderBottom = "7px solid rgb(255 255 255 / 71%)"
    completed.style.borderBottom = "7px solid rgb(43 127 124)"
    // Filtering completed tasks
    let completedData = localData.filter((obj) => obj.color === false)
    // Clearing the boxes
    boxes.innerHTML = ''
    // Displaying completed tasks
    completedData.forEach((data) => {
        display(data)
    })
})

// Similar event listeners for 'active' and 'all' buttons
active.addEventListener('click', () => {
    all.style.borderBottom = "7px solid rgb(255 255 255 / 71%)"
    active.style.borderBottom = "7px solid rgb(43 127 124)"
    completed.style.borderBottom = "7px solid rgb(255 255 255 / 71%)"
    let activeData = localData.filter((obj) => obj.color === true)
    boxes.innerHTML = ''
    activeData.forEach((data) => {
        display(data)
    })
})

all.addEventListener('click', () => {
    all.style.borderBottom = "7px solid rgb(43 127 124)"
    active.style.borderBottom = "7px solid rgb(255 255 255 / 71%)"
    completed.style.borderBottom = "7px solid rgb(255 255 255 / 71%)"
    createBox()
})

// Event listener for 'add' button
addbtn.addEventListener('click', () => {
    let object = {
        value: input.value,
        color: true
    }

    localData.push(object)
    localStorage.setItem("todo", JSON.stringify(localData))

    createBox()

})

// Event listener for 'Enter' key in the input field
input.addEventListener('keydown', (e) => {
    if (e.code == "Enter") {
        let object = {
            value: input.value,
            color: true
        }

        localData.push(object)
        localStorage.setItem("todo", JSON.stringify(localData))

        createBox()
    }
})

// Function to refresh the task boxes
function createBox() {
    boxes.innerHTML = ''
    localData.forEach(data => {
        display(data)
    });
}

// Initial call to display the tasks
createBox()

// Function to display a single task
function display(data: { value: string; color: boolean } = { value: '', color: false }) {
    // Creating new HTML elements
    let newBox = document.createElement("div")
    let icon = document.createElement("div")
    let h1s = document.createElement("div")
    let delBtn = document.createElement("button")
    let check = document.createElement("img")

    // Setting properties of the new elements
    check.src = "images/check-square.svg"

    // Event listener for the 'check' image
    check.addEventListener('click', (e) => {
        if (data.color !== false) {
            delBtn.style.display = "inline"
            data.color = false
            localStorage.setItem("todo", JSON.stringify(localData))
            check.classList.add("savColor")
        } else {
            check.classList.remove("savColor")
            delBtn.style.display = "none"
            data.color = true
            localStorage.setItem("todo", JSON.stringify(localData))
        }
    })

    // Setting styles based on task status
    if (data.color === true) {
        check.classList.remove("savColor")
        delBtn.style.display = "none"
    } else {
        delBtn.style.display = "inline"
        check.classList.add("savColor")
    }

    // Setting innerHTML of elements
    h1s.innerHTML = data.value
    delBtn.innerHTML = "Delete"
    // Appending child elements
    icon.appendChild(check)

    // Setting class names of elements
    newBox.className = "box"
    icon.className = "icon"
    h1s.className = "h1s"
    delBtn.className = "delBtn"

    // Appending child elements to the new box
    newBox.appendChild(icon)
    newBox.appendChild(h1s)
    newBox.appendChild(delBtn)

    // Appending the new box to the boxes
    boxes.appendChild(newBox)
    // Clearing the input field
    input.value = ""

    // Event listener for the 'delete' button
    delBtn.addEventListener('click', () => {
        localData = localData.filter((e) => {
            return e !== data
        })
        localStorage.setItem("todo", JSON.stringify(localData))
        boxes.removeChild(newBox)
    })
}
