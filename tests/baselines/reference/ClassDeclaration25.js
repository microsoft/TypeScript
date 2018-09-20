//// [ClassDeclaration25.ts]
interface IList<T> {
    data(): T;
    next(): string;
}
class List<U> implements IList<U> {
    data(): U;
    next(): string;
}


//// [ClassDeclaration25.js]
var List = /** @class */ (function () {
    function List() {
    }
    return List;
}());
