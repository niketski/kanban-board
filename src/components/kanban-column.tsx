import { Id, Task } from "../types"
import { Trash2, Plus, GripVertical } from "lucide-react"
import TaskCard from "./task-card"

interface KanbanColumnProps {
    title: string,
    id: Id
    tasks: Task[]
}

function KanbanColumn({ title, tasks } : KanbanColumnProps) {
  return (
    <div className="px-5">  
        <div className="min-h-[500px] w-[400px] border-2 bg-white rounded-lg shadow-lg flex flex-col">
            {/* column heading */}
            <div className="bg-primary flex justify-between items-center py-3 px-4 rounded-tl-lg rounded-tr-lg">
                <div className="flex items-center">
                    <button className="text-white mr-2 outline-none border-none cursor-grab">
                        <GripVertical/>
                    </button>
                    <h3 className="text-white font-bold">{title}</h3>
                    {tasks.length ? <span className="bg-white text-primary py-1 px-2 text-[14px] leading-none rounded-lg inline-block ml-3">{tasks.length}</span> : null}
                </div>
                <div className="flex items-center">
                    <button className="text-white outline-none text-[10px] mr-3 hover:opacity-70 transition-opacity" title="Add task">
                        <Plus/>
                    </button>
                    <button className="text-white hover:opacity-70 transition-opacity outline-none" title="Delete column">
                        <Trash2/>
                    </button>
                </div>
            </div>
            {/* end column heading */}

            {/* column body */}
            <div className=" flex-1 overflow-y-auto p-4">
                <div className="flex flex-col">

                    {tasks && 

                        tasks.map(task => {

                            return (

                                <TaskCard
                                    key={task.id}
                                    task={task}/>
                            );

                        })
                    }

                </div>
                
            </div>
            {/* end column body */}
        </div>
    </div>
  )
}

export default KanbanColumn