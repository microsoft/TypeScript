// @noTypesAndSymbols: true

function get10BitsOf<T extends string, U extends string, FallbackPrefix extends string>() {
    type Bit = T | U; // 2^1
    type HalfNibble = `${Bit}${Bit}`; // 2^2
    type Nibble = `${HalfNibble}${HalfNibble}`; // 2^4
    type Byte = `${Nibble}${Nibble}`; // 2^8
    type TenBits = `${Byte}${HalfNibble}`; // 2^10 (approx. 1 million comparisons if compared naively)

    type HalfWord = `${Byte}${Byte}`; // 2^16 // allowed, but test takes way too long if used
    type Word = `${HalfWord}${HalfWord}`; // 2^32 (throws, too large)

    // Literal type relations are uncached (lol), so everything has to be wrapped in an object to affect cache sizes
    // (A distributive conditional is the easiest way to do the mapping, but others are possible, eg, mapped types,
    // or explicit construction)
    type Box<T> = T extends unknown ? {item: T} : never;

    // By manufacturing the fallback in here, we guarantee it has a higher typeid than the bit strings,
    // and thus is sorted to the end of the union, guaranteeing relationship checking passes with a maximal
    // number of comparisons when a naive comparison is done (guaranteeing this test is slow)
    return null as any as Box<TenBits | (FallbackPrefix extends never ? never : `${FallbackPrefix}${string}`)>; // return type is a union
}

let a = get10BitsOf<"0", "1", "a" | "b">();
const b = get10BitsOf<"a", "b", never>();

a = b;