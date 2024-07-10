import { Id } from "../types"
import { Trash2, Plus } from "lucide-react"

interface KanbanColumnProps {
    title: string,
    id: Id
}

function KanbanColumn({ title } : KanbanColumnProps) {
  return (
    <div className="px-5">  
        <div className="min-h-[500px] w-[400px] border-2 bg-white rounded-lg shadow-lg flex flex-col">
            {/* column heading */}
            <div className="bg-primary flex justify-between items-center py-3 px-4 rounded-tl-lg rounded-tr-lg">
                <div className="flex items-center">
                    <h3 className="text-white font-bold">{title}</h3>
                    <span className="bg-white text-primary py-1 px-2 text-[14px] leading-none rounded-lg inline-block ml-3">5</span>
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
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                    <div>Task</div>
                </div>
                
            </div>
            {/* end column body */}
        </div>
    </div>
  )
}

export default KanbanColumn