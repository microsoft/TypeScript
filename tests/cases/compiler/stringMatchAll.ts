// @target: es2020

const matches = "matchAll".matchAll(/\w/g);
const array = [...matches];
const { index, input } = array[0];
