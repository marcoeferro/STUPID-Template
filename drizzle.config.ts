import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Cargamos el .env manualmente para que la CLI de Drizzle tenga acceso
dotenv.config();

export default defineConfig({
    schema: './src/lib/server/db/schema.ts',
    out: './drizzle', // Aquí es donde se guardarán los archivos .sql generados
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || '',
    },
    // Esto asegura que los nombres de las tablas en la DB coincidan con el schema
    verbose: true,
    strict: true,
});