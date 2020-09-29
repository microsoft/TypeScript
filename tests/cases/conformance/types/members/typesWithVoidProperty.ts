// @strict: true
// @noEmit: true

interface X<T> {
    done: true;
    value: T;
}

interface Y<T> {
    done: true;
    value?: T;
}

declare let a: X<number>;
declare let b: X<void>;
declare let c: X<number | void>;
declare let d: Y<number>;

a = b; // not allowed because `value` must be `number`
a = c; // not allowed because `value` must be `number`
a = d; // not allowed because `value` must be `number`
a = { done: true }; // not allowed because `value` is not optional (non-`void`)
a = { done: true, value: 1 }; // allowed because `value` must be `number`
a = { done: true, value: undefined }; // not allowed because `value` must be `number`
a = { done: true, value: undefined as undefined }; // not allowed because `value` must be `number`
a = { done: true, value: undefined as void }; // not allowed because `value` must be `number`

b = a; // not allowed because `value` must be `void`
b = c; // not allowed because `value` must be `void`
b = d; // not allowed because `value` must be `void`
b = { done: true }; // allowed because `value` is optional due to `void`
b = { done: true, value: 1 }; // not allowed because `value` must be `void`
b = { done: true, value: undefined }; // allowed because `value` can be `undefined` (assignable to `void`)
b = { done: true, value: undefined as undefined }; // allowed because `value` can be `undefined` (assignable to `void`)
b = { done: true, value: undefined as void }; // allowed because `value` must be `void`

c = a; // allowed because `value` can be `number`
c = b; // allowed because `value` can be `void`
c = d; // allowed because `value` can be `undefined`
c = { done: true }; // allowed because `value` is optional due to `void`
c = { done: true, value: 1 }; // allowed because `value` can be `number`
c = { done: true, value: undefined }; // allowed because `value` can be `undefined` (assignable to `void`)
c = { done: true, value: undefined as undefined }; // allowed because `value` can be `undefined` (assignable to `void`)
c = { done: true, value: undefined as void }; // allowed because `value` can be `void`

d = a; // allowed because `value` must be `number | void`
d = b; // not allowed because `value` must be `undefined`, and `void` is a supertype of `undefined`
d = c; // not allowed allowed because `value` must be `undefined`, and `void` is a supertype of `undefined`
d = { done: true }; // allowed because `value` is optional
d = { done: true, value: 1 }; // allowed because `value` can be `number`
d = { done: true, value: undefined }; // allowed because `value` can be `undefined`
d = { done: true, value: undefined as undefined }; // allowed because `value` can be `undefined`
d = { done: true, value: undefined as void }; // not allowed because `value` can be `undefined`, and `void` is a supertype of `undefined
