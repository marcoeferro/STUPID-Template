<script lang="ts">
    import { enhance } from "$app/forms";
    import Input from "$lib/components/atoms/Input.svelte";
    import Button from "$lib/components/atoms/Button.svelte";

    // En Svelte 5 usamos $props() en lugar de export let
    let { form } = $props();
</script>

<div
    class="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md border border-gray-100"
>
    <h1 class="text-2xl font-bold mb-6 text-center">Bienvenido de nuevo</h1>

    <form
        method="POST"
        action="?/login"
        use:enhance
        class="flex flex-col gap-4"
    >
        <Input
            name="username"
            label="Usuario"
            placeholder="Tu nombre"
            required
        />
        <Input name="password" type="password" label="Contraseña" required />

        {#if form?.message}
            <p class="text-sm text-red-500 text-center font-medium">
                {form.message}
            </p>
        {/if}

        <Button type="submit" variant="primary">Entrar</Button>
    </form>

    <p class="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta? <a
            href="/register"
            class="text-blue-600 hover:underline">Regístrate</a
        >
    </p>
</div>
