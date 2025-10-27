import React, { useEffect, useState } from 'react';
import './index.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
const API = 'http://localhost:8000/api/tasks/';
const App: React.FC = () => {
  const [tasks,setTasks]=useState<Task[]>([]);
  const [filter,setFilter]=useState<'all'|'active'|'completed'>('all');
  const load=async()=>{ const r=await fetch(API); const d=await r.json(); setTasks(d); };
  useEffect(()=>{ load(); },[]);
  const add=async(title:string,description:string)=>{ await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,description})}); load(); };
  const toggle=async(id:number,val:boolean)=>{ await fetch(API+id+'/',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({is_completed:val})}); load(); };
  const remove=async(id:number)=>{ await fetch(API+id+'/',{method:'DELETE'}); load(); };
  return (<div className='container'>
    <h1>Ежедневник — Classic API</h1>
    <TaskForm onAdd={add}/>
    <div className='task-form' style={{marginTop:12}}>
      <strong>Фильтр:</strong>
      <div style={{display:'flex',gap:8}}>
        <button onClick={()=>setFilter('all')}>Все</button>
        <button onClick={()=>setFilter('active')}>Активные</button>
        <button onClick={()=>setFilter('completed')}>Завершённые</button>
      </div>
    </div>
    <TaskList tasks={tasks} onToggle={toggle} onDelete={remove} filter={filter}/>
  </div>);
};
export default App;