type Json =
  | string
  | number
  | boolean
  | null
  | { toJSON: () => string }
  | (self extends unknown[] ? Json[] : self extends (...a: never[]) => unknown ? never : { [_ in keyof self]: Json })
  | (self extends (...a: never[]) => unknown ? Never<`Type '${Print<self>}' is not assignable to type 'Json'`> : never)

interface Node {
  children: Node[]
  parent: Node
}
let someNode = {} as Node

let t1: Json = someNode // TODO: this should probably compile
let t3: Json = () => "hello"
let t4: Json = {
  x: () => "hello"
}
let t5: Json = {
  toJSON: () => "hello"
}
let t6: Json = new Map()
let t7: Json = ["hello", undefined]
let t8: Json = ["hello", null] as [string, null]

export {}
