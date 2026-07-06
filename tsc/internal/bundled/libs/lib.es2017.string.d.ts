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


interface String {
    /**
     * Pads the current string with a given string (repeated and/or truncated, if needed) so that the resulting string has a given length.
     * The padding is applied from the start of the current string.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
     *
     * @param targetLength The length of the resulting string once the current `str` has been padded.
     *        If the value is less than or equal to `str.length`, then `str` is returned as-is.
     *
     * @param padString The string to pad the current `str` with.
     *        If `padString` is too long to stay within `targetLength`, it will be truncated from the end.
     *        The default value is the space character (U+0020).
     */
    padStart(targetLength: number, padString?: string): string;

    /**
     * Pads the current string with a given string (repeated and/or truncated, if needed) so that the resulting string has a given length.
     * The padding is applied from the end of the current string.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
     *
     * @param targetLength The length of the resulting string once the current `str` has been padded.
     *        If the value is less than or equal to `str.length`, then `str` is returned as-is.
     *
     * @param padString The string to pad the current `str` with.
     *        If `padString` is too long to stay within `targetLength`, it will be truncated from the end.
     *        The default value is the space character (U+0020).
     */
    padEnd(targetLength: number, padString?: string): string;
}
