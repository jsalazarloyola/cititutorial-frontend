import { reactive } from "vue";
import type { UnwrapNestedRefs } from "vue";

export interface ITask {
  _id: string;  // ID de la tarea (dado por Mongo)
  title: string;  // Título o nombre
  description: string;  // Duh
  completed: boolean;  // Estado de la tarea
  createdAt: string;  // Fecha en formato YYYY-MM-DD
}

export class TaskModel implements ITask {
  _id: string;  // ID de la tarea (dado por Mongo)
  title: string;  // Título o nombre
  description: string;  // Duh
  completed: boolean;  // Estado de la tarea
  createdAt: string;  // Fecha en formato YYYY-MM-DD

  constructor(initial: Partial<ITask> = {}){
    this._id = initial._id ?? "";
    this.title = initial.title ?? "";
    this.description = initial.description ?? "";
    this.completed = initial.completed?? false;
    this.createdAt = initial.createdAt ?? "";
  }

  reset(): void {
    this._id = "";
    this.title = "";
    this.description = "";
    this.completed = false;
    this.createdAt = "";
  }

  toPlainObject(): ITask {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt
    }
  }
}


interface UseTaskClassReturn {
  task: UnwrapNestedRefs<ITask>;
  resetTask: () => void;
  toPlainObject: () => ITask;
}


export const UseTaskClass = () => {
  const taskInstance = new TaskModel();
  const reactiveTask = reactive(taskInstance);

  return {
    task: reactiveTask,
    resetTask: reactiveTask.reset,
    toPlainObject: reactiveTask.toPlainObject
  }
}
