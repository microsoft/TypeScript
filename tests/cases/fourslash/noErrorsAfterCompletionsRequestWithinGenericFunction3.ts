///<reference path="fourslash.ts"/>
// @strict: true
////
//// // repro from #52580#issuecomment-1416131055
////
//// type Funcs<A, B extends Record<string, unknown>> = {
////   [K in keyof B]: {
////     fn: (a: A, b: B) => void;
////     thing: B[K];
////   }
//// }
////
//// function foo<A, B extends Record<string, unknown>>(fns: Funcs<A, B>) {}
////
//// foo({
////   bar: { fn: (a: string, b) => {}, thing: "asd" },
////   /*1*/
//// });

goTo.marker("1");
const markerPosition = test.markers()[0].position;
edit.paste(`bar: { fn: (a: string, b) => {}, thing: "asd" },`)
edit.replace(markerPosition + 4, 1, 'z')
verify.completions({ isNewIdentifierLocation: true });
verify.noErrors();
