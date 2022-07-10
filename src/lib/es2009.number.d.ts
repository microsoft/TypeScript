/// <reference lib="es2009.intl" />

interface Number {
    /**
     * Returns a string representation of an object.
     * @param radix Specifies a radix for converting numeric values to strings. This value is only used for numbers.
     */
    toString(radix?: number): string;

    /**
     * Returns a string representing a number in fixed-point notation.
     * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
     */
    toFixed(fractionDigits?: number): string;

    /**
     * Returns a string containing a number represented in exponential notation.
     * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
     */
    toExponential(fractionDigits?: number): string;

    /**
     * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
     * @param precision Number of significant digits. Must be in the range 1 - 21, inclusive.
     */
    toPrecision(precision?: number): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): number;
}

interface NumberConstructor {
    new(value?: any): Number;
    (value?: any): number;
    readonly prototype: Number;

    /** The largest number that can be represented in JavaScript. Equal to approximately 1.79E+308. */
    readonly MAX_VALUE: number;

    /** The closest number to zero that can be represented in JavaScript. Equal to approximately 5.00E-324. */
    readonly MIN_VALUE: number;

    /**
     * A value that is not a number.
     * In equality comparisons, NaN does not equal any value, including itself. To test whether a value is equivalent to NaN, use the isNaN function.
     */
    readonly NaN: number;

    /**
     * A value that is less than the largest negative number that can be represented in JavaScript.
     * JavaScript displays NEGATIVE_INFINITY values as -infinity.
     */
    readonly NEGATIVE_INFINITY: number;

    /**
     * A value greater than the largest number that can be represented in JavaScript.
     * JavaScript displays POSITIVE_INFINITY values as infinity.
     */
    readonly POSITIVE_INFINITY: number;
}

/** An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers. */
declare var Number: NumberConstructor;

interface Number {
    /**
     * Converts a number to a string by using the current or specified locale.
     * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
     * @param options An object that contains one or more properties that specify comparison options.
     */
    toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
}
