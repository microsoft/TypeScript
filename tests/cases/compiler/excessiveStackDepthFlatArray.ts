// @lib: es2019

interface MiddlewareArray<T> extends Array<T> {}
declare function configureStore(options: { middleware: MiddlewareArray<any> }): void;

declare const defaultMiddleware: MiddlewareArray<any>;
configureStore({
  middleware: [...defaultMiddleware], // Should not error
});
