import { useState } from "react"
import KanbanColumn from "./kanban-column"
import TaskCard from "./task-card";
import { Plus } from "lucide-react";
import Modal from "./modal";
import AddTaskForm from "./add-task-form";
import { DndContext, useSensors, useSensor, PointerSensor, DragEndEvent, DragStartEvent, DragOverlay, DragOverEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useColumnStore } from "../store/use-column-store";
import { useTaskStore } from "../store/use-task-store";

function KanbanBoard() {
  const { 
      columns, 
      activeColumn,
      setActiveColumn,
      createColumn, 
      updateColumn, 
      deleteColumn } = useColumnStore();
  const {
    tasks,
    activeTask,
    setActiveTask,
    createTask,
    updateTask,
    deleteTask
  } = useTaskStore();
  const [isAddTaskModalActive, setIsAddTaskModalActive] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    
    const current = event.active.data.current;

    if(current?.type === 'column') {

      setActiveColumn(current.column);

    }

    if(current?.type === 'task') {

      setActiveTask(current.task);

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

    useColumnStore.setState((state) => {
      const activeColumnIndex = state.columns.findIndex(column => column.id === activeColumnId);
      const overColumnIndex = state.columns.findIndex(column => column.id === overColumnId);

      return { columns: arrayMove(state.columns, activeColumnIndex, overColumnIndex) }
    });
    
  };

  const handleOnDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

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

      useTaskStore.setState((state) => {
        const activeTaskIndex = state.tasks.findIndex(task => task.id === active.id);
        const overTaskIndex = state.tasks.findIndex(task => task.id === over.id);

        // change column position
        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return { tasks: arrayMove(tasks, activeTaskIndex, overTaskIndex) };
      });
    }

    // drop task over a column
    const isOverAColumn = over.data.current?.type === 'column';

    // check if the active task is about to drop to column
    if(isActiveTask && isOverAColumn) {

      useTaskStore.setState((state) => {
        const activeIndex = state.tasks.findIndex(task => task.id === activeTaskId);

        tasks[activeIndex].columnId = over.id;

        return { tasks: arrayMove(tasks, activeIndex, activeIndex) };
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