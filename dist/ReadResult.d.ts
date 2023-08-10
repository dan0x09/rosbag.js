/// <reference types="node" />
import type { Time } from "./types";
/**
 * Represents a result passed to the callback from the high-level call:
 * `bag.readMessages({ opts: any }, callback: (ReadResult) => void) => Promise<void>`
 */
export default class ReadResult<T> {
    topic: string;
    message: T;
    timestamp: Time;
    data: Buffer;
    chunkOffset: number;
    totalChunks: number;
    constructor(topic: string, message: T, timestamp: Time, data: Buffer, chunkOffset: number, totalChunks: number, freeze?: boolean);
}
//# sourceMappingURL=ReadResult.d.ts.map