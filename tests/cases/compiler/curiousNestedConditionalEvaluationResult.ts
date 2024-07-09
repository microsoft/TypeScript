// regression test for #43123
type Hmm = [0] extends [infer T, any?] ?
    [T, [0] extends [T] ? true : false]
    : never