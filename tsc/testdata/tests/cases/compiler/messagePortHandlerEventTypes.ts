// @strict: true
// @lib: es5,dom
// @noEmit: true

declare const port: MessagePort;
port.onmessage = event => {
    event.data;
};
port.onmessageerror = event => {
    event.data;
};
