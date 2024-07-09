//// [tests/cases/conformance/expressions/typeGuards/TypeGuardWithArrayUnion.ts] ////

//// [TypeGuardWithArrayUnion.ts]
class Message {
    value: string;
}

function saySize(message: Message | Message[]) {
    if (message instanceof Array) {
        return message.length;  // Should have type Message[] here
    }
}


//// [TypeGuardWithArrayUnion.js]
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
function saySize(message) {
    if (message instanceof Array) {
        return message.length; // Should have type Message[] here
    }
}
