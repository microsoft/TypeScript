//// [overloadsWithTypePredicates01.ts]

/**
 * A makeshift string enum.
 */
namespace EventType {
    export type Click = string & { _fooTag: any };
    export const Click = <Click>"Click";

    export type KeyDown = string & { _barTag: any };
    export const KeyDown = <KeyDown>"KeyDown";
}

/**
 * The all-encompassing type for our makeshift enum.
 */
type EventType = EventType.Click
               | EventType.KeyDown;


interface BaseEvent {
    type: EventType;
}

interface ClickEvent extends BaseEvent {
    type: EventType.Click;
    x: number;
    y: number;
}

interface KeyDownEvent extends BaseEvent {
    type: EventType.KeyDown;
    keyCode: number;
}

function isActionType(action: BaseEvent, type: EventType.Click): action is ClickEvent;
function isActionType(action: BaseEvent, type: EventType.KeyDown): action is KeyDownEvent;
function isActionType(action: BaseEvent, type: EventType): action is BaseEvent;
function isActionType(action: BaseEvent, type: EventType) {
    return action.type === type;
}

let handleAction = (action: BaseEvent) => {
    if (isActionType(action, EventType.Click)) {
        let foo = action.x;
        let bar = action.y;
    }

    if (isActionType(action, EventType.KeyDown)) {
        let bar = action.keyCode;
    }
}


//// [overloadsWithTypePredicates01.js]
/**
 * A makeshift string enum.
 */
var EventType;
(function (EventType) {
    EventType.Click = "Click";
    EventType.KeyDown = "KeyDown";
})(EventType || (EventType = {}));
function isActionType(action, type) {
    return action.type === type;
}
var handleAction = function (action) {
    if (isActionType(action, EventType.Click)) {
        var foo = action.x;
        var bar = action.y;
    }
    if (isActionType(action, EventType.KeyDown)) {
        var bar = action.keyCode;
    }
};


//// [overloadsWithTypePredicates01.d.ts]
/**
 * A makeshift string enum.
 */
declare namespace EventType {
    type Click = string & {
        _fooTag: any;
    };
    const Click: string & {
        _fooTag: any;
    };
    type KeyDown = string & {
        _barTag: any;
    };
    const KeyDown: string & {
        _barTag: any;
    };
}
/**
 * The all-encompassing type for our makeshift enum.
 */
declare type EventType = EventType.Click | EventType.KeyDown;
interface BaseEvent {
    type: EventType;
}
interface ClickEvent extends BaseEvent {
    type: EventType.Click;
    x: number;
    y: number;
}
interface KeyDownEvent extends BaseEvent {
    type: EventType.KeyDown;
    keyCode: number;
}
declare function isActionType(action: BaseEvent, type: EventType.Click): action is ClickEvent;
declare function isActionType(action: BaseEvent, type: EventType.KeyDown): action is KeyDownEvent;
declare function isActionType(action: BaseEvent, type: EventType): action is BaseEvent;
declare let handleAction: (action: BaseEvent) => void;
