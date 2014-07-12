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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
