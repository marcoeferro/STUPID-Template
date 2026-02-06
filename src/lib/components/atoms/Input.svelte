<script lang="ts">
    export let id: string = "";
    export let type: "text" | "password" | "email" | "number" = "text";
    export let name: string;
    export let label: string = "";
    export let value: string = "";
    export let placeholder: string = "";
    export let required: boolean = false;
    export let error: string | undefined = undefined;
</script>

<div class="flex flex-col gap-1 w-full">
    {#if label}
        <label for={name} class="text-sm font-semibold text-gray-700"
            >{label}</label
        >
    {/if}
    <input
        {type}
        {name}
        {id}
        bind:value
        {placeholder}
        {required}
        class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 {error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:ring-blue-200'}"
    />
    {#if error}
        <span class="text-xs text-red-500">{error}</span>
    {/if}
</div>
