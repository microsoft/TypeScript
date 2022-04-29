===ORIGINAL===

import {
    x // this is x
} from "bar"
===MODIFIED===

import {
    x, // this is x
    b as a
} from "bar"