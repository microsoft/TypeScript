// @declaration: true

export class A<T = any> {
  public readonly ShadowedButDoesNotRequireRenaming = <T>(): T => {
      return null as any
  }
}

export function needsRenameForShadowing<T>() {
  type A = T
  return function O<T>(t: A, t2: T) {
  }
}
