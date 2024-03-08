// @noEmit: true
// @lib: esnext

// repro #49646

type EnvFunction = <T>() => T;

type SimpleType = string | Promise<SimpleType>;

declare const simple: SimpleType;

const env: EnvFunction = () => simple;

// repro #49723

type T1 = 1 | Promise<T1> | T1[];

export async function myFunction(param: T1) {
  const awaited = await param
}

// repro #42948

type EffectResult =
  | (() => EffectResult)
  | Promise<EffectResult>;

export async function handleEffectResult(result: EffectResult) {
  if (result instanceof Function) {
    await handleEffectResult(result());
  } else if (result instanceof Promise) {
    await handleEffectResult(await result);
  }
}
