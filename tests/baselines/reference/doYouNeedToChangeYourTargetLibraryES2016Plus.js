//// [doYouNeedToChangeYourTargetLibraryES2016Plus.ts]
// es2016
const testIncludes = ["hello"].includes("world");

// es2017
const testStringPadStart = "".padStart(2);
const testStringPadEnd = "".padEnd(2);
const testObjectConstructorValues = Object.values({});
const testObjectConstructorEntries = Object.entries({});
const testObjectConstructorGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors({});
const testIntlFormatToParts = new Intl.DateTimeFormat("en-US").formatToParts();
const testAtomics = Atomics.add(new Uint8Array(0), 0, 0);
const testSharedArrayBuffer = new SharedArrayBuffer(5);

// es2018
const testPromiseFinally = new Promise(() => {}).finally();
const testRegExpMatchArrayGroups = "2019-04-30".match(/(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g).groups;
const testRegExpExecArrayGroups = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g.exec("2019-04-30").groups;
const testRegExpDotAll = /foo/g.dotAll;
const testIntlPluralRules = new Intl.PluralRules("ar-EG").select(0);
const testAsyncGenerator: AsyncGenerator<any> = null as any;
const testAsyncGeneratorFunction: AsyncGeneratorFunction = null as any;
const testAsyncIterable: AsyncIterable<any> = null as any;
const testAsyncIterableIterator: AsyncIterableIterator<any> = null as any;
const testNumberFormatFormatToParts = new Intl.NumberFormat("en-US").formatToParts();

// es2019
const testArrayFlat = [].flat();
const testArrayFlatMap = [].flatMap();
const testObjectConstructorFromEntries = Object.fromEntries({});
const testStringTrimStart = "".trimStart();
const testStringTrimEnd = "".trimEnd();
const testStringTrimLeft = "".trimLeft();
const testStringTrimRight = "".trimRight();
const testSymbolDescription = Symbol("foo").description;

// es2020
const testPromiseAllSettled = Promise.allSettled([]);
const testStringMatchAll = "".matchAll();
const testRegExpMatchAll = /matchAll/g[Symbol.matchAll]("matchAll");
const testBigInt = BigInt(123);

// es2021
const testPromiseAny = Promise.any([]);
const testStringReplaceAll = "".replaceAll();

// esnext


//// [doYouNeedToChangeYourTargetLibraryES2016Plus.js]
// es2016
var testIncludes = ["hello"].includes("world");
// es2017
var testStringPadStart = "".padStart(2);
var testStringPadEnd = "".padEnd(2);
var testObjectConstructorValues = Object.values({});
var testObjectConstructorEntries = Object.entries({});
var testObjectConstructorGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors({});
var testIntlFormatToParts = new Intl.DateTimeFormat("en-US").formatToParts();
var testAtomics = Atomics.add(new Uint8Array(0), 0, 0);
var testSharedArrayBuffer = new SharedArrayBuffer(5);
// es2018
var testPromiseFinally = new Promise(function () { })["finally"]();
var testRegExpMatchArrayGroups = "2019-04-30".match(/(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g).groups;
var testRegExpExecArrayGroups = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g.exec("2019-04-30").groups;
var testRegExpDotAll = /foo/g.dotAll;
var testIntlPluralRules = new Intl.PluralRules("ar-EG").select(0);
var testAsyncGenerator = null;
var testAsyncGeneratorFunction = null;
var testAsyncIterable = null;
var testAsyncIterableIterator = null;
var testNumberFormatFormatToParts = new Intl.NumberFormat("en-US").formatToParts();
// es2019
var testArrayFlat = [].flat();
var testArrayFlatMap = [].flatMap();
var testObjectConstructorFromEntries = Object.fromEntries({});
var testStringTrimStart = "".trimStart();
var testStringTrimEnd = "".trimEnd();
var testStringTrimLeft = "".trimLeft();
var testStringTrimRight = "".trimRight();
var testSymbolDescription = Symbol("foo").description;
// es2020
var testPromiseAllSettled = Promise.allSettled([]);
var testStringMatchAll = "".matchAll();
var testRegExpMatchAll = /matchAll/g[Symbol.matchAll]("matchAll");
var testBigInt = BigInt(123);
// es2021
var testPromiseAny = Promise.any([]);
var testStringReplaceAll = "".replaceAll();
// esnext
