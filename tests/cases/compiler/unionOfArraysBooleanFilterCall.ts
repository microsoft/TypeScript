// @target: es6
interface Fizz {
    id: number;
    member: number;
}
interface Buzz {
    id: number;
    member: string;
}
type Falsey = "" | 0 | false | null | undefined;


([] as (Fizz|Falsey)[] | (Buzz|Falsey)[]).filter(Boolean); // expect type (Fizz|Buzz)[]

([] as (Fizz|Falsey)[] | readonly (Buzz|Falsey)[]).filter(Boolean); // expect type (Fizz|Buzz)[]

([] as [Fizz|Falsey] | readonly [(Buzz|Falsey)?]).filter(Boolean); // expect type (Fizz|Buzz)[]

// confirm that the other filter signatures are still available and working

declare function isFizz(x: unknown): x is Fizz;
([] as (Fizz|Falsey)[] | (Buzz|Falsey)[]).filter(isFizz); // expect type Fizz[]

declare function isBuzz(x: unknown): x is Buzz;
([] as (Fizz|Falsey)[] | (Buzz|Falsey)[]).filter(isBuzz); // expect type Buzz[]

([] as (Fizz|Falsey)[] | (Buzz|Falsey)[]).filter(x => x && typeof x.member === "number"); // expect type (Fizz|Buzz|Falsey)[]
