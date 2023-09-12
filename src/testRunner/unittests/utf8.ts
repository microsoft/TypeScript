import { utf8decodeCompat, utf8encodeIntoCompat } from "../_namespaces/ts";

describe("unittests:: utf8", () => {
    describe("utf8encodeIntoCompat matches TextEncoder.encode", () => {
        const data = [
            "日本語",
            "🐱",
            "\ud83d\udc31",
            "\u{1F431}",
            "\x00\x01",
            "\t\n\r\\\"'\u0062",
            "====",
            "",
        ];
        for (const item of data) {
            it(item, () => {
                const buffer1 = new Uint8Array(65536);
                const buffer2 = new Uint8Array(65536);
                const written1 = utf8encodeIntoCompat(item, buffer1);
                const { written: written2 } = new TextEncoder().encodeInto(item, buffer2);
                const bytes1 = toBytes(buffer1.slice(0, written1)), bytes2 = toBytes(buffer2.slice(0, written2));
                assert.equal(bytes1, bytes2);
            });
        }
    });
    function toBytes(buffer: Uint8Array) {
        let s = "";
        for (const byte of buffer) {
            if (byte < 16) s += "0";
            s += byte.toString(16).toUpperCase();
        }
        return s;
    }
    describe("utf8decodeCompat matches TextDecoder.decode", () => {
        const data = [
            "日本語",
            "🐱",
            "\ud83d\udc31",
            "\u{1F431}",
            "\x00\x01",
            "\t\n\r\\\"'\u0062",
            "====",
            "",
        ];
        for (const item of data) {
            it(item, () => {
                const buffer = new Uint8Array(65536);
                const { written } = new TextEncoder().encodeInto(item, buffer);
                const decoded1 = utf8decodeCompat(buffer.slice(0, written));
                const decoded2 = new TextDecoder().decode(buffer.slice(0, written));
                assert.equal(decoded1, decoded2);
            });
        }
    });
});
