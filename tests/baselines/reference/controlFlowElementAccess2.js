//// [tests/cases/conformance/controlFlow/controlFlowElementAccess2.ts] ////

//// [controlFlowElementAccess2.ts]
declare const config: {
    [key: string]: boolean | { prop: string };
};

if (typeof config['works'] !== 'boolean') {
    config.works.prop = 'test'; // ok
    config['works'].prop = 'test'; // error, config['works']: boolean | { 'prop': string }
}
if (typeof config.works !== 'boolean') {
    config['works'].prop = 'test'; // error, config['works']: boolean | { 'prop': string }
    config.works.prop = 'test'; // ok
}


//// [controlFlowElementAccess2.js]
"use strict";
if (typeof config['works'] !== 'boolean') {
    config.works.prop = 'test'; // ok
    config['works'].prop = 'test'; // error, config['works']: boolean | { 'prop': string }
}
if (typeof config.works !== 'boolean') {
    config['works'].prop = 'test'; // error, config['works']: boolean | { 'prop': string }
    config.works.prop = 'test'; // ok
}
