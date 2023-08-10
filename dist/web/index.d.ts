/// <reference types="node" />
import { Buffer } from "buffer";
import { MessageReader, MessageWriter, parseMessageDefinition, rosPrimitiveTypes, TimeUtil, extractFields, extractTime } from "../index";
import type { Callback } from "../types";
import Bag, { OpenBag } from "../bag";
import BagReader from "../BagReader";
export declare class Reader {
    _blob: Blob;
    _size: number;
    constructor(blob: Blob);
    read(offset: number, length: number, cb: Callback<Buffer>): void;
    size(): number;
}
declare const open: (file: File | string) => Promise<OpenBag>;
export * from "../types";
export { TimeUtil, Bag, BagReader, MessageReader, MessageWriter, open, parseMessageDefinition, rosPrimitiveTypes, extractFields, extractTime, };
export default Bag;
//# sourceMappingURL=index.d.ts.map