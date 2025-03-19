//// [tests/cases/compiler/declFileGenericType2.ts] ////

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
// Module
var templa;
(function (templa) {
    let dom;
    (function (dom) {
        let mvc;
        (function (mvc) {
            class AbstractElementController extends templa.mvc.AbstractController {
                constructor() {
                    super();
                }
            }
            mvc.AbstractElementController = AbstractElementController;
        })(mvc = dom.mvc || (dom.mvc = {}));
    })(dom = templa.dom || (templa.dom = {}));
})(templa || (templa = {}));
// Module
(function (templa) {
    let dom;
    (function (dom) {
        let mvc;
        (function (mvc) {
            let composite;
            (function (composite) {
                class AbstractCompositeElementController extends templa.dom.mvc.AbstractElementController {
                    _controllers;
                    constructor() {
                        super();
                        this._controllers = [];
                    }
                }
                composite.AbstractCompositeElementController = AbstractCompositeElementController;
            })(composite = mvc.composite || (mvc.composite = {}));
        })(mvc = dom.mvc || (dom.mvc = {}));
    })(dom = templa.dom || (templa.dom = {}));
})(templa || (templa = {}));
