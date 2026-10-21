// @strict: true
// @noEmit: true
// @module: commonjs
// @allowSyntheticDefaultImports: true

// @filename: stream.d.ts
export interface Stream {
    emit(event: string, data?: any): void;
}
export function through(write?: (this: Stream, data: any) => void, end?: (this: Stream) => void): Stream;

// @filename: main.ts
import stream from "./stream";
stream.through(function (data) {
    this.emit("data", data);
}, function () {
    this.emit("end");
});
