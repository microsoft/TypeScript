//// [tests/cases/compiler/typePredicatesOptionalChaining2.ts] ////

//// [typePredicatesOptionalChaining2.ts]
type Person = { name: string; }

const getName1 = (person?: Person): string => {
  return typeof person?.name === 'string' ? person?.name : '';
};

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const getName2 = (person?: Person): string => {
  return isString(person?.name) ? person?.name : '';
};


//// [typePredicatesOptionalChaining2.js]
"use strict";
var getName1 = function (person) {
    return typeof (person === null || person === void 0 ? void 0 : person.name) === 'string' ? person === null || person === void 0 ? void 0 : person.name : '';
};
var isString = function (value) {
    return typeof value === 'string';
};
var getName2 = function (person) {
    return isString(person === null || person === void 0 ? void 0 : person.name) ? person === null || person === void 0 ? void 0 : person.name : '';
};
