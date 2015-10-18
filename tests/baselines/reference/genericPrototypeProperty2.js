//// [genericPrototypeProperty2.ts]
interface EventTarget { x } 
class BaseEvent {
    target: EventTarget;
}

class MyEvent<T extends EventTarget> extends BaseEvent {
    target: T;
}
class BaseEventWrapper {
    t: BaseEvent;
}

class MyEventWrapper extends BaseEventWrapper {
    t: MyEvent<any>; // any satisfies constraint and passes assignability check between 'target' properties
}

//// [genericPrototypeProperty2.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEvent = (function () {
    function BaseEvent() {
    }
    return BaseEvent;
})();
var MyEvent = (function (_super) {
    __extends(MyEvent, _super);
    function MyEvent() {
        _super.apply(this, arguments);
    }
    return MyEvent;
})(BaseEvent);
var BaseEventWrapper = (function () {
    function BaseEventWrapper() {
    }
    return BaseEventWrapper;
})();
var MyEventWrapper = (function (_super) {
    __extends(MyEventWrapper, _super);
    function MyEventWrapper() {
        _super.apply(this, arguments);
    }
    return MyEventWrapper;
})(BaseEventWrapper);
