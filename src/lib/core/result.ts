
export type Result<T, E> =
    | { ok: true; data: T }
    | { ok: false; error: E };

export function ok<T>(data: T): Result<T, never> {
    return { ok: true, data };
}

export function fail<E>(error: E): Result<never, E> {
    return { ok: false, error };
}