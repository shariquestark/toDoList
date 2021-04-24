const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "linethrough";

//local storage this code must be added where the list array is updated everytime
//localStorage.setItem("TODO", JSON.stringify(LIST));

//variables

let LIST = [],
    id = 0;
//getting data 
let data = localStorage.getItem("TODO");
//check if data is empty or not.
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}
//clearing the local storage.
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
//dates
const options = { weekday: "short", month: "short", day: "numeric" }
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
//add to do function..
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
        <i class="far ${DONE}" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="far fa-trash-alt" job="delete" id="${id}"></i>
    </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
//adding items to list when user hits the enter key;
document.addEventListener("keyup", function(even) {
        if (event.keyCode == 13) {
            const toDo = input.value;
            if (toDo) {
                addToDo(toDo, id, false, false);

                LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
            } else {
                alert("Empty List value")
            }
            input.value = "";
        }

    })
    //complete toDo function
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = false;
}

list.addEventListener('click', function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element)
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));

});