function f1<T extends number>(arg: T) {
  return { ...arg };
}

function f2<T extends string[]>(arg: T) {
  return { ...arg }
}

function f3<T extends number | string[]>(arg: T) {
  return { ...arg }
}

function f4<T extends number | { [key: string]: any }>(arg: T) {
  return { ...arg }
}

function f5<T extends string[] | { [key: string]: any }>(arg: T) {
  return { ...arg }
}

function f6<T>(arg: T) {
  return { ...arg }
}

