//// [tests/cases/compiler/typePredicatesOptionalChaining3.ts] ////

//// [typePredicatesOptionalChaining3.ts]
interface Animal {
  breed?: Breed;
}
interface Breed {
  size?: string;
}

declare function isNil(value: unknown): value is undefined | null;

function getBreedSizeWithoutFunction(animal: Animal): string | undefined {
  if (animal?.breed?.size != null) {
    return animal.breed.size;
  } else {
    return undefined;
  }
}

function getBreedSizeWithFunction(animal: Animal): string | undefined {
  if (!isNil(animal?.breed?.size)) {
    return animal.breed.size;
  } else {
    return undefined;
  }
}


//// [typePredicatesOptionalChaining3.js]
"use strict";
function getBreedSizeWithoutFunction(animal) {
    var _a;
    if (((_a = animal === null || animal === void 0 ? void 0 : animal.breed) === null || _a === void 0 ? void 0 : _a.size) != null) {
        return animal.breed.size;
    }
    else {
        return undefined;
    }
}
function getBreedSizeWithFunction(animal) {
    var _a;
    if (!isNil((_a = animal === null || animal === void 0 ? void 0 : animal.breed) === null || _a === void 0 ? void 0 : _a.size)) {
        return animal.breed.size;
    }
    else {
        return undefined;
    }
}
