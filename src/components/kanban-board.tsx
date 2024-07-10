import { useState } from "react"
import KanbanColumn from "./kanban-column"
import { Column } from "../types";

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
function KanbanBoard() {
  const [columns] = useState<Column[]>(INITIAL_COLUMNS);

  return (
    <div className="pt-4 pb-5">

        <div className="px-8 flex">

          {
            columns && 
              columns.map(column => {
                return (
                  <KanbanColumn 
                    key={column.id}
                    id={column.id}
                    title={column.title}/>
                )
              })
          }
           


        </div>
        
    </div>
  )
}

export default KanbanBoard