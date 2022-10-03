//// [contextualSignatureInstantiation4.ts]
// Repros from #32976

declare class Banana<T extends string> { constructor(a: string, property: T) }

declare function fruitFactory1<TFruit>(Fruit: new (...args: any[]) => TFruit): TFruit
const banana1 = fruitFactory1(Banana) // Banana<any>

declare function fruitFactory2<TFruit>(Fruit: new (a: string, ...args: any[]) => TFruit): TFruit
const banana2 = fruitFactory2(Banana) // Banana<any>

declare function fruitFactory3<TFruit>(Fruit: new (a: string, s: "foo", ...args: any[]) => TFruit): TFruit
const banana3 = fruitFactory3(Banana) // Banana<"foo">

declare function fruitFactory4<TFruit>(Fruit: new (a: string, ...args: "foo"[]) => TFruit): TFruit
const banana4 = fruitFactory4(Banana) // Banana<"foo">

declare function fruitFactory5<TFruit>(Fruit: new (...args: "foo"[]) => TFruit): TFruit
const banana5 = fruitFactory5(Banana) // Banana<"foo">


//// [contextualSignatureInstantiation4.js]
"use strict";
// Repros from #32976
var banana1 = fruitFactory1(Banana); // Banana<any>
var banana2 = fruitFactory2(Banana); // Banana<any>
var banana3 = fruitFactory3(Banana); // Banana<"foo">
var banana4 = fruitFactory4(Banana); // Banana<"foo">
var banana5 = fruitFactory5(Banana); // Banana<"foo">
