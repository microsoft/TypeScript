// @declaration: true

function wrapper<T>(value: T) {
  return {
      m() { return value; },
      get g() { return value; },
  }
}

export const w = wrapper(0)
