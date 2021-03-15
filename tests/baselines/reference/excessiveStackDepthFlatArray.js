//// [excessiveStackDepthFlatArray.ts]
interface MiddlewareArray<T> extends Array<T> {}
declare function configureStore(options: { middleware: MiddlewareArray<any> }): void;

declare const defaultMiddleware: MiddlewareArray<any>;
configureStore({
  middleware: [...defaultMiddleware], // Should not error
});


//// [excessiveStackDepthFlatArray.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
configureStore({
    middleware: __spreadArray([], defaultMiddleware)
});
