import type { Decompress } from "./BagReader";
import BagReader from "./BagReader";
import ReadResult from "./ReadResult";
import { BagHeader, ChunkInfo, Connection } from "./record";
import type { Time } from "./types";
export type ReadOptions = {
    decompress?: Decompress;
    noParse?: boolean;
    topics?: string[];
    startTime?: Time;
    endTime?: Time;
    freeze?: boolean;
};
/**
 * Represents a bag that has been opened, which guarantees certain properties are available.
 */
export interface OpenBag extends Bag {
    header: BagHeader;
    connections: Record<number, Connection>;
    chunkInfos: ChunkInfo[];
}
/**
 * The high level rosbag interface.
 *
 * Create a new bag by calling:
 * `const bag = await Bag.open('./path-to-file.bag')` in node or
 * `const bag = await Bag.open(files[0])` in the browser.
 *
 * After that you can consume messages by calling
 * `await bag.readMessages({ topics: ['/foo'] },
 *    (result) => console.log(result.topic, result.message))`
 */
export default class Bag {
    reader: BagReader;
    header?: BagHeader;
    connections?: Record<number, Connection>;
    chunkInfos?: ChunkInfo[];
    startTime?: Time;
    endTime?: Time;
    constructor(bagReader: BagReader);
    static open: (_file: File | string) => Promise<OpenBag>;
    private assertOpen;
    /**
     * If the bag is manually created with the constructor, you must call `await open()` on the bag.
     * Generally this is called for you if you're using `const bag = await Bag.open()`.
     *
     * Returns `this` with the type of `OpenBag`.
     */
    open(): Promise<OpenBag>;
    readMessages(opts: ReadOptions, callback: (msg: ReadResult<unknown>) => void): Promise<void>;
}
//# sourceMappingURL=bag.d.ts.map