import React from 'react'

const TaskDone = (props) => {
  const description = props.description

  return (
    <div className='card-containers'>
      <div className='create-task-left'>
        <input type='checkbox' checked={true} readOnly={true} className='mr-2' />      
        <span className='task-done-font-color'>{description}</span>
      </div>
      <div className='create-task-right'>
      </div>
    </div>
  )
}

export default TaskDone