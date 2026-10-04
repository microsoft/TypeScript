import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import {
    MsgpackReader,
    MsgpackWriter,
} from "../src/api/node/msgpack.ts";
import {
    encodeWtf8,
    Wtf8Decoder,
} from "../src/api/node/wtf8.ts";
import { areTestsFiltered } from "./testUtils.ts";

const concurrency = areTestsFiltered();

describe("encodeWtf8", { concurrency }, () => {
    test("matches UTF-8 for scalar values", () => {
        assert.deepEqual(encodeWtf8("hello 🦀"), new TextEncoder().encode("hello 🦀"));
    });

    test("round-trips lone surrogates", () => {
        const text = `high:${String.fromCharCode(0xD800)} low:${String.fromCharCode(0xDFFF)}`;
        assert.equal(new Wtf8Decoder().decode(encodeWtf8(text)), text);
    });

    test("preserves surrogate sequence boundaries", () => {
        const high = String.fromCharCode(0xD800);
        const low = String.fromCharCode(0xDC00);
        const cases: readonly [string, string, readonly number[]][] = [
            ["lone high", high, [0xED, 0xA0, 0x80]],
            ["lone low", low, [0xED, 0xB0, 0x80]],
            ["pair", high + low, [0xF0, 0x90, 0x80, 0x80]],
            ["high before pair", high + high + low, [0xED, 0xA0, 0x80, 0xF0, 0x90, 0x80, 0x80]],
            ["low after pair", high + low + low, [0xF0, 0x90, 0x80, 0x80, 0xED, 0xB0, 0x80]],
            ["replacement character", "\uFFFD", [0xEF, 0xBF, 0xBD]],
            ["replacement before lone high", "\uFFFD" + high, [0xEF, 0xBF, 0xBD, 0xED, 0xA0, 0x80]],
        ];

        for (const [name, text, expected] of cases) {
            assert.deepEqual([...encodeWtf8(text)], expected, name);
        }
    });

    test("encodes large exceptional input into compact byte storage", () => {
        const text = "a".repeat(100_000) + String.fromCharCode(0xD800);
        const encoded = encodeWtf8(text);
        assert.equal(encoded.byteLength, 100_003);
        assert.equal(new Wtf8Decoder().decode(encoded), text);
    });
});

describe("Wtf8Decoder", { concurrency }, () => {
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

describe("Msgpack strings", { concurrency }, () => {
    test("round-trip lone surrogates", () => {
        const text = `high:${String.fromCharCode(0xD800)} low:${String.fromCharCode(0xDFFF)}`;
        const writer = new MsgpackWriter();
        writer.writeString(text);
        assert.equal(new MsgpackReader(writer.finish()).readString(), text);
    });
});
