import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { Wtf8Decoder } from "../src/api/node/wtf8.ts";

describe("Wtf8Decoder", () => {
    test("decodes standard UTF-8", () => {
        const decoder = new Wtf8Decoder();
        assert.strictEqual(decoder.decode(new TextEncoder().encode("hello 🦀")), "hello 🦀");
    });

    test("preserves WTF-8 encoded lone surrogates", () => {
        const decoder = new Wtf8Decoder();
        const text = decoder.decode(Uint8Array.of(
            0xF0,
            0x9F,
            0xA6,
            0x80,
            0xED,
            0x9F,
            0xBF,
            0xED,
            0xA0,
            0x80,
            0xED,
            0xA0,
            0x81,
            0xED,
            0xB0,
            0x80,
            0xF0,
            0x9F,
            0xA6,
            0x80,
        ));

        assert.deepStrictEqual(
            Array.from({ length: text.length }, (_, i) => text.charCodeAt(i)),
            [0xD83E, 0xDD80, 0xD7FF, 0xD800, 0xD801, 0xDC00, 0xD83E, 0xDD80],
        );
    });
});
