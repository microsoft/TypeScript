// @module: system

export let [x,y,z] = [1, 2, 3];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}