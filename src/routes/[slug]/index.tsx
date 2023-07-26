import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import EditForm from "~/components/EditForm";



export const useTodoData = routeLoader$(async (requestEvent) => {
    const supabase = createServerClient(
        requestEvent.env.get("SUPABASE_URL")!,
        requestEvent.env.get("SUPABASE_ANON_KEY")!,
        requestEvent
    );
    // This code runs only on the server, after every navigation
    const { data } = await supabase
        .from('Todos')
        .select('*')
        .eq('id', requestEvent.params.slug)
    return data
});
export const useUpdateTodo = routeAction$(async (data, requestEvent) => {
    const supabase = createServerClient(
        requestEvent.env.get("SUPABASE_URL")!,
        requestEvent.env.get("SUPABASE_ANON_KEY")!,
        requestEvent
    );
    // This will only run on the server when the user submits the form (or when the action is called programmatically)

    await supabase.from('Todos').update({ title: data.title, content: data.content })
        .eq('id', requestEvent.params.slug)

    throw requestEvent.redirect(302, '/')
});

export default component$(() => {
    const todo = useTodoData()
    return (
        <>
            <h1 class='sm:text-5xl text-4xl py-10 text-center'>Edit Todo No.{todo.value![0].id}</h1>
            <EditForm title={todo.value![0].title} content={todo.value![0].content} />
        </>)
})

export const head: DocumentHead = {
    title: "Edit Todo",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};