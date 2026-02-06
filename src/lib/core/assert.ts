// src/lib/core/assert.ts
export function Assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        const stack = new Error().stack; // Captura el rastro de llamadas
        console.error("--- PANIC: ESTADO IMPOSIBLE DETECTADO ---");
        console.error(`Mensaje: ${message}`);
        console.error(`Stack Trace:\n${stack}`);

        // Aquí podrías enviar este stack a un servicio como Sentry o Logtail 
        // antes de morir, para que veas el código original mediante Source Maps.

        process.exit(1);
    }
}