//// [noConstraintInReturnType1.ts]
class List<T extends {}> {
    static empty<T extends {}>(): List<T> { return null; }
}


//// [noConstraintInReturnType1.js]
var List = /** @class */ (function () {
    function List() {
    }
    List.empty = function () { return null; };
    return List;
}());


//// [noConstraintInReturnType1.d.ts]
declare class List<T extends {}> {
    static empty<T extends {}>(): List<T>;
}
