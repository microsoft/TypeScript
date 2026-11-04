// @strict: true
// @lib: es2024, dom
// @noEmit: true

declare const socket: WebSocket;
declare const bytes: Uint8Array;
socket.send(bytes);
socket.send(new Uint8Array(8));
