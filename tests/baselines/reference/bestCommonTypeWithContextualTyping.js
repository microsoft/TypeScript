//// [tests/cases/compiler/bestCommonTypeWithContextualTyping.ts] ////

//// [bestCommonTypeWithContextualTyping.ts]
interface Contextual {
    dummy;
    p?: number;
}

interface Ellement {
    dummy;
    p: any;
}

var e: Ellement;

// All of these should pass. Neither type is a supertype of the other, but the RHS should
// always use Ellement in these examples (not Contextual). Because Ellement is assignable
// to Contextual, no errors.
var arr: Contextual[] = [e]; // Ellement[]
var obj: { [s: string]: Contextual } = { s: e }; // { s: Ellement; [s: string]: Ellement }

var conditional: Contextual = null ? e : e; // Ellement
var contextualOr: Contextual = e || e; // Ellement

//// [bestCommonTypeWithContextualTyping.js]
var e;
// All of these should pass. Neither type is a supertype of the other, but the RHS should
// always use Ellement in these examples (not Contextual). Because Ellement is assignable
// to Contextual, no errors.
var arr = [e]; // Ellement[]
var obj = { s: e }; // { s: Ellement; [s: string]: Ellement }
var conditional = null ? e : e; // Ellement
var contextualOr = e || e; // Ellement
