import type { RosMsgDefinition } from "./types";
export declare const rosPrimitiveTypes: Set<string>;
/**
 * Given a raw message definition string, parse it into an object representation.
 * Type names in all positions are always fully-qualified.
 *
 * Example return value:
 * [{
 *   name: "foo_msgs/Bar",
 *   definitions: [
 *     {
 *       arrayLength: undefined,
 *       isArray: false,
 *       isComplex: false,
 *       name: "name",
 *       type: "string",
 *     }, ...
 *   ],
 * }, ... ]
 *
 * See unit tests for more examples.
 */
export declare function parseMessageDefinition(messageDefinition: string, typeName: string): RosMsgDefinition[];
//# sourceMappingURL=parseMessageDefinition.d.ts.map