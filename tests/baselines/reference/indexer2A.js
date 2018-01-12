//// [indexer2A.ts]
class IHeapObjectProperty { }
class IDirectChildrenMap {
    // Decided to enforce a semicolon after declarations
    hasOwnProperty(objectId: number): boolean
    [objectId: number]: IHeapObjectProperty[]
}
var directChildrenMap = <IDirectChildrenMap>{}; 

//// [indexer2A.js]
var IHeapObjectProperty = /** @class */ (function () {
    function IHeapObjectProperty() {
    }
    return IHeapObjectProperty;
}());
var IDirectChildrenMap = /** @class */ (function () {
    function IDirectChildrenMap() {
    }
    return IDirectChildrenMap;
}());
var directChildrenMap = {};
