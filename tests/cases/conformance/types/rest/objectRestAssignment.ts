let ka: any;
let nested: { ki };
let other: number;
let rest: { };
let complex: { x: { ka, ki }, y: number };
({x: { ka, ...nested }, y: other, ...rest} = complex);
