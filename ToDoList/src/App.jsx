import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './assets/components/navbar'
import { v4 as uuidv4 } from 'uuid';
function App() {
	
	const [Task, setTask] = useState("");
	const[Tasks, setTasks] = useState([]);

	const LocalStorage = (params) => {
		localStorage.setItem("Tasks", JSON.stringify(Tasks));
	}



	const handleEdit = () => {
		console.log("Edit button clicked");
	}
	
	const handleDelete = () => {
		console.log("Delete button clicked");
	}

	const handleAdd = () => {
		setTasks([...Tasks, {id: uuidv4(),Task, isCompleted: false}]);
		setTask("");
		console.log(Tasks);
		LocalStorage();
	}

	const handleChange = (e) => {
		setTask(e.target.value);
	}

	const handleCheckbox = (e) => {
		let id = e.target.name
		let index = Tasks.findIndex(item=>{
			return item.id === id
		})
		let newTasks = [...Tasks];
		newTasks[index].isCompleted = !newTasks[index].isCompleted;
		setTasks(newTasks);
		LocalStorage();
	}

  return (
    <>
    <Navbar />
			<div className="container mx-auto p-3 rounded-xl my-5 bg-violet-100 min-h-[80vh] min-w-[160vh]">
				<div className= "Add Task">
					<h2 className="text-lg font-bold my-5">Add Task</h2>
					<input onChange={handleChange} value={Task} className="border border-gray-300 rounded-md p-2 bg-white w-100" type="text" />
					<button onClick={handleAdd} disabled={Task.length<3} className="bg-violet-600 text-white px-3 py-1 rounded-md ml-2 hover:bg-violet-500 p-3 mx-6 font-bold">Add</button>
				</div>
    		<div className="container mx-0 bg-purple-100 text-purple-700 rounded-xl p-1 my-5">
					<h2 className="text-lg font-bold">Today's Tasks</h2>
					<div className ="Tasks">
						{Tasks.length === 0 && <p className="text-gray-500">No tasks added yet.</p>}
						{Tasks.map(item=>{
						return <div key={item.id} className="Task flex justify-between space-between w-1/4 my-3">
							<div className="flex gap-3">
								<input  name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id=""/>
								<div className={item.isCompleted ? "line-through" : ""}>{item.Task}</div>
							</div>
							<div className="buttons flex h-full">
								<button onClick={handleEdit} className="bg-violet-600 text-white px-3 py-1 rounded-md ml-2 hover:bg-violet-500 p-3 font-bold">Edit</button>
								<button onClick={handleDelete} className="bg-violet-600 text-white px-3 py-1 rounded-md ml-2 hover:bg-violet-500 p-3	font-bold">Delete</button>
							</div>
						</div>
						})}
					</div>
    		</div>
			</div>
    </>
  )
}

export default App
