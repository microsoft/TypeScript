//// [tests/cases/compiler/genericPrototypeProperty2.ts] ////

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
class BaseEvent {
    target;
}
class MyEvent extends BaseEvent {
    target;
}
class BaseEventWrapper {
    t;
}
class MyEventWrapper extends BaseEventWrapper {
    t; // any satisfies constraint and passes assignability check between 'target' properties
}
