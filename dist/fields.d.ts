/// <reference types="node" />
import type { Time } from "./types";
/**
 * Reads through a buffer and extracts `{ [key: string]: value: string }`
 * pairs. The buffer is expected to have length prefixed utf8 strings
 * with a '=' separating the key and value
 */
export declare function extractFields(buffer: Buffer): Record<string, Buffer>;
/**
 * Reads a Time object out of a buffer at the given offset.
 */
export declare function extractTime(buffer: Buffer, offset: number): Time;
//# sourceMappingURL=fields.d.ts.map