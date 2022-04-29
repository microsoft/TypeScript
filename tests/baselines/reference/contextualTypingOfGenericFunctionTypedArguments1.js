//// [contextualTypingOfGenericFunctionTypedArguments1.ts]
interface Collection<T> {
    length: number;
    add(x: T): void;
    remove(x: T): boolean;
}

interface Combinators {
    forEach<T>(c: Collection<T>, f: (x: T) => Date): void;
}

var c2: Collection<number>;
var _: Combinators;

// errors on all 3 lines, bug was that r5 was the only line with errors
var f = (x: number) => { return x.toFixed() };
var r5 = _.forEach<number>(c2, f); 
var r6 = _.forEach<number>(c2, (x) => { return x.toFixed() }); 


//// [contextualTypingOfGenericFunctionTypedArguments1.js]
var c2;
var _;
// errors on all 3 lines, bug was that r5 was the only line with errors
var f = function (x) { return x.toFixed(); };
var r5 = _.forEach(c2, f);
var r6 = _.forEach(c2, function (x) { return x.toFixed(); });
