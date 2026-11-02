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
     * Replaces all instances of substrings that match a search string or a regular expression.
     * When the {@linkcode searchValue} is a `RegExp`, a `TypeError` is thrown if the `g` (global) flag is not set
     * (only matches at the beginning are replaced if the `y` (sticky) flag is also present).
     * @param searchValue A string or regular expression to search for.
     * @param replaceValue The replacement text, or a callback function that returns the replacement text.
     */
    replaceAll(searchValue: string | RegExp, replaceValue: string | ((substring: string, ...args: any[]) => string)): string;

    /**
     * Passes the string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode searchValue}.
     * This method is expected to implement its own replacement algorithm.
     * @param searchValue An object that supports searching for and replacing matches within a string.
     * @param replaceValue A value to be passed into {@linkcode searchValue}.
     */
    replaceAll<This, T, R>(this: This, searchValue: { [Symbol.replace](string: This, replaceValue: T): R; }, replaceValue: T): R;
}
