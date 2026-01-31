// @target: es2015
function test(p: any) {
    'use strict';
    'use strong';
    p = { prop: p } = p;
}