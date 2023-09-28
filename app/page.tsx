import { revalidatePath } from 'next/cache';
import { serverClient } from './_trpc/serverClient';

export default async function Home() {
  const todos = await serverClient.getTodos();

  return (
    <main>
      <form
        action={async (formData) => {
          'use server';
          const newTodo = formData.get('new_todo') as string;
          if (!newTodo) return;

          const todos = await serverClient.addTodo(newTodo);

          revalidatePath('/');
        }}
        className="flex items-center gap-4 p-4"
      >
        <input
          type="text"
          placeholder="Add New Todo..."
          className="flex-1 rounded-lg border px-4 py-2"
          name="new_todo"
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-lg px-4 py-2 text-white font-medium text-center"
        >
          Add
        </button>
      </form>
      <div className="p-4">
        {todos?.map((todo) => (
          <div className="flex items-center gap-2" key={todo.id}>
            <input type="checkbox" />
            <p>{todo.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
