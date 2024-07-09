//// [tests/cases/compiler/errorConstructorSubtypes.ts] ////

//// [errorConstructorSubtypes.ts]
// In Node, ErrorConstructor is augmented with extra properties. Excerpted below.
interface ErrorConstructor {
  captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
}

declare var x: ErrorConstructor
x = Error; // OK
x = RangeError;
new x().message
x.captureStackTrace


//// [errorConstructorSubtypes.js]
x = Error; // OK
x = RangeError;
new x().message;
x.captureStackTrace;
