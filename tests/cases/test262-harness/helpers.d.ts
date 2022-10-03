declare function $FAIL(message: any): void;
declare function $PRINT(message: any): void;
declare function accessorPropertyAttributesAreCorrect(obj: any, name: any, get: any, set: any, setVerifyHelpProp: any, enumerable: any, configurable: any): boolean;
declare function arrayContains(arr: any, expected: any): boolean;
declare function compareArray(aExpected: any, aActual: any): boolean;
declare function testRun(id: any, path: any, description: any, codeString: any, result: any, error: any): void;
declare var print: any;
declare function dataPropertyAttributesAreCorrect(obj: any, name: any, value: any, writable: any, enumerable: any, configurable: any): boolean;
declare var HoursPerDay: number;
declare var MinutesPerHour: number;
declare var SecondsPerMinute: number;
declare var msPerDay: number;
declare var msPerSecond: number;
declare var msPerMinute: number;
declare var msPerHour: number;
declare var date_1899_end: number;
declare var date_1900_start: number;
declare var date_1969_end: number;
declare var date_1970_start: number;
declare var date_1999_end: number;
declare var date_2000_start: number;
declare var date_2099_end: number;
declare var date_2100_start: number;
declare var $LocalTZ: any, $DST_start_month: any, $DST_start_sunday: any, $DST_start_hour: any, $DST_start_minutes: any, $DST_end_month: any, $DST_end_sunday: any, $DST_end_hour: any, $DST_end_minutes: any;
declare function Day(t: any): number;
declare function TimeWithinDay(t: any): number;
declare function DaysInYear(y: any): number;
declare function DayFromYear(y: any): number;
declare function TimeFromYear(y: any): number;
declare function YearFromTime(t: any): number;
declare function InLeapYear(t: any): number;
declare function DayWithinYear(t: any): number;
declare function MonthFromTime(t: any): number;
declare function DateFromTime(t: any): number;
declare function WeekDay(t: any): number;
declare var LocalTZA: number;
declare function DaysInMonth(m: any, leap: any): any;
declare function GetSundayInMonth(t: any, m: any, count: any): any;
declare function DaylightSavingTA(t: any): number;
declare function LocalTime(t: any): any;
declare function UTC(t: any): number;
declare function HourFromTime(t: any): number;
declare function MinFromTime(t: any): number;
declare function SecFromTime(t: any): number;
declare function msFromTime(t: any): number;
declare function MakeTime(hour: any, min: any, sec: any, ms: any): any;
declare function MakeDay(year: any, month: any, date: any): number;
declare function MakeDate(day: any, time: any): any;
declare function TimeClip(time: any): any;
declare function ConstructDate(year: any, month: any, date: any, hours: any, minutes: any, seconds: any, ms: any): any;
declare function __consolePrintHandle__(msg: any): void;
declare function fnExists(): boolean;
declare var __globalObject: any;
declare function fnGlobalObject(): any;
declare function testPrint(message: any): void;
/**
 * It is not yet clear that runTestCase should pass the global object
 * as the 'this' binding in the call to testcase.
 */
declare var runTestCase: (testcase: any) => void;
declare function assertTruthy(value: any): void;
/**
 * falsy means we expect no error.
 * truthy means we expect some error.
 * A non-empty string means we expect an error whose .name is that string.
 */
declare var expectedErrorName: boolean;
/**
 * What was thrown, or the string 'Falsy' if something falsy was thrown.
 * null if test completed normally.
 */
declare var actualError: any;
declare function testStarted(expectedErrName: any): void;
declare function testFinished(): void;
declare function Presenter(): void;
declare var presenter: any;
declare var prec: any;
declare function isEqual(num1: any, num2: any): boolean;
declare function getPrecision(num: any): number;
declare function ToInteger(p: any): any;
declare function checkSequence<T>(arr: Promise<T>, message: string): void;
declare var objectStore: {
    object: Object;
};
declare var functionStore: {
    fun: () => string;
};
declare function createEmulatedProxy<T>(target: T, emulatedProps: any, success?: any): T;
declare function Section(parentSection: any, id: any, name: any): void;
declare var NotEarlyErrorString: string;
declare var EarlyErrorRePat: string;
declare var NotEarlyError: Error;
declare var $ERROR: any;
declare function BrowserRunner(): void;
declare function TestLoader(): void;
declare function Controller(): void;
declare var controller: any;
declare function isSiteDebugMode(): boolean;
/**
 * @description Helper handler method for tagged string templates
 */
