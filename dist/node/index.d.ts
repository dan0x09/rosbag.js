/// <reference types="node" />
import { Buffer } from "buffer";
import { MessageReader, MessageWriter, parseMessageDefinition, rosPrimitiveTypes, TimeUtil, extractFields, extractTime } from "../index";
import type { Callback } from "../types";
import Bag, { OpenBag } from "../bag";
import BagReader from "../BagReader";
export declare class Reader {
    _filename: string;
    _fd?: number;
    _size: number;
    _buffer: Buffer;
    constructor(filename: string);
    _open(cb: (error?: Error | null) => void): void;
    close(cb: (error?: Error | null) => void): void;
    read(offset: number, length: number, cb: Callback<Buffer>): void;
    size(): number;
}
declare const open: (filename: File | string) => Promise<OpenBag>;
export * from "../types";
export { TimeUtil, Bag, BagReader, MessageReader, MessageWriter, open, parseMessageDefinition, rosPrimitiveTypes, extractFields, extractTime, };
export default Bag;
//# sourceMappingURL=index.d.ts.map