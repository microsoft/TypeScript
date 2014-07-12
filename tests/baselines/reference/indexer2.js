//// [indexer2.ts]
interface IHeapObjectProperty {}
interface IDirectChildrenMap { 
        hasOwnProperty(objectId: number) : boolean; 
        [objectId: number] : IHeapObjectProperty[]; 
}    
var directChildrenMap = <IDirectChildrenMap>{}; 

//// [indexer2.js]
var directChildrenMap = {};
