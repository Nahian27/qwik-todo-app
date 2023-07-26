import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import Form from "~/components/Form";
import Todo from "~/components/Todo";


export const useTodos = routeLoader$(async (requestEv) => {
  const supabase = createServerClient(
    requestEv.env.get("SUPABASE_URL")!,
    requestEv.env.get("SUPABASE_ANON_KEY")!,
    requestEv
  );
  // This code runs only on the server, after every navigation
  const { data } = await supabase.from('Todos').select('*')
  return data
});
export const useAddRemoveTodo = routeAction$(async (data, requestEv) => {
  const supabase = createServerClient(
    requestEv.env.get("SUPABASE_URL")!,
    requestEv.env.get("SUPABASE_ANON_KEY")!,
    requestEv
  );
  // This will only run on the server when the user submits the form (or when the action is called programmatically)
  if (data._action === 'create') {
    const todo = {
      title: data.title,
      content: data.content
    }
    return await supabase.from('Todos').insert(todo)
  }
  if (data._action === 'delete') {
    return await supabase
      .from('Todos')
      .delete()
      .eq('id', data.id)
  }
});

export default component$(() => {

  const data = useTodos()

  return (
    <>
      <h1 class='sm:text-5xl text-3xl py-10 text-center'>Welcome To My Todo App</h1>
      {/* <h1 class='sm:text-2xl text-3xl py-10 text-center'>Dark Mode: {cookieStore?.value}</h1> */}
      <Form />
      <div class='flex flex-col md:flex-row flex-wrap justify-center items-center gap-5 mt-5'>
        {
          data.value?.map((todo: { id: number, title: string, content: string }, i: number) => {
            const { id, title, content } = todo;
            return <Todo key={id} slug={id} i={i} title={title} text={content} />
          })
        }
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo App",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
