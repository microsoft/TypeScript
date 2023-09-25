// @strict: true
// @exactOptionalPropertyTypes: true, false
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55532#issuecomment-1694744665

type PromiseOrValue<T> = Promise<T> | T;

function mapAsyncIterable<T, U, R = undefined>(
  iterable: AsyncGenerator<T, R, void> | AsyncIterable<T>,
  callback: (value: T) => PromiseOrValue<U>,
): AsyncGenerator<U, R, void> {
  const iterator = iterable[Symbol.asyncIterator]();

  async function mapResult(
    result: IteratorResult<T, R>,
  ): Promise<IteratorResult<U, R>> {
    if (result.done) {
      return result;
    }

    try {
      return { value: await callback(result.value), done: false };
    } catch (error) {
      if (typeof iterator.return === "function") {
        try {
          await iterator.return();
        } catch (_e) {}
      }
      throw error;
    }
  }

  return {
    async next() {
      return mapResult(await iterator.next());
    },
    async return(): Promise<IteratorResult<U, R>> {
      return typeof iterator.return === "function"
        ? mapResult(await iterator.return())
        : { value: undefined as any, done: true };
    },
    async throw(error?: unknown) {
      if (typeof iterator.throw === "function") {
        return mapResult(await iterator.throw(error));
      }
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

const items = [1, 2, 3];

const iterable = {
  [Symbol.asyncIterator]() {
    return this;
  },
  next() {
    const value = items[0];
    items.shift();
    return Promise.resolve({
      done: items.length === 0,
      value,
    });
  },
};

const doubles = mapAsyncIterable(iterable, (x) => x + x);
