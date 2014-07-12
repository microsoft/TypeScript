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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var templa;
(function (templa) {
    (function (dom) {
        // Module
        (function (mvc) {
            var AbstractElementController = (function (_super) {
                __extends(AbstractElementController, _super);
                function AbstractElementController() {
                    _super.call(this);
                }
                return AbstractElementController;
            })(templa.mvc.AbstractController);
            mvc.AbstractElementController = AbstractElementController;
        })(dom.mvc || (dom.mvc = {}));
        var mvc = dom.mvc;
    })(templa.dom || (templa.dom = {}));
    var dom = templa.dom;
})(templa || (templa = {}));

var templa;
(function (templa) {
    (function (dom) {
        (function (mvc) {
            // Module
            (function (composite) {
                var AbstractCompositeElementController = (function (_super) {
                    __extends(AbstractCompositeElementController, _super);
                    function AbstractCompositeElementController() {
                        _super.call(this);
                        this._controllers = [];
                    }
                    return AbstractCompositeElementController;
                })(templa.dom.mvc.AbstractElementController);
                composite.AbstractCompositeElementController = AbstractCompositeElementController;
            })(mvc.composite || (mvc.composite = {}));
            var composite = mvc.composite;
        })(dom.mvc || (dom.mvc = {}));
        var mvc = dom.mvc;
    })(templa.dom || (templa.dom = {}));
    var dom = templa.dom;
})(templa || (templa = {}));


////[declFileGenericType2.d.ts]
declare module templa.mvc {
    interface IModel {
    }
}
declare module templa.mvc {
    interface IController<ModelType extends IModel> {
    }
}
declare module templa.mvc {
    class AbstractController<ModelType extends IModel> implements IController<ModelType> {
    }
}
declare module templa.mvc.composite {
    interface ICompositeControllerModel extends IModel {
        getControllers(): IController<IModel>[];
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
    class AbstractCompositeElementController<ModelType extends templa.mvc.composite.ICompositeControllerModel> extends AbstractElementController<ModelType> {
        public _controllers: templa.mvc.IController<templa.mvc.IModel>[];
        constructor();
    }
}
