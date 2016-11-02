let x;
let ka;
let nested;
let other;
let rest;
let complex: { x: { ka, ki }, y: number };
({x: { ka, ...nested }, y: other, ...rest} = complex);
