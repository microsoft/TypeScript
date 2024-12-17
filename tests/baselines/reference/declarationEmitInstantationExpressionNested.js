//// [tests/cases/compiler/declarationEmitInstantationExpressionNested.ts] ////

//// [declarationEmitInstantationExpressionNested.ts]
function outerFnExpression<K>(n: K) {
    return function <T>(a: [T, K]): a is [T, K] {
        return null!
    }
}

export let nrFnFromFnExpression = outerFnExpression(1)<number>


function outerArrowFn<K>(n: K) {
    return function <T>(a: [T, K]): a is [T, K] {
        return null!
    }
}

export let nrFnFromArrowFn = outerArrowFn(1)<number>

function outerObjectMethod<K>(n: K) {
    return {
        inner<T>(a: [T, K]): a is [T, K] {
            return null!
        }
    }
}

export let nrFnFromObjectMethod = outerObjectMethod(1).inner<number>


function outerStaticClassMember<K>(n: K) {
    return class {
        static inner<T>(a: [T, K]): a is [T, K] {
            return null!
        }
    }
}

export let nrFnFromStaticClassMember = outerStaticClassMember(1).inner<number>


function outerClassMethod<K>(n: K) {
    return class {
        inner<T>(a: [T, K]): a is [T, K] {
            return null!
        }
    }
}

export let nrFnFromClassMethod = new (outerClassMethod(1))().inner<number>

function outerMethodSignature<K>(n: K) : {
    inner<T>(a: [T, K]): a is [T, K]
} {
    return null!
}

export let nrFnFromMethodSignature = outerMethodSignature(1).inner<number>



function outerFnSignature<K>(n: K) : {
    <T>(a: [T, K]): a is [T, K]
} {
    return null!
}

export let nrFnFromFnSignature = outerFnSignature(1)<number>



function outerFnType<K>(n: K) : <T>(a: [T, K]) => a is [T, K] {
    return null!
}

export let nrFnFromFnType = outerFnType(1)<number>

//// [declarationEmitInstantationExpressionNested.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nrFnFromFnType = exports.nrFnFromFnSignature = exports.nrFnFromMethodSignature = exports.nrFnFromClassMethod = exports.nrFnFromStaticClassMember = exports.nrFnFromObjectMethod = exports.nrFnFromArrowFn = exports.nrFnFromFnExpression = void 0;
function outerFnExpression(n) {
    return function (a) {
        return null;
    };
}
exports.nrFnFromFnExpression = (outerFnExpression(1));
function outerArrowFn(n) {
    return function (a) {
        return null;
    };
}
exports.nrFnFromArrowFn = (outerArrowFn(1));
function outerObjectMethod(n) {
    return {
        inner: function (a) {
            return null;
        }
    };
}
exports.nrFnFromObjectMethod = (outerObjectMethod(1).inner);
function outerStaticClassMember(n) {
    return /** @class */ (function () {
        function class_1() {
        }
        class_1.inner = function (a) {
            return null;
        };
        return class_1;
    }());
}
exports.nrFnFromStaticClassMember = (outerStaticClassMember(1).inner);
function outerClassMethod(n) {
    return /** @class */ (function () {
        function class_2() {
        }
        class_2.prototype.inner = function (a) {
            return null;
        };
        return class_2;
    }());
}
exports.nrFnFromClassMethod = (new (outerClassMethod(1))().inner);
function outerMethodSignature(n) {
    return null;
}
exports.nrFnFromMethodSignature = (outerMethodSignature(1).inner);
function outerFnSignature(n) {
    return null;
}
exports.nrFnFromFnSignature = (outerFnSignature(1));
function outerFnType(n) {
    return null;
}
exports.nrFnFromFnType = (outerFnType(1));


//// [declarationEmitInstantationExpressionNested.d.ts]
export declare let nrFnFromFnExpression: (a: [number, number]) => a is [number, number];
export declare let nrFnFromArrowFn: (a: [number, number]) => a is [number, number];
export declare let nrFnFromObjectMethod: (a: [number, number]) => a is [number, number];
export declare let nrFnFromStaticClassMember: (a: [number, number]) => a is [number, number];
export declare let nrFnFromClassMethod: (a: [number, number]) => a is [number, number];
export declare let nrFnFromMethodSignature: (a: [number, number]) => a is [number, number];
export declare let nrFnFromFnSignature: (a: [number, number]) => a is [number, number];
export declare let nrFnFromFnType: (a: [number, number]) => a is [number, number];
