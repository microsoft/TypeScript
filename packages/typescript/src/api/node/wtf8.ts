import { Buffer } from "node:buffer";

const surrogateLeadByte = 0xED;
const surrogateSecondByteMin = 0xA0;
const surrogateSecondByteMax = 0xBF;
const continuationByteMin = 0x80;
const continuationByteMax = 0xBF;
type DecodeOptions = Parameters<TextDecoder["decode"]>[1];

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

function toUint8Array(input: NodeJS.AllowSharedBufferSource): Uint8Array {
    if (input instanceof Uint8Array) {
        return input;
    }
    if (ArrayBuffer.isView(input)) {
        return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    }
    return new Uint8Array(input);
}

export class Wtf8Decoder extends TextDecoder {
    override decode(input?: NodeJS.AllowSharedBufferSource, options?: DecodeOptions): string {
        if (input === undefined) {
            return super.decode(input, options);
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
