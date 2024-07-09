// @noImplicitAny: true

// simple case
declare function simple(f: (a: number, b: number) => void): {}

simple((a: number, b) => {})
simple((a, b: number) => {})
