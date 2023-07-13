///<reference path="fourslash.ts"/>
// @strict: true
////
//// type GreetingEvent =
////   | { type: "MORNING" }
////   | { type: "LUNCH_TIME" }
////   | { type: "ALOHA" };
////
//// interface RaiseActionObject<TEvent extends { type: string }> {
////   type: "raise";
////   event: TEvent;
//// }
////
//// declare function raise<TEvent extends { type: string }>(
////   ev: TEvent
//// ): RaiseActionObject<TEvent>;
////
//// declare function createMachine<TEvent extends { type: string }>(config: {
////   actions: RaiseActionObject<TEvent>;
//// }): void;
////
//// createMachine<GreetingEvent>({
////   [|/*error*/actions|]: raise({ type: "ALOHA/*1*/" }),
//// });

goTo.marker("1");
edit.insert(`x`)
verify.completions({ exact: ["MORNING", "LUNCH_TIME", "ALOHA"] });
verify.getSemanticDiagnostics([{
    code: 2322,
    message: `Type 'RaiseActionObject<{ type: "ALOHAx"; }>' is not assignable to type 'RaiseActionObject<GreetingEvent>'.\n  Type '{ type: "ALOHAx"; }' is not assignable to type 'GreetingEvent'.\n    Type '{ type: "ALOHAx"; }' is not assignable to type '{ type: "ALOHA"; }'.\n      Types of property 'type' are incompatible.\n        Type '"ALOHAx"' is not assignable to type '"ALOHA"'.`,
}]);
