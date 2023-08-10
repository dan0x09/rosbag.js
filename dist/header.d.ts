/// <reference types="node" />
import { RosbagRecord, RosbagRecordConstructor } from "./record";
/**
 * Given a buffer parses out the record within the buffer
 * based on the opcode type bit.
 */
export declare function parseHeader<T extends RosbagRecord>(buffer: Buffer, Cls: RosbagRecordConstructor<T>): Record<string, Buffer>;
//# sourceMappingURL=header.d.ts.map