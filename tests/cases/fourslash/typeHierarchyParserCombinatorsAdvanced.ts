/// <reference path='fourslash.ts'/>

// Test type hierarchy with advanced parser combinator type-level programming
// This tests extremely complex conditional types with rest type parameters

// @Filename: /parserCombinators.ts
/////** The core parser type */
////type /*parse*/Parse<A extends Parser, B> = ReturnType<A & {0?: B}>;
////
/////** Tries each parser in order until one succeeds */
////interface /*choice*/Choice {
////    <G extends readonly Parser[]>(g: this extends {0?: infer G extends readonly Parser[]} ? G : G): DoChoice<typeof g>;
////}
////interface DoChoice<G extends readonly Parser[]> {
////    <S extends string>(s: this extends {0?: `${infer S}`} ? S : S)
////    : string extends typeof s ? MaybeResult : DoneChoice<G, typeof s>;
////}
////type /*doneChoice*/DoneChoice<G, S extends string> = G extends readonly [infer H extends Parser, ...infer T]
////    ? [ParseResult<H, S>] extends [Ok<`${infer R}`, infer Data>]
////        ? Ok<R, Data>
////    : DoneChoice<T, S>
////  : Err<S>;
////
/////** Matches the end of input */
////interface /*eof*/EOF {
////    <S extends string>(s: this extends {0?: `${infer S}`} ? S : S): string extends typeof s ? MaybeResult : DoneEOF<typeof s>;
////}
////type DoneEOF<S extends string> = S extends "" ? Ok<"", ""> : Err<S>;
////
/////** Matches exactly one character/token */
////interface /*just*/Just {
////    <J extends Parser | readonly unknown[] | string>(j: this extends {0?: infer J extends Parser | readonly unknown[] | string} ? J : J)
////    : DoJust<typeof j>;
////}
////interface DoJust<J extends Parser | readonly unknown[] | string> {
////    <S extends string>(s: this extends {0?: `${infer S}`} ? S : S): string extends typeof s ? MaybeResult : DoneJust<J, typeof s>;
////}
////type /*doneJust*/DoneJust<J, S extends string> = S extends `${infer H}${infer T}`
////    ? [J] extends [Parser]
////        ? Parse<J, H> extends Ok<string> ? Ok<T, H> : Err<S>
////        : [J] extends [readonly unknown[]]
////            ? [H] extends [J[number]] ? Ok<T, H> : Err<S>
////            : [H] extends [J] ? Ok<T, H> : Err<S>
////    : Err<S>;
////
/////** Matches zero or more of the parser */
////interface /*many0*/Many0 { <P extends Parser>(p: this extends {0?: infer P extends Parser} ? P : P): DoMany0<typeof p> }
////interface DoMany0<P extends Parser> {
////    <S extends string>(s: this extends {0?: `${infer S}`} ? S : S): string extends typeof s ? MaybeResult : DoneMany0<P, Ok<typeof s, []>>;
////}
////type /*doneMany0*/DoneMany0<P extends Parser, O extends Ok<string, unknown[]>>
////  = [ParseResult<P, O["rest"]>] extends [Ok<`${infer Rest}`, infer Data>]
////    ? DoneMany0<P, Ok<Rest, [...O["data"], Data]>>
////    : O;
////
/////** Matches one or more of the parser */
////interface Many1 { <P extends Parser>(p: this extends {0?: infer P extends Parser} ? P : P): DoMany1<typeof p> }
////interface DoMany1<P extends Parser> {
////    <S extends string>(s: this extends {0?: `${infer S}`} ? S : S): string extends typeof s ? MaybeResult : DoneMany1<P, typeof s>;
////}
////type DoneMany1<P extends Parser, S extends string>
////  = [ParseResult<P, S>] extends [Ok<`${infer Rest}`, infer Data>]
////    ? string extends Rest ? Err<S> : DoneMany0<P, Ok<Rest, [Data]>>
////    : Err<S>;
////
/////** A result type for parsers that may fail */
////interface /*maybeResult*/MaybeResult {
////    data: unknown;
////    rest: string;
////    success: boolean;
////}
////
/////** Helpers */
////interface Ok<Rest extends string, Data = unknown> extends MaybeResult {
////    data: Data;
////    rest: Rest;
////    success: true;
////}
////interface /*err*/Err<Rest extends string> extends MaybeResult {
////    data: "";
////    rest: Rest;
////    success: false;
////}
////
////type /*parseResult*/ParseResult<A extends Parser, B> = A extends (...args: any) => MaybeResult
////    ? Parse<A, B>
////    : Parse<Parse<A, B>, B>;
////
/////** A parser is a function that attempts to parse an input string */
////type /*parser*/Parser = (...args: any) => any;
////
/////** Deeply recursive mapped type for flattening */
////type /*doFlatten*/DoFlatten<Array extends readonly unknown[]> = Array extends readonly [
////    infer Head,
////    ...infer Rest,
////]
////    ? Head extends readonly unknown[]
////        ? readonly [...DoFlatten<Head>, ...DoFlatten<Rest>]
////        : readonly [Head, ...DoFlatten<Rest>]
////    : readonly [];
////
/////** String to number conversion */
////type /*doStringToNumber*/DoStringToNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
////
/////** Join type - recursive string concatenation */
////type /*doJoin*/DoJoin<T extends readonly string[], Acc extends string = ""> = T extends readonly [
////    infer Head extends string,
////    ...infer Rest extends readonly string[],
////]
////    ? DoJoin<Rest, `${Acc}${Head}`>
////    : Acc;
////
/////** Intersect all objects in array */
////type /*doIntersectAll*/DoIntersectAll<T extends object[], Acc extends object = {}> = T extends readonly [
////    infer Head,
////    ...infer Rest extends object[],
////]
////    ? DoIntersectAll<Rest, Acc & Head>
////    : {[P in keyof Acc]: Acc[P]};

// Test 1: Core Parse type with ReturnType and intersection
goTo.marker("parse");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Choice interface - complex generic with this types
goTo.marker("choice");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: DoneChoice - deeply nested conditional with rest types
goTo.marker("doneChoice");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: EOF interface with template literal inference
goTo.marker("eof");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Just interface - complex overloaded generic
goTo.marker("just");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: DoneJust - nested conditionals with array access
goTo.marker("doneJust");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Many0 interface
goTo.marker("many0");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: DoneMany0 - recursive conditional with spread
goTo.marker("doneMany0");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: MaybeResult base interface
goTo.marker("maybeResult");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Err interface extends MaybeResult
goTo.marker("err");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: ParseResult - conditional with function type
goTo.marker("parseResult");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Parser base type
goTo.marker("parser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: DoFlatten - recursive array manipulation
goTo.marker("doFlatten");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: DoStringToNumber - template literal with infer
goTo.marker("doStringToNumber");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 15: DoJoin - recursive string concatenation
goTo.marker("doJoin");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 16: DoIntersectAll - object intersection accumulator
goTo.marker("doIntersectAll");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
