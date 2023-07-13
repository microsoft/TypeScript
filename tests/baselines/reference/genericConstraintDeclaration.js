//// [tests/cases/compiler/genericConstraintDeclaration.ts] ////

//// [genericConstraintDeclaration.ts]
class List<T extends {}>{
    static empty<T extends {}>(): List<T>{return null;}
}






//// [genericConstraintDeclaration.js]
var List = /** @class */ (function () {
    function List() {
    }
    List.empty = function () { return null; };
    return List;
}());


//// [genericConstraintDeclaration.d.ts]
declare class List<T extends {}> {
    static empty<T extends {}>(): List<T>;
}
