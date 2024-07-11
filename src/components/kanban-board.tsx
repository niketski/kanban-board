import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { Column, Task } from "../types";

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
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    priority: 'high',
    columnId: 1
  },
  {
    id: 2,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    priority: 'low',
    columnId: 1
  },
  {
    id: 3,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    priority: 'low',
    columnId: 2
  },
  {
    id: 4,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    priority: 'high',
    columnId: 4
  },
  {
    id: 5,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    priority: 'medium',
    columnId: 3
  }
];

function KanbanBoard() {
  const [columns] = useState<Column[]>(INITIAL_COLUMNS);
  const [ tasks ] = useState<Task[]>(INITIAL_TASKS);

  return (
    <div className="pt-4 pb-5">

        <div className="px-8 flex">

          {
            columns && 
              columns.map(column => {
                const filteredTasks = tasks.filter(task => task.id === column.id); // filter task based on the corresponding column

                return (
                  <KanbanColumn 
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={filteredTasks}/>
                )
              })
          }
           


        </div>
        
    </div>
  )
}

export default KanbanBoard