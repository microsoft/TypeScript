// none of these should work, since non are actually modules

var V = 12;

import v = V;

class C {
    name: string;
}

import c = C;

enum E {
    Red, Blue
}

import e = E;

interface I {
    id: number;
}

import i = I;
