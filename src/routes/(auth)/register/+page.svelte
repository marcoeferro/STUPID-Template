<script lang="ts">
    import { enhance } from "$app/forms";
    import Input from "$lib/components/atoms/Input.svelte";
    import Button from "$lib/components/atoms/Button.svelte";

    let { form } = $props();
</script>

<div
    class="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md border border-gray-100"
>
    <h1 class="text-2xl font-bold mb-6 text-center">Crea tu cuenta</h1>

    <form method="POST" use:enhance class="flex flex-col gap-4">
        <Input
            name="username"
            label="Usuario"
            error={form?.errors?.username?.[0]}
            required
        />
        <Input
            name="password"
            type="password"
            label="Contraseña"
            error={form?.errors?.password?.[0]}
            required
        />

        {#if form?.message}
            <p class="text-sm text-red-500 text-center">{form.message}</p>
        {/if}

        <Button type="submit" variant="primary">Registrarse</Button>
    </form>
</div>
