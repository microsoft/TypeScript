import { Buffer } from "node:buffer";

const surrogateLeadByte = 0xED;
const surrogateSecondByteMin = 0xA0;
const surrogateSecondByteMax = 0xBF;
const continuationByteMin = 0x80;
const continuationByteMax = 0xBF;
type DecodeInput = ArrayBufferView | ArrayBufferLike | null;
interface DecodeOptions {
    stream?: boolean;
}

function isWtf8Surrogate(bytes: Uint8Array, index: number): boolean {
    return index + 2 < bytes.length
        && bytes[index] === surrogateLeadByte
        && bytes[index + 1] >= surrogateSecondByteMin
        && bytes[index + 1] <= surrogateSecondByteMax
        && bytes[index + 2] >= continuationByteMin
        && bytes[index + 2] <= continuationByteMax;
}

function getSurrogateCodeUnit(bytes: Uint8Array, index: number): number {
    return 0xD000 | ((bytes[index + 1] & 0x3F) << 6) | (bytes[index + 2] & 0x3F);
}

function hasSurrogateLeadByte(bytes: Uint8Array): boolean {
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).indexOf(surrogateLeadByte) >= 0;
}

function toUint8Array(input: Exclude<DecodeInput, null | undefined>): Uint8Array {
    if (input instanceof Uint8Array) {
        return input;
    }
    if (ArrayBuffer.isView(input)) {
        return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    }
    return new Uint8Array(input);
}

function hasLoneSurrogate(text: string): boolean {
    for (let i = 0; i < text.length; i++) {
        const codeUnit = text.charCodeAt(i);
        if (codeUnit >= 0xD800 && codeUnit <= 0xDBFF) {
            const low = text.charCodeAt(i + 1);
            if (low >= 0xDC00 && low <= 0xDFFF) {
                i++;
            }
            else {
                return true;
            }
        }
        else if (codeUnit >= 0xDC00 && codeUnit <= 0xDFFF) {
            return true;
        }
    }
    return false;
}

export function encodeWtf8(text: string): Uint8Array {
    if (!hasLoneSurrogate(text)) {
        return new TextEncoder().encode(text);
    }

    let byteLength = 0;
    for (let i = 0; i < text.length; i++) {
        const codeUnit = text.charCodeAt(i);
        if (codeUnit < 0x80) {
            byteLength++;
        }
        else if (codeUnit < 0x800) {
            byteLength += 2;
        }
        else if (codeUnit >= 0xD800 && codeUnit <= 0xDBFF && i + 1 < text.length) {
            const low = text.charCodeAt(i + 1);
            if (low >= 0xDC00 && low <= 0xDFFF) {
                byteLength += 4;
                i++;
            }
            else {
                byteLength += 3;
            }
        }
        else {
            byteLength += 3;
        }
    }

    const bytes = new Uint8Array(byteLength);
    let offset = 0;
    for (let i = 0; i < text.length; i++) {
        const codeUnit = text.charCodeAt(i);
        if (codeUnit < 0x80) {
            bytes[offset++] = codeUnit;
        }
        else if (codeUnit < 0x800) {
            bytes[offset++] = 0xC0 | (codeUnit >> 6);
            bytes[offset++] = 0x80 | (codeUnit & 0x3F);
        }
        else if (codeUnit >= 0xD800 && codeUnit <= 0xDBFF && i + 1 < text.length) {
            const low = text.charCodeAt(i + 1);
            if (low >= 0xDC00 && low <= 0xDFFF) {
                const codePoint = 0x10000 + ((codeUnit - 0xD800) << 10) + (low - 0xDC00);
                bytes[offset++] = 0xF0 | (codePoint >> 18);
                bytes[offset++] = 0x80 | ((codePoint >> 12) & 0x3F);
                bytes[offset++] = 0x80 | ((codePoint >> 6) & 0x3F);
                bytes[offset++] = 0x80 | (codePoint & 0x3F);
                i++;
                continue;
            }
            bytes[offset++] = 0xE0 | (codeUnit >> 12);
            bytes[offset++] = 0x80 | ((codeUnit >> 6) & 0x3F);
            bytes[offset++] = 0x80 | (codeUnit & 0x3F);
        }
        else {
            bytes[offset++] = 0xE0 | (codeUnit >> 12);
            bytes[offset++] = 0x80 | ((codeUnit >> 6) & 0x3F);
            bytes[offset++] = 0x80 | (codeUnit & 0x3F);
        }
    }
    return bytes;
}

export class Wtf8Decoder extends TextDecoder {
    override decode(input?: DecodeInput, options?: DecodeOptions): string {
        if (input == null) {
            return super.decode(undefined, options);
        }

        const bytes = toUint8Array(input);
        if (!hasSurrogateLeadByte(bytes)) {
            return super.decode(bytes, options);
        }

        const parts: string[] = [];
        let segmentStart = 0;

        for (let i = 0; i < bytes.length; i++) {
            if (!isWtf8Surrogate(bytes, i)) {
                continue;
            }

            if (segmentStart < i) {
                parts.push(super.decode(bytes.subarray(segmentStart, i), options));
            }
            parts.push(String.fromCharCode(getSurrogateCodeUnit(bytes, i)));
            i += 2;
            segmentStart = i + 1;
        }

        if (segmentStart === 0) {
            return super.decode(bytes, options);
        }
        if (segmentStart < bytes.length) {
            parts.push(super.decode(bytes.subarray(segmentStart), options));
        }
        return parts.join("");
    }
}
