/// <reference types="node" />
import type { RosMsgDefinition } from "./types";
export declare class MessageReader {
    reader: (buffer: Buffer) => unknown;
    constructor(definitions: RosMsgDefinition[], typeName: string, options?: {
        freeze?: boolean;
    });
    readMessage(buffer: Buffer): unknown;
}
//# sourceMappingURL=MessageReader.d.ts.map