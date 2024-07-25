import { GripVertical, Trash2 } from "lucide-react"
import { Task, Id, Priority } from "../types"
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'; 

interface TasksCardProps {
    task: Task,
    contentActive?: boolean,
    handleUpdateTask: (id: Id, priority: Priority, content: string, columnId: Id) => void,
    handleDeleteTask: (id: Id) => void
}

function TaskCard({ task, contentActive = false, handleUpdateTask, handleDeleteTask }: TasksCardProps) {
    let statusBgColor: string = 'bg-[#55efc4]';
    const [contentValue, setContentValue] = useState(task.content);
    const [priorityValue, setPriorityValue] = useState<Priority>(task.priority);
    const [contentEditMode, setContentEditMode] = useState(contentActive);
    const [priorityEditMode, setPriorityEditMode] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: 'task',
            task
        },
        disabled: contentEditMode
    });

    switch(priorityValue) {

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

    const handleContentBlur = (): void => {

        setContentEditMode(false); 
        handleUpdateTask(task.id, task.priority, contentValue, task.columnId);
    };

    const handleContentKeyChange = (event: KeyboardEvent<HTMLTextAreaElement>): void => {

        if(event.key === 'Enter') {

            setContentEditMode(false);
            handleUpdateTask(task.id, task.priority, contentValue, task.columnId);

        }
    };

    const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>): void => {

        if(event.target.value != '') {
            const newPriority = event.target.value as Priority;

            setPriorityValue(newPriority);
            handleUpdateTask(task.id, newPriority, task.content, task.columnId);
            setPriorityEditMode(false);

        }
        
    };

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    if(isDragging) {

        return (
            <div 
                className="py-2"
                style={style}
                ref={setNodeRef}>
                    <div className="rounded-lg shadow bg-gray-200 px-4 break-words pt-5 pb-4 min-h-[170px]"></div>
            </div>
        );
    }

    return (
        <div 
            className="py-2"
            style={style}
            ref={setNodeRef}>
            <div className="rounded-lg shadow bg-white px-4 break-words pt-5 pb-4">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <button 
                            {...attributes}
                            {...listeners}
                            className="text-gray-400 hover:opacity-70 transition-opacity outline-none mr-2" 
                            title="Drag Task">
                            <GripVertical/>
                        </button>
                        
                        {!priorityEditMode && 
                            <p 
                                onClick={() => { setPriorityEditMode(true) }}
                                className="text-[12px] cursor-pointer"
                                title="Click to update">
                                Priority: <span className={`font-bold inline-block ml-2 px-2 py-1 ${statusBgColor} leading-none rounded-lg text-white capitalize`}>{priorityValue}</span>
                            </p>
                        }

                        {priorityEditMode && 
                            <div className="relative">
                                <select 
                                    name="priority" 
                                    id="priority" 
                                    value={priorityValue}
                                    onChange={handlePriorityChange}
                                    onBlur={() => { setPriorityEditMode(false) }}
                                    required
                                    autoFocus>
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                </select>
                            
                        </div>
                        }
                        
                    </div>
                    <div>
                        <button 
                            className="text-gray-400 hover:opacity-70 transition-opacity outline-none" 
                            title="Delete task"
                            onClick={() => { handleDeleteTask(task.id) }}>
                            <Trash2/>
                        </button>
                    </div>
                </div>
                
                {!contentEditMode && 
                    <div 
                        onClick={() => { setContentEditMode(true) }} 
                        className="py-5 cursor-pointer" 
                        title="Click to edit">
                            {task.content}
                    </div>
                }

                {contentEditMode && 
                    <textarea 
                        autoFocus
                        onKeyDown={handleContentKeyChange}
                        onBlur={handleContentBlur}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { setContentValue(event.target.value) }}
                        value={contentValue}
                        className="field-textarea"></textarea>
                }
                
            </div>
        </div>
    );
}

export default TaskCard