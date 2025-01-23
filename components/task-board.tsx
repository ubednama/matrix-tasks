"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import type { TaskState, TaskStatus, Task } from "@/types/tasks";
import type { DragResult } from "@/types/dnd";
import { saveState, loadState } from "@/utils/localStorage";
import { taskStatusConfig } from "@/lib/taskStatusConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Edit, CheckCircle2, Circle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { AddTaskModal } from "./add-task-modal";
import { EditTaskModal } from "./edit-task-modal";
import { DeleteTaskModal } from "./delete-task-modal";
import { SelectSectionModal } from "./select-section-modal";
import { cn } from "@/lib/utils";
import { LoadingScreen } from "./loading";

interface TaskWithCompletion extends Task {
  completed?: boolean;
}

interface TaskStateWithCompletion extends TaskState {
  items: { [key: string]: TaskWithCompletion };
}

const initialState: TaskStateWithCompletion = {
  items: {},
  "do-first": { title: "DO FIRST", ids: [] },
  "do-later": { title: "DO LATER", ids: [] },
  delegate: { title: "DELEGATE", ids: [] },
  eliminate: { title: "ELIMINATE", ids: [] },
  tags: {},
  titles: { "Do first": "", "Do later": "", Delegate: "", Eliminate: "" },
};

