//// [higherKindedTypesLift.ts]
declare function stringLength(strarg: string): number;

export interface Functor<AF, Container<_TF>> {
    map<BF>(f: (a: AF) => BF): Container<BF>;
}

export interface DiffFunctor<DA, DContainer<_TD>> {
    diffMap<DB>(df: (da: DA) => DB): DContainer<DB>;
}

class FunctorX<AX> implements Functor<AX, FunctorX> {
    constructor(private elements: AX[]) {}
    map<BX>(f: (a: AX) => BX): FunctorX<BX> {
        const mappedElements = this.elements.map(f);
        return new FunctorX(mappedElements);
    }

    firstVal(): AX | undefined {
        return this.elements.length ? this.elements[0] : undefined;
    };
}

const functorXString = new FunctorX(["myFunctorX"]);

declare class DiffFunctorY<AY> implements DiffFunctor<AY, DiffFunctorY> {

    diffMap<BY>(f: (a: AY) => BY): DiffFunctorY<BY>

    firstValY(): AY | undefined
}

declare const diffFunctorYString: DiffFunctorY<string>;

declare class InvalidFunctor<IA> {
    // does not actually implement Functor because it doesn't return InvalidFunctor<IB>
    map<IB>(fi: (ia: IA) => IB): IB
}
declare const invalidFunctor: InvalidFunctor<string>;

declare class InvalidFunctor2<IA2> {
    // does not actually implement Functor because it doesn't return InvalidFunctor2<IB>
    map<IB2>(fi2: (ia2: IA2) => IB2): FunctorX<IB2>

    someUniqueMethod(): IA2
}
declare const invalidFunctor2: InvalidFunctor2<string>;

interface StaticFunctor<CS<_TS>> {
    <AS, BS>(csas: CS<AS>, fmapstatic: (as: AS) => BS): CS<BS>;
}

interface LiftedResult<LRC<_LT>> {
    <LRA, LRB>(lrmap: (lra: LRA) => LRB): <NC<_NT> extends LRC<_NT>>(lrclra: NC<LRA>) => NC<LRB>
}

interface LiftedResult3A<LRC<_LT>> {
    <LRA, LRB>(lrmap: (lra: LRA) => LRB): LiftedResult3B<LRC, LRA, LRB>
}
interface LiftedResult3B<LRC<_LT>, LRA, LRB> {
    <NC<_NT> extends LRC<_NT>>(lrclra: NC<LRA>): NC<LRB>
}

function lift1<C<_TL>>(fToLift: StaticFunctor<C>): LiftedResult<C> {
    return lmap => lca => fToLift(lca, lmap);
}

// lift2 does not use intermediate interfaces
function lift2<C<_TL>>(
    fToLift: <AS, BS>(csas: C<AS>, fmapstatic: (as: AS) => BS) => C<BS>
): 
    <LA, LB>(lrmap: (lra: LA) => LB) => <NC<_NT> extends C<_NT>>(lrclra: NC<LA>) => NC<LB> {
    return lmap => lca => fToLift(lca, lmap);
}

// lift3 uses an extra intermediate interface
function lift3<C<_TL>>(fToLift: StaticFunctor<C>): LiftedResult3A<C> {
    return lmap => lca => fToLift(lca, lmap);
}

function staticMap<C1<_T1> extends Functor<_T1, C1>, A1, B1>(fa1: C1<A1>, fmap1: (a1: A1) => B1): C1<B1> {
    return fa1.map(fmap1);
}

const liftedFunctor1 = lift1(staticMap);
const liftedFunctor2 = lift2(staticMap);
const liftedFunctor3 = lift3(staticMap);

const liftedStringLength1 = liftedFunctor1(stringLength);
const liftedStringLength2 = liftedFunctor2(stringLength);
const liftedStringLength3 = liftedFunctor3(stringLength);


const result1 = liftedStringLength1(functorXString);
const expectedType1: FunctorX<number> = result1;
const result2 = liftedStringLength2(functorXString);
const expectedType2: FunctorX<number> = result2;
const result3 = liftedStringLength3(functorXString);
const expectedType3: FunctorX<number> = result3;

const expectErrorA1 = liftedStringLength1(result1);
const expectErrorA2 = liftedStringLength2(result2);
const expectErrorA3 = liftedStringLength3(result3);