declare function testHandler(literals: any): string;
/**
 * @description Tests that obj meets the requirements for built-in objects
 *     defined by the introduction of chapter 15 of the ECMAScript Language Specification.
 * @param {Object} obj the object to be tested.
 * @param {boolean} isFunction whether the specification describes obj as a function.
 * @param {boolean} isConstructor whether the specification describes obj as a constructor.
 * @param {String[]} properties an array with the names of the built-in properties of obj,
 *     excluding length, prototype, or properties with non-default attributes.
 * @param {number} length for functions only: the length specified for the function
 *     or derived from the argument list.
 * @author Norbert Lindenberg
 */
declare function testBuiltInObject(obj: any, isFunction: any, isConstructor: any, properties: any, length: any): boolean;
/**
 * @description This is a helper file for testing detached typed arrays
 * @author Andrei Borodin (anborod)
 */
declare var lib: {
    init: () => void;
    dispose: () => void;
    detachItem: (item: any) => any;
    createDetachCallback: (arr: any, detachAfterNumIterations: any, valueToReturn: any) => (item: any) => any;
    createDetachValueOfObject: (arr: any, detachAfterNumIterations: any, value: any) => {
        valueOf: () => any;
    };
    createDetachToStringObject: (arr: any, detachAfterNumIterations: any, value: any) => {
        toString: () => string;
    };
    runTestCaseWrapper: (func: any) => void;
    expectTypeError: (func: any, reason: any) => void;
    expectRangeError: (func: any, reason: any) => void;
    expectError: (errorType: any, name: any, func: any, reason: any) => void;
    isDetached: (obj: any) => boolean;
};
declare function testIntlOptions(givenOptions: any, expectedOptions: any): void;
/**
 * This file contains shared functions for the tests in the conformance test
 * suite for the ECMAScript Internationalization API.
 * @author Norbert Lindenberg
 */
/**
 * @description Calls the provided function for every service constructor in
 * the Intl object, until f returns a falsy value. It returns the result of the
 * last call to f, mapped to a boolean.
 * @param {Function} f the function to call for each service constructor in
 *     the Intl object.
 *     @param {Function} Constructor the constructor object to test with.
 * @result {Boolean} whether the test succeeded.
 */
declare function testWithIntlConstructors(f: any): boolean;
/**
 * Returns the name of the given constructor object, which must be one of
 * Intl.Collator, Intl.NumberFormat, or Intl.DateTimeFormat.
 * @param {object} Constructor a constructor
 * @return {string} the name of the constructor
 */
declare function getConstructorName(Constructor: any): string;
/**
 * Taints a named data property of the given object by installing
 * a setter that throws an exception.
 * @param {object} obj the object whose data property to taint
 * @param {string} property the property to taint
 */
declare function taintDataProperty(obj: any, property: any): void;
/**
 * Taints a named method of the given object by replacing it with a function
 * that throws an exception.
 * @param {object} obj the object whose method to taint
 * @param {string} property the name of the method to taint
 */
declare function taintMethod(obj: any, property: any): void;
/**
 * Taints the given properties (and similarly named properties) by installing
 * setters on Object.prototype that throw exceptions.
 * @param {Array} properties an array of property names to taint
 */
declare function taintProperties(properties: any): void;
/**
 * Taints the Array object by creating a setter for the property "0" and
 * replacing some key methods with functions that throw exceptions.
 */
