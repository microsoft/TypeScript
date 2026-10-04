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


interface RegExpConstructor {
    /**
     * Escapes any RegExp syntax characters in the input string, returning a
     * new string that can be safely interpolated into a RegExp as a literal
     * string to match.
     * @example
     * ```ts
     * const regExp = new RegExp(RegExp.escape("foo.bar"));
     * regExp.test("foo.bar"); // true
     * regExp.test("foo!bar"); // false
     * ```
     */
    escape(string: string): string;
}
