<script lang="ts">
    // Definimos el tipo del prop user
    interface Props {
        user: { username: string } | null;
    }

    let { user }: Props = $props();
</script>

<nav class="flex justify-between items-center p-4 bg-white shadow-sm">
    <a href="/" class="text-xl font-black tracking-tighter text-tiger-orange">
        TIGER<span class="text-black">APP</span>
    </a>

    <div class="flex items-center gap-4">
        {#if user}
            <span class="text-sm font-medium text-gray-600">
                Hola, <span class="text-black font-bold">{user.username}</span>
            </span>
            <form action="/login?/logout" method="POST">
                <button class="text-sm text-red-600 hover:underline"
                    >Cerrar sesión</button
                >
            </form>
        {:else}
            <a href="/login" class="text-sm font-medium hover:text-tiger-orange"
                >Login</a
            >
            <a
                href="/register"
                class="px-4 py-2 bg-black text-white rounded-md text-sm font-bold"
                >Sign Up</a
            >
        {/if}
    </div>
</nav>
