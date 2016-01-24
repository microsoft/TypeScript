//// [declFileGenericType2.ts]

declare module templa.mvc {
    interface IModel {
    }
}
declare module templa.mvc {
    interface IController<ModelType extends templa.mvc.IModel> {
    }
}
declare module templa.mvc {
    class AbstractController<ModelType extends templa.mvc.IModel> implements mvc.IController<ModelType> {
    }
}
declare module templa.mvc.composite {
    interface ICompositeControllerModel extends mvc.IModel {
        getControllers(): mvc.IController<mvc.IModel>[];
    }
}
module templa.dom.mvc {
    export interface IElementController<ModelType extends templa.mvc.IModel> extends templa.mvc.IController<ModelType> {
    }
}
// Module
module templa.dom.mvc {

    export class AbstractElementController<ModelType extends templa.mvc.IModel> extends templa.mvc.AbstractController<ModelType> implements IElementController<ModelType> {
        constructor() {
            super();
        }
    }
}
// Module
module templa.dom.mvc.composite {
    export class AbstractCompositeElementController<ModelType extends templa.mvc.composite.ICompositeControllerModel> extends templa.dom.mvc.AbstractElementController<ModelType> {
        public _controllers: templa.mvc.IController<templa.mvc.IModel>[];
        constructor() {
            super();
            this._controllers = [];
        }
    }
}


//// [declFileGenericType2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Module
var templa;
(function (templa) {
    var dom;
    (function (dom) {
        var mvc;
        (function (mvc) {
            var AbstractElementController = (function (_super) {
                __extends(AbstractElementController, _super);
                function AbstractElementController() {
                    _super.call(this);
                }
                return AbstractElementController;
            }(templa.mvc.AbstractController));
            mvc.AbstractElementController = AbstractElementController;
        })(mvc = dom.mvc || (dom.mvc = {}));
    })(dom = templa.dom || (templa.dom = {}));
})(templa || (templa = {}));
// Module
var templa;
(function (templa) {
    var dom;
    (function (dom) {
        var mvc;
        (function (mvc) {
            var composite;
            (function (composite) {
                var AbstractCompositeElementController = (function (_super) {
                    __extends(AbstractCompositeElementController, _super);
                    function AbstractCompositeElementController() {
                        _super.call(this);
                        this._controllers = [];
                    }
                    return AbstractCompositeElementController;
                }(templa.dom.mvc.AbstractElementController));
                composite.AbstractCompositeElementController = AbstractCompositeElementController;
            })(composite = mvc.composite || (mvc.composite = {}));
        })(mvc = dom.mvc || (dom.mvc = {}));
    })(dom = templa.dom || (templa.dom = {}));
})(templa || (templa = {}));


//// [declFileGenericType2.d.ts]
declare module templa.mvc {
    interface IModel {
    }
}
declare module templa.mvc {
    interface IController<ModelType extends templa.mvc.IModel> {
    }
}
declare module templa.mvc {
    class AbstractController<ModelType extends templa.mvc.IModel> implements mvc.IController<ModelType> {
    }
}
declare module templa.mvc.composite {
    interface ICompositeControllerModel extends mvc.IModel {
        getControllers(): mvc.IController<mvc.IModel>[];
    }
}
declare module templa.dom.mvc {
    interface IElementController<ModelType extends templa.mvc.IModel> extends templa.mvc.IController<ModelType> {
    }
}
declare module templa.dom.mvc {
    class AbstractElementController<ModelType extends templa.mvc.IModel> extends templa.mvc.AbstractController<ModelType> implements IElementController<ModelType> {
        constructor();
    }
}
declare module templa.dom.mvc.composite {
    class AbstractCompositeElementController<ModelType extends templa.mvc.composite.ICompositeControllerModel> extends templa.dom.mvc.AbstractElementController<ModelType> {
        _controllers: templa.mvc.IController<templa.mvc.IModel>[];
        constructor();
    }
}
