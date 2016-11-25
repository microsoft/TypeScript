//// [genericPrototypeProperty3.ts]
class BaseEvent {
    target: {};
}

class MyEvent<T> extends BaseEvent { // T is instantiated to any in the prototype, which is assignable to {}
    target: T;
}
class BaseEventWrapper {
    t: BaseEvent;
}

class MyEventWrapper extends BaseEventWrapper {
    t: MyEvent<any>;
}

//// [genericPrototypeProperty3.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEvent = (function () {
    function BaseEvent() {
    }
    return BaseEvent;
}());
var MyEvent = (function (_super) {
    __extends(MyEvent, _super);
    function MyEvent() {
        return _super.apply(this, arguments) || this;
    }
    return MyEvent;
}(BaseEvent));
var BaseEventWrapper = (function () {
    function BaseEventWrapper() {
    }
    return BaseEventWrapper;
}());
var MyEventWrapper = (function (_super) {
    __extends(MyEventWrapper, _super);
    function MyEventWrapper() {
        return _super.apply(this, arguments) || this;
    }
    return MyEventWrapper;
}(BaseEventWrapper));
