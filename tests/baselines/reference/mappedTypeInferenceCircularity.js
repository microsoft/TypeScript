//// [tests/cases/compiler/mappedTypeInferenceCircularity.ts] ////

//// [mappedTypeInferenceCircularity.ts]
// Repro from #12511

type HTML = { [K in 'div']: Block<HTML> };
type Block<P> = <T>(func: HTML) => {};

declare var h: HTML;
h.div(h);

//// [mappedTypeInferenceCircularity.js]
// Repro from #12511
h.div(h);
