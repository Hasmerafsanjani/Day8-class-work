import { useState } from 'react'
import './App.css'

function App() {
 const [subjects, setSubjects] = useState([]);
const [newSubject, setNewSubject] = useState('');
const [newHours, setNewHours] = useState('');

// Load subjects and hours from local storage
const savedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
if (savedSubjects.length > 0 && subjects.length === 0) {
  setSubjects(savedSubjects);
}

const addSubject = () => {
  if (newSubject && newHours) {
    const updatedSubjects = [...subjects, { subject: newSubject, hours: parseInt(newHours) }];
    setSubjects(updatedSubjects);
    setNewSubject('');
    setNewHours('');

    // Update local storage
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  }
};

const increaseHours = (index) => {
  const updatedSubjects = [...subjects];
  updatedSubjects[index].hours += 1;
  setSubjects(updatedSubjects);

  // Update local storage
  localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
};

const decreaseHours = (index) => {
  const updatedSubjects = [...subjects];
  if (updatedSubjects[index].hours > 0) {
    updatedSubjects[index].hours -= 1;
    setSubjects(updatedSubjects);

    // Update local storage
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  }
};

  return (
    <>
    <div className=''>
    <div className='text-4xl font-bold '>
      This is Geekster Soubject Hour counter 
    </div>
    <div className='p-4 m-4 rounded flex justify-center items-center'>
    <label className=''>

      <input 
       onChange={(e)=>setNewSubject(e.target.value)}
       className='text-2xl p-2 rounded re text-black' 
       placeholder="Subject"  
      value={newSubject}
       type="text" /> 

      <input 
      onChange={(e)=>setNewHours(e.target.value)} 
      className='m-2 text-2xl w-24 p-2 rounded text-black'  
      placeholder="Hour"
      type="number" 
      value={newHours} /> 
      

      <button 
      className='bg-green-500 p-2 text-2xl items-center rounded'
      onClick={addSubject}
      >Add </button>

      </label>
    </div>
    <hr />
    {subjects.map((subject, index) => (
    <div className='flex justify-center text-3xl text-center m-3 gap-3 font-bold'>
      <h1>{subject.subject} - {subject.hours} hour</h1>
      <p onClick={()=>increaseHours(index)} className='bg-green-600 cursor-pointer  rounded-2xl'>➕</p>  
      <p onClick={()=>decreaseHours(index)} className='bg-red-600  cursor-pointer rounded-2xl'>➖</p>  
    </div>
    ))}
    </div>
    </>
  )
}
 
export default App
