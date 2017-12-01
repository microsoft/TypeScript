===ORIGINAL===

import {
    x0,
    x // this is x
} from "bar"
===MODIFIED===

import {
    x0,
    x, // this is x
    b as a
} from "bar"