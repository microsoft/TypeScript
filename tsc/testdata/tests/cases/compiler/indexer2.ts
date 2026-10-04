// @target: es2015
interface IHeapObjectProperty {}
interface IDirectChildrenMap { 
        hasOwnProperty(objectId: number) : boolean; 
        [objectId: number] : IHeapObjectProperty[]; 
}    
var directChildrenMap = <IDirectChildrenMap>{}; 