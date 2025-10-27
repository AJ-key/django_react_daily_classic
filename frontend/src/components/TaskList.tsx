import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
interface Props{ tasks:Task[]; onToggle:(id:number,val:boolean)=>void; onDelete:(id:number)=>void; filter:'all'|'active'|'completed' }
const TaskList: React.FC<Props> = ({tasks,onToggle,onDelete,filter}) => {
  const filtered = tasks.filter(t=>filter==='all'?true:filter==='active'?!t.is_completed:t.is_completed);
  return <div className='task-list'>{filtered.map(t=>(<TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete}/>))}</div>
};
export default TaskList;