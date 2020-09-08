//// [selfReferencingTypeReferenceInference.ts]
interface Box<T> {
    __: T
}

type Recursive<T> =
    | T
    | Box<Recursive<T>>

type InferRecursive<T> = T extends Recursive<infer R> ? R : "never!"

// the type we are testing with
type t1 = Box<string | Box<number | boolean>>

type t2 = InferRecursive<t1>
type t3 = InferRecursive<Box<string | Box<number | boolean>>> // write t1 explicitly

  // Why is t2 and t3 different??
  // They have same input type!

//// [selfReferencingTypeReferenceInference.js]
// Why is t2 and t3 different??
// They have same input type!
