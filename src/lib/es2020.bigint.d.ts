interface BigIntToLocaleStringOptions {
    /**
     * The locale matching algorithm to use.The default is "best fit". For information about this option, see the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation Intl page}.
     */
    localeMatcher?: string;
    /**
     * The formatting style to use , the default is "decimal".
     */
    style?: string;

    numberingSystem?: string;
    /**
     * The unit to use in unit formatting, Possible values are core unit identifiers, defined in UTS #35, Part 2, Section 6. A subset of units from the full list was selected for use in ECMAScript. Pairs of simple units can be concatenated with "-per-" to make a compound unit. There is no default value; if the style is "unit", the unit property must be provided.
     */
    unit?: string;

    /**
     * The unit formatting style to use in unit formatting, the defaults is "short".
     */
    unitDisplay?: string;

    /**
     * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB — see the Current currency & funds code list. There is no default value; if the style is "currency", the currency property must be provided. It is only used when [[Style]] has the value "currency".
     */
    currency?: string;

    /**
     * How to display the currency in currency formatting. It is only used when [[Style]] has the value "currency". The default is "symbol".
     *
     * "symbol" to use a localized currency symbol such as €,
     *
     * "code" to use the ISO currency code,
     *
     * "name" to use a localized currency name such as "dollar"
     */
    currencyDisplay?: string;

    /**
     * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. The default is true.
     */
    useGrouping?: boolean;

    /**
     * The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.
     */
    minimumIntegerDigits?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

    /**
     * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the {@link http://www.currency-iso.org/en/home/tables/table-a1.html ISO 4217 currency codes list} (2 if the list doesn't provide that information).
     */
    minimumFractionDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

    /**
     * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the {@link http://www.currency-iso.org/en/home/tables/table-a1.html ISO 4217 currency codes list} (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.
     */
    maximumFractionDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

    /**
     * The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.
     */
    minimumSignificantDigits?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

    /**
     * The maximum number of significant digits to use. Possible values are from 1 to 21; the default is 21.
     */
    maximumSignificantDigits?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

    /**
     * The formatting that should be displayed for the number, the defaults is "standard"
     *
     *     "standard" plain number formatting
     *
     *     "scientific" return the order-of-magnitude for formatted number.
     *
     *     "engineering" return the exponent of ten when divisible by three
     *
     *     "compact" string representing exponent, defaults is using the "short" form
     */
    notation?: string;

    /**
     * used only when notation is "compact"
     */
    compactDisplay?: string;
}

interface BigInt {
    /**
     * Returns a string representation of an object.
     * @param radix Specifies a radix for converting numeric values to strings.
     */
    toString(radix?: number): string;

    /** Returns a string representation appropriate to the host environment's current locale. */
    toLocaleString(locales?: string, options?: BigIntToLocaleStringOptions): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): bigint;

    readonly [Symbol.toStringTag]: "BigInt";
}

interface BigIntConstructor {
    (value: bigint | boolean | number | string): bigint;
    readonly prototype: BigInt;

    /**
     * Interprets the low bits of a BigInt as a 2's-complement signed integer.
     * All higher bits are discarded.
     * @param bits The number of low bits to use
     * @param int The BigInt whose bits to extract
     */
    asIntN(bits: number, int: bigint): bigint;
    /**
     * Interprets the low bits of a BigInt as an unsigned integer.
     * All higher bits are discarded.
     * @param bits The number of low bits to use
     * @param int The BigInt whose bits to extract
     */
    asUintN(bits: number, int: bigint): bigint;
}

declare var BigInt: BigIntConstructor;

/**
 * A typed array of 64-bit signed integer values. The contents are initialized to 0. If the
 * requested number of bytes could not be allocated, an exception is raised.
 */
interface BigInt64Array extends TypedArray<bigint> {
    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    readonly [Symbol.toStringTag]: "BigInt64Array";
}

interface BigInt64ArrayConstructor extends TypedArrayConstructor<bigint, BigInt64Array> {
    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;
}
declare var BigInt64Array: BigInt64ArrayConstructor;

/**
 * A typed array of 64-bit unsigned integer values. The contents are initialized to 0. If the
 * requested number of bytes could not be allocated, an exception is raised.
 */
interface BigUint64Array extends TypedArray<bigint> {
    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    readonly [Symbol.toStringTag]: "BigUint64Array";
}

interface BigUint64ArrayConstructor extends TypedArrayConstructor<bigint, BigUint64Array> {
    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;
}
declare var BigUint64Array: BigUint64ArrayConstructor;

interface DataView {
    /**
     * Gets the BigInt64 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint;

    /**
     * Gets the BigUint64 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint;

    /**
     * Stores a BigInt64 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written,
     * otherwise a little-endian value should be written.
     */
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;

    /**
     * Stores a BigUint64 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written,
     * otherwise a little-endian value should be written.
     */
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
}

declare namespace Intl{
    interface NumberFormat {
        format(value: number | bigint): string;
        resolvedOptions(): ResolvedNumberFormatOptions;
    }
}
