//// [comma-sef-operand.ts]
declare const obj: any;
console.log(`${JSON.stringify(obj), undefined, 2}`);


//// [comma-sef-operand.js]
console.log("" + (JSON.stringify(obj), undefined, 2));
