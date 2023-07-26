import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useAddRemoveTodo } from "~/routes";



export default component$(() => {
    const action = useAddRemoveTodo()
    return (
        <div>
            <Form action={action} class='flex flex-col md:flex-row justify-center items-center md:my-10 gap-5 m-2'>
                <input name="title" placeholder='Todo Title ' class='input input-bordered input-primary w-80' required />
                <input name="content" placeholder='Todo Text' class='input input-bordered input-primary w-80' required />
                <button
                    type="submit"
                    class='btn btn-primary w-28'
                    name="_action"
                    value='create'
                >
                    Add
                </button>
            </Form>
        </div>)
})