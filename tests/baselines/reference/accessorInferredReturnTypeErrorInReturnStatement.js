//// [tests/cases/compiler/accessorInferredReturnTypeErrorInReturnStatement.ts] ////

//// [accessorInferredReturnTypeErrorInReturnStatement.ts]
export var basePrototype = {
  get primaryPath() {
    var _this = this;
    return _this.collection.schema.primaryPath;
  },  
};


//// [accessorInferredReturnTypeErrorInReturnStatement.js]
export var basePrototype = {
    get primaryPath() {
        var _this = this;
        return _this.collection.schema.primaryPath;
    },
};


//// [accessorInferredReturnTypeErrorInReturnStatement.d.ts]
export declare var basePrototype: {
    readonly primaryPath: any;
};
