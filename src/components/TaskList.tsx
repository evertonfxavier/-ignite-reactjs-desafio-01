import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    const idRadom = Number(new Date());

    if (newTaskTitle === "") return;
    else {
      setTasks((oldValue) => [
        ...oldValue,
        {
          id: idRadom,
          title: newTaskTitle,
          isComplete: false,
        },
      ]);
    }

    setNewTaskTitle("");
  }

  // console.log(tasks);

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // setTasks(() => [
    //   {
    //     id: id,
    //     title: newTaskTitle,
    //     isComplete: !false,
    //   },
    // ]);

    const completeTask = tasks.map((task) => {
      if (task.id === id) task.isComplete = !task.isComplete;
      return task;
    });

    setTasks(completeTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // const item = tasks.findIndex((task) => task.id === id);

    // const listaTask = [...tasks].splice(item);

    // setTasks(listaTask);
    // console.log(listaTask);

    //pegar todas as tasks quee tenho
    //filter() chama a função callback fornecida, uma vez para cada elemento do array, e constrói um novo array com todos os valores para os quais o callback retornou o valor true
    //criar arrow função
    //pegar id da task
    //se task.id for diferente(?) de id (id do item que quero remover) > remover > fazer o filtro
    const removeItem = [...tasks].filter((task) => task.id !== id);

    setTasks(removeItem);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>

                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
