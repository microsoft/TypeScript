"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encodings = void 0;
var Encodings;
(function (Encodings) {
    function getEncodingHeaderValue(encodings) {
        if (encodings.length === 1) {
            return encodings[0].name;
        }
        const distribute = encodings.length - 1;
        if (distribute > 1000) {
            throw new Error(`Quality value can only have three decimal digits but trying to distribute ${encodings.length} elements.`);
        }
        const digits = Math.ceil(Math.log10(distribute));
        const factor = Math.pow(10, digits);
        const diff = Math.floor((1 / distribute) * factor) / factor;
        const result = [];
        let q = 1;
        for (const encoding of encodings) {
            result.push(`${encoding.name};q=${q === 1 || q === 0 ? q.toFixed(0) : q.toFixed(digits)}`);
            q = q - diff;
        }
        return result.join(', ');
    }
    Encodings.getEncodingHeaderValue = getEncodingHeaderValue;
    function parseEncodingHeaderValue(value) {
        const map = new Map();
        const encodings = value.split(/\s*,\s*/);
        for (const value of encodings) {
            const [encoding, q] = parseEncoding(value);
            if (encoding === '*') {
                continue;
            }
            let values = map.get(q);
            if (values === undefined) {
                values = [];
                map.set(q, values);
            }
            values.push(encoding);
        }
        const keys = Array.from(map.keys());
        keys.sort((a, b) => b - a);
        const result = [];
        for (const key of keys) {
            result.push(...map.get(key));
        }
        return result;
    }
    Encodings.parseEncodingHeaderValue = parseEncodingHeaderValue;
    function parseEncoding(value) {
        let q = 1;
        let encoding;
        const index = value.indexOf(';q=');
        if (index !== -1) {
            const parsed = parseFloat(value.substr(index));
            if (!Number.isNaN(parsed)) {
                q = parsed;
            }
            encoding = value.substr(0, index);
        }
        else {
            encoding = value;
        }
        return [encoding, q];
    }
})(Encodings || (exports.Encodings = Encodings = {}));
