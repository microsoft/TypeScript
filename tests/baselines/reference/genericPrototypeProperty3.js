//// [tests/cases/compiler/genericPrototypeProperty3.ts] ////

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
class BaseEvent {
}
class MyEvent extends BaseEvent {
}
class BaseEventWrapper {
}
class MyEventWrapper extends BaseEventWrapper {
}
