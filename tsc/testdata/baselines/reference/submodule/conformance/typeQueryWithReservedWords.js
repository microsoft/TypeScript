//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeQueryWithReservedWords.ts] ////

//// [typeQueryWithReservedWords.ts]
class Controller {
    create() {
    }
    delete() {
    }
    var() {
    }
}

interface IScope {
    create: typeof Controller.prototype.create;  
    delete: typeof Controller.prototype.delete;  // Should not error
    var: typeof Controller.prototype.var;        // Should not error
}


//// [typeQueryWithReservedWords.js]
class Controller {
    create() {
    }
    delete() {
    }
    var() {
    }
}
