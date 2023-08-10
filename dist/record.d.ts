/// <reference types="node" />
import { MessageReader } from "./MessageReader";
import type { Time } from "./types";
export declare class RosbagRecord {
    offset: number;
    dataOffset: number;
    end: number;
    length: number;
    constructor(offset: number, dataOffset: number, dataLength: number);
}
export interface RosbagRecordConstructor<T extends RosbagRecord> {
    opcode: number;
    new (offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, buffer: Buffer): T;
}
export declare class BagHeader extends RosbagRecord {
    static opcode: number;
    indexPosition: number;
    connectionCount: number;
    chunkCount: number;
    constructor(offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, _buffer: Buffer);
}
export declare class Chunk extends RosbagRecord {
    static opcode: number;
    compression: string;
    size: number;
    data: Buffer;
    constructor(offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, buffer: Buffer);
}
export declare class Connection extends RosbagRecord {
    static opcode: number;
    conn: number;
    topic: string;
    type: string;
    md5sum: string;
    messageDefinition: string;
    callerid?: string;
    latching?: boolean;
    reader?: MessageReader;
    constructor(offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, buffer: Buffer);
}
export declare class MessageData extends RosbagRecord {
    static opcode: number;
    conn: number;
    time: Time;
    data: Buffer;
    constructor(offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, buffer: Buffer);
}
export declare class IndexData extends RosbagRecord {
    static opcode: number;
    ver: number;
    conn: number;
    count: number;
    indices: Array<{
        time: Time;
        offset: number;
    }>;
    constructor(offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, buffer: Buffer);
}
export interface ChunkInfoInterface {
    ver: number;
    chunkPosition: number;
    startTime: Time;
    endTime: Time;
    count: number;
    connections: {
        conn: number;
        count: number;
    }[];
    nextChunk?: ChunkInfoInterface;
}
export declare class ChunkInfo extends RosbagRecord implements ChunkInfoInterface {
    static opcode: number;
    ver: number;
    chunkPosition: number;
    startTime: Time;
    endTime: Time;
    count: number;
    connections: {
        conn: number;
        count: number;
    }[];
    nextChunk?: ChunkInfoInterface;
    constructor(offset: number, dataOffset: number, dataLength: number, fields: Record<string, Buffer>, buffer: Buffer);
}
//# sourceMappingURL=record.d.ts.map