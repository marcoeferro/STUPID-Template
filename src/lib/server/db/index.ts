import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';
import { Assert } from '$lib/core/assert';

// Validamos que la variable de entorno exista al arrancar
Assert(!!env.DATABASE_URL, "DATABASE_URL is not defined in .env");

// Configuración del cliente de Postgres
// disable_prepare: true es útil en algunos entornos de hosting como Supabase/Hostinger si usan pgbouncer
const client = postgres(env.DATABASE_URL);

// Exportamos la instancia de DB con el schema cargado para tener autocompletado total
export const db = drizzle(client, { schema });