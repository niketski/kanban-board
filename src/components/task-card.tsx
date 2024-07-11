import { GripVertical, Trash2 } from "lucide-react"
import { Task } from "../types"

interface TasksCardProps {
    task: Task
}

function TaskCard({ task }: TasksCardProps) {
    let statusBgColor: string = 'bg-[#55efc4]';

    switch(task.priority) {

        case 'high':

            statusBgColor = 'bg-[#ff7675]';

        break;

        case 'medium':

            statusBgColor = 'bg-[#fdcb6e]';

        break;

        default:

            statusBgColor = 'bg-[#55efc4]'

        break;

    }

    return (
        <div className="py-2">
            <div className="rounded-lg shadow bg-white px-4 break-words pt-5 pb-4">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none mr-2" title="Delete task">
                            <GripVertical/>
                        </button>
                        <p className="text-[12px]">Priority: <span className={`font-bold inline-block ml-2 px-2 py-1 ${statusBgColor} leading-none rounded-lg text-white capitalize`}>{task.priority}</span></p>
                    </div>
                    <div>
                        <button className="text-gray-400 hover:opacity-70 transition-opacity outline-none" title="Delete task">
                            <Trash2/>
                        </button>
                    </div>
                </div>
                <div>
                    {task.content}
                </div>
            </div>
        </div>
    );
}

export default TaskCard