/// <reference types="node" />
import type { Time, Callback, Filelike } from "./types";
import { RosbagRecord, RosbagRecordConstructor, BagHeader, Chunk, ChunkInfo, Connection, IndexData, MessageData } from "./record";
interface ChunkReadResult {
    chunk: Chunk;
    indices: IndexData[];
}
export type Decompress = Record<string, (buffer: Buffer, size: number) => Buffer>;
/**
 * BagReader is a lower level interface for reading specific sections & chunks
 * from a rosbag file - generally it is consumed through the Bag class, but
 * can be useful to use directly for efficiently accessing raw pieces from
 * within the bag
 */
export default class BagReader {
    _lastReadResult?: ChunkReadResult;
    _file: Filelike;
    _lastChunkInfo?: ChunkInfo;
    constructor(filelike: Filelike);
    verifyBagHeader(callback: Callback<BagHeader>, next: () => void): void;
    /**
     * Reads the header block from the rosbag file.
     *
     * Generally you call this first because you need the header information to call readConnectionsAndChunkInfo
     */
    readHeader(callback: Callback<BagHeader>): void;
    readHeaderAsync(): Promise<BagHeader>;
    /**
     * Reads connection and chunk information from the bag.
     *
     * You'll generally call this after reading the header so you can get
     * connection metadata and chunkInfos which allow you to seek to individual
     * chunks & read them
     */
    readConnectionsAndChunkInfo(fileOffset: number, connectionCount: number, chunkCount: number, callback: Callback<{
        connections: Connection[];
        chunkInfos: ChunkInfo[];
    }>): void;
    readConnectionsAndChunkInfoAsync(fileOffset: number, connectionCount: number, chunkCount: number): Promise<{
        connections: Connection[];
        chunkInfos: ChunkInfo[];
    }>;
    /**
     * Reads individual raw messages from the bag at a given chunk.
     *
     * Filters to a specific set of connection ids, start time, & end time.
     * Generally the records will be of type MessageData
     */
    readChunkMessages(chunkInfo: ChunkInfo, connections: number[], startTime: Time | null, endTime: Time | null, decompress: Decompress, callback: Callback<MessageData[]>): void;
    readChunkMessagesAsync(chunkInfo: ChunkInfo, connections: number[], startTime: Time, endTime: Time, decompress: Decompress): Promise<MessageData[]>;
    /**
     * Reads a single chunk record && its index records given a chunkInfo.
     */
    readChunk(chunkInfo: ChunkInfo, decompress: Decompress, callback: Callback<ChunkReadResult>): void;
    /**
     * Reads count records from a buffer starting at fileOffset.
     */
    readRecordsFromBuffer<T extends RosbagRecord>(buffer: Buffer, count: number, fileOffset: number, Cls: RosbagRecordConstructor<T>): T[];
    /**
     * Reads an individual record from a buffer.
     */
    readRecordFromBuffer<T extends RosbagRecord>(buffer: Buffer, fileOffset: number, Cls: RosbagRecordConstructor<T>): T;
}
export {};
//# sourceMappingURL=BagReader.d.ts.map