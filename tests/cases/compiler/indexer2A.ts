class IHeapObjectProperty { }
class IDirectChildrenMap {
    // Decided to enforce a semicolon after declarations
    hasOwnProperty(objectId: number): boolean
    [objectId: number]: IHeapObjectProperty[]
}
var directChildrenMap = <IDirectChildrenMap>{}; 