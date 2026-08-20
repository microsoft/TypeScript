"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = boolean;
exports.string = string;
exports.number = number;
exports.error = error;
exports.func = func;
exports.array = array;
exports.stringArray = stringArray;
function boolean(value) {
    return value === true || value === false;
}
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
function error(value) {
    return value instanceof Error;
}
function func(value) {
    return typeof value === 'function';
}
function array(value) {
    return Array.isArray(value);
}
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
