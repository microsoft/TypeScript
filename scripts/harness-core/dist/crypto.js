"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const H = new Uint32Array(5);
const W = new Uint8Array(80);
const B = new Uint8Array(64);
const BLOCK_SIZE = 64;
function sha1(message) {
    let buffer = B;
    const textSize = message.length;
    const messageSize = textSize * 2;
    const finalBlockSize = messageSize % BLOCK_SIZE;
    const padSize = (finalBlockSize < BLOCK_SIZE - 8 - 1 ? BLOCK_SIZE : BLOCK_SIZE * 2) - finalBlockSize;
    const byteLength = messageSize + padSize;
    if (byteLength > BLOCK_SIZE) {
        buffer = new Uint8Array(byteLength);
    }
    const bufferView = new DataView(buffer.buffer);
    for (let i = 0; i < textSize; ++i) {
        bufferView.setUint16(i * 2, message.charCodeAt(i));
    }
    buffer[messageSize] = 0x80;
    bufferView.setUint32(byteLength - 4, messageSize * 8);
    H[0] = 0x67452301, H[1] = 0xefcdab89, H[2] = 0x98badcfe, H[3] = 0x10325476, H[4] = 0xc3d2e1f0;
    for (let offset = 0; offset < byteLength; offset += BLOCK_SIZE) {
        let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4];
        for (let i = 0; i < 80; ++i) {
            if (i < 16) {
                const x = offset + i * 4;
                W[i] = buffer[x] << 24 | buffer[x + 1] << 16 | buffer[x + 2] << 8 | buffer[x + 3];
            }
            else {
                const x = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (x << 1 | x >>> 31) >>> 0;
            }
            let t = (a << 5 | a >>> 27) >>> 0 + e + W[i];
            if (i < 20) {
                t += ((b & c) | (~b & d)) + 0x5A827999;
            }
            else if (i < 40) {
                t += (b ^ c ^ d) + 0x6ED9EBA1;
            }
            else if (i < 60) {
                t += ((b & c) | (b & d) | (c & d)) + 0x8F1BBCDC;
            }
            else {
                t += (b ^ c ^ d) + 0xCA62C1D6;
            }
            e = d, d = c, c = (b << 30 | b >>> 2) >>> 0, b = a, a = t;
        }
        H[0] += a, H[1] += b, H[2] += c, H[3] += d, H[4] += e;
    }
    for (let i = 0; i < 5; ++i) {
        bufferView.setUint32(i * 4, H[i]);
    }
    let result = "";
    for (let i = 0; i < 20; ++i) {
        result += (buffer[i] < 16 ? "0" : "") + buffer[i].toString(16);
    }
    return result;
}
exports.sha1 = sha1;

//# sourceMappingURL=crypto.js.map
