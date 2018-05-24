//// [higherKindedTypes.ts]
interface Functor<A, Container<_T>> {
    map<B>(f: (a: A) => B): Container<B>;
}

interface FunctorX<A> extends Functor<A, FunctorX> {
    map<B>(f: (a: A) => B): FunctorX<B>;
    xVal: string;
}

interface FunctorY<A> extends Functor<A, FunctorY> {
    map<B>(f: (a: A) => B): FunctorY<B>;
    yVal: A;
}

declare const initialX: FunctorX<string>;
declare const initialY: FunctorY<string>;

const resultX1 = initialX.map(val => val.length);
const expectX1: FunctorX<number> = resultX1;

const resultY1 = initialY.map(val => val.length);
const expectY1: FunctorY<number> = resultY1;

const resultX2 = initialX.map(val => [val]);
const expectX2: FunctorX<string[]> = resultX2;

const resultY2 = initialY.map(val => [val]);
const expectY2: FunctorY<string[]> = resultY2;
    

function staticMap<F<_T> extends Functor<_T, F>, A, B>(fa: F<A>, f: (a: A) => B): F<B> {
    const result = fa.map(f);
    return result;
}

function staticMapBadImplementation<F<_T> extends Functor<_T, F>, A, B>(fa: F<A>, f: (a: A) => B): F<B> {
    return fa;
}

function staticMapNoConstraint<F<_T>, A, B>(fa: F<A>, f: (a: A) => B): F<B> {
    // expect error here since F has no constraint so we have no idea what shape it will be
    const result = fa.map(f);
    return result;
}

const resultX3 = staticMap(initialX, val => val.length);
const expectX3: FunctorX<number> = resultX3;

const resultY3 = staticMap(initialY, val => val.length);
const expectY3: FunctorY<number> = resultY3;

const resultX4 = staticMap(initialX, val => [val]);
const expectX4: FunctorX<string[]> = resultX4;

const resultY4 = staticMap(initialY, val => [val]);
const expectY4: FunctorY<string[]> = resultY4;


//// [higherKindedTypes.js]
"use strict";
var resultX1 = initialX.map(function (val) { return val.length; });
var expectX1 = resultX1;
var resultY1 = initialY.map(function (val) { return val.length; });
var expectY1 = resultY1;
var resultX2 = initialX.map(function (val) { return [val]; });
var expectX2 = resultX2;
var resultY2 = initialY.map(function (val) { return [val]; });
var expectY2 = resultY2;
function staticMap(fa, f) {
    var result = fa.map(f);
    return result;
}
function staticMapBadImplementation(fa, f) {
    return fa;
}
function staticMapNoConstraint(fa, f) {
    // expect error here since F has no constraint so we have no idea what shape it will be
    var result = fa.map(f);
    return result;
}
var resultX3 = staticMap(initialX, function (val) { return val.length; });
var expectX3 = resultX3;
var resultY3 = staticMap(initialY, function (val) { return val.length; });
var expectY3 = resultY3;
var resultX4 = staticMap(initialX, function (val) { return [val]; });
var expectX4 = resultX4;
var resultY4 = staticMap(initialY, function (val) { return [val]; });
var expectY4 = resultY4;
