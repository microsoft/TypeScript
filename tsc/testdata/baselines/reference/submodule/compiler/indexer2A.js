//// [tests/cases/compiler/indexer2A.ts] ////

//// [indexer2A.ts]
class IHeapObjectProperty { }
class IDirectChildrenMap {
    // Decided to enforce a semicolon after declarations
    hasOwnProperty(objectId: number): boolean
    [objectId: number]: IHeapObjectProperty[]
}
var directChildrenMap = <IDirectChildrenMap>{}; 

//// [indexer2A.js]
class IHeapObjectProperty {
}
class IDirectChildrenMap {
}
var directChildrenMap = {};
