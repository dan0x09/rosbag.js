/// <reference types="node" />
import type { RosMsgDefinition } from "./types";
export declare class MessageWriter {
    writer: (message: unknown, bufferToWrite: Buffer) => Buffer;
    bufferSizeCalculator: (message: unknown) => number;
    constructor(definitions: RosMsgDefinition[], typeName: string);
    calculateBufferSize(message: unknown): number;
    writeMessage(message: unknown, bufferToWrite?: Buffer): Buffer;
}
//# sourceMappingURL=MessageWriter.d.ts.map