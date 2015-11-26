// doc 4
// It is an error to explicitly declare a static property member with the name ‘prototype’.

struct C {
    prototype: number; // ok
    static prototype: C; // error
}