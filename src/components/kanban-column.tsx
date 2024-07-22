import { Id, Priority, Task } from "../types"
import { Trash2, Plus, GripVertical } from "lucide-react"
import TaskCard from "./task-card"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"

interface KanbanColumnProps {
    title: string,
    id: Id
    tasks: Task[],
    handleDeleteColumn: (columnId: Id) => void,
    handleUpdateColumn: (columnId: Id, title: string) => void
    handleCreateTask: (content: string, priority: Priority, columnId: Id, isEditMode?: boolean) => void,
    handleUpdateTask: (id: Id, priority: Priority, content: string, columnId: Id) => void,
    handleDeleteTask: (id: Id) => void,
    handleShowAddTaskFormPopup?: React.Dispatch<React.SetStateAction<boolean>>
}

function KanbanColumn(
    { 
        title, 
        tasks, 
        id, 
        handleDeleteColumn, 
        handleUpdateColumn,
        handleCreateTask, 
        handleUpdateTask,
        handleDeleteTask,
    } : KanbanColumnProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [titleValue, setTitleValue] = useState<string>(title);
    const titleRef = useRef(null);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        
        setTitleValue(event.target.value);
        
    };

    // set edit mode to false once the user press the enter key and update column data
    const handleKeyChange = (event: KeyboardEvent<HTMLInputElement>) => {

        if(event.key === 'Enter') {

            setEditMode(false);
            handleUpdateColumn(id, titleValue);

        }
    };

    // set edit mode to false when out of focus and update column data
    const handleBlur = () => {

        setEditMode(false);
        handleUpdateColumn(id, titleValue);

    };

    return (
        <div className="px-5">  
            <div className="min-h-[500px] w-[400px] border-2 bg-white rounded-lg shadow-lg flex flex-col">
                {/* column heading */}
                <div className="bg-primary flex justify-between items-center py-3 px-4 rounded-tl-lg rounded-tr-lg">
                    <div className="flex items-center">
                        <button className="text-white mr-2 outline-none border-none cursor-grab">
                            <GripVertical/>
                        </button>

                        {editMode && 
                            <input 
                                style={ { display: editMode ? 'block' : 'none' } }
                                autoFocus
                                type="text" 
                                className="outline-none bg-[#296db1] rounded-lg border border-white text-white px-2 py-1"
                                value={titleValue}
                                onBlur={handleBlur}
                                onChange={handleTitleChange}
                                onKeyDown={handleKeyChange}/>
                        }

                        {!editMode &&
                            <h3 
                                className="text-white font-bold" 
                                ref={titleRef} 
                                onClick={() => { setEditMode(true) }}>
                                    {titleValue}
                            </h3>
                        }
                        
                        {tasks.length ? <span className="bg-white text-primary py-1 px-2 text-[14px] leading-none rounded-lg inline-block ml-3">{tasks.length}</span> : null}
                    </div>
                    <div className="flex items-center">
                        <button 
                            onClick={() => { handleCreateTask('', 'low', id, true) }}
                            className="text-white outline-none text-[10px] mr-3 hover:opacity-70 transition-opacity" 
                            title="Add task">
                            <Plus/>
                        </button>
                        <button 
                            className="text-white hover:opacity-70 transition-opacity outline-none" title="Delete column"
                            onClick={() => { handleDeleteColumn(id) }}>
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
                                        task={task}
                                        handleUpdateTask={handleUpdateTask}
                                        handleDeleteTask={handleDeleteTask}
                                        contentActive={task.isEditMode}/>
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