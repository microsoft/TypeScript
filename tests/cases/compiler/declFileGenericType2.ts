// @declaration: true

declare namespace templa.mvc {
    interface IModel {
    }
}
declare namespace templa.mvc {
    interface IController<ModelType extends templa.mvc.IModel> {
    }
}
declare namespace templa.mvc {
    class AbstractController<ModelType extends templa.mvc.IModel> implements mvc.IController<ModelType> {
    }
}
declare namespace templa.mvc.composite {
    interface ICompositeControllerModel extends mvc.IModel {
        getControllers(): mvc.IController<mvc.IModel>[];
    }
}
namespace templa.dom.mvc {
    export interface IElementController<ModelType extends templa.mvc.IModel> extends templa.mvc.IController<ModelType> {
    }
}
// Module
namespace templa.dom.mvc {

    export class AbstractElementController<ModelType extends templa.mvc.IModel> extends templa.mvc.AbstractController<ModelType> implements IElementController<ModelType> {
        constructor() {
            super();
        }
    }
}
// Module
namespace templa.dom.mvc.composite {
    export class AbstractCompositeElementController<ModelType extends templa.mvc.composite.ICompositeControllerModel> extends templa.dom.mvc.AbstractElementController<ModelType> {
        public _controllers: templa.mvc.IController<templa.mvc.IModel>[];
        constructor() {
            super();
            this._controllers = [];
        }
    }
}
