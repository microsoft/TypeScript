//// [keyofGenericExtendingClassDoubleLayer.ts]
class Model<Attributes = any> {
    public createdAt: Date;
}

type ModelAttributes<T> = Omit<T, keyof Model>;

class AutoModel<T> extends Model<ModelAttributes<T>> {}

class PersonModel extends AutoModel<PersonModel> {
    public age: number;

    toJson() {
        let x: keyof this = 'createdAt';
    }
}


//// [keyofGenericExtendingClassDoubleLayer.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
var AutoModel = /** @class */ (function (_super) {
    __extends(AutoModel, _super);
    function AutoModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AutoModel;
}(Model));
var PersonModel = /** @class */ (function (_super) {
    __extends(PersonModel, _super);
    function PersonModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonModel.prototype.toJson = function () {
        var x = 'createdAt';
    };
    return PersonModel;
}(AutoModel));
