//// [tests/cases/compiler/parseBigInt.ts] ////

//// [parseBigInt.ts]
// All bases should allow "n" suffix
const bin = 0b101, binBig = 0b101n; // 5, 5n
const oct = 0o567, octBig = 0o567n; // 375, 375n
const hex = 0xC0B, hexBig = 0xC0Bn; // 3083, 3083n
const dec = 123,   decBig = 123n;

// Test literals whose values overflow a 53-bit integer
// These should be represented exactly in the emitted JS
const largeBin = 0b10101010101010101010101010101010101010101010101010101010101n; // 384307168202282325n
const largeOct = 0o123456712345671234567n; // 1505852261029722487n
const largeDec = 12345678091234567890n;
const largeHex = 0x1234567890abcdefn; // 1311768467294899695n

// Test literals with separators
const separatedBin = 0b010_10_1n; // 21n
const separatedOct = 0o1234_567n; // 342391n
const separatedDec = 123_456_789n;
const separatedHex = 0x0_abcdefn; // 11259375n

// Test parsing literals of different bit sizes
// to ensure that parsePseudoBigInt() allocates enough space
const zero         = 0b0n;
const oneBit       = 0b1n;
const twoBit       = 0b11n; // 3n
const threeBit     = 0b111n; // 7n
const fourBit      = 0b1111n; // 15n
const fiveBit      = 0b11111n; // 31n
const sixBit       = 0b111111n; // 63n
const sevenBit     = 0b1111111n; // 127n
const eightBit     = 0b11111111n; // 255n
const nineBit      = 0b111111111n; // 511n
const tenBit       = 0b1111111111n; // 1023n
const elevenBit    = 0b11111111111n; // 2047n
const twelveBit    = 0b111111111111n; // 4095n
const thirteenBit  = 0b1111111111111n; // 8191n
const fourteenBit  = 0b11111111111111n; // 16383n
const fifteenBit   = 0b111111111111111n; // 32767n
const sixteenBit   = 0b1111111111111111n; // 65535n
const seventeenBit = 0b11111111111111111n; // 131071n

// Test negative literals
const neg = -123n;
const negHex: -16n = -0x10n;

// Test normalization of bigints -- all of these should succeed
const negZero: 0n = -0n;
const baseChange: 255n = 0xFFn;
const leadingZeros: 0xFFn = 0x000000FFn;

// Plus not allowed on literals
const unaryPlus = +123n;
const unaryPlusHex = +0x123n;

// Parsing errors
// In separate blocks because they each declare an "n" variable
{ const legacyOct = 0123n; }
{ const scientific = 1e2n; }
{ const decimal = 4.1n; }
{ const leadingDecimal = .1n; }
const emptyBinary = 0bn; // should error but infer 0n
const emptyOct = 0on; // should error but infer 0n
const emptyHex = 0xn; // should error but infer 0n
const leadingSeparator = _123n;
const trailingSeparator = 123_n;
const doubleSeparator = 123_456__789n;

// Using literals as types
const oneTwoOrThree = (x: 1n | 2n | 3n): bigint => x ** 2n;
oneTwoOrThree(0n); oneTwoOrThree(1n); oneTwoOrThree(2n); oneTwoOrThree(3n);
oneTwoOrThree(0);  oneTwoOrThree(1);  oneTwoOrThree(2);  oneTwoOrThree(3);

//// [parseBigInt.js]
// All bases should allow "n" suffix
const bin = 0b101, binBig = 5n; // 5, 5n
const oct = 0o567, octBig = 375n; // 375, 375n
const hex = 0xC0B, hexBig = 0xc0bn; // 3083, 3083n
const dec = 123, decBig = 123n;
// Test literals whose values overflow a 53-bit integer
// These should be represented exactly in the emitted JS
const largeBin = 384307168202282325n; // 384307168202282325n
const largeOct = 1505852261029722487n; // 1505852261029722487n
const largeDec = 12345678091234567890n;
const largeHex = 0x1234567890abcdefn; // 1311768467294899695n
// Test literals with separators
const separatedBin = 21n; // 21n
const separatedOct = 342391n; // 342391n
const separatedDec = 123456789n;
const separatedHex = 0x0abcdefn; // 11259375n
// Test parsing literals of different bit sizes
// to ensure that parsePseudoBigInt() allocates enough space
const zero = 0n;
const oneBit = 1n;
const twoBit = 3n; // 3n
const threeBit = 7n; // 7n
const fourBit = 15n; // 15n
const fiveBit = 31n; // 31n
const sixBit = 63n; // 63n
const sevenBit = 127n; // 127n
const eightBit = 255n; // 255n
const nineBit = 511n; // 511n
const tenBit = 1023n; // 1023n
const elevenBit = 2047n; // 2047n
const twelveBit = 4095n; // 4095n
const thirteenBit = 8191n; // 8191n
const fourteenBit = 16383n; // 16383n
const fifteenBit = 32767n; // 32767n
const sixteenBit = 65535n; // 65535n
const seventeenBit = 131071n; // 131071n
// Test negative literals
const neg = -123n;
const negHex = -0x10n;
// Test normalization of bigints -- all of these should succeed
const negZero = -0n;
const baseChange = 0xffn;
const leadingZeros = 0x000000ffn;
// Plus not allowed on literals
const unaryPlus = +123n;
const unaryPlusHex = +0x123n;
// Parsing errors
// In separate blocks because they each declare an "n" variable
{
    const legacyOct = 83, n;
}
{
    const scientific = 1e2n;
}
{
    const decimal = 4.1n;
}
{
    const leadingDecimal = .1n;
}
const emptyBinary = 0n; // should error but infer 0n
const emptyOct = 0n; // should error but infer 0n
const emptyHex = 0x0n; // should error but infer 0n
const leadingSeparator = _123n;
const trailingSeparator = 123n;
const doubleSeparator = 123456789n;
// Using literals as types
const oneTwoOrThree = (x) => x ** 2n;
oneTwoOrThree(0n);
oneTwoOrThree(1n);
oneTwoOrThree(2n);
oneTwoOrThree(3n);
oneTwoOrThree(0);
oneTwoOrThree(1);
oneTwoOrThree(2);
oneTwoOrThree(3);