export default function TaskBoard() {
  const [state, setState] = useState<TaskStateWithCompletion>(initialState);
  const [editingTitle, setEditingTitle] = useState<TaskStatus | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectSectionModalOpen, setIsSelectSectionModalOpen] =
    useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedState = loadState();
    setState(savedState || initialState);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveState(state);
    }
  }, [state, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const onDragEnd = (result: DragResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceSection = state[source.droppableId as TaskStatus];
    const destSection = state[destination.droppableId as TaskStatus];
    const newSourceIds = Array.from(sourceSection.ids);
    const newDestIds =
      source.droppableId === destination.droppableId
        ? newSourceIds
        : Array.from(destSection.ids);

    newSourceIds.splice(source.index, 1);
    newDestIds.splice(destination.index, 0, draggableId);

    const newState = {
      ...state,
      [source.droppableId]: {
        ...sourceSection,
        ids: newSourceIds,
      },
      [destination.droppableId]: {
        ...destSection,
        ids: newDestIds,
      },
      items: {
        ...state.items,
        [draggableId]: {
          ...state.items[draggableId],
          status: destination.droppableId as TaskStatus,
        },
      },
    };

    setState(newState);
  };

  const handleAddTask = (taskText: string) => {
    setNewTaskText(taskText);
    setIsAddModalOpen(false);
    setIsSelectSectionModalOpen(true);
  };

  const finalizeAddTask = (section: TaskStatus) => {
    const id = uuidv4();
    const task: TaskWithCompletion = {
      id,
      task: newTaskText,
      status: section,
      tag: null,
      prevTag: null,
      completed: false,
    };

    setState((prev) => ({
      ...prev,
      items: { ...prev.items, [id]: task },
      [section]: {
        ...prev[section],
        ids: [...prev[section].ids, id],
      },
    }));
    setIsSelectSectionModalOpen(false);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setState((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [taskId]: {
          ...prev.items[taskId],
          completed: !prev.items[taskId].completed,
        },
      },
    }));
  };

  const updateTask = (id: string, newText: string) => {
    setState((prev) => {
      if (!prev.items[id]) {
        console.warn(`Attempted to update non-existent task with id ${id}`);
        return prev;
      }
      return {
        ...prev,
        items: {
          ...prev.items,
          [id]: { ...prev.items[id], task: newText },
        },
      };
    });
    setEditingTask(null);
  };

  const updateSectionTitle = (section: TaskStatus, newTitle: string) => {
    setState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        title: newTitle,
      },
    }));
    setEditingTitle(null);
  };

  const deleteTask = (id: string, status: TaskStatus) => {
    setState((prev) => {
      const newState = { ...prev };
      if (newState.items[id]) {
        delete newState.items[id];
        newState[status].ids = newState[status].ids.filter(
          (itemId) => itemId !== id
        );
      } else {
        console.warn(`Attempted to delete non-existent task with id ${id}`);
      }
      return newState;
    });
    setSelectedTask(null);
  };

  const handleEditClick = (taskId: string) => {
    setSelectedTask(taskId);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (taskId: string) => {
    if (!state.items[taskId]) {
      console.error(`Task with id ${taskId} not found`);
      return;
    }

    if (showDeleteConfirmation) {
      setSelectedTask(taskId);
      setIsDeleteModalOpen(true);
    } else {
      deleteTask(taskId, state.items[taskId].status);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="relative h-[calc(100vh-4rem)] w-full grid grid-cols-2 grid-rows-2 border dark:border-none">
        {(
          ["do-first", "do-later", "delegate", "eliminate"] as TaskStatus[]
        ).map((section) => (
          <div
            key={section}
            className={`${taskStatusConfig[section].borderColor} p-4 relative border-[0.5px]`}
          >
            <div className="flex items-center justify-center mb-4">
              {editingTitle === section ? (
                <Input
                  value={state[section].title}
                  onChange={(e) => updateSectionTitle(section, e.target.value)}
                  onBlur={() => setEditingTitle(null)}
                  className={cn(
                    "bg-transparent border-gray-700 text-white text-center w-48",
                    "focus:border-transparent focus:outline-none"
                  )}
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2">
                  <h2
                    className={cn(
                      `rounded-md p-1.5 text-lg font-bold px-3`,
                      taskStatusConfig[section].textColor,
                      taskStatusConfig[section].bgColor
                    )}
                  >
                    {state[section].title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTitle(section)}
                    className={`p-1 h-6 w-6 dark:text-white`}
                  >
                    <Edit color="gray" className="size-4" />
                  </Button>
                </div>
              )}
            </div>
            <Droppable droppableId={section}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="h-[calc(100%-4rem)] overflow-y-auto"
                >
                  {state[section].ids.map((taskId, index) => {
                    const task = state.items[taskId];
                    return (
                      <Draggable
                        key={taskId}
                        draggableId={taskId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              taskStatusConfig[section].bgColor,
                              taskStatusConfig[section].borderColor,
                              `rounded-sm flex items-center justify-between mb-0.5`,
                              task.completed && "opacity-50"
                            )}
                          >
                            <div className="flex items-center justify-center gap-3">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleTaskCompletion(taskId)}
                                className={`${taskStatusConfig[section].textColor} ${taskStatusConfig[section].hover}`}
                              >
                                {task.completed ? (
                                  <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </Button>
                              {editingTask === taskId ? (
                                <Input
                                  value={task.task}
                                  onChange={(e) =>
                                    updateTask(taskId, e.target.value)
                                  }
                                  onBlur={() => setEditingTask(null)}
                                  className="bg-transparent border-gray-700 text-white"
                                  autoFocus
                                />
                              ) : (
                                <span
                                  className={cn(
                                    taskStatusConfig[section].textColor,
                                    task.completed && "line-through"
                                  )}
                                >
                                  {task.task}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 px-2">
                              <Pencil
                                className="h-4 w- text-black cursor-pointer"
                                onClick={() => handleEditClick(taskId)}
                              />
                              <Trash2
                                color="red"
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => handleDeleteClick(taskId)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-full h-12 w-12 dark:bg-white hover:bg-gray-200 bg-[#1A1A1A] dark:hover:bg-[#2A2A2A]"
          >
            <Plus className="h-6 w-6 dark:text-[#1A1A1A] text-white" />
          </Button>
        </div>
      </div>
      <AddTaskModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddTask}
      />
      <SelectSectionModal
        open={isSelectSectionModalOpen}
        onOpenChange={setIsSelectSectionModalOpen}
        onSelect={finalizeAddTask}
        task={newTaskText}
      />
      {selectedTask && state.items[selectedTask] && (
        <>
          <EditTaskModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            onSubmit={(newText) => updateTask(selectedTask, newText)}
            initialValue={state.items[selectedTask].task}
          />
          <DeleteTaskModal
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            onConfirm={() =>
              deleteTask(selectedTask, state.items[selectedTask].status)
            }
            onDoNotShowAgainChange={(value) =>
              setShowDeleteConfirmation(!value)
            }
          />
        </>
      )}
    </DragDropContext>
  );
}
