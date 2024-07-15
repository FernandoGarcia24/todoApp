import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Task, Filter } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>(this.loadTasks());

  Filters = Filter;
  filter = signal<Filter>(Filter.All);
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if(filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  changeHandler() {
    if(this.newTaslCtrl.valid) {
      const value = this.newTaslCtrl.value.trim();
      if(value !== '') {
        this.addtask(value);
        this.newTaslCtrl.setValue('');
      }
    }
  }

  addtask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => {
      const updatedTasks = [...tasks, newTask];
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  // Guardar tareas en localStorage
  saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Cargar tareas de localStorage
  loadTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    console.log(tasks);
    return tasks ? JSON.parse(tasks) : [
      {
        id: Date.now(),
        title: 'Ejemplo de tarea',
        completed: false
      },
      {
        id: Date.now(),
        title: 'Crear componentes',
        completed: false
      }
    ];
  }

  deletetask(index: number) {
    this.tasks.update((tasks) => {
      const deletetask = tasks.filter((task, position) => position !== index)
      this.saveTasks(deletetask);
      return deletetask;
    });
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      const updatedTasks = tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      });
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  newTaslCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement; 
    this.tasks.update(prevState => {
      const editText = prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      });
      this.saveTasks(editText);
      return editText;
    });
  }

  changeFilter(filter: Filter) {
    this.filter.set(filter);
  }

}
