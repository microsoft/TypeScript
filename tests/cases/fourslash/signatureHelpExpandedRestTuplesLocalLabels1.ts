/// <reference path='fourslash.ts' />
// from: https://github.com/microsoft/TypeScript/pull/57619

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
////
//// function logFruitTuple10(...[fruit, {}, secondFruitInfoOrNumber]: FruitAndInfo3) {}
//// logFruitTuple10(/*21*/);
//// logFruitTuple10("apple", /*22*/);
//// logFruitTuple10("apple", { color: "red" }, /*23*/);
////
//// function logFruitTuple11(...{}: FruitAndInfo3) {}
//// logFruitTuple11(/*24*/);
//// logFruitTuple11("apple", /*25*/);
//// logFruitTuple11("apple", { color: "red" }, /*26*/);

//// function withPair(...[first, second]: [number, named: string]) {}
//// withPair(/*27*/);
//// withPair(101, /*28*/);

verify.baselineSignatureHelp();
