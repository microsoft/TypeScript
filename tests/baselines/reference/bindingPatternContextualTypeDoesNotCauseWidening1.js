//// [tests/cases/compiler/bindingPatternContextualTypeDoesNotCauseWidening1.ts] ////

//// [bindingPatternContextualTypeDoesNotCauseWidening1.ts]
declare function pick<O, T extends keyof O>(keys: T[], obj?: O): Pick<O, T>;
const _    = pick(['b'], { a: 'a', b: 'b' }); // T: "b"
const {  } = pick(['b'], { a: 'a', b: 'b' }); // T: "b"


//// [bindingPatternContextualTypeDoesNotCauseWidening1.js]
var _ = pick(['b'], { a: 'a', b: 'b' }); // T: "b"
var _a = pick(['b'], { a: 'a', b: 'b' }); // T: "b"
