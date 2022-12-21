// @strict: true

function foo (id: string) {
  return {
      a: 1,
      b: "",
      c: true
  }[id]
}

function bar (id: 'a' | 'b') {
  return {
      a: 1,
      b: "",
      c: false
  }[id]
}

function baz (id: '1' | '2') {
  return {
      1: 1,
      2: "",
      3: false
  }[id]
}

function qux (id: 1 | 2) {
  return {
      1: 1,
      2: "",
      3: false
  }[id]
}

function quux (id: 'a' | 'b' | 'z') {
  return {
      a: 1,
      b: "",
      c: false
  }[id]
}

function corge(id: string) {
  return ({
      a: 123,
      b: ""
  } as Record<string, number | string>)[id]
}

function grault(id: string) {
  return ({
      a: 123,
      b: ""
  } as { [k: string]: string | number})[id]
}
