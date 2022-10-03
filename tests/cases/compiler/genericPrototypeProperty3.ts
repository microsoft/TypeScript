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