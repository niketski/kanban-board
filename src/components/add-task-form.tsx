import { useRef } from "react"
import { ChevronDown } from 'lucide-react'
import { Column } from "../types";

interface AddTaskFormProps {
    title: string,
    columns: Column[]
}

function AddTaskForm({ title, columns }: AddTaskFormProps) {
    const priorityRef = useRef<HTMLSelectElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const column = useRef<HTMLSelectElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const taskPriority = priorityRef.current?.value;
        const taskContent = content.current?.value;
        const taskColumn = column.current?.value;

        console.log(taskPriority);
        console.log(taskContent);
        console.log(taskColumn);
    
    };

    return (
    <div className="">
        <h4 className="font-bold text-[25px] mb-5">{ title }</h4>
        <form onSubmit={handleSubmit}>
            <div className="relative mb-[15px]">
                <select 
                    className="field"
                    name="priority" 
                    id="priority" 
                    ref={priorityRef}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                </select>
                <ChevronDown className="absolute top-1/2 translate-y-[-50%] right-[20px] text-primary"/>
            </div>
            {columns && 
                <div className="relative mb-[15px]">
                    <select 
                        className="field"
                        name="column" 
                        id="column" 
                        ref={column}>
                            {columns.map(column => {
                                return (
                                    <option 
                                        key={column.id} 
                                        value={column.id}>
                                            {column.title}
                                    </option>
                                )
                            })}
                    </select>
                    <ChevronDown className="absolute top-1/2 translate-y-[-50%] right-[20px] text-primary"/>
                </div>
            }
            <div className="mb-[15px]">
                <textarea 
                    className="field-textarea"
                    name="content" 
                    id="content" 
                    placeholder="Add task description"
                    ref={content}
                    required></textarea>
            </div>
            <button className="btn-secondary">Add</button>
        </form>
    </div>
    )
}

export default AddTaskForm