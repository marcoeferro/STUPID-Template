<script lang="ts">
    export let data;
</script>

<div class="p-8 max-w-4xl mx-auto">
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h1 class="text-3xl font-black text-blue-900 mb-2">
            ¡Acceso concedido!
        </h1>
        <p class="text-blue-700">
            Has entrado como <strong>{data.user.username}</strong>.
        </p>
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 border rounded-lg hover:shadow-lg transition">
            <h3 class="font-bold text-lg">Módulo de Datos</h3>
            <p class="text-gray-600">
                Aquí podrías empezar a integrar tus modelos de ML.
            </p>
        </div>
        <div class="p-4 border rounded-lg hover:shadow-lg transition">
            <h3 class="font-bold text-lg">API FastAPI</h3>
            <p class="text-gray-600">
                Estado: <span class="text-green-600 font-mono">CONNECTED</span>
            </p>
        </div>
    </div>
</div>