declare function taintArray(): void;
declare var languages: string[];
declare var scripts: string[];
declare var countries: string[];
declare var localeSupportInfo: {};
/**
 * Gets locale support info for the given constructor object, which must be one
 * of Intl.Collator, Intl.NumberFormat, Intl.DateTimeFormat.
 * @param {object} Constructor the constructor for which to get locale support info
 * @return {object} locale support info with the following properties:
 *     supported: array of fully supported language tags
 *     byFallback: array of language tags that are supported through fallbacks
 *     unsupported: array of unsupported language tags
 */
declare function getLocaleSupportInfo(Constructor: any): any;
/**
 * @description Tests whether locale is a String value representing a
 * structurally valid and canonicalized BCP 47 language tag, as defined in
 * sections 6.2.2 and 6.2.3 of the ECMAScript Internationalization API
 * Specification.
 * @param {String} locale the string to be tested.
 * @result {Boolean} whether the test succeeded.
 */
declare function isCanonicalizedStructurallyValidLanguageTag(locale: any): boolean;
/**
 * Tests whether the named options property is correctly handled by the given constructor.
 * @param {object} Constructor the constructor to test.
 * @param {string} property the name of the options property to test.
 * @param {string} type the type that values of the property are expected to have
 * @param {Array} [values] an array of allowed values for the property. Not needed for boolean.
 * @param {any} fallback the fallback value that the property assumes if not provided.
 * @param {object} testOptions additional options:
 *     @param {boolean} isOptional whether support for this property is optional for implementations.
 *     @param {boolean} noReturn whether the resulting value of the property is not returned.
 *     @param {boolean} isILD whether the resulting value of the property is implementation and locale dependent.
 *     @param {object} extra additional option to pass along, properties are value -> {option: value}.
 * @return {boolean} whether the test succeeded.
 */
declare function testOption(Constructor: any, property: any, type: any, values: any, fallback: any, testOptions: any): boolean;
/**
 * Tests whether the named property of the given object has a valid value
 * and the default attributes of the properties of an object literal.
 * @param {Object} obj the object to be tested.
 * @param {string} property the name of the property
 * @param {Function|Array} valid either a function that tests value for validity and returns a boolean,
 *     an array of valid values.
 * @exception if the property has an invalid value.
 */
declare function testProperty(obj: any, property: any, valid: any): void;
/**
 * Tests whether the named property of the given object, if present at all, has a valid value
 * and the default attributes of the properties of an object literal.
 * @param {Object} obj the object to be tested.
 * @param {string} property the name of the property
 * @param {Function|Array} valid either a function that tests value for validity and returns a boolean,
 *     an array of valid values.
 * @exception if the property is present and has an invalid value.
 */
declare function mayHaveProperty(obj: any, property: any, valid: any): void;
/**
 * Tests whether the given object has the named property with a valid value
 * and the default attributes of the properties of an object literal.
 * @param {Object} obj the object to be tested.
 * @param {string} property the name of the property
 * @param {Function|Array} valid either a function that tests value for validity and returns a boolean,
 *     an array of valid values.
 * @exception if the property is missing or has an invalid value.
 */
declare function mustHaveProperty(obj: any, property: any, valid: any): void;
/**
 * Tests whether the given object does not have the named property.
 * @param {Object} obj the object to be tested.
 * @param {string} property the name of the property
 * @exception if the property is present.
 */
declare function mustNotHaveProperty(obj: any, property: any): void;
/**
 * Properties of the RegExp constructor that may be affected by use of regular
 * expressions, and the default values of these properties. Properties are from
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Deprecated_and_obsolete_features#RegExp_Properties
 */
declare var regExpProperties: string[];
declare var regExpPropertiesDefaultValues: any;
/**
 * Tests that executing the provided function (which may use regular expressions
 * in its implementation) does not create or modify unwanted properties on the
 * RegExp constructor.
 */
declare function testForUnwantedRegExpChanges(testFunc: any): void;
/**
 * Tests whether name is a valid BCP 47 numbering system name
 * and not excluded from use in the ECMAScript Internationalization API.
 * @param {string} name the name to be tested.
 * @return {boolean} whether name is a valid BCP 47 numbering system name and
 *     allowed for use in the ECMAScript Internationalization API.
 */
