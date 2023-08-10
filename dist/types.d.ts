/// <reference types="node" />
/**
 * A function that must be called with either an error or a value, but not both
 */
export type Callback<T> = (error: Error | null, value?: T) => void;
/**
 * Represents a timestamp based on the UNIX epoch (1970 Jan 1).
 * See also: http://wiki.ros.org/roscpp/Overview/Time
 */
export interface Time {
    /**
     * Whole seconds.
     */
    sec: number;
    /**
     * Additional nanoseconds past the `sec` value.
     */
    nsec: number;
}
export interface Filelike {
    read(offset: number, length: number, callback: Callback<Buffer>): void;
    size(): number;
}
export interface RosMsgField {
    type: string;
    name: string;
    isComplex?: boolean;
    isArray?: boolean;
    arrayLength?: number;
    isConstant?: boolean;
    value?: unknown;
}
export interface RosMsgDefinition {
    name: string;
    definitions: RosMsgField[];
}
//# sourceMappingURL=types.d.ts.map