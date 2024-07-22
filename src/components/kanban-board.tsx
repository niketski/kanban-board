import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { Column, Id, Priority, Task } from "../types";
import { Plus } from "lucide-react";
import Modal from "./modal";
import AddTaskForm from "./add-task-form";

const INITIAL_COLUMNS: Column[] = [
  {
    id: 1,
    title: 'Column 1'
  },
  {
    id: 2,
    title: 'Column 2'
  },
  {
    id: 3,
    title: 'Column 3'
  },
  {
    id: 4,
    title: 'Column 4'
  },
  {
    id: 5,
    title: 'Column 5'
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 1',
    priority: 'high',
    columnId: 1
  },
  {
    id: 2,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 2',
    priority: 'low',
    columnId: 1
  },
  {
    id: 3,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 3',
    priority: 'low',
    columnId: 2
  },
  {
    id: 4,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 4',
    priority: 'high',
    columnId: 4
  },
  {
    id: 5,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 5',
    priority: 'medium',
    columnId: 3
  }
];

function KanbanBoard() {
  const [ columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [ tasks, setTasks ] = useState<Task[]>(INITIAL_TASKS);
  const [isAddTaskModalActive, setIsAddTaskModalActive] = useState(false);

  // create column
  const createColumn = (): void => {
      const newColumn = {
        id: Date.now(), // generate unique id based on the date
        title: `Column ${columns.length + 1}`
      }

      setColumns([...columns, newColumn]);
  };

  // delete column
  const deleteColumn = (columnId: Id): void => {
    const updatedcolumns = columns.filter(column => column.id !== columnId);
    const updatedTasks = tasks.filter(task => task.columnId !== columnId); // delete all the tasks under the deleted column

    setColumns(updatedcolumns);
    setTasks(updatedTasks);
  };

  // update column
  const updateColumn = (columnId: Id, title: string): void => {
    
    const updatedColumns = columns.map(column => {

      if(column.id !== columnId) {
        return column;
      }

      return {
        ...column,
        title
      }

    });

    setColumns(updatedColumns);
  };

  // create task
  const createTask = (content: string, priority: Priority, columnId: Id, isEditMode: boolean = false): void => {
    const newTask: Task = {
      id: Date.now(), // generate unique id based on the date
      content,
      columnId,
      priority,
      isEditMode
    };

    setTasks(prevState => {
      return [...prevState, newTask]
    });

    console.log('task has been created.')
  };

  // update task
  const updateTask = (id: Id, priority: Priority, content: string, columnId: Id) => {
    

    setTasks(prevTasks => {
      const updatedTask = prevTasks.map(task => {

        if(task.id != id) {
          return task;
        }
  
        return {
          ...task,
          priority,
          content,
          columnId
        }
  
      });

      return updatedTask;
    });

  };

  // delete task
  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter(task => task.id != id);

    setTasks(filteredTasks);
  };
  
  return (
    <div className="pt-4 pb-5">
        <div className="px-[52px] mb-10">
          <button 
            className="btn-primary"
            onClick={() => createColumn()}>
            <Plus className="mr-2"/> Add column
          </button>
          <button 
            onClick={() => { setIsAddTaskModalActive(true) }}
            className="btn-secondary">
            <Plus className="mr-2"/> Add task
          </button>
        </div>
        <div className="px-8 flex">

          {
            columns && 
              columns.map(column => {
                const filteredTasks = tasks.filter(task => task.columnId == column.id); // filter task based on the corresponding column
                
                return (
                  <KanbanColumn 
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={filteredTasks}
                    handleDeleteColumn={deleteColumn}
                    handleUpdateColumn={updateColumn}
                    handleCreateTask={createTask}
                    handleUpdateTask={updateTask}
                    handleDeleteTask={deleteTask}
                    handleShowAddTaskFormPopup={setIsAddTaskModalActive}/>
                )
              })
          }
           

        </div>

        {isAddTaskModalActive && 
          <Modal onClose={() => { setIsAddTaskModalActive(false) }}>
              <AddTaskForm 
                onSubmit={createTask}
                title="Add Task"
                columns={columns}/>
          </Modal>
        }
    </div>
  )
}

export default KanbanBoard