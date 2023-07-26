import { component$, useSignal } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { useUpdateTodo } from "~/routes/[slug]";

export default component$<{ title: string, content: string }>((todo) => {
    const isSaving = useSignal(false);
    const action = useUpdateTodo()
    return (
        <>
            <Form action={action} class='flex flex-col md:flex-row justify-center items-center md:my-10 gap-5 m-2'>
                <input name="title" value={todo.title} placeholder='Todo Title' class='input input-bordered input-primary w-80' required />
                <input name="content" value={todo.content} placeholder='Todo Text' class='input input-bordered input-primary w-80' required />
                <Link
                    href={'/'}
                    class='btn btn-secondary'>
                    Back
                </Link>
                <button
                    class={isSaving.value ? 'btn btn-warning' : 'btn btn-primary'}
                    type="submit"
                    name="_action"
                    value='delete'
                    onClick$={() => isSaving.value = true}
                >
                    {isSaving.value ? 'Saving...' : 'Save Changes'}
                </button>

            </Form >
        </>
    );
});