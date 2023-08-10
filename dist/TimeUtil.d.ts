import type { Time } from "./types";
export declare function fromDate(date: Date): {
    sec: number;
    nsec: number;
};
export declare function toDate(time: Time): Date;
/**
 * Compare two times returning a negative value if the right is greater,
 * a positive value if the left is greater, or 0 if the times are equal.
 *
 * Useful to supply to `Array.prototype.sort`.
 */
export declare function compare(left: Time, right: Time): number;
/**
 * Returns true if the left time is less than the right time, otherwise false.
 */
export declare function isLessThan(left: Time, right: Time): boolean;
/**
 * Returns true if the left time is greater than the right time, otherwise false.
 */
export declare function isGreaterThan(left: Time, right: Time): boolean;
/**
 * Returns true if both times have the same number of seconds and nanoseconds.
 */
export declare function areSame(left: Time, right: Time): boolean;
/**
 * Computes the sum of two times or durations and returns a new time.
 *
 * Throws an exception if the resulting time is negative.
 */
export declare function add(left: Time, right: Time): {
    sec: number;
    nsec: number;
};
//# sourceMappingURL=TimeUtil.d.ts.map