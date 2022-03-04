//// [spreadIdenticalTypesRemoved.ts]
interface Animal {
    name: string;
    kind: string;
    age: number;
    location: string;
    owner: object;
}

function clonePet(pet: Animal, fullCopy?: boolean) {
    return {
        name: pet.name,
        kind: pet.kind,
        ...(fullCopy && pet),
    }
}

interface Animal2 {
    name: string;
    owner?: string;
}
function billOwner(pet: Animal2) {
    return {
        ...(pet.owner && pet),
        paid: false
    }
}


//// [spreadIdenticalTypesRemoved.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function clonePet(pet, fullCopy) {
    return __assign({ name: pet.name, kind: pet.kind }, (fullCopy && pet));
}
function billOwner(pet) {
    return __assign(__assign({}, (pet.owner && pet)), { paid: false });
}
