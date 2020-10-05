// @strict: true
// @noUncheckedIndexedAccess: true

declare const strArray: string[];
declare const strStrTuple: [string, string];

// Declaration forms for array destructuring

// Destructuring from a simple array -> include undefined
const [s1] = strArray;
s1.toString(); // Should error, s1 possibly undefined

// Destructuring a rest element -> do not include undefined
const [...s2] = strArray;
s2.push(undefined); // Should error, 'undefined' not part of s2's element type

// Destructuring a rest element -> do not include undefined
const [, , ...s3] = strArray;
s3.push(undefined); // Should error, 'undefined' not part of s2's element type

// Declaration forms for object destructuring

declare const strMap: { [s: string]: string };

const { t1 } = strMap;
t1.toString(); // Should error, t1 possibly undefined

const { ...t2 } = strMap;
t2.z.toString(); // Should error

// Test intersections with declared properties
declare const numMapPoint: { x: number, y: number} & { [s: string]: number };
{
    const { x, y, z } = numMapPoint;
    x.toFixed(); // Should OK
    y.toFixed(); // Should OK
    z.toFixed(); // Should error
}

{
    const { x, ...q } = numMapPoint;
    x.toFixed(); // Should OK
    q.y.toFixed(); // Should OK
    q.z.toFixed(); // Should error
}


declare let target_string: string;
declare let target_string_undef: string | undefined;
declare let target_string_arr: string[];

// Assignment forms
[target_string] = strArray; // Should error
[target_string_undef] = strArray;  // Should OK
[,,, ...target_string_arr] = strArray; // Should OK

{
    let x: number, y: number, z: number | undefined;
    ({ x, y, z } = numMapPoint); // Should OK

    let q: number;
    ({ q } = numMapPoint); // Should error
}
