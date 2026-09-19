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
 * A frozen object containing JSON text for a primitive value, created by `JSON.rawJSON()`.
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
     * The context object has a `source` property when the property is unmodified and its value is primitive.
     * @throws {SyntaxError} If `text` is not valid JSON.
     */
    parse(text: string, reviver: (this: any, key: string, value: any, context: { source?: string }) => any): any;

    /**
     * Creates a frozen object containing JSON text for a primitive value.
     * @param text Valid JSON text representing a string, number, boolean, or null value.
     * @throws {SyntaxError} If `text` is not valid JSON text for a primitive value.
     */
    rawJSON(text: string): RawJSON;

    /**
     * Indicates whether the provided value is an object returned by `JSON.rawJSON()`.
     * @param value The value to test.
     */
    isRawJSON(value: unknown): value is RawJSON;
}
