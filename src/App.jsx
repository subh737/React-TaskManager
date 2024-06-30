import Navbar from "./components/Navbar"
import './App.css'
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { LuListTodo } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  useEffect(()=>{
    let todoStirng = localStorage.getItem("todos")
    if(todoStirng)
      {
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
      }
  },[])
  const saveToLs = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter( item =>{
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter( item =>{
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex( item =>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  }
  

  return (
    <>
      <Navbar />
      <div className='md:container my-5 mx-3 rounded-xl p-5 md:mx-auto background min-h-[85vh] md:w-1/2'>
      <div className="font-bold  flex gap-4 justify-center">
        <h1 className=" text-4xl"><LuListTodo /></h1>
      <h1 className="text-3xl">TaskMate - Your Task Manager</h1>
      </div>
        <div className="addTodo flex flex-col">
          <h2 className=" text-lg font-bold my-5">Add a Task</h2>
          <div className=" flex gap-4">
          <input type="text" className="w-full rounded-xl px-5 my-4 text-black " onChange={handleChange} value={todo} />
          <button onClick={handleAdd} disabled={todo.length<=3} className=" bg-orange-500 disabled:bg-orange-300 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl px-4 py-2 my-4">Save</button>
        </div>
        </div>
        <h2 className=" text-lg font-bold my-2">Your Tasks</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Tasks to Display</div>}
          {todos.map(item => {

            return <div key={item.id} className="todo flex justify-between mmd:w-1/2 p-2">
              <div className="flex gap-5">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" className=" mx-4" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className="  bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl mx-2 px-4 py-2"><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className="  bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl mx-2 px-4 py-2"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
