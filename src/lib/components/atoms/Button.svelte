<script lang="ts">
    export let type: "button" | "submit" = "button";
    export let variant: "primary" | "secondary" = "primary";
</script>

<button
    {type}
    class="px-4 py-2 rounded font-bold {variant === 'primary'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200'}"
    on:click
>
    <slot />
</button>
