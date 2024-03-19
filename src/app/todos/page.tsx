"use client";

// 参考
// https://github.com/ooooose/fastapi-curd/tree/main/front/src
// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
// https://zenn.dev/uttk/articles/b3bcbedbc1fd00
// https://swr.vercel.app/ja/docs/getting-started

import { useState } from "react";
import { apiClient } from "@/api-client";
import { useGetTasks } from "@/stores/getTasks";
import type { Task } from "@/types/task";

export default function Todo() {
  const { data: tasks, mutate, isLoading } = useGetTasks();
  const [todoText, setTodoText] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };
  const onClickAdd = () => {
    apiClient.apiPost("/tasks", { title: todoText }).then(() => {
      mutate();
    });
    setTodoText("");
  };
  const onClickDelete = (task: Task) => {
    apiClient.apiDelete(`/tasks/${task.id}`).then(() => {
      mutate();
    });
  };
  const onClickComplete = (task: Task) => {
    apiClient.apiPut(`/tasks/${task.id}/done`).then(() => {
      mutate();
    });
  };
  const onClickUnComplete = (task: Task) => {
    apiClient.apiDelete(`/tasks/${task.id}/done`).then(() => {
      mutate();
    });
  };

  if (isLoading) return <div className="h-svh">loading...</div>;
  const doneTasks = tasks?.filter((task: Task) => task.done === true);
  const unDoneTasks = tasks?.filter((task: Task) => task.done === false);

  return (
    <main className="p-4 space-y-2 h-svh">
      <div>
        <h1 className="text-2xl">Todos</h1>
      </div>
      <div className="space-x-2">
        <input
          className="text-black p-2"
          placeholder="Add TODO"
          value={todoText}
          onChange={onChange}
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onClickAdd}
        >
          Add
        </button>
      </div>
      <div className="flex justify-between gap-4">
        <div className="border-2 border-white rounded-lg p-4 basis-1/2 space-y-2">
          <h2 className="text-xl">unmarked_todos</h2>
          <div>
            <ul>
              {unDoneTasks.map((task: Task) => {
                return (
                  <li key={task.id} className="flex justify-between gap-2">
                    <p className="basis-1/2">{task.title}</p>
                    <div className="flex justify-between gap-2">
                      <button
                        onClick={() => {
                          onClickComplete(task);
                        }}
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => {
                          onClickDelete(task);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="border-2 border-white rounded-lg p-4 basis-1/2 space-y-2">
          <h2 className="text-xl">marked_todos</h2>
          <div>
            <ul>
              {doneTasks.map((task: Task) => {
                return (
                  <li key={task.id} className="flex justify-between gap-2">
                    <p className="basis-1/2">{task.title}</p>
                    <div>
                      <button
                        onClick={() => {
                          onClickUnComplete(task);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
