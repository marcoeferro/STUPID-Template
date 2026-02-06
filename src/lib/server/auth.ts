import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(":");
    const hashToVerify = scryptSync(password, salt, 64);
    const storedHashBuffer = Buffer.from(hash, "hex");
    return timingSafeEqual(hashToVerify, storedHashBuffer);
}