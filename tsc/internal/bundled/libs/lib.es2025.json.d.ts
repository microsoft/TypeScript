/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/**
 * Represents a "raw JSON" object created by `JSON.rawJSON()`.
 *
 * Raw JSON objects are frozen, null-prototype objects that carry pre-serialized
 * JSON text.  When encountered by `JSON.stringify()`, the `rawJSON` property
 * value is emitted verbatim instead of the usual serialization.
 *
 * @see {@link https://tc39.es/proposal-json-parse-with-source/ TC39 proposal-json-parse-with-source}
 */
interface RawJSON {
    readonly rawJSON: string;
}

interface JSON {
    /**
     * Converts a JavaScript Object Notation (JSON) string into an object.
     * @param text A valid JSON string.
     * @param reviver A function that transforms the results. This function is called for each member of the object.
     * If a member contains nested objects, the nested objects are transformed before the parent object is.
     * For each value, the reviver also receives a `context` object. When the property is unmodified and its value is
     * primitive, `context` has a `source` property containing the original JSON text of that value.
     */
    parse(text: string, reviver: (this: any, key: string, value: any, context: { source?: string }) => any): any;

    /**
     * Creates a "raw JSON" object containing a piece of JSON text.
     * When serialized with `JSON.stringify()`, the raw text is emitted verbatim.
     * @param text A valid JSON string representing a primitive value (string, number, boolean, or null).
     * @throws {SyntaxError} If `text` is not valid JSON or represents an object or array.
     */
    rawJSON(text: string): RawJSON;

    /**
     * Returns whether the provided value is a raw JSON object created by `JSON.rawJSON()`.
     * @param value The value to test.
     */
    isRawJSON(value: unknown): value is RawJSON;
}
