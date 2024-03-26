/// <reference path='fourslash.ts' />

//// interface AppleInfo {
////   color: "green" | "red";
//// }
////
//// interface BananaInfo {
////   curvature: number;
//// }
////
//// type FruitAndInfo1 = ["apple", AppleInfo] | ["banana", BananaInfo];
////
//// function logFruitTuple1(...[fruit, info]: FruitAndInfo1) {}
//// logFruitTuple1(/*1*/);
////
//// function logFruitTuple2(...[, info]: FruitAndInfo1) {}
//// logFruitTuple2(/*2*/);
//// logFruitTuple2("apple", /*3*/);
////
//// function logFruitTuple3(...[fruit, ...rest]: FruitAndInfo1) {}
//// logFruitTuple3(/*4*/);
//// logFruitTuple3("apple", /*5*/);

//// function logFruitTuple4(...[fruit, ...[info]]: FruitAndInfo1) {}
//// logFruitTuple4(/*6*/);
//// logFruitTuple4("apple", /*7*/);
////
//// type FruitAndInfo2 = ["apple", ...AppleInfo[]] | ["banana", ...BananaInfo[]];
////
//// function logFruitTuple5(...[fruit, firstInfo]: FruitAndInfo2) {}
//// logFruitTuple5(/*8*/);
//// logFruitTuple5("apple", /*9*/);
////
//// function logFruitTuple6(...[fruit, ...fruitInfo]: FruitAndInfo2) {}
//// logFruitTuple6(/*10*/);
//// logFruitTuple6("apple", /*11*/);
////
//// type FruitAndInfo3 = ["apple", ...AppleInfo[], number] | ["banana", ...BananaInfo[], number];
////
//// function logFruitTuple7(...[fruit, fruitInfoOrNumber, secondFruitInfoOrNumber]: FruitAndInfo3) {}
//// logFruitTuple7(/*12*/);
//// logFruitTuple7("apple", /*13*/);
//// logFruitTuple7("apple", { color: "red" }, /*14*/);
////
//// function logFruitTuple8(...[fruit, , secondFruitInfoOrNumber]: FruitAndInfo3) {}
//// logFruitTuple8(/*15*/);
//// logFruitTuple8("apple", /*16*/);
//// logFruitTuple8("apple", { color: "red" }, /*17*/);
////
//// function logFruitTuple9(...[...[fruit, fruitInfoOrNumber, secondFruitInfoOrNumber]]: FruitAndInfo3) {}
//// logFruitTuple9(/*18*/);
//// logFruitTuple9("apple", /*19*/);
//// logFruitTuple9("apple", { color: "red" }, /*20*/);

verify.signatureHelp(
    {
        marker: "1",
        text: `logFruitTuple1(fruit: "apple", info: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: false,
    },
    {
        marker: "2",
        text: `logFruitTuple2(__0_0: "apple", info: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "__0_0",
        parameterSpan: `__0_0: "apple"`,
        isVariadic: false,
    },
    {
        marker: "3",
        text: `logFruitTuple2(__0_0: "apple", info: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "info",
        parameterSpan: "info: AppleInfo",
        isVariadic: false,
    },
    {
        marker: "4",
        text: `logFruitTuple3(fruit: "apple", __0_1: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: false,
    },
    {
        marker: "5",
        text: `logFruitTuple3(fruit: "apple", __0_1: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "__0_1",
        parameterSpan: "__0_1: AppleInfo",
        isVariadic: false,
    },
    {
        marker: "6",
        text: `logFruitTuple4(fruit: "apple", __0_1: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: false,
    },
    {
        marker: "7",
        text: `logFruitTuple4(fruit: "apple", __0_1: AppleInfo): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "__0_1",
        parameterSpan: "__0_1: AppleInfo",
        isVariadic: false,
    },
    {
        marker: "8",
        text: `logFruitTuple5(fruit: "apple", ...__0_1: AppleInfo[]): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: true,
    },
    {
        marker: "9",
        text: `logFruitTuple5(fruit: "apple", ...__0_1: AppleInfo[]): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "__0_1",
        parameterSpan: "...__0_1: AppleInfo[]",
        isVariadic: true,
    },
    {
        marker: "10",
        text: `logFruitTuple6(fruit: "apple", ...fruitInfo: AppleInfo[]): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: true,
    },
    {
        marker: "11",
        text: `logFruitTuple6(fruit: "apple", ...fruitInfo: AppleInfo[]): void`,
        overloadsCount: 2,
        parameterCount: 2,
        parameterName: "fruitInfo",
        parameterSpan: "...fruitInfo: AppleInfo[]",
        isVariadic: true,
    },
    {
        marker: "12",
        text: `logFruitTuple7(fruit: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: false,
    },
    {
        marker: "13",
        text: `logFruitTuple7(fruit: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_1",
        parameterSpan: `...__0_1: AppleInfo[]`,
        isVariadic: false,
    },
    {
        marker: "14",
        text: `logFruitTuple7(fruit: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_2",
        parameterSpan: `__0_2: number`,
        isVariadic: false,
    },
    {
        marker: "15",
        text: `logFruitTuple8(fruit: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "fruit",
        parameterSpan: `fruit: "apple"`,
        isVariadic: false,
    },
    {
        marker: "16",
        text: `logFruitTuple8(fruit: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_1",
        parameterSpan: `...__0_1: AppleInfo[]`,
        isVariadic: false,
    },
    {
        marker: "17",
        text: `logFruitTuple8(fruit: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_2",
        parameterSpan: `__0_2: number`,
        isVariadic: false,
    },
    {
        marker: "18",
        text: `logFruitTuple9(__0_0: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_0",
        parameterSpan: `__0_0: "apple"`,
        isVariadic: false,
    },
    {
        marker: "19",
        text: `logFruitTuple9(__0_0: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_1",
        parameterSpan: `...__0_1: AppleInfo[]`,
        isVariadic: false,
    },
    {
        marker: "20",
        text: `logFruitTuple9(__0_0: "apple", ...__0_1: AppleInfo[], __0_2: number): void`,
        overloadsCount: 2,
        parameterCount: 3,
        parameterName: "__0_2",
        parameterSpan: `__0_2: number`,
        isVariadic: false,
    },
);
