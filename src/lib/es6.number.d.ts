interface NumberConstructor {
    /**
      * The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1
      * that is representable as a Number value, which is approximately: 
      * 2.2204460492503130808472633361816 x 10‍−‍16.
      */
    readonly EPSILON: number;

    /**
      * Returns true if passed value is finite.
      * Unlike the global isFininte, Number.isFinite doesn't forcibly convert the parameter to a 
      * number. Only finite values of the type number, result in true.
      * @param number A numeric value.
      */
    isFinite(number: number): boolean;

    /**
      * Returns true if the value passed is an integer, false otherwise.
      * @param number A numeric value.
      */
    isInteger(number: number): boolean;

    /**
      * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a 
      * number). Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter
      * to a number. Only values of the type number, that are also NaN, result in true.
      * @param number A numeric value.
      */
    isNaN(number: number): boolean;

    /**
      * Returns true if the value passed is a safe integer.
      * @param number A numeric value.
      */
    isSafeInteger(number: number): boolean;

    /** 
      * The value of the largest integer n such that n and n + 1 are both exactly representable as 
      * a Number value. 
      * The value of Number.MIN_SAFE_INTEGER is 9007199254740991 2^53 − 1.
      */
    readonly MAX_SAFE_INTEGER: number;

    /** 
      * The value of the smallest integer n such that n and n − 1 are both exactly representable as 
      * a Number value. 
      * The value of Number.MIN_SAFE_INTEGER is −9007199254740991 (−(2^53 − 1)).
      */
    readonly MIN_SAFE_INTEGER: number;

    /**
      * Converts a string to a floating-point number. 
      * @param string A string that contains a floating-point number. 
      */
    parseFloat(string: string): number;

    /**
      * Converts A string to an integer.
      * @param s A string to convert into a number.
      * @param radix A value between 2 and 36 that specifies the base of the number in numString. 
      * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
      * All other strings are considered decimal.
      */
    parseInt(string: string, radix?: number): number;
}