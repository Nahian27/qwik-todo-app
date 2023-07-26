import { component$, useSignal } from "@builder.io/qwik"
import { Form, Link } from "@builder.io/qwik-city"
import { useAddRemoveTodo } from "~/routes"

export default component$<{ slug: number, i: number, title: string, text: string }>((p) => {
    const action = useAddRemoveTodo()
    const isLoading = useSignal(false)
    return (
        <>
            <div
                class='card shadow-lg bg-base-200 w-80 sm:h-96 h-60'>
                <div class="card-body">
                    <h2 class='card-title'>
                        {p.title}
                    </h2>
                    <div class='card-body'>
                        {p.text}
                    </div>
                    <div class='card-actions flex justify-end gap-3'>
                        <Link href={"/" + p.slug} class='btn btn-secondary'>Edit</Link>
                        <Form action={action}>
                            <input type='hidden' name="id" value={p.slug} />
                            <button
                                class={isLoading.value ? 'btn btn-warning' : 'btn btn-accent'}
                                type="submit"
                                name="_action"
                                value='delete'
                                onClick$={() => isLoading.value = true}
                            >
                                {isLoading.value ? 'Deleting' : 'Delete'}
                            </button>
                        </Form>

                    </div>
                </div>
            </div >
        </>)
})