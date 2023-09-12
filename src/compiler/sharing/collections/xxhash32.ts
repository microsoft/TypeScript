import { utf8encodeInto } from "../../utilities";

const PRIME32_1 = 0x9e3779b1;
const PRIME32_2 = 0x85ebca77;
const PRIME32_3 = 0xc2b2ae3d;
const PRIME32_4 = 0x27d4eb2f;
const PRIME32_5 = 0x165667b1;

/**
 * Fast non-cryptographic hashing algorithm with good avalanche properties.
 * https://xxhash.com/
 * @internal
 */
export function xxh32(buffer: ArrayBuffer, inputPtr: number, inputLength: number, seed: number): number {
    if (inputPtr % 4) throw new TypeError("Pointer not aligned");
    const u32buffer = new Uint32Array(buffer);
    const end = inputPtr + inputLength;
    let acc: number;
    let limit: number;
    let v1: number;
    let v2: number;
    let v3: number;
    let v4: number;
    // translate ptr to u32 offset
    inputPtr >>= 2;
    if (inputLength >= 16) {
        limit = (end - 16) >> 2;
        v1 = (((seed + PRIME32_1) | 0) + PRIME32_2) | 0;
        v2 = (seed + PRIME32_2) | 0;
        v3 = (seed + 0) | 0;
        v4 = (seed + PRIME32_1) | 0;
        do {
            v1 = (v1 + (u32buffer[inputPtr++] * PRIME32_2) | 0) | 0;
            v1 = (((v1 << 13) | (v1 >>> 19)) * PRIME32_1) | 0;
            v2 = (v2 + (u32buffer[inputPtr++] * PRIME32_2) | 0) | 0;
            v2 = (((v2 << 13) | (v2 >>> 19)) * PRIME32_1) | 0;
            v3 = (v3 + (u32buffer[inputPtr++] * PRIME32_2) | 0) | 0;
            v3 = (((v3 << 13) | (v3 >>> 19)) * PRIME32_1) | 0;
            v4 = (v4 + (u32buffer[inputPtr++] * PRIME32_2) | 0) | 0;
            v4 = (((v4 << 13) | (v4 >>> 19)) * PRIME32_1) | 0;
        }
        while (inputPtr <= limit);
        acc = (v1 << 1 | v1 >>> 31) + (v2 << 7 | v2 >>> 25) | (v3 << 12 | v3 >>> 20) | (v4 << 18 | v4 >>> 14);
    }
    else {
        acc = (seed + PRIME32_5) | 0;
    }
    acc = (acc + inputLength) | 0;
    limit = (end - 4) >> 2;
    while (inputPtr <= limit) {
        acc = (acc + (u32buffer[inputPtr++] * PRIME32_3) | 0) | 0;
        acc = ((acc << 17 | acc >>> 15) * PRIME32_4) | 0;
    }
    // translate ptr to byte offset
    inputPtr = inputPtr << 2;
    if (inputPtr < end) {
        const u8buffer = new Uint8Array(u32buffer.buffer);
        do {
            acc = (acc + (u8buffer[inputPtr++] * PRIME32_5) | 0) | 0;
            acc = ((acc << 11 | acc >>> 21) * PRIME32_1) | 0;
        }
        while (inputPtr < end);
    }
    acc = ((acc ^ (acc >>> 15)) * PRIME32_2) | 0;
    acc = ((acc ^ (acc >>> 13)) * PRIME32_3) | 0;
    acc = acc ^ (acc >>> 16);
    return acc >>> 0;
}

let memory: Uint8Array | undefined;

function ensureCapacity(size: number) {
    if (!memory || memory.byteLength < size) {
        memory = new Uint8Array(size + (65536 - size % 65536));
    }
    return memory;
}

/**
 * @internal
 */
export function xxh32string(x: string, seed: number) {
    const memory = ensureCapacity(x.length * 3);
    const written = utf8encodeInto(x, memory);
    return xxh32(memory.buffer, 0, written, seed);
}