declare function isValidNumberingSystem(name: any): boolean;
/**
 * Provides the digits of numbering systems with simple digit mappings,
 * as specified in 11.3.2.
 */
declare var numberingSystemDigits: {
    arab: string;
    arabext: string;
    beng: string;
    deva: string;
    fullwide: string;
    gujr: string;
    guru: string;
    hanidec: string;
    khmr: string;
    knda: string;
    laoo: string;
    latn: string;
    mlym: string;
    mong: string;
    mymr: string;
    orya: string;
    tamldec: string;
    telu: string;
    thai: string;
    tibt: string;
};
/**
 * Tests that number formatting is handled correctly. The function checks that the
 * digit sequences in formatted output are as specified, converted to the
 * selected numbering system, and embedded in consistent localized patterns.
 * @param {Array} locales the locales to be tested.
 * @param {Array} numberingSystems the numbering systems to be tested.
 * @param {Object} options the options to pass to Intl.NumberFormat. Options
 *     must include {useGrouping: false}, and must cause 1.1 to be formatted
 *     pre- and post-decimal digits.
 * @param {Object} testData maps input data (in ES5 9.3.1 format) to expected output strings
 *     in unlocalized format with Western digits.
 */
declare function testNumberFormat(locales: any, numberingSystems: any, options: any, testData: any): void;
/**
 * Return the components of date-time formats.
 * @return {Array} an array with all date-time components.
 */
declare function getDateTimeComponents(): string[];
/**
 * Return the valid values for the given date-time component, as specified
 * by the table in section 12.1.1.
 * @param {string} component a date-time component.
 * @return {Array} an array with the valid values for the component.
 */
declare function getDateTimeComponentValues(component: any): any;
/**
 * Tests that the given value is valid for the given date-time component.
 * @param {string} component a date-time component.
 * @param {string} value the value to be tested.
 * @return {boolean} true if the test succeeds.
 * @exception if the test fails.
 */
declare function testValidDateTimeComponentValue(component: any, value: any): boolean;
/**
 * Verifies that the actual array matches the expected one in length, elements,
 * and element order.
 * @param {Array} expected the expected array.
 * @param {Array} actual the actual array.
 * @return {boolean} true if the test succeeds.
 * @exception if the test fails.
 */
declare function testArraysAreSame(expected: any, actual: any): boolean;
/**
 * @description Helper methods for TypedArrays
 */
declare function CreateTypedArrayTypes(): [typeof Int8Array, typeof Uint8Array, typeof Int16Array, typeof Uint16Array, typeof Int32Array, typeof Uint32Array, typeof Float32Array, typeof Float64Array, typeof Uint8ClampedArray];
declare function CreateTypedArrayInstances(obj: any): [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
declare function CreateIntegerTypedArrayTypes(): [typeof Int8Array, typeof Uint8Array, typeof Int16Array, typeof Uint16Array, typeof Int32Array, typeof Uint32Array, typeof Uint8ClampedArray];
declare function CreateIntegerTypedArrays(obj: any): [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Uint8ClampedArray];
declare function CreateTypedRedcuedSetOfArrayTypes(): [typeof Float64Array];
declare function CreateTypedRedcuedSetOfArrays(obj: any): [Float64Array];
declare function CreateTypedArraysFrom(obj: any): [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
declare function CreateTypedArraysOf(obj: any): [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
declare function CreateTypedArraysFromMapFn(obj: any, mapFn: any): [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
declare function CreateTypedArraysFromThisObj(obj: any, mapFn: any, thisArg: any): [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
declare function CreatestringsOf(obj: any): string[];
declare function CreateSignedTypedArrayInstances(obj: any): [Int8Array, Int16Array, Int32Array, Float32Array, Float64Array];
declare function CreateUnSignedTypedArrayInstances(obj: any): [Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray];
declare var $LOG: any;
declare var WScript: any;
declare var $DONE: any;