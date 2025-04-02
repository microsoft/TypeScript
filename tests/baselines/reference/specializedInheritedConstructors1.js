//// [tests/cases/compiler/specializedInheritedConstructors1.ts] ////

//// [specializedInheritedConstructors1.ts]
interface ViewOptions<TModel> {
    model: TModel;
}

class View<TModel> {
    constructor(options: ViewOptions<TModel>) { }
    model: TModel;
}

class Model { }
class MyView extends View<Model> { }

var m: ViewOptions<Model> = { model: new Model() };
var aView = new View({ model: new Model() }); 
var aView2 = new View(m); 
var myView = new MyView(m); // was error


//// [specializedInheritedConstructors1.js]
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
var View = /** @class */ (function () {
    function View(options) {
    }
    return View;
}());
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
var MyView = /** @class */ (function (_super) {
    __extends(MyView, _super);
    function MyView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyView;
}(View));
var m = { model: new Model() };
var aView = new View({ model: new Model() });
var aView2 = new View(m);
var myView = new MyView(m); // was error
