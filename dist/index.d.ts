import BagReader from "./BagReader";
import { MessageReader } from "./MessageReader";
import { MessageWriter } from "./MessageWriter";
import * as TimeUtil from "./TimeUtil";
import Bag, { OpenBag } from "./bag";
import { extractFields, extractTime } from "./fields";
import { parseMessageDefinition, rosPrimitiveTypes } from "./parseMessageDefinition";
import { Filelike } from "./types";
declare const open: (_file: string | File) => Promise<OpenBag>;
export declare class Reader implements Filelike {
    read(): void;
    size(): number;
}
export * from "./types";
export { TimeUtil, Bag, OpenBag, BagReader, MessageReader, MessageWriter, open, parseMessageDefinition, rosPrimitiveTypes, extractFields, extractTime, };
export default Bag;
//# sourceMappingURL=index.d.ts.map