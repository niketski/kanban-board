import { useState } from "react"
import KanbanColumn from "./kanban-column"
import TaskCard from "./task-card";
import { Column, Id, Priority, Task } from "../types";
import { Plus } from "lucide-react";
import Modal from "./modal";
import AddTaskForm from "./add-task-form";
import { DndContext, useSensors, useSensor, PointerSensor, DragEndEvent, DragStartEvent, DragOverlay, DragOverEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [ columns, setColumns] = useState<Column[]>([]);
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [isAddTaskModalActive, setIsAddTaskModalActive] = useState(false);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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
  
  const handleDragStart = (event: DragStartEvent) => {
    
    if(event.active.data.current?.type === 'column') {

      setActiveColumn(event.active.data.current.column);

    }

    if(event.active.data.current?.type === 'task') {

      setActiveTask(event.active.data.current.task);

    }

  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over} = event;

    if(!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(column => column.id === activeColumnId);
      const overColumnIndex = columns.findIndex(column => column.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
    
  };

  const handleOnDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    console.log('over');

    if(!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if(activeTaskId === overTaskId) { return; }

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';

    if(!isActiveTask) {
      return;
    }

    if(isActiveTask && isOverTask) { 
      setTasks(tasks => {
        const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
        const overTaskIndex = tasks.findIndex(task => task.id === over.id);

        // change column position
        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);

      });
    }

    // drop task over a column
    const isOverAColumn = over.data.current?.type === 'column';

    // check if the active task is about to drop to column
    if(isActiveTask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeTaskId);

        tasks[activeIndex].columnId = over.id;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      },
    })
  );

  return (
    <div className="pt-4 pb-5">
        <div className="px-[52px] mb-10">
          <button 
            className="btn-primary"
            onClick={() => createColumn()}>
            <Plus className="mr-2"/> Add column
          </button>

          {columns.length ? 
            <button 
              onClick={() => { setIsAddTaskModalActive(true) }}
              className="btn-secondary">
              <Plus className="mr-2"/> Add task
            </button> : null
          }
          
        </div>
        <div className="px-8 flex">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleOnDragOver}>

              <SortableContext items={columns.map(column => column.id)}>
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
              </SortableContext>

              {createPortal(
                <DragOverlay>
                  {activeColumn && 
                    <KanbanColumn 
                      key={activeColumn.id}
                      id={activeColumn.id}
                      title={activeColumn.title}
                      tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                      handleDeleteColumn={deleteColumn}
                      handleUpdateColumn={updateColumn}
                      handleCreateTask={createTask}
                      handleUpdateTask={updateTask}
                      handleDeleteTask={deleteTask}
                      handleShowAddTaskFormPopup={setIsAddTaskModalActive}/>
                    }

                    {activeTask && 
                      <TaskCard
                        key={activeTask.id}
                        task={activeTask}
                        handleUpdateTask={updateTask}
                        handleDeleteTask={deleteTask}
                        contentActive={activeTask.isEditMode}/>
                    }
                </DragOverlay>,
                document.body)}

          </DndContext>
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