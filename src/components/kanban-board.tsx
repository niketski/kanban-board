import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { Column, Id, Task } from "../types";
import { Plus } from "lucide-react";

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

  console.log(columns);
  return (
    <div className="pt-4 pb-5">
        <div className="px-[52px] mb-10">
          <button 
            className=" inline-flex items-center rounded-lg bg-white text-primary font-bold py-3 px-5 shadow-sm mr-5 transition-shadow hover:shadow-lg"
            onClick={() => createColumn()}>
            <Plus className="mr-2"/> Add column
          </button>
          <button className=" inline-flex items-center rounded-lg bg-primary text-white font-bold py-3 px-5 shadow-sm transition-shadow hover:shadow-lg">
            <Plus className="mr-2"/> Add task
          </button>
        </div>
        <div className="px-8 flex">

          {
            columns && 
              columns.map(column => {
                const filteredTasks = tasks.filter(task => task.columnId === column.id); // filter task based on the corresponding column

                return (
                  <KanbanColumn 
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={filteredTasks}
                    handleDeleteColumn={deleteColumn}
                    handleUpdateColumn={updateColumn}/>
                )
              })
          }
           


        </div>
        
    </div>
  )
}

export default KanbanBoard