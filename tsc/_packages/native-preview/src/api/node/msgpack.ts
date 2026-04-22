// Minimal msgpack encoder/decoder.
// Supports: arrays, unsigned integers, strings, booleans, binary data.

// ── MessagePack format constants ────────────────────────────────────
export const MSGPACK_FIXARRAY3 = 0x93; // 3-element fixarray
export const MSGPACK_BIN8 = 0xc4;
export const MSGPACK_BIN16 = 0xc5;
export const MSGPACK_BIN32 = 0xc6;
export const MSGPACK_UINT8 = 0xcc;

// ── Bin header helpers ──────────────────────────────────────────────

/** Compute the MessagePack bin header size for a given data length. */
export function binHeaderSize(len: number): number {
    if (len < 0x100) return 2; // BIN8: marker + 1-byte size
    if (len < 0x10000) return 3; // BIN16: marker + 2-byte size
    return 5; // BIN32: marker + 4-byte size
}

/** Write a MessagePack bin header into `buf` at `off`, return new offset. */
export function writeBinHeader(buf: Uint8Array, off: number, len: number): number {
    if (len < 0x100) {
        buf[off++] = MSGPACK_BIN8;
        buf[off++] = len;
    }
    else if (len < 0x10000) {
        buf[off++] = MSGPACK_BIN16;
        buf[off++] = (len >>> 8) & 0xff;
        buf[off++] = len & 0xff;
    }
    else {
        buf[off++] = MSGPACK_BIN32;
        buf[off++] = (len >>> 24) & 0xff;
        buf[off++] = (len >>> 16) & 0xff;
        buf[off++] = (len >>> 8) & 0xff;
        buf[off++] = len & 0xff;
    }
    return off;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class MsgpackWriter {
    private buf: Uint8Array;
    private view: DataView;
    private pos: number;

    constructor(initialSize = 256) {
        this.buf = new Uint8Array(initialSize);
        this.view = new DataView(this.buf.buffer);
        this.pos = 0;
    }

    private ensure(n: number): void {
        if (this.pos + n > this.buf.length) {
            let newSize = this.buf.length * 2;
            while (newSize < this.pos + n) newSize *= 2;
            const next = new Uint8Array(newSize);
            next.set(this.buf);
            this.buf = next;
            this.view = new DataView(this.buf.buffer);
        }
    }

    writeArrayHeader(length: number): void {
        if (length <= 0x0f) {
            this.ensure(1);
            this.buf[this.pos++] = 0x90 | length;
        }
        else if (length <= 0xffff) {
            this.ensure(3);
            this.buf[this.pos++] = 0xdc;
            this.view.setUint16(this.pos, length, false);
            this.pos += 2;
        }
        else {
            this.ensure(5);
            this.buf[this.pos++] = 0xdd;
            this.view.setUint32(this.pos, length, false);
            this.pos += 4;
        }
    }

    writeUint(value: number): void {
        if (value <= 0x7f) {
            this.ensure(1);
            this.buf[this.pos++] = value;
        }
        else if (value <= 0xff) {
            this.ensure(2);
            this.buf[this.pos++] = 0xcc;
            this.buf[this.pos++] = value;
        }
        else if (value <= 0xffff) {
            this.ensure(3);
            this.buf[this.pos++] = 0xcd;
            this.view.setUint16(this.pos, value, false);
            this.pos += 2;
        }
        else {
            this.ensure(5);
            this.buf[this.pos++] = 0xce;
            this.view.setUint32(this.pos, value, false);
            this.pos += 4;
        }
    }

    writeString(str: string): void {
        const encoded = encoder.encode(str);
        const len = encoded.length;
        if (len <= 0x1f) {
            this.ensure(1 + len);
            this.buf[this.pos++] = 0xa0 | len;
        }
        else if (len <= 0xff) {
            this.ensure(2 + len);
            this.buf[this.pos++] = 0xd9;
            this.buf[this.pos++] = len;
        }
        else if (len <= 0xffff) {
            this.ensure(3 + len);
            this.buf[this.pos++] = 0xda;
            this.view.setUint16(this.pos, len, false);
            this.pos += 2;
        }
        else {
            this.ensure(5 + len);
            this.buf[this.pos++] = 0xdb;
            this.view.setUint32(this.pos, len, false);
            this.pos += 4;
        }
        this.buf.set(encoded, this.pos);
        this.pos += len;
    }

    writeBool(value: boolean): void {
        this.ensure(1);
        this.buf[this.pos++] = value ? 0xc3 : 0xc2;
    }

    finish(): Uint8Array {
        return this.buf.subarray(0, this.pos);
    }
}

export class MsgpackReader {
    private buf: Uint8Array;
    private view: DataView;
    private pos: number;

    constructor(data: Uint8Array, offset = 0) {
        this.buf = data;
        this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        this.pos = offset;
    }

    readArrayHeader(): number {
        const byte = this.buf[this.pos++];
        if ((byte & 0xf0) === 0x90) return byte & 0x0f;
        if (byte === 0xdc) {
            const len = this.view.getUint16(this.pos, false);
            this.pos += 2;
            return len;
        }
        if (byte === 0xdd) {
            const len = this.view.getUint32(this.pos, false);
            this.pos += 4;
            return len;
        }
        throw new Error(`Expected array header, got 0x${byte.toString(16)}`);
    }

    readUint(): number {
        const byte = this.buf[this.pos++];
        if (byte <= 0x7f) return byte;
        if (byte === 0xcc) return this.buf[this.pos++];
        if (byte === 0xcd) {
            const val = this.view.getUint16(this.pos, false);
            this.pos += 2;
            return val;
        }
        if (byte === 0xce) {
            const val = this.view.getUint32(this.pos, false);
            this.pos += 4;
            return val;
        }
        throw new Error(`Expected uint, got 0x${byte.toString(16)}`);
    }

    readString(): string {
        const byte = this.buf[this.pos++];
        let len: number;
        if ((byte & 0xe0) === 0xa0) {
            len = byte & 0x1f;
        }
        else if (byte === 0xd9) {
            len = this.buf[this.pos++];
        }
        else if (byte === 0xda) {
            len = this.view.getUint16(this.pos, false);
            this.pos += 2;
        }
        else if (byte === 0xdb) {
            len = this.view.getUint32(this.pos, false);
            this.pos += 4;
        }
        else {
            throw new Error(`Expected string, got 0x${byte.toString(16)}`);
        }
        const str = decoder.decode(this.buf.subarray(this.pos, this.pos + len));
        this.pos += len;
        return str;
    }

    readBool(): boolean {
        const byte = this.buf[this.pos++];
        if (byte === 0xc3) return true;
        if (byte === 0xc2) return false;
        throw new Error(`Expected bool, got 0x${byte.toString(16)}`);
    }
}