const stringArray = ["not explicitly declared to implement functor"];
const arrayResult1 = liftedStringLength1(stringArray);
const arrayExpectedType1: Array<number> = arrayResult1;
const arrayResult2 = liftedStringLength2(stringArray);
const arrayExpectedType2: Array<number> = arrayResult2;
const arrayResult3 = liftedStringLength3(stringArray);
const arrayExpectedType3: Array<number> = arrayResult3;

const arrayExpectErrorA1 = liftedStringLength1(arrayResult1);
const arrayExpectErrorA2 = liftedStringLength2(arrayResult2);
const arrayExpectErrorA3 = liftedStringLength3(arrayResult3);



// should have error because DiffFunctorY has diffMap function, not "map" as needed because liftedFunctor was created from staticMap which declared Functor
const expectErrorB1 = liftedStringLength1(diffFunctorYString);
const expectErrorB2 = liftedStringLength2(diffFunctorYString);
const expectErrorB3 = liftedStringLength3(diffFunctorYString);


const expectErrorC1 = liftedStringLength1(invalidFunctor);
const expectErrorC2 = liftedStringLength2(invalidFunctor);
const expectErrorC3 = liftedStringLength3(invalidFunctor);


const expectErrorD1 = liftedStringLength1(invalidFunctor2);
const expectErrorD2 = liftedStringLength2(invalidFunctor2);
const expectErrorD3 = liftedStringLength3(invalidFunctor2);


//// [higherKindedTypesLift.js]
"use strict";
exports.__esModule = true;
var FunctorX = /** @class */ (function () {
    function FunctorX(elements) {
        this.elements = elements;
    }
    FunctorX.prototype.map = function (f) {
        var mappedElements = this.elements.map(f);
        return new FunctorX(mappedElements);
    };
    FunctorX.prototype.firstVal = function () {
        return this.elements.length ? this.elements[0] : undefined;
    };
    ;
    return FunctorX;
}());
var functorXString = new FunctorX(["myFunctorX"]);
function lift1(fToLift) {
    return function (lmap) { return function (lca) { return fToLift(lca, lmap); }; };
}
// lift2 does not use intermediate interfaces
function lift2(fToLift) {
    return function (lmap) { return function (lca) { return fToLift(lca, lmap); }; };
}
// lift3 uses an extra intermediate interface
function lift3(fToLift) {
    return function (lmap) { return function (lca) { return fToLift(lca, lmap); }; };
}
function staticMap(fa1, fmap1) {
    return fa1.map(fmap1);
}
var liftedFunctor1 = lift1(staticMap);
var liftedFunctor2 = lift2(staticMap);
var liftedFunctor3 = lift3(staticMap);
var liftedStringLength1 = liftedFunctor1(stringLength);
var liftedStringLength2 = liftedFunctor2(stringLength);
var liftedStringLength3 = liftedFunctor3(stringLength);
var result1 = liftedStringLength1(functorXString);
var expectedType1 = result1;
var result2 = liftedStringLength2(functorXString);
var expectedType2 = result2;
var result3 = liftedStringLength3(functorXString);
var expectedType3 = result3;
var expectErrorA1 = liftedStringLength1(result1);
var expectErrorA2 = liftedStringLength2(result2);
var expectErrorA3 = liftedStringLength3(result3);
var stringArray = ["not explicitly declared to implement functor"];
var arrayResult1 = liftedStringLength1(stringArray);
var arrayExpectedType1 = arrayResult1;
var arrayResult2 = liftedStringLength2(stringArray);
var arrayExpectedType2 = arrayResult2;
var arrayResult3 = liftedStringLength3(stringArray);
var arrayExpectedType3 = arrayResult3;
var arrayExpectErrorA1 = liftedStringLength1(arrayResult1);
var arrayExpectErrorA2 = liftedStringLength2(arrayResult2);
var arrayExpectErrorA3 = liftedStringLength3(arrayResult3);
// should have error because DiffFunctorY has diffMap function, not "map" as needed because liftedFunctor was created from staticMap which declared Functor
var expectErrorB1 = liftedStringLength1(diffFunctorYString);
var expectErrorB2 = liftedStringLength2(diffFunctorYString);
var expectErrorB3 = liftedStringLength3(diffFunctorYString);
var expectErrorC1 = liftedStringLength1(invalidFunctor);
var expectErrorC2 = liftedStringLength2(invalidFunctor);
var expectErrorC3 = liftedStringLength3(invalidFunctor);
var expectErrorD1 = liftedStringLength1(invalidFunctor2);
var expectErrorD2 = liftedStringLength2(invalidFunctor2);
var expectErrorD3 = liftedStringLength3(invalidFunctor2);
