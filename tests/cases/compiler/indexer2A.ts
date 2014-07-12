class IHeapObjectProperty {}
class IDirectChildrenMap { 
        // BUG 765883
        hasOwnProperty(objectId: number) : boolean
        [objectId: number] : IHeapObjectProperty[] 
}    
var directChildrenMap = <IDirectChildrenMap>{}; 