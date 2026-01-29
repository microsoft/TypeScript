//// [tests/cases/compiler/duplicateErrorNameNotFound.ts] ////

//// [duplicateErrorNameNotFound.ts]
type RoomInterfae = {};

export type {
    RoomInterface
}

//// [duplicateErrorNameNotFound.js]
export {};
