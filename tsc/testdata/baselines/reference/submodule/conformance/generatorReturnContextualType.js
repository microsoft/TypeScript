//// [tests/cases/conformance/generators/generatorReturnContextualType.ts] ////

//// [generatorReturnContextualType.ts]
// #35995

function* f1(): Generator<any, { x: 'x' }, any> {
  return { x: 'x' };
}

function* g1(): Iterator<any, { x: 'x' }, any> {
  return { x: 'x' };
}

async function* f2(): AsyncGenerator<any, { x: 'x' }, any> {
  return { x: 'x' };
}

async function* g2(): AsyncIterator<any, { x: 'x' }, any> {
  return { x: 'x' };
}

async function* f3(): AsyncGenerator<any, { x: 'x' }, any> {
  return Promise.resolve({ x: 'x' });
}

async function* g3(): AsyncIterator<any, { x: 'x' }, any> {
  return Promise.resolve({ x: 'x' });
}

async function* f4(): AsyncGenerator<any, { x: 'x' }, any> {
  const ret = { x: 'x' };
  return Promise.resolve(ret); // Error
}

async function* g4(): AsyncIterator<any, { x: 'x' }, any> {
  const ret = { x: 'x' };
  return Promise.resolve(ret); // Error
}


//// [generatorReturnContextualType.js]
"use strict";
// #35995
function* f1() {
    return { x: 'x' };
}
function* g1() {
    return { x: 'x' };
}
async function* f2() {
    return { x: 'x' };
}
async function* g2() {
    return { x: 'x' };
}
async function* f3() {
    return Promise.resolve({ x: 'x' });
}
async function* g3() {
    return Promise.resolve({ x: 'x' });
}
async function* f4() {
    const ret = { x: 'x' };
    return Promise.resolve(ret); // Error
}
async function* g4() {
    const ret = { x: 'x' };
    return Promise.resolve(ret); // Error
}
