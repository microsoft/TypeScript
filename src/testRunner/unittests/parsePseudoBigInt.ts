import * as ts from "../_namespaces/ts.js";

describe("unittests:: BigInt literal base conversions", () => {
    describe("parsePseudoBigInt", () => {
        const testNumbers: number[] = [];
        for (let i = 0; i < 1e3; i++) testNumbers.push(i);
        for (let bits = 0; bits <= 52; bits++) {
            testNumbers.push(2 ** bits, 2 ** bits - 1);
        }
        it("can strip base-10 strings", () => {
            for (const testNumber of testNumbers) {
                for (let leadingZeros = 0; leadingZeros < 10; leadingZeros++) {
                    assert.equal(
                        ts.parsePseudoBigInt("0".repeat(leadingZeros) + testNumber + "n"),
                        String(testNumber),
                    );
                }
            }
        });
        it("can parse binary literals", () => {
            for (const testNumber of testNumbers) {
                for (let leadingZeros = 0; leadingZeros < 10; leadingZeros++) {
                    const binary = "0".repeat(leadingZeros) + testNumber.toString(2) + "n";
                    for (const prefix of ["0b", "0B"]) {
                        assert.equal(ts.parsePseudoBigInt(prefix + binary), String(testNumber));
                    }
                }
            }
        });
        it("can parse octal literals", () => {
            for (const testNumber of testNumbers) {
                for (let leadingZeros = 0; leadingZeros < 10; leadingZeros++) {
                    const octal = "0".repeat(leadingZeros) + testNumber.toString(8) + "n";
                    for (const prefix of ["0o", "0O"]) {
                        assert.equal(ts.parsePseudoBigInt(prefix + octal), String(testNumber));
                    }
                }
            }
        });
        it("can parse hex literals", () => {
            for (const testNumber of testNumbers) {
                for (let leadingZeros = 0; leadingZeros < 10; leadingZeros++) {
                    const hex = "0".repeat(leadingZeros) + testNumber.toString(16) + "n";
                    for (const prefix of ["0x", "0X"]) {
                        for (const hexCase of [hex.toLowerCase(), hex.toUpperCase()]) {
                            assert.equal(ts.parsePseudoBigInt(prefix + hexCase), String(testNumber));
                        }
                    }
                }
            }
        });
        it("can parse large literals", () => {
            assert.equal(
                ts.parsePseudoBigInt("123456789012345678901234567890n"),
                "123456789012345678901234567890",
            );
            assert.equal(
                ts.parsePseudoBigInt("0b1100011101110100100001111111101101100001101110011111000001110111001001110001111110000101011010010n"),
                "123456789012345678901234567890",
            );
            assert.equal(
                ts.parsePseudoBigInt("0o143564417755415637016711617605322n"),
                "123456789012345678901234567890",
            );
            assert.equal(
                ts.parsePseudoBigInt("0x18ee90ff6c373e0ee4e3f0ad2n"),
                "123456789012345678901234567890",
            );
        });
    });
});
