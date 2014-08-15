//// [genericInference2.ts]
    declare module ko { 
       export interface Observable<T> { 
           (): T; 
           (value: T): any; 
           N: number; 
           g: boolean; 
           r: T; 
       } 
       export function observable<T>(value: T): Observable<T>; 
    } 
    var o = { 
       name: ko.observable("Bob"), 
       age: ko.observable(37) 
    }; 
    var x_v = o.name().length;  // should be 'number'
    var age_v = o.age();  // should be 'number'
    var name_v = o.name("Robert");  // should be 'any'
    var zz_v = o.name.N;  // should be 'number'
    var yy_v = o.name.g;  // should be 'boolean'
    var rr_v = o.name.r;  // should be 'string'

//// [genericInference2.js]
var o = {
    name: ko.observable("Bob"),
    age: ko.observable(37)
};
var x_v = o.name().length; // should be 'number'
var age_v = o.age(); // should be 'number'
var name_v = o.name("Robert"); // should be 'any'
var zz_v = o.name.N; // should be 'number'
var yy_v = o.name.g; // should be 'boolean'
var rr_v = o.name.r; // should be 'string'
