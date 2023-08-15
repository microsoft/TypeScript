//// [tests/cases/compiler/intersectionSatisfiesConstraint.ts] ////

//// [intersectionSatisfiesConstraint.ts]
interface FirstInterface {
    commonProperty: number
}

interface SecondInterface {
    commonProperty: number
}

const myFirstFunction = <T extends FirstInterface | SecondInterface>(param1: T) => {
    const newParam: T & { otherProperty: number } = Object.assign(param1, { otherProperty: 3 })
    mySecondFunction(newParam)
}

const mySecondFunction = <T extends { commonProperty: number, otherProperty: number }>(newParam: T) => {
    return newParam
}


//// [intersectionSatisfiesConstraint.js]
"use strict";
var myFirstFunction = function (param1) {
    var newParam = Object.assign(param1, { otherProperty: 3 });
    mySecondFunction(newParam);
};
var mySecondFunction = function (newParam) {
    return newParam;
};
