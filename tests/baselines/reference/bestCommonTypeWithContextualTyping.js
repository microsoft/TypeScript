//// [bestCommonTypeWithContextualTyping.ts]
interface Contextual {
    dummy;
    p?: number;
}

interface Element {
    dummy;
    p: any;
}

var e: Element;

// All of these should pass. Neither type is a supertype of the other, but the RHS should
// always use Element in these examples (not Contextual). Because Element is assignable
// to Contextual, no errors.
var arr: Contextual[] = [e]; // Element[]
var obj: { [s: string]: Contextual } = { s: e }; // { s: Element; [s: string]: Element }

var conditional: Contextual = null ? e : e; // Element
var contextualOr: Contextual = e || e; // Element

//// [bestCommonTypeWithContextualTyping.js]
var e;
// All of these should pass. Neither type is a supertype of the other, but the RHS should
// always use Element in these examples (not Contextual). Because Element is assignable
// to Contextual, no errors.
var arr = [e]; // Element[]
var obj = { s: e }; // { s: Element; [s: string]: Element }
var conditional = null ? e : e; // Element
var contextualOr = e || e; // Element
