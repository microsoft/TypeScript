///<reference path="fourslash.ts"/>
// @strict: true
////
//// type ActionFunction<
////   TExpressionEvent extends { type: string },
////   out TEvent extends { type: string }
//// > = {
////   ({ event }: { event: TExpressionEvent }): void;
////   _out_TEvent?: TEvent;
//// };
////
//// interface MachineConfig<TEvent extends { type: string }> {
////   types: {
////     events: TEvent;
////   };
////   on: {
////     [K in TEvent["type"]]?: ActionFunction<
////       Extract<TEvent, { type: K }>,
////       TEvent
////     >;
////   };
//// }
////
//// declare function raise<
////   TExpressionEvent extends { type: string },
////   TEvent extends { type: string }
//// >(
////   resolve: ({ event }: { event: TExpressionEvent }) => TEvent
//// ): {
////   ({ event }: { event: TExpressionEvent }): void;
////   _out_TEvent?: TEvent;
//// };
////
//// declare function createMachine<TEvent extends { type: string }>(
////   config: MachineConfig<TEvent>
//// ): void;
////
//// createMachine({
////   types: {
////     events: {} as { type: "FOO" } | { type: "BAR" },
////   },
////   on: {
////     [|/*error*/FOO|]: raise(({ event }) => {
////       return {
////         type: "BAR/*1*/" as const,
////       };
////     }),
////   },
//// });

goTo.marker("1");
edit.insert(`x`)
verify.completions({ exact: ["FOO", "BAR"] });
verify.baselineSyntacticAndSemanticDiagnostics()