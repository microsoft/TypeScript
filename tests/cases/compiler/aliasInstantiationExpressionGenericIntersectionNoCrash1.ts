// @strict: true

class ErrImpl<E> {
  e!: E;
}

declare const Err: typeof ErrImpl & (<T>() => T);

type ErrAlias<U> = typeof Err<U>;

declare const e: ErrAlias<number>;
e as ErrAlias<string>;
