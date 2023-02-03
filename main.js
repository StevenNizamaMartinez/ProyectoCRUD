// Variables y Constantes
const form = document.querySelector(".form")
const containerList = document.querySelector(".containerList")
const templateList = document.querySelector(".templateList").content
const fragment = document.createDocumentFragment()
let listTask = []
let item = {}

//Eventos

document.addEventListener("DOMContentLoaded", (e)=> {
    const data = localStorage.getItem("tarea")
    if (data == null){} else{
    listTask = (JSON.parse(data))
    pintarData(listTask)
    e.stopPropagation()
}
})

form.addEventListener("click",  (e)=> {
    e.stopPropagation()
    if(e.target.className === "add"){
        addData(e)
    }
})


containerList.addEventListener( "click" , (e)=>{
    e.stopPropagation()
    if (e.target.classList.contains("fa-trash")){
        const id = e.target.id
        listTask.splice(id, 1)
        localStorage.setItem("tarea", JSON.stringify(listTask))
        getData()
    }
} )

containerList.addEventListener( "click" , (e)=>{
    e.stopPropagation()
    if (e.target.classList.contains("fa-circle-check")){
        const element = e.target.parentElement.parentElement
        element.classList.toggle("true")
    }
} )

// Funciones

const addData = (e) =>{
    const element = e.target.parentElement.parentElement
    const text = element.querySelector(".text").value
    if (text !== ""){
        item = {text}
        listTask.push(item)
        console.log(listTask)
        localStorage.setItem("tarea", JSON.stringify(listTask))
        getData()
        form.reset()
    }
}

const getData = () => {
    const data = localStorage.getItem("tarea")
    if (data === null){} else{
        listTask = (JSON.parse(data))
        pintarData(listTask)
    }
}

const pintarData = (objeto) => {
    containerList.innerHTML = ""
    objeto.map((task, index) => {
        templateList.querySelector("div").setAttribute("id", index)
        templateList.querySelectorAll("i")[0].setAttribute("id",index)
        templateList.querySelectorAll("i")[1].setAttribute("id",index)
        templateList.querySelector("p").textContent = task.text
        const clone = templateList.cloneNode(true)
        fragment.appendChild(clone)
    })
    containerList.appendChild(fragment)
}
