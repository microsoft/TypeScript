//// [tests/cases/compiler/spreadIdenticalTypesRemoved.ts] ////

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
function clonePet(pet, fullCopy) {
    return Object.assign({ name: pet.name, kind: pet.kind }, (fullCopy && pet));
}
function billOwner(pet) {
    return Object.assign(Object.assign({}, (pet.owner && pet)), { paid: false });
}
