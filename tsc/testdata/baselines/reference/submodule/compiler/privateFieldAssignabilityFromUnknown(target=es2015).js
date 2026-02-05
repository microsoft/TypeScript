//// [tests/cases/compiler/privateFieldAssignabilityFromUnknown.ts] ////

//// [privateFieldAssignabilityFromUnknown.ts]
export class Class {
  #field: any
}

const task: Class = {} as unknown;


//// [privateFieldAssignabilityFromUnknown.js]
export class Class {
    #field;
}
const task = {};
