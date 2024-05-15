//// [tests/cases/compiler/awaitedTypeNoLib.ts] ////

//// [awaitedTypeNoLib.ts]
type NotPromise<T> = T extends Thennable<unknown>
  ? T
  : T extends PromiseLike<unknown>
  ? never
  : T;

type Receiver<T> = (value: NotPromise<T>) => void;

class Thennable<T> {
  then(a: Receiver<T>) {}

  private handleResolve<TResult>(
    result: NotPromise<TResult> | Thennable<NotPromise<TResult>>,
    resolve: Receiver<TResult>,
  ) {
    if (result instanceof Thennable) {
      // Error: Debug Failure. False expression: type provided should not be a non-generic 'promise'-like.
      this.resolvePromise(result, resolve);
    }
  }

  private resolvePromise<TResult>(
    result: Thennable<TResult>,
    resolve: Receiver<TResult>,
  ) {}
}

//// [awaitedTypeNoLib.js]
var Thennable = /** @class */ (function () {
    function Thennable() {
    }
    Thennable.prototype.then = function (a) { };
    Thennable.prototype.handleResolve = function (result, resolve) {
        if (result instanceof Thennable) {
            // Error: Debug Failure. False expression: type provided should not be a non-generic 'promise'-like.
            this.resolvePromise(result, resolve);
        }
    };
    Thennable.prototype.resolvePromise = function (result, resolve) { };
    return Thennable;
}());
