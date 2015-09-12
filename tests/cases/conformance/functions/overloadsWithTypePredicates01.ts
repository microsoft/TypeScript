// @declaration: true

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
