/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/// <reference no-default-lib="true"/>

/////////////////////////////
/// ECMAScript APIs
/////////////////////////////

declare var NaN: number;
declare var Infinity: number;

/**
  * Evaluates JavaScript code and executes it.
  * @param x A String value that contains valid JavaScript code.
  */
declare function eval(x: string): any;

/**
  * Converts A string to an integer.
  * @param s A string to convert into a number.
  * @param radix A value between 2 and 36 that specifies the base of the number in numString.
  * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
  * All other strings are considered decimal.
  */
declare function parseInt(s: string, radix?: number): number;

/**
  * Converts a string to a floating-point number.
  * @param string A string that contains a floating-point number.
  */
declare function parseFloat(string: string): number;

/**
  * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
  * @param number A numeric value.
  */
declare function isNaN(number: number): boolean;

/**
  * Determines whether a supplied number is finite.
  * @param number Any numeric value.
  */
declare function isFinite(number: number): boolean;

/**
  * Gets the unencoded version of an encoded Uniform Resource Identifier (URI).
  * @param encodedURI A value representing an encoded URI.
  */
declare function decodeURI(encodedURI: string): string;

/**
  * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
  * @param encodedURIComponent A value representing an encoded URI component.
  */
declare function decodeURIComponent(encodedURIComponent: string): string;

/**
  * Encodes a text string as a valid Uniform Resource Identifier (URI)
  * @param uri A value representing an encoded URI.
  */
declare function encodeURI(uri: string): string;

/**
  * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  * @param uriComponent A value representing an encoded URI component.
  */
declare function encodeURIComponent(uriComponent: string | number | boolean): string;

/**
  * Computes a new string in which certain characters have been replaced by a hexadecimal escape sequence.
  * @param string A string value
  */
declare function escape(string: string): string;

/**
  * Computes a new string in which hexadecimal escape sequences are replaced with the character that it represents.
  * @param string A string value
  */
declare function unescape(string: string): string;

interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get? (): any;
    set? (v: any): void;
}

interface PropertyDescriptorMap {
    [s: string]: PropertyDescriptor;
}

interface Object {
    /** The initial value of Object.prototype.constructor is the standard built-in Object constructor. */
    constructor: Function;

    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns a date converted to a string using the current locale. */
    toLocaleString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    /**
      * Determines whether an object has a property with the specified name.
      * @param v A property name.
      */
    hasOwnProperty(v: string): boolean;

    /**
      * Determines whether an object exists in another object's prototype chain.
      * @param v Another object whose prototype chain is to be checked.
      */
    isPrototypeOf(v: Object): boolean;

    /**
      * Determines whether a specified property is enumerable.
      * @param v A property name.
      */
    propertyIsEnumerable(v: string): boolean;
}

interface ObjectConstructor {
    new (value?: any): Object;
    (): any;
    (value: any): any;

    /** A reference to the prototype for a class of objects. */
    prototype: Object;

    /**
      * Returns the prototype of an object.
      * @param o The object that references the prototype.
      */
    getPrototypeOf(o: any): any;

    /**
      * Gets the own property descriptor of the specified object.
      * An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.
      * @param o Object that contains the property.
      * @param p Name of the property.
    */
    getOwnPropertyDescriptor(o: any, p: string): PropertyDescriptor;

    /**
      * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
      * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
      * @param o Object that contains the own properties.
      */
    getOwnPropertyNames(o: any): string[];

    /**
      * Creates an object that has the specified prototype, and that optionally contains specified properties.
      * @param o Object to use as a prototype. May be null
      * @param properties JavaScript object that contains one or more property descriptors.
      */
    create(o: any, properties?: PropertyDescriptorMap): any;

    /**
      * Adds a property to an object, or modifies attributes of an existing property.
      * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
      * @param p The property name.
      * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
      */
    defineProperty<T>(o: T, p: string, attributes: PropertyDescriptor): T;

    /**
      * Adds one or more properties to an object, and/or modifies attributes of existing properties.
      * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
      * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
      */
    defineProperties<T>(o: T, properties: PropertyDescriptorMap): T;

    /**
      * Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
      * @param o Object on which to lock the attributes.
      */
    seal<T>(o: T): T;

    /**
      * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
      * @param o Object on which to lock the attributes.
      */
    freeze<T>(o: T): T;

    /**
      * Prevents the addition of new properties to an object.
      * @param o Object to make non-extensible.
      */
    preventExtensions<T>(o: T): T;

    /**
      * Returns true if existing property attributes cannot be modified in an object and new properties cannot be added to the object.
      * @param o Object to test.
      */
    isSealed(o: any): boolean;

    /**
      * Returns true if existing property attributes and values cannot be modified in an object, and new properties cannot be added to the object.
      * @param o Object to test.
      */
    isFrozen(o: any): boolean;

    /**
      * Returns a value that indicates whether new properties can be added to an object.
      * @param o Object to test.
      */
    isExtensible(o: any): boolean;

    /**
      * Returns the names of the enumerable properties and methods of an object.
      * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
      */
    keys(o: any): string[];
}

/**
  * Provides functionality common to all JavaScript objects.
  */
declare var Object: ObjectConstructor;

/**
  * Creates a new function.
  */
interface Function {
    /**
      * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
      * @param thisArg The object to be used as the this object.
      * @param argArray A set of arguments to be passed to the function.
      */
    apply(thisArg: any, argArray?: any): any;

    /**
      * Calls a method of an object, substituting another object for the current object.
      * @param thisArg The object to be used as the current object.
      * @param argArray A list of arguments to be passed to the method.
      */
    call(thisArg: any, ...argArray: any[]): any;

    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg An object to which the this keyword can refer inside the new function.
      * @param argArray A list of arguments to be passed to the new function.
      */
    bind(thisArg: any, ...argArray: any[]): any;

    prototype: any;
    length: number;

    // Non-standard extensions
    arguments: any;
    caller: Function;
}

interface FunctionConstructor {
    /**
      * Creates a new function.
      * @param args A list of arguments the function accepts.
      */
    new (...args: string[]): Function;
    (...args: string[]): Function;
    prototype: Function;
}

declare var Function: FunctionConstructor;

interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

interface String {
    /** Returns a string representation of a string. */
    toString(): string;

    /**
      * Returns the character at the specified index.
      * @param pos The zero-based index of the desired character.
      */
    charAt(pos: number): string;

    /**
      * Returns the Unicode value of the character at the specified location.
      * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.
      */
    charCodeAt(index: number): number;

    /**
      * Returns a string that contains the concatenation of two or more strings.
      * @param strings The strings to append to the end of the string.
      */
    concat(...strings: string[]): string;

    /**
      * Returns the position of the first occurrence of a substring.
      * @param searchString The substring to search for in the string
      * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
      */
    indexOf(searchString: string, position?: number): number;

    /**
      * Returns the last occurrence of a substring in the string.
      * @param searchString The substring to search for.
      * @param position The index at which to begin searching. If omitted, the search begins at the end of the string.
      */
    lastIndexOf(searchString: string, position?: number): number;

    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      */
    localeCompare(that: string): number;

    /**
      * Matches a string with a regular expression, and returns an array containing the results of that search.
      * @param regexp A variable name or string literal containing the regular expression pattern and flags.
      */
    match(regexp: string): RegExpMatchArray;

    /**
      * Matches a string with a regular expression, and returns an array containing the results of that search.
      * @param regexp A regular expression object that contains the regular expression pattern and applicable flags.
      */
    match(regexp: RegExp): RegExpMatchArray;

    /**
      * Replaces text in a string, using a regular expression or search string.
      * @param searchValue A string that represents the regular expression.
      * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
      */
    replace(searchValue: string, replaceValue: string): string;

    /**
      * Replaces text in a string, using a regular expression or search string.
      * @param searchValue A string that represents the regular expression.
      * @param replacer A function that returns the replacement text.
      */
    replace(searchValue: string, replacer: (substring: string, ...args: any[]) => string): string;

    /**
      * Replaces text in a string, using a regular expression or search string.
      * @param searchValue A Regular Expression object containing the regular expression pattern and applicable flags.
      * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
      */
    replace(searchValue: RegExp, replaceValue: string): string;

    /**
      * Replaces text in a string, using a regular expression or search string.
      * @param searchValue A Regular Expression object containing the regular expression pattern and applicable flags
      * @param replacer A function that returns the replacement text.
      */
    replace(searchValue: RegExp, replacer: (substring: string, ...args: any[]) => string): string;

    /**
      * Finds the first substring match in a regular expression search.
      * @param regexp The regular expression pattern and applicable flags.
      */
    search(regexp: string): number;

    /**
      * Finds the first substring match in a regular expression search.
      * @param regexp The regular expression pattern and applicable flags.
      */
    search(regexp: RegExp): number;

    /**
      * Returns a section of a string.
      * @param start The index to the beginning of the specified portion of stringObj.
      * @param end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.
      * If this value is not specified, the substring continues to the end of stringObj.
      */
    slice(start?: number, end?: number): string;

    /**
      * Split a string into substrings using the specified separator and return them as an array.
      * @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
      * @param limit A value used to limit the number of elements returned in the array.
      */
    split(separator: string, limit?: number): string[];

    /**
      * Split a string into substrings using the specified separator and return them as an array.
      * @param separator A Regular Express that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
      * @param limit A value used to limit the number of elements returned in the array.
      */
    split(separator: RegExp, limit?: number): string[];

    /**
      * Returns the substring at the specified location within a String object.
      * @param start The zero-based index number indicating the beginning of the substring.
      * @param end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.
      * If end is omitted, the characters from start through the end of the original string are returned.
      */
    substring(start: number, end?: number): string;

    /** Converts all the alphabetic characters in a string to lowercase. */
    toLowerCase(): string;

    /** Converts all alphabetic characters to lowercase, taking into account the host environment's current locale. */
    toLocaleLowerCase(): string;

    /** Converts all the alphabetic characters in a string to uppercase. */
    toUpperCase(): string;

    /** Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale. */
    toLocaleUpperCase(): string;

    /** Removes the leading and trailing white space and line terminator characters from a string. */
    trim(): string;

    /** Returns the length of a String object. */
    length: number;

    // IE extensions
    /**
      * Gets a substring beginning at the specified location and having the specified length.
      * @param from The starting position of the desired substring. The index of the first character in the string is zero.
      * @param length The number of characters to include in the returned substring.
      */
    substr(from: number, length?: number): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): string;

    [index: number]: string;
}

interface StringConstructor {
    new (value?: any): String;
    (value?: any): string;
    prototype: String;
    fromCharCode(...codes: number[]): string;
}

/**
  * Allows manipulation and formatting of text strings and determination and location of substrings within strings.
  */
declare var String: StringConstructor;

interface Boolean {
    /** Returns the primitive value of the specified object. */
    valueOf(): boolean;
}

interface BooleanConstructor {
    new (value?: any): Boolean;
    (value?: any): boolean;
    prototype: Boolean;
}

declare var Boolean: BooleanConstructor;

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
    new (value?: any): Number;
    (value?: any): number;
    prototype: Number;

    /** The largest number that can be represented in JavaScript. Equal to approximately 1.79E+308. */
    MAX_VALUE: number;

    /** The closest number to zero that can be represented in JavaScript. Equal to approximately 5.00E-324. */
    MIN_VALUE: number;

    /**
      * A value that is not a number.
      * In equality comparisons, NaN does not equal any value, including itself. To test whether a value is equivalent to NaN, use the isNaN function.
      */
    NaN: number;

    /**
      * A value that is less than the largest negative number that can be represented in JavaScript.
      * JavaScript displays NEGATIVE_INFINITY values as -infinity.
      */
    NEGATIVE_INFINITY: number;

    /**
      * A value greater than the largest number that can be represented in JavaScript.
      * JavaScript displays POSITIVE_INFINITY values as infinity.
      */
    POSITIVE_INFINITY: number;
}

/** An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers. */
declare var Number: NumberConstructor;

interface TemplateStringsArray extends Array<string> {
    raw: string[];
}

interface Math {
    /** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
    E: number;
    /** The natural logarithm of 10. */
    LN10: number;
    /** The natural logarithm of 2. */
    LN2: number;
    /** The base-2 logarithm of e. */
    LOG2E: number;
    /** The base-10 logarithm of e. */
    LOG10E: number;
    /** Pi. This is the ratio of the circumference of a circle to its diameter. */
    PI: number;
    /** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
    SQRT1_2: number;
    /** The square root of 2. */
    SQRT2: number;
    /**
      * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
      * For example, the absolute value of -5 is the same as the absolute value of 5.
      * @param x A numeric expression for which the absolute value is needed.
      */
    abs(x: number): number;
    /**
      * Returns the arc cosine (or inverse cosine) of a number.
      * @param x A numeric expression.
      */
    acos(x: number): number;
    /**
      * Returns the arcsine of a number.
      * @param x A numeric expression.
      */
    asin(x: number): number;
    /**
      * Returns the arctangent of a number.
      * @param x A numeric expression for which the arctangent is needed.
      */
    atan(x: number): number;
    /**
      * Returns the angle (in radians) from the X axis to a point.
      * @param y A numeric expression representing the cartesian y-coordinate.
      * @param x A numeric expression representing the cartesian x-coordinate.
      */
    atan2(y: number, x: number): number;
    /**
      * Returns the smallest number greater than or equal to its numeric argument.
      * @param x A numeric expression.
      */
    ceil(x: number): number;
    /**
      * Returns the cosine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    cos(x: number): number;
    /**
      * Returns e (the base of natural logarithms) raised to a power.
      * @param x A numeric expression representing the power of e.
      */
    exp(x: number): number;
    /**
      * Returns the greatest number less than or equal to its numeric argument.
      * @param x A numeric expression.
      */
    floor(x: number): number;
    /**
      * Returns the natural logarithm (base e) of a number.
      * @param x A numeric expression.
      */
    log(x: number): number;
    /**
      * Returns the larger of a set of supplied numeric expressions.
      * @param values Numeric expressions to be evaluated.
      */
    max(...values: number[]): number;
    /**
      * Returns the smaller of a set of supplied numeric expressions.
      * @param values Numeric expressions to be evaluated.
      */
    min(...values: number[]): number;
    /**
      * Returns the value of a base expression taken to a specified power.
      * @param x The base value of the expression.
      * @param y The exponent value of the expression.
      */
    pow(x: number, y: number): number;
    /** Returns a pseudorandom number between 0 and 1. */
    random(): number;
    /**
      * Returns a supplied numeric expression rounded to the nearest number.
      * @param x The value to be rounded to the nearest number.
      */
    round(x: number): number;
    /**
      * Returns the sine of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    sin(x: number): number;
    /**
      * Returns the square root of a number.
      * @param x A numeric expression.
      */
    sqrt(x: number): number;
    /**
      * Returns the tangent of a number.
      * @param x A numeric expression that contains an angle measured in radians.
      */
    tan(x: number): number;
}
/** An intrinsic object that provides basic mathematics functionality and constants. */
declare var Math: Math;

/** Enables basic storage and retrieval of dates and times. */
interface Date {
    /** Returns a string representation of a date. The format of the string depends on the locale. */
    toString(): string;
    /** Returns a date as a string value. */
    toDateString(): string;
    /** Returns a time as a string value. */
    toTimeString(): string;
    /** Returns a value as a string value appropriate to the host environment's current locale. */
    toLocaleString(): string;
    /** Returns a date as a string value appropriate to the host environment's current locale. */
    toLocaleDateString(): string;
    /** Returns a time as a string value appropriate to the host environment's current locale. */
    toLocaleTimeString(): string;
    /** Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC. */
    valueOf(): number;
    /** Gets the time value in milliseconds. */
    getTime(): number;
    /** Gets the year, using local time. */
    getFullYear(): number;
    /** Gets the year using Universal Coordinated Time (UTC). */
    getUTCFullYear(): number;
    /** Gets the month, using local time. */
    getMonth(): number;
    /** Gets the month of a Date object using Universal Coordinated Time (UTC). */
    getUTCMonth(): number;
    /** Gets the day-of-the-month, using local time. */
    getDate(): number;
    /** Gets the day-of-the-month, using Universal Coordinated Time (UTC). */
    getUTCDate(): number;
    /** Gets the day of the week, using local time. */
    getDay(): number;
    /** Gets the day of the week using Universal Coordinated Time (UTC). */
    getUTCDay(): number;
    /** Gets the hours in a date, using local time. */
    getHours(): number;
    /** Gets the hours value in a Date object using Universal Coordinated Time (UTC). */
    getUTCHours(): number;
    /** Gets the minutes of a Date object, using local time. */
    getMinutes(): number;
    /** Gets the minutes of a Date object using Universal Coordinated Time (UTC). */
    getUTCMinutes(): number;
    /** Gets the seconds of a Date object, using local time. */
    getSeconds(): number;
    /** Gets the seconds of a Date object using Universal Coordinated Time (UTC). */
    getUTCSeconds(): number;
    /** Gets the milliseconds of a Date, using local time. */
    getMilliseconds(): number;
    /** Gets the milliseconds of a Date object using Universal Coordinated Time (UTC). */
    getUTCMilliseconds(): number;
    /** Gets the difference in minutes between Universal Coordinated Time (UTC) and the time on the local computer. */
    getTimezoneOffset(): number;
    /**
      * Sets the date and time value in the Date object.
      * @param time A numeric value representing the number of elapsed milliseconds since midnight, January 1, 1970 GMT.
      */
    setTime(time: number): number;
    /**
      * Sets the milliseconds value in the Date object using local time.
      * @param ms A numeric value equal to the millisecond value.
      */
    setMilliseconds(ms: number): number;
    /**
      * Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).
      * @param ms A numeric value equal to the millisecond value.
      */
    setUTCMilliseconds(ms: number): number;

    /**
      * Sets the seconds value in the Date object using local time.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setSeconds(sec: number, ms?: number): number;
    /**
      * Sets the seconds value in the Date object using Universal Coordinated Time (UTC).
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCSeconds(sec: number, ms?: number): number;
    /**
      * Sets the minutes value in the Date object using local time.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setMinutes(min: number, sec?: number, ms?: number): number;
    /**
      * Sets the minutes value in the Date object using Universal Coordinated Time (UTC).
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCMinutes(min: number, sec?: number, ms?: number): number;
    /**
      * Sets the hour value in the Date object using local time.
      * @param hours A numeric value equal to the hours value.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setHours(hours: number, min?: number, sec?: number, ms?: number): number;
    /**
      * Sets the hours value in the Date object using Universal Coordinated Time (UTC).
      * @param hours A numeric value equal to the hours value.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
    /**
      * Sets the numeric day-of-the-month value of the Date object using local time.
      * @param date A numeric value equal to the day of the month.
      */
    setDate(date: number): number;
    /**
      * Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).
      * @param date A numeric value equal to the day of the month.
      */
    setUTCDate(date: number): number;
    /**
      * Sets the month value in the Date object using local time.
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
      * @param date A numeric value representing the day of the month. If this value is not supplied, the value from a call to the getDate method is used.
      */
    setMonth(month: number, date?: number): number;
    /**
      * Sets the month value in the Date object using Universal Coordinated Time (UTC).
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
      * @param date A numeric value representing the day of the month. If it is not supplied, the value from a call to the getUTCDate method is used.
      */
    setUTCMonth(month: number, date?: number): number;
    /**
      * Sets the year of the Date object using local time.
      * @param year A numeric value for the year.
      * @param month A zero-based numeric value for the month (0 for January, 11 for December). Must be specified if numDate is specified.
      * @param date A numeric value equal for the day of the month.
      */
    setFullYear(year: number, month?: number, date?: number): number;
    /**
      * Sets the year value in the Date object using Universal Coordinated Time (UTC).
      * @param year A numeric value equal to the year.
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. Must be supplied if numDate is supplied.
      * @param date A numeric value equal to the day of the month.
      */
    setUTCFullYear(year: number, month?: number, date?: number): number;
    /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
    toUTCString(): string;
    /** Returns a date as a string value in ISO format. */
    toISOString(): string;
    /** Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. */
    toJSON(key?: any): string;
}

interface DateConstructor {
    new (): Date;
    new (value: number): Date;
    new (value: string): Date;
    new (year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
    (): string;
    prototype: Date;
    /**
      * Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.
      * @param s A date string
      */
    parse(s: string): number;
    /**
      * Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.
      * @param year The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
      * @param month The month as an number between 0 and 11 (January to December).
      * @param date The date as an number between 1 and 31.
      * @param hours Must be supplied if minutes is supplied. An number from 0 to 23 (midnight to 11pm) that specifies the hour.
      * @param minutes Must be supplied if seconds is supplied. An number from 0 to 59 that specifies the minutes.
      * @param seconds Must be supplied if milliseconds is supplied. An number from 0 to 59 that specifies the seconds.
      * @param ms An number from 0 to 999 that specifies the milliseconds.
      */
    UTC(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
    now(): number;
}

declare var Date: DateConstructor;

interface RegExpMatchArray extends Array<string> {
    index?: number;
    input?: string;
}

interface RegExpExecArray extends Array<string> {
    index: number;
    input: string;
}

interface RegExp {
    /**
      * Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
      * @param string The String object or string literal on which to perform the search.
      */
    exec(string: string): RegExpExecArray;

    /**
      * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
      * @param string String on which to perform the search.
      */
    test(string: string): boolean;

    /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
    source: string;

    /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
    global: boolean;

    /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
    ignoreCase: boolean;

    /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
    multiline: boolean;

    lastIndex: number;

    // Non-standard extensions
    compile(): RegExp;
}

interface RegExpConstructor {
    new (pattern: string, flags?: string): RegExp;
    (pattern: string, flags?: string): RegExp;
    prototype: RegExp;

    // Non-standard extensions
    $1: string;
    $2: string;
    $3: string;
    $4: string;
    $5: string;
    $6: string;
    $7: string;
    $8: string;
    $9: string;
    lastMatch: string;
}

declare var RegExp: RegExpConstructor;

interface Error {
    name: string;
    message: string;
}

interface ErrorConstructor {
    new (message?: string): Error;
    (message?: string): Error;
    prototype: Error;
}

declare var Error: ErrorConstructor;

interface EvalError extends Error {
}

interface EvalErrorConstructor {
    new (message?: string): EvalError;
    (message?: string): EvalError;
    prototype: EvalError;
}

declare var EvalError: EvalErrorConstructor;

interface RangeError extends Error {
}

interface RangeErrorConstructor {
    new (message?: string): RangeError;
    (message?: string): RangeError;
    prototype: RangeError;
}

declare var RangeError: RangeErrorConstructor;

interface ReferenceError extends Error {
}

interface ReferenceErrorConstructor {
    new (message?: string): ReferenceError;
    (message?: string): ReferenceError;
    prototype: ReferenceError;
}

declare var ReferenceError: ReferenceErrorConstructor;

interface SyntaxError extends Error {
}

interface SyntaxErrorConstructor {
    new (message?: string): SyntaxError;
    (message?: string): SyntaxError;
    prototype: SyntaxError;
}

declare var SyntaxError: SyntaxErrorConstructor;

interface TypeError extends Error {
}

interface TypeErrorConstructor {
    new (message?: string): TypeError;
    (message?: string): TypeError;
    prototype: TypeError;
}

declare var TypeError: TypeErrorConstructor;

interface URIError extends Error {
}

interface URIErrorConstructor {
    new (message?: string): URIError;
    (message?: string): URIError;
    prototype: URIError;
}

declare var URIError: URIErrorConstructor;

interface JSON {
    /**
      * Converts a JavaScript Object Notation (JSON) string into an object.
      * @param text A valid JSON string.
      * @param reviver A function that transforms the results. This function is called for each member of the object.
      * If a member contains nested objects, the nested objects are transformed before the parent object is.
      */
    parse(text: string, reviver?: (key: any, value: any) => any): any;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      */
    stringify(value: any): string;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer A function that transforms the results.
      */
    stringify(value: any, replacer: (key: string, value: any) => any): string;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer Array that transforms the results.
      */
    stringify(value: any, replacer: any[]): string;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer A function that transforms the results.
      * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
      */
    stringify(value: any, replacer: (key: string, value: any) => any, space: string | number): string;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer Array that transforms the results.
      * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
      */
    stringify(value: any, replacer: any[], space: string | number): string;
}
/**
  * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  */
declare var JSON: JSON;


/////////////////////////////
/// ECMAScript Array API (specially handled by compiler)
/////////////////////////////

interface Array<T> {
    /**
      * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
      */
    length: number;
    /**
      * Returns a string representation of an array.
      */
    toString(): string;
    toLocaleString(): string;
    /**
      * Appends new elements to an array, and returns the new length of the array.
      * @param items New elements of the Array.
      */
    push(...items: T[]): number;
    /**
      * Removes the last element from an array and returns it.
      */
    pop(): T;
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat<U extends T[]>(...items: U[]): T[];
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: T[]): T[];
    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;
    /**
      * Reverses the elements in an Array.
      */
    reverse(): T[];
    /**
      * Removes the first element from an array and returns it.
      */
    shift(): T;
    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): T[];

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
      */
    sort(compareFn?: (a: T, b: T) => number): T[];

    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      */
    splice(start: number): T[];

    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      * @param deleteCount The number of elements to remove.
      * @param items Elements to insert into the array in place of the deleted elements.
      */
    splice(start: number, deleteCount: number, ...items: T[]): T[];

    /**
      * Inserts new elements at the start of an array.
      * @param items  Elements to insert at the start of the Array.
      */
    unshift(...items: T[]): number;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
      */
    indexOf(searchElement: T, fromIndex?: number): number;

    /**
      * Returns the index of the last occurrence of a specified value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
      */
    lastIndexOf(searchElement: T, fromIndex?: number): number;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];

    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    [n: number]: T;
}

interface ArrayConstructor {
    new (arrayLength?: number): any[];
    new <T>(arrayLength: number): T[];
    new <T>(...items: T[]): T[];
    (arrayLength?: number): any[];
    <T>(arrayLength: number): T[];
    <T>(...items: T[]): T[];
    isArray(arg: any): arg is Array<any>;
    prototype: Array<any>;
}

declare var Array: ArrayConstructor;

interface TypedPropertyDescriptor<T> {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
    value?: T;
    get?: () => T;
    set?: (value: T) => void;
}

declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

declare type PromiseConstructorLike = new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;

interface PromiseLike<T> {
    /**
    * Attaches callbacks for the resolution and/or rejection of the Promise.
    * @param onfulfilled The callback to execute when the Promise is resolved.
    * @param onrejected The callback to execute when the Promise is rejected.
    * @returns A Promise for the completion of which ever callback is executed.
    */
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): PromiseLike<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): PromiseLike<TResult>;
}

interface ArrayLike<T> {
    length: number;
    [n: number]: T;
}


/**
  * Represents a raw buffer of binary data, which is used to store data for the
  * different typed arrays. ArrayBuffers cannot be read from or written to directly,
  * but can be passed to a typed array or DataView Object to interpret the raw
  * buffer as needed.
  */
interface ArrayBuffer {
    /**
      * Read-only. The length of the ArrayBuffer (in bytes).
      */
    byteLength: number;

    /**
      * Returns a section of an ArrayBuffer.
      */
    slice(begin:number, end?:number): ArrayBuffer;
}

interface ArrayBufferConstructor {
    prototype: ArrayBuffer;
    new (byteLength: number): ArrayBuffer;
    isView(arg: any): arg is ArrayBufferView;
}
declare var ArrayBuffer: ArrayBufferConstructor;

interface ArrayBufferView {
    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;
}

interface DataView {
    buffer: ArrayBuffer;
    byteLength: number;
    byteOffset: number;
    /**
      * Gets the Float32 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Float64 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat64(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Int8 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt8(byteOffset: number): number;

    /**
      * Gets the Int16 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    /**
      * Gets the Int32 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Uint8 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint8(byteOffset: number): number;

    /**
      * Gets the Uint16 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint16(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Uint32 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset.
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Stores an Float32 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Float64 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Int8 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setInt8(byteOffset: number, value: number): void;

    /**
      * Stores an Int16 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Int32 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Uint8 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setUint8(byteOffset: number, value: number): void;

    /**
      * Stores an Uint16 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Uint32 value at the specified byte offset from the start of the view.
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written,
      * otherwise a little-endian value should be written.
      */
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
}

interface DataViewConstructor {
    new (buffer: ArrayBuffer & { BYTES_PER_ELEMENT?: never }, byteOffset?: number, byteLength?: number): DataView;
}
declare var DataView: DataViewConstructor;

/**
  * A typed array of 8-bit integer values. The contents are initialized to 0. If the requested
  * number of bytes could not be allocated an exception is raised.
  */
interface Int8Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Int8Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Int8Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): Int8Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int8Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int8Array) => number, thisArg?: any): Int8Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Int8Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int8Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Int8Array;

    /**
      * Gets a new Int8Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Int8Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}
interface Int8ArrayConstructor {
    prototype: Int8Array;
    new (length: number): Int8Array;
    new (array: ArrayLike<number>): Int8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int8Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int8Array;

}
declare var Int8Array: Int8ArrayConstructor;

/**
  * A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Uint8Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint8Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): Uint8Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint8Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint8Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint8Array;

    /**
      * Gets a new Uint8Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Uint8Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint8ArrayConstructor {
    prototype: Uint8Array;
    new (length: number): Uint8Array;
    new (array: ArrayLike<number>): Uint8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint8Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint8Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;

}
declare var Uint8Array: Uint8ArrayConstructor;

/**
  * A typed array of 8-bit unsigned integer (clamped) values. The contents are initialized to 0.
  * If the requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8ClampedArray {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Uint8ClampedArray;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint8ClampedArray;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => boolean, thisArg?: any): Uint8ClampedArray;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => number, thisArg?: any): Uint8ClampedArray;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint8ClampedArray;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Uint8ClampedArray, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint8ClampedArray;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint8ClampedArray) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint8ClampedArray;

    /**
      * Gets a new Uint8ClampedArray view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Uint8ClampedArray;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint8ClampedArrayConstructor {
    prototype: Uint8ClampedArray;
    new (length: number): Uint8ClampedArray;
    new (array: ArrayLike<number>): Uint8ClampedArray;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint8ClampedArray;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint8ClampedArray;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8ClampedArray;
}
declare var Uint8ClampedArray: Uint8ClampedArrayConstructor;

/**
  * A typed array of 16-bit signed integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int16Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Int16Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Int16Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): Int16Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int16Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int16Array) => number, thisArg?: any): Int16Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Int16Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int16Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Int16Array;

    /**
      * Gets a new Int16Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Int16Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Int16ArrayConstructor {
    prototype: Int16Array;
    new (length: number): Int16Array;
    new (array: ArrayLike<number>): Int16Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int16Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int16Array;

}
declare var Int16Array: Int16ArrayConstructor;

/**
  * A typed array of 16-bit unsigned integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint16Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Uint16Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint16Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): Uint16Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint16Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint16Array) => number, thisArg?: any): Uint16Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint16Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint16Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint16Array;

    /**
      * Gets a new Uint16Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Uint16Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint16ArrayConstructor {
    prototype: Uint16Array;
    new (length: number): Uint16Array;
    new (array: ArrayLike<number>): Uint16Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint16Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint16Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint16Array;

}
declare var Uint16Array: Uint16ArrayConstructor;
/**
  * A typed array of 32-bit signed integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int32Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Int32Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Int32Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): Int32Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int32Array) => number, thisArg?: any): Int32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Int32Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Int32Array;

    /**
      * Gets a new Int32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Int32Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Int32ArrayConstructor {
    prototype: Int32Array;
    new (length: number): Int32Array;
    new (array: ArrayLike<number>): Int32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int32Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int32Array;
}
declare var Int32Array: Int32ArrayConstructor;

/**
  * A typed array of 32-bit unsigned integer values. The contents are initialized to 0. If the
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint32Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Uint32Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint32Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): Uint32Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint32Array) => number, thisArg?: any): Uint32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Uint32Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint32Array;

    /**
      * Gets a new Uint32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Uint32Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint32ArrayConstructor {
    prototype: Uint32Array;
    new (length: number): Uint32Array;
    new (array: ArrayLike<number>): Uint32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint32Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint32Array;
}
declare var Uint32Array: Uint32ArrayConstructor;

/**
  * A typed array of 32-bit float values. The contents are initialized to 0. If the requested number
  * of bytes could not be allocated an exception is raised.
  */
interface Float32Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Float32Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Float32Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): Float32Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Float32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Float32Array) => number, thisArg?: any): Float32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Float32Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Float32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Float32Array;

    /**
      * Gets a new Float32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Float32Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Float32ArrayConstructor {
    prototype: Float32Array;
    new (length: number): Float32Array;
    new (array: ArrayLike<number>): Float32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Float32Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Float32Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float32Array;

}
declare var Float32Array: Float32ArrayConstructor;

/**
  * A typed array of 64-bit float values. The contents are initialized to 0. If the requested
  * number of bytes could not be allocated an exception is raised.
  */
interface Float64Array {
    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array.
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
    copyWithin(target: number, start: number, end?: number): Float64Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls
      * the callbackfn function for each element in array1 until the callbackfn returns false,
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as
        * length+start where length is the length of the array.
        * @param end index to stop filling the array at. If end is negative, it is treated as
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Float64Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls
      * the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): Float64Array;

    /**
      * Returns the value of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /**
      * Returns the index of the first element in the array where predicate is true, and undefined
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending
      * order, until it finds one where predicate returns true. If such an element is found, find
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Float64Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the
      * callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Float64Array) => number, thisArg?: any): Float64Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of
      * the callback function is the accumulated result, and is provided as an argument in the next
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U, initialValue: U): U;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array, in descending order.
      * The return value of the callback function is the accumulated result, and is provided as an
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array.
      */
    reverse(): Float64Array;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: ArrayLike<number>, offset?: number): void;

    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Float64Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the
      * callbackfn function for each element in array1 until the callbackfn returns true, or until
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If
      * omitted, the elements are sorted in ascending, numerical order.
      */
    sort(compareFn?: (a: number, b: number) => number): Float64Array;

    /**
      * Gets a new Float64Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin?: number, end?: number): Float64Array;

    /**
      * Converts a number to a string by using the current locale.
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Float64ArrayConstructor {
    prototype: Float64Array;
    new (length: number): Float64Array;
    new (array: ArrayLike<number>): Float64Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Float64Array;

    /**
      * The size in bytes of each element in the array.
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Float64Array;

    /**
      * Creates an array from an array-like or iterable object.
      * @param arrayLike An array-like or iterable object to convert to an array.
      * @param mapfn A mapping function to call on every element of the array.
      * @param thisArg Value of 'this' used to invoke the mapfn.
      */
    from(arrayLike: ArrayLike<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float64Array;
}
declare var Float64Array: Float64ArrayConstructor;
/////////////////////////////
/// ECMAScript Internationalization API
/////////////////////////////

declare module Intl {
    interface CollatorOptions {
        usage?: string;
        localeMatcher?: string;
        numeric?: boolean;
        caseFirst?: string;
        sensitivity?: string;
        ignorePunctuation?: boolean;
    }

    interface ResolvedCollatorOptions {
        locale: string;
        usage: string;
        sensitivity: string;
        ignorePunctuation: boolean;
        collation: string;
        caseFirst: string;
        numeric: boolean;
    }

    interface Collator {
        compare(x: string, y: string): number;
        resolvedOptions(): ResolvedCollatorOptions;
    }
    var Collator: {
        new (locales?: string[], options?: CollatorOptions): Collator;
        new (locale?: string, options?: CollatorOptions): Collator;
        (locales?: string[], options?: CollatorOptions): Collator;
        (locale?: string, options?: CollatorOptions): Collator;
        supportedLocalesOf(locales: string[], options?: CollatorOptions): string[];
        supportedLocalesOf(locale: string, options?: CollatorOptions): string[];
    }

    interface NumberFormatOptions {
        localeMatcher?: string;
        style?: string;
        compactDisplay?: string;
        currency?: string;
        currencyDisplay?: string;
        unit?: string;
        unitDisplay?: string;
        useGrouping?: boolean;
        minimumIntegerDigits?: number;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        notation?: string;
        signDisplay?: string;
    }

    interface ResolvedNumberFormatOptions {
        locale: string;
        numberingSystem: string;
        style: string;
        compactDisplay?: string;
        currency?: string;
        currencyDisplay?: string;
        unit?: string;
        unitDisplay?: string;
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        useGrouping: boolean;
        notation?: string;
        signDisplay?: string;
    }

    interface NumberFormat {
        format(value: number): string;
        resolvedOptions(): ResolvedNumberFormatOptions;
    }
    var NumberFormat: {
        new (locales?: string[], options?: NumberFormatOptions): NumberFormat;
        new (locale?: string, options?: NumberFormatOptions): NumberFormat;
        (locales?: string[], options?: NumberFormatOptions): NumberFormat;
        (locale?: string, options?: NumberFormatOptions): NumberFormat;
        supportedLocalesOf(locales: string[], options?: NumberFormatOptions): string[];
        supportedLocalesOf(locale: string, options?: NumberFormatOptions): string[];
    }

    interface DateTimeFormatOptions {
        dateStyle?: "full" | "long" | "medium" | "short";
        timeStyle?: "full" | "long" | "medium" | "short";
        calendar?: "buddhist" | "chinese" | " coptic" | "ethiopia" | "ethiopic" | "gregory" | " hebrew" | "indian" | "islamic" | "iso8601" | " japanese" | "persian" | "roc";
        dayPeriod?: "narrow" | "short" | " long";
        numberingSystem?: "arab" | "arabext" | " bali" | "beng" | "deva" | "fullwide" | " gujr" | "guru" | "hanidec" | "khmr" | " knda" | "laoo" | "latn" | "limb" | "mlym" | " mong" | "mymr" | "orya" | "tamldec" | " telu" | "thai" | "tibt";
        localeMatcher?: "best fit" | "lookup";
        timeZone?: string;
        hour12?: boolean;
        hourCycle?: "h11" | "h12" | "h23" | "h24";
        formatMatcher?: "best fit" | "basic";
        weekday?: "long" | "short" | "narrow";
        era?: "long" | "short" | "narrow";
        year?: "numeric" | "2-digit";
        month?: "numeric" | "2-digit" |"long" | "short" | "narrow";
        day?: "numeric" | "2-digit";
        hour?: "numeric" | "2-digit";
        minute?: "numeric" | "2-digit";
        second?: "numeric" | "2-digit";
        fractionalSecondDigits?: 1 | 2 | 3;
        timeZoneName?: "long" | "short";
    }

    interface ResolvedDateTimeFormatOptions {
        locale: string;
        calendar: string;
        numberingSystem: string;
        timeZone: string;
        hour12?: boolean;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
    }

    interface DateTimeFormat {
        format(date?: Date | number): string;
        resolvedOptions(): ResolvedDateTimeFormatOptions;
    }
    var DateTimeFormat: {
        new (locales?: string[], options?: DateTimeFormatOptions): DateTimeFormat;
        new (locale?: string, options?: DateTimeFormatOptions): DateTimeFormat;
        (locales?: string[], options?: DateTimeFormatOptions): DateTimeFormat;
        (locale?: string, options?: DateTimeFormatOptions): DateTimeFormat;
        supportedLocalesOf(locales: string[], options?: DateTimeFormatOptions): string[];
        supportedLocalesOf(locale: string, options?: DateTimeFormatOptions): string[];
    }
}

interface String {
    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locales: string[], options?: Intl.CollatorOptions): number;

    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locale: string, options?: Intl.CollatorOptions): number;
}

interface Number {
    /**
      * Converts a number to a string by using the current or specified locale.
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locales?: string[], options?: Intl.NumberFormatOptions): string;

    /**
      * Converts a number to a string by using the current or specified locale.
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locale?: string, options?: Intl.NumberFormatOptions): string;
}

interface Date {
    /**
      * Converts a date and time to a string by using the current or specified locale.
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locales?: string[], options?: Intl.DateTimeFormatOptions): string;
    /**
      * Converts a date to a string by using the current or specified locale.
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleDateString(locales?: string[], options?: Intl.DateTimeFormatOptions): string;

    /**
      * Converts a time to a string by using the current or specified locale.
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleTimeString(locale?: string[], options?: Intl.DateTimeFormatOptions): string;

    /**
      * Converts a date and time to a string by using the current or specified locale.
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locale?: string, options?: Intl.DateTimeFormatOptions): string;

    /**
      * Converts a date to a string by using the current or specified locale.
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleDateString(locale?: string, options?: Intl.DateTimeFormatOptions): string;

    /**
      * Converts a time to a string by using the current or specified locale.
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleTimeString(locale?: string, options?: Intl.DateTimeFormatOptions): string;
}


/////////////////////////////
/// IE DOM APIs
/////////////////////////////

interface Algorithm {
    name?: string;
}

interface AriaRequestEventInit extends EventInit {
    attributeName?: string;
    attributeValue?: string;
}

interface ClipboardEventInit extends EventInit {
    data?: string;
    dataType?: string;
}

interface CommandEventInit extends EventInit {
    commandName?: string;
    detail?: string;
}

interface CompositionEventInit extends UIEventInit {
    data?: string;
}

interface ConfirmSiteSpecificExceptionsInformation extends ExceptionInformation {
    arrayOfDomainStrings?: string[];
}

interface CustomEventInit extends EventInit {
    detail?: any;
}

interface DeviceAccelerationDict {
    x?: number;
    y?: number;
    z?: number;
}

interface DeviceRotationRateDict {
    alpha?: number;
    beta?: number;
    gamma?: number;
}

interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
}

interface ExceptionInformation {
    domain?: string;
}

interface FocusEventInit extends UIEventInit {
    relatedTarget?: EventTarget;
}

interface HashChangeEventInit extends EventInit {
    newURL?: string;
    oldURL?: string;
}

interface KeyAlgorithm {
    name?: string;
}

interface KeyboardEventInit extends SharedKeyboardAndMouseEventInit {
    key?: string;
    location?: number;
    repeat?: boolean;
}

interface MouseEventInit extends SharedKeyboardAndMouseEventInit {
    screenX?: number;
    screenY?: number;
    clientX?: number;
    clientY?: number;
    button?: number;
    buttons?: number;
    relatedTarget?: EventTarget;
}

interface MsZoomToOptions {
    contentX?: number;
    contentY?: number;
    viewportX?: string;
    viewportY?: string;
    scaleFactor?: number;
    animate?: string;
}

interface MutationObserverInit {
    childList?: boolean;
    attributes?: boolean;
    characterData?: boolean;
    subtree?: boolean;
    attributeOldValue?: boolean;
    characterDataOldValue?: boolean;
    attributeFilter?: string[];
}

interface ObjectURLOptions {
    oneTimeOnly?: boolean;
}

interface PointerEventInit extends MouseEventInit {
    pointerId?: number;
    width?: number;
    height?: number;
    pressure?: number;
    tiltX?: number;
    tiltY?: number;
    pointerType?: string;
    isPrimary?: boolean;
}

interface PositionOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}

interface SharedKeyboardAndMouseEventInit extends UIEventInit {
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
    keyModifierStateAltGraph?: boolean;
    keyModifierStateCapsLock?: boolean;
    keyModifierStateFn?: boolean;
    keyModifierStateFnLock?: boolean;
    keyModifierStateHyper?: boolean;
    keyModifierStateNumLock?: boolean;
    keyModifierStateOS?: boolean;
    keyModifierStateScrollLock?: boolean;
    keyModifierStateSuper?: boolean;
    keyModifierStateSymbol?: boolean;
    keyModifierStateSymbolLock?: boolean;
}

interface StoreExceptionsInformation extends ExceptionInformation {
    siteName?: string;
    explanationString?: string;
    detailURI?: string;
}

interface StoreSiteSpecificExceptionsInformation extends StoreExceptionsInformation {
    arrayOfDomainStrings?: string[];
}

interface UIEventInit extends EventInit {
    view?: Window;
    detail?: number;
}

interface WebGLContextAttributes {
    alpha?: boolean;
    depth?: boolean;
    stencil?: boolean;
    antialias?: boolean;
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
}

interface WebGLContextEventInit extends EventInit {
    statusMessage?: string;
}

interface WheelEventInit extends MouseEventInit {
    deltaX?: number;
    deltaY?: number;
    deltaZ?: number;
    deltaMode?: number;
}

interface EventListener {
    (evt: Event): void;
}

interface ANGLE_instanced_arrays {
    drawArraysInstancedANGLE(mode: number, first: number, count: number, primcount: number): void;
    drawElementsInstancedANGLE(mode: number, count: number, type: number, offset: number, primcount: number): void;
    vertexAttribDivisorANGLE(index: number, divisor: number): void;
    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: number;
}

declare var ANGLE_instanced_arrays: {
    prototype: ANGLE_instanced_arrays;
    new(): ANGLE_instanced_arrays;
    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: number;
}

interface AnalyserNode extends AudioNode {
    fftSize: number;
    frequencyBinCount: number;
    maxDecibels: number;
    minDecibels: number;
    smoothingTimeConstant: number;
    getByteFrequencyData(array: Uint8Array): void;
    getByteTimeDomainData(array: Uint8Array): void;
    getFloatFrequencyData(array: Float32Array): void;
    getFloatTimeDomainData(array: Float32Array): void;
}

declare var AnalyserNode: {
    prototype: AnalyserNode;
    new(): AnalyserNode;
}

interface AnimationEvent extends Event {
    animationName: string;
    elapsedTime: number;
    initAnimationEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, animationNameArg: string, elapsedTimeArg: number): void;
}

declare var AnimationEvent: {
    prototype: AnimationEvent;
    new(): AnimationEvent;
}

interface ApplicationCache extends EventTarget {
    oncached: (ev: Event) => any;
    onchecking: (ev: Event) => any;
    ondownloading: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onnoupdate: (ev: Event) => any;
    onobsolete: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    onupdateready: (ev: Event) => any;
    status: number;
    abort(): void;
    swapCache(): void;
    update(): void;
    CHECKING: number;
    DOWNLOADING: number;
    IDLE: number;
    OBSOLETE: number;
    UNCACHED: number;
    UPDATEREADY: number;
    addEventListener(type: "cached", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "checking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "downloading", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "noupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "obsolete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "updateready", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var ApplicationCache: {
    prototype: ApplicationCache;
    new(): ApplicationCache;
    CHECKING: number;
    DOWNLOADING: number;
    IDLE: number;
    OBSOLETE: number;
    UNCACHED: number;
    UPDATEREADY: number;
}

interface AriaRequestEvent extends Event {
    attributeName: string;
    attributeValue: string;
}

declare var AriaRequestEvent: {
    prototype: AriaRequestEvent;
    new(type: string, eventInitDict?: AriaRequestEventInit): AriaRequestEvent;
}

interface Attr extends Node {
    name: string;
    ownerElement: Element;
    specified: boolean;
    value: string;
}

declare var Attr: {
    prototype: Attr;
    new(): Attr;
}

interface AudioBuffer {
    duration: number;
    length: number;
    numberOfChannels: number;
    sampleRate: number;
    getChannelData(channel: number): Float32Array;
}

declare var AudioBuffer: {
    prototype: AudioBuffer;
    new(): AudioBuffer;
}

interface AudioBufferSourceNode extends AudioNode {
    buffer: AudioBuffer;
    loop: boolean;
    loopEnd: number;
    loopStart: number;
    onended: (ev: Event) => any;
    playbackRate: AudioParam;
    start(when?: number, offset?: number, duration?: number): void;
    stop(when?: number): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var AudioBufferSourceNode: {
    prototype: AudioBufferSourceNode;
    new(): AudioBufferSourceNode;
}

interface AudioContext extends EventTarget {
    currentTime: number;
    destination: AudioDestinationNode;
    listener: AudioListener;
    sampleRate: number;
    createAnalyser(): AnalyserNode;
    createBiquadFilter(): BiquadFilterNode;
    createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer;
    createBufferSource(): AudioBufferSourceNode;
    createChannelMerger(numberOfInputs?: number): ChannelMergerNode;
    createChannelSplitter(numberOfOutputs?: number): ChannelSplitterNode;
    createConvolver(): ConvolverNode;
    createDelay(maxDelayTime?: number): DelayNode;
    createDynamicsCompressor(): DynamicsCompressorNode;
    createGain(): GainNode;
    createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode;
    createOscillator(): OscillatorNode;
    createPanner(): PannerNode;
    createPeriodicWave(real: Float32Array, imag: Float32Array): PeriodicWave;
    createScriptProcessor(bufferSize?: number, numberOfInputChannels?: number, numberOfOutputChannels?: number): ScriptProcessorNode;
    createStereoPanner(): StereoPannerNode;
    createWaveShaper(): WaveShaperNode;
    decodeAudioData(audioData: ArrayBuffer, successCallback: DecodeSuccessCallback, errorCallback?: DecodeErrorCallback): void;
}

declare var AudioContext: {
    prototype: AudioContext;
    new(): AudioContext;
}

interface AudioDestinationNode extends AudioNode {
    maxChannelCount: number;
}

declare var AudioDestinationNode: {
    prototype: AudioDestinationNode;
    new(): AudioDestinationNode;
}

interface AudioListener {
    dopplerFactor: number;
    speedOfSound: number;
    setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void;
    setPosition(x: number, y: number, z: number): void;
    setVelocity(x: number, y: number, z: number): void;
}

declare var AudioListener: {
    prototype: AudioListener;
    new(): AudioListener;
}

interface AudioNode extends EventTarget {
    channelCount: number;
    channelCountMode: string;
    channelInterpretation: string;
    context: AudioContext;
    numberOfInputs: number;
    numberOfOutputs: number;
    connect(destination: AudioNode, output?: number, input?: number): void;
    disconnect(output?: number): void;
}

declare var AudioNode: {
    prototype: AudioNode;
    new(): AudioNode;
}

interface AudioParam {
    defaultValue: number;
    value: number;
    cancelScheduledValues(startTime: number): void;
    exponentialRampToValueAtTime(value: number, endTime: number): void;
    linearRampToValueAtTime(value: number, endTime: number): void;
    setTargetAtTime(target: number, startTime: number, timeConstant: number): void;
    setValueAtTime(value: number, startTime: number): void;
    setValueCurveAtTime(values: Float32Array, startTime: number, duration: number): void;
}

declare var AudioParam: {
    prototype: AudioParam;
    new(): AudioParam;
}

interface AudioProcessingEvent extends Event {
    inputBuffer: AudioBuffer;
    outputBuffer: AudioBuffer;
    playbackTime: number;
}

declare var AudioProcessingEvent: {
    prototype: AudioProcessingEvent;
    new(): AudioProcessingEvent;
}

interface AudioTrack {
    enabled: boolean;
    id: string;
    kind: string;
    label: string;
    language: string;
    sourceBuffer: SourceBuffer;
}

declare var AudioTrack: {
    prototype: AudioTrack;
    new(): AudioTrack;
}

interface AudioTrackList extends EventTarget {
    length: number;
    onaddtrack: (ev: TrackEvent) => any;
    onchange: (ev: Event) => any;
    onremovetrack: (ev: TrackEvent) => any;
    getTrackById(id: string): AudioTrack;
    item(index: number): AudioTrack;
    addEventListener(type: "addtrack", listener: (ev: TrackEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "removetrack", listener: (ev: TrackEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    [index: number]: AudioTrack;
}

declare var AudioTrackList: {
    prototype: AudioTrackList;
    new(): AudioTrackList;
}

interface BarProp {
    visible: boolean;
}

declare var BarProp: {
    prototype: BarProp;
    new(): BarProp;
}

interface BeforeUnloadEvent extends Event {
    returnValue: any;
}

declare var BeforeUnloadEvent: {
    prototype: BeforeUnloadEvent;
    new(): BeforeUnloadEvent;
}

interface BiquadFilterNode extends AudioNode {
    Q: AudioParam;
    detune: AudioParam;
    frequency: AudioParam;
    gain: AudioParam;
    type: string;
    getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}

declare var BiquadFilterNode: {
    prototype: BiquadFilterNode;
    new(): BiquadFilterNode;
}

interface Blob {
    size: number;
    type: string;
    msClose(): void;
    msDetachStream(): any;
    slice(start?: number, end?: number, contentType?: string): Blob;
}

declare var Blob: {
    prototype: Blob;
    new (blobParts?: any[], options?: BlobPropertyBag): Blob;
}

interface CDATASection extends Text {
}

declare var CDATASection: {
    prototype: CDATASection;
    new(): CDATASection;
}

interface CSS {
    supports(property: string, value?: string): boolean;
}
declare var CSS: CSS;

interface CSSConditionRule extends CSSGroupingRule {
    conditionText: string;
}

declare var CSSConditionRule: {
    prototype: CSSConditionRule;
    new(): CSSConditionRule;
}

interface CSSFontFaceRule extends CSSRule {
    style: CSSStyleDeclaration;
}

declare var CSSFontFaceRule: {
    prototype: CSSFontFaceRule;
    new(): CSSFontFaceRule;
}

interface CSSGroupingRule extends CSSRule {
    cssRules: CSSRuleList;
    deleteRule(index?: number): void;
    insertRule(rule: string, index?: number): number;
}

declare var CSSGroupingRule: {
    prototype: CSSGroupingRule;
    new(): CSSGroupingRule;
}

interface CSSImportRule extends CSSRule {
    href: string;
    media: MediaList;
    styleSheet: CSSStyleSheet;
}

declare var CSSImportRule: {
    prototype: CSSImportRule;
    new(): CSSImportRule;
}

interface CSSKeyframeRule extends CSSRule {
    keyText: string;
    style: CSSStyleDeclaration;
}

declare var CSSKeyframeRule: {
    prototype: CSSKeyframeRule;
    new(): CSSKeyframeRule;
}

interface CSSKeyframesRule extends CSSRule {
    cssRules: CSSRuleList;
    name: string;
    appendRule(rule: string): void;
    deleteRule(rule: string): void;
    findRule(rule: string): CSSKeyframeRule;
}

declare var CSSKeyframesRule: {
    prototype: CSSKeyframesRule;
    new(): CSSKeyframesRule;
}

interface CSSMediaRule extends CSSConditionRule {
    media: MediaList;
}

declare var CSSMediaRule: {
    prototype: CSSMediaRule;
    new(): CSSMediaRule;
}

interface CSSNamespaceRule extends CSSRule {
    namespaceURI: string;
    prefix: string;
}

declare var CSSNamespaceRule: {
    prototype: CSSNamespaceRule;
    new(): CSSNamespaceRule;
}

interface CSSPageRule extends CSSRule {
    pseudoClass: string;
    selector: string;
    selectorText: string;
    style: CSSStyleDeclaration;
}

declare var CSSPageRule: {
    prototype: CSSPageRule;
    new(): CSSPageRule;
}

interface CSSRule {
    cssText: string;
    parentRule: CSSRule;
    parentStyleSheet: CSSStyleSheet;
    type: number;
    CHARSET_RULE: number;
    FONT_FACE_RULE: number;
    IMPORT_RULE: number;
    KEYFRAMES_RULE: number;
    KEYFRAME_RULE: number;
    MEDIA_RULE: number;
    NAMESPACE_RULE: number;
    PAGE_RULE: number;
    STYLE_RULE: number;
    SUPPORTS_RULE: number;
    UNKNOWN_RULE: number;
    VIEWPORT_RULE: number;
}

declare var CSSRule: {
    prototype: CSSRule;
    new(): CSSRule;
    CHARSET_RULE: number;
    FONT_FACE_RULE: number;
    IMPORT_RULE: number;
    KEYFRAMES_RULE: number;
    KEYFRAME_RULE: number;
    MEDIA_RULE: number;
    NAMESPACE_RULE: number;
    PAGE_RULE: number;
    STYLE_RULE: number;
    SUPPORTS_RULE: number;
    UNKNOWN_RULE: number;
    VIEWPORT_RULE: number;
}

interface CSSRuleList {
    length: number;
    item(index: number): CSSRule;
    [index: number]: CSSRule;
}

declare var CSSRuleList: {
    prototype: CSSRuleList;
    new(): CSSRuleList;
}

interface CSSStyleDeclaration {
    alignContent: string;
    alignItems: string;
    alignSelf: string;
    alignmentBaseline: string;
    animation: string;
    animationDelay: string;
    animationDirection: string;
    animationDuration: string;
    animationFillMode: string;
    animationIterationCount: string;
    animationName: string;
    animationPlayState: string;
    animationTimingFunction: string;
    backfaceVisibility: string;
    background: string;
    backgroundAttachment: string;
    backgroundClip: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundOrigin: string;
    backgroundPosition: string;
    backgroundPositionX: string;
    backgroundPositionY: string;
    backgroundRepeat: string;
    backgroundSize: string;
    baselineShift: string;
    border: string;
    borderBottom: string;
    borderBottomColor: string;
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
    borderBottomStyle: string;
    borderBottomWidth: string;
    borderCollapse: string;
    borderColor: string;
    borderImage: string;
    borderImageOutset: string;
    borderImageRepeat: string;
    borderImageSlice: string;
    borderImageSource: string;
    borderImageWidth: string;
    borderLeft: string;
    borderLeftColor: string;
    borderLeftStyle: string;
    borderLeftWidth: string;
    borderRadius: string;
    borderRight: string;
    borderRightColor: string;
    borderRightStyle: string;
    borderRightWidth: string;
    borderSpacing: string;
    borderStyle: string;
    borderTop: string;
    borderTopColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderTopStyle: string;
    borderTopWidth: string;
    borderWidth: string;
    bottom: string;
    boxShadow: string;
    boxSizing: string;
    breakAfter: string;
    breakBefore: string;
    breakInside: string;
    captionSide: string;
    clear: string;
    clip: string;
    clipPath: string;
    clipRule: string;
    color: string;
    colorInterpolationFilters: string;
    columnCount: any;
    columnFill: string;
    columnGap: any;
    columnRule: string;
    columnRuleColor: any;
    columnRuleStyle: string;
    columnRuleWidth: any;
    columnSpan: string;
    columnWidth: any;
    columns: string;
    content: string;
    counterIncrement: string;
    counterReset: string;
    cssFloat: string;
    cssText: string;
    cursor: string;
    direction: string;
    display: string;
    dominantBaseline: string;
    emptyCells: string;
    enableBackground: string;
    fill: string;
    fillOpacity: string;
    fillRule: string;
    filter: string;
    flex: string;
    flexBasis: string;
    flexDirection: string;
    flexFlow: string;
    flexGrow: string;
    flexShrink: string;
    flexWrap: string;
    floodColor: string;
    floodOpacity: string;
    font: string;
    fontFamily: string;
    fontFeatureSettings: string;
    fontSize: string;
    fontSizeAdjust: string;
    fontStretch: string;
    fontStyle: string;
    fontVariant: string;
    fontWeight: string;
    glyphOrientationHorizontal: string;
    glyphOrientationVertical: string;
    height: string;
    imeMode: string;
    justifyContent: string;
    kerning: string;
    left: string;
    length: number;
    letterSpacing: string;
    lightingColor: string;
    lineHeight: string;
    listStyle: string;
    listStyleImage: string;
    listStylePosition: string;
    listStyleType: string;
    margin: string;
    marginBottom: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    marker: string;
    markerEnd: string;
    markerMid: string;
    markerStart: string;
    mask: string;
    maxHeight: string;
    maxWidth: string;
    minHeight: string;
    minWidth: string;
    msContentZoomChaining: string;
    msContentZoomLimit: string;
    msContentZoomLimitMax: any;
    msContentZoomLimitMin: any;
    msContentZoomSnap: string;
    msContentZoomSnapPoints: string;
    msContentZoomSnapType: string;
    msContentZooming: string;
    msFlowFrom: string;
    msFlowInto: string;
    msFontFeatureSettings: string;
    msGridColumn: any;
    msGridColumnAlign: string;
    msGridColumnSpan: any;
    msGridColumns: string;
    msGridRow: any;
    msGridRowAlign: string;
    msGridRowSpan: any;
    msGridRows: string;
    msHighContrastAdjust: string;
    msHyphenateLimitChars: string;
    msHyphenateLimitLines: any;
    msHyphenateLimitZone: any;
    msHyphens: string;
    msImeAlign: string;
    msOverflowStyle: string;
    msScrollChaining: string;
    msScrollLimit: string;
    msScrollLimitXMax: any;
    msScrollLimitXMin: any;
    msScrollLimitYMax: any;
    msScrollLimitYMin: any;
    msScrollRails: string;
    msScrollSnapPointsX: string;
    msScrollSnapPointsY: string;
    msScrollSnapType: string;
    msScrollSnapX: string;
    msScrollSnapY: string;
    msScrollTranslation: string;
    msTextCombineHorizontal: string;
    msTextSizeAdjust: any;
    msTouchAction: string;
    msTouchSelect: string;
    msUserSelect: string;
    msWrapFlow: string;
    msWrapMargin: any;
    msWrapThrough: string;
    opacity: string;
    order: string;
    orphans: string;
    outline: string;
    outlineColor: string;
    outlineStyle: string;
    outlineWidth: string;
    overflow: string;
    overflowX: string;
    overflowY: string;
    padding: string;
    paddingBottom: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    pageBreakAfter: string;
    pageBreakBefore: string;
    pageBreakInside: string;
    parentRule: CSSRule;
    perspective: string;
    perspectiveOrigin: string;
    pointerEvents: string;
    position: string;
    quotes: string;
    right: string;
    rubyAlign: string;
    rubyOverhang: string;
    rubyPosition: string;
    stopColor: string;
    stopOpacity: string;
    stroke: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    strokeMiterlimit: string;
    strokeOpacity: string;
    strokeWidth: string;
    tableLayout: string;
    textAlign: string;
    textAlignLast: string;
    textAnchor: string;
    textDecoration: string;
    textFillColor: string;
    textIndent: string;
    textJustify: string;
    textKashida: string;
    textKashidaSpace: string;
    textOverflow: string;
    textShadow: string;
    textTransform: string;
    textUnderlinePosition: string;
    top: string;
    touchAction: string;
    transform: string;
    transformOrigin: string;
    transformStyle: string;
    transition: string;
    transitionDelay: string;
    transitionDuration: string;
    transitionProperty: string;
    transitionTimingFunction: string;
    unicodeBidi: string;
    verticalAlign: string;
    visibility: string;
    webkitAlignContent: string;
    webkitAlignItems: string;
    webkitAlignSelf: string;
    webkitAnimation: string;
    webkitAnimationDelay: string;
    webkitAnimationDirection: string;
    webkitAnimationDuration: string;
    webkitAnimationFillMode: string;
    webkitAnimationIterationCount: string;
    webkitAnimationName: string;
    webkitAnimationPlayState: string;
    webkitAnimationTimingFunction: string;
    webkitAppearance: string;
    webkitBackfaceVisibility: string;
    webkitBackground: string;
    webkitBackgroundAttachment: string;
    webkitBackgroundClip: string;
    webkitBackgroundColor: string;
    webkitBackgroundImage: string;
    webkitBackgroundOrigin: string;
    webkitBackgroundPosition: string;
    webkitBackgroundPositionX: string;
    webkitBackgroundPositionY: string;
    webkitBackgroundRepeat: string;
    webkitBackgroundSize: string;
    webkitBorderBottomLeftRadius: string;
    webkitBorderBottomRightRadius: string;
    webkitBorderImage: string;
    webkitBorderImageOutset: string;
    webkitBorderImageRepeat: string;
    webkitBorderImageSlice: string;
    webkitBorderImageSource: string;
    webkitBorderImageWidth: string;
    webkitBorderRadius: string;
    webkitBorderTopLeftRadius: string;
    webkitBorderTopRightRadius: string;
    webkitBoxAlign: string;
    webkitBoxDirection: string;
    webkitBoxFlex: string;
    webkitBoxOrdinalGroup: string;
    webkitBoxOrient: string;
    webkitBoxPack: string;
    webkitBoxSizing: string;
    webkitColumnBreakAfter: string;
    webkitColumnBreakBefore: string;
    webkitColumnBreakInside: string;
    webkitColumnCount: any;
    webkitColumnGap: any;
    webkitColumnRule: string;
    webkitColumnRuleColor: any;
    webkitColumnRuleStyle: string;
    webkitColumnRuleWidth: any;
    webkitColumnSpan: string;
    webkitColumnWidth: any;
    webkitColumns: string;
    webkitFilter: string;
    webkitFlex: string;
    webkitFlexBasis: string;
    webkitFlexDirection: string;
    webkitFlexFlow: string;
    webkitFlexGrow: string;
    webkitFlexShrink: string;
    webkitFlexWrap: string;
    webkitJustifyContent: string;
    webkitOrder: string;
    webkitPerspective: string;
    webkitPerspectiveOrigin: string;
    webkitTapHighlightColor: string;
    webkitTextFillColor: string;
    webkitTextSizeAdjust: any;
    webkitTransform: string;
    webkitTransformOrigin: string;
    webkitTransformStyle: string;
    webkitTransition: string;
    webkitTransitionDelay: string;
    webkitTransitionDuration: string;
    webkitTransitionProperty: string;
    webkitTransitionTimingFunction: string;
    webkitUserSelect: string;
    webkitWritingMode: string;
    whiteSpace: string;
    widows: string;
    width: string;
    wordBreak: string;
    wordSpacing: string;
    wordWrap: string;
    writingMode: string;
    zIndex: string;
    zoom: string;
    getPropertyPriority(propertyName: string): string;
    getPropertyValue(propertyName: string): string;
    item(index: number): string;
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string, priority?: string): void;
    [index: number]: string;
}

declare var CSSStyleDeclaration: {
    prototype: CSSStyleDeclaration;
    new(): CSSStyleDeclaration;
}

interface CSSStyleRule extends CSSRule {
    readOnly: boolean;
    selectorText: string;
    style: CSSStyleDeclaration;
}

declare var CSSStyleRule: {
    prototype: CSSStyleRule;
    new(): CSSStyleRule;
}

interface CSSStyleSheet extends StyleSheet {
    cssRules: CSSRuleList;
    cssText: string;
    href: string;
    id: string;
    imports: StyleSheetList;
    isAlternate: boolean;
    isPrefAlternate: boolean;
    ownerRule: CSSRule;
    owningElement: Element;
    pages: StyleSheetPageList;
    readOnly: boolean;
    rules: CSSRuleList;
    addImport(bstrURL: string, lIndex?: number): number;
    addPageRule(bstrSelector: string, bstrStyle: string, lIndex?: number): number;
    addRule(bstrSelector: string, bstrStyle?: string, lIndex?: number): number;
    deleteRule(index?: number): void;
    insertRule(rule: string, index?: number): number;
    removeImport(lIndex: number): void;
    removeRule(lIndex: number): void;
}

declare var CSSStyleSheet: {
    prototype: CSSStyleSheet;
    new(): CSSStyleSheet;
}

interface CSSSupportsRule extends CSSConditionRule {
}

declare var CSSSupportsRule: {
    prototype: CSSSupportsRule;
    new(): CSSSupportsRule;
}

interface CanvasGradient {
    addColorStop(offset: number, color: string): void;
}

declare var CanvasGradient: {
    prototype: CanvasGradient;
    new(): CanvasGradient;
}

interface CanvasPattern {
}

declare var CanvasPattern: {
    prototype: CanvasPattern;
    new(): CanvasPattern;
}

interface CanvasRenderingContext2D {
    canvas: HTMLCanvasElement;
    fillStyle: string | CanvasGradient | CanvasPattern;
    font: string;
    globalAlpha: number;
    globalCompositeOperation: string;
    lineCap: string;
    lineDashOffset: number;
    lineJoin: string;
    lineWidth: number;
    miterLimit: number;
    msFillRule: string;
    msImageSmoothingEnabled: boolean;
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    textAlign: string;
    textBaseline: string;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    beginPath(): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    clearRect(x: number, y: number, w: number, h: number): void;
    clip(fillRule?: string): void;
    closePath(): void;
    createImageData(imageDataOrSw: number | ImageData, sh?: number): ImageData;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    createPattern(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition: string): CanvasPattern;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, offsetX: number, offsetY: number, width?: number, height?: number, canvasOffsetX?: number, canvasOffsetY?: number, canvasImageWidth?: number, canvasImageHeight?: number): void;
    fill(fillRule?: string): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    getLineDash(): number[];
    isPointInPath(x: number, y: number, fillRule?: string): boolean;
    lineTo(x: number, y: number): void;
    measureText(text: string): TextMetrics;
    moveTo(x: number, y: number): void;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
    restore(): void;
    rotate(angle: number): void;
    save(): void;
    scale(x: number, y: number): void;
    setLineDash(segments: number[]): void;
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    stroke(): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    translate(x: number, y: number): void;
}

declare var CanvasRenderingContext2D: {
    prototype: CanvasRenderingContext2D;
    new(): CanvasRenderingContext2D;
}

interface ChannelMergerNode extends AudioNode {
}

declare var ChannelMergerNode: {
    prototype: ChannelMergerNode;
    new(): ChannelMergerNode;
}

interface ChannelSplitterNode extends AudioNode {
}

declare var ChannelSplitterNode: {
    prototype: ChannelSplitterNode;
    new(): ChannelSplitterNode;
}

interface CharacterData extends Node, ChildNode {
    data: string;
    length: number;
    appendData(arg: string): void;
    deleteData(offset: number, count: number): void;
    insertData(offset: number, arg: string): void;
    replaceData(offset: number, count: number, arg: string): void;
    substringData(offset: number, count: number): string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var CharacterData: {
    prototype: CharacterData;
    new(): CharacterData;
}

interface ClientRect {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}

declare var ClientRect: {
    prototype: ClientRect;
    new(): ClientRect;
}

interface ClientRectList {
    length: number;
    item(index: number): ClientRect;
    [index: number]: ClientRect;
}

declare var ClientRectList: {
    prototype: ClientRectList;
    new(): ClientRectList;
}

interface ClipboardEvent extends Event {
    clipboardData: DataTransfer;
}

declare var ClipboardEvent: {
    prototype: ClipboardEvent;
    new(type: string, eventInitDict?: ClipboardEventInit): ClipboardEvent;
}

interface CloseEvent extends Event {
    code: number;
    reason: string;
    wasClean: boolean;
    initCloseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, wasCleanArg: boolean, codeArg: number, reasonArg: string): void;
}

declare var CloseEvent: {
    prototype: CloseEvent;
    new(): CloseEvent;
}

interface CommandEvent extends Event {
    commandName: string;
    detail: string;
}

declare var CommandEvent: {
    prototype: CommandEvent;
    new(type: string, eventInitDict?: CommandEventInit): CommandEvent;
}

interface Comment extends CharacterData {
    text: string;
}

declare var Comment: {
    prototype: Comment;
    new(): Comment;
}

interface CompositionEvent extends UIEvent {
    data: string;
    locale: string;
    initCompositionEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, dataArg: string, locale: string): void;
}

declare var CompositionEvent: {
    prototype: CompositionEvent;
    new(typeArg: string, eventInitDict?: CompositionEventInit): CompositionEvent;
}

interface Console {
    assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    clear(): void;
    count(countTitle?: string): void;
    debug(message?: string, ...optionalParams: any[]): void;
    dir(value?: any, ...optionalParams: any[]): void;
    dirxml(value: any): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(groupTitle?: string): void;
    groupCollapsed(groupTitle?: string): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    msIsIndependentlyComposed(element: Element): boolean;
    profile(reportName?: string): void;
    profileEnd(): void;
    select(element: Element): void;
    time(timerName?: string): void;
    timeEnd(timerName?: string): void;
    trace(): void;
    warn(message?: any, ...optionalParams: any[]): void;
}

declare var Console: {
    prototype: Console;
    new(): Console;
}

interface ConvolverNode extends AudioNode {
    buffer: AudioBuffer;
    normalize: boolean;
}

declare var ConvolverNode: {
    prototype: ConvolverNode;
    new(): ConvolverNode;
}

interface Coordinates {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
}

declare var Coordinates: {
    prototype: Coordinates;
    new(): Coordinates;
}

interface Crypto extends Object, RandomSource {
    subtle: SubtleCrypto;
}

declare var Crypto: {
    prototype: Crypto;
    new(): Crypto;
}

interface CryptoKey {
    algorithm: KeyAlgorithm;
    extractable: boolean;
    type: string;
    usages: string[];
}

declare var CryptoKey: {
    prototype: CryptoKey;
    new(): CryptoKey;
}

interface CryptoKeyPair {
    privateKey: CryptoKey;
    publicKey: CryptoKey;
}

declare var CryptoKeyPair: {
    prototype: CryptoKeyPair;
    new(): CryptoKeyPair;
}

interface CustomEvent extends Event {
    detail: any;
    initCustomEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, detailArg: any): void;
}

declare var CustomEvent: {
    prototype: CustomEvent;
    new(typeArg: string, eventInitDict?: CustomEventInit): CustomEvent;
}

interface DOMError {
    name: string;
    toString(): string;
}

declare var DOMError: {
    prototype: DOMError;
    new(): DOMError;
}

interface DOMException {
    code: number;
    message: string;
    name: string;
    toString(): string;
    ABORT_ERR: number;
    DATA_CLONE_ERR: number;
    DOMSTRING_SIZE_ERR: number;
    HIERARCHY_REQUEST_ERR: number;
    INDEX_SIZE_ERR: number;
    INUSE_ATTRIBUTE_ERR: number;
    INVALID_ACCESS_ERR: number;
    INVALID_CHARACTER_ERR: number;
    INVALID_MODIFICATION_ERR: number;
    INVALID_NODE_TYPE_ERR: number;
    INVALID_STATE_ERR: number;
    NAMESPACE_ERR: number;
    NETWORK_ERR: number;
    NOT_FOUND_ERR: number;
    NOT_SUPPORTED_ERR: number;
    NO_DATA_ALLOWED_ERR: number;
    NO_MODIFICATION_ALLOWED_ERR: number;
    PARSE_ERR: number;
    QUOTA_EXCEEDED_ERR: number;
    SECURITY_ERR: number;
    SERIALIZE_ERR: number;
    SYNTAX_ERR: number;
    TIMEOUT_ERR: number;
    TYPE_MISMATCH_ERR: number;
    URL_MISMATCH_ERR: number;
    VALIDATION_ERR: number;
    WRONG_DOCUMENT_ERR: number;
}

declare var DOMException: {
    prototype: DOMException;
    new(): DOMException;
    ABORT_ERR: number;
    DATA_CLONE_ERR: number;
    DOMSTRING_SIZE_ERR: number;
    HIERARCHY_REQUEST_ERR: number;
    INDEX_SIZE_ERR: number;
    INUSE_ATTRIBUTE_ERR: number;
    INVALID_ACCESS_ERR: number;
    INVALID_CHARACTER_ERR: number;
    INVALID_MODIFICATION_ERR: number;
    INVALID_NODE_TYPE_ERR: number;
    INVALID_STATE_ERR: number;
    NAMESPACE_ERR: number;
    NETWORK_ERR: number;
    NOT_FOUND_ERR: number;
    NOT_SUPPORTED_ERR: number;
    NO_DATA_ALLOWED_ERR: number;
    NO_MODIFICATION_ALLOWED_ERR: number;
    PARSE_ERR: number;
    QUOTA_EXCEEDED_ERR: number;
    SECURITY_ERR: number;
    SERIALIZE_ERR: number;
    SYNTAX_ERR: number;
    TIMEOUT_ERR: number;
    TYPE_MISMATCH_ERR: number;
    URL_MISMATCH_ERR: number;
    VALIDATION_ERR: number;
    WRONG_DOCUMENT_ERR: number;
}

interface DOMImplementation {
    createDocument(namespaceURI: string, qualifiedName: string, doctype: DocumentType): Document;
    createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocumentType;
    createHTMLDocument(title: string): Document;
    hasFeature(feature: string, version: string): boolean;
}

declare var DOMImplementation: {
    prototype: DOMImplementation;
    new(): DOMImplementation;
}

interface DOMParser {
    parseFromString(source: string, mimeType: string): Document;
}

declare var DOMParser: {
    prototype: DOMParser;
    new(): DOMParser;
}

interface DOMSettableTokenList extends DOMTokenList {
    value: string;
}

declare var DOMSettableTokenList: {
    prototype: DOMSettableTokenList;
    new(): DOMSettableTokenList;
}

interface DOMStringList {
    length: number;
    contains(str: string): boolean;
    item(index: number): string;
    [index: number]: string;
}

declare var DOMStringList: {
    prototype: DOMStringList;
    new(): DOMStringList;
}

interface DOMStringMap {
    [name: string]: string;
}

declare var DOMStringMap: {
    prototype: DOMStringMap;
    new(): DOMStringMap;
}

interface DOMTokenList {
    length: number;
    add(...token: string[]): void;
    contains(token: string): boolean;
    item(index: number): string;
    remove(...token: string[]): void;
    toString(): string;
    toggle(token: string, force?: boolean): boolean;
    [index: number]: string;
}

declare var DOMTokenList: {
    prototype: DOMTokenList;
    new(): DOMTokenList;
}

interface DataCue extends TextTrackCue {
    data: ArrayBuffer;
}

declare var DataCue: {
    prototype: DataCue;
    new(): DataCue;
}

interface DataTransfer {
    dropEffect: string;
    effectAllowed: string;
    files: FileList;
    items: DataTransferItemList;
    types: DOMStringList;
    clearData(format?: string): boolean;
    getData(format: string): string;
    setData(format: string, data: string): boolean;
}

declare var DataTransfer: {
    prototype: DataTransfer;
    new(): DataTransfer;
}

interface DataTransferItem {
    kind: string;
    type: string;
    getAsFile(): File;
    getAsString(_callback: FunctionStringCallback): void;
}

declare var DataTransferItem: {
    prototype: DataTransferItem;
    new(): DataTransferItem;
}

interface DataTransferItemList {
    length: number;
    add(data: File): DataTransferItem;
    clear(): void;
    item(index: number): File;
    remove(index: number): void;
    [index: number]: File;
}

declare var DataTransferItemList: {
    prototype: DataTransferItemList;
    new(): DataTransferItemList;
}

interface DeferredPermissionRequest {
    id: number;
    type: string;
    uri: string;
    allow(): void;
    deny(): void;
}

declare var DeferredPermissionRequest: {
    prototype: DeferredPermissionRequest;
    new(): DeferredPermissionRequest;
}

interface DelayNode extends AudioNode {
    delayTime: AudioParam;
}

declare var DelayNode: {
    prototype: DelayNode;
    new(): DelayNode;
}

interface DeviceAcceleration {
    x: number;
    y: number;
    z: number;
}

declare var DeviceAcceleration: {
    prototype: DeviceAcceleration;
    new(): DeviceAcceleration;
}

interface DeviceMotionEvent extends Event {
    acceleration: DeviceAcceleration;
    accelerationIncludingGravity: DeviceAcceleration;
    interval: number;
    rotationRate: DeviceRotationRate;
    initDeviceMotionEvent(type: string, bubbles: boolean, cancelable: boolean, acceleration: DeviceAccelerationDict, accelerationIncludingGravity: DeviceAccelerationDict, rotationRate: DeviceRotationRateDict, interval: number): void;
}

declare var DeviceMotionEvent: {
    prototype: DeviceMotionEvent;
    new(): DeviceMotionEvent;
}

interface DeviceOrientationEvent extends Event {
    absolute: boolean;
    alpha: number;
    beta: number;
    gamma: number;
    initDeviceOrientationEvent(type: string, bubbles: boolean, cancelable: boolean, alpha: number, beta: number, gamma: number, absolute: boolean): void;
}

declare var DeviceOrientationEvent: {
    prototype: DeviceOrientationEvent;
    new(): DeviceOrientationEvent;
}

interface DeviceRotationRate {
    alpha: number;
    beta: number;
    gamma: number;
}

declare var DeviceRotationRate: {
    prototype: DeviceRotationRate;
    new(): DeviceRotationRate;
}

interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
    /**
      * Sets or gets the URL for the current document.
      */
    URL: string;
    /**
      * Gets the URL for the document, stripped of any character encoding.
      */
    URLUnencoded: string;
    /**
      * Gets the object that has the focus when the parent document has focus.
      */
    activeElement: Element;
    /**
      * Sets or gets the color of all active links in the document.
      */
    alinkColor: string;
    /**
      * Returns a reference to the collection of elements contained by the object.
      */
    all: HTMLCollection;
    /**
      * Retrieves a collection of all a objects that have a name and/or id property. Objects in this collection are in HTML source order.
      */
    anchors: HTMLCollection;
    /**
      * Retrieves a collection of all applet objects in the document.
      */
    applets: HTMLCollection;
    /**
      * Deprecated. Sets or retrieves a value that indicates the background color behind the object.
      */
    bgColor: string;
    /**
      * Specifies the beginning and end of the document body.
      */
    body: HTMLElement;
    characterSet: string;
    /**
      * Gets or sets the character set used to encode the object.
      */
    charset: string;
    /**
      * Gets a value that indicates whether standards-compliant mode is switched on for the object.
      */
    compatMode: string;
    cookie: string;
    /**
      * Gets the default character set from the current regional language settings.
      */
    defaultCharset: string;
    defaultView: Window;
    /**
      * Sets or gets a value that indicates whether the document can be edited.
      */
    designMode: string;
    /**
      * Sets or retrieves a value that indicates the reading order of the object.
      */
    dir: string;
    /**
      * Gets an object representing the document type declaration associated with the current document.
      */
    doctype: DocumentType;
    /**
      * Gets a reference to the root node of the document.
      */
    documentElement: HTMLElement;
    /**
      * Sets or gets the security domain of the document.
      */
    domain: string;
    /**
      * Retrieves a collection of all embed objects in the document.
      */
    embeds: HTMLCollection;
    /**
      * Sets or gets the foreground (text) color of the document.
      */
    fgColor: string;
    /**
      * Retrieves a collection, in source order, of all form objects in the document.
      */
    forms: HTMLCollection;
    fullscreenElement: Element;
    fullscreenEnabled: boolean;
    head: HTMLHeadElement;
    hidden: boolean;
    /**
      * Retrieves a collection, in source order, of img objects in the document.
      */
    images: HTMLCollection;
    /**
      * Gets the implementation object of the current document.
      */
    implementation: DOMImplementation;
    /**
      * Returns the character encoding used to create the webpage that is loaded into the document object.
      */
    inputEncoding: string;
    /**
      * Gets the date that the page was last modified, if the page supplies one.
      */
    lastModified: string;
    /**
      * Sets or gets the color of the document links.
      */
    linkColor: string;
    /**
      * Retrieves a collection of all a objects that specify the href property and all area objects in the document.
      */
    links: HTMLCollection;
    /**
      * Contains information about the current URL.
      */
    location: Location;
    media: string;
    msCSSOMElementFloatMetrics: boolean;
    msCapsLockWarningOff: boolean;
    msHidden: boolean;
    msVisibilityState: string;
    /**
      * Fires when the user aborts the download.
      * @param ev The event.
      */
    onabort: (ev: Event) => any;
    /**
      * Fires when the object is set as the active element.
      * @param ev The event.
      */
    onactivate: (ev: UIEvent) => any;
    /**
      * Fires immediately before the object is set as the active element.
      * @param ev The event.
      */
    onbeforeactivate: (ev: UIEvent) => any;
    /**
      * Fires immediately before the activeElement is changed from the current object to another object in the parent document.
      * @param ev The event.
      */
    onbeforedeactivate: (ev: UIEvent) => any;
    /**
      * Fires when the object loses the input focus.
      * @param ev The focus event.
      */
    onblur: (ev: FocusEvent) => any;
    /**
      * Occurs when playback is possible, but would require further buffering.
      * @param ev The event.
      */
    oncanplay: (ev: Event) => any;
    oncanplaythrough: (ev: Event) => any;
    /**
      * Fires when the contents of the object or selection have changed.
      * @param ev The event.
      */
    onchange: (ev: Event) => any;
    /**
      * Fires when the user clicks the left mouse button on the object
      * @param ev The mouse event.
      */
    onclick: (ev: MouseEvent) => any;
    /**
      * Fires when the user clicks the right mouse button in the client area, opening the context menu.
      * @param ev The mouse event.
      */
    oncontextmenu: (ev: PointerEvent) => any;
    /**
      * Fires when the user double-clicks the object.
      * @param ev The mouse event.
      */
    ondblclick: (ev: MouseEvent) => any;
    /**
      * Fires when the activeElement is changed from the current object to another object in the parent document.
      * @param ev The UI Event
      */
    ondeactivate: (ev: UIEvent) => any;
    /**
      * Fires on the source object continuously during a drag operation.
      * @param ev The event.
      */
    ondrag: (ev: DragEvent) => any;
    /**
      * Fires on the source object when the user releases the mouse at the close of a drag operation.
      * @param ev The event.
      */
    ondragend: (ev: DragEvent) => any;
    /**
      * Fires on the target element when the user drags the object to a valid drop target.
      * @param ev The drag event.
      */
    ondragenter: (ev: DragEvent) => any;
    /**
      * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
      * @param ev The drag event.
      */
    ondragleave: (ev: DragEvent) => any;
    /**
      * Fires on the target element continuously while the user drags the object over a valid drop target.
      * @param ev The event.
      */
    ondragover: (ev: DragEvent) => any;
    /**
      * Fires on the source object when the user starts to drag a text selection or selected object.
      * @param ev The event.
      */
    ondragstart: (ev: DragEvent) => any;
    ondrop: (ev: DragEvent) => any;
    /**
      * Occurs when the duration attribute is updated.
      * @param ev The event.
      */
    ondurationchange: (ev: Event) => any;
    /**
      * Occurs when the media element is reset to its initial state.
      * @param ev The event.
      */
    onemptied: (ev: Event) => any;
    /**
      * Occurs when the end of playback is reached.
      * @param ev The event
      */
    onended: (ev: Event) => any;
    /**
      * Fires when an error occurs during object loading.
      * @param ev The event.
      */
    onerror: (ev: Event) => any;
    /**
      * Fires when the object receives focus.
      * @param ev The event.
      */
    onfocus: (ev: FocusEvent) => any;
    onfullscreenchange: (ev: Event) => any;
    onfullscreenerror: (ev: Event) => any;
    oninput: (ev: Event) => any;
    /**
      * Fires when the user presses a key.
      * @param ev The keyboard event
      */
    onkeydown: (ev: KeyboardEvent) => any;
    /**
      * Fires when the user presses an alphanumeric key.
      * @param ev The event.
      */
    onkeypress: (ev: KeyboardEvent) => any;
    /**
      * Fires when the user releases a key.
      * @param ev The keyboard event
      */
    onkeyup: (ev: KeyboardEvent) => any;
    /**
      * Fires immediately after the browser loads the object.
      * @param ev The event.
      */
    onload: (ev: Event) => any;
    /**
      * Occurs when media data is loaded at the current playback position.
      * @param ev The event.
      */
    onloadeddata: (ev: Event) => any;
    /**
      * Occurs when the duration and dimensions of the media have been determined.
      * @param ev The event.
      */
    onloadedmetadata: (ev: Event) => any;
    /**
      * Occurs when Internet Explorer begins looking for media data.
      * @param ev The event.
      */
    onloadstart: (ev: Event) => any;
    /**
      * Fires when the user clicks the object with either mouse button.
      * @param ev The mouse event.
      */
    onmousedown: (ev: MouseEvent) => any;
    /**
      * Fires when the user moves the mouse over the object.
      * @param ev The mouse event.
      */
    onmousemove: (ev: MouseEvent) => any;
    /**
      * Fires when the user moves the mouse pointer outside the boundaries of the object.
      * @param ev The mouse event.
      */
    onmouseout: (ev: MouseEvent) => any;
    /**
      * Fires when the user moves the mouse pointer into the object.
      * @param ev The mouse event.
      */
    onmouseover: (ev: MouseEvent) => any;
    /**
      * Fires when the user releases a mouse button while the mouse is over the object.
      * @param ev The mouse event.
      */
    onmouseup: (ev: MouseEvent) => any;
    /**
      * Fires when the wheel button is rotated.
      * @param ev The mouse event
      */
    onmousewheel: (ev: MouseWheelEvent) => any;
    onmscontentzoom: (ev: UIEvent) => any;
    onmsgesturechange: (ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (ev: MSGestureEvent) => any;
    onmsgestureend: (ev: MSGestureEvent) => any;
    onmsgesturehold: (ev: MSGestureEvent) => any;
    onmsgesturestart: (ev: MSGestureEvent) => any;
    onmsgesturetap: (ev: MSGestureEvent) => any;
    onmsinertiastart: (ev: MSGestureEvent) => any;
    onmsmanipulationstatechanged: (ev: MSManipulationEvent) => any;
    onmspointercancel: (ev: MSPointerEvent) => any;
    onmspointerdown: (ev: MSPointerEvent) => any;
    onmspointerenter: (ev: MSPointerEvent) => any;
    onmspointerleave: (ev: MSPointerEvent) => any;
    onmspointermove: (ev: MSPointerEvent) => any;
    onmspointerout: (ev: MSPointerEvent) => any;
    onmspointerover: (ev: MSPointerEvent) => any;
    onmspointerup: (ev: MSPointerEvent) => any;
    /**
      * Occurs when an item is removed from a Jump List of a webpage running in Site Mode.
      * @param ev The event.
      */
    onmssitemodejumplistitemremoved: (ev: MSSiteModeEvent) => any;
    /**
      * Occurs when a user clicks a button in a Thumbnail Toolbar of a webpage running in Site Mode.
      * @param ev The event.
      */
    onmsthumbnailclick: (ev: MSSiteModeEvent) => any;
    /**
      * Occurs when playback is paused.
      * @param ev The event.
      */
    onpause: (ev: Event) => any;
    /**
      * Occurs when the play method is requested.
      * @param ev The event.
      */
    onplay: (ev: Event) => any;
    /**
      * Occurs when the audio or video has started playing.
      * @param ev The event.
      */
    onplaying: (ev: Event) => any;
    onpointerlockchange: (ev: Event) => any;
    onpointerlockerror: (ev: Event) => any;
    /**
      * Occurs to indicate progress while downloading media data.
      * @param ev The event.
      */
    onprogress: (ev: ProgressEvent) => any;
    /**
      * Occurs when the playback rate is increased or decreased.
      * @param ev The event.
      */
    onratechange: (ev: Event) => any;
    /**
      * Fires when the state of the object has changed.
      * @param ev The event
      */
    onreadystatechange: (ev: ProgressEvent) => any;
    /**
      * Fires when the user resets a form.
      * @param ev The event.
      */
    onreset: (ev: Event) => any;
    /**
      * Fires when the user repositions the scroll box in the scroll bar on the object.
      * @param ev The event.
      */
    onscroll: (ev: UIEvent) => any;
    /**
      * Occurs when the seek operation ends.
      * @param ev The event.
      */
    onseeked: (ev: Event) => any;
    /**
      * Occurs when the current playback position is moved.
      * @param ev The event.
      */
    onseeking: (ev: Event) => any;
    /**
      * Fires when the current selection changes.
      * @param ev The event.
      */
    onselect: (ev: UIEvent) => any;
    onselectstart: (ev: Event) => any;
    /**
      * Occurs when the download has stopped.
      * @param ev The event.
      */
    onstalled: (ev: Event) => any;
    /**
      * Fires when the user clicks the Stop button or leaves the Web page.
      * @param ev The event.
      */
    onstop: (ev: Event) => any;
    onsubmit: (ev: Event) => any;
    /**
      * Occurs if the load operation has been intentionally halted.
      * @param ev The event.
      */
    onsuspend: (ev: Event) => any;
    /**
      * Occurs to indicate the current playback position.
      * @param ev The event.
      */
    ontimeupdate: (ev: Event) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    /**
      * Occurs when the volume is changed, or playback is muted or unmuted.
      * @param ev The event.
      */
    onvolumechange: (ev: Event) => any;
    /**
      * Occurs when playback stops because the next frame of a video resource is not available.
      * @param ev The event.
      */
    onwaiting: (ev: Event) => any;
    onwebkitfullscreenchange: (ev: Event) => any;
    onwebkitfullscreenerror: (ev: Event) => any;
    plugins: HTMLCollection;
    pointerLockElement: Element;
    /**
      * Retrieves a value that indicates the current state of the object.
      */
    readyState: string;
    /**
      * Gets the URL of the location that referred the user to the current page.
      */
    referrer: string;
    /**
      * Gets the root svg element in the document hierarchy.
      */
    rootElement: SVGSVGElement;
    /**
      * Retrieves a collection of all script objects in the document.
      */
    scripts: HTMLCollection;
    security: string;
    /**
      * Retrieves a collection of styleSheet objects representing the style sheets that correspond to each instance of a link or style object in the document.
      */
    styleSheets: StyleSheetList;
    /**
      * Contains the title of the document.
      */
    title: string;
    visibilityState: string;
    /**
      * Sets or gets the color of the links that the user has visited.
      */
    vlinkColor: string;
    webkitCurrentFullScreenElement: Element;
    webkitFullscreenElement: Element;
    webkitFullscreenEnabled: boolean;
    webkitIsFullScreen: boolean;
    xmlEncoding: string;
    xmlStandalone: boolean;
    /**
      * Gets or sets the version attribute specified in the declaration of an XML document.
      */
    xmlVersion: string;
    adoptNode(source: Node): Node;
    captureEvents(): void;
    clear(): void;
    /**
      * Closes an output stream and forces the sent data to display.
      */
    close(): void;
    /**
      * Creates an attribute object with a specified name.
      * @param name String that sets the attribute object's name.
      */
    createAttribute(name: string): Attr;
    createAttributeNS(namespaceURI: string, qualifiedName: string): Attr;
    createCDATASection(data: string): CDATASection;
    /**
      * Creates a comment object with the specified data.
      * @param data Sets the comment object's data.
      */
    createComment(data: string): Comment;
    /**
      * Creates a new document.
      */
    createDocumentFragment(): DocumentFragment;
    /**
      * Creates an instance of the element for the specified tag.
      * @param tagName The name of an element.
      */
    createElement(tagName: "a"): HTMLAnchorElement;
    createElement(tagName: "abbr"): HTMLPhraseElement;
    createElement(tagName: "acronym"): HTMLPhraseElement;
    createElement(tagName: "address"): HTMLBlockElement;
    createElement(tagName: "applet"): HTMLAppletElement;
    createElement(tagName: "area"): HTMLAreaElement;
    createElement(tagName: "audio"): HTMLAudioElement;
    createElement(tagName: "b"): HTMLPhraseElement;
    createElement(tagName: "base"): HTMLBaseElement;
    createElement(tagName: "basefont"): HTMLBaseFontElement;
    createElement(tagName: "bdo"): HTMLPhraseElement;
    createElement(tagName: "big"): HTMLPhraseElement;
    createElement(tagName: "blockquote"): HTMLBlockElement;
    createElement(tagName: "body"): HTMLBodyElement;
    createElement(tagName: "br"): HTMLBRElement;
    createElement(tagName: "button"): HTMLButtonElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "caption"): HTMLTableCaptionElement;
    createElement(tagName: "center"): HTMLBlockElement;
    createElement(tagName: "cite"): HTMLPhraseElement;
    createElement(tagName: "code"): HTMLPhraseElement;
    createElement(tagName: "col"): HTMLTableColElement;
    createElement(tagName: "colgroup"): HTMLTableColElement;
    createElement(tagName: "datalist"): HTMLDataListElement;
    createElement(tagName: "dd"): HTMLDDElement;
    createElement(tagName: "del"): HTMLModElement;
    createElement(tagName: "dfn"): HTMLPhraseElement;
    createElement(tagName: "dir"): HTMLDirectoryElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "dl"): HTMLDListElement;
    createElement(tagName: "dt"): HTMLDTElement;
    createElement(tagName: "em"): HTMLPhraseElement;
    createElement(tagName: "embed"): HTMLEmbedElement;
    createElement(tagName: "fieldset"): HTMLFieldSetElement;
    createElement(tagName: "font"): HTMLFontElement;
    createElement(tagName: "form"): HTMLFormElement;
    createElement(tagName: "frame"): HTMLFrameElement;
    createElement(tagName: "frameset"): HTMLFrameSetElement;
    createElement(tagName: "h1"): HTMLHeadingElement;
    createElement(tagName: "h2"): HTMLHeadingElement;
    createElement(tagName: "h3"): HTMLHeadingElement;
    createElement(tagName: "h4"): HTMLHeadingElement;
    createElement(tagName: "h5"): HTMLHeadingElement;
    createElement(tagName: "h6"): HTMLHeadingElement;
    createElement(tagName: "head"): HTMLHeadElement;
    createElement(tagName: "hr"): HTMLHRElement;
    createElement(tagName: "html"): HTMLHtmlElement;
    createElement(tagName: "i"): HTMLPhraseElement;
    createElement(tagName: "iframe"): HTMLIFrameElement;
    createElement(tagName: "img"): HTMLImageElement;
    createElement(tagName: "input"): HTMLInputElement;
    createElement(tagName: "ins"): HTMLModElement;
    createElement(tagName: "isindex"): HTMLIsIndexElement;
    createElement(tagName: "kbd"): HTMLPhraseElement;
    createElement(tagName: "keygen"): HTMLBlockElement;
    createElement(tagName: "label"): HTMLLabelElement;
    createElement(tagName: "legend"): HTMLLegendElement;
    createElement(tagName: "li"): HTMLLIElement;
    createElement(tagName: "link"): HTMLLinkElement;
    createElement(tagName: "listing"): HTMLBlockElement;
    createElement(tagName: "map"): HTMLMapElement;
    createElement(tagName: "marquee"): HTMLMarqueeElement;
    createElement(tagName: "menu"): HTMLMenuElement;
    createElement(tagName: "meta"): HTMLMetaElement;
    createElement(tagName: "nextid"): HTMLNextIdElement;
    createElement(tagName: "nobr"): HTMLPhraseElement;
    createElement(tagName: "object"): HTMLObjectElement;
    createElement(tagName: "ol"): HTMLOListElement;
    createElement(tagName: "optgroup"): HTMLOptGroupElement;
    createElement(tagName: "option"): HTMLOptionElement;
    createElement(tagName: "p"): HTMLParagraphElement;
    createElement(tagName: "param"): HTMLParamElement;
    createElement(tagName: "plaintext"): HTMLBlockElement;
    createElement(tagName: "pre"): HTMLPreElement;
    createElement(tagName: "progress"): HTMLProgressElement;
    createElement(tagName: "q"): HTMLQuoteElement;
    createElement(tagName: "rt"): HTMLPhraseElement;
    createElement(tagName: "ruby"): HTMLPhraseElement;
    createElement(tagName: "s"): HTMLPhraseElement;
    createElement(tagName: "samp"): HTMLPhraseElement;
    createElement(tagName: "script"): HTMLScriptElement;
    createElement(tagName: "select"): HTMLSelectElement;
    createElement(tagName: "small"): HTMLPhraseElement;
    createElement(tagName: "source"): HTMLSourceElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "strike"): HTMLPhraseElement;
    createElement(tagName: "strong"): HTMLPhraseElement;
    createElement(tagName: "style"): HTMLStyleElement;
    createElement(tagName: "sub"): HTMLPhraseElement;
    createElement(tagName: "sup"): HTMLPhraseElement;
    createElement(tagName: "table"): HTMLTableElement;
    createElement(tagName: "tbody"): HTMLTableSectionElement;
    createElement(tagName: "td"): HTMLTableDataCellElement;
    createElement(tagName: "textarea"): HTMLTextAreaElement;
    createElement(tagName: "tfoot"): HTMLTableSectionElement;
    createElement(tagName: "th"): HTMLTableHeaderCellElement;
    createElement(tagName: "thead"): HTMLTableSectionElement;
    createElement(tagName: "title"): HTMLTitleElement;
    createElement(tagName: "tr"): HTMLTableRowElement;
    createElement(tagName: "track"): HTMLTrackElement;
    createElement(tagName: "tt"): HTMLPhraseElement;
    createElement(tagName: "u"): HTMLPhraseElement;
    createElement(tagName: "ul"): HTMLUListElement;
    createElement(tagName: "var"): HTMLPhraseElement;
    createElement(tagName: "video"): HTMLVideoElement;
    createElement(tagName: "x-ms-webview"): MSHTMLWebViewElement;
    createElement(tagName: "xmp"): HTMLBlockElement;
    createElement(tagName: string): HTMLElement;
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "a"): SVGAElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "circle"): SVGCircleElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "clipPath"): SVGClipPathElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "componentTransferFunction"): SVGComponentTransferFunctionElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "defs"): SVGDefsElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "desc"): SVGDescElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "ellipse"): SVGEllipseElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feBlend"): SVGFEBlendElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feColorMatrix"): SVGFEColorMatrixElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feComponentTransfer"): SVGFEComponentTransferElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feComposite"): SVGFECompositeElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feConvolveMatrix"): SVGFEConvolveMatrixElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feDiffuseLighting"): SVGFEDiffuseLightingElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feDisplacementMap"): SVGFEDisplacementMapElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feDistantLight"): SVGFEDistantLightElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feFlood"): SVGFEFloodElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feFuncA"): SVGFEFuncAElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feFuncB"): SVGFEFuncBElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feFuncG"): SVGFEFuncGElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feFuncR"): SVGFEFuncRElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feGaussianBlur"): SVGFEGaussianBlurElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feImage"): SVGFEImageElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feMerge"): SVGFEMergeElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feMergeNode"): SVGFEMergeNodeElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feMorphology"): SVGFEMorphologyElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feOffset"): SVGFEOffsetElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "fePointLight"): SVGFEPointLightElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feSpecularLighting"): SVGFESpecularLightingElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feSpotLight"): SVGFESpotLightElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feTile"): SVGFETileElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "feTurbulence"): SVGFETurbulenceElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "filter"): SVGFilterElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "foreignObject"): SVGForeignObjectElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "g"): SVGGElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "image"): SVGImageElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "gradient"): SVGGradientElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "line"): SVGLineElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "linearGradient"): SVGLinearGradientElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "marker"): SVGMarkerElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "mask"): SVGMaskElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "path"): SVGPathElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "metadata"): SVGMetadataElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "pattern"): SVGPatternElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "polygon"): SVGPolygonElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "polyline"): SVGPolylineElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "radialGradient"): SVGRadialGradientElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "rect"): SVGRectElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "svg"): SVGSVGElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "script"): SVGScriptElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "stop"): SVGStopElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "style"): SVGStyleElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "switch"): SVGSwitchElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "symbol"): SVGSymbolElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "tspan"): SVGTSpanElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "textContent"): SVGTextContentElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "text"): SVGTextElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "textPath"): SVGTextPathElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "textPositioning"): SVGTextPositioningElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "title"): SVGTitleElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "use"): SVGUseElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: "view"): SVGViewElement
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: string): SVGElement
    createElementNS(namespaceURI: string, qualifiedName: string): Element;
    createExpression(expression: string, resolver: XPathNSResolver): XPathExpression;
    createNSResolver(nodeResolver: Node): XPathNSResolver;
    /**
      * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
      * @param root The root element or node to start traversing on.
      * @param whatToShow The type of nodes or elements to appear in the node list
      * @param filter A custom NodeFilter function to use. For more information, see filter. Use null for no filter.
      * @param entityReferenceExpansion A flag that specifies whether entity reference nodes are expanded.
      */
    createNodeIterator(root: Node, whatToShow?: number, filter?: NodeFilter, entityReferenceExpansion?: boolean): NodeIterator;
    createProcessingInstruction(target: string, data: string): ProcessingInstruction;
    /**
      *  Returns an empty range object that has both of its boundary points positioned at the beginning of the document.
      */
    createRange(): Range;
    /**
      * Creates a text string from the specified value.
      * @param data String that specifies the nodeValue property of the text node.
      */
    createTextNode(data: string): Text;
    createTouch(view: any, target: EventTarget, identifier: number, pageX: number, pageY: number, screenX: number, screenY: number): Touch;
    createTouchList(...touches: Touch[]): TouchList;
    /**
      * Creates a TreeWalker object that you can use to traverse filtered lists of nodes or elements in a document.
      * @param root The root element or node to start traversing on.
      * @param whatToShow The type of nodes or elements to appear in the node list. For more information, see whatToShow.
      * @param filter A custom NodeFilter function to use.
      * @param entityReferenceExpansion A flag that specifies whether entity reference nodes are expanded.
      */
    createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter, entityReferenceExpansion?: boolean): TreeWalker;
    /**
      * Returns the element for the specified x coordinate and the specified y coordinate.
      * @param x The x-offset
      * @param y The y-offset
      */
    elementFromPoint(x: number, y: number): Element;
    evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver, type: number, result: XPathResult): XPathResult;
    /**
      * Executes a command on the current document, current selection, or the given range.
      * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
      * @param showUI Display the user interface, defaults to false.
      * @param value Value to assign.
      */
    execCommand(commandId: string, showUI?: boolean, value?: any): boolean;
    /**
      * Displays help information for the given command identifier.
      * @param commandId Displays help information for the given command identifier.
      */
    execCommandShowHelp(commandId: string): boolean;
    exitFullscreen(): void;
    exitPointerLock(): void;
    /**
      * Causes the element to receive the focus and executes the code specified by the onfocus event.
      */
    focus(): void;
    /**
      * Returns a reference to the first object with the specified value of the ID or NAME attribute.
      * @param elementId String that specifies the ID value. Case-insensitive.
      */
    getElementById(elementId: string): HTMLElement;
    getElementsByClassName(classNames: string): NodeListOf<Element>;
    /**
      * Gets a collection of objects based on the value of the NAME or ID attribute.
      * @param elementName Gets a collection of objects based on the value of the NAME or ID attribute.
      */
    getElementsByName(elementName: string): NodeListOf<Element>;
    /**
      * Retrieves a collection of objects based on the specified element name.
      * @param name Specifies the name of an element.
      */
    getElementsByTagName(tagname: "a"): NodeListOf<HTMLAnchorElement>;
    getElementsByTagName(tagname: "abbr"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "acronym"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "address"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: "applet"): NodeListOf<HTMLAppletElement>;
    getElementsByTagName(tagname: "area"): NodeListOf<HTMLAreaElement>;
    getElementsByTagName(tagname: "article"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "aside"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "audio"): NodeListOf<HTMLAudioElement>;
    getElementsByTagName(tagname: "b"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "base"): NodeListOf<HTMLBaseElement>;
    getElementsByTagName(tagname: "basefont"): NodeListOf<HTMLBaseFontElement>;
    getElementsByTagName(tagname: "bdo"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "big"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "blockquote"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: "body"): NodeListOf<HTMLBodyElement>;
    getElementsByTagName(tagname: "br"): NodeListOf<HTMLBRElement>;
    getElementsByTagName(tagname: "button"): NodeListOf<HTMLButtonElement>;
    getElementsByTagName(tagname: "canvas"): NodeListOf<HTMLCanvasElement>;
    getElementsByTagName(tagname: "caption"): NodeListOf<HTMLTableCaptionElement>;
    getElementsByTagName(tagname: "center"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: "circle"): NodeListOf<SVGCircleElement>;
    getElementsByTagName(tagname: "cite"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "clippath"): NodeListOf<SVGClipPathElement>;
    getElementsByTagName(tagname: "code"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "col"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName(tagname: "colgroup"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName(tagname: "datalist"): NodeListOf<HTMLDataListElement>;
    getElementsByTagName(tagname: "dd"): NodeListOf<HTMLDDElement>;
    getElementsByTagName(tagname: "defs"): NodeListOf<SVGDefsElement>;
    getElementsByTagName(tagname: "del"): NodeListOf<HTMLModElement>;
    getElementsByTagName(tagname: "desc"): NodeListOf<SVGDescElement>;
    getElementsByTagName(tagname: "dfn"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "dir"): NodeListOf<HTMLDirectoryElement>;
    getElementsByTagName(tagname: "div"): NodeListOf<HTMLDivElement>;
    getElementsByTagName(tagname: "dl"): NodeListOf<HTMLDListElement>;
    getElementsByTagName(tagname: "dt"): NodeListOf<HTMLDTElement>;
    getElementsByTagName(tagname: "ellipse"): NodeListOf<SVGEllipseElement>;
    getElementsByTagName(tagname: "em"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "embed"): NodeListOf<HTMLEmbedElement>;
    getElementsByTagName(tagname: "feblend"): NodeListOf<SVGFEBlendElement>;
    getElementsByTagName(tagname: "fecolormatrix"): NodeListOf<SVGFEColorMatrixElement>;
    getElementsByTagName(tagname: "fecomponenttransfer"): NodeListOf<SVGFEComponentTransferElement>;
    getElementsByTagName(tagname: "fecomposite"): NodeListOf<SVGFECompositeElement>;
    getElementsByTagName(tagname: "feconvolvematrix"): NodeListOf<SVGFEConvolveMatrixElement>;
    getElementsByTagName(tagname: "fediffuselighting"): NodeListOf<SVGFEDiffuseLightingElement>;
    getElementsByTagName(tagname: "fedisplacementmap"): NodeListOf<SVGFEDisplacementMapElement>;
    getElementsByTagName(tagname: "fedistantlight"): NodeListOf<SVGFEDistantLightElement>;
    getElementsByTagName(tagname: "feflood"): NodeListOf<SVGFEFloodElement>;
    getElementsByTagName(tagname: "fefunca"): NodeListOf<SVGFEFuncAElement>;
    getElementsByTagName(tagname: "fefuncb"): NodeListOf<SVGFEFuncBElement>;
    getElementsByTagName(tagname: "fefuncg"): NodeListOf<SVGFEFuncGElement>;
    getElementsByTagName(tagname: "fefuncr"): NodeListOf<SVGFEFuncRElement>;
    getElementsByTagName(tagname: "fegaussianblur"): NodeListOf<SVGFEGaussianBlurElement>;
    getElementsByTagName(tagname: "feimage"): NodeListOf<SVGFEImageElement>;
    getElementsByTagName(tagname: "femerge"): NodeListOf<SVGFEMergeElement>;
    getElementsByTagName(tagname: "femergenode"): NodeListOf<SVGFEMergeNodeElement>;
    getElementsByTagName(tagname: "femorphology"): NodeListOf<SVGFEMorphologyElement>;
    getElementsByTagName(tagname: "feoffset"): NodeListOf<SVGFEOffsetElement>;
    getElementsByTagName(tagname: "fepointlight"): NodeListOf<SVGFEPointLightElement>;
    getElementsByTagName(tagname: "fespecularlighting"): NodeListOf<SVGFESpecularLightingElement>;
    getElementsByTagName(tagname: "fespotlight"): NodeListOf<SVGFESpotLightElement>;
    getElementsByTagName(tagname: "fetile"): NodeListOf<SVGFETileElement>;
    getElementsByTagName(tagname: "feturbulence"): NodeListOf<SVGFETurbulenceElement>;
    getElementsByTagName(tagname: "fieldset"): NodeListOf<HTMLFieldSetElement>;
    getElementsByTagName(tagname: "figcaption"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "figure"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "filter"): NodeListOf<SVGFilterElement>;
    getElementsByTagName(tagname: "font"): NodeListOf<HTMLFontElement>;
    getElementsByTagName(tagname: "footer"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "foreignobject"): NodeListOf<SVGForeignObjectElement>;
    getElementsByTagName(tagname: "form"): NodeListOf<HTMLFormElement>;
    getElementsByTagName(tagname: "frame"): NodeListOf<HTMLFrameElement>;
    getElementsByTagName(tagname: "frameset"): NodeListOf<HTMLFrameSetElement>;
    getElementsByTagName(tagname: "g"): NodeListOf<SVGGElement>;
    getElementsByTagName(tagname: "h1"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(tagname: "h2"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(tagname: "h3"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(tagname: "h4"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(tagname: "h5"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(tagname: "h6"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(tagname: "head"): NodeListOf<HTMLHeadElement>;
    getElementsByTagName(tagname: "header"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "hgroup"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "hr"): NodeListOf<HTMLHRElement>;
    getElementsByTagName(tagname: "html"): NodeListOf<HTMLHtmlElement>;
    getElementsByTagName(tagname: "i"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "iframe"): NodeListOf<HTMLIFrameElement>;
    getElementsByTagName(tagname: "image"): NodeListOf<SVGImageElement>;
    getElementsByTagName(tagname: "img"): NodeListOf<HTMLImageElement>;
    getElementsByTagName(tagname: "input"): NodeListOf<HTMLInputElement>;
    getElementsByTagName(tagname: "ins"): NodeListOf<HTMLModElement>;
    getElementsByTagName(tagname: "isindex"): NodeListOf<HTMLIsIndexElement>;
    getElementsByTagName(tagname: "kbd"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "keygen"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: "label"): NodeListOf<HTMLLabelElement>;
    getElementsByTagName(tagname: "legend"): NodeListOf<HTMLLegendElement>;
    getElementsByTagName(tagname: "li"): NodeListOf<HTMLLIElement>;
    getElementsByTagName(tagname: "line"): NodeListOf<SVGLineElement>;
    getElementsByTagName(tagname: "lineargradient"): NodeListOf<SVGLinearGradientElement>;
    getElementsByTagName(tagname: "link"): NodeListOf<HTMLLinkElement>;
    getElementsByTagName(tagname: "listing"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: "map"): NodeListOf<HTMLMapElement>;
    getElementsByTagName(tagname: "mark"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "marker"): NodeListOf<SVGMarkerElement>;
    getElementsByTagName(tagname: "marquee"): NodeListOf<HTMLMarqueeElement>;
    getElementsByTagName(tagname: "mask"): NodeListOf<SVGMaskElement>;
    getElementsByTagName(tagname: "menu"): NodeListOf<HTMLMenuElement>;
    getElementsByTagName(tagname: "meta"): NodeListOf<HTMLMetaElement>;
    getElementsByTagName(tagname: "metadata"): NodeListOf<SVGMetadataElement>;
    getElementsByTagName(tagname: "nav"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "nextid"): NodeListOf<HTMLNextIdElement>;
    getElementsByTagName(tagname: "nobr"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "noframes"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "noscript"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "object"): NodeListOf<HTMLObjectElement>;
    getElementsByTagName(tagname: "ol"): NodeListOf<HTMLOListElement>;
    getElementsByTagName(tagname: "optgroup"): NodeListOf<HTMLOptGroupElement>;
    getElementsByTagName(tagname: "option"): NodeListOf<HTMLOptionElement>;
    getElementsByTagName(tagname: "p"): NodeListOf<HTMLParagraphElement>;
    getElementsByTagName(tagname: "param"): NodeListOf<HTMLParamElement>;
    getElementsByTagName(tagname: "path"): NodeListOf<SVGPathElement>;
    getElementsByTagName(tagname: "pattern"): NodeListOf<SVGPatternElement>;
    getElementsByTagName(tagname: "plaintext"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: "polygon"): NodeListOf<SVGPolygonElement>;
    getElementsByTagName(tagname: "polyline"): NodeListOf<SVGPolylineElement>;
    getElementsByTagName(tagname: "pre"): NodeListOf<HTMLPreElement>;
    getElementsByTagName(tagname: "progress"): NodeListOf<HTMLProgressElement>;
    getElementsByTagName(tagname: "q"): NodeListOf<HTMLQuoteElement>;
    getElementsByTagName(tagname: "radialgradient"): NodeListOf<SVGRadialGradientElement>;
    getElementsByTagName(tagname: "rect"): NodeListOf<SVGRectElement>;
    getElementsByTagName(tagname: "rt"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "ruby"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "s"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "samp"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "script"): NodeListOf<HTMLScriptElement>;
    getElementsByTagName(tagname: "section"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "select"): NodeListOf<HTMLSelectElement>;
    getElementsByTagName(tagname: "small"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "source"): NodeListOf<HTMLSourceElement>;
    getElementsByTagName(tagname: "span"): NodeListOf<HTMLSpanElement>;
    getElementsByTagName(tagname: "stop"): NodeListOf<SVGStopElement>;
    getElementsByTagName(tagname: "strike"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "strong"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "style"): NodeListOf<HTMLStyleElement>;
    getElementsByTagName(tagname: "sub"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "sup"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "svg"): NodeListOf<SVGSVGElement>;
    getElementsByTagName(tagname: "switch"): NodeListOf<SVGSwitchElement>;
    getElementsByTagName(tagname: "symbol"): NodeListOf<SVGSymbolElement>;
    getElementsByTagName(tagname: "table"): NodeListOf<HTMLTableElement>;
    getElementsByTagName(tagname: "tbody"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(tagname: "td"): NodeListOf<HTMLTableDataCellElement>;
    getElementsByTagName(tagname: "text"): NodeListOf<SVGTextElement>;
    getElementsByTagName(tagname: "textpath"): NodeListOf<SVGTextPathElement>;
    getElementsByTagName(tagname: "textarea"): NodeListOf<HTMLTextAreaElement>;
    getElementsByTagName(tagname: "tfoot"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(tagname: "th"): NodeListOf<HTMLTableHeaderCellElement>;
    getElementsByTagName(tagname: "thead"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(tagname: "title"): NodeListOf<HTMLTitleElement>;
    getElementsByTagName(tagname: "tr"): NodeListOf<HTMLTableRowElement>;
    getElementsByTagName(tagname: "track"): NodeListOf<HTMLTrackElement>;
    getElementsByTagName(tagname: "tspan"): NodeListOf<SVGTSpanElement>;
    getElementsByTagName(tagname: "tt"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "u"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "ul"): NodeListOf<HTMLUListElement>;
    getElementsByTagName(tagname: "use"): NodeListOf<SVGUseElement>;
    getElementsByTagName(tagname: "var"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(tagname: "video"): NodeListOf<HTMLVideoElement>;
    getElementsByTagName(tagname: "view"): NodeListOf<SVGViewElement>;
    getElementsByTagName(tagname: "wbr"): NodeListOf<HTMLElement>;
    getElementsByTagName(tagname: "x-ms-webview"): NodeListOf<MSHTMLWebViewElement>;
    getElementsByTagName(tagname: "xmp"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(tagname: string): NodeListOf<Element>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): NodeListOf<Element>;
    /**
      * Returns an object representing the current selection of the document that is loaded into the object displaying a webpage.
      */
    getSelection(): Selection;
    /**
      * Gets a value indicating whether the object currently has focus.
      */
    hasFocus(): boolean;
    importNode(importedNode: Node, deep: boolean): Node;
    msElementsFromPoint(x: number, y: number): NodeList;
    msElementsFromRect(left: number, top: number, width: number, height: number): NodeList;
    /**
      * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
      * @param url Specifies a MIME type for the document.
      * @param name Specifies the name of the window. This name is used as the value for the TARGET attribute on a form or an anchor element.
      * @param features Contains a list of items separated by commas. Each item consists of an option and a value, separated by an equals sign (for example, "fullscreen=yes, toolbar=yes"). The following values are supported.
      * @param replace Specifies whether the existing entry for the document is replaced in the history list.
      */
    open(url?: string, name?: string, features?: string, replace?: boolean): Document;
    /**
      * Returns a Boolean value that indicates whether a specified command can be successfully executed using execCommand, given the current state of the document.
      * @param commandId Specifies a command identifier.
      */
    queryCommandEnabled(commandId: string): boolean;
    /**
      * Returns a Boolean value that indicates whether the specified command is in the indeterminate state.
      * @param commandId String that specifies a command identifier.
      */
    queryCommandIndeterm(commandId: string): boolean;
    /**
      * Returns a Boolean value that indicates the current state of the command.
      * @param commandId String that specifies a command identifier.
      */
    queryCommandState(commandId: string): boolean;
    /**
      * Returns a Boolean value that indicates whether the current command is supported on the current range.
      * @param commandId Specifies a command identifier.
      */
    queryCommandSupported(commandId: string): boolean;
    /**
      * Retrieves the string associated with a command.
      * @param commandId String that contains the identifier of a command. This can be any command identifier given in the list of Command Identifiers.
      */
    queryCommandText(commandId: string): string;
    /**
      * Returns the current value of the document, range, or current selection for the given command.
      * @param commandId String that specifies a command identifier.
      */
    queryCommandValue(commandId: string): string;
    releaseEvents(): void;
    /**
      * Allows updating the print settings for the page.
      */
    updateSettings(): void;
    webkitCancelFullScreen(): void;
    webkitExitFullscreen(): void;
    /**
      * Writes one or more HTML expressions to a document in the specified window.
      * @param content Specifies the text and HTML tags to write.
      */
    write(...content: string[]): void;
    /**
      * Writes one or more HTML expressions, followed by a carriage return, to a document in the specified window.
      * @param content The text and HTML tags to write.
      */
    writeln(...content: string[]): void;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "fullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "fullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mssitemodejumplistitemremoved", listener: (ev: MSSiteModeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "msthumbnailclick", listener: (ev: MSSiteModeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerlockchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerlockerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "readystatechange", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stop", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Document: {
    prototype: Document;
    new(): Document;
}

interface DocumentFragment extends Node, NodeSelector {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var DocumentFragment: {
    prototype: DocumentFragment;
    new(): DocumentFragment;
}

interface DocumentType extends Node, ChildNode {
    entities: NamedNodeMap;
    internalSubset: string;
    name: string;
    notations: NamedNodeMap;
    publicId: string;
    systemId: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var DocumentType: {
    prototype: DocumentType;
    new(): DocumentType;
}

interface DragEvent extends MouseEvent {
    dataTransfer: DataTransfer;
    initDragEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, dataTransferArg: DataTransfer): void;
    msConvertURL(file: File, targetType: string, targetURL?: string): void;
}

declare var DragEvent: {
    prototype: DragEvent;
    new(): DragEvent;
}

interface DynamicsCompressorNode extends AudioNode {
    attack: AudioParam;
    knee: AudioParam;
    ratio: AudioParam;
    reduction: AudioParam;
    release: AudioParam;
    threshold: AudioParam;
}

declare var DynamicsCompressorNode: {
    prototype: DynamicsCompressorNode;
    new(): DynamicsCompressorNode;
}

interface EXT_texture_filter_anisotropic {
    MAX_TEXTURE_MAX_ANISOTROPY_EXT: number;
    TEXTURE_MAX_ANISOTROPY_EXT: number;
}

declare var EXT_texture_filter_anisotropic: {
    prototype: EXT_texture_filter_anisotropic;
    new(): EXT_texture_filter_anisotropic;
    MAX_TEXTURE_MAX_ANISOTROPY_EXT: number;
    TEXTURE_MAX_ANISOTROPY_EXT: number;
}

interface Element extends Node, GlobalEventHandlers, ElementTraversal, NodeSelector, ChildNode {
    classList: DOMTokenList;
    clientHeight: number;
    clientLeft: number;
    clientTop: number;
    clientWidth: number;
    msContentZoomFactor: number;
    msRegionOverflow: string;
    onariarequest: (ev: AriaRequestEvent) => any;
    oncommand: (ev: CommandEvent) => any;
    ongotpointercapture: (ev: PointerEvent) => any;
    onlostpointercapture: (ev: PointerEvent) => any;
    onmsgesturechange: (ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (ev: MSGestureEvent) => any;
    onmsgestureend: (ev: MSGestureEvent) => any;
    onmsgesturehold: (ev: MSGestureEvent) => any;
    onmsgesturestart: (ev: MSGestureEvent) => any;
    onmsgesturetap: (ev: MSGestureEvent) => any;
    onmsgotpointercapture: (ev: MSPointerEvent) => any;
    onmsinertiastart: (ev: MSGestureEvent) => any;
    onmslostpointercapture: (ev: MSPointerEvent) => any;
    onmspointercancel: (ev: MSPointerEvent) => any;
    onmspointerdown: (ev: MSPointerEvent) => any;
    onmspointerenter: (ev: MSPointerEvent) => any;
    onmspointerleave: (ev: MSPointerEvent) => any;
    onmspointermove: (ev: MSPointerEvent) => any;
    onmspointerout: (ev: MSPointerEvent) => any;
    onmspointerover: (ev: MSPointerEvent) => any;
    onmspointerup: (ev: MSPointerEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    onwebkitfullscreenchange: (ev: Event) => any;
    onwebkitfullscreenerror: (ev: Event) => any;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
    tagName: string;
    id: string;
    className: string;
    getAttribute(name?: string): string;
    getAttributeNS(namespaceURI: string, localName: string): string;
    getAttributeNode(name: string): Attr;
    getAttributeNodeNS(namespaceURI: string, localName: string): Attr;
    getBoundingClientRect(): ClientRect;
    getClientRects(): ClientRectList;
    getElementsByTagName(name: "a"): NodeListOf<HTMLAnchorElement>;
    getElementsByTagName(name: "abbr"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "acronym"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "address"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: "applet"): NodeListOf<HTMLAppletElement>;
    getElementsByTagName(name: "area"): NodeListOf<HTMLAreaElement>;
    getElementsByTagName(name: "article"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "aside"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "audio"): NodeListOf<HTMLAudioElement>;
    getElementsByTagName(name: "b"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "base"): NodeListOf<HTMLBaseElement>;
    getElementsByTagName(name: "basefont"): NodeListOf<HTMLBaseFontElement>;
    getElementsByTagName(name: "bdo"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "big"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "blockquote"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: "body"): NodeListOf<HTMLBodyElement>;
    getElementsByTagName(name: "br"): NodeListOf<HTMLBRElement>;
    getElementsByTagName(name: "button"): NodeListOf<HTMLButtonElement>;
    getElementsByTagName(name: "canvas"): NodeListOf<HTMLCanvasElement>;
    getElementsByTagName(name: "caption"): NodeListOf<HTMLTableCaptionElement>;
    getElementsByTagName(name: "center"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: "circle"): NodeListOf<SVGCircleElement>;
    getElementsByTagName(name: "cite"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "clippath"): NodeListOf<SVGClipPathElement>;
    getElementsByTagName(name: "code"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "col"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName(name: "colgroup"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName(name: "datalist"): NodeListOf<HTMLDataListElement>;
    getElementsByTagName(name: "dd"): NodeListOf<HTMLDDElement>;
    getElementsByTagName(name: "defs"): NodeListOf<SVGDefsElement>;
    getElementsByTagName(name: "del"): NodeListOf<HTMLModElement>;
    getElementsByTagName(name: "desc"): NodeListOf<SVGDescElement>;
    getElementsByTagName(name: "dfn"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "dir"): NodeListOf<HTMLDirectoryElement>;
    getElementsByTagName(name: "div"): NodeListOf<HTMLDivElement>;
    getElementsByTagName(name: "dl"): NodeListOf<HTMLDListElement>;
    getElementsByTagName(name: "dt"): NodeListOf<HTMLDTElement>;
    getElementsByTagName(name: "ellipse"): NodeListOf<SVGEllipseElement>;
    getElementsByTagName(name: "em"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "embed"): NodeListOf<HTMLEmbedElement>;
    getElementsByTagName(name: "feblend"): NodeListOf<SVGFEBlendElement>;
    getElementsByTagName(name: "fecolormatrix"): NodeListOf<SVGFEColorMatrixElement>;
    getElementsByTagName(name: "fecomponenttransfer"): NodeListOf<SVGFEComponentTransferElement>;
    getElementsByTagName(name: "fecomposite"): NodeListOf<SVGFECompositeElement>;
    getElementsByTagName(name: "feconvolvematrix"): NodeListOf<SVGFEConvolveMatrixElement>;
    getElementsByTagName(name: "fediffuselighting"): NodeListOf<SVGFEDiffuseLightingElement>;
    getElementsByTagName(name: "fedisplacementmap"): NodeListOf<SVGFEDisplacementMapElement>;
    getElementsByTagName(name: "fedistantlight"): NodeListOf<SVGFEDistantLightElement>;
    getElementsByTagName(name: "feflood"): NodeListOf<SVGFEFloodElement>;
    getElementsByTagName(name: "fefunca"): NodeListOf<SVGFEFuncAElement>;
    getElementsByTagName(name: "fefuncb"): NodeListOf<SVGFEFuncBElement>;
    getElementsByTagName(name: "fefuncg"): NodeListOf<SVGFEFuncGElement>;
    getElementsByTagName(name: "fefuncr"): NodeListOf<SVGFEFuncRElement>;
    getElementsByTagName(name: "fegaussianblur"): NodeListOf<SVGFEGaussianBlurElement>;
    getElementsByTagName(name: "feimage"): NodeListOf<SVGFEImageElement>;
    getElementsByTagName(name: "femerge"): NodeListOf<SVGFEMergeElement>;
    getElementsByTagName(name: "femergenode"): NodeListOf<SVGFEMergeNodeElement>;
    getElementsByTagName(name: "femorphology"): NodeListOf<SVGFEMorphologyElement>;
    getElementsByTagName(name: "feoffset"): NodeListOf<SVGFEOffsetElement>;
    getElementsByTagName(name: "fepointlight"): NodeListOf<SVGFEPointLightElement>;
    getElementsByTagName(name: "fespecularlighting"): NodeListOf<SVGFESpecularLightingElement>;
    getElementsByTagName(name: "fespotlight"): NodeListOf<SVGFESpotLightElement>;
    getElementsByTagName(name: "fetile"): NodeListOf<SVGFETileElement>;
    getElementsByTagName(name: "feturbulence"): NodeListOf<SVGFETurbulenceElement>;
    getElementsByTagName(name: "fieldset"): NodeListOf<HTMLFieldSetElement>;
    getElementsByTagName(name: "figcaption"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "figure"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "filter"): NodeListOf<SVGFilterElement>;
    getElementsByTagName(name: "font"): NodeListOf<HTMLFontElement>;
    getElementsByTagName(name: "footer"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "foreignobject"): NodeListOf<SVGForeignObjectElement>;
    getElementsByTagName(name: "form"): NodeListOf<HTMLFormElement>;
    getElementsByTagName(name: "frame"): NodeListOf<HTMLFrameElement>;
    getElementsByTagName(name: "frameset"): NodeListOf<HTMLFrameSetElement>;
    getElementsByTagName(name: "g"): NodeListOf<SVGGElement>;
    getElementsByTagName(name: "h1"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h2"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h3"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h4"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h5"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h6"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "head"): NodeListOf<HTMLHeadElement>;
    getElementsByTagName(name: "header"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "hgroup"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "hr"): NodeListOf<HTMLHRElement>;
    getElementsByTagName(name: "html"): NodeListOf<HTMLHtmlElement>;
    getElementsByTagName(name: "i"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "iframe"): NodeListOf<HTMLIFrameElement>;
    getElementsByTagName(name: "image"): NodeListOf<SVGImageElement>;
    getElementsByTagName(name: "img"): NodeListOf<HTMLImageElement>;
    getElementsByTagName(name: "input"): NodeListOf<HTMLInputElement>;
    getElementsByTagName(name: "ins"): NodeListOf<HTMLModElement>;
    getElementsByTagName(name: "isindex"): NodeListOf<HTMLIsIndexElement>;
    getElementsByTagName(name: "kbd"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "keygen"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: "label"): NodeListOf<HTMLLabelElement>;
    getElementsByTagName(name: "legend"): NodeListOf<HTMLLegendElement>;
    getElementsByTagName(name: "li"): NodeListOf<HTMLLIElement>;
    getElementsByTagName(name: "line"): NodeListOf<SVGLineElement>;
    getElementsByTagName(name: "lineargradient"): NodeListOf<SVGLinearGradientElement>;
    getElementsByTagName(name: "link"): NodeListOf<HTMLLinkElement>;
    getElementsByTagName(name: "listing"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: "map"): NodeListOf<HTMLMapElement>;
    getElementsByTagName(name: "mark"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "marker"): NodeListOf<SVGMarkerElement>;
    getElementsByTagName(name: "marquee"): NodeListOf<HTMLMarqueeElement>;
    getElementsByTagName(name: "mask"): NodeListOf<SVGMaskElement>;
    getElementsByTagName(name: "menu"): NodeListOf<HTMLMenuElement>;
    getElementsByTagName(name: "meta"): NodeListOf<HTMLMetaElement>;
    getElementsByTagName(name: "metadata"): NodeListOf<SVGMetadataElement>;
    getElementsByTagName(name: "nav"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "nextid"): NodeListOf<HTMLNextIdElement>;
    getElementsByTagName(name: "nobr"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "noframes"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "noscript"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "object"): NodeListOf<HTMLObjectElement>;
    getElementsByTagName(name: "ol"): NodeListOf<HTMLOListElement>;
    getElementsByTagName(name: "optgroup"): NodeListOf<HTMLOptGroupElement>;
    getElementsByTagName(name: "option"): NodeListOf<HTMLOptionElement>;
    getElementsByTagName(name: "p"): NodeListOf<HTMLParagraphElement>;
    getElementsByTagName(name: "param"): NodeListOf<HTMLParamElement>;
    getElementsByTagName(name: "path"): NodeListOf<SVGPathElement>;
    getElementsByTagName(name: "pattern"): NodeListOf<SVGPatternElement>;
    getElementsByTagName(name: "plaintext"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: "polygon"): NodeListOf<SVGPolygonElement>;
    getElementsByTagName(name: "polyline"): NodeListOf<SVGPolylineElement>;
    getElementsByTagName(name: "pre"): NodeListOf<HTMLPreElement>;
    getElementsByTagName(name: "progress"): NodeListOf<HTMLProgressElement>;
    getElementsByTagName(name: "q"): NodeListOf<HTMLQuoteElement>;
    getElementsByTagName(name: "radialgradient"): NodeListOf<SVGRadialGradientElement>;
    getElementsByTagName(name: "rect"): NodeListOf<SVGRectElement>;
    getElementsByTagName(name: "rt"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "ruby"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "s"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "samp"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "script"): NodeListOf<HTMLScriptElement>;
    getElementsByTagName(name: "section"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "select"): NodeListOf<HTMLSelectElement>;
    getElementsByTagName(name: "small"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "source"): NodeListOf<HTMLSourceElement>;
    getElementsByTagName(name: "span"): NodeListOf<HTMLSpanElement>;
    getElementsByTagName(name: "stop"): NodeListOf<SVGStopElement>;
    getElementsByTagName(name: "strike"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "strong"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "style"): NodeListOf<HTMLStyleElement>;
    getElementsByTagName(name: "sub"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "sup"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "svg"): NodeListOf<SVGSVGElement>;
    getElementsByTagName(name: "switch"): NodeListOf<SVGSwitchElement>;
    getElementsByTagName(name: "symbol"): NodeListOf<SVGSymbolElement>;
    getElementsByTagName(name: "table"): NodeListOf<HTMLTableElement>;
    getElementsByTagName(name: "tbody"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(name: "td"): NodeListOf<HTMLTableDataCellElement>;
    getElementsByTagName(name: "text"): NodeListOf<SVGTextElement>;
    getElementsByTagName(name: "textpath"): NodeListOf<SVGTextPathElement>;
    getElementsByTagName(name: "textarea"): NodeListOf<HTMLTextAreaElement>;
    getElementsByTagName(name: "tfoot"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(name: "th"): NodeListOf<HTMLTableHeaderCellElement>;
    getElementsByTagName(name: "thead"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(name: "title"): NodeListOf<HTMLTitleElement>;
    getElementsByTagName(name: "tr"): NodeListOf<HTMLTableRowElement>;
    getElementsByTagName(name: "track"): NodeListOf<HTMLTrackElement>;
    getElementsByTagName(name: "tspan"): NodeListOf<SVGTSpanElement>;
    getElementsByTagName(name: "tt"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "u"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "ul"): NodeListOf<HTMLUListElement>;
    getElementsByTagName(name: "use"): NodeListOf<SVGUseElement>;
    getElementsByTagName(name: "var"): NodeListOf<HTMLPhraseElement>;
    getElementsByTagName(name: "video"): NodeListOf<HTMLVideoElement>;
    getElementsByTagName(name: "view"): NodeListOf<SVGViewElement>;
    getElementsByTagName(name: "wbr"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "x-ms-webview"): NodeListOf<MSHTMLWebViewElement>;
    getElementsByTagName(name: "xmp"): NodeListOf<HTMLBlockElement>;
    getElementsByTagName(name: string): NodeListOf<Element>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): NodeListOf<Element>;
    hasAttribute(name: string): boolean;
    hasAttributeNS(namespaceURI: string, localName: string): boolean;
    msGetRegionContent(): MSRangeCollection;
    msGetUntransformedBounds(): ClientRect;
    msMatchesSelector(selectors: string): boolean;
    msReleasePointerCapture(pointerId: number): void;
    msSetPointerCapture(pointerId: number): void;
    msZoomTo(args: MsZoomToOptions): void;
    releasePointerCapture(pointerId: number): void;
    removeAttribute(name?: string): void;
    removeAttributeNS(namespaceURI: string, localName: string): void;
    removeAttributeNode(oldAttr: Attr): Attr;
    requestFullscreen(): void;
    requestPointerLock(): void;
    setAttribute(name?: string, value?: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;
    setAttributeNode(newAttr: Attr): Attr;
    setAttributeNodeNS(newAttr: Attr): Attr;
    setPointerCapture(pointerId: number): void;
    webkitMatchesSelector(selectors: string): boolean;
    webkitRequestFullScreen(): void;
    webkitRequestFullscreen(): void;
    getElementsByClassName(classNames: string): NodeListOf<Element>;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Element: {
    prototype: Element;
    new(): Element;
}

interface ErrorEvent extends Event {
    colno: number;
    error: any;
    filename: string;
    lineno: number;
    message: string;
    initErrorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, messageArg: string, filenameArg: string, linenoArg: number): void;
}

declare var ErrorEvent: {
    prototype: ErrorEvent;
    new(): ErrorEvent;
}

interface Event {
    bubbles: boolean;
    cancelBubble: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    returnValue: boolean;
    srcElement: Element;
    target: EventTarget;
    timeStamp: number;
    type: string;
    initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
    CAPTURING_PHASE: number;
}

declare var Event: {
    prototype: Event;
    new(type: string, eventInitDict?: EventInit): Event;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
    CAPTURING_PHASE: number;
}

interface EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var EventTarget: {
    prototype: EventTarget;
    new(): EventTarget;
}

interface External {
}

declare var External: {
    prototype: External;
    new(): External;
}

interface File extends Blob {
    lastModifiedDate: any;
    name: string;
}

declare var File: {
    prototype: File;
    new (parts: (ArrayBuffer | ArrayBufferView | Blob | string)[], filename: string, properties?: FilePropertyBag): File;
}

interface FileList {
    length: number;
    item(index: number): File;
    [index: number]: File;
}

declare var FileList: {
    prototype: FileList;
    new(): FileList;
}

interface FileReader extends EventTarget, MSBaseReader {
    error: DOMError;
    readAsArrayBuffer(blob: Blob): void;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, encoding?: string): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var FileReader: {
    prototype: FileReader;
    new(): FileReader;
}

interface FocusEvent extends UIEvent {
    relatedTarget: EventTarget;
    initFocusEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, relatedTargetArg: EventTarget): void;
}

declare var FocusEvent: {
    prototype: FocusEvent;
    new(typeArg: string, eventInitDict?: FocusEventInit): FocusEvent;
}

interface FormData {
    append(name: any, value: any, blobName?: string): void;
}

declare var FormData: {
    prototype: FormData;
    new (form?: HTMLFormElement): FormData;
}

interface GainNode extends AudioNode {
    gain: AudioParam;
}

declare var GainNode: {
    prototype: GainNode;
    new(): GainNode;
}

interface Gamepad {
    axes: number[];
    buttons: GamepadButton[];
    connected: boolean;
    id: string;
    index: number;
    mapping: string;
    timestamp: number;
}

declare var Gamepad: {
    prototype: Gamepad;
    new(): Gamepad;
}

interface GamepadButton {
    pressed: boolean;
    value: number;
}

declare var GamepadButton: {
    prototype: GamepadButton;
    new(): GamepadButton;
}

interface GamepadEvent extends Event {
    gamepad: Gamepad;
}

declare var GamepadEvent: {
    prototype: GamepadEvent;
    new(): GamepadEvent;
}

interface Geolocation {
    clearWatch(watchId: number): void;
    getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): void;
    watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
}

declare var Geolocation: {
    prototype: Geolocation;
    new(): Geolocation;
}

interface HTMLAllCollection extends HTMLCollection {
    namedItem(name: string): Element;
}

declare var HTMLAllCollection: {
    prototype: HTMLAllCollection;
    new(): HTMLAllCollection;
}

interface HTMLAnchorElement extends HTMLElement {
    Methods: string;
    /**
      * Sets or retrieves the character set used to encode the object.
      */
    charset: string;
    /**
      * Sets or retrieves the coordinates of the object.
      */
    coords: string;
    /**
      * Contains the anchor portion of the URL including the hash sign (#).
      */
    hash: string;
    /**
      * Contains the hostname and port values of the URL.
      */
    host: string;
    /**
      * Contains the hostname of a URL.
      */
    hostname: string;
    /**
      * Sets or retrieves a destination URL or an anchor point.
      */
    href: string;
    /**
      * Sets or retrieves the language code of the object.
      */
    hreflang: string;
    mimeType: string;
    /**
      * Sets or retrieves the shape of the object.
      */
    name: string;
    nameProp: string;
    /**
      * Contains the pathname of the URL.
      */
    pathname: string;
    /**
      * Sets or retrieves the port number associated with a URL.
      */
    port: string;
    /**
      * Contains the protocol of the URL.
      */
    protocol: string;
    protocolLong: string;
    /**
      * Sets or retrieves the relationship between the object and the destination of the link.
      */
    rel: string;
    /**
      * Sets or retrieves the relationship between the object and the destination of the link.
      */
    rev: string;
    /**
      * Sets or retrieves the substring of the href property that follows the question mark.
      */
    search: string;
    /**
      * Sets or retrieves the shape of the object.
      */
    shape: string;
    /**
      * Sets or retrieves the window or frame at which to target content.
      */
    target: string;
    /**
      * Retrieves or sets the text of the object as a string.
      */
    text: string;
    type: string;
    urn: string;
    /**
      * Returns a string representation of an object.
      */
    toString(): string;
}

declare var HTMLAnchorElement: {
    prototype: HTMLAnchorElement;
    new(): HTMLAnchorElement;
}

interface HTMLAppletElement extends HTMLElement {
    /**
      * Retrieves a string of the URL where the object tag can be found. This is often the href of the document that the object is in, or the value set by a base element.
      */
    BaseHref: string;
    align: string;
    /**
      * Sets or retrieves a text alternative to the graphic.
      */
    alt: string;
    /**
      * Gets or sets the optional alternative HTML script to execute if the object fails to load.
      */
    altHtml: string;
    /**
      * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
      */
    archive: string;
    border: string;
    code: string;
    /**
      * Sets or retrieves the URL of the component.
      */
    codeBase: string;
    /**
      * Sets or retrieves the Internet media type for the code associated with the object.
      */
    codeType: string;
    /**
      * Address of a pointer to the document this page or frame contains. If there is no document, then null will be returned.
      */
    contentDocument: Document;
    /**
      * Sets or retrieves the URL that references the data of the object.
      */
    data: string;
    /**
      * Sets or retrieves a character string that can be used to implement your own declare functionality for the object.
      */
    declare: boolean;
    form: HTMLFormElement;
    /**
      * Sets or retrieves the height of the object.
      */
    height: string;
    hspace: number;
    /**
      * Sets or retrieves the shape of the object.
      */
    name: string;
    object: string;
    /**
      * Sets or retrieves a message to be displayed while an object is loading.
      */
    standby: string;
    /**
      * Returns the content type of the object.
      */
    type: string;
    /**
      * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
      */
    useMap: string;
    vspace: number;
    width: number;
}

declare var HTMLAppletElement: {
    prototype: HTMLAppletElement;
    new(): HTMLAppletElement;
}

interface HTMLAreaElement extends HTMLElement {
    /**
      * Sets or retrieves a text alternative to the graphic.
      */
    alt: string;
    /**
      * Sets or retrieves the coordinates of the object.
      */
    coords: string;
    /**
      * Sets or retrieves the subsection of the href property that follows the number sign (#).
      */
    hash: string;
    /**
      * Sets or retrieves the hostname and port number of the location or URL.
      */
    host: string;
    /**
      * Sets or retrieves the host name part of the location or URL.
      */
    hostname: string;
    /**
      * Sets or retrieves a destination URL or an anchor point.
      */
    href: string;
    /**
      * Sets or gets whether clicks in this region cause action.
      */
    noHref: boolean;
    /**
      * Sets or retrieves the file name or path specified by the object.
      */
    pathname: string;
    /**
      * Sets or retrieves the port number associated with a URL.
      */
    port: string;
    /**
      * Sets or retrieves the protocol portion of a URL.
      */
    protocol: string;
    rel: string;
    /**
      * Sets or retrieves the substring of the href property that follows the question mark.
      */
    search: string;
    /**
      * Sets or retrieves the shape of the object.
      */
    shape: string;
    /**
      * Sets or retrieves the window or frame at which to target content.
      */
    target: string;
    /**
      * Returns a string representation of an object.
      */
    toString(): string;
}

declare var HTMLAreaElement: {
    prototype: HTMLAreaElement;
    new(): HTMLAreaElement;
}

interface HTMLAreasCollection extends HTMLCollection {
    /**
      * Adds an element to the areas, controlRange, or options collection.
      */
    add(element: HTMLElement, before?: HTMLElement | number): void;
    /**
      * Removes an element from the collection.
      */
    remove(index?: number): void;
}

declare var HTMLAreasCollection: {
    prototype: HTMLAreasCollection;
    new(): HTMLAreasCollection;
}

interface HTMLAudioElement extends HTMLMediaElement {
}

declare var HTMLAudioElement: {
    prototype: HTMLAudioElement;
    new(): HTMLAudioElement;
}

interface HTMLBRElement extends HTMLElement {
    /**
      * Sets or retrieves the side on which floating objects are not to be positioned when any IHTMLBlockElement is inserted into the document.
      */
    clear: string;
}

declare var HTMLBRElement: {
    prototype: HTMLBRElement;
    new(): HTMLBRElement;
}

interface HTMLBaseElement extends HTMLElement {
    /**
      * Gets or sets the baseline URL on which relative links are based.
      */
    href: string;
    /**
      * Sets or retrieves the window or frame at which to target content.
      */
    target: string;
}

declare var HTMLBaseElement: {
    prototype: HTMLBaseElement;
    new(): HTMLBaseElement;
}

interface HTMLBaseFontElement extends HTMLElement, DOML2DeprecatedColorProperty {
    /**
      * Sets or retrieves the current typeface family.
      */
    face: string;
    /**
      * Sets or retrieves the font size of the object.
      */
    size: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLBaseFontElement: {
    prototype: HTMLBaseFontElement;
    new(): HTMLBaseFontElement;
}

interface HTMLBlockElement extends HTMLElement {
    /**
      * Sets or retrieves reference information about the object.
      */
    cite: string;
    clear: string;
    /**
      * Sets or retrieves the width of the object.
      */
    width: number;
}

declare var HTMLBlockElement: {
    prototype: HTMLBlockElement;
    new(): HTMLBlockElement;
}

interface HTMLBodyElement extends HTMLElement {
    aLink: any;
    background: string;
    bgColor: any;
    bgProperties: string;
    link: any;
    noWrap: boolean;
    onafterprint: (ev: Event) => any;
    onbeforeprint: (ev: Event) => any;
    onbeforeunload: (ev: BeforeUnloadEvent) => any;
    onblur: (ev: FocusEvent) => any;
    onerror: (ev: Event) => any;
    onfocus: (ev: FocusEvent) => any;
    onhashchange: (ev: HashChangeEvent) => any;
    onload: (ev: Event) => any;
    onmessage: (ev: MessageEvent) => any;
    onoffline: (ev: Event) => any;
    ononline: (ev: Event) => any;
    onorientationchange: (ev: Event) => any;
    onpagehide: (ev: PageTransitionEvent) => any;
    onpageshow: (ev: PageTransitionEvent) => any;
    onpopstate: (ev: PopStateEvent) => any;
    onresize: (ev: UIEvent) => any;
    onstorage: (ev: StorageEvent) => any;
    onunload: (ev: Event) => any;
    text: any;
    vLink: any;
    createTextRange(): TextRange;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "afterprint", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeprint", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeunload", listener: (ev: BeforeUnloadEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "hashchange", listener: (ev: HashChangeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "offline", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "online", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "orientationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pagehide", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pageshow", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "popstate", listener: (ev: PopStateEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "resize", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "storage", listener: (ev: StorageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "unload", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLBodyElement: {
    prototype: HTMLBodyElement;
    new(): HTMLBodyElement;
}

interface HTMLButtonElement extends HTMLElement {
    /**
      * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
      */
    autofocus: boolean;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Overrides the action attribute (where the data on a form is sent) on the parent form element.
      */
    formAction: string;
    /**
      * Used to override the encoding (formEnctype attribute) specified on the form element.
      */
    formEnctype: string;
    /**
      * Overrides the submit method attribute previously specified on a form element.
      */
    formMethod: string;
    /**
      * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
      */
    formNoValidate: string;
    /**
      * Overrides the target attribute on a form element.
      */
    formTarget: string;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    status: any;
    /**
      * Gets the classification and default behavior of the button.
      */
    type: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    /**
      * Sets or retrieves the default or selected value of the control.
      */
    value: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Creates a TextRange object for the element.
      */
    createTextRange(): TextRange;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
}

declare var HTMLButtonElement: {
    prototype: HTMLButtonElement;
    new(): HTMLButtonElement;
}

interface HTMLCanvasElement extends HTMLElement {
    /**
      * Gets or sets the height of a canvas element on a document.
      */
    height: number;
    /**
      * Gets or sets the width of a canvas element on a document.
      */
    width: number;
    /**
      * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
      * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
      */
    getContext(contextId: "2d"): CanvasRenderingContext2D;
    getContext(contextId: "experimental-webgl"): WebGLRenderingContext;
    getContext(contextId: string, ...args: any[]): CanvasRenderingContext2D | WebGLRenderingContext;
    /**
      * Returns a blob object encoded as a Portable Network Graphics (PNG) format from a canvas image or drawing.
      */
    msToBlob(): Blob;
    /**
      * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
      * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
      */
    toDataURL(type?: string, ...args: any[]): string;
}

declare var HTMLCanvasElement: {
    prototype: HTMLCanvasElement;
    new(): HTMLCanvasElement;
}

interface HTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(nameOrIndex?: any, optionalIndex?: any): Element;
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): Element;
    [index: number]: Element;
}

declare var HTMLCollection: {
    prototype: HTMLCollection;
    new(): HTMLCollection;
}

interface HTMLDDElement extends HTMLElement {
    /**
      * Sets or retrieves whether the browser automatically performs wordwrap.
      */
    noWrap: boolean;
}

declare var HTMLDDElement: {
    prototype: HTMLDDElement;
    new(): HTMLDDElement;
}

interface HTMLDListElement extends HTMLElement {
    compact: boolean;
}

declare var HTMLDListElement: {
    prototype: HTMLDListElement;
    new(): HTMLDListElement;
}

interface HTMLDTElement extends HTMLElement {
    /**
      * Sets or retrieves whether the browser automatically performs wordwrap.
      */
    noWrap: boolean;
}

declare var HTMLDTElement: {
    prototype: HTMLDTElement;
    new(): HTMLDTElement;
}

interface HTMLDataListElement extends HTMLElement {
    options: HTMLCollection;
}

declare var HTMLDataListElement: {
    prototype: HTMLDataListElement;
    new(): HTMLDataListElement;
}

interface HTMLDirectoryElement extends HTMLElement {
    compact: boolean;
}

declare var HTMLDirectoryElement: {
    prototype: HTMLDirectoryElement;
    new(): HTMLDirectoryElement;
}

interface HTMLDivElement extends HTMLElement {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    /**
      * Sets or retrieves whether the browser automatically performs wordwrap.
      */
    noWrap: boolean;
}

declare var HTMLDivElement: {
    prototype: HTMLDivElement;
    new(): HTMLDivElement;
}

interface HTMLDocument extends Document {
}

declare var HTMLDocument: {
    prototype: HTMLDocument;
    new(): HTMLDocument;
}

interface HTMLElement extends Element {
    accessKey: string;
    children: HTMLCollection;
    contentEditable: string;
    dataset: DOMStringMap;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    hideFocus: boolean;
    innerHTML: string;
    innerText: string;
    isContentEditable: boolean;
    lang: string;
    offsetHeight: number;
    offsetLeft: number;
    offsetParent: Element;
    offsetTop: number;
    offsetWidth: number;
    onabort: (ev: Event) => any;
    onactivate: (ev: UIEvent) => any;
    onbeforeactivate: (ev: UIEvent) => any;
    onbeforecopy: (ev: DragEvent) => any;
    onbeforecut: (ev: DragEvent) => any;
    onbeforedeactivate: (ev: UIEvent) => any;
    onbeforepaste: (ev: DragEvent) => any;
    onblur: (ev: FocusEvent) => any;
    oncanplay: (ev: Event) => any;
    oncanplaythrough: (ev: Event) => any;
    onchange: (ev: Event) => any;
    onclick: (ev: MouseEvent) => any;
    oncontextmenu: (ev: PointerEvent) => any;
    oncopy: (ev: DragEvent) => any;
    oncuechange: (ev: Event) => any;
    oncut: (ev: DragEvent) => any;
    ondblclick: (ev: MouseEvent) => any;
    ondeactivate: (ev: UIEvent) => any;
    ondrag: (ev: DragEvent) => any;
    ondragend: (ev: DragEvent) => any;
    ondragenter: (ev: DragEvent) => any;
    ondragleave: (ev: DragEvent) => any;
    ondragover: (ev: DragEvent) => any;
    ondragstart: (ev: DragEvent) => any;
    ondrop: (ev: DragEvent) => any;
    ondurationchange: (ev: Event) => any;
    onemptied: (ev: Event) => any;
    onended: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onfocus: (ev: FocusEvent) => any;
    oninput: (ev: Event) => any;
    onkeydown: (ev: KeyboardEvent) => any;
    onkeypress: (ev: KeyboardEvent) => any;
    onkeyup: (ev: KeyboardEvent) => any;
    onload: (ev: Event) => any;
    onloadeddata: (ev: Event) => any;
    onloadedmetadata: (ev: Event) => any;
    onloadstart: (ev: Event) => any;
    onmousedown: (ev: MouseEvent) => any;
    onmouseenter: (ev: MouseEvent) => any;
    onmouseleave: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseout: (ev: MouseEvent) => any;
    onmouseover: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
    onmousewheel: (ev: MouseWheelEvent) => any;
    onmscontentzoom: (ev: UIEvent) => any;
    onmsmanipulationstatechanged: (ev: MSManipulationEvent) => any;
    onpaste: (ev: DragEvent) => any;
    onpause: (ev: Event) => any;
    onplay: (ev: Event) => any;
    onplaying: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    onratechange: (ev: Event) => any;
    onreset: (ev: Event) => any;
    onscroll: (ev: UIEvent) => any;
    onseeked: (ev: Event) => any;
    onseeking: (ev: Event) => any;
    onselect: (ev: UIEvent) => any;
    onselectstart: (ev: Event) => any;
    onstalled: (ev: Event) => any;
    onsubmit: (ev: Event) => any;
    onsuspend: (ev: Event) => any;
    ontimeupdate: (ev: Event) => any;
    onvolumechange: (ev: Event) => any;
    onwaiting: (ev: Event) => any;
    outerHTML: string;
    outerText: string;
    spellcheck: boolean;
    style: CSSStyleDeclaration;
    tabIndex: number;
    title: string;
    blur(): void;
    click(): void;
    contains(child: HTMLElement): boolean;
    dragDrop(): boolean;
    focus(): void;
    insertAdjacentElement(position: string, insertedElement: Element): Element;
    insertAdjacentHTML(where: string, html: string): void;
    insertAdjacentText(where: string, text: string): void;
    msGetInputContext(): MSInputMethodContext;
    scrollIntoView(top?: boolean): void;
    setActive(): void;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLElement: {
    prototype: HTMLElement;
    new(): HTMLElement;
}

interface HTMLEmbedElement extends HTMLElement, GetSVGDocument {
    /**
      * Sets or retrieves the height of the object.
      */
    height: string;
    hidden: any;
    /**
      * Gets or sets whether the DLNA PlayTo device is available.
      */
    msPlayToDisabled: boolean;
    /**
      * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
      */
    msPlayToPreferredSourceUri: string;
    /**
      * Gets or sets the primary DLNA PlayTo device.
      */
    msPlayToPrimary: boolean;
    /**
      * Gets the source associated with the media element for use by the PlayToManager.
      */
    msPlayToSource: any;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * Retrieves the palette used for the embedded document.
      */
    palette: string;
    /**
      * Retrieves the URL of the plug-in used to view an embedded document.
      */
    pluginspage: string;
    readyState: string;
    /**
      * Sets or retrieves a URL to be loaded by the object.
      */
    src: string;
    /**
      * Sets or retrieves the height and width units of the embed object.
      */
    units: string;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLEmbedElement: {
    prototype: HTMLEmbedElement;
    new(): HTMLEmbedElement;
}

interface HTMLFieldSetElement extends HTMLElement {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
}

declare var HTMLFieldSetElement: {
    prototype: HTMLFieldSetElement;
    new(): HTMLFieldSetElement;
}

interface HTMLFontElement extends HTMLElement, DOML2DeprecatedColorProperty, DOML2DeprecatedSizeProperty {
    /**
      * Sets or retrieves the current typeface family.
      */
    face: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLFontElement: {
    prototype: HTMLFontElement;
    new(): HTMLFontElement;
}

interface HTMLFormElement extends HTMLElement {
    /**
      * Sets or retrieves a list of character encodings for input data that must be accepted by the server processing the form.
      */
    acceptCharset: string;
    /**
      * Sets or retrieves the URL to which the form content is sent for processing.
      */
    action: string;
    /**
      * Specifies whether autocomplete is applied to an editable text field.
      */
    autocomplete: string;
    /**
      * Retrieves a collection, in source order, of all controls in a given form.
      */
    elements: HTMLCollection;
    /**
      * Sets or retrieves the MIME encoding for the form.
      */
    encoding: string;
    /**
      * Sets or retrieves the encoding type for the form.
      */
    enctype: string;
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Sets or retrieves how to send the form data to the server.
      */
    method: string;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * Designates a form that is not validated when submitted.
      */
    noValidate: boolean;
    /**
      * Sets or retrieves the window or frame at which to target content.
      */
    target: string;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Retrieves a form object or an object from an elements collection.
      * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is a Number, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
      * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
      */
    item(name?: any, index?: any): any;
    /**
      * Retrieves a form object or an object from an elements collection.
      */
    namedItem(name: string): any;
    /**
      * Fires when the user resets a form.
      */
    reset(): void;
    /**
      * Fires when a FORM is about to be submitted.
      */
    submit(): void;
    [name: string]: any;
}

declare var HTMLFormElement: {
    prototype: HTMLFormElement;
    new(): HTMLFormElement;
}

interface HTMLFrameElement extends HTMLElement, GetSVGDocument {
    /**
      * Specifies the properties of a border drawn around an object.
      */
    border: string;
    /**
      * Sets or retrieves the border color of the object.
      */
    borderColor: any;
    /**
      * Retrieves the document object of the page or frame.
      */
    contentDocument: Document;
    /**
      * Retrieves the object of the specified.
      */
    contentWindow: Window;
    /**
      * Sets or retrieves whether to display a border for the frame.
      */
    frameBorder: string;
    /**
      * Sets or retrieves the amount of additional space between the frames.
      */
    frameSpacing: any;
    /**
      * Sets or retrieves the height of the object.
      */
    height: string | number;
    /**
      * Sets or retrieves a URI to a long description of the object.
      */
    longDesc: string;
    /**
      * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
      */
    marginHeight: string;
    /**
      * Sets or retrieves the left and right margin widths before displaying the text in a frame.
      */
    marginWidth: string;
    /**
      * Sets or retrieves the frame name.
      */
    name: string;
    /**
      * Sets or retrieves whether the user can resize the frame.
      */
    noResize: boolean;
    /**
      * Raised when the object has been completely received from the server.
      */
    onload: (ev: Event) => any;
    /**
      * Sets or retrieves whether the frame can be scrolled.
      */
    scrolling: string;
    /**
      * Sets the value indicating whether the source file of a frame or iframe has specific security restrictions applied.
      */
    security: any;
    /**
      * Sets or retrieves a URL to be loaded by the object.
      */
    src: string;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string | number;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLFrameElement: {
    prototype: HTMLFrameElement;
    new(): HTMLFrameElement;
}

interface HTMLFrameSetElement extends HTMLElement {
    border: string;
    /**
      * Sets or retrieves the border color of the object.
      */
    borderColor: any;
    /**
      * Sets or retrieves the frame widths of the object.
      */
    cols: string;
    /**
      * Sets or retrieves whether to display a border for the frame.
      */
    frameBorder: string;
    /**
      * Sets or retrieves the amount of additional space between the frames.
      */
    frameSpacing: any;
    name: string;
    onafterprint: (ev: Event) => any;
    onbeforeprint: (ev: Event) => any;
    onbeforeunload: (ev: BeforeUnloadEvent) => any;
    /**
      * Fires when the object loses the input focus.
      */
    onblur: (ev: FocusEvent) => any;
    onerror: (ev: Event) => any;
    /**
      * Fires when the object receives focus.
      */
    onfocus: (ev: FocusEvent) => any;
    onhashchange: (ev: HashChangeEvent) => any;
    onload: (ev: Event) => any;
    onmessage: (ev: MessageEvent) => any;
    onoffline: (ev: Event) => any;
    ononline: (ev: Event) => any;
    onorientationchange: (ev: Event) => any;
    onpagehide: (ev: PageTransitionEvent) => any;
    onpageshow: (ev: PageTransitionEvent) => any;
    onresize: (ev: UIEvent) => any;
    onstorage: (ev: StorageEvent) => any;
    onunload: (ev: Event) => any;
    /**
      * Sets or retrieves the frame heights of the object.
      */
    rows: string;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeprint", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeunload", listener: (ev: BeforeUnloadEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "hashchange", listener: (ev: HashChangeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "offline", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "online", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "orientationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pagehide", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pageshow", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "resize", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "storage", listener: (ev: StorageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "unload", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLFrameSetElement: {
    prototype: HTMLFrameSetElement;
    new(): HTMLFrameSetElement;
}

interface HTMLHRElement extends HTMLElement, DOML2DeprecatedColorProperty, DOML2DeprecatedSizeProperty {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    /**
      * Sets or retrieves whether the horizontal rule is drawn with 3-D shading.
      */
    noShade: boolean;
    /**
      * Sets or retrieves the width of the object.
      */
    width: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLHRElement: {
    prototype: HTMLHRElement;
    new(): HTMLHRElement;
}

interface HTMLHeadElement extends HTMLElement {
    profile: string;
}

declare var HTMLHeadElement: {
    prototype: HTMLHeadElement;
    new(): HTMLHeadElement;
}

interface HTMLHeadingElement extends HTMLElement {
    /**
      * Sets or retrieves a value that indicates the table alignment.
      */
    align: string;
    clear: string;
}

declare var HTMLHeadingElement: {
    prototype: HTMLHeadingElement;
    new(): HTMLHeadingElement;
}

interface HTMLHtmlElement extends HTMLElement {
    /**
      * Sets or retrieves the DTD version that governs the current document.
      */
    version: string;
}

declare var HTMLHtmlElement: {
    prototype: HTMLHtmlElement;
    new(): HTMLHtmlElement;
}

interface HTMLIFrameElement extends HTMLElement, GetSVGDocument {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    allowFullscreen: boolean;
    /**
      * Specifies the properties of a border drawn around an object.
      */
    border: string;
    /**
      * Retrieves the document object of the page or frame.
      */
    contentDocument: Document;
    /**
      * Retrieves the object of the specified.
      */
    contentWindow: Window;
    /**
      * Sets or retrieves whether to display a border for the frame.
      */
    frameBorder: string;
    /**
      * Sets or retrieves the amount of additional space between the frames.
      */
    frameSpacing: any;
    /**
      * Sets or retrieves the height of the object.
      */
    height: string;
    /**
      * Sets or retrieves the horizontal margin for the object.
      */
    hspace: number;
    /**
      * Sets or retrieves a URI to a long description of the object.
      */
    longDesc: string;
    /**
      * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
      */
    marginHeight: string;
    /**
      * Sets or retrieves the left and right margin widths before displaying the text in a frame.
      */
    marginWidth: string;
    /**
      * Sets or retrieves the frame name.
      */
    name: string;
    /**
      * Sets or retrieves whether the user can resize the frame.
      */
    noResize: boolean;
    /**
      * Raised when the object has been completely received from the server.
      */
    onload: (ev: Event) => any;
    sandbox: DOMSettableTokenList;
    /**
      * Sets or retrieves whether the frame can be scrolled.
      */
    scrolling: string;
    /**
      * Sets the value indicating whether the source file of a frame or iframe has specific security restrictions applied.
      */
    security: any;
    /**
      * Sets or retrieves a URL to be loaded by the object.
      */
    src: string;
    /**
      * Sets or retrieves the vertical margin for the object.
      */
    vspace: number;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLIFrameElement: {
    prototype: HTMLIFrameElement;
    new(): HTMLIFrameElement;
}

interface HTMLImageElement extends HTMLElement {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    /**
      * Sets or retrieves a text alternative to the graphic.
      */
    alt: string;
    /**
      * Specifies the properties of a border drawn around an object.
      */
    border: string;
    /**
      * Retrieves whether the object is fully loaded.
      */
    complete: boolean;
    crossOrigin: string;
    currentSrc: string;
    /**
      * Sets or retrieves the height of the object.
      */
    height: number;
    /**
      * Sets or retrieves the width of the border to draw around the object.
      */
    hspace: number;
    /**
      * Sets or retrieves whether the image is a server-side image map.
      */
    isMap: boolean;
    /**
      * Sets or retrieves a Uniform Resource Identifier (URI) to a long description of the object.
      */
    longDesc: string;
    /**
      * Gets or sets whether the DLNA PlayTo device is available.
      */
    msPlayToDisabled: boolean;
    msPlayToPreferredSourceUri: string;
    /**
      * Gets or sets the primary DLNA PlayTo device.
      */
    msPlayToPrimary: boolean;
    /**
      * Gets the source associated with the media element for use by the PlayToManager.
      */
    msPlayToSource: any;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * The original height of the image resource before sizing.
      */
    naturalHeight: number;
    /**
      * The original width of the image resource before sizing.
      */
    naturalWidth: number;
    /**
      * The address or URL of the a media resource that is to be considered.
      */
    src: string;
    srcset: string;
    /**
      * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
      */
    useMap: string;
    /**
      * Sets or retrieves the vertical margin for the object.
      */
    vspace: number;
    /**
      * Sets or retrieves the width of the object.
      */
    width: number;
    x: number;
    y: number;
    msGetAsCastingSource(): any;
}

declare var HTMLImageElement: {
    prototype: HTMLImageElement;
    new(): HTMLImageElement;
    create(): HTMLImageElement;
}

interface HTMLInputElement extends HTMLElement {
    /**
      * Sets or retrieves a comma-separated list of content types.
      */
    accept: string;
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    /**
      * Sets or retrieves a text alternative to the graphic.
      */
    alt: string;
    /**
      * Specifies whether autocomplete is applied to an editable text field.
      */
    autocomplete: string;
    /**
      * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
      */
    autofocus: boolean;
    /**
      * Sets or retrieves the width of the border to draw around the object.
      */
    border: string;
    /**
      * Sets or retrieves the state of the check box or radio button.
      */
    checked: boolean;
    /**
      * Retrieves whether the object is fully loaded.
      */
    complete: boolean;
    /**
      * Sets or retrieves the state of the check box or radio button.
      */
    defaultChecked: boolean;
    /**
      * Sets or retrieves the initial contents of the object.
      */
    defaultValue: string;
    disabled: boolean;
    /**
      * Returns a FileList object on a file type input object.
      */
    files: FileList;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Overrides the action attribute (where the data on a form is sent) on the parent form element.
      */
    formAction: string;
    /**
      * Used to override the encoding (formEnctype attribute) specified on the form element.
      */
    formEnctype: string;
    /**
      * Overrides the submit method attribute previously specified on a form element.
      */
    formMethod: string;
    /**
      * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
      */
    formNoValidate: string;
    /**
      * Overrides the target attribute on a form element.
      */
    formTarget: string;
    /**
      * Sets or retrieves the height of the object.
      */
    height: string;
    /**
      * Sets or retrieves the width of the border to draw around the object.
      */
    hspace: number;
    indeterminate: boolean;
    /**
      * Specifies the ID of a pre-defined datalist of options for an input element.
      */
    list: HTMLElement;
    /**
      * Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field.
      */
    max: string;
    /**
      * Sets or retrieves the maximum number of characters that the user can enter in a text control.
      */
    maxLength: number;
    /**
      * Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field.
      */
    min: string;
    /**
      * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
      */
    multiple: boolean;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * Gets or sets a string containing a regular expression that the user's input must match.
      */
    pattern: string;
    /**
      * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
      */
    placeholder: string;
    readOnly: boolean;
    /**
      * When present, marks an element that can't be submitted without a value.
      */
    required: boolean;
    /**
      * Gets or sets the end position or offset of a text selection.
      */
    selectionEnd: number;
    /**
      * Gets or sets the starting position or offset of a text selection.
      */
    selectionStart: number;
    size: number;
    /**
      * The address or URL of the a media resource that is to be considered.
      */
    src: string;
    status: boolean;
    /**
      * Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field.
      */
    step: string;
    /**
      * Returns the content type of the object.
      */
    type: string;
    /**
      * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
      */
    useMap: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    /**
      * Returns the value of the data at the cursor's current position.
      */
    value: string;
    valueAsDate: Date;
    /**
      * Returns the input field value as a number.
      */
    valueAsNumber: number;
    /**
      * Sets or retrieves the vertical margin for the object.
      */
    vspace: number;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Creates a TextRange object for the element.
      */
    createTextRange(): TextRange;
    /**
      * Makes the selection equal to the current object.
      */
    select(): void;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
    /**
      * Sets the start and end positions of a selection in a text field.
      * @param start The offset into the text field for the start of the selection.
      * @param end The offset into the text field for the end of the selection.
      */
    setSelectionRange(start: number, end: number): void;
    /**
      * Decrements a range input control's value by the value given by the Step attribute. If the optional parameter is used, it will decrement the input control's step value multiplied by the parameter's value.
      * @param n Value to decrement the value by.
      */
    stepDown(n?: number): void;
    /**
      * Increments a range input control's value by the value given by the Step attribute. If the optional parameter is used, will increment the input control's value by that value.
      * @param n Value to increment the value by.
      */
    stepUp(n?: number): void;
}

declare var HTMLInputElement: {
    prototype: HTMLInputElement;
    new(): HTMLInputElement;
}

interface HTMLIsIndexElement extends HTMLElement {
    /**
      * Sets or retrieves the URL to which the form content is sent for processing.
      */
    action: string;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    prompt: string;
}

declare var HTMLIsIndexElement: {
    prototype: HTMLIsIndexElement;
    new(): HTMLIsIndexElement;
}

interface HTMLLIElement extends HTMLElement {
    type: string;
    /**
      * Sets or retrieves the value of a list item.
      */
    value: number;
}

declare var HTMLLIElement: {
    prototype: HTMLLIElement;
    new(): HTMLLIElement;
}

interface HTMLLabelElement extends HTMLElement {
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the object to which the given label object is assigned.
      */
    htmlFor: string;
}

declare var HTMLLabelElement: {
    prototype: HTMLLabelElement;
    new(): HTMLLabelElement;
}

interface HTMLLegendElement extends HTMLElement {
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    align: string;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
}

declare var HTMLLegendElement: {
    prototype: HTMLLegendElement;
    new(): HTMLLegendElement;
}

interface HTMLLinkElement extends HTMLElement, LinkStyle {
    /**
      * Sets or retrieves the character set used to encode the object.
      */
    charset: string;
    disabled: boolean;
    /**
      * Sets or retrieves a destination URL or an anchor point.
      */
    href: string;
    /**
      * Sets or retrieves the language code of the object.
      */
    hreflang: string;
    /**
      * Sets or retrieves the media type.
      */
    media: string;
    /**
      * Sets or retrieves the relationship between the object and the destination of the link.
      */
    rel: string;
    /**
      * Sets or retrieves the relationship between the object and the destination of the link.
      */
    rev: string;
    /**
      * Sets or retrieves the window or frame at which to target content.
      */
    target: string;
    /**
      * Sets or retrieves the MIME type of the object.
      */
    type: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLLinkElement: {
    prototype: HTMLLinkElement;
    new(): HTMLLinkElement;
}

interface HTMLMapElement extends HTMLElement {
    /**
      * Retrieves a collection of the area objects defined for the given map object.
      */
    areas: HTMLAreasCollection;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
}

declare var HTMLMapElement: {
    prototype: HTMLMapElement;
    new(): HTMLMapElement;
}

interface HTMLMarqueeElement extends HTMLElement {
    behavior: string;
    bgColor: any;
    direction: string;
    height: string;
    hspace: number;
    loop: number;
    onbounce: (ev: Event) => any;
    onfinish: (ev: Event) => any;
    onstart: (ev: Event) => any;
    scrollAmount: number;
    scrollDelay: number;
    trueSpeed: boolean;
    vspace: number;
    width: string;
    start(): void;
    stop(): void;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "bounce", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "finish", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "start", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLMarqueeElement: {
    prototype: HTMLMarqueeElement;
    new(): HTMLMarqueeElement;
}

interface HTMLMediaElement extends HTMLElement {
    /**
      * Returns an AudioTrackList object with the audio tracks for a given video element.
      */
    audioTracks: AudioTrackList;
    /**
      * Gets or sets a value that indicates whether to start playing the media automatically.
      */
    autoplay: boolean;
    /**
      * Gets a collection of buffered time ranges.
      */
    buffered: TimeRanges;
    /**
      * Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the developer does not include controls for the player).
      */
    controls: boolean;
    /**
      * Gets the address or URL of the current media resource that is selected by IHTMLMediaElement.
      */
    currentSrc: string;
    /**
      * Gets or sets the current playback position, in seconds.
      */
    currentTime: number;
    defaultMuted: boolean;
    /**
      * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource.
      */
    defaultPlaybackRate: number;
    /**
      * Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
      */
    duration: number;
    /**
      * Gets information about whether the playback has ended or not.
      */
    ended: boolean;
    /**
      * Returns an object representing the current error state of the audio or video element.
      */
    error: MediaError;
    /**
      * Gets or sets a flag to specify whether playback should restart after it completes.
      */
    loop: boolean;
    /**
      * Specifies the purpose of the audio or video media, such as background audio or alerts.
      */
    msAudioCategory: string;
    /**
      * Specifies the output device id that the audio will be sent to.
      */
    msAudioDeviceType: string;
    msGraphicsTrustStatus: MSGraphicsTrust;
    /**
      * Gets the MSMediaKeys object, which is used for decrypting media data, that is associated with this media element.
      */
    msKeys: MSMediaKeys;
    /**
      * Gets or sets whether the DLNA PlayTo device is available.
      */
    msPlayToDisabled: boolean;
    /**
      * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
      */
    msPlayToPreferredSourceUri: string;
    /**
      * Gets or sets the primary DLNA PlayTo device.
      */
    msPlayToPrimary: boolean;
    /**
      * Gets the source associated with the media element for use by the PlayToManager.
      */
    msPlayToSource: any;
    /**
      * Specifies whether or not to enable low-latency playback on the media element.
      */
    msRealTime: boolean;
    /**
      * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
      */
    muted: boolean;
    /**
      * Gets the current network activity for the element.
      */
    networkState: number;
    onmsneedkey: (ev: MSMediaKeyNeededEvent) => any;
    /**
      * Gets a flag that specifies whether playback is paused.
      */
    paused: boolean;
    /**
      * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource.
      */
    playbackRate: number;
    /**
      * Gets TimeRanges for the current media resource that has been played.
      */
    played: TimeRanges;
    /**
      * Gets or sets the current playback position, in seconds.
      */
    preload: string;
    readyState: any;
    /**
      * Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked.
      */
    seekable: TimeRanges;
    /**
      * Gets a flag that indicates whether the the client is currently moving to a new playback position in the media resource.
      */
    seeking: boolean;
    /**
      * The address or URL of the a media resource that is to be considered.
      */
    src: string;
    textTracks: TextTrackList;
    videoTracks: VideoTrackList;
    /**
      * Gets or sets the volume level for audio portions of the media element.
      */
    volume: number;
    addTextTrack(kind: string, label?: string, language?: string): TextTrack;
    /**
      * Returns a string that specifies whether the client can play a given media resource type.
      */
    canPlayType(type: string): string;
    /**
      * Fires immediately after the client loads the object.
      */
    load(): void;
    /**
      * Clears all effects from the media pipeline.
      */
    msClearEffects(): void;
    msGetAsCastingSource(): any;
    /**
      * Inserts the specified audio effect into media pipeline.
      */
    msInsertAudioEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
    msSetMediaKeys(mediaKeys: MSMediaKeys): void;
    /**
      * Specifies the media protection manager for a given media pipeline.
      */
    msSetMediaProtectionManager(mediaProtectionManager?: any): void;
    /**
      * Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not.
      */
    pause(): void;
    /**
      * Loads and starts playback of a media resource.
      */
    play(): void;
    HAVE_CURRENT_DATA: number;
    HAVE_ENOUGH_DATA: number;
    HAVE_FUTURE_DATA: number;
    HAVE_METADATA: number;
    HAVE_NOTHING: number;
    NETWORK_EMPTY: number;
    NETWORK_IDLE: number;
    NETWORK_LOADING: number;
    NETWORK_NO_SOURCE: number;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "msneedkey", listener: (ev: MSMediaKeyNeededEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLMediaElement: {
    prototype: HTMLMediaElement;
    new(): HTMLMediaElement;
    HAVE_CURRENT_DATA: number;
    HAVE_ENOUGH_DATA: number;
    HAVE_FUTURE_DATA: number;
    HAVE_METADATA: number;
    HAVE_NOTHING: number;
    NETWORK_EMPTY: number;
    NETWORK_IDLE: number;
    NETWORK_LOADING: number;
    NETWORK_NO_SOURCE: number;
}

interface HTMLMenuElement extends HTMLElement {
    compact: boolean;
    type: string;
}

declare var HTMLMenuElement: {
    prototype: HTMLMenuElement;
    new(): HTMLMenuElement;
}

interface HTMLMetaElement extends HTMLElement {
    /**
      * Sets or retrieves the character set used to encode the object.
      */
    charset: string;
    /**
      * Gets or sets meta-information to associate with httpEquiv or name.
      */
    content: string;
    /**
      * Gets or sets information used to bind the value of a content attribute of a meta element to an HTTP response header.
      */
    httpEquiv: string;
    /**
      * Sets or retrieves the value specified in the content attribute of the meta object.
      */
    name: string;
    /**
      * Sets or retrieves a scheme to be used in interpreting the value of a property specified for the object.
      */
    scheme: string;
    /**
      * Sets or retrieves the URL property that will be loaded after the specified time has elapsed.
      */
    url: string;
}

declare var HTMLMetaElement: {
    prototype: HTMLMetaElement;
    new(): HTMLMetaElement;
}

interface HTMLModElement extends HTMLElement {
    /**
      * Sets or retrieves reference information about the object.
      */
    cite: string;
    /**
      * Sets or retrieves the date and time of a modification to the object.
      */
    dateTime: string;
}

declare var HTMLModElement: {
    prototype: HTMLModElement;
    new(): HTMLModElement;
}

interface HTMLNextIdElement extends HTMLElement {
    n: string;
}

declare var HTMLNextIdElement: {
    prototype: HTMLNextIdElement;
    new(): HTMLNextIdElement;
}

interface HTMLOListElement extends HTMLElement {
    compact: boolean;
    /**
      * The starting number.
      */
    start: number;
    type: string;
}

declare var HTMLOListElement: {
    prototype: HTMLOListElement;
    new(): HTMLOListElement;
}

interface HTMLObjectElement extends HTMLElement, GetSVGDocument {
    /**
      * Retrieves a string of the URL where the object tag can be found. This is often the href of the document that the object is in, or the value set by a base element.
      */
    BaseHref: string;
    align: string;
    /**
      * Sets or retrieves a text alternative to the graphic.
      */
    alt: string;
    /**
      * Gets or sets the optional alternative HTML script to execute if the object fails to load.
      */
    altHtml: string;
    /**
      * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
      */
    archive: string;
    border: string;
    /**
      * Sets or retrieves the URL of the file containing the compiled Java class.
      */
    code: string;
    /**
      * Sets or retrieves the URL of the component.
      */
    codeBase: string;
    /**
      * Sets or retrieves the Internet media type for the code associated with the object.
      */
    codeType: string;
    /**
      * Retrieves the document object of the page or frame.
      */
    contentDocument: Document;
    /**
      * Sets or retrieves the URL that references the data of the object.
      */
    data: string;
    declare: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the height of the object.
      */
    height: string;
    hspace: number;
    /**
      * Gets or sets whether the DLNA PlayTo device is available.
      */
    msPlayToDisabled: boolean;
    /**
      * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
      */
    msPlayToPreferredSourceUri: string;
    /**
      * Gets or sets the primary DLNA PlayTo device.
      */
    msPlayToPrimary: boolean;
    /**
      * Gets the source associated with the media element for use by the PlayToManager.
      */
    msPlayToSource: any;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * Retrieves the contained object.
      */
    object: any;
    readyState: number;
    /**
      * Sets or retrieves a message to be displayed while an object is loading.
      */
    standby: string;
    /**
      * Sets or retrieves the MIME type of the object.
      */
    type: string;
    /**
      * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
      */
    useMap: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    vspace: number;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLObjectElement: {
    prototype: HTMLObjectElement;
    new(): HTMLObjectElement;
}

interface HTMLOptGroupElement extends HTMLElement {
    /**
      * Sets or retrieves the status of an option.
      */
    defaultSelected: boolean;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the ordinal position of an option in a list box.
      */
    index: number;
    /**
      * Sets or retrieves a value that you can use to implement your own label functionality for the object.
      */
    label: string;
    /**
      * Sets or retrieves whether the option in the list box is the default item.
      */
    selected: boolean;
    /**
      * Sets or retrieves the text string specified by the option tag.
      */
    text: string;
    /**
      * Sets or retrieves the value which is returned to the server when the form control is submitted.
      */
    value: string;
}

declare var HTMLOptGroupElement: {
    prototype: HTMLOptGroupElement;
    new(): HTMLOptGroupElement;
}

interface HTMLOptionElement extends HTMLElement {
    /**
      * Sets or retrieves the status of an option.
      */
    defaultSelected: boolean;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the ordinal position of an option in a list box.
      */
    index: number;
    /**
      * Sets or retrieves a value that you can use to implement your own label functionality for the object.
      */
    label: string;
    /**
      * Sets or retrieves whether the option in the list box is the default item.
      */
    selected: boolean;
    /**
      * Sets or retrieves the text string specified by the option tag.
      */
    text: string;
    /**
      * Sets or retrieves the value which is returned to the server when the form control is submitted.
      */
    value: string;
}

declare var HTMLOptionElement: {
    prototype: HTMLOptionElement;
    new(): HTMLOptionElement;
    create(): HTMLOptionElement;
}

interface HTMLParagraphElement extends HTMLElement {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    clear: string;
}

declare var HTMLParagraphElement: {
    prototype: HTMLParagraphElement;
    new(): HTMLParagraphElement;
}

interface HTMLParamElement extends HTMLElement {
    /**
      * Sets or retrieves the name of an input parameter for an element.
      */
    name: string;
    /**
      * Sets or retrieves the content type of the resource designated by the value attribute.
      */
    type: string;
    /**
      * Sets or retrieves the value of an input parameter for an element.
      */
    value: string;
    /**
      * Sets or retrieves the data type of the value attribute.
      */
    valueType: string;
}

declare var HTMLParamElement: {
    prototype: HTMLParamElement;
    new(): HTMLParamElement;
}

interface HTMLPhraseElement extends HTMLElement {
    /**
      * Sets or retrieves reference information about the object.
      */
    cite: string;
    /**
      * Sets or retrieves the date and time of a modification to the object.
      */
    dateTime: string;
}

declare var HTMLPhraseElement: {
    prototype: HTMLPhraseElement;
    new(): HTMLPhraseElement;
}

interface HTMLPreElement extends HTMLElement {
    /**
      * Indicates a citation by rendering text in italic type.
      */
    cite: string;
    clear: string;
    /**
      * Sets or gets a value that you can use to implement your own width functionality for the object.
      */
    width: number;
}

declare var HTMLPreElement: {
    prototype: HTMLPreElement;
    new(): HTMLPreElement;
}

interface HTMLProgressElement extends HTMLElement {
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Defines the maximum, or "done" value for a progress element.
      */
    max: number;
    /**
      * Returns the quotient of value/max when the value attribute is set (determinate progress bar), or -1 when the value attribute is missing (indeterminate progress bar).
      */
    position: number;
    /**
      * Sets or gets the current value of a progress element. The value must be a non-negative number between 0 and the max value.
      */
    value: number;
}

declare var HTMLProgressElement: {
    prototype: HTMLProgressElement;
    new(): HTMLProgressElement;
}

interface HTMLQuoteElement extends HTMLElement {
    /**
      * Sets or retrieves reference information about the object.
      */
    cite: string;
    /**
      * Sets or retrieves the date and time of a modification to the object.
      */
    dateTime: string;
}

declare var HTMLQuoteElement: {
    prototype: HTMLQuoteElement;
    new(): HTMLQuoteElement;
}

interface HTMLScriptElement extends HTMLElement {
    async: boolean;
    /**
      * Sets or retrieves the character set used to encode the object.
      */
    charset: string;
    /**
      * Sets or retrieves the status of the script.
      */
    defer: boolean;
    /**
      * Sets or retrieves the event for which the script is written.
      */
    event: string;
    /**
      * Sets or retrieves the object that is bound to the event script.
      */
    htmlFor: string;
    /**
      * Retrieves the URL to an external file that contains the source code or data.
      */
    src: string;
    /**
      * Retrieves or sets the text of the object as a string.
      */
    text: string;
    /**
      * Sets or retrieves the MIME type for the associated scripting engine.
      */
    type: string;
}

declare var HTMLScriptElement: {
    prototype: HTMLScriptElement;
    new(): HTMLScriptElement;
}

interface HTMLSelectElement extends HTMLElement {
    /**
      * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
      */
    autofocus: boolean;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
      */
    multiple: boolean;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    options: HTMLSelectElement;
    /**
      * When present, marks an element that can't be submitted without a value.
      */
    required: boolean;
    /**
      * Sets or retrieves the index of the selected option in a select object.
      */
    selectedIndex: number;
    /**
      * Sets or retrieves the number of rows in the list box.
      */
    size: number;
    /**
      * Retrieves the type of select control based on the value of the MULTIPLE attribute.
      */
    type: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    /**
      * Sets or retrieves the value which is returned to the server when the form control is submitted.
      */
    value: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Adds an element to the areas, controlRange, or options collection.
      * @param element Variant of type Number that specifies the index position in the collection where the element is placed. If no value is given, the method places the element at the end of the collection.
      * @param before Variant of type Object that specifies an element to insert before, or null to append the object to the collection.
      */
    add(element: HTMLElement, before?: HTMLElement | number): void;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Retrieves a select object or an object from an options collection.
      * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is an integer, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
      * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
      */
    item(name?: any, index?: any): any;
    /**
      * Retrieves a select object or an object from an options collection.
      * @param namedItem A String that specifies the name or id property of the object to retrieve. A collection is returned if more than one match is made.
      */
    namedItem(name: string): any;
    /**
      * Removes an element from the collection.
      * @param index Number that specifies the zero-based index of the element to remove from the collection.
      */
    remove(index?: number): void;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
    [name: string]: any;
}

declare var HTMLSelectElement: {
    prototype: HTMLSelectElement;
    new(): HTMLSelectElement;
}

interface HTMLSourceElement extends HTMLElement {
    /**
      * Gets or sets the intended media type of the media source.
     */
    media: string;
    msKeySystem: string;
    /**
      * The address or URL of the a media resource that is to be considered.
      */
    src: string;
    /**
     * Gets or sets the MIME type of a media resource.
     */
    type: string;
}

declare var HTMLSourceElement: {
    prototype: HTMLSourceElement;
    new(): HTMLSourceElement;
}

interface HTMLSpanElement extends HTMLElement {
}

declare var HTMLSpanElement: {
    prototype: HTMLSpanElement;
    new(): HTMLSpanElement;
}

interface HTMLStyleElement extends HTMLElement, LinkStyle {
    /**
      * Sets or retrieves the media type.
      */
    media: string;
    /**
      * Retrieves the CSS language in which the style sheet is written.
      */
    type: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLStyleElement: {
    prototype: HTMLStyleElement;
    new(): HTMLStyleElement;
}

interface HTMLTableCaptionElement extends HTMLElement {
    /**
      * Sets or retrieves the alignment of the caption or legend.
      */
    align: string;
    /**
      * Sets or retrieves whether the caption appears at the top or bottom of the table.
      */
    vAlign: string;
}

declare var HTMLTableCaptionElement: {
    prototype: HTMLTableCaptionElement;
    new(): HTMLTableCaptionElement;
}

interface HTMLTableCellElement extends HTMLElement, HTMLTableAlignment {
    /**
      * Sets or retrieves abbreviated text for the object.
      */
    abbr: string;
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    /**
      * Sets or retrieves a comma-delimited list of conceptual categories associated with the object.
      */
    axis: string;
    bgColor: any;
    /**
      * Retrieves the position of the object in the cells collection of a row.
      */
    cellIndex: number;
    /**
      * Sets or retrieves the number columns in the table that the object should span.
      */
    colSpan: number;
    /**
      * Sets or retrieves a list of header cells that provide information for the object.
      */
    headers: string;
    /**
      * Sets or retrieves the height of the object.
      */
    height: any;
    /**
      * Sets or retrieves whether the browser automatically performs wordwrap.
      */
    noWrap: boolean;
    /**
      * Sets or retrieves how many rows in a table the cell should span.
      */
    rowSpan: number;
    /**
      * Sets or retrieves the group of cells in a table to which the object's information applies.
      */
    scope: string;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLTableCellElement: {
    prototype: HTMLTableCellElement;
    new(): HTMLTableCellElement;
}

interface HTMLTableColElement extends HTMLElement, HTMLTableAlignment {
    /**
      * Sets or retrieves the alignment of the object relative to the display or table.
      */
    align: string;
    /**
      * Sets or retrieves the number of columns in the group.
      */
    span: number;
    /**
      * Sets or retrieves the width of the object.
      */
    width: any;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLTableColElement: {
    prototype: HTMLTableColElement;
    new(): HTMLTableColElement;
}

interface HTMLTableDataCellElement extends HTMLTableCellElement {
}

declare var HTMLTableDataCellElement: {
    prototype: HTMLTableDataCellElement;
    new(): HTMLTableDataCellElement;
}

interface HTMLTableElement extends HTMLElement {
    /**
      * Sets or retrieves a value that indicates the table alignment.
      */
    align: string;
    bgColor: any;
    /**
      * Sets or retrieves the width of the border to draw around the object.
      */
    border: string;
    /**
      * Sets or retrieves the border color of the object.
      */
    borderColor: any;
    /**
      * Retrieves the caption object of a table.
      */
    caption: HTMLTableCaptionElement;
    /**
      * Sets or retrieves the amount of space between the border of the cell and the content of the cell.
      */
    cellPadding: string;
    /**
      * Sets or retrieves the amount of space between cells in a table.
      */
    cellSpacing: string;
    /**
      * Sets or retrieves the number of columns in the table.
      */
    cols: number;
    /**
      * Sets or retrieves the way the border frame around the table is displayed.
      */
    frame: string;
    /**
      * Sets or retrieves the height of the object.
      */
    height: any;
    /**
      * Sets or retrieves the number of horizontal rows contained in the object.
      */
    rows: HTMLCollection;
    /**
      * Sets or retrieves which dividing lines (inner borders) are displayed.
      */
    rules: string;
    /**
      * Sets or retrieves a description and/or structure of the object.
      */
    summary: string;
    /**
      * Retrieves a collection of all tBody objects in the table. Objects in this collection are in source order.
      */
    tBodies: HTMLCollection;
    /**
      * Retrieves the tFoot object of the table.
      */
    tFoot: HTMLTableSectionElement;
    /**
      * Retrieves the tHead object of the table.
      */
    tHead: HTMLTableSectionElement;
    /**
      * Sets or retrieves the width of the object.
      */
    width: string;
    /**
      * Creates an empty caption element in the table.
      */
    createCaption(): HTMLElement;
    /**
      * Creates an empty tBody element in the table.
      */
    createTBody(): HTMLElement;
    /**
      * Creates an empty tFoot element in the table.
      */
    createTFoot(): HTMLElement;
    /**
      * Returns the tHead element object if successful, or null otherwise.
      */
    createTHead(): HTMLElement;
    /**
      * Deletes the caption element and its contents from the table.
      */
    deleteCaption(): void;
    /**
      * Removes the specified row (tr) from the element and from the rows collection.
      * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
      */
    deleteRow(index?: number): void;
    /**
      * Deletes the tFoot element and its contents from the table.
      */
    deleteTFoot(): void;
    /**
      * Deletes the tHead element and its contents from the table.
      */
    deleteTHead(): void;
    /**
      * Creates a new row (tr) in the table, and adds the row to the rows collection.
      * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
      */
    insertRow(index?: number): HTMLElement;
}

declare var HTMLTableElement: {
    prototype: HTMLTableElement;
    new(): HTMLTableElement;
}

interface HTMLTableHeaderCellElement extends HTMLTableCellElement {
    /**
      * Sets or retrieves the group of cells in a table to which the object's information applies.
      */
    scope: string;
}

declare var HTMLTableHeaderCellElement: {
    prototype: HTMLTableHeaderCellElement;
    new(): HTMLTableHeaderCellElement;
}

interface HTMLTableRowElement extends HTMLElement, HTMLTableAlignment {
    /**
      * Sets or retrieves how the object is aligned with adjacent text.
      */
    align: string;
    bgColor: any;
    /**
      * Retrieves a collection of all cells in the table row.
      */
    cells: HTMLCollection;
    /**
      * Sets or retrieves the height of the object.
      */
    height: any;
    /**
      * Retrieves the position of the object in the rows collection for the table.
      */
    rowIndex: number;
    /**
      * Retrieves the position of the object in the collection.
      */
    sectionRowIndex: number;
    /**
      * Removes the specified cell from the table row, as well as from the cells collection.
      * @param index Number that specifies the zero-based position of the cell to remove from the table row. If no value is provided, the last cell in the cells collection is deleted.
      */
    deleteCell(index?: number): void;
    /**
      * Creates a new cell in the table row, and adds the cell to the cells collection.
      * @param index Number that specifies where to insert the cell in the tr. The default value is -1, which appends the new cell to the end of the cells collection.
      */
    insertCell(index?: number): HTMLElement;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLTableRowElement: {
    prototype: HTMLTableRowElement;
    new(): HTMLTableRowElement;
}

interface HTMLTableSectionElement extends HTMLElement, HTMLTableAlignment {
    /**
      * Sets or retrieves a value that indicates the table alignment.
      */
    align: string;
    /**
      * Sets or retrieves the number of horizontal rows contained in the object.
      */
    rows: HTMLCollection;
    /**
      * Removes the specified row (tr) from the element and from the rows collection.
      * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
      */
    deleteRow(index?: number): void;
    /**
      * Creates a new row (tr) in the table, and adds the row to the rows collection.
      * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
      */
    insertRow(index?: number): HTMLElement;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLTableSectionElement: {
    prototype: HTMLTableSectionElement;
    new(): HTMLTableSectionElement;
}

interface HTMLTextAreaElement extends HTMLElement {
    /**
      * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
      */
    autofocus: boolean;
    /**
      * Sets or retrieves the width of the object.
      */
    cols: number;
    /**
      * Sets or retrieves the initial contents of the object.
      */
    defaultValue: string;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the maximum number of characters that the user can enter in a text control.
      */
    maxLength: number;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
      */
    placeholder: string;
    /**
      * Sets or retrieves the value indicated whether the content of the object is read-only.
      */
    readOnly: boolean;
    /**
      * When present, marks an element that can't be submitted without a value.
      */
    required: boolean;
    /**
      * Sets or retrieves the number of horizontal rows contained in the object.
      */
    rows: number;
    /**
      * Gets or sets the end position or offset of a text selection.
      */
    selectionEnd: number;
    /**
      * Gets or sets the starting position or offset of a text selection.
      */
    selectionStart: number;
    /**
      * Sets or retrieves the value indicating whether the control is selected.
      */
    status: any;
    /**
      * Retrieves the type of control.
      */
    type: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    /**
      * Retrieves or sets the text in the entry field of the textArea element.
      */
    value: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Sets or retrieves how to handle wordwrapping in the object.
      */
    wrap: string;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Creates a TextRange object for the element.
      */
    createTextRange(): TextRange;
    /**
      * Highlights the input area of a form element.
      */
    select(): void;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
    /**
      * Sets the start and end positions of a selection in a text field.
      * @param start The offset into the text field for the start of the selection.
      * @param end The offset into the text field for the end of the selection.
      */
    setSelectionRange(start: number, end: number): void;
}

declare var HTMLTextAreaElement: {
    prototype: HTMLTextAreaElement;
    new(): HTMLTextAreaElement;
}

interface HTMLTitleElement extends HTMLElement {
    /**
      * Retrieves or sets the text of the object as a string.
      */
    text: string;
}

declare var HTMLTitleElement: {
    prototype: HTMLTitleElement;
    new(): HTMLTitleElement;
}

interface HTMLTrackElement extends HTMLElement {
    default: boolean;
    kind: string;
    label: string;
    readyState: number;
    src: string;
    srclang: string;
    track: TextTrack;
    ERROR: number;
    LOADED: number;
    LOADING: number;
    NONE: number;
}

declare var HTMLTrackElement: {
    prototype: HTMLTrackElement;
    new(): HTMLTrackElement;
    ERROR: number;
    LOADED: number;
    LOADING: number;
    NONE: number;
}

interface HTMLUListElement extends HTMLElement {
    compact: boolean;
    type: string;
}

declare var HTMLUListElement: {
    prototype: HTMLUListElement;
    new(): HTMLUListElement;
}

interface HTMLUnknownElement extends HTMLElement {
}

declare var HTMLUnknownElement: {
    prototype: HTMLUnknownElement;
    new(): HTMLUnknownElement;
}

interface HTMLVideoElement extends HTMLMediaElement {
    /**
      * Gets or sets the height of the video element.
      */
    height: number;
    msHorizontalMirror: boolean;
    msIsLayoutOptimalForPlayback: boolean;
    msIsStereo3D: boolean;
    msStereo3DPackingMode: string;
    msStereo3DRenderMode: string;
    msZoom: boolean;
    onMSVideoFormatChanged: (ev: Event) => any;
    onMSVideoFrameStepCompleted: (ev: Event) => any;
    onMSVideoOptimalLayoutChanged: (ev: Event) => any;
    /**
      * Gets or sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
      */
    poster: string;
    /**
      * Gets the intrinsic height of a video in CSS pixels, or zero if the dimensions are not known.
      */
    videoHeight: number;
    /**
      * Gets the intrinsic width of a video in CSS pixels, or zero if the dimensions are not known.
      */
    videoWidth: number;
    webkitDisplayingFullscreen: boolean;
    webkitSupportsFullscreen: boolean;
    /**
      * Gets or sets the width of the video element.
      */
    width: number;
    getVideoPlaybackQuality(): VideoPlaybackQuality;
    msFrameStep(forward: boolean): void;
    msInsertVideoEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
    msSetVideoRectangle(left: number, top: number, right: number, bottom: number): void;
    webkitEnterFullScreen(): void;
    webkitEnterFullscreen(): void;
    webkitExitFullScreen(): void;
    webkitExitFullscreen(): void;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSVideoFormatChanged", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "MSVideoFrameStepCompleted", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "MSVideoOptimalLayoutChanged", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "msneedkey", listener: (ev: MSMediaKeyNeededEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var HTMLVideoElement: {
    prototype: HTMLVideoElement;
    new(): HTMLVideoElement;
}

interface HashChangeEvent extends Event {
    newURL: string;
    oldURL: string;
}

declare var HashChangeEvent: {
    prototype: HashChangeEvent;
    new(type: string, eventInitDict?: HashChangeEventInit): HashChangeEvent;
}

interface History {
    length: number;
    state: any;
    back(distance?: any): void;
    forward(distance?: any): void;
    go(delta?: any): void;
    pushState(statedata: any, title?: string, url?: string): void;
    replaceState(statedata: any, title?: string, url?: string): void;
}

declare var History: {
    prototype: History;
    new(): History;
}

interface IDBCursor {
    direction: string;
    key: any;
    primaryKey: any;
    source: any;
    advance(count: number): void;
    continue(key?: any): void;
    delete(): IDBRequest;
    update(value: any): IDBRequest;
    NEXT: string;
    NEXT_NO_DUPLICATE: string;
    PREV: string;
    PREV_NO_DUPLICATE: string;
}

declare var IDBCursor: {
    prototype: IDBCursor;
    new(): IDBCursor;
    NEXT: string;
    NEXT_NO_DUPLICATE: string;
    PREV: string;
    PREV_NO_DUPLICATE: string;
}

interface IDBCursorWithValue extends IDBCursor {
    value: any;
}

declare var IDBCursorWithValue: {
    prototype: IDBCursorWithValue;
    new(): IDBCursorWithValue;
}

interface IDBDatabase extends EventTarget {
    name: string;
    objectStoreNames: DOMStringList;
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    version: string;
    close(): void;
    createObjectStore(name: string, optionalParameters?: any): IDBObjectStore;
    deleteObjectStore(name: string): void;
    transaction(storeNames: any, mode?: string): IDBTransaction;
    addEventListener(type: "abort", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBDatabase: {
    prototype: IDBDatabase;
    new(): IDBDatabase;
}

interface IDBFactory {
    cmp(first: any, second: any): number;
    deleteDatabase(name: string): IDBOpenDBRequest;
    open(name: string, version?: number): IDBOpenDBRequest;
}

declare var IDBFactory: {
    prototype: IDBFactory;
    new(): IDBFactory;
}

interface IDBIndex {
    keyPath: string;
    name: string;
    objectStore: IDBObjectStore;
    unique: boolean;
    count(key?: any): IDBRequest;
    get(key: any): IDBRequest;
    getKey(key: any): IDBRequest;
    openCursor(range?: IDBKeyRange, direction?: string): IDBRequest;
    openKeyCursor(range?: IDBKeyRange, direction?: string): IDBRequest;
}

declare var IDBIndex: {
    prototype: IDBIndex;
    new(): IDBIndex;
}

interface IDBKeyRange {
    lower: any;
    lowerOpen: boolean;
    upper: any;
    upperOpen: boolean;
}

declare var IDBKeyRange: {
    prototype: IDBKeyRange;
    new(): IDBKeyRange;
    bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
    lowerBound(bound: any, open?: boolean): IDBKeyRange;
    only(value: any): IDBKeyRange;
    upperBound(bound: any, open?: boolean): IDBKeyRange;
}

interface IDBObjectStore {
    indexNames: DOMStringList;
    keyPath: string;
    name: string;
    transaction: IDBTransaction;
    add(value: any, key?: any): IDBRequest;
    clear(): IDBRequest;
    count(key?: any): IDBRequest;
    createIndex(name: string, keyPath: string, optionalParameters?: any): IDBIndex;
    delete(key: any): IDBRequest;
    deleteIndex(indexName: string): void;
    get(key: any): IDBRequest;
    index(name: string): IDBIndex;
    openCursor(range?: any, direction?: string): IDBRequest;
    put(value: any, key?: any): IDBRequest;
}

declare var IDBObjectStore: {
    prototype: IDBObjectStore;
    new(): IDBObjectStore;
}

interface IDBOpenDBRequest extends IDBRequest {
    onblocked: (ev: Event) => any;
    onupgradeneeded: (ev: IDBVersionChangeEvent) => any;
    addEventListener(type: "blocked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "success", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "upgradeneeded", listener: (ev: IDBVersionChangeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBOpenDBRequest: {
    prototype: IDBOpenDBRequest;
    new(): IDBOpenDBRequest;
}

interface IDBRequest extends EventTarget {
    error: DOMError;
    onerror: (ev: Event) => any;
    onsuccess: (ev: Event) => any;
    readyState: string;
    result: any;
    source: any;
    transaction: IDBTransaction;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "success", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBRequest: {
    prototype: IDBRequest;
    new(): IDBRequest;
}

interface IDBTransaction extends EventTarget {
    db: IDBDatabase;
    error: DOMError;
    mode: string;
    onabort: (ev: Event) => any;
    oncomplete: (ev: Event) => any;
    onerror: (ev: Event) => any;
    abort(): void;
    objectStore(name: string): IDBObjectStore;
    READ_ONLY: string;
    READ_WRITE: string;
    VERSION_CHANGE: string;
    addEventListener(type: "abort", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "complete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBTransaction: {
    prototype: IDBTransaction;
    new(): IDBTransaction;
    READ_ONLY: string;
    READ_WRITE: string;
    VERSION_CHANGE: string;
}

interface IDBVersionChangeEvent extends Event {
    newVersion: number;
    oldVersion: number;
}

declare var IDBVersionChangeEvent: {
    prototype: IDBVersionChangeEvent;
    new(): IDBVersionChangeEvent;
}

interface ImageData {
    data: number[];
    height: number;
    width: number;
}

declare var ImageData: {
    prototype: ImageData;
    new(width: number, height: number): ImageData;
    new(array: Uint8ClampedArray, width: number, height: number): ImageData;
}

interface KeyboardEvent extends UIEvent {
    altKey: boolean;
    char: string;
    charCode: number;
    ctrlKey: boolean;
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
    getModifierState(keyArg: string): boolean;
    initKeyboardEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, keyArg: string, locationArg: number, modifiersListArg: string, repeat: boolean, locale: string): void;
    DOM_KEY_LOCATION_JOYSTICK: number;
    DOM_KEY_LOCATION_LEFT: number;
    DOM_KEY_LOCATION_MOBILE: number;
    DOM_KEY_LOCATION_NUMPAD: number;
    DOM_KEY_LOCATION_RIGHT: number;
    DOM_KEY_LOCATION_STANDARD: number;
}

declare var KeyboardEvent: {
    prototype: KeyboardEvent;
    new(typeArg: string, eventInitDict?: KeyboardEventInit): KeyboardEvent;
    DOM_KEY_LOCATION_JOYSTICK: number;
    DOM_KEY_LOCATION_LEFT: number;
    DOM_KEY_LOCATION_MOBILE: number;
    DOM_KEY_LOCATION_NUMPAD: number;
    DOM_KEY_LOCATION_RIGHT: number;
    DOM_KEY_LOCATION_STANDARD: number;
}

interface Location {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    assign(url: string): void;
    reload(forcedReload?: boolean): void;
    replace(url: string): void;
    toString(): string;
}

declare var Location: {
    prototype: Location;
    new(): Location;
}

interface LongRunningScriptDetectedEvent extends Event {
    executionTime: number;
    stopPageScriptExecution: boolean;
}

declare var LongRunningScriptDetectedEvent: {
    prototype: LongRunningScriptDetectedEvent;
    new(): LongRunningScriptDetectedEvent;
}

interface MSApp {
    clearTemporaryWebDataAsync(): MSAppAsyncOperation;
    createBlobFromRandomAccessStream(type: string, seeker: any): Blob;
    createDataPackage(object: any): any;
    createDataPackageFromSelection(): any;
    createFileFromStorageFile(storageFile: any): File;
    createStreamFromInputStream(type: string, inputStream: any): MSStream;
    execAsyncAtPriority(asynchronousCallback: MSExecAtPriorityFunctionCallback, priority: string, ...args: any[]): void;
    execAtPriority(synchronousCallback: MSExecAtPriorityFunctionCallback, priority: string, ...args: any[]): any;
    getCurrentPriority(): string;
    getHtmlPrintDocumentSourceAsync(htmlDoc: any): any;
    getViewId(view: any): any;
    isTaskScheduledAtPriorityOrHigher(priority: string): boolean;
    pageHandlesAllApplicationActivations(enabled: boolean): void;
    suppressSubdownloadCredentialPrompts(suppress: boolean): void;
    terminateApp(exceptionObject: any): void;
    CURRENT: string;
    HIGH: string;
    IDLE: string;
    NORMAL: string;
}
declare var MSApp: MSApp;

interface MSAppAsyncOperation extends EventTarget {
    error: DOMError;
    oncomplete: (ev: Event) => any;
    onerror: (ev: Event) => any;
    readyState: number;
    result: any;
    start(): void;
    COMPLETED: number;
    ERROR: number;
    STARTED: number;
    addEventListener(type: "complete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MSAppAsyncOperation: {
    prototype: MSAppAsyncOperation;
    new(): MSAppAsyncOperation;
    COMPLETED: number;
    ERROR: number;
    STARTED: number;
}

interface MSBlobBuilder {
    append(data: any, endings?: string): void;
    getBlob(contentType?: string): Blob;
}

declare var MSBlobBuilder: {
    prototype: MSBlobBuilder;
    new(): MSBlobBuilder;
}

interface MSCSSMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    inverse(): MSCSSMatrix;
    multiply(secondMatrix: MSCSSMatrix): MSCSSMatrix;
    rotate(angleX: number, angleY?: number, angleZ?: number): MSCSSMatrix;
    rotateAxisAngle(x: number, y: number, z: number, angle: number): MSCSSMatrix;
    scale(scaleX: number, scaleY?: number, scaleZ?: number): MSCSSMatrix;
    setMatrixValue(value: string): void;
    skewX(angle: number): MSCSSMatrix;
    skewY(angle: number): MSCSSMatrix;
    toString(): string;
    translate(x: number, y: number, z?: number): MSCSSMatrix;
}

declare var MSCSSMatrix: {
    prototype: MSCSSMatrix;
    new(text?: string): MSCSSMatrix;
}

interface MSGesture {
    target: Element;
    addPointer(pointerId: number): void;
    stop(): void;
}

declare var MSGesture: {
    prototype: MSGesture;
    new(): MSGesture;
}

interface MSGestureEvent extends UIEvent {
    clientX: number;
    clientY: number;
    expansion: number;
    gestureObject: any;
    hwTimestamp: number;
    offsetX: number;
    offsetY: number;
    rotation: number;
    scale: number;
    screenX: number;
    screenY: number;
    translationX: number;
    translationY: number;
    velocityAngular: number;
    velocityExpansion: number;
    velocityX: number;
    velocityY: number;
    initGestureEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, offsetXArg: number, offsetYArg: number, translationXArg: number, translationYArg: number, scaleArg: number, expansionArg: number, rotationArg: number, velocityXArg: number, velocityYArg: number, velocityExpansionArg: number, velocityAngularArg: number, hwTimestampArg: number): void;
    MSGESTURE_FLAG_BEGIN: number;
    MSGESTURE_FLAG_CANCEL: number;
    MSGESTURE_FLAG_END: number;
    MSGESTURE_FLAG_INERTIA: number;
    MSGESTURE_FLAG_NONE: number;
}

declare var MSGestureEvent: {
    prototype: MSGestureEvent;
    new(): MSGestureEvent;
    MSGESTURE_FLAG_BEGIN: number;
    MSGESTURE_FLAG_CANCEL: number;
    MSGESTURE_FLAG_END: number;
    MSGESTURE_FLAG_INERTIA: number;
    MSGESTURE_FLAG_NONE: number;
}

interface MSGraphicsTrust {
    constrictionActive: boolean;
    status: string;
}

declare var MSGraphicsTrust: {
    prototype: MSGraphicsTrust;
    new(): MSGraphicsTrust;
}

interface MSHTMLWebViewElement extends HTMLElement {
    canGoBack: boolean;
    canGoForward: boolean;
    containsFullScreenElement: boolean;
    documentTitle: string;
    height: number;
    settings: MSWebViewSettings;
    src: string;
    width: number;
    addWebAllowedObject(name: string, applicationObject: any): void;
    buildLocalStreamUri(contentIdentifier: string, relativePath: string): string;
    capturePreviewToBlobAsync(): MSWebViewAsyncOperation;
    captureSelectedContentToDataPackageAsync(): MSWebViewAsyncOperation;
    getDeferredPermissionRequestById(id: number): DeferredPermissionRequest;
    getDeferredPermissionRequests(): DeferredPermissionRequest[];
    goBack(): void;
    goForward(): void;
    invokeScriptAsync(scriptName: string, ...args: any[]): MSWebViewAsyncOperation;
    navigate(uri: string): void;
    navigateToLocalStreamUri(source: string, streamResolver: any): void;
    navigateToString(contents: string): void;
    navigateWithHttpRequestMessage(requestMessage: any): void;
    refresh(): void;
    stop(): void;
}

declare var MSHTMLWebViewElement: {
    prototype: MSHTMLWebViewElement;
    new(): MSHTMLWebViewElement;
}

interface MSInputMethodContext extends EventTarget {
    compositionEndOffset: number;
    compositionStartOffset: number;
    oncandidatewindowhide: (ev: Event) => any;
    oncandidatewindowshow: (ev: Event) => any;
    oncandidatewindowupdate: (ev: Event) => any;
    target: HTMLElement;
    getCandidateWindowClientRect(): ClientRect;
    getCompositionAlternatives(): string[];
    hasComposition(): boolean;
    isCandidateWindowVisible(): boolean;
    addEventListener(type: "MSCandidateWindowHide", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "MSCandidateWindowShow", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "MSCandidateWindowUpdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MSInputMethodContext: {
    prototype: MSInputMethodContext;
    new(): MSInputMethodContext;
}

interface MSManipulationEvent extends UIEvent {
    currentState: number;
    inertiaDestinationX: number;
    inertiaDestinationY: number;
    lastState: number;
    initMSManipulationEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, lastState: number, currentState: number): void;
    MS_MANIPULATION_STATE_ACTIVE: number;
    MS_MANIPULATION_STATE_CANCELLED: number;
    MS_MANIPULATION_STATE_COMMITTED: number;
    MS_MANIPULATION_STATE_DRAGGING: number;
    MS_MANIPULATION_STATE_INERTIA: number;
    MS_MANIPULATION_STATE_PRESELECT: number;
    MS_MANIPULATION_STATE_SELECTING: number;
    MS_MANIPULATION_STATE_STOPPED: number;
}

declare var MSManipulationEvent: {
    prototype: MSManipulationEvent;
    new(): MSManipulationEvent;
    MS_MANIPULATION_STATE_ACTIVE: number;
    MS_MANIPULATION_STATE_CANCELLED: number;
    MS_MANIPULATION_STATE_COMMITTED: number;
    MS_MANIPULATION_STATE_DRAGGING: number;
    MS_MANIPULATION_STATE_INERTIA: number;
    MS_MANIPULATION_STATE_PRESELECT: number;
    MS_MANIPULATION_STATE_SELECTING: number;
    MS_MANIPULATION_STATE_STOPPED: number;
}

interface MSMediaKeyError {
    code: number;
    systemCode: number;
    MS_MEDIA_KEYERR_CLIENT: number;
    MS_MEDIA_KEYERR_DOMAIN: number;
    MS_MEDIA_KEYERR_HARDWARECHANGE: number;
    MS_MEDIA_KEYERR_OUTPUT: number;
    MS_MEDIA_KEYERR_SERVICE: number;
    MS_MEDIA_KEYERR_UNKNOWN: number;
}

declare var MSMediaKeyError: {
    prototype: MSMediaKeyError;
    new(): MSMediaKeyError;
    MS_MEDIA_KEYERR_CLIENT: number;
    MS_MEDIA_KEYERR_DOMAIN: number;
    MS_MEDIA_KEYERR_HARDWARECHANGE: number;
    MS_MEDIA_KEYERR_OUTPUT: number;
    MS_MEDIA_KEYERR_SERVICE: number;
    MS_MEDIA_KEYERR_UNKNOWN: number;
}

interface MSMediaKeyMessageEvent extends Event {
    destinationURL: string;
    message: Uint8Array;
}

declare var MSMediaKeyMessageEvent: {
    prototype: MSMediaKeyMessageEvent;
    new(): MSMediaKeyMessageEvent;
}

interface MSMediaKeyNeededEvent extends Event {
    initData: Uint8Array;
}

declare var MSMediaKeyNeededEvent: {
    prototype: MSMediaKeyNeededEvent;
    new(): MSMediaKeyNeededEvent;
}

interface MSMediaKeySession extends EventTarget {
    error: MSMediaKeyError;
    keySystem: string;
    sessionId: string;
    close(): void;
    update(key: Uint8Array): void;
}

declare var MSMediaKeySession: {
    prototype: MSMediaKeySession;
    new(): MSMediaKeySession;
}

interface MSMediaKeys {
    keySystem: string;
    createSession(type: string, initData: Uint8Array, cdmData?: Uint8Array): MSMediaKeySession;
}

declare var MSMediaKeys: {
    prototype: MSMediaKeys;
    new(keySystem: string): MSMediaKeys;
    isTypeSupported(keySystem: string, type?: string): boolean;
}

interface MSMimeTypesCollection {
    length: number;
}

declare var MSMimeTypesCollection: {
    prototype: MSMimeTypesCollection;
    new(): MSMimeTypesCollection;
}

interface MSPluginsCollection {
    length: number;
    refresh(reload?: boolean): void;
}

declare var MSPluginsCollection: {
    prototype: MSPluginsCollection;
    new(): MSPluginsCollection;
}

interface MSPointerEvent extends MouseEvent {
    currentPoint: any;
    height: number;
    hwTimestamp: number;
    intermediatePoints: any;
    isPrimary: boolean;
    pointerId: number;
    pointerType: any;
    pressure: number;
    rotation: number;
    tiltX: number;
    tiltY: number;
    width: number;
    getCurrentPoint(element: Element): void;
    getIntermediatePoints(element: Element): void;
    initPointerEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, offsetXArg: number, offsetYArg: number, widthArg: number, heightArg: number, pressure: number, rotation: number, tiltX: number, tiltY: number, pointerIdArg: number, pointerType: any, hwTimestampArg: number, isPrimary: boolean): void;
}

declare var MSPointerEvent: {
    prototype: MSPointerEvent;
    new(typeArg: string, eventInitDict?: PointerEventInit): MSPointerEvent;
}

interface MSRangeCollection {
    length: number;
    item(index: number): Range;
    [index: number]: Range;
}

declare var MSRangeCollection: {
    prototype: MSRangeCollection;
    new(): MSRangeCollection;
}

interface MSSiteModeEvent extends Event {
    actionURL: string;
    buttonID: number;
}

declare var MSSiteModeEvent: {
    prototype: MSSiteModeEvent;
    new(): MSSiteModeEvent;
}

interface MSStream {
    type: string;
    msClose(): void;
    msDetachStream(): any;
}

declare var MSStream: {
    prototype: MSStream;
    new(): MSStream;
}

interface MSStreamReader extends EventTarget, MSBaseReader {
    error: DOMError;
    readAsArrayBuffer(stream: MSStream, size?: number): void;
    readAsBinaryString(stream: MSStream, size?: number): void;
    readAsBlob(stream: MSStream, size?: number): void;
    readAsDataURL(stream: MSStream, size?: number): void;
    readAsText(stream: MSStream, encoding?: string, size?: number): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MSStreamReader: {
    prototype: MSStreamReader;
    new(): MSStreamReader;
}

interface MSWebViewAsyncOperation extends EventTarget {
    error: DOMError;
    oncomplete: (ev: Event) => any;
    onerror: (ev: Event) => any;
    readyState: number;
    result: any;
    target: MSHTMLWebViewElement;
    type: number;
    start(): void;
    COMPLETED: number;
    ERROR: number;
    STARTED: number;
    TYPE_CAPTURE_PREVIEW_TO_RANDOM_ACCESS_STREAM: number;
    TYPE_CREATE_DATA_PACKAGE_FROM_SELECTION: number;
    TYPE_INVOKE_SCRIPT: number;
    addEventListener(type: "complete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MSWebViewAsyncOperation: {
    prototype: MSWebViewAsyncOperation;
    new(): MSWebViewAsyncOperation;
    COMPLETED: number;
    ERROR: number;
    STARTED: number;
    TYPE_CAPTURE_PREVIEW_TO_RANDOM_ACCESS_STREAM: number;
    TYPE_CREATE_DATA_PACKAGE_FROM_SELECTION: number;
    TYPE_INVOKE_SCRIPT: number;
}

interface MSWebViewSettings {
    isIndexedDBEnabled: boolean;
    isJavaScriptEnabled: boolean;
}

declare var MSWebViewSettings: {
    prototype: MSWebViewSettings;
    new(): MSWebViewSettings;
}

interface MediaElementAudioSourceNode extends AudioNode {
}

declare var MediaElementAudioSourceNode: {
    prototype: MediaElementAudioSourceNode;
    new(): MediaElementAudioSourceNode;
}

interface MediaError {
    code: number;
    msExtendedCode: number;
    MEDIA_ERR_ABORTED: number;
    MEDIA_ERR_DECODE: number;
    MEDIA_ERR_NETWORK: number;
    MEDIA_ERR_SRC_NOT_SUPPORTED: number;
    MS_MEDIA_ERR_ENCRYPTED: number;
}

declare var MediaError: {
    prototype: MediaError;
    new(): MediaError;
    MEDIA_ERR_ABORTED: number;
    MEDIA_ERR_DECODE: number;
    MEDIA_ERR_NETWORK: number;
    MEDIA_ERR_SRC_NOT_SUPPORTED: number;
    MS_MEDIA_ERR_ENCRYPTED: number;
}

interface MediaList {
    length: number;
    mediaText: string;
    appendMedium(newMedium: string): void;
    deleteMedium(oldMedium: string): void;
    item(index: number): string;
    toString(): string;
    [index: number]: string;
}

declare var MediaList: {
    prototype: MediaList;
    new(): MediaList;
}

interface MediaQueryList {
    matches: boolean;
    media: string;
    addListener(listener: MediaQueryListListener): void;
    removeListener(listener: MediaQueryListListener): void;
}

declare var MediaQueryList: {
    prototype: MediaQueryList;
    new(): MediaQueryList;
}

interface MediaSource extends EventTarget {
    activeSourceBuffers: SourceBufferList;
    duration: number;
    readyState: number;
    sourceBuffers: SourceBufferList;
    addSourceBuffer(type: string): SourceBuffer;
    endOfStream(error?: number): void;
    removeSourceBuffer(sourceBuffer: SourceBuffer): void;
}

declare var MediaSource: {
    prototype: MediaSource;
    new(): MediaSource;
    isTypeSupported(type: string): boolean;
}

interface MessageChannel {
    port1: MessagePort;
    port2: MessagePort;
}

declare var MessageChannel: {
    prototype: MessageChannel;
    new(): MessageChannel;
}

interface MessageEvent extends Event {
    data: any;
    origin: string;
    ports: any;
    source: Window;
    initMessageEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, dataArg: any, originArg: string, lastEventIdArg: string, sourceArg: Window): void;
}

declare var MessageEvent: {
    prototype: MessageEvent;
    new(type: string, eventInitDict?: MessageEventInit): MessageEvent;
}

interface MessagePort extends EventTarget {
    onmessage: (ev: MessageEvent) => any;
    close(): void;
    postMessage(message?: any, ports?: any): void;
    start(): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MessagePort: {
    prototype: MessagePort;
    new(): MessagePort;
}

interface MimeType {
    description: string;
    enabledPlugin: Plugin;
    suffixes: string;
    type: string;
}

declare var MimeType: {
    prototype: MimeType;
    new(): MimeType;
}

interface MimeTypeArray {
    length: number;
    item(index: number): Plugin;
    namedItem(type: string): Plugin;
    [index: number]: Plugin;
}

declare var MimeTypeArray: {
    prototype: MimeTypeArray;
    new(): MimeTypeArray;
}

interface MouseEvent extends UIEvent {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    fromElement: Element;
    layerX: number;
    layerY: number;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    offsetX: number;
    offsetY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
    toElement: Element;
    which: number;
    x: number;
    y: number;
    getModifierState(keyArg: string): boolean;
    initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget): void;
}

declare var MouseEvent: {
    prototype: MouseEvent;
    new(typeArg: string, eventInitDict?: MouseEventInit): MouseEvent;
}

interface MouseWheelEvent extends MouseEvent {
    wheelDelta: number;
    wheelDeltaX: number;
    wheelDeltaY: number;
    initMouseWheelEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, buttonArg: number, relatedTargetArg: EventTarget, modifiersListArg: string, wheelDeltaArg: number): void;
}

declare var MouseWheelEvent: {
    prototype: MouseWheelEvent;
    new(): MouseWheelEvent;
}

interface MutationEvent extends Event {
    attrChange: number;
    attrName: string;
    newValue: string;
    prevValue: string;
    relatedNode: Node;
    initMutationEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, relatedNodeArg: Node, prevValueArg: string, newValueArg: string, attrNameArg: string, attrChangeArg: number): void;
    ADDITION: number;
    MODIFICATION: number;
    REMOVAL: number;
}

declare var MutationEvent: {
    prototype: MutationEvent;
    new(): MutationEvent;
    ADDITION: number;
    MODIFICATION: number;
    REMOVAL: number;
}

interface MutationObserver {
    disconnect(): void;
    observe(target: Node, options: MutationObserverInit): void;
    takeRecords(): MutationRecord[];
}

declare var MutationObserver: {
    prototype: MutationObserver;
    new(callback: MutationCallback): MutationObserver;
}

interface MutationRecord {
    addedNodes: NodeList;
    attributeName: string;
    attributeNamespace: string;
    nextSibling: Node;
    oldValue: string;
    previousSibling: Node;
    removedNodes: NodeList;
    target: Node;
    type: string;
}

declare var MutationRecord: {
    prototype: MutationRecord;
    new(): MutationRecord;
}

interface NamedNodeMap {
    length: number;
    getNamedItem(name: string): Attr;
    getNamedItemNS(namespaceURI: string, localName: string): Attr;
    item(index: number): Attr;
    removeNamedItem(name: string): Attr;
    removeNamedItemNS(namespaceURI: string, localName: string): Attr;
    setNamedItem(arg: Attr): Attr;
    setNamedItemNS(arg: Attr): Attr;
    [index: number]: Attr;
}

declare var NamedNodeMap: {
    prototype: NamedNodeMap;
    new(): NamedNodeMap;
}

interface NavigationCompletedEvent extends NavigationEvent {
    isSuccess: boolean;
    webErrorStatus: number;
}

declare var NavigationCompletedEvent: {
    prototype: NavigationCompletedEvent;
    new(): NavigationCompletedEvent;
}

interface NavigationEvent extends Event {
    uri: string;
}

declare var NavigationEvent: {
    prototype: NavigationEvent;
    new(): NavigationEvent;
}

interface NavigationEventWithReferrer extends NavigationEvent {
    referer: string;
}

declare var NavigationEventWithReferrer: {
    prototype: NavigationEventWithReferrer;
    new(): NavigationEventWithReferrer;
}

interface Navigator extends Object, NavigatorID, NavigatorOnLine, NavigatorContentUtils, NavigatorStorageUtils, NavigatorGeolocation, MSNavigatorDoNotTrack, MSFileSaver {
    appCodeName: string;
    appMinorVersion: string;
    browserLanguage: string;
    connectionSpeed: number;
    cookieEnabled: boolean;
    cpuClass: string;
    language: string;
    maxTouchPoints: number;
    mimeTypes: MSMimeTypesCollection;
    msManipulationViewsEnabled: boolean;
    msMaxTouchPoints: number;
    msPointerEnabled: boolean;
    plugins: MSPluginsCollection;
    pointerEnabled: boolean;
    systemLanguage: string;
    userLanguage: string;
    webdriver: boolean;
    getGamepads(): Gamepad[];
    javaEnabled(): boolean;
    msLaunchUri(uri: string, successCallback?: MSLaunchUriCallback, noHandlerCallback?: MSLaunchUriCallback): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Navigator: {
    prototype: Navigator;
    new(): Navigator;
}

interface Node extends EventTarget {
    attributes: NamedNodeMap;
    baseURI: string;
    childNodes: NodeList;
    firstChild: Node;
    lastChild: Node;
    localName: string;
    namespaceURI: string;
    nextSibling: Node;
    nodeName: string;
    nodeType: number;
    nodeValue: string;
    ownerDocument: Document;
    parentElement: HTMLElement;
    parentNode: Node;
    prefix: string;
    previousSibling: Node;
    textContent: string;
    appendChild(newChild: Node): Node;
    cloneNode(deep?: boolean): Node;
    compareDocumentPosition(other: Node): number;
    hasAttributes(): boolean;
    hasChildNodes(): boolean;
    insertBefore(newChild: Node, refChild?: Node): Node;
    isDefaultNamespace(namespaceURI: string): boolean;
    isEqualNode(arg: Node): boolean;
    isSameNode(other: Node): boolean;
    lookupNamespaceURI(prefix: string): string;
    lookupPrefix(namespaceURI: string): string;
    normalize(): void;
    removeChild(oldChild: Node): Node;
    replaceChild(newChild: Node, oldChild: Node): Node;
    ATTRIBUTE_NODE: number;
    CDATA_SECTION_NODE: number;
    COMMENT_NODE: number;
    DOCUMENT_FRAGMENT_NODE: number;
    DOCUMENT_NODE: number;
    DOCUMENT_POSITION_CONTAINED_BY: number;
    DOCUMENT_POSITION_CONTAINS: number;
    DOCUMENT_POSITION_DISCONNECTED: number;
    DOCUMENT_POSITION_FOLLOWING: number;
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    DOCUMENT_POSITION_PRECEDING: number;
    DOCUMENT_TYPE_NODE: number;
    ELEMENT_NODE: number;
    ENTITY_NODE: number;
    ENTITY_REFERENCE_NODE: number;
    NOTATION_NODE: number;
    PROCESSING_INSTRUCTION_NODE: number;
    TEXT_NODE: number;
}

declare var Node: {
    prototype: Node;
    new(): Node;
    ATTRIBUTE_NODE: number;
    CDATA_SECTION_NODE: number;
    COMMENT_NODE: number;
    DOCUMENT_FRAGMENT_NODE: number;
    DOCUMENT_NODE: number;
    DOCUMENT_POSITION_CONTAINED_BY: number;
    DOCUMENT_POSITION_CONTAINS: number;
    DOCUMENT_POSITION_DISCONNECTED: number;
    DOCUMENT_POSITION_FOLLOWING: number;
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    DOCUMENT_POSITION_PRECEDING: number;
    DOCUMENT_TYPE_NODE: number;
    ELEMENT_NODE: number;
    ENTITY_NODE: number;
    ENTITY_REFERENCE_NODE: number;
    NOTATION_NODE: number;
    PROCESSING_INSTRUCTION_NODE: number;
    TEXT_NODE: number;
}

interface NodeFilter {
    acceptNode(n: Node): number;
}

declare var NodeFilter: {
    FILTER_ACCEPT: number;
    FILTER_REJECT: number;
    FILTER_SKIP: number;
    SHOW_ALL: number;
    SHOW_ATTRIBUTE: number;
    SHOW_CDATA_SECTION: number;
    SHOW_COMMENT: number;
    SHOW_DOCUMENT: number;
    SHOW_DOCUMENT_FRAGMENT: number;
    SHOW_DOCUMENT_TYPE: number;
    SHOW_ELEMENT: number;
    SHOW_ENTITY: number;
    SHOW_ENTITY_REFERENCE: number;
    SHOW_NOTATION: number;
    SHOW_PROCESSING_INSTRUCTION: number;
    SHOW_TEXT: number;
}

interface NodeIterator {
    expandEntityReferences: boolean;
    filter: NodeFilter;
    root: Node;
    whatToShow: number;
    detach(): void;
    nextNode(): Node;
    previousNode(): Node;
}

declare var NodeIterator: {
    prototype: NodeIterator;
    new(): NodeIterator;
}

interface NodeList {
    length: number;
    item(index: number): Node;
    [index: number]: Node;
}

declare var NodeList: {
    prototype: NodeList;
    new(): NodeList;
}

interface OES_element_index_uint {
}

declare var OES_element_index_uint: {
    prototype: OES_element_index_uint;
    new(): OES_element_index_uint;
}

interface OES_standard_derivatives {
    FRAGMENT_SHADER_DERIVATIVE_HINT_OES: number;
}

declare var OES_standard_derivatives: {
    prototype: OES_standard_derivatives;
    new(): OES_standard_derivatives;
    FRAGMENT_SHADER_DERIVATIVE_HINT_OES: number;
}

interface OES_texture_float {
}

declare var OES_texture_float: {
    prototype: OES_texture_float;
    new(): OES_texture_float;
}

interface OES_texture_float_linear {
}

declare var OES_texture_float_linear: {
    prototype: OES_texture_float_linear;
    new(): OES_texture_float_linear;
}

interface OfflineAudioCompletionEvent extends Event {
    renderedBuffer: AudioBuffer;
}

declare var OfflineAudioCompletionEvent: {
    prototype: OfflineAudioCompletionEvent;
    new(): OfflineAudioCompletionEvent;
}

interface OfflineAudioContext extends AudioContext {
    oncomplete: (ev: Event) => any;
    startRendering(): void;
    addEventListener(type: "complete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var OfflineAudioContext: {
    prototype: OfflineAudioContext;
    new(numberOfChannels: number, length: number, sampleRate: number): OfflineAudioContext;
}

interface OscillatorNode extends AudioNode {
    detune: AudioParam;
    frequency: AudioParam;
    onended: (ev: Event) => any;
    type: string;
    setPeriodicWave(periodicWave: PeriodicWave): void;
    start(when?: number): void;
    stop(when?: number): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var OscillatorNode: {
    prototype: OscillatorNode;
    new(): OscillatorNode;
}

interface PageTransitionEvent extends Event {
    persisted: boolean;
}

declare var PageTransitionEvent: {
    prototype: PageTransitionEvent;
    new(): PageTransitionEvent;
}

interface PannerNode extends AudioNode {
    coneInnerAngle: number;
    coneOuterAngle: number;
    coneOuterGain: number;
    distanceModel: string;
    maxDistance: number;
    panningModel: string;
    refDistance: number;
    rolloffFactor: number;
    setOrientation(x: number, y: number, z: number): void;
    setPosition(x: number, y: number, z: number): void;
    setVelocity(x: number, y: number, z: number): void;
}

declare var PannerNode: {
    prototype: PannerNode;
    new(): PannerNode;
}

interface PerfWidgetExternal {
    activeNetworkRequestCount: number;
    averageFrameTime: number;
    averagePaintTime: number;
    extraInformationEnabled: boolean;
    independentRenderingEnabled: boolean;
    irDisablingContentString: string;
    irStatusAvailable: boolean;
    maxCpuSpeed: number;
    paintRequestsPerSecond: number;
    performanceCounter: number;
    performanceCounterFrequency: number;
    addEventListener(eventType: string, callback: Function): void;
    getMemoryUsage(): number;
    getProcessCpuUsage(): number;
    getRecentCpuUsage(last: number): any;
    getRecentFrames(last: number): any;
    getRecentMemoryUsage(last: number): any;
    getRecentPaintRequests(last: number): any;
    removeEventListener(eventType: string, callback: Function): void;
    repositionWindow(x: number, y: number): void;
    resizeWindow(width: number, height: number): void;
}

declare var PerfWidgetExternal: {
    prototype: PerfWidgetExternal;
    new(): PerfWidgetExternal;
}

interface Performance {
    navigation: PerformanceNavigation;
    timing: PerformanceTiming;
    clearMarks(markName?: string): void;
    clearMeasures(measureName?: string): void;
    clearResourceTimings(): void;
    getEntries(): any;
    getEntriesByName(name: string, entryType?: string): any;
    getEntriesByType(entryType: string): any;
    getMarks(markName?: string): any;
    getMeasures(measureName?: string): any;
    mark(markName: string): void;
    measure(measureName: string, startMarkName?: string, endMarkName?: string): void;
    now(): number;
    setResourceTimingBufferSize(maxSize: number): void;
    toJSON(): any;
}

declare var Performance: {
    prototype: Performance;
    new(): Performance;
}

interface PerformanceEntry {
    duration: number;
    entryType: string;
    name: string;
    startTime: number;
}

declare var PerformanceEntry: {
    prototype: PerformanceEntry;
    new(): PerformanceEntry;
}

interface PerformanceMark extends PerformanceEntry {
}

declare var PerformanceMark: {
    prototype: PerformanceMark;
    new(): PerformanceMark;
}

interface PerformanceMeasure extends PerformanceEntry {
}

declare var PerformanceMeasure: {
    prototype: PerformanceMeasure;
    new(): PerformanceMeasure;
}

interface PerformanceNavigation {
    redirectCount: number;
    type: number;
    toJSON(): any;
    TYPE_BACK_FORWARD: number;
    TYPE_NAVIGATE: number;
    TYPE_RELOAD: number;
    TYPE_RESERVED: number;
}

declare var PerformanceNavigation: {
    prototype: PerformanceNavigation;
    new(): PerformanceNavigation;
    TYPE_BACK_FORWARD: number;
    TYPE_NAVIGATE: number;
    TYPE_RELOAD: number;
    TYPE_RESERVED: number;
}

interface PerformanceNavigationTiming extends PerformanceEntry {
    connectEnd: number;
    connectStart: number;
    domComplete: number;
    domContentLoadedEventEnd: number;
    domContentLoadedEventStart: number;
    domInteractive: number;
    domLoading: number;
    domainLookupEnd: number;
    domainLookupStart: number;
    fetchStart: number;
    loadEventEnd: number;
    loadEventStart: number;
    navigationStart: number;
    redirectCount: number;
    redirectEnd: number;
    redirectStart: number;
    requestStart: number;
    responseEnd: number;
    responseStart: number;
    type: string;
    unloadEventEnd: number;
    unloadEventStart: number;
}

declare var PerformanceNavigationTiming: {
    prototype: PerformanceNavigationTiming;
    new(): PerformanceNavigationTiming;
}

interface PerformanceResourceTiming extends PerformanceEntry {
    connectEnd: number;
    connectStart: number;
    domainLookupEnd: number;
    domainLookupStart: number;
    fetchStart: number;
    initiatorType: string;
    redirectEnd: number;
    redirectStart: number;
    requestStart: number;
    responseEnd: number;
    responseStart: number;
}

declare var PerformanceResourceTiming: {
    prototype: PerformanceResourceTiming;
    new(): PerformanceResourceTiming;
}

interface PerformanceTiming {
    connectEnd: number;
    connectStart: number;
    domComplete: number;
    domContentLoadedEventEnd: number;
    domContentLoadedEventStart: number;
    domInteractive: number;
    domLoading: number;
    domainLookupEnd: number;
    domainLookupStart: number;
    fetchStart: number;
    loadEventEnd: number;
    loadEventStart: number;
    msFirstPaint: number;
    navigationStart: number;
    redirectEnd: number;
    redirectStart: number;
    requestStart: number;
    responseEnd: number;
    responseStart: number;
    unloadEventEnd: number;
    unloadEventStart: number;
    toJSON(): any;
}

declare var PerformanceTiming: {
    prototype: PerformanceTiming;
    new(): PerformanceTiming;
}

interface PeriodicWave {
}

declare var PeriodicWave: {
    prototype: PeriodicWave;
    new(): PeriodicWave;
}

interface PermissionRequest extends DeferredPermissionRequest {
    state: string;
    defer(): void;
}

declare var PermissionRequest: {
    prototype: PermissionRequest;
    new(): PermissionRequest;
}

interface PermissionRequestedEvent extends Event {
    permissionRequest: PermissionRequest;
}

declare var PermissionRequestedEvent: {
    prototype: PermissionRequestedEvent;
    new(): PermissionRequestedEvent;
}

interface Plugin {
    description: string;
    filename: string;
    length: number;
    name: string;
    version: string;
    item(index: number): MimeType;
    namedItem(type: string): MimeType;
    [index: number]: MimeType;
}

declare var Plugin: {
    prototype: Plugin;
    new(): Plugin;
}

interface PluginArray {
    length: number;
    item(index: number): Plugin;
    namedItem(name: string): Plugin;
    refresh(reload?: boolean): void;
    [index: number]: Plugin;
}

declare var PluginArray: {
    prototype: PluginArray;
    new(): PluginArray;
}

interface PointerEvent extends MouseEvent {
    currentPoint: any;
    height: number;
    hwTimestamp: number;
    intermediatePoints: any;
    isPrimary: boolean;
    pointerId: number;
    pointerType: any;
    pressure: number;
    rotation: number;
    tiltX: number;
    tiltY: number;
    width: number;
    getCurrentPoint(element: Element): void;
    getIntermediatePoints(element: Element): void;
    initPointerEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, offsetXArg: number, offsetYArg: number, widthArg: number, heightArg: number, pressure: number, rotation: number, tiltX: number, tiltY: number, pointerIdArg: number, pointerType: any, hwTimestampArg: number, isPrimary: boolean): void;
}

declare var PointerEvent: {
    prototype: PointerEvent;
    new(typeArg: string, eventInitDict?: PointerEventInit): PointerEvent;
}

interface PopStateEvent extends Event {
    state: any;
    initPopStateEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, stateArg: any): void;
}

declare var PopStateEvent: {
    prototype: PopStateEvent;
    new(): PopStateEvent;
}

interface Position {
    coords: Coordinates;
    timestamp: number;
}

declare var Position: {
    prototype: Position;
    new(): Position;
}

interface PositionError {
    code: number;
    message: string;
    toString(): string;
    PERMISSION_DENIED: number;
    POSITION_UNAVAILABLE: number;
    TIMEOUT: number;
}

declare var PositionError: {
    prototype: PositionError;
    new(): PositionError;
    PERMISSION_DENIED: number;
    POSITION_UNAVAILABLE: number;
    TIMEOUT: number;
}

interface ProcessingInstruction extends CharacterData {
    target: string;
}

declare var ProcessingInstruction: {
    prototype: ProcessingInstruction;
    new(): ProcessingInstruction;
}

interface ProgressEvent extends Event {
    lengthComputable: boolean;
    loaded: number;
    total: number;
    initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
}

declare var ProgressEvent: {
    prototype: ProgressEvent;
    new(type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
}

interface Range {
    collapsed: boolean;
    commonAncestorContainer: Node;
    endContainer: Node;
    endOffset: number;
    startContainer: Node;
    startOffset: number;
    cloneContents(): DocumentFragment;
    cloneRange(): Range;
    collapse(toStart: boolean): void;
    compareBoundaryPoints(how: number, sourceRange: Range): number;
    createContextualFragment(fragment: string): DocumentFragment;
    deleteContents(): void;
    detach(): void;
    expand(Unit: string): boolean;
    extractContents(): DocumentFragment;
    getBoundingClientRect(): ClientRect;
    getClientRects(): ClientRectList;
    insertNode(newNode: Node): void;
    selectNode(refNode: Node): void;
    selectNodeContents(refNode: Node): void;
    setEnd(refNode: Node, offset: number): void;
    setEndAfter(refNode: Node): void;
    setEndBefore(refNode: Node): void;
    setStart(refNode: Node, offset: number): void;
    setStartAfter(refNode: Node): void;
    setStartBefore(refNode: Node): void;
    surroundContents(newParent: Node): void;
    toString(): string;
    END_TO_END: number;
    END_TO_START: number;
    START_TO_END: number;
    START_TO_START: number;
}

declare var Range: {
    prototype: Range;
    new(): Range;
    END_TO_END: number;
    END_TO_START: number;
    START_TO_END: number;
    START_TO_START: number;
}

interface SVGAElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGURIReference {
    target: SVGAnimatedString;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGAElement: {
    prototype: SVGAElement;
    new(): SVGAElement;
}

interface SVGAngle {
    unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
    SVG_ANGLETYPE_DEG: number;
    SVG_ANGLETYPE_GRAD: number;
    SVG_ANGLETYPE_RAD: number;
    SVG_ANGLETYPE_UNKNOWN: number;
    SVG_ANGLETYPE_UNSPECIFIED: number;
}

declare var SVGAngle: {
    prototype: SVGAngle;
    new(): SVGAngle;
    SVG_ANGLETYPE_DEG: number;
    SVG_ANGLETYPE_GRAD: number;
    SVG_ANGLETYPE_RAD: number;
    SVG_ANGLETYPE_UNKNOWN: number;
    SVG_ANGLETYPE_UNSPECIFIED: number;
}

interface SVGAnimatedAngle {
    animVal: SVGAngle;
    baseVal: SVGAngle;
}

declare var SVGAnimatedAngle: {
    prototype: SVGAnimatedAngle;
    new(): SVGAnimatedAngle;
}

interface SVGAnimatedBoolean {
    animVal: boolean;
    baseVal: boolean;
}

declare var SVGAnimatedBoolean: {
    prototype: SVGAnimatedBoolean;
    new(): SVGAnimatedBoolean;
}

interface SVGAnimatedEnumeration {
    animVal: number;
    baseVal: number;
}

declare var SVGAnimatedEnumeration: {
    prototype: SVGAnimatedEnumeration;
    new(): SVGAnimatedEnumeration;
}

interface SVGAnimatedInteger {
    animVal: number;
    baseVal: number;
}

declare var SVGAnimatedInteger: {
    prototype: SVGAnimatedInteger;
    new(): SVGAnimatedInteger;
}

interface SVGAnimatedLength {
    animVal: SVGLength;
    baseVal: SVGLength;
}

declare var SVGAnimatedLength: {
    prototype: SVGAnimatedLength;
    new(): SVGAnimatedLength;
}

interface SVGAnimatedLengthList {
    animVal: SVGLengthList;
    baseVal: SVGLengthList;
}

declare var SVGAnimatedLengthList: {
    prototype: SVGAnimatedLengthList;
    new(): SVGAnimatedLengthList;
}

interface SVGAnimatedNumber {
    animVal: number;
    baseVal: number;
}

declare var SVGAnimatedNumber: {
    prototype: SVGAnimatedNumber;
    new(): SVGAnimatedNumber;
}

interface SVGAnimatedNumberList {
    animVal: SVGNumberList;
    baseVal: SVGNumberList;
}

declare var SVGAnimatedNumberList: {
    prototype: SVGAnimatedNumberList;
    new(): SVGAnimatedNumberList;
}

interface SVGAnimatedPreserveAspectRatio {
    animVal: SVGPreserveAspectRatio;
    baseVal: SVGPreserveAspectRatio;
}

declare var SVGAnimatedPreserveAspectRatio: {
    prototype: SVGAnimatedPreserveAspectRatio;
    new(): SVGAnimatedPreserveAspectRatio;
}

interface SVGAnimatedRect {
    animVal: SVGRect;
    baseVal: SVGRect;
}

declare var SVGAnimatedRect: {
    prototype: SVGAnimatedRect;
    new(): SVGAnimatedRect;
}

interface SVGAnimatedString {
    animVal: string;
    baseVal: string;
}

declare var SVGAnimatedString: {
    prototype: SVGAnimatedString;
    new(): SVGAnimatedString;
}

interface SVGAnimatedTransformList {
    animVal: SVGTransformList;
    baseVal: SVGTransformList;
}

declare var SVGAnimatedTransformList: {
    prototype: SVGAnimatedTransformList;
    new(): SVGAnimatedTransformList;
}

interface SVGCircleElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    cx: SVGAnimatedLength;
    cy: SVGAnimatedLength;
    r: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGCircleElement: {
    prototype: SVGCircleElement;
    new(): SVGCircleElement;
}

interface SVGClipPathElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGUnitTypes {
    clipPathUnits: SVGAnimatedEnumeration;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGClipPathElement: {
    prototype: SVGClipPathElement;
    new(): SVGClipPathElement;
}

interface SVGComponentTransferFunctionElement extends SVGElement {
    amplitude: SVGAnimatedNumber;
    exponent: SVGAnimatedNumber;
    intercept: SVGAnimatedNumber;
    offset: SVGAnimatedNumber;
    slope: SVGAnimatedNumber;
    tableValues: SVGAnimatedNumberList;
    type: SVGAnimatedEnumeration;
    SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE: number;
    SVG_FECOMPONENTTRANSFER_TYPE_GAMMA: number;
    SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY: number;
    SVG_FECOMPONENTTRANSFER_TYPE_LINEAR: number;
    SVG_FECOMPONENTTRANSFER_TYPE_TABLE: number;
    SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN: number;
}

declare var SVGComponentTransferFunctionElement: {
    prototype: SVGComponentTransferFunctionElement;
    new(): SVGComponentTransferFunctionElement;
    SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE: number;
    SVG_FECOMPONENTTRANSFER_TYPE_GAMMA: number;
    SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY: number;
    SVG_FECOMPONENTTRANSFER_TYPE_LINEAR: number;
    SVG_FECOMPONENTTRANSFER_TYPE_TABLE: number;
    SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN: number;
}

interface SVGDefsElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGDefsElement: {
    prototype: SVGDefsElement;
    new(): SVGDefsElement;
}

interface SVGDescElement extends SVGElement, SVGStylable, SVGLangSpace {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGDescElement: {
    prototype: SVGDescElement;
    new(): SVGDescElement;
}

interface SVGElement extends Element {
    id: string;
    onclick: (ev: MouseEvent) => any;
    ondblclick: (ev: MouseEvent) => any;
    onfocusin: (ev: FocusEvent) => any;
    onfocusout: (ev: FocusEvent) => any;
    onload: (ev: Event) => any;
    onmousedown: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseout: (ev: MouseEvent) => any;
    onmouseover: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
    ownerSVGElement: SVGSVGElement;
    viewportElement: SVGElement;
    xmlbase: string;
    className: any;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focusin", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focusout", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGElement: {
    prototype: SVGElement;
    new(): SVGElement;
}

interface SVGElementInstance extends EventTarget {
    childNodes: SVGElementInstanceList;
    correspondingElement: SVGElement;
    correspondingUseElement: SVGUseElement;
    firstChild: SVGElementInstance;
    lastChild: SVGElementInstance;
    nextSibling: SVGElementInstance;
    parentNode: SVGElementInstance;
    previousSibling: SVGElementInstance;
}

declare var SVGElementInstance: {
    prototype: SVGElementInstance;
    new(): SVGElementInstance;
}

interface SVGElementInstanceList {
    length: number;
    item(index: number): SVGElementInstance;
}

declare var SVGElementInstanceList: {
    prototype: SVGElementInstanceList;
    new(): SVGElementInstanceList;
}

interface SVGEllipseElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    cx: SVGAnimatedLength;
    cy: SVGAnimatedLength;
    rx: SVGAnimatedLength;
    ry: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGEllipseElement: {
    prototype: SVGEllipseElement;
    new(): SVGEllipseElement;
}

interface SVGFEBlendElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    in2: SVGAnimatedString;
    mode: SVGAnimatedEnumeration;
    SVG_FEBLEND_MODE_COLOR: number;
    SVG_FEBLEND_MODE_COLOR_BURN: number;
    SVG_FEBLEND_MODE_COLOR_DODGE: number;
    SVG_FEBLEND_MODE_DARKEN: number;
    SVG_FEBLEND_MODE_DIFFERENCE: number;
    SVG_FEBLEND_MODE_EXCLUSION: number;
    SVG_FEBLEND_MODE_HARD_LIGHT: number;
    SVG_FEBLEND_MODE_HUE: number;
    SVG_FEBLEND_MODE_LIGHTEN: number;
    SVG_FEBLEND_MODE_LUMINOSITY: number;
    SVG_FEBLEND_MODE_MULTIPLY: number;
    SVG_FEBLEND_MODE_NORMAL: number;
    SVG_FEBLEND_MODE_OVERLAY: number;
    SVG_FEBLEND_MODE_SATURATION: number;
    SVG_FEBLEND_MODE_SCREEN: number;
    SVG_FEBLEND_MODE_SOFT_LIGHT: number;
    SVG_FEBLEND_MODE_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEBlendElement: {
    prototype: SVGFEBlendElement;
    new(): SVGFEBlendElement;
    SVG_FEBLEND_MODE_COLOR: number;
    SVG_FEBLEND_MODE_COLOR_BURN: number;
    SVG_FEBLEND_MODE_COLOR_DODGE: number;
    SVG_FEBLEND_MODE_DARKEN: number;
    SVG_FEBLEND_MODE_DIFFERENCE: number;
    SVG_FEBLEND_MODE_EXCLUSION: number;
    SVG_FEBLEND_MODE_HARD_LIGHT: number;
    SVG_FEBLEND_MODE_HUE: number;
    SVG_FEBLEND_MODE_LIGHTEN: number;
    SVG_FEBLEND_MODE_LUMINOSITY: number;
    SVG_FEBLEND_MODE_MULTIPLY: number;
    SVG_FEBLEND_MODE_NORMAL: number;
    SVG_FEBLEND_MODE_OVERLAY: number;
    SVG_FEBLEND_MODE_SATURATION: number;
    SVG_FEBLEND_MODE_SCREEN: number;
    SVG_FEBLEND_MODE_SOFT_LIGHT: number;
    SVG_FEBLEND_MODE_UNKNOWN: number;
}

interface SVGFEColorMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    type: SVGAnimatedEnumeration;
    values: SVGAnimatedNumberList;
    SVG_FECOLORMATRIX_TYPE_HUEROTATE: number;
    SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA: number;
    SVG_FECOLORMATRIX_TYPE_MATRIX: number;
    SVG_FECOLORMATRIX_TYPE_SATURATE: number;
    SVG_FECOLORMATRIX_TYPE_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEColorMatrixElement: {
    prototype: SVGFEColorMatrixElement;
    new(): SVGFEColorMatrixElement;
    SVG_FECOLORMATRIX_TYPE_HUEROTATE: number;
    SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA: number;
    SVG_FECOLORMATRIX_TYPE_MATRIX: number;
    SVG_FECOLORMATRIX_TYPE_SATURATE: number;
    SVG_FECOLORMATRIX_TYPE_UNKNOWN: number;
}

interface SVGFEComponentTransferElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEComponentTransferElement: {
    prototype: SVGFEComponentTransferElement;
    new(): SVGFEComponentTransferElement;
}

interface SVGFECompositeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    in2: SVGAnimatedString;
    k1: SVGAnimatedNumber;
    k2: SVGAnimatedNumber;
    k3: SVGAnimatedNumber;
    k4: SVGAnimatedNumber;
    operator: SVGAnimatedEnumeration;
    SVG_FECOMPOSITE_OPERATOR_ARITHMETIC: number;
    SVG_FECOMPOSITE_OPERATOR_ATOP: number;
    SVG_FECOMPOSITE_OPERATOR_IN: number;
    SVG_FECOMPOSITE_OPERATOR_OUT: number;
    SVG_FECOMPOSITE_OPERATOR_OVER: number;
    SVG_FECOMPOSITE_OPERATOR_UNKNOWN: number;
    SVG_FECOMPOSITE_OPERATOR_XOR: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFECompositeElement: {
    prototype: SVGFECompositeElement;
    new(): SVGFECompositeElement;
    SVG_FECOMPOSITE_OPERATOR_ARITHMETIC: number;
    SVG_FECOMPOSITE_OPERATOR_ATOP: number;
    SVG_FECOMPOSITE_OPERATOR_IN: number;
    SVG_FECOMPOSITE_OPERATOR_OUT: number;
    SVG_FECOMPOSITE_OPERATOR_OVER: number;
    SVG_FECOMPOSITE_OPERATOR_UNKNOWN: number;
    SVG_FECOMPOSITE_OPERATOR_XOR: number;
}

interface SVGFEConvolveMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    bias: SVGAnimatedNumber;
    divisor: SVGAnimatedNumber;
    edgeMode: SVGAnimatedEnumeration;
    in1: SVGAnimatedString;
    kernelMatrix: SVGAnimatedNumberList;
    kernelUnitLengthX: SVGAnimatedNumber;
    kernelUnitLengthY: SVGAnimatedNumber;
    orderX: SVGAnimatedInteger;
    orderY: SVGAnimatedInteger;
    preserveAlpha: SVGAnimatedBoolean;
    targetX: SVGAnimatedInteger;
    targetY: SVGAnimatedInteger;
    SVG_EDGEMODE_DUPLICATE: number;
    SVG_EDGEMODE_NONE: number;
    SVG_EDGEMODE_UNKNOWN: number;
    SVG_EDGEMODE_WRAP: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEConvolveMatrixElement: {
    prototype: SVGFEConvolveMatrixElement;
    new(): SVGFEConvolveMatrixElement;
    SVG_EDGEMODE_DUPLICATE: number;
    SVG_EDGEMODE_NONE: number;
    SVG_EDGEMODE_UNKNOWN: number;
    SVG_EDGEMODE_WRAP: number;
}

interface SVGFEDiffuseLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    diffuseConstant: SVGAnimatedNumber;
    in1: SVGAnimatedString;
    kernelUnitLengthX: SVGAnimatedNumber;
    kernelUnitLengthY: SVGAnimatedNumber;
    surfaceScale: SVGAnimatedNumber;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEDiffuseLightingElement: {
    prototype: SVGFEDiffuseLightingElement;
    new(): SVGFEDiffuseLightingElement;
}

interface SVGFEDisplacementMapElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    in2: SVGAnimatedString;
    scale: SVGAnimatedNumber;
    xChannelSelector: SVGAnimatedEnumeration;
    yChannelSelector: SVGAnimatedEnumeration;
    SVG_CHANNEL_A: number;
    SVG_CHANNEL_B: number;
    SVG_CHANNEL_G: number;
    SVG_CHANNEL_R: number;
    SVG_CHANNEL_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEDisplacementMapElement: {
    prototype: SVGFEDisplacementMapElement;
    new(): SVGFEDisplacementMapElement;
    SVG_CHANNEL_A: number;
    SVG_CHANNEL_B: number;
    SVG_CHANNEL_G: number;
    SVG_CHANNEL_R: number;
    SVG_CHANNEL_UNKNOWN: number;
}

interface SVGFEDistantLightElement extends SVGElement {
    azimuth: SVGAnimatedNumber;
    elevation: SVGAnimatedNumber;
}

declare var SVGFEDistantLightElement: {
    prototype: SVGFEDistantLightElement;
    new(): SVGFEDistantLightElement;
}

interface SVGFEFloodElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEFloodElement: {
    prototype: SVGFEFloodElement;
    new(): SVGFEFloodElement;
}

interface SVGFEFuncAElement extends SVGComponentTransferFunctionElement {
}

declare var SVGFEFuncAElement: {
    prototype: SVGFEFuncAElement;
    new(): SVGFEFuncAElement;
}

interface SVGFEFuncBElement extends SVGComponentTransferFunctionElement {
}

declare var SVGFEFuncBElement: {
    prototype: SVGFEFuncBElement;
    new(): SVGFEFuncBElement;
}

interface SVGFEFuncGElement extends SVGComponentTransferFunctionElement {
}

declare var SVGFEFuncGElement: {
    prototype: SVGFEFuncGElement;
    new(): SVGFEFuncGElement;
}

interface SVGFEFuncRElement extends SVGComponentTransferFunctionElement {
}

declare var SVGFEFuncRElement: {
    prototype: SVGFEFuncRElement;
    new(): SVGFEFuncRElement;
}

interface SVGFEGaussianBlurElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    stdDeviationX: SVGAnimatedNumber;
    stdDeviationY: SVGAnimatedNumber;
    setStdDeviation(stdDeviationX: number, stdDeviationY: number): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEGaussianBlurElement: {
    prototype: SVGFEGaussianBlurElement;
    new(): SVGFEGaussianBlurElement;
}

interface SVGFEImageElement extends SVGElement, SVGFilterPrimitiveStandardAttributes, SVGLangSpace, SVGURIReference, SVGExternalResourcesRequired {
    preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEImageElement: {
    prototype: SVGFEImageElement;
    new(): SVGFEImageElement;
}

interface SVGFEMergeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEMergeElement: {
    prototype: SVGFEMergeElement;
    new(): SVGFEMergeElement;
}

interface SVGFEMergeNodeElement extends SVGElement {
    in1: SVGAnimatedString;
}

declare var SVGFEMergeNodeElement: {
    prototype: SVGFEMergeNodeElement;
    new(): SVGFEMergeNodeElement;
}

interface SVGFEMorphologyElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    operator: SVGAnimatedEnumeration;
    radiusX: SVGAnimatedNumber;
    radiusY: SVGAnimatedNumber;
    SVG_MORPHOLOGY_OPERATOR_DILATE: number;
    SVG_MORPHOLOGY_OPERATOR_ERODE: number;
    SVG_MORPHOLOGY_OPERATOR_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEMorphologyElement: {
    prototype: SVGFEMorphologyElement;
    new(): SVGFEMorphologyElement;
    SVG_MORPHOLOGY_OPERATOR_DILATE: number;
    SVG_MORPHOLOGY_OPERATOR_ERODE: number;
    SVG_MORPHOLOGY_OPERATOR_UNKNOWN: number;
}

interface SVGFEOffsetElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    dx: SVGAnimatedNumber;
    dy: SVGAnimatedNumber;
    in1: SVGAnimatedString;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFEOffsetElement: {
    prototype: SVGFEOffsetElement;
    new(): SVGFEOffsetElement;
}

interface SVGFEPointLightElement extends SVGElement {
    x: SVGAnimatedNumber;
    y: SVGAnimatedNumber;
    z: SVGAnimatedNumber;
}

declare var SVGFEPointLightElement: {
    prototype: SVGFEPointLightElement;
    new(): SVGFEPointLightElement;
}

interface SVGFESpecularLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    kernelUnitLengthX: SVGAnimatedNumber;
    kernelUnitLengthY: SVGAnimatedNumber;
    specularConstant: SVGAnimatedNumber;
    specularExponent: SVGAnimatedNumber;
    surfaceScale: SVGAnimatedNumber;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFESpecularLightingElement: {
    prototype: SVGFESpecularLightingElement;
    new(): SVGFESpecularLightingElement;
}

interface SVGFESpotLightElement extends SVGElement {
    limitingConeAngle: SVGAnimatedNumber;
    pointsAtX: SVGAnimatedNumber;
    pointsAtY: SVGAnimatedNumber;
    pointsAtZ: SVGAnimatedNumber;
    specularExponent: SVGAnimatedNumber;
    x: SVGAnimatedNumber;
    y: SVGAnimatedNumber;
    z: SVGAnimatedNumber;
}

declare var SVGFESpotLightElement: {
    prototype: SVGFESpotLightElement;
    new(): SVGFESpotLightElement;
}

interface SVGFETileElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    in1: SVGAnimatedString;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFETileElement: {
    prototype: SVGFETileElement;
    new(): SVGFETileElement;
}

interface SVGFETurbulenceElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    baseFrequencyX: SVGAnimatedNumber;
    baseFrequencyY: SVGAnimatedNumber;
    numOctaves: SVGAnimatedInteger;
    seed: SVGAnimatedNumber;
    stitchTiles: SVGAnimatedEnumeration;
    type: SVGAnimatedEnumeration;
    SVG_STITCHTYPE_NOSTITCH: number;
    SVG_STITCHTYPE_STITCH: number;
    SVG_STITCHTYPE_UNKNOWN: number;
    SVG_TURBULENCE_TYPE_FRACTALNOISE: number;
    SVG_TURBULENCE_TYPE_TURBULENCE: number;
    SVG_TURBULENCE_TYPE_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFETurbulenceElement: {
    prototype: SVGFETurbulenceElement;
    new(): SVGFETurbulenceElement;
    SVG_STITCHTYPE_NOSTITCH: number;
    SVG_STITCHTYPE_STITCH: number;
    SVG_STITCHTYPE_UNKNOWN: number;
    SVG_TURBULENCE_TYPE_FRACTALNOISE: number;
    SVG_TURBULENCE_TYPE_TURBULENCE: number;
    SVG_TURBULENCE_TYPE_UNKNOWN: number;
}

interface SVGFilterElement extends SVGElement, SVGUnitTypes, SVGStylable, SVGLangSpace, SVGURIReference, SVGExternalResourcesRequired {
    filterResX: SVGAnimatedInteger;
    filterResY: SVGAnimatedInteger;
    filterUnits: SVGAnimatedEnumeration;
    height: SVGAnimatedLength;
    primitiveUnits: SVGAnimatedEnumeration;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    setFilterRes(filterResX: number, filterResY: number): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGFilterElement: {
    prototype: SVGFilterElement;
    new(): SVGFilterElement;
}

interface SVGForeignObjectElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    height: SVGAnimatedLength;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGForeignObjectElement: {
    prototype: SVGForeignObjectElement;
    new(): SVGForeignObjectElement;
}

interface SVGGElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGGElement: {
    prototype: SVGGElement;
    new(): SVGGElement;
}

interface SVGGradientElement extends SVGElement, SVGStylable, SVGExternalResourcesRequired, SVGURIReference, SVGUnitTypes {
    gradientTransform: SVGAnimatedTransformList;
    gradientUnits: SVGAnimatedEnumeration;
    spreadMethod: SVGAnimatedEnumeration;
    SVG_SPREADMETHOD_PAD: number;
    SVG_SPREADMETHOD_REFLECT: number;
    SVG_SPREADMETHOD_REPEAT: number;
    SVG_SPREADMETHOD_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGGradientElement: {
    prototype: SVGGradientElement;
    new(): SVGGradientElement;
    SVG_SPREADMETHOD_PAD: number;
    SVG_SPREADMETHOD_REFLECT: number;
    SVG_SPREADMETHOD_REPEAT: number;
    SVG_SPREADMETHOD_UNKNOWN: number;
}

interface SVGImageElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGURIReference {
    height: SVGAnimatedLength;
    preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGImageElement: {
    prototype: SVGImageElement;
    new(): SVGImageElement;
}

interface SVGLength {
    unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
    SVG_LENGTHTYPE_CM: number;
    SVG_LENGTHTYPE_EMS: number;
    SVG_LENGTHTYPE_EXS: number;
    SVG_LENGTHTYPE_IN: number;
    SVG_LENGTHTYPE_MM: number;
    SVG_LENGTHTYPE_NUMBER: number;
    SVG_LENGTHTYPE_PC: number;
    SVG_LENGTHTYPE_PERCENTAGE: number;
    SVG_LENGTHTYPE_PT: number;
    SVG_LENGTHTYPE_PX: number;
    SVG_LENGTHTYPE_UNKNOWN: number;
}

declare var SVGLength: {
    prototype: SVGLength;
    new(): SVGLength;
    SVG_LENGTHTYPE_CM: number;
    SVG_LENGTHTYPE_EMS: number;
    SVG_LENGTHTYPE_EXS: number;
    SVG_LENGTHTYPE_IN: number;
    SVG_LENGTHTYPE_MM: number;
    SVG_LENGTHTYPE_NUMBER: number;
    SVG_LENGTHTYPE_PC: number;
    SVG_LENGTHTYPE_PERCENTAGE: number;
    SVG_LENGTHTYPE_PT: number;
    SVG_LENGTHTYPE_PX: number;
    SVG_LENGTHTYPE_UNKNOWN: number;
}

interface SVGLengthList {
    numberOfItems: number;
    appendItem(newItem: SVGLength): SVGLength;
    clear(): void;
    getItem(index: number): SVGLength;
    initialize(newItem: SVGLength): SVGLength;
    insertItemBefore(newItem: SVGLength, index: number): SVGLength;
    removeItem(index: number): SVGLength;
    replaceItem(newItem: SVGLength, index: number): SVGLength;
}

declare var SVGLengthList: {
    prototype: SVGLengthList;
    new(): SVGLengthList;
}

interface SVGLineElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    x1: SVGAnimatedLength;
    x2: SVGAnimatedLength;
    y1: SVGAnimatedLength;
    y2: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGLineElement: {
    prototype: SVGLineElement;
    new(): SVGLineElement;
}

interface SVGLinearGradientElement extends SVGGradientElement {
    x1: SVGAnimatedLength;
    x2: SVGAnimatedLength;
    y1: SVGAnimatedLength;
    y2: SVGAnimatedLength;
}

declare var SVGLinearGradientElement: {
    prototype: SVGLinearGradientElement;
    new(): SVGLinearGradientElement;
}

interface SVGMarkerElement extends SVGElement, SVGStylable, SVGLangSpace, SVGExternalResourcesRequired, SVGFitToViewBox {
    markerHeight: SVGAnimatedLength;
    markerUnits: SVGAnimatedEnumeration;
    markerWidth: SVGAnimatedLength;
    orientAngle: SVGAnimatedAngle;
    orientType: SVGAnimatedEnumeration;
    refX: SVGAnimatedLength;
    refY: SVGAnimatedLength;
    setOrientToAngle(angle: SVGAngle): void;
    setOrientToAuto(): void;
    SVG_MARKERUNITS_STROKEWIDTH: number;
    SVG_MARKERUNITS_UNKNOWN: number;
    SVG_MARKERUNITS_USERSPACEONUSE: number;
    SVG_MARKER_ORIENT_ANGLE: number;
    SVG_MARKER_ORIENT_AUTO: number;
    SVG_MARKER_ORIENT_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGMarkerElement: {
    prototype: SVGMarkerElement;
    new(): SVGMarkerElement;
    SVG_MARKERUNITS_STROKEWIDTH: number;
    SVG_MARKERUNITS_UNKNOWN: number;
    SVG_MARKERUNITS_USERSPACEONUSE: number;
    SVG_MARKER_ORIENT_ANGLE: number;
    SVG_MARKER_ORIENT_AUTO: number;
    SVG_MARKER_ORIENT_UNKNOWN: number;
}

interface SVGMaskElement extends SVGElement, SVGStylable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGUnitTypes {
    height: SVGAnimatedLength;
    maskContentUnits: SVGAnimatedEnumeration;
    maskUnits: SVGAnimatedEnumeration;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGMaskElement: {
    prototype: SVGMaskElement;
    new(): SVGMaskElement;
}

interface SVGMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    flipX(): SVGMatrix;
    flipY(): SVGMatrix;
    inverse(): SVGMatrix;
    multiply(secondMatrix: SVGMatrix): SVGMatrix;
    rotate(angle: number): SVGMatrix;
    rotateFromVector(x: number, y: number): SVGMatrix;
    scale(scaleFactor: number): SVGMatrix;
    scaleNonUniform(scaleFactorX: number, scaleFactorY: number): SVGMatrix;
    skewX(angle: number): SVGMatrix;
    skewY(angle: number): SVGMatrix;
    translate(x: number, y: number): SVGMatrix;
}

declare var SVGMatrix: {
    prototype: SVGMatrix;
    new(): SVGMatrix;
}

interface SVGMetadataElement extends SVGElement {
}

declare var SVGMetadataElement: {
    prototype: SVGMetadataElement;
    new(): SVGMetadataElement;
}

interface SVGNumber {
    value: number;
}

declare var SVGNumber: {
    prototype: SVGNumber;
    new(): SVGNumber;
}

interface SVGNumberList {
    numberOfItems: number;
    appendItem(newItem: SVGNumber): SVGNumber;
    clear(): void;
    getItem(index: number): SVGNumber;
    initialize(newItem: SVGNumber): SVGNumber;
    insertItemBefore(newItem: SVGNumber, index: number): SVGNumber;
    removeItem(index: number): SVGNumber;
    replaceItem(newItem: SVGNumber, index: number): SVGNumber;
}

declare var SVGNumberList: {
    prototype: SVGNumberList;
    new(): SVGNumberList;
}

interface SVGPathElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGAnimatedPathData {
    createSVGPathSegArcAbs(x: number, y: number, r1: number, r2: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean): SVGPathSegArcAbs;
    createSVGPathSegArcRel(x: number, y: number, r1: number, r2: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean): SVGPathSegArcRel;
    createSVGPathSegClosePath(): SVGPathSegClosePath;
    createSVGPathSegCurvetoCubicAbs(x: number, y: number, x1: number, y1: number, x2: number, y2: number): SVGPathSegCurvetoCubicAbs;
    createSVGPathSegCurvetoCubicRel(x: number, y: number, x1: number, y1: number, x2: number, y2: number): SVGPathSegCurvetoCubicRel;
    createSVGPathSegCurvetoCubicSmoothAbs(x: number, y: number, x2: number, y2: number): SVGPathSegCurvetoCubicSmoothAbs;
    createSVGPathSegCurvetoCubicSmoothRel(x: number, y: number, x2: number, y2: number): SVGPathSegCurvetoCubicSmoothRel;
    createSVGPathSegCurvetoQuadraticAbs(x: number, y: number, x1: number, y1: number): SVGPathSegCurvetoQuadraticAbs;
    createSVGPathSegCurvetoQuadraticRel(x: number, y: number, x1: number, y1: number): SVGPathSegCurvetoQuadraticRel;
    createSVGPathSegCurvetoQuadraticSmoothAbs(x: number, y: number): SVGPathSegCurvetoQuadraticSmoothAbs;
    createSVGPathSegCurvetoQuadraticSmoothRel(x: number, y: number): SVGPathSegCurvetoQuadraticSmoothRel;
    createSVGPathSegLinetoAbs(x: number, y: number): SVGPathSegLinetoAbs;
    createSVGPathSegLinetoHorizontalAbs(x: number): SVGPathSegLinetoHorizontalAbs;
    createSVGPathSegLinetoHorizontalRel(x: number): SVGPathSegLinetoHorizontalRel;
    createSVGPathSegLinetoRel(x: number, y: number): SVGPathSegLinetoRel;
    createSVGPathSegLinetoVerticalAbs(y: number): SVGPathSegLinetoVerticalAbs;
    createSVGPathSegLinetoVerticalRel(y: number): SVGPathSegLinetoVerticalRel;
    createSVGPathSegMovetoAbs(x: number, y: number): SVGPathSegMovetoAbs;
    createSVGPathSegMovetoRel(x: number, y: number): SVGPathSegMovetoRel;
    getPathSegAtLength(distance: number): number;
    getPointAtLength(distance: number): SVGPoint;
    getTotalLength(): number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGPathElement: {
    prototype: SVGPathElement;
    new(): SVGPathElement;
}

interface SVGPathSeg {
    pathSegType: number;
    pathSegTypeAsLetter: string;
    PATHSEG_ARC_ABS: number;
    PATHSEG_ARC_REL: number;
    PATHSEG_CLOSEPATH: number;
    PATHSEG_CURVETO_CUBIC_ABS: number;
    PATHSEG_CURVETO_CUBIC_REL: number;
    PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
    PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
    PATHSEG_CURVETO_QUADRATIC_ABS: number;
    PATHSEG_CURVETO_QUADRATIC_REL: number;
    PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
    PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
    PATHSEG_LINETO_ABS: number;
    PATHSEG_LINETO_HORIZONTAL_ABS: number;
    PATHSEG_LINETO_HORIZONTAL_REL: number;
    PATHSEG_LINETO_REL: number;
    PATHSEG_LINETO_VERTICAL_ABS: number;
    PATHSEG_LINETO_VERTICAL_REL: number;
    PATHSEG_MOVETO_ABS: number;
    PATHSEG_MOVETO_REL: number;
    PATHSEG_UNKNOWN: number;
}

declare var SVGPathSeg: {
    prototype: SVGPathSeg;
    new(): SVGPathSeg;
    PATHSEG_ARC_ABS: number;
    PATHSEG_ARC_REL: number;
    PATHSEG_CLOSEPATH: number;
    PATHSEG_CURVETO_CUBIC_ABS: number;
    PATHSEG_CURVETO_CUBIC_REL: number;
    PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
    PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
    PATHSEG_CURVETO_QUADRATIC_ABS: number;
    PATHSEG_CURVETO_QUADRATIC_REL: number;
    PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
    PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
    PATHSEG_LINETO_ABS: number;
    PATHSEG_LINETO_HORIZONTAL_ABS: number;
    PATHSEG_LINETO_HORIZONTAL_REL: number;
    PATHSEG_LINETO_REL: number;
    PATHSEG_LINETO_VERTICAL_ABS: number;
    PATHSEG_LINETO_VERTICAL_REL: number;
    PATHSEG_MOVETO_ABS: number;
    PATHSEG_MOVETO_REL: number;
    PATHSEG_UNKNOWN: number;
}

interface SVGPathSegArcAbs extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}

declare var SVGPathSegArcAbs: {
    prototype: SVGPathSegArcAbs;
    new(): SVGPathSegArcAbs;
}

interface SVGPathSegArcRel extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}

declare var SVGPathSegArcRel: {
    prototype: SVGPathSegArcRel;
    new(): SVGPathSegArcRel;
}

interface SVGPathSegClosePath extends SVGPathSeg {
}

declare var SVGPathSegClosePath: {
    prototype: SVGPathSegClosePath;
    new(): SVGPathSegClosePath;
}

interface SVGPathSegCurvetoCubicAbs extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicAbs: {
    prototype: SVGPathSegCurvetoCubicAbs;
    new(): SVGPathSegCurvetoCubicAbs;
}

interface SVGPathSegCurvetoCubicRel extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicRel: {
    prototype: SVGPathSegCurvetoCubicRel;
    new(): SVGPathSegCurvetoCubicRel;
}

interface SVGPathSegCurvetoCubicSmoothAbs extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicSmoothAbs: {
    prototype: SVGPathSegCurvetoCubicSmoothAbs;
    new(): SVGPathSegCurvetoCubicSmoothAbs;
}

interface SVGPathSegCurvetoCubicSmoothRel extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicSmoothRel: {
    prototype: SVGPathSegCurvetoCubicSmoothRel;
    new(): SVGPathSegCurvetoCubicSmoothRel;
}

interface SVGPathSegCurvetoQuadraticAbs extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

declare var SVGPathSegCurvetoQuadraticAbs: {
    prototype: SVGPathSegCurvetoQuadraticAbs;
    new(): SVGPathSegCurvetoQuadraticAbs;
}

interface SVGPathSegCurvetoQuadraticRel extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

declare var SVGPathSegCurvetoQuadraticRel: {
    prototype: SVGPathSegCurvetoQuadraticRel;
    new(): SVGPathSegCurvetoQuadraticRel;
}

interface SVGPathSegCurvetoQuadraticSmoothAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegCurvetoQuadraticSmoothAbs: {
    prototype: SVGPathSegCurvetoQuadraticSmoothAbs;
    new(): SVGPathSegCurvetoQuadraticSmoothAbs;
}

interface SVGPathSegCurvetoQuadraticSmoothRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegCurvetoQuadraticSmoothRel: {
    prototype: SVGPathSegCurvetoQuadraticSmoothRel;
    new(): SVGPathSegCurvetoQuadraticSmoothRel;
}

interface SVGPathSegLinetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegLinetoAbs: {
    prototype: SVGPathSegLinetoAbs;
    new(): SVGPathSegLinetoAbs;
}

interface SVGPathSegLinetoHorizontalAbs extends SVGPathSeg {
    x: number;
}

declare var SVGPathSegLinetoHorizontalAbs: {
    prototype: SVGPathSegLinetoHorizontalAbs;
    new(): SVGPathSegLinetoHorizontalAbs;
}

interface SVGPathSegLinetoHorizontalRel extends SVGPathSeg {
    x: number;
}

declare var SVGPathSegLinetoHorizontalRel: {
    prototype: SVGPathSegLinetoHorizontalRel;
    new(): SVGPathSegLinetoHorizontalRel;
}

interface SVGPathSegLinetoRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegLinetoRel: {
    prototype: SVGPathSegLinetoRel;
    new(): SVGPathSegLinetoRel;
}

interface SVGPathSegLinetoVerticalAbs extends SVGPathSeg {
    y: number;
}

declare var SVGPathSegLinetoVerticalAbs: {
    prototype: SVGPathSegLinetoVerticalAbs;
    new(): SVGPathSegLinetoVerticalAbs;
}

interface SVGPathSegLinetoVerticalRel extends SVGPathSeg {
    y: number;
}

declare var SVGPathSegLinetoVerticalRel: {
    prototype: SVGPathSegLinetoVerticalRel;
    new(): SVGPathSegLinetoVerticalRel;
}

interface SVGPathSegList {
    numberOfItems: number;
    appendItem(newItem: SVGPathSeg): SVGPathSeg;
    clear(): void;
    getItem(index: number): SVGPathSeg;
    initialize(newItem: SVGPathSeg): SVGPathSeg;
    insertItemBefore(newItem: SVGPathSeg, index: number): SVGPathSeg;
    removeItem(index: number): SVGPathSeg;
    replaceItem(newItem: SVGPathSeg, index: number): SVGPathSeg;
}

declare var SVGPathSegList: {
    prototype: SVGPathSegList;
    new(): SVGPathSegList;
}

interface SVGPathSegMovetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegMovetoAbs: {
    prototype: SVGPathSegMovetoAbs;
    new(): SVGPathSegMovetoAbs;
}

interface SVGPathSegMovetoRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegMovetoRel: {
    prototype: SVGPathSegMovetoRel;
    new(): SVGPathSegMovetoRel;
}

interface SVGPatternElement extends SVGElement, SVGStylable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGFitToViewBox, SVGURIReference, SVGUnitTypes {
    height: SVGAnimatedLength;
    patternContentUnits: SVGAnimatedEnumeration;
    patternTransform: SVGAnimatedTransformList;
    patternUnits: SVGAnimatedEnumeration;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGPatternElement: {
    prototype: SVGPatternElement;
    new(): SVGPatternElement;
}

interface SVGPoint {
    x: number;
    y: number;
    matrixTransform(matrix: SVGMatrix): SVGPoint;
}

declare var SVGPoint: {
    prototype: SVGPoint;
    new(): SVGPoint;
}

interface SVGPointList {
    numberOfItems: number;
    appendItem(newItem: SVGPoint): SVGPoint;
    clear(): void;
    getItem(index: number): SVGPoint;
    initialize(newItem: SVGPoint): SVGPoint;
    insertItemBefore(newItem: SVGPoint, index: number): SVGPoint;
    removeItem(index: number): SVGPoint;
    replaceItem(newItem: SVGPoint, index: number): SVGPoint;
}

declare var SVGPointList: {
    prototype: SVGPointList;
    new(): SVGPointList;
}

interface SVGPolygonElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGAnimatedPoints {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGPolygonElement: {
    prototype: SVGPolygonElement;
    new(): SVGPolygonElement;
}

interface SVGPolylineElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGAnimatedPoints {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGPolylineElement: {
    prototype: SVGPolylineElement;
    new(): SVGPolylineElement;
}

interface SVGPreserveAspectRatio {
    align: number;
    meetOrSlice: number;
    SVG_MEETORSLICE_MEET: number;
    SVG_MEETORSLICE_SLICE: number;
    SVG_MEETORSLICE_UNKNOWN: number;
    SVG_PRESERVEASPECTRATIO_NONE: number;
    SVG_PRESERVEASPECTRATIO_UNKNOWN: number;
    SVG_PRESERVEASPECTRATIO_XMAXYMAX: number;
    SVG_PRESERVEASPECTRATIO_XMAXYMID: number;
    SVG_PRESERVEASPECTRATIO_XMAXYMIN: number;
    SVG_PRESERVEASPECTRATIO_XMIDYMAX: number;
    SVG_PRESERVEASPECTRATIO_XMIDYMID: number;
    SVG_PRESERVEASPECTRATIO_XMIDYMIN: number;
    SVG_PRESERVEASPECTRATIO_XMINYMAX: number;
    SVG_PRESERVEASPECTRATIO_XMINYMID: number;
    SVG_PRESERVEASPECTRATIO_XMINYMIN: number;
}

declare var SVGPreserveAspectRatio: {
    prototype: SVGPreserveAspectRatio;
    new(): SVGPreserveAspectRatio;
    SVG_MEETORSLICE_MEET: number;
    SVG_MEETORSLICE_SLICE: number;
    SVG_MEETORSLICE_UNKNOWN: number;
    SVG_PRESERVEASPECTRATIO_NONE: number;
    SVG_PRESERVEASPECTRATIO_UNKNOWN: number;
    SVG_PRESERVEASPECTRATIO_XMAXYMAX: number;
    SVG_PRESERVEASPECTRATIO_XMAXYMID: number;
    SVG_PRESERVEASPECTRATIO_XMAXYMIN: number;
    SVG_PRESERVEASPECTRATIO_XMIDYMAX: number;
    SVG_PRESERVEASPECTRATIO_XMIDYMID: number;
    SVG_PRESERVEASPECTRATIO_XMIDYMIN: number;
    SVG_PRESERVEASPECTRATIO_XMINYMAX: number;
    SVG_PRESERVEASPECTRATIO_XMINYMID: number;
    SVG_PRESERVEASPECTRATIO_XMINYMIN: number;
}

interface SVGRadialGradientElement extends SVGGradientElement {
    cx: SVGAnimatedLength;
    cy: SVGAnimatedLength;
    fx: SVGAnimatedLength;
    fy: SVGAnimatedLength;
    r: SVGAnimatedLength;
}

declare var SVGRadialGradientElement: {
    prototype: SVGRadialGradientElement;
    new(): SVGRadialGradientElement;
}

interface SVGRect {
    height: number;
    width: number;
    x: number;
    y: number;
}

declare var SVGRect: {
    prototype: SVGRect;
    new(): SVGRect;
}

interface SVGRectElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    height: SVGAnimatedLength;
    rx: SVGAnimatedLength;
    ry: SVGAnimatedLength;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGRectElement: {
    prototype: SVGRectElement;
    new(): SVGRectElement;
}

interface SVGSVGElement extends SVGElement, DocumentEvent, SVGLocatable, SVGTests, SVGStylable, SVGLangSpace, SVGExternalResourcesRequired, SVGFitToViewBox, SVGZoomAndPan {
    contentScriptType: string;
    contentStyleType: string;
    currentScale: number;
    currentTranslate: SVGPoint;
    height: SVGAnimatedLength;
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onresize: (ev: UIEvent) => any;
    onscroll: (ev: UIEvent) => any;
    onunload: (ev: Event) => any;
    onzoom: (ev: SVGZoomEvent) => any;
    pixelUnitToMillimeterX: number;
    pixelUnitToMillimeterY: number;
    screenPixelToMillimeterX: number;
    screenPixelToMillimeterY: number;
    viewport: SVGRect;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    checkEnclosure(element: SVGElement, rect: SVGRect): boolean;
    checkIntersection(element: SVGElement, rect: SVGRect): boolean;
    createSVGAngle(): SVGAngle;
    createSVGLength(): SVGLength;
    createSVGMatrix(): SVGMatrix;
    createSVGNumber(): SVGNumber;
    createSVGPoint(): SVGPoint;
    createSVGRect(): SVGRect;
    createSVGTransform(): SVGTransform;
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    deselectAll(): void;
    forceRedraw(): void;
    getComputedStyle(elt: Element, pseudoElt?: string): CSSStyleDeclaration;
    getCurrentTime(): number;
    getElementById(elementId: string): Element;
    getEnclosureList(rect: SVGRect, referenceElement: SVGElement): NodeList;
    getIntersectionList(rect: SVGRect, referenceElement: SVGElement): NodeList;
    pauseAnimations(): void;
    setCurrentTime(seconds: number): void;
    suspendRedraw(maxWaitMilliseconds: number): number;
    unpauseAnimations(): void;
    unsuspendRedraw(suspendHandleID: number): void;
    unsuspendRedrawAll(): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "SVGAbort", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "SVGError", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "SVGUnload", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "SVGZoom", listener: (ev: SVGZoomEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focusin", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focusout", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "resize", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGSVGElement: {
    prototype: SVGSVGElement;
    new(): SVGSVGElement;
}

interface SVGScriptElement extends SVGElement, SVGExternalResourcesRequired, SVGURIReference {
    type: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGScriptElement: {
    prototype: SVGScriptElement;
    new(): SVGScriptElement;
}

interface SVGStopElement extends SVGElement, SVGStylable {
    offset: SVGAnimatedNumber;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGStopElement: {
    prototype: SVGStopElement;
    new(): SVGStopElement;
}

interface SVGStringList {
    numberOfItems: number;
    appendItem(newItem: string): string;
    clear(): void;
    getItem(index: number): string;
    initialize(newItem: string): string;
    insertItemBefore(newItem: string, index: number): string;
    removeItem(index: number): string;
    replaceItem(newItem: string, index: number): string;
}

declare var SVGStringList: {
    prototype: SVGStringList;
    new(): SVGStringList;
}

interface SVGStyleElement extends SVGElement, SVGLangSpace {
    media: string;
    title: string;
    type: string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGStyleElement: {
    prototype: SVGStyleElement;
    new(): SVGStyleElement;
}

interface SVGSwitchElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGSwitchElement: {
    prototype: SVGSwitchElement;
    new(): SVGSwitchElement;
}

interface SVGSymbolElement extends SVGElement, SVGStylable, SVGLangSpace, SVGExternalResourcesRequired, SVGFitToViewBox {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGSymbolElement: {
    prototype: SVGSymbolElement;
    new(): SVGSymbolElement;
}

interface SVGTSpanElement extends SVGTextPositioningElement {
}

declare var SVGTSpanElement: {
    prototype: SVGTSpanElement;
    new(): SVGTSpanElement;
}

interface SVGTextContentElement extends SVGElement, SVGStylable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired {
    lengthAdjust: SVGAnimatedEnumeration;
    textLength: SVGAnimatedLength;
    getCharNumAtPosition(point: SVGPoint): number;
    getComputedTextLength(): number;
    getEndPositionOfChar(charnum: number): SVGPoint;
    getExtentOfChar(charnum: number): SVGRect;
    getNumberOfChars(): number;
    getRotationOfChar(charnum: number): number;
    getStartPositionOfChar(charnum: number): SVGPoint;
    getSubStringLength(charnum: number, nchars: number): number;
    selectSubString(charnum: number, nchars: number): void;
    LENGTHADJUST_SPACING: number;
    LENGTHADJUST_SPACINGANDGLYPHS: number;
    LENGTHADJUST_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGTextContentElement: {
    prototype: SVGTextContentElement;
    new(): SVGTextContentElement;
    LENGTHADJUST_SPACING: number;
    LENGTHADJUST_SPACINGANDGLYPHS: number;
    LENGTHADJUST_UNKNOWN: number;
}

interface SVGTextElement extends SVGTextPositioningElement, SVGTransformable {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGTextElement: {
    prototype: SVGTextElement;
    new(): SVGTextElement;
}

interface SVGTextPathElement extends SVGTextContentElement, SVGURIReference {
    method: SVGAnimatedEnumeration;
    spacing: SVGAnimatedEnumeration;
    startOffset: SVGAnimatedLength;
    TEXTPATH_METHODTYPE_ALIGN: number;
    TEXTPATH_METHODTYPE_STRETCH: number;
    TEXTPATH_METHODTYPE_UNKNOWN: number;
    TEXTPATH_SPACINGTYPE_AUTO: number;
    TEXTPATH_SPACINGTYPE_EXACT: number;
    TEXTPATH_SPACINGTYPE_UNKNOWN: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGTextPathElement: {
    prototype: SVGTextPathElement;
    new(): SVGTextPathElement;
    TEXTPATH_METHODTYPE_ALIGN: number;
    TEXTPATH_METHODTYPE_STRETCH: number;
    TEXTPATH_METHODTYPE_UNKNOWN: number;
    TEXTPATH_SPACINGTYPE_AUTO: number;
    TEXTPATH_SPACINGTYPE_EXACT: number;
    TEXTPATH_SPACINGTYPE_UNKNOWN: number;
}

interface SVGTextPositioningElement extends SVGTextContentElement {
    dx: SVGAnimatedLengthList;
    dy: SVGAnimatedLengthList;
    rotate: SVGAnimatedNumberList;
    x: SVGAnimatedLengthList;
    y: SVGAnimatedLengthList;
}

declare var SVGTextPositioningElement: {
    prototype: SVGTextPositioningElement;
    new(): SVGTextPositioningElement;
}

interface SVGTitleElement extends SVGElement, SVGStylable, SVGLangSpace {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGTitleElement: {
    prototype: SVGTitleElement;
    new(): SVGTitleElement;
}

interface SVGTransform {
    angle: number;
    matrix: SVGMatrix;
    type: number;
    setMatrix(matrix: SVGMatrix): void;
    setRotate(angle: number, cx: number, cy: number): void;
    setScale(sx: number, sy: number): void;
    setSkewX(angle: number): void;
    setSkewY(angle: number): void;
    setTranslate(tx: number, ty: number): void;
    SVG_TRANSFORM_MATRIX: number;
    SVG_TRANSFORM_ROTATE: number;
    SVG_TRANSFORM_SCALE: number;
    SVG_TRANSFORM_SKEWX: number;
    SVG_TRANSFORM_SKEWY: number;
    SVG_TRANSFORM_TRANSLATE: number;
    SVG_TRANSFORM_UNKNOWN: number;
}

declare var SVGTransform: {
    prototype: SVGTransform;
    new(): SVGTransform;
    SVG_TRANSFORM_MATRIX: number;
    SVG_TRANSFORM_ROTATE: number;
    SVG_TRANSFORM_SCALE: number;
    SVG_TRANSFORM_SKEWX: number;
    SVG_TRANSFORM_SKEWY: number;
    SVG_TRANSFORM_TRANSLATE: number;
    SVG_TRANSFORM_UNKNOWN: number;
}

interface SVGTransformList {
    numberOfItems: number;
    appendItem(newItem: SVGTransform): SVGTransform;
    clear(): void;
    consolidate(): SVGTransform;
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    getItem(index: number): SVGTransform;
    initialize(newItem: SVGTransform): SVGTransform;
    insertItemBefore(newItem: SVGTransform, index: number): SVGTransform;
    removeItem(index: number): SVGTransform;
    replaceItem(newItem: SVGTransform, index: number): SVGTransform;
}

declare var SVGTransformList: {
    prototype: SVGTransformList;
    new(): SVGTransformList;
}

interface SVGUnitTypes {
    SVG_UNIT_TYPE_OBJECTBOUNDINGBOX: number;
    SVG_UNIT_TYPE_UNKNOWN: number;
    SVG_UNIT_TYPE_USERSPACEONUSE: number;
}
declare var SVGUnitTypes: SVGUnitTypes;

interface SVGUseElement extends SVGElement, SVGStylable, SVGTransformable, SVGTests, SVGLangSpace, SVGExternalResourcesRequired, SVGURIReference {
    animatedInstanceRoot: SVGElementInstance;
    height: SVGAnimatedLength;
    instanceRoot: SVGElementInstance;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGUseElement: {
    prototype: SVGUseElement;
    new(): SVGUseElement;
}

interface SVGViewElement extends SVGElement, SVGExternalResourcesRequired, SVGFitToViewBox, SVGZoomAndPan {
    viewTarget: SVGStringList;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var SVGViewElement: {
    prototype: SVGViewElement;
    new(): SVGViewElement;
}

interface SVGZoomAndPan {
    SVG_ZOOMANDPAN_DISABLE: number;
    SVG_ZOOMANDPAN_MAGNIFY: number;
    SVG_ZOOMANDPAN_UNKNOWN: number;
}
declare var SVGZoomAndPan: SVGZoomAndPan;

interface SVGZoomEvent extends UIEvent {
    newScale: number;
    newTranslate: SVGPoint;
    previousScale: number;
    previousTranslate: SVGPoint;
    zoomRectScreen: SVGRect;
}

declare var SVGZoomEvent: {
    prototype: SVGZoomEvent;
    new(): SVGZoomEvent;
}

interface Screen extends EventTarget {
    availHeight: number;
    availWidth: number;
    bufferDepth: number;
    colorDepth: number;
    deviceXDPI: number;
    deviceYDPI: number;
    fontSmoothingEnabled: boolean;
    height: number;
    logicalXDPI: number;
    logicalYDPI: number;
    msOrientation: string;
    onmsorientationchange: (ev: Event) => any;
    pixelDepth: number;
    systemXDPI: number;
    systemYDPI: number;
    width: number;
    msLockOrientation(orientations: string | string[]): boolean;
    msUnlockOrientation(): void;
    addEventListener(type: "MSOrientationChange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Screen: {
    prototype: Screen;
    new(): Screen;
}

interface ScriptNotifyEvent extends Event {
    callingUri: string;
    value: string;
}

declare var ScriptNotifyEvent: {
    prototype: ScriptNotifyEvent;
    new(): ScriptNotifyEvent;
}

interface ScriptProcessorNode extends AudioNode {
    bufferSize: number;
    onaudioprocess: (ev: AudioProcessingEvent) => any;
    addEventListener(type: "audioprocess", listener: (ev: AudioProcessingEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var ScriptProcessorNode: {
    prototype: ScriptProcessorNode;
    new(): ScriptProcessorNode;
}

interface Selection {
    anchorNode: Node;
    anchorOffset: number;
    focusNode: Node;
    focusOffset: number;
    isCollapsed: boolean;
    rangeCount: number;
    type: string;
    addRange(range: Range): void;
    collapse(parentNode: Node, offset: number): void;
    collapseToEnd(): void;
    collapseToStart(): void;
    containsNode(node: Node, partlyContained: boolean): boolean;
    deleteFromDocument(): void;
    empty(): void;
    extend(newNode: Node, offset: number): void;
    getRangeAt(index: number): Range;
    removeAllRanges(): void;
    removeRange(range: Range): void;
    selectAllChildren(parentNode: Node): void;
    setBaseAndExtent(baseNode: Node, baseOffset: number, extentNode: Node, extentOffset: number): void;
    toString(): string;
}

declare var Selection: {
    prototype: Selection;
    new(): Selection;
}

interface SourceBuffer extends EventTarget {
    appendWindowEnd: number;
    appendWindowStart: number;
    audioTracks: AudioTrackList;
    buffered: TimeRanges;
    mode: string;
    timestampOffset: number;
    updating: boolean;
    videoTracks: VideoTrackList;
    abort(): void;
    appendBuffer(data: ArrayBuffer | ArrayBufferView): void;
    appendStream(stream: MSStream, maxSize?: number): void;
    remove(start: number, end: number): void;
}

declare var SourceBuffer: {
    prototype: SourceBuffer;
    new(): SourceBuffer;
}

interface SourceBufferList extends EventTarget {
    length: number;
    item(index: number): SourceBuffer;
    [index: number]: SourceBuffer;
}

declare var SourceBufferList: {
    prototype: SourceBufferList;
    new(): SourceBufferList;
}

interface StereoPannerNode extends AudioNode {
    pan: AudioParam;
}

declare var StereoPannerNode: {
    prototype: StereoPannerNode;
    new(): StereoPannerNode;
}

interface Storage {
    length: number;
    clear(): void;
    getItem(key: string): any;
    key(index: number): string;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
    [key: string]: any;
    [index: number]: string;
}

declare var Storage: {
    prototype: Storage;
    new(): Storage;
}

interface StorageEvent extends Event {
    key: string;
    newValue: any;
    oldValue: any;
    storageArea: Storage;
    url: string;
    initStorageEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, keyArg: string, oldValueArg: any, newValueArg: any, urlArg: string, storageAreaArg: Storage): void;
}

declare var StorageEvent: {
    prototype: StorageEvent;
    new(): StorageEvent;
}

interface StyleMedia {
    type: string;
    matchMedium(mediaquery: string): boolean;
}

declare var StyleMedia: {
    prototype: StyleMedia;
    new(): StyleMedia;
}

interface StyleSheet {
    disabled: boolean;
    href: string;
    media: MediaList;
    ownerNode: Node;
    parentStyleSheet: StyleSheet;
    title: string;
    type: string;
}

declare var StyleSheet: {
    prototype: StyleSheet;
    new(): StyleSheet;
}

interface StyleSheetList {
    length: number;
    item(index?: number): StyleSheet;
    [index: number]: StyleSheet;
}

declare var StyleSheetList: {
    prototype: StyleSheetList;
    new(): StyleSheetList;
}

interface StyleSheetPageList {
    length: number;
    item(index: number): CSSPageRule;
    [index: number]: CSSPageRule;
}

declare var StyleSheetPageList: {
    prototype: StyleSheetPageList;
    new(): StyleSheetPageList;
}

interface SubtleCrypto {
    decrypt(algorithm: string | Algorithm, key: CryptoKey, data: ArrayBufferView): any;
    deriveBits(algorithm: string | Algorithm, baseKey: CryptoKey, length: number): any;
    deriveKey(algorithm: string | Algorithm, baseKey: CryptoKey, derivedKeyType: string | Algorithm, extractable: boolean, keyUsages: string[]): any;
    digest(algorithm: string | Algorithm, data: ArrayBufferView): any;
    encrypt(algorithm: string | Algorithm, key: CryptoKey, data: ArrayBufferView): any;
    exportKey(format: string, key: CryptoKey): any;
    generateKey(algorithm: string | Algorithm, extractable: boolean, keyUsages: string[]): any;
    importKey(format: string, keyData: ArrayBufferView, algorithm: string | Algorithm, extractable: boolean, keyUsages: string[]): any;
    sign(algorithm: string | Algorithm, key: CryptoKey, data: ArrayBufferView): any;
    unwrapKey(format: string, wrappedKey: ArrayBufferView, unwrappingKey: CryptoKey, unwrapAlgorithm: string | Algorithm, unwrappedKeyAlgorithm: string | Algorithm, extractable: boolean, keyUsages: string[]): any;
    verify(algorithm: string | Algorithm, key: CryptoKey, signature: ArrayBufferView, data: ArrayBufferView): any;
    wrapKey(format: string, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: string | Algorithm): any;
}

declare var SubtleCrypto: {
    prototype: SubtleCrypto;
    new(): SubtleCrypto;
}

interface Text extends CharacterData {
    wholeText: string;
    replaceWholeText(content: string): Text;
    splitText(offset: number): Text;
}

declare var Text: {
    prototype: Text;
    new(): Text;
}

interface TextEvent extends UIEvent {
    data: string;
    inputMethod: number;
    locale: string;
    initTextEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, dataArg: string, inputMethod: number, locale: string): void;
    DOM_INPUT_METHOD_DROP: number;
    DOM_INPUT_METHOD_HANDWRITING: number;
    DOM_INPUT_METHOD_IME: number;
    DOM_INPUT_METHOD_KEYBOARD: number;
    DOM_INPUT_METHOD_MULTIMODAL: number;
    DOM_INPUT_METHOD_OPTION: number;
    DOM_INPUT_METHOD_PASTE: number;
    DOM_INPUT_METHOD_SCRIPT: number;
    DOM_INPUT_METHOD_UNKNOWN: number;
    DOM_INPUT_METHOD_VOICE: number;
}

declare var TextEvent: {
    prototype: TextEvent;
    new(): TextEvent;
    DOM_INPUT_METHOD_DROP: number;
    DOM_INPUT_METHOD_HANDWRITING: number;
    DOM_INPUT_METHOD_IME: number;
    DOM_INPUT_METHOD_KEYBOARD: number;
    DOM_INPUT_METHOD_MULTIMODAL: number;
    DOM_INPUT_METHOD_OPTION: number;
    DOM_INPUT_METHOD_PASTE: number;
    DOM_INPUT_METHOD_SCRIPT: number;
    DOM_INPUT_METHOD_UNKNOWN: number;
    DOM_INPUT_METHOD_VOICE: number;
}

interface TextMetrics {
    width: number;
}

declare var TextMetrics: {
    prototype: TextMetrics;
    new(): TextMetrics;
}

interface TextRange {
    boundingHeight: number;
    boundingLeft: number;
    boundingTop: number;
    boundingWidth: number;
    htmlText: string;
    offsetLeft: number;
    offsetTop: number;
    text: string;
    collapse(start?: boolean): void;
    compareEndPoints(how: string, sourceRange: TextRange): number;
    duplicate(): TextRange;
    execCommand(cmdID: string, showUI?: boolean, value?: any): boolean;
    execCommandShowHelp(cmdID: string): boolean;
    expand(Unit: string): boolean;
    findText(string: string, count?: number, flags?: number): boolean;
    getBookmark(): string;
    getBoundingClientRect(): ClientRect;
    getClientRects(): ClientRectList;
    inRange(range: TextRange): boolean;
    isEqual(range: TextRange): boolean;
    move(unit: string, count?: number): number;
    moveEnd(unit: string, count?: number): number;
    moveStart(unit: string, count?: number): number;
    moveToBookmark(bookmark: string): boolean;
    moveToElementText(element: Element): void;
    moveToPoint(x: number, y: number): void;
    parentElement(): Element;
    pasteHTML(html: string): void;
    queryCommandEnabled(cmdID: string): boolean;
    queryCommandIndeterm(cmdID: string): boolean;
    queryCommandState(cmdID: string): boolean;
    queryCommandSupported(cmdID: string): boolean;
    queryCommandText(cmdID: string): string;
    queryCommandValue(cmdID: string): any;
    scrollIntoView(fStart?: boolean): void;
    select(): void;
    setEndPoint(how: string, SourceRange: TextRange): void;
}

declare var TextRange: {
    prototype: TextRange;
    new(): TextRange;
}

interface TextRangeCollection {
    length: number;
    item(index: number): TextRange;
    [index: number]: TextRange;
}

declare var TextRangeCollection: {
    prototype: TextRangeCollection;
    new(): TextRangeCollection;
}

interface TextTrack extends EventTarget {
    activeCues: TextTrackCueList;
    cues: TextTrackCueList;
    inBandMetadataTrackDispatchType: string;
    kind: string;
    label: string;
    language: string;
    mode: any;
    oncuechange: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onload: (ev: Event) => any;
    readyState: number;
    addCue(cue: TextTrackCue): void;
    removeCue(cue: TextTrackCue): void;
    DISABLED: number;
    ERROR: number;
    HIDDEN: number;
    LOADED: number;
    LOADING: number;
    NONE: number;
    SHOWING: number;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var TextTrack: {
    prototype: TextTrack;
    new(): TextTrack;
    DISABLED: number;
    ERROR: number;
    HIDDEN: number;
    LOADED: number;
    LOADING: number;
    NONE: number;
    SHOWING: number;
}

interface TextTrackCue extends EventTarget {
    endTime: number;
    id: string;
    onenter: (ev: Event) => any;
    onexit: (ev: Event) => any;
    pauseOnExit: boolean;
    startTime: number;
    text: string;
    track: TextTrack;
    getCueAsHTML(): DocumentFragment;
    addEventListener(type: "enter", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "exit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var TextTrackCue: {
    prototype: TextTrackCue;
    new(startTime: number, endTime: number, text: string): TextTrackCue;
}

interface TextTrackCueList {
    length: number;
    getCueById(id: string): TextTrackCue;
    item(index: number): TextTrackCue;
    [index: number]: TextTrackCue;
}

declare var TextTrackCueList: {
    prototype: TextTrackCueList;
    new(): TextTrackCueList;
}

interface TextTrackList extends EventTarget {
    length: number;
    onaddtrack: (ev: TrackEvent) => any;
    item(index: number): TextTrack;
    addEventListener(type: "addtrack", listener: (ev: TrackEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    [index: number]: TextTrack;
}

declare var TextTrackList: {
    prototype: TextTrackList;
    new(): TextTrackList;
}

interface TimeRanges {
    length: number;
    end(index: number): number;
    start(index: number): number;
}

declare var TimeRanges: {
    prototype: TimeRanges;
    new(): TimeRanges;
}

interface Touch {
    clientX: number;
    clientY: number;
    identifier: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    target: EventTarget;
}

declare var Touch: {
    prototype: Touch;
    new(): Touch;
}

interface TouchEvent extends UIEvent {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;
}

declare var TouchEvent: {
    prototype: TouchEvent;
    new(): TouchEvent;
}

interface TouchList {
    length: number;
    item(index: number): Touch;
    [index: number]: Touch;
}

declare var TouchList: {
    prototype: TouchList;
    new(): TouchList;
}

interface TrackEvent extends Event {
    track: any;
}

declare var TrackEvent: {
    prototype: TrackEvent;
    new(): TrackEvent;
}

interface TransitionEvent extends Event {
    elapsedTime: number;
    propertyName: string;
    initTransitionEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, propertyNameArg: string, elapsedTimeArg: number): void;
}

declare var TransitionEvent: {
    prototype: TransitionEvent;
    new(): TransitionEvent;
}

interface TreeWalker {
    currentNode: Node;
    expandEntityReferences: boolean;
    filter: NodeFilter;
    root: Node;
    whatToShow: number;
    firstChild(): Node;
    lastChild(): Node;
    nextNode(): Node;
    nextSibling(): Node;
    parentNode(): Node;
    previousNode(): Node;
    previousSibling(): Node;
}

declare var TreeWalker: {
    prototype: TreeWalker;
    new(): TreeWalker;
}

interface UIEvent extends Event {
    detail: number;
    view: Window;
    initUIEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number): void;
}

declare var UIEvent: {
    prototype: UIEvent;
    new(type: string, eventInitDict?: UIEventInit): UIEvent;
}

interface URL {
    createObjectURL(object: any, options?: ObjectURLOptions): string;
    revokeObjectURL(url: string): void;
}
declare var URL: URL;

interface UnviewableContentIdentifiedEvent extends NavigationEventWithReferrer {
    mediaType: string;
}

declare var UnviewableContentIdentifiedEvent: {
    prototype: UnviewableContentIdentifiedEvent;
    new(): UnviewableContentIdentifiedEvent;
}

interface ValidityState {
    badInput: boolean;
    customError: boolean;
    patternMismatch: boolean;
    rangeOverflow: boolean;
    rangeUnderflow: boolean;
    stepMismatch: boolean;
    tooLong: boolean;
    typeMismatch: boolean;
    valid: boolean;
    valueMissing: boolean;
}

declare var ValidityState: {
    prototype: ValidityState;
    new(): ValidityState;
}

interface VideoPlaybackQuality {
    corruptedVideoFrames: number;
    creationTime: number;
    droppedVideoFrames: number;
    totalFrameDelay: number;
    totalVideoFrames: number;
}

declare var VideoPlaybackQuality: {
    prototype: VideoPlaybackQuality;
    new(): VideoPlaybackQuality;
}

interface VideoTrack {
    id: string;
    kind: string;
    label: string;
    language: string;
    selected: boolean;
    sourceBuffer: SourceBuffer;
}

declare var VideoTrack: {
    prototype: VideoTrack;
    new(): VideoTrack;
}

interface VideoTrackList extends EventTarget {
    length: number;
    onaddtrack: (ev: TrackEvent) => any;
    onchange: (ev: Event) => any;
    onremovetrack: (ev: TrackEvent) => any;
    selectedIndex: number;
    getTrackById(id: string): VideoTrack;
    item(index: number): VideoTrack;
    addEventListener(type: "addtrack", listener: (ev: TrackEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "removetrack", listener: (ev: TrackEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    [index: number]: VideoTrack;
}

declare var VideoTrackList: {
    prototype: VideoTrackList;
    new(): VideoTrackList;
}

interface WEBGL_compressed_texture_s3tc {
    COMPRESSED_RGBA_S3TC_DXT1_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT3_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT5_EXT: number;
    COMPRESSED_RGB_S3TC_DXT1_EXT: number;
}

declare var WEBGL_compressed_texture_s3tc: {
    prototype: WEBGL_compressed_texture_s3tc;
    new(): WEBGL_compressed_texture_s3tc;
    COMPRESSED_RGBA_S3TC_DXT1_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT3_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT5_EXT: number;
    COMPRESSED_RGB_S3TC_DXT1_EXT: number;
}

interface WEBGL_debug_renderer_info {
    UNMASKED_RENDERER_WEBGL: number;
    UNMASKED_VENDOR_WEBGL: number;
}

declare var WEBGL_debug_renderer_info: {
    prototype: WEBGL_debug_renderer_info;
    new(): WEBGL_debug_renderer_info;
    UNMASKED_RENDERER_WEBGL: number;
    UNMASKED_VENDOR_WEBGL: number;
}

interface WEBGL_depth_texture {
    UNSIGNED_INT_24_8_WEBGL: number;
}

declare var WEBGL_depth_texture: {
    prototype: WEBGL_depth_texture;
    new(): WEBGL_depth_texture;
    UNSIGNED_INT_24_8_WEBGL: number;
}

interface WaveShaperNode extends AudioNode {
    curve: Float32Array;
    oversample: string;
}

declare var WaveShaperNode: {
    prototype: WaveShaperNode;
    new(): WaveShaperNode;
}

interface WebGLActiveInfo {
    name: string;
    size: number;
    type: number;
}

declare var WebGLActiveInfo: {
    prototype: WebGLActiveInfo;
    new(): WebGLActiveInfo;
}

interface WebGLBuffer extends WebGLObject {
}

declare var WebGLBuffer: {
    prototype: WebGLBuffer;
    new(): WebGLBuffer;
}

interface WebGLContextEvent extends Event {
    statusMessage: string;
}

declare var WebGLContextEvent: {
    prototype: WebGLContextEvent;
    new(): WebGLContextEvent;
}

interface WebGLFramebuffer extends WebGLObject {
}

declare var WebGLFramebuffer: {
    prototype: WebGLFramebuffer;
    new(): WebGLFramebuffer;
}

interface WebGLObject {
}

declare var WebGLObject: {
    prototype: WebGLObject;
    new(): WebGLObject;
}

interface WebGLProgram extends WebGLObject {
}

declare var WebGLProgram: {
    prototype: WebGLProgram;
    new(): WebGLProgram;
}

interface WebGLRenderbuffer extends WebGLObject {
}

declare var WebGLRenderbuffer: {
    prototype: WebGLRenderbuffer;
    new(): WebGLRenderbuffer;
}

interface WebGLRenderingContext {
    canvas: HTMLCanvasElement;
    drawingBufferHeight: number;
    drawingBufferWidth: number;
    activeTexture(texture: number): void;
    attachShader(program: WebGLProgram, shader: WebGLShader): void;
    bindAttribLocation(program: WebGLProgram, index: number, name: string): void;
    bindBuffer(target: number, buffer: WebGLBuffer): void;
    bindFramebuffer(target: number, framebuffer: WebGLFramebuffer): void;
    bindRenderbuffer(target: number, renderbuffer: WebGLRenderbuffer): void;
    bindTexture(target: number, texture: WebGLTexture): void;
    blendColor(red: number, green: number, blue: number, alpha: number): void;
    blendEquation(mode: number): void;
    blendEquationSeparate(modeRGB: number, modeAlpha: number): void;
    blendFunc(sfactor: number, dfactor: number): void;
    blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
    bufferData(target: number, size: number | ArrayBufferView | ArrayBuffer, usage: number): void;
    bufferSubData(target: number, offset: number, data: ArrayBufferView | ArrayBuffer): void;
    checkFramebufferStatus(target: number): number;
    clear(mask: number): void;
    clearColor(red: number, green: number, blue: number, alpha: number): void;
    clearDepth(depth: number): void;
    clearStencil(s: number): void;
    colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
    compileShader(shader: WebGLShader): void;
    compressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, data: ArrayBufferView): void;
    compressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, data: ArrayBufferView): void;
    copyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;
    copyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;
    createBuffer(): WebGLBuffer;
    createFramebuffer(): WebGLFramebuffer;
    createProgram(): WebGLProgram;
    createRenderbuffer(): WebGLRenderbuffer;
    createShader(type: number): WebGLShader;
    createTexture(): WebGLTexture;
    cullFace(mode: number): void;
    deleteBuffer(buffer: WebGLBuffer): void;
    deleteFramebuffer(framebuffer: WebGLFramebuffer): void;
    deleteProgram(program: WebGLProgram): void;
    deleteRenderbuffer(renderbuffer: WebGLRenderbuffer): void;
    deleteShader(shader: WebGLShader): void;
    deleteTexture(texture: WebGLTexture): void;
    depthFunc(func: number): void;
    depthMask(flag: boolean): void;
    depthRange(zNear: number, zFar: number): void;
    detachShader(program: WebGLProgram, shader: WebGLShader): void;
    disable(cap: number): void;
    disableVertexAttribArray(index: number): void;
    drawArrays(mode: number, first: number, count: number): void;
    drawElements(mode: number, count: number, type: number, offset: number): void;
    enable(cap: number): void;
    enableVertexAttribArray(index: number): void;
    finish(): void;
    flush(): void;
    framebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: WebGLRenderbuffer): void;
    framebufferTexture2D(target: number, attachment: number, textarget: number, texture: WebGLTexture, level: number): void;
    frontFace(mode: number): void;
    generateMipmap(target: number): void;
    getActiveAttrib(program: WebGLProgram, index: number): WebGLActiveInfo;
    getActiveUniform(program: WebGLProgram, index: number): WebGLActiveInfo;
    getAttachedShaders(program: WebGLProgram): WebGLShader[];
    getAttribLocation(program: WebGLProgram, name: string): number;
    getBufferParameter(target: number, pname: number): any;
    getContextAttributes(): WebGLContextAttributes;
    getError(): number;
    getExtension(name: string): any;
    getFramebufferAttachmentParameter(target: number, attachment: number, pname: number): any;
    getParameter(pname: number): any;
    getProgramInfoLog(program: WebGLProgram): string;
    getProgramParameter(program: WebGLProgram, pname: number): any;
    getRenderbufferParameter(target: number, pname: number): any;
    getShaderInfoLog(shader: WebGLShader): string;
    getShaderParameter(shader: WebGLShader, pname: number): any;
    getShaderPrecisionFormat(shadertype: number, precisiontype: number): WebGLShaderPrecisionFormat;
    getShaderSource(shader: WebGLShader): string;
    getSupportedExtensions(): string[];
    getTexParameter(target: number, pname: number): any;
    getUniform(program: WebGLProgram, location: WebGLUniformLocation): any;
    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation;
    getVertexAttrib(index: number, pname: number): any;
    getVertexAttribOffset(index: number, pname: number): number;
    hint(target: number, mode: number): void;
    isBuffer(buffer: WebGLBuffer): boolean;
    isContextLost(): boolean;
    isEnabled(cap: number): boolean;
    isFramebuffer(framebuffer: WebGLFramebuffer): boolean;
    isProgram(program: WebGLProgram): boolean;
    isRenderbuffer(renderbuffer: WebGLRenderbuffer): boolean;
    isShader(shader: WebGLShader): boolean;
    isTexture(texture: WebGLTexture): boolean;
    lineWidth(width: number): void;
    linkProgram(program: WebGLProgram): void;
    pixelStorei(pname: number, param: number): void;
    polygonOffset(factor: number, units: number): void;
    readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView): void;
    renderbufferStorage(target: number, internalformat: number, width: number, height: number): void;
    sampleCoverage(value: number, invert: boolean): void;
    scissor(x: number, y: number, width: number, height: number): void;
    shaderSource(shader: WebGLShader, source: string): void;
    stencilFunc(func: number, ref: number, mask: number): void;
    stencilFuncSeparate(face: number, func: number, ref: number, mask: number): void;
    stencilMask(mask: number): void;
    stencilMaskSeparate(face: number, mask: number): void;
    stencilOp(fail: number, zfail: number, zpass: number): void;
    stencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void;
    texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, image: HTMLImageElement): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, canvas: HTMLCanvasElement): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, video: HTMLVideoElement): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, pixels: ImageData): void;
    texParameterf(target: number, pname: number, param: number): void;
    texParameteri(target: number, pname: number, param: number): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, image: HTMLImageElement): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, canvas: HTMLCanvasElement): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, video: HTMLVideoElement): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, pixels: ImageData): void;
    uniform1f(location: WebGLUniformLocation, x: number): void;
    uniform1fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform1i(location: WebGLUniformLocation, x: number): void;
    uniform1iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform2f(location: WebGLUniformLocation, x: number, y: number): void;
    uniform2fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform2i(location: WebGLUniformLocation, x: number, y: number): void;
    uniform2iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void;
    uniform3fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number): void;
    uniform3iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
    uniform4fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
    uniform4iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniformMatrix2fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array): void;
    uniformMatrix3fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array): void;
    uniformMatrix4fv(location: WebGLUniformLocation, transpose: boolean, value: Float32Array): void;
    useProgram(program: WebGLProgram): void;
    validateProgram(program: WebGLProgram): void;
    vertexAttrib1f(indx: number, x: number): void;
    vertexAttrib1fv(indx: number, values: Float32Array): void;
    vertexAttrib2f(indx: number, x: number, y: number): void;
    vertexAttrib2fv(indx: number, values: Float32Array): void;
    vertexAttrib3f(indx: number, x: number, y: number, z: number): void;
    vertexAttrib3fv(indx: number, values: Float32Array): void;
    vertexAttrib4f(indx: number, x: number, y: number, z: number, w: number): void;
    vertexAttrib4fv(indx: number, values: Float32Array): void;
    vertexAttribPointer(indx: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
    viewport(x: number, y: number, width: number, height: number): void;
    ACTIVE_ATTRIBUTES: number;
    ACTIVE_TEXTURE: number;
    ACTIVE_UNIFORMS: number;
    ALIASED_LINE_WIDTH_RANGE: number;
    ALIASED_POINT_SIZE_RANGE: number;
    ALPHA: number;
    ALPHA_BITS: number;
    ALWAYS: number;
    ARRAY_BUFFER: number;
    ARRAY_BUFFER_BINDING: number;
    ATTACHED_SHADERS: number;
    BACK: number;
    BLEND: number;
    BLEND_COLOR: number;
    BLEND_DST_ALPHA: number;
    BLEND_DST_RGB: number;
    BLEND_EQUATION: number;
    BLEND_EQUATION_ALPHA: number;
    BLEND_EQUATION_RGB: number;
    BLEND_SRC_ALPHA: number;
    BLEND_SRC_RGB: number;
    BLUE_BITS: number;
    BOOL: number;
    BOOL_VEC2: number;
    BOOL_VEC3: number;
    BOOL_VEC4: number;
    BROWSER_DEFAULT_WEBGL: number;
    BUFFER_SIZE: number;
    BUFFER_USAGE: number;
    BYTE: number;
    CCW: number;
    CLAMP_TO_EDGE: number;
    COLOR_ATTACHMENT0: number;
    COLOR_BUFFER_BIT: number;
    COLOR_CLEAR_VALUE: number;
    COLOR_WRITEMASK: number;
    COMPILE_STATUS: number;
    COMPRESSED_TEXTURE_FORMATS: number;
    CONSTANT_ALPHA: number;
    CONSTANT_COLOR: number;
    CONTEXT_LOST_WEBGL: number;
    CULL_FACE: number;
    CULL_FACE_MODE: number;
    CURRENT_PROGRAM: number;
    CURRENT_VERTEX_ATTRIB: number;
    CW: number;
    DECR: number;
    DECR_WRAP: number;
    DELETE_STATUS: number;
    DEPTH_ATTACHMENT: number;
    DEPTH_BITS: number;
    DEPTH_BUFFER_BIT: number;
    DEPTH_CLEAR_VALUE: number;
    DEPTH_COMPONENT: number;
    DEPTH_COMPONENT16: number;
    DEPTH_FUNC: number;
    DEPTH_RANGE: number;
    DEPTH_STENCIL: number;
    DEPTH_STENCIL_ATTACHMENT: number;
    DEPTH_TEST: number;
    DEPTH_WRITEMASK: number;
    DITHER: number;
    DONT_CARE: number;
    DST_ALPHA: number;
    DST_COLOR: number;
    DYNAMIC_DRAW: number;
    ELEMENT_ARRAY_BUFFER: number;
    ELEMENT_ARRAY_BUFFER_BINDING: number;
    EQUAL: number;
    FASTEST: number;
    FLOAT: number;
    FLOAT_MAT2: number;
    FLOAT_MAT3: number;
    FLOAT_MAT4: number;
    FLOAT_VEC2: number;
    FLOAT_VEC3: number;
    FLOAT_VEC4: number;
    FRAGMENT_SHADER: number;
    FRAMEBUFFER: number;
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
    FRAMEBUFFER_BINDING: number;
    FRAMEBUFFER_COMPLETE: number;
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
    FRAMEBUFFER_UNSUPPORTED: number;
    FRONT: number;
    FRONT_AND_BACK: number;
    FRONT_FACE: number;
    FUNC_ADD: number;
    FUNC_REVERSE_SUBTRACT: number;
    FUNC_SUBTRACT: number;
    GENERATE_MIPMAP_HINT: number;
    GEQUAL: number;
    GREATER: number;
    GREEN_BITS: number;
    HIGH_FLOAT: number;
    HIGH_INT: number;
    IMPLEMENTATION_COLOR_READ_FORMAT: number;
    IMPLEMENTATION_COLOR_READ_TYPE: number;
    INCR: number;
    INCR_WRAP: number;
    INT: number;
    INT_VEC2: number;
    INT_VEC3: number;
    INT_VEC4: number;
    INVALID_ENUM: number;
    INVALID_FRAMEBUFFER_OPERATION: number;
    INVALID_OPERATION: number;
    INVALID_VALUE: number;
    INVERT: number;
    KEEP: number;
    LEQUAL: number;
    LESS: number;
    LINEAR: number;
    LINEAR_MIPMAP_LINEAR: number;
    LINEAR_MIPMAP_NEAREST: number;
    LINES: number;
    LINE_LOOP: number;
    LINE_STRIP: number;
    LINE_WIDTH: number;
    LINK_STATUS: number;
    LOW_FLOAT: number;
    LOW_INT: number;
    LUMINANCE: number;
    LUMINANCE_ALPHA: number;
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
    MAX_CUBE_MAP_TEXTURE_SIZE: number;
    MAX_FRAGMENT_UNIFORM_VECTORS: number;
    MAX_RENDERBUFFER_SIZE: number;
    MAX_TEXTURE_IMAGE_UNITS: number;
    MAX_TEXTURE_SIZE: number;
    MAX_VARYING_VECTORS: number;
    MAX_VERTEX_ATTRIBS: number;
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
    MAX_VERTEX_UNIFORM_VECTORS: number;
    MAX_VIEWPORT_DIMS: number;
    MEDIUM_FLOAT: number;
    MEDIUM_INT: number;
    MIRRORED_REPEAT: number;
    NEAREST: number;
    NEAREST_MIPMAP_LINEAR: number;
    NEAREST_MIPMAP_NEAREST: number;
    NEVER: number;
    NICEST: number;
    NONE: number;
    NOTEQUAL: number;
    NO_ERROR: number;
    ONE: number;
    ONE_MINUS_CONSTANT_ALPHA: number;
    ONE_MINUS_CONSTANT_COLOR: number;
    ONE_MINUS_DST_ALPHA: number;
    ONE_MINUS_DST_COLOR: number;
    ONE_MINUS_SRC_ALPHA: number;
    ONE_MINUS_SRC_COLOR: number;
    OUT_OF_MEMORY: number;
    PACK_ALIGNMENT: number;
    POINTS: number;
    POLYGON_OFFSET_FACTOR: number;
    POLYGON_OFFSET_FILL: number;
    POLYGON_OFFSET_UNITS: number;
    RED_BITS: number;
    RENDERBUFFER: number;
    RENDERBUFFER_ALPHA_SIZE: number;
    RENDERBUFFER_BINDING: number;
    RENDERBUFFER_BLUE_SIZE: number;
    RENDERBUFFER_DEPTH_SIZE: number;
    RENDERBUFFER_GREEN_SIZE: number;
    RENDERBUFFER_HEIGHT: number;
    RENDERBUFFER_INTERNAL_FORMAT: number;
    RENDERBUFFER_RED_SIZE: number;
    RENDERBUFFER_STENCIL_SIZE: number;
    RENDERBUFFER_WIDTH: number;
    RENDERER: number;
    REPEAT: number;
    REPLACE: number;
    RGB: number;
    RGB565: number;
    RGB5_A1: number;
    RGBA: number;
    RGBA4: number;
    SAMPLER_2D: number;
    SAMPLER_CUBE: number;
    SAMPLES: number;
    SAMPLE_ALPHA_TO_COVERAGE: number;
    SAMPLE_BUFFERS: number;
    SAMPLE_COVERAGE: number;
    SAMPLE_COVERAGE_INVERT: number;
    SAMPLE_COVERAGE_VALUE: number;
    SCISSOR_BOX: number;
    SCISSOR_TEST: number;
    SHADER_TYPE: number;
    SHADING_LANGUAGE_VERSION: number;
    SHORT: number;
    SRC_ALPHA: number;
    SRC_ALPHA_SATURATE: number;
    SRC_COLOR: number;
    STATIC_DRAW: number;
    STENCIL_ATTACHMENT: number;
    STENCIL_BACK_FAIL: number;
    STENCIL_BACK_FUNC: number;
    STENCIL_BACK_PASS_DEPTH_FAIL: number;
    STENCIL_BACK_PASS_DEPTH_PASS: number;
    STENCIL_BACK_REF: number;
    STENCIL_BACK_VALUE_MASK: number;
    STENCIL_BACK_WRITEMASK: number;
    STENCIL_BITS: number;
    STENCIL_BUFFER_BIT: number;
    STENCIL_CLEAR_VALUE: number;
    STENCIL_FAIL: number;
    STENCIL_FUNC: number;
    STENCIL_INDEX: number;
    STENCIL_INDEX8: number;
    STENCIL_PASS_DEPTH_FAIL: number;
    STENCIL_PASS_DEPTH_PASS: number;
    STENCIL_REF: number;
    STENCIL_TEST: number;
    STENCIL_VALUE_MASK: number;
    STENCIL_WRITEMASK: number;
    STREAM_DRAW: number;
    SUBPIXEL_BITS: number;
    TEXTURE: number;
    TEXTURE0: number;
    TEXTURE1: number;
    TEXTURE10: number;
    TEXTURE11: number;
    TEXTURE12: number;
    TEXTURE13: number;
    TEXTURE14: number;
    TEXTURE15: number;
    TEXTURE16: number;
    TEXTURE17: number;
    TEXTURE18: number;
    TEXTURE19: number;
    TEXTURE2: number;
    TEXTURE20: number;
    TEXTURE21: number;
    TEXTURE22: number;
    TEXTURE23: number;
    TEXTURE24: number;
    TEXTURE25: number;
    TEXTURE26: number;
    TEXTURE27: number;
    TEXTURE28: number;
    TEXTURE29: number;
    TEXTURE3: number;
    TEXTURE30: number;
    TEXTURE31: number;
    TEXTURE4: number;
    TEXTURE5: number;
    TEXTURE6: number;
    TEXTURE7: number;
    TEXTURE8: number;
    TEXTURE9: number;
    TEXTURE_2D: number;
    TEXTURE_BINDING_2D: number;
    TEXTURE_BINDING_CUBE_MAP: number;
    TEXTURE_CUBE_MAP: number;
    TEXTURE_CUBE_MAP_NEGATIVE_X: number;
    TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
    TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
    TEXTURE_CUBE_MAP_POSITIVE_X: number;
    TEXTURE_CUBE_MAP_POSITIVE_Y: number;
    TEXTURE_CUBE_MAP_POSITIVE_Z: number;
    TEXTURE_MAG_FILTER: number;
    TEXTURE_MIN_FILTER: number;
    TEXTURE_WRAP_S: number;
    TEXTURE_WRAP_T: number;
    TRIANGLES: number;
    TRIANGLE_FAN: number;
    TRIANGLE_STRIP: number;
    UNPACK_ALIGNMENT: number;
    UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
    UNPACK_FLIP_Y_WEBGL: number;
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
    UNSIGNED_BYTE: number;
    UNSIGNED_INT: number;
    UNSIGNED_SHORT: number;
    UNSIGNED_SHORT_4_4_4_4: number;
    UNSIGNED_SHORT_5_5_5_1: number;
    UNSIGNED_SHORT_5_6_5: number;
    VALIDATE_STATUS: number;
    VENDOR: number;
    VERSION: number;
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
    VERTEX_ATTRIB_ARRAY_ENABLED: number;
    VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
    VERTEX_ATTRIB_ARRAY_POINTER: number;
    VERTEX_ATTRIB_ARRAY_SIZE: number;
    VERTEX_ATTRIB_ARRAY_STRIDE: number;
    VERTEX_ATTRIB_ARRAY_TYPE: number;
    VERTEX_SHADER: number;
    VIEWPORT: number;
    ZERO: number;
}

declare var WebGLRenderingContext: {
    prototype: WebGLRenderingContext;
    new(): WebGLRenderingContext;
    ACTIVE_ATTRIBUTES: number;
    ACTIVE_TEXTURE: number;
    ACTIVE_UNIFORMS: number;
    ALIASED_LINE_WIDTH_RANGE: number;
    ALIASED_POINT_SIZE_RANGE: number;
    ALPHA: number;
    ALPHA_BITS: number;
    ALWAYS: number;
    ARRAY_BUFFER: number;
    ARRAY_BUFFER_BINDING: number;
    ATTACHED_SHADERS: number;
    BACK: number;
    BLEND: number;
    BLEND_COLOR: number;
    BLEND_DST_ALPHA: number;
    BLEND_DST_RGB: number;
    BLEND_EQUATION: number;
    BLEND_EQUATION_ALPHA: number;
    BLEND_EQUATION_RGB: number;
    BLEND_SRC_ALPHA: number;
    BLEND_SRC_RGB: number;
    BLUE_BITS: number;
    BOOL: number;
    BOOL_VEC2: number;
    BOOL_VEC3: number;
    BOOL_VEC4: number;
    BROWSER_DEFAULT_WEBGL: number;
    BUFFER_SIZE: number;
    BUFFER_USAGE: number;
    BYTE: number;
    CCW: number;
    CLAMP_TO_EDGE: number;
    COLOR_ATTACHMENT0: number;
    COLOR_BUFFER_BIT: number;
    COLOR_CLEAR_VALUE: number;
    COLOR_WRITEMASK: number;
    COMPILE_STATUS: number;
    COMPRESSED_TEXTURE_FORMATS: number;
    CONSTANT_ALPHA: number;
    CONSTANT_COLOR: number;
    CONTEXT_LOST_WEBGL: number;
    CULL_FACE: number;
    CULL_FACE_MODE: number;
    CURRENT_PROGRAM: number;
    CURRENT_VERTEX_ATTRIB: number;
    CW: number;
    DECR: number;
    DECR_WRAP: number;
    DELETE_STATUS: number;
    DEPTH_ATTACHMENT: number;
    DEPTH_BITS: number;
    DEPTH_BUFFER_BIT: number;
    DEPTH_CLEAR_VALUE: number;
    DEPTH_COMPONENT: number;
    DEPTH_COMPONENT16: number;
    DEPTH_FUNC: number;
    DEPTH_RANGE: number;
    DEPTH_STENCIL: number;
    DEPTH_STENCIL_ATTACHMENT: number;
    DEPTH_TEST: number;
    DEPTH_WRITEMASK: number;
    DITHER: number;
    DONT_CARE: number;
    DST_ALPHA: number;
    DST_COLOR: number;
    DYNAMIC_DRAW: number;
    ELEMENT_ARRAY_BUFFER: number;
    ELEMENT_ARRAY_BUFFER_BINDING: number;
    EQUAL: number;
    FASTEST: number;
    FLOAT: number;
    FLOAT_MAT2: number;
    FLOAT_MAT3: number;
    FLOAT_MAT4: number;
    FLOAT_VEC2: number;
    FLOAT_VEC3: number;
    FLOAT_VEC4: number;
    FRAGMENT_SHADER: number;
    FRAMEBUFFER: number;
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
    FRAMEBUFFER_BINDING: number;
    FRAMEBUFFER_COMPLETE: number;
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
    FRAMEBUFFER_UNSUPPORTED: number;
    FRONT: number;
    FRONT_AND_BACK: number;
    FRONT_FACE: number;
    FUNC_ADD: number;
    FUNC_REVERSE_SUBTRACT: number;
    FUNC_SUBTRACT: number;
    GENERATE_MIPMAP_HINT: number;
    GEQUAL: number;
    GREATER: number;
    GREEN_BITS: number;
    HIGH_FLOAT: number;
    HIGH_INT: number;
    IMPLEMENTATION_COLOR_READ_FORMAT: number;
    IMPLEMENTATION_COLOR_READ_TYPE: number;
    INCR: number;
    INCR_WRAP: number;
    INT: number;
    INT_VEC2: number;
    INT_VEC3: number;
    INT_VEC4: number;
    INVALID_ENUM: number;
    INVALID_FRAMEBUFFER_OPERATION: number;
    INVALID_OPERATION: number;
    INVALID_VALUE: number;
    INVERT: number;
    KEEP: number;
    LEQUAL: number;
    LESS: number;
    LINEAR: number;
    LINEAR_MIPMAP_LINEAR: number;
    LINEAR_MIPMAP_NEAREST: number;
    LINES: number;
    LINE_LOOP: number;
    LINE_STRIP: number;
    LINE_WIDTH: number;
    LINK_STATUS: number;
    LOW_FLOAT: number;
    LOW_INT: number;
    LUMINANCE: number;
    LUMINANCE_ALPHA: number;
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
    MAX_CUBE_MAP_TEXTURE_SIZE: number;
    MAX_FRAGMENT_UNIFORM_VECTORS: number;
    MAX_RENDERBUFFER_SIZE: number;
    MAX_TEXTURE_IMAGE_UNITS: number;
    MAX_TEXTURE_SIZE: number;
    MAX_VARYING_VECTORS: number;
    MAX_VERTEX_ATTRIBS: number;
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
    MAX_VERTEX_UNIFORM_VECTORS: number;
    MAX_VIEWPORT_DIMS: number;
    MEDIUM_FLOAT: number;
    MEDIUM_INT: number;
    MIRRORED_REPEAT: number;
    NEAREST: number;
    NEAREST_MIPMAP_LINEAR: number;
    NEAREST_MIPMAP_NEAREST: number;
    NEVER: number;
    NICEST: number;
    NONE: number;
    NOTEQUAL: number;
    NO_ERROR: number;
    ONE: number;
    ONE_MINUS_CONSTANT_ALPHA: number;
    ONE_MINUS_CONSTANT_COLOR: number;
    ONE_MINUS_DST_ALPHA: number;
    ONE_MINUS_DST_COLOR: number;
    ONE_MINUS_SRC_ALPHA: number;
    ONE_MINUS_SRC_COLOR: number;
    OUT_OF_MEMORY: number;
    PACK_ALIGNMENT: number;
    POINTS: number;
    POLYGON_OFFSET_FACTOR: number;
    POLYGON_OFFSET_FILL: number;
    POLYGON_OFFSET_UNITS: number;
    RED_BITS: number;
    RENDERBUFFER: number;
    RENDERBUFFER_ALPHA_SIZE: number;
    RENDERBUFFER_BINDING: number;
    RENDERBUFFER_BLUE_SIZE: number;
    RENDERBUFFER_DEPTH_SIZE: number;
    RENDERBUFFER_GREEN_SIZE: number;
    RENDERBUFFER_HEIGHT: number;
    RENDERBUFFER_INTERNAL_FORMAT: number;
    RENDERBUFFER_RED_SIZE: number;
    RENDERBUFFER_STENCIL_SIZE: number;
    RENDERBUFFER_WIDTH: number;
    RENDERER: number;
    REPEAT: number;
    REPLACE: number;
    RGB: number;
    RGB565: number;
    RGB5_A1: number;
    RGBA: number;
    RGBA4: number;
    SAMPLER_2D: number;
    SAMPLER_CUBE: number;
    SAMPLES: number;
    SAMPLE_ALPHA_TO_COVERAGE: number;
    SAMPLE_BUFFERS: number;
    SAMPLE_COVERAGE: number;
    SAMPLE_COVERAGE_INVERT: number;
    SAMPLE_COVERAGE_VALUE: number;
    SCISSOR_BOX: number;
    SCISSOR_TEST: number;
    SHADER_TYPE: number;
    SHADING_LANGUAGE_VERSION: number;
    SHORT: number;
    SRC_ALPHA: number;
    SRC_ALPHA_SATURATE: number;
    SRC_COLOR: number;
    STATIC_DRAW: number;
    STENCIL_ATTACHMENT: number;
    STENCIL_BACK_FAIL: number;
    STENCIL_BACK_FUNC: number;
    STENCIL_BACK_PASS_DEPTH_FAIL: number;
    STENCIL_BACK_PASS_DEPTH_PASS: number;
    STENCIL_BACK_REF: number;
    STENCIL_BACK_VALUE_MASK: number;
    STENCIL_BACK_WRITEMASK: number;
    STENCIL_BITS: number;
    STENCIL_BUFFER_BIT: number;
    STENCIL_CLEAR_VALUE: number;
    STENCIL_FAIL: number;
    STENCIL_FUNC: number;
    STENCIL_INDEX: number;
    STENCIL_INDEX8: number;
    STENCIL_PASS_DEPTH_FAIL: number;
    STENCIL_PASS_DEPTH_PASS: number;
    STENCIL_REF: number;
    STENCIL_TEST: number;
    STENCIL_VALUE_MASK: number;
    STENCIL_WRITEMASK: number;
    STREAM_DRAW: number;
    SUBPIXEL_BITS: number;
    TEXTURE: number;
    TEXTURE0: number;
    TEXTURE1: number;
    TEXTURE10: number;
    TEXTURE11: number;
    TEXTURE12: number;
    TEXTURE13: number;
    TEXTURE14: number;
    TEXTURE15: number;
    TEXTURE16: number;
    TEXTURE17: number;
    TEXTURE18: number;
    TEXTURE19: number;
    TEXTURE2: number;
    TEXTURE20: number;
    TEXTURE21: number;
    TEXTURE22: number;
    TEXTURE23: number;
    TEXTURE24: number;
    TEXTURE25: number;
    TEXTURE26: number;
    TEXTURE27: number;
    TEXTURE28: number;
    TEXTURE29: number;
    TEXTURE3: number;
    TEXTURE30: number;
    TEXTURE31: number;
    TEXTURE4: number;
    TEXTURE5: number;
    TEXTURE6: number;
    TEXTURE7: number;
    TEXTURE8: number;
    TEXTURE9: number;
    TEXTURE_2D: number;
    TEXTURE_BINDING_2D: number;
    TEXTURE_BINDING_CUBE_MAP: number;
    TEXTURE_CUBE_MAP: number;
    TEXTURE_CUBE_MAP_NEGATIVE_X: number;
    TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
    TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
    TEXTURE_CUBE_MAP_POSITIVE_X: number;
    TEXTURE_CUBE_MAP_POSITIVE_Y: number;
    TEXTURE_CUBE_MAP_POSITIVE_Z: number;
    TEXTURE_MAG_FILTER: number;
    TEXTURE_MIN_FILTER: number;
    TEXTURE_WRAP_S: number;
    TEXTURE_WRAP_T: number;
    TRIANGLES: number;
    TRIANGLE_FAN: number;
    TRIANGLE_STRIP: number;
    UNPACK_ALIGNMENT: number;
    UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
    UNPACK_FLIP_Y_WEBGL: number;
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
    UNSIGNED_BYTE: number;
    UNSIGNED_INT: number;
    UNSIGNED_SHORT: number;
    UNSIGNED_SHORT_4_4_4_4: number;
    UNSIGNED_SHORT_5_5_5_1: number;
    UNSIGNED_SHORT_5_6_5: number;
    VALIDATE_STATUS: number;
    VENDOR: number;
    VERSION: number;
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
    VERTEX_ATTRIB_ARRAY_ENABLED: number;
    VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
    VERTEX_ATTRIB_ARRAY_POINTER: number;
    VERTEX_ATTRIB_ARRAY_SIZE: number;
    VERTEX_ATTRIB_ARRAY_STRIDE: number;
    VERTEX_ATTRIB_ARRAY_TYPE: number;
    VERTEX_SHADER: number;
    VIEWPORT: number;
    ZERO: number;
}

interface WebGLShader extends WebGLObject {
}

declare var WebGLShader: {
    prototype: WebGLShader;
    new(): WebGLShader;
}

interface WebGLShaderPrecisionFormat {
    precision: number;
    rangeMax: number;
    rangeMin: number;
}

declare var WebGLShaderPrecisionFormat: {
    prototype: WebGLShaderPrecisionFormat;
    new(): WebGLShaderPrecisionFormat;
}

interface WebGLTexture extends WebGLObject {
}

declare var WebGLTexture: {
    prototype: WebGLTexture;
    new(): WebGLTexture;
}

interface WebGLUniformLocation {
}

declare var WebGLUniformLocation: {
    prototype: WebGLUniformLocation;
    new(): WebGLUniformLocation;
}

interface WebKitCSSMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    inverse(): WebKitCSSMatrix;
    multiply(secondMatrix: WebKitCSSMatrix): WebKitCSSMatrix;
    rotate(angleX: number, angleY?: number, angleZ?: number): WebKitCSSMatrix;
    rotateAxisAngle(x: number, y: number, z: number, angle: number): WebKitCSSMatrix;
    scale(scaleX: number, scaleY?: number, scaleZ?: number): WebKitCSSMatrix;
    setMatrixValue(value: string): void;
    skewX(angle: number): WebKitCSSMatrix;
    skewY(angle: number): WebKitCSSMatrix;
    toString(): string;
    translate(x: number, y: number, z?: number): WebKitCSSMatrix;
}

declare var WebKitCSSMatrix: {
    prototype: WebKitCSSMatrix;
    new(text?: string): WebKitCSSMatrix;
}

interface WebKitPoint {
    x: number;
    y: number;
}

declare var WebKitPoint: {
    prototype: WebKitPoint;
    new(x?: number, y?: number): WebKitPoint;
}

interface WebSocket extends EventTarget {
    binaryType: string;
    bufferedAmount: number;
    extensions: string;
    onclose: (ev: CloseEvent) => any;
    onerror: (ev: Event) => any;
    onmessage: (ev: MessageEvent) => any;
    onopen: (ev: Event) => any;
    protocol: string;
    readyState: number;
    url: string;
    close(code?: number, reason?: string): void;
    send(data: any): void;
    CLOSED: number;
    CLOSING: number;
    CONNECTING: number;
    OPEN: number;
    addEventListener(type: "close", listener: (ev: CloseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "open", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var WebSocket: {
    prototype: WebSocket;
    new(url: string, protocols?: string | string[]): WebSocket;
    CLOSED: number;
    CLOSING: number;
    CONNECTING: number;
    OPEN: number;
}

interface WheelEvent extends MouseEvent {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
    getCurrentPoint(element: Element): void;
    initWheelEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, buttonArg: number, relatedTargetArg: EventTarget, modifiersListArg: string, deltaXArg: number, deltaYArg: number, deltaZArg: number, deltaMode: number): void;
    DOM_DELTA_LINE: number;
    DOM_DELTA_PAGE: number;
    DOM_DELTA_PIXEL: number;
}

declare var WheelEvent: {
    prototype: WheelEvent;
    new(typeArg: string, eventInitDict?: WheelEventInit): WheelEvent;
    DOM_DELTA_LINE: number;
    DOM_DELTA_PAGE: number;
    DOM_DELTA_PIXEL: number;
}

interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
    animationStartTime: number;
    applicationCache: ApplicationCache;
    clientInformation: Navigator;
    closed: boolean;
    crypto: Crypto;
    defaultStatus: string;
    devicePixelRatio: number;
    doNotTrack: string;
    document: Document;
    event: Event;
    external: External;
    frameElement: Element;
    frames: Window;
    history: History;
    innerHeight: number;
    innerWidth: number;
    length: number;
    location: Location;
    locationbar: BarProp;
    menubar: BarProp;
    msAnimationStartTime: number;
    name: string;
    navigator: Navigator;
    offscreenBuffering: string | boolean;
    onabort: (ev: Event) => any;
    onafterprint: (ev: Event) => any;
    onbeforeprint: (ev: Event) => any;
    onbeforeunload: (ev: BeforeUnloadEvent) => any;
    onblur: (ev: FocusEvent) => any;
    oncanplay: (ev: Event) => any;
    oncanplaythrough: (ev: Event) => any;
    onchange: (ev: Event) => any;
    onclick: (ev: MouseEvent) => any;
    oncompassneedscalibration: (ev: Event) => any;
    oncontextmenu: (ev: PointerEvent) => any;
    ondblclick: (ev: MouseEvent) => any;
    ondevicemotion: (ev: DeviceMotionEvent) => any;
    ondeviceorientation: (ev: DeviceOrientationEvent) => any;
    ondrag: (ev: DragEvent) => any;
    ondragend: (ev: DragEvent) => any;
    ondragenter: (ev: DragEvent) => any;
    ondragleave: (ev: DragEvent) => any;
    ondragover: (ev: DragEvent) => any;
    ondragstart: (ev: DragEvent) => any;
    ondrop: (ev: DragEvent) => any;
    ondurationchange: (ev: Event) => any;
    onemptied: (ev: Event) => any;
    onended: (ev: Event) => any;
    onerror: ErrorEventHandler;
    onfocus: (ev: FocusEvent) => any;
    onhashchange: (ev: HashChangeEvent) => any;
    oninput: (ev: Event) => any;
    onkeydown: (ev: KeyboardEvent) => any;
    onkeypress: (ev: KeyboardEvent) => any;
    onkeyup: (ev: KeyboardEvent) => any;
    onload: (ev: Event) => any;
    onloadeddata: (ev: Event) => any;
    onloadedmetadata: (ev: Event) => any;
    onloadstart: (ev: Event) => any;
    onmessage: (ev: MessageEvent) => any;
    onmousedown: (ev: MouseEvent) => any;
    onmouseenter: (ev: MouseEvent) => any;
    onmouseleave: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseout: (ev: MouseEvent) => any;
    onmouseover: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
    onmousewheel: (ev: MouseWheelEvent) => any;
    onmsgesturechange: (ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (ev: MSGestureEvent) => any;
    onmsgestureend: (ev: MSGestureEvent) => any;
    onmsgesturehold: (ev: MSGestureEvent) => any;
    onmsgesturestart: (ev: MSGestureEvent) => any;
    onmsgesturetap: (ev: MSGestureEvent) => any;
    onmsinertiastart: (ev: MSGestureEvent) => any;
    onmspointercancel: (ev: MSPointerEvent) => any;
    onmspointerdown: (ev: MSPointerEvent) => any;
    onmspointerenter: (ev: MSPointerEvent) => any;
    onmspointerleave: (ev: MSPointerEvent) => any;
    onmspointermove: (ev: MSPointerEvent) => any;
    onmspointerout: (ev: MSPointerEvent) => any;
    onmspointerover: (ev: MSPointerEvent) => any;
    onmspointerup: (ev: MSPointerEvent) => any;
    onoffline: (ev: Event) => any;
    ononline: (ev: Event) => any;
    onorientationchange: (ev: Event) => any;
    onpagehide: (ev: PageTransitionEvent) => any;
    onpageshow: (ev: PageTransitionEvent) => any;
    onpause: (ev: Event) => any;
    onplay: (ev: Event) => any;
    onplaying: (ev: Event) => any;
    onpopstate: (ev: PopStateEvent) => any;
    onprogress: (ev: ProgressEvent) => any;
    onratechange: (ev: Event) => any;
    onreadystatechange: (ev: ProgressEvent) => any;
    onreset: (ev: Event) => any;
    onresize: (ev: UIEvent) => any;
    onscroll: (ev: UIEvent) => any;
    onseeked: (ev: Event) => any;
    onseeking: (ev: Event) => any;
    onselect: (ev: UIEvent) => any;
    onstalled: (ev: Event) => any;
    onstorage: (ev: StorageEvent) => any;
    onsubmit: (ev: Event) => any;
    onsuspend: (ev: Event) => any;
    ontimeupdate: (ev: Event) => any;
    ontouchcancel: any;
    ontouchend: any;
    ontouchmove: any;
    ontouchstart: any;
    onunload: (ev: Event) => any;
    onvolumechange: (ev: Event) => any;
    onwaiting: (ev: Event) => any;
    opener: Window;
    orientation: string | number;
    outerHeight: number;
    outerWidth: number;
    pageXOffset: number;
    pageYOffset: number;
    parent: Window;
    performance: Performance;
    personalbar: BarProp;
    screen: Screen;
    screenLeft: number;
    screenTop: number;
    screenX: number;
    screenY: number;
    scrollX: number;
    scrollY: number;
    scrollbars: BarProp;
    self: Window;
    status: string;
    statusbar: BarProp;
    styleMedia: StyleMedia;
    toolbar: BarProp;
    top: Window;
    window: Window;
    URL: URL;
    alert(message?: any): void;
    blur(): void;
    cancelAnimationFrame(handle: number): void;
    captureEvents(): void;
    close(): void;
    confirm(message?: string): boolean;
    focus(): void;
    getComputedStyle(elt: Element, pseudoElt?: string): CSSStyleDeclaration;
    getMatchedCSSRules(elt: Element, pseudoElt?: string): CSSRuleList;
    getSelection(): Selection;
    matchMedia(mediaQuery: string): MediaQueryList;
    moveBy(x?: number, y?: number): void;
    moveTo(x?: number, y?: number): void;
    msCancelRequestAnimationFrame(handle: number): void;
    msMatchMedia(mediaQuery: string): MediaQueryList;
    msRequestAnimationFrame(callback: FrameRequestCallback): number;
    msWriteProfilerMark(profilerMarkName: string): void;
    open(url?: string, target?: string, features?: string, replace?: boolean): any;
    postMessage(message: any, targetOrigin: string, ports?: any): void;
    print(): void;
    prompt(message?: string, _default?: string): string;
    releaseEvents(): void;
    requestAnimationFrame(callback: FrameRequestCallback): number;
    resizeBy(x?: number, y?: number): void;
    resizeTo(x?: number, y?: number): void;
    scroll(x?: number, y?: number): void;
    scrollBy(x?: number, y?: number): void;
    scrollTo(x?: number, y?: number): void;
    webkitConvertPointFromNodeToPage(node: Node, pt: WebKitPoint): WebKitPoint;
    webkitConvertPointFromPageToNode(node: Node, pt: WebKitPoint): WebKitPoint;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "afterprint", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeprint", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeunload", listener: (ev: BeforeUnloadEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "compassneedscalibration", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "devicemotion", listener: (ev: DeviceMotionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deviceorientation", listener: (ev: DeviceOrientationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "hashchange", listener: (ev: HashChangeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "offline", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "online", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "orientationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pagehide", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pageshow", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "popstate", listener: (ev: PopStateEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "readystatechange", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "resize", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "storage", listener: (ev: StorageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "unload", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    [index: number]: Window;
}

declare var Window: {
    prototype: Window;
    new(): Window;
}

interface Worker extends EventTarget, AbstractWorker {
    onmessage: (ev: MessageEvent) => any;
    postMessage(message: any, ports?: any): void;
    terminate(): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Worker: {
    prototype: Worker;
    new(stringUrl: string): Worker;
}

interface XMLDocument extends Document {
}

declare var XMLDocument: {
    prototype: XMLDocument;
    new(): XMLDocument;
}

interface XMLHttpRequest extends EventTarget, XMLHttpRequestEventTarget {
    msCaching: string;
    onreadystatechange: (ev: ProgressEvent) => any;
    readyState: number;
    response: any;
    responseBody: any;
    responseText: string;
    responseType: string;
    responseXML: any;
    status: number;
    statusText: string;
    timeout: number;
    upload: XMLHttpRequestUpload;
    withCredentials: boolean;
    abort(): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string;
    msCachingEnabled(): boolean;
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    overrideMimeType(mime: string): void;
    send(data?: Document): void;
    send(data?: string): void;
    send(data?: any): void;
    setRequestHeader(header: string, value: string): void;
    DONE: number;
    HEADERS_RECEIVED: number;
    LOADING: number;
    OPENED: number;
    UNSENT: number;
    addEventListener(type: "abort", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "readystatechange", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "timeout", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var XMLHttpRequest: {
    prototype: XMLHttpRequest;
    new(): XMLHttpRequest;
    DONE: number;
    HEADERS_RECEIVED: number;
    LOADING: number;
    OPENED: number;
    UNSENT: number;
    create(): XMLHttpRequest;
}

interface XMLHttpRequestUpload extends EventTarget, XMLHttpRequestEventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var XMLHttpRequestUpload: {
    prototype: XMLHttpRequestUpload;
    new(): XMLHttpRequestUpload;
}

interface XMLSerializer {
    serializeToString(target: Node): string;
}

declare var XMLSerializer: {
    prototype: XMLSerializer;
    new(): XMLSerializer;
}

interface XPathEvaluator {
    createExpression(expression: string, resolver: XPathNSResolver): XPathExpression;
    createNSResolver(nodeResolver?: Node): XPathNSResolver;
    evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver, type: number, result: XPathResult): XPathResult;
}

declare var XPathEvaluator: {
    prototype: XPathEvaluator;
    new(): XPathEvaluator;
}

interface XPathExpression {
    evaluate(contextNode: Node, type: number, result: XPathResult): XPathExpression;
}

declare var XPathExpression: {
    prototype: XPathExpression;
    new(): XPathExpression;
}

interface XPathNSResolver {
    lookupNamespaceURI(prefix: string): string;
}

declare var XPathNSResolver: {
    prototype: XPathNSResolver;
    new(): XPathNSResolver;
}

interface XPathResult {
    booleanValue: boolean;
    invalidIteratorState: boolean;
    numberValue: number;
    resultType: number;
    singleNodeValue: Node;
    snapshotLength: number;
    stringValue: string;
    iterateNext(): Node;
    snapshotItem(index: number): Node;
    ANY_TYPE: number;
    ANY_UNORDERED_NODE_TYPE: number;
    BOOLEAN_TYPE: number;
    FIRST_ORDERED_NODE_TYPE: number;
    NUMBER_TYPE: number;
    ORDERED_NODE_ITERATOR_TYPE: number;
    ORDERED_NODE_SNAPSHOT_TYPE: number;
    STRING_TYPE: number;
    UNORDERED_NODE_ITERATOR_TYPE: number;
    UNORDERED_NODE_SNAPSHOT_TYPE: number;
}

declare var XPathResult: {
    prototype: XPathResult;
    new(): XPathResult;
    ANY_TYPE: number;
    ANY_UNORDERED_NODE_TYPE: number;
    BOOLEAN_TYPE: number;
    FIRST_ORDERED_NODE_TYPE: number;
    NUMBER_TYPE: number;
    ORDERED_NODE_ITERATOR_TYPE: number;
    ORDERED_NODE_SNAPSHOT_TYPE: number;
    STRING_TYPE: number;
    UNORDERED_NODE_ITERATOR_TYPE: number;
    UNORDERED_NODE_SNAPSHOT_TYPE: number;
}

interface XSLTProcessor {
    clearParameters(): void;
    getParameter(namespaceURI: string, localName: string): any;
    importStylesheet(style: Node): void;
    removeParameter(namespaceURI: string, localName: string): void;
    reset(): void;
    setParameter(namespaceURI: string, localName: string, value: any): void;
    transformToDocument(source: Node): Document;
    transformToFragment(source: Node, document: Document): DocumentFragment;
}

declare var XSLTProcessor: {
    prototype: XSLTProcessor;
    new(): XSLTProcessor;
}

interface AbstractWorker {
    onerror: (ev: Event) => any;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface ChildNode {
    remove(): void;
}

interface DOML2DeprecatedColorProperty {
    color: string;
}

interface DOML2DeprecatedSizeProperty {
    size: number;
}

interface DocumentEvent {
    createEvent(eventInterface:"AnimationEvent"): AnimationEvent;
    createEvent(eventInterface:"AriaRequestEvent"): AriaRequestEvent;
    createEvent(eventInterface:"AudioProcessingEvent"): AudioProcessingEvent;
    createEvent(eventInterface:"BeforeUnloadEvent"): BeforeUnloadEvent;
    createEvent(eventInterface:"ClipboardEvent"): ClipboardEvent;
    createEvent(eventInterface:"CloseEvent"): CloseEvent;
    createEvent(eventInterface:"CommandEvent"): CommandEvent;
    createEvent(eventInterface:"CompositionEvent"): CompositionEvent;
    createEvent(eventInterface:"CustomEvent"): CustomEvent;
    createEvent(eventInterface:"DeviceMotionEvent"): DeviceMotionEvent;
    createEvent(eventInterface:"DeviceOrientationEvent"): DeviceOrientationEvent;
    createEvent(eventInterface:"DragEvent"): DragEvent;
    createEvent(eventInterface:"ErrorEvent"): ErrorEvent;
    createEvent(eventInterface:"Event"): Event;
    createEvent(eventInterface:"Events"): Event;
    createEvent(eventInterface:"FocusEvent"): FocusEvent;
    createEvent(eventInterface:"GamepadEvent"): GamepadEvent;
    createEvent(eventInterface:"HashChangeEvent"): HashChangeEvent;
    createEvent(eventInterface:"IDBVersionChangeEvent"): IDBVersionChangeEvent;
    createEvent(eventInterface:"KeyboardEvent"): KeyboardEvent;
    createEvent(eventInterface:"LongRunningScriptDetectedEvent"): LongRunningScriptDetectedEvent;
    createEvent(eventInterface:"MSGestureEvent"): MSGestureEvent;
    createEvent(eventInterface:"MSManipulationEvent"): MSManipulationEvent;
    createEvent(eventInterface:"MSMediaKeyMessageEvent"): MSMediaKeyMessageEvent;
    createEvent(eventInterface:"MSMediaKeyNeededEvent"): MSMediaKeyNeededEvent;
    createEvent(eventInterface:"MSPointerEvent"): MSPointerEvent;
    createEvent(eventInterface:"MSSiteModeEvent"): MSSiteModeEvent;
    createEvent(eventInterface:"MessageEvent"): MessageEvent;
    createEvent(eventInterface:"MouseEvent"): MouseEvent;
    createEvent(eventInterface:"MouseEvents"): MouseEvent;
    createEvent(eventInterface:"MouseWheelEvent"): MouseWheelEvent;
    createEvent(eventInterface:"MutationEvent"): MutationEvent;
    createEvent(eventInterface:"MutationEvents"): MutationEvent;
    createEvent(eventInterface:"NavigationCompletedEvent"): NavigationCompletedEvent;
    createEvent(eventInterface:"NavigationEvent"): NavigationEvent;
    createEvent(eventInterface:"NavigationEventWithReferrer"): NavigationEventWithReferrer;
    createEvent(eventInterface:"OfflineAudioCompletionEvent"): OfflineAudioCompletionEvent;
    createEvent(eventInterface:"PageTransitionEvent"): PageTransitionEvent;
    createEvent(eventInterface:"PermissionRequestedEvent"): PermissionRequestedEvent;
    createEvent(eventInterface:"PointerEvent"): PointerEvent;
    createEvent(eventInterface:"PopStateEvent"): PopStateEvent;
    createEvent(eventInterface:"ProgressEvent"): ProgressEvent;
    createEvent(eventInterface:"SVGZoomEvent"): SVGZoomEvent;
    createEvent(eventInterface:"SVGZoomEvents"): SVGZoomEvent;
    createEvent(eventInterface:"ScriptNotifyEvent"): ScriptNotifyEvent;
    createEvent(eventInterface:"StorageEvent"): StorageEvent;
    createEvent(eventInterface:"TextEvent"): TextEvent;
    createEvent(eventInterface:"TouchEvent"): TouchEvent;
    createEvent(eventInterface:"TrackEvent"): TrackEvent;
    createEvent(eventInterface:"TransitionEvent"): TransitionEvent;
    createEvent(eventInterface:"UIEvent"): UIEvent;
    createEvent(eventInterface:"UIEvents"): UIEvent;
    createEvent(eventInterface:"UnviewableContentIdentifiedEvent"): UnviewableContentIdentifiedEvent;
    createEvent(eventInterface:"WebGLContextEvent"): WebGLContextEvent;
    createEvent(eventInterface:"WheelEvent"): WheelEvent;
    createEvent(eventInterface: string): Event;
}

interface ElementTraversal {
    childElementCount: number;
    firstElementChild: Element;
    lastElementChild: Element;
    nextElementSibling: Element;
    previousElementSibling: Element;
}

interface GetSVGDocument {
    getSVGDocument(): Document;
}

interface GlobalEventHandlers {
    onpointercancel: (ev: PointerEvent) => any;
    onpointerdown: (ev: PointerEvent) => any;
    onpointerenter: (ev: PointerEvent) => any;
    onpointerleave: (ev: PointerEvent) => any;
    onpointermove: (ev: PointerEvent) => any;
    onpointerout: (ev: PointerEvent) => any;
    onpointerover: (ev: PointerEvent) => any;
    onpointerup: (ev: PointerEvent) => any;
    onwheel: (ev: WheelEvent) => any;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface HTMLTableAlignment {
    /**
      * Sets or retrieves a value that you can use to implement your own ch functionality for the object.
      */
    ch: string;
    /**
      * Sets or retrieves a value that you can use to implement your own chOff functionality for the object.
      */
    chOff: string;
    /**
      * Sets or retrieves how text and other content are vertically aligned within the object that contains them.
      */
    vAlign: string;
}

interface IDBEnvironment {
    indexedDB: IDBFactory;
    msIndexedDB: IDBFactory;
}

interface LinkStyle {
    sheet: StyleSheet;
}

interface MSBaseReader {
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onload: (ev: Event) => any;
    onloadend: (ev: ProgressEvent) => any;
    onloadstart: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    readyState: number;
    result: any;
    abort(): void;
    DONE: number;
    EMPTY: number;
    LOADING: number;
    addEventListener(type: "abort", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface MSFileSaver {
    msSaveBlob(blob: any, defaultName?: string): boolean;
    msSaveOrOpenBlob(blob: any, defaultName?: string): boolean;
}

interface MSNavigatorDoNotTrack {
    confirmSiteSpecificTrackingException(args: ConfirmSiteSpecificExceptionsInformation): boolean;
    confirmWebWideTrackingException(args: ExceptionInformation): boolean;
    removeSiteSpecificTrackingException(args: ExceptionInformation): void;
    removeWebWideTrackingException(args: ExceptionInformation): void;
    storeSiteSpecificTrackingException(args: StoreSiteSpecificExceptionsInformation): void;
    storeWebWideTrackingException(args: StoreExceptionsInformation): void;
}

interface NavigatorContentUtils {
}

interface NavigatorGeolocation {
    geolocation: Geolocation;
}

interface NavigatorID {
    appName: string;
    appVersion: string;
    platform: string;
    product: string;
    productSub: string;
    userAgent: string;
    vendor: string;
    vendorSub: string;
}

interface NavigatorOnLine {
    onLine: boolean;
}

interface NavigatorStorageUtils {
}

interface NodeSelector {
    querySelector(selectors: string): Element;
    querySelectorAll(selectors: string): NodeListOf<Element>;
}

interface RandomSource {
    getRandomValues(array: ArrayBufferView): ArrayBufferView;
}

interface SVGAnimatedPathData {
    pathSegList: SVGPathSegList;
}

interface SVGAnimatedPoints {
    animatedPoints: SVGPointList;
    points: SVGPointList;
}

interface SVGExternalResourcesRequired {
    externalResourcesRequired: SVGAnimatedBoolean;
}

interface SVGFilterPrimitiveStandardAttributes extends SVGStylable {
    height: SVGAnimatedLength;
    result: SVGAnimatedString;
    width: SVGAnimatedLength;
    x: SVGAnimatedLength;
    y: SVGAnimatedLength;
}

interface SVGFitToViewBox {
    preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    viewBox: SVGAnimatedRect;
}

interface SVGLangSpace {
    xmllang: string;
    xmlspace: string;
}

interface SVGLocatable {
    farthestViewportElement: SVGElement;
    nearestViewportElement: SVGElement;
    getBBox(): SVGRect;
    getCTM(): SVGMatrix;
    getScreenCTM(): SVGMatrix;
    getTransformToElement(element: SVGElement): SVGMatrix;
}

interface SVGStylable {
    className: any;
    style: CSSStyleDeclaration;
}

interface SVGTests {
    requiredExtensions: SVGStringList;
    requiredFeatures: SVGStringList;
    systemLanguage: SVGStringList;
    hasExtension(extension: string): boolean;
}

interface SVGTransformable extends SVGLocatable {
    transform: SVGAnimatedTransformList;
}

interface SVGURIReference {
    href: SVGAnimatedString;
}

interface WindowBase64 {
    atob(encodedString: string): string;
    btoa(rawString: string): string;
}

interface WindowConsole {
    console: Console;
}

interface WindowLocalStorage {
    localStorage: Storage;
}

interface WindowSessionStorage {
    sessionStorage: Storage;
}

interface WindowTimers extends Object, WindowTimersExtension {
    clearInterval(handle: number): void;
    clearTimeout(handle: number): void;
    setInterval(handler: any, timeout?: any, ...args: any[]): number;
    setTimeout(handler: any, timeout?: any, ...args: any[]): number;
}

interface WindowTimersExtension {
    clearImmediate(handle: number): void;
    msClearImmediate(handle: number): void;
    msSetImmediate(expression: any, ...args: any[]): number;
    setImmediate(expression: any, ...args: any[]): number;
}

interface XMLHttpRequestEventTarget {
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onload: (ev: Event) => any;
    onloadend: (ev: ProgressEvent) => any;
    onloadstart: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    ontimeout: (ev: ProgressEvent) => any;
    addEventListener(type: "abort", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "timeout", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface NodeListOf<TNode extends Node> extends NodeList {
    length: number;
    item(index: number): TNode;
    [index: number]: TNode;
}

interface BlobPropertyBag {
    type?: string;
    endings?: string;
}

interface FilePropertyBag {
    type?: string;
    lastModified?: number;
}

interface EventListenerObject {
    handleEvent(evt: Event): void;
}

interface MessageEventInit extends EventInit {
    data?: any;
    origin?: string;
    lastEventId?: string;
    channel?: string;
    source?: any;
    ports?: MessagePort[];
}

interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
}

declare type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

interface ErrorEventHandler {
    (message: string, filename?: string, lineno?: number, colno?: number, error?:Error): void;
}
interface PositionCallback {
    (position: Position): void;
}
interface PositionErrorCallback {
    (error: PositionError): void;
}
interface MediaQueryListListener {
    (mql: MediaQueryList): void;
}
interface MSLaunchUriCallback {
    (): void;
}
interface FrameRequestCallback {
    (time: number): void;
}
interface MSUnsafeFunctionCallback {
    (): any;
}
interface MSExecAtPriorityFunctionCallback {
    (...args: any[]): any;
}
interface MutationCallback {
    (mutations: MutationRecord[], observer: MutationObserver): void;
}
interface DecodeSuccessCallback {
    (decodedData: AudioBuffer): void;
}
interface DecodeErrorCallback {
    (): void;
}
interface FunctionStringCallback {
    (data: string): void;
}
declare var Audio: {new(src?: string): HTMLAudioElement; };
declare var Image: {new(width?: number, height?: number): HTMLImageElement; };
declare var Option: {new(text?: string, value?: string, defaultSelected?: boolean, selected?: boolean): HTMLOptionElement; };
declare var animationStartTime: number;
declare var applicationCache: ApplicationCache;
declare var clientInformation: Navigator;
declare var closed: boolean;
declare var crypto: Crypto;
declare var defaultStatus: string;
declare var devicePixelRatio: number;
declare var doNotTrack: string;
declare var document: Document;
declare var event: Event;
declare var external: External;
declare var frameElement: Element;
declare var frames: Window;
declare var history: History;
declare var innerHeight: number;
declare var innerWidth: number;
declare var length: number;
declare var location: Location;
declare var locationbar: BarProp;
declare var menubar: BarProp;
declare var msAnimationStartTime: number;
declare var name: string;
declare var navigator: Navigator;
declare var offscreenBuffering: string | boolean;
declare var onabort: (ev: Event) => any;
declare var onafterprint: (ev: Event) => any;
declare var onbeforeprint: (ev: Event) => any;
declare var onbeforeunload: (ev: BeforeUnloadEvent) => any;
declare var onblur: (ev: FocusEvent) => any;
declare var oncanplay: (ev: Event) => any;
declare var oncanplaythrough: (ev: Event) => any;
declare var onchange: (ev: Event) => any;
declare var onclick: (ev: MouseEvent) => any;
declare var oncompassneedscalibration: (ev: Event) => any;
declare var oncontextmenu: (ev: PointerEvent) => any;
declare var ondblclick: (ev: MouseEvent) => any;
declare var ondevicemotion: (ev: DeviceMotionEvent) => any;
declare var ondeviceorientation: (ev: DeviceOrientationEvent) => any;
declare var ondrag: (ev: DragEvent) => any;
declare var ondragend: (ev: DragEvent) => any;
declare var ondragenter: (ev: DragEvent) => any;
declare var ondragleave: (ev: DragEvent) => any;
declare var ondragover: (ev: DragEvent) => any;
declare var ondragstart: (ev: DragEvent) => any;
declare var ondrop: (ev: DragEvent) => any;
declare var ondurationchange: (ev: Event) => any;
declare var onemptied: (ev: Event) => any;
declare var onended: (ev: Event) => any;
declare var onerror: ErrorEventHandler;
declare var onfocus: (ev: FocusEvent) => any;
declare var onhashchange: (ev: HashChangeEvent) => any;
declare var oninput: (ev: Event) => any;
declare var onkeydown: (ev: KeyboardEvent) => any;
declare var onkeypress: (ev: KeyboardEvent) => any;
declare var onkeyup: (ev: KeyboardEvent) => any;
declare var onload: (ev: Event) => any;
declare var onloadeddata: (ev: Event) => any;
declare var onloadedmetadata: (ev: Event) => any;
declare var onloadstart: (ev: Event) => any;
declare var onmessage: (ev: MessageEvent) => any;
declare var onmousedown: (ev: MouseEvent) => any;
declare var onmouseenter: (ev: MouseEvent) => any;
declare var onmouseleave: (ev: MouseEvent) => any;
declare var onmousemove: (ev: MouseEvent) => any;
declare var onmouseout: (ev: MouseEvent) => any;
declare var onmouseover: (ev: MouseEvent) => any;
declare var onmouseup: (ev: MouseEvent) => any;
declare var onmousewheel: (ev: MouseWheelEvent) => any;
declare var onmsgesturechange: (ev: MSGestureEvent) => any;
declare var onmsgesturedoubletap: (ev: MSGestureEvent) => any;
declare var onmsgestureend: (ev: MSGestureEvent) => any;
declare var onmsgesturehold: (ev: MSGestureEvent) => any;
declare var onmsgesturestart: (ev: MSGestureEvent) => any;
declare var onmsgesturetap: (ev: MSGestureEvent) => any;
declare var onmsinertiastart: (ev: MSGestureEvent) => any;
declare var onmspointercancel: (ev: MSPointerEvent) => any;
declare var onmspointerdown: (ev: MSPointerEvent) => any;
declare var onmspointerenter: (ev: MSPointerEvent) => any;
declare var onmspointerleave: (ev: MSPointerEvent) => any;
declare var onmspointermove: (ev: MSPointerEvent) => any;
declare var onmspointerout: (ev: MSPointerEvent) => any;
declare var onmspointerover: (ev: MSPointerEvent) => any;
declare var onmspointerup: (ev: MSPointerEvent) => any;
declare var onoffline: (ev: Event) => any;
declare var ononline: (ev: Event) => any;
declare var onorientationchange: (ev: Event) => any;
declare var onpagehide: (ev: PageTransitionEvent) => any;
declare var onpageshow: (ev: PageTransitionEvent) => any;
declare var onpause: (ev: Event) => any;
declare var onplay: (ev: Event) => any;
declare var onplaying: (ev: Event) => any;
declare var onpopstate: (ev: PopStateEvent) => any;
declare var onprogress: (ev: ProgressEvent) => any;
declare var onratechange: (ev: Event) => any;
declare var onreadystatechange: (ev: ProgressEvent) => any;
declare var onreset: (ev: Event) => any;
declare var onresize: (ev: UIEvent) => any;
declare var onscroll: (ev: UIEvent) => any;
declare var onseeked: (ev: Event) => any;
declare var onseeking: (ev: Event) => any;
declare var onselect: (ev: UIEvent) => any;
declare var onstalled: (ev: Event) => any;
declare var onstorage: (ev: StorageEvent) => any;
declare var onsubmit: (ev: Event) => any;
declare var onsuspend: (ev: Event) => any;
declare var ontimeupdate: (ev: Event) => any;
declare var ontouchcancel: any;
declare var ontouchend: any;
declare var ontouchmove: any;
declare var ontouchstart: any;
declare var onunload: (ev: Event) => any;
declare var onvolumechange: (ev: Event) => any;
declare var onwaiting: (ev: Event) => any;
declare var opener: Window;
declare var orientation: string | number;
declare var outerHeight: number;
declare var outerWidth: number;
declare var pageXOffset: number;
declare var pageYOffset: number;
declare var parent: Window;
declare var performance: Performance;
declare var personalbar: BarProp;
declare var screen: Screen;
declare var screenLeft: number;
declare var screenTop: number;
declare var screenX: number;
declare var screenY: number;
declare var scrollX: number;
declare var scrollY: number;
declare var scrollbars: BarProp;
declare var self: Window;
declare var status: string;
declare var statusbar: BarProp;
declare var styleMedia: StyleMedia;
declare var toolbar: BarProp;
declare var top: Window;
declare var window: Window;
declare var URL: URL;
declare function alert(message?: any): void;
declare function blur(): void;
declare function cancelAnimationFrame(handle: number): void;
declare function captureEvents(): void;
declare function close(): void;
declare function confirm(message?: string): boolean;
declare function focus(): void;
declare function getComputedStyle(elt: Element, pseudoElt?: string): CSSStyleDeclaration;
declare function getMatchedCSSRules(elt: Element, pseudoElt?: string): CSSRuleList;
declare function getSelection(): Selection;
declare function matchMedia(mediaQuery: string): MediaQueryList;
declare function moveBy(x?: number, y?: number): void;
declare function moveTo(x?: number, y?: number): void;
declare function msCancelRequestAnimationFrame(handle: number): void;
declare function msMatchMedia(mediaQuery: string): MediaQueryList;
declare function msRequestAnimationFrame(callback: FrameRequestCallback): number;
declare function msWriteProfilerMark(profilerMarkName: string): void;
declare function open(url?: string, target?: string, features?: string, replace?: boolean): any;
declare function postMessage(message: any, targetOrigin: string, ports?: any): void;
declare function print(): void;
declare function prompt(message?: string, _default?: string): string;
declare function releaseEvents(): void;
declare function requestAnimationFrame(callback: FrameRequestCallback): number;
declare function resizeBy(x?: number, y?: number): void;
declare function resizeTo(x?: number, y?: number): void;
declare function scroll(x?: number, y?: number): void;
declare function scrollBy(x?: number, y?: number): void;
declare function scrollTo(x?: number, y?: number): void;
declare function webkitConvertPointFromNodeToPage(node: Node, pt: WebKitPoint): WebKitPoint;
declare function webkitConvertPointFromPageToNode(node: Node, pt: WebKitPoint): WebKitPoint;
declare function toString(): string;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
declare function dispatchEvent(evt: Event): boolean;
declare function removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
declare function clearInterval(handle: number): void;
declare function clearTimeout(handle: number): void;
declare function setInterval(handler: any, timeout?: any, ...args: any[]): number;
declare function setTimeout(handler: any, timeout?: any, ...args: any[]): number;
declare function clearImmediate(handle: number): void;
declare function msClearImmediate(handle: number): void;
declare function msSetImmediate(expression: any, ...args: any[]): number;
declare function setImmediate(expression: any, ...args: any[]): number;
declare var sessionStorage: Storage;
declare var localStorage: Storage;
declare var console: Console;
declare var onpointercancel: (ev: PointerEvent) => any;
declare var onpointerdown: (ev: PointerEvent) => any;
declare var onpointerenter: (ev: PointerEvent) => any;
declare var onpointerleave: (ev: PointerEvent) => any;
declare var onpointermove: (ev: PointerEvent) => any;
declare var onpointerout: (ev: PointerEvent) => any;
declare var onpointerover: (ev: PointerEvent) => any;
declare var onpointerup: (ev: PointerEvent) => any;
declare var onwheel: (ev: WheelEvent) => any;
declare var indexedDB: IDBFactory;
declare var msIndexedDB: IDBFactory;
declare function atob(encodedString: string): string;
declare function btoa(rawString: string): string;
declare function addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "afterprint", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "beforeprint", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "beforeunload", listener: (ev: BeforeUnloadEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "compassneedscalibration", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "devicemotion", listener: (ev: DeviceMotionEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "deviceorientation", listener: (ev: DeviceOrientationEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "hashchange", listener: (ev: HashChangeEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "offline", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "online", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "orientationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pagehide", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pageshow", listener: (ev: PageTransitionEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "popstate", listener: (ev: PopStateEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "readystatechange", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "resize", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "storage", listener: (ev: StorageEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "unload", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
declare function addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
/////////////////////////////
/// WorkerGlobalScope APIs
/////////////////////////////
// These are only available in a Web Worker
declare function importScripts(...urls: string[]): void;


/////////////////////////////
/// Windows Script Host APIS
/////////////////////////////


interface ActiveXObject {
    new (s: string): any;
}
declare var ActiveXObject: ActiveXObject;

interface ITextWriter {
    Write(s: string): void;
    WriteLine(s: string): void;
    Close(): void;
}

interface TextStreamBase {
    /**
     * The column number of the current character position in an input stream.
     */
    Column: number;

    /**
     * The current line number in an input stream.
     */
    Line: number;

    /**
     * Closes a text stream.
     * It is not necessary to close standard streams; they close automatically when the process ends. If
     * you close a standard stream, be aware that any other pointers to that standard stream become invalid.
     */
    Close(): void;
}

interface TextStreamWriter extends TextStreamBase {
    /**
     * Sends a string to an output stream.
     */
    Write(s: string): void;

    /**
     * Sends a specified number of blank lines (newline characters) to an output stream.
     */
    WriteBlankLines(intLines: number): void;

    /**
     * Sends a string followed by a newline character to an output stream.
     */
    WriteLine(s: string): void;
}

interface TextStreamReader extends TextStreamBase {
    /**
     * Returns a specified number of characters from an input stream, starting at the current pointer position.
     * Does not return until the ENTER key is pressed.
     * Can only be used on a stream in reading mode; causes an error in writing or appending mode.
     */
    Read(characters: number): string;

    /**
     * Returns all characters from an input stream.
     * Can only be used on a stream in reading mode; causes an error in writing or appending mode.
     */
    ReadAll(): string;

    /**
     * Returns an entire line from an input stream.
     * Although this method extracts the newline character, it does not add it to the returned string.
     * Can only be used on a stream in reading mode; causes an error in writing or appending mode.
     */
    ReadLine(): string;

    /**
     * Skips a specified number of characters when reading from an input text stream.
     * Can only be used on a stream in reading mode; causes an error in writing or appending mode.
     * @param characters Positive number of characters to skip forward. (Backward skipping is not supported.)
     */
    Skip(characters: number): void;

    /**
     * Skips the next line when reading from an input text stream.
     * Can only be used on a stream in reading mode, not writing or appending mode.
     */
    SkipLine(): void;

    /**
     * Indicates whether the stream pointer position is at the end of a line.
     */
    AtEndOfLine: boolean;

    /**
     * Indicates whether the stream pointer position is at the end of a stream.
     */
    AtEndOfStream: boolean;
}

declare var WScript: {
    /**
    * Outputs text to either a message box (under WScript.exe) or the command console window followed by
    * a newline (under CScript.exe).
    */
    Echo(s: any): void;

    /**
     * Exposes the write-only error output stream for the current script.
     * Can be accessed only while using CScript.exe.
     */
    StdErr: TextStreamWriter;

    /**
     * Exposes the write-only output stream for the current script.
     * Can be accessed only while using CScript.exe.
     */
    StdOut: TextStreamWriter;
    Arguments: { length: number; Item(n: number): string; };

    /**
     *  The full path of the currently running script.
     */
    ScriptFullName: string;

    /**
     * Forces the script to stop immediately, with an optional exit code.
     */
    Quit(exitCode?: number): number;

    /**
     * The Windows Script Host build version number.
     */
    BuildVersion: number;

    /**
     * Fully qualified path of the host executable.
     */
    FullName: string;

    /**
     * Gets/sets the script mode - interactive(true) or batch(false).
     */
    Interactive: boolean;

    /**
     * The name of the host executable (WScript.exe or CScript.exe).
     */
    Name: string;

    /**
     * Path of the directory containing the host executable.
     */
    Path: string;

    /**
     * The filename of the currently running script.
     */
    ScriptName: string;

    /**
     * Exposes the read-only input stream for the current script.
     * Can be accessed only while using CScript.exe.
     */
    StdIn: TextStreamReader;

    /**
     * Windows Script Host version
     */
    Version: string;

    /**
     * Connects a COM object's event sources to functions named with a given prefix, in the form prefix_event.
     */
    ConnectObject(objEventSource: any, strPrefix: string): void;

    /**
     * Creates a COM object.
     * @param strProgiID
     * @param strPrefix Function names in the form prefix_event will be bound to this object's COM events.
     */
    CreateObject(strProgID: string, strPrefix?: string): any;

    /**
     * Disconnects a COM object from its event sources.
     */
    DisconnectObject(obj: any): void;

    /**
     * Retrieves an existing object with the specified ProgID from memory, or creates a new one from a file.
     * @param strPathname Fully qualified path to the file containing the object persisted to disk.
     *                       For objects in memory, pass a zero-length string.
     * @param strProgID
     * @param strPrefix Function names in the form prefix_event will be bound to this object's COM events.
     */
    GetObject(strPathname: string, strProgID?: string, strPrefix?: string): any;

    /**
     * Suspends script execution for a specified length of time, then continues execution.
     * @param intTime Interval (in milliseconds) to suspend script execution.
     */
    Sleep(intTime: number): void;
};

/**
 * Allows enumerating over a COM collection, which may not have indexed item access.
 */
interface Enumerator<T> {
    /**
     * Returns true if the current item is the last one in the collection, or the collection is empty,
     * or the current item is undefined.
     */
    atEnd(): boolean;

    /**
     * Returns the current item in the collection
     */
    item(): T;

    /**
     * Resets the current item in the collection to the first item. If there are no items in the collection,
     * the current item is set to undefined.
     */
    moveFirst(): void;

    /**
     * Moves the current item to the next item in the collection. If the enumerator is at the end of
     * the collection or the collection is empty, the current item is set to undefined.
     */
    moveNext(): void;
}

interface EnumeratorConstructor {
    new <T>(collection: any): Enumerator<T>;
    new (collection: any): Enumerator<any>;
}

declare var Enumerator: EnumeratorConstructor;

/**
 * Enables reading from a COM safe array, which might have an alternate lower bound, or multiple dimensions.
 */
interface VBArray<T> {
    /**
     * Returns the number of dimensions (1-based).
     */
    dimensions(): number;

    /**
     * Takes an index for each dimension in the array, and returns the item at the corresponding location.
     */
    getItem(dimension1Index: number, ...dimensionNIndexes: number[]): T;

    /**
     * Returns the smallest available index for a given dimension.
     * @param dimension 1-based dimension (defaults to 1)
     */
    lbound(dimension?: number): number;

    /**
     * Returns the largest available index for a given dimension.
     * @param dimension 1-based dimension (defaults to 1)
     */
    ubound(dimension?: number): number;

    /**
     * Returns a Javascript array with all the elements in the VBArray. If there are multiple dimensions,
     * each successive dimension is appended to the end of the array.
     * Example: [[1,2,3],[4,5,6]] becomes [1,2,3,4,5,6]
     */
    toArray(): T[];
}

interface VBArrayConstructor {
    new <T>(safeArray: any): VBArray<T>;
    new (safeArray: any): VBArray<any>;
}

declare var VBArray: VBArrayConstructor;
