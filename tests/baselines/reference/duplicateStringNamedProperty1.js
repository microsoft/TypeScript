//// [duplicateStringNamedProperty1.ts]
export interface Album {
    "artist": string;
    artist: string;
}

//// [duplicateStringNamedProperty1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
