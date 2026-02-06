<script lang="ts">
	import "../app.css"; // Asegúrate de importar Tailwind aquí
	import Navbar from "$lib/components/molecules/Navbar.svelte";

	// En Svelte 5, recibimos data y children mediante $props()
	// children es un "Snippet" que contiene la página actual (+page.svelte)
	let { data, children } = $props();
</script>

<div class="min-h-screen bg-gray-50 flex flex-col">
	<Navbar user={data.user} />

	<main class="flex-grow container mx-auto px-4 py-8">
		{@render children()}
	</main>

	<footer class="p-4 text-center text-xs text-gray-400 border-t">
		STUPID Template - TigerStyle Architecture 2026
	</footer>
</div>
