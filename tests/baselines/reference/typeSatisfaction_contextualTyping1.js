//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_contextualTyping1.ts] ////

//// [typeSatisfaction_contextualTyping1.ts]
type Predicates = { [s: string]: (n: number) => boolean };

const p = {
    isEven: n => n % 2 === 0,
    isOdd: n => n % 2 === 1
} satisfies Predicates;


//// [typeSatisfaction_contextualTyping1.js]
const p = {
    isEven: n => n % 2 === 0,
    isOdd: n => n % 2 === 1
};
