//// [objectLiteralsAgainstUnionsOfArrays01.ts]
interface Foo {
  bar: Bar | Bar[];
}

interface Bar {
  prop: string;
}

let x: Foo[] = [
  { bar: { prop: 100 } }
]


//// [objectLiteralsAgainstUnionsOfArrays01.js]
var x = [
    { bar: { prop: 100 } }
];
