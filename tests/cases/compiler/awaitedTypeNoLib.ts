// @strictFunctionTypes: true
// @noLib: true

type NotPromise<T> = T extends Thenable<unknown>
  ? T
  : T extends PromiseLike<unknown>
  ? never
  : T;

type Receiver<T> = (value: NotPromise<T>) => void;

class Thenable<T> {
  then(a: Receiver<T>) {}

  private handleResolve<TResult>(
    result: NotPromise<TResult> | Thenable<NotPromise<TResult>>,
    resolve: Receiver<TResult>,
  ) {
    if (result instanceof Thenable) {
      //  #58547 This previously was a Debug Failure. False expression: type provided should not be a non-generic 'promise'-like.
      this.resolvePromise(result, resolve);
    }
  }

  private resolvePromise<TResult>(
    result: Thenable<TResult>,
    resolve: Receiver<TResult>,
  ) {}
}