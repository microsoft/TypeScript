/// <reference path='fourslash.ts' />

//// interface Shipment{
////     varchar: string,
////     numero: number,
////     falsch: boolean,
////     anything: any,
////     array: string[],
//// }
//// function foo(a: Shipment) {a;}
////
//// foo({});

verify.codeFix({
    description: "Implement interface 'Shipment'",
    newFileContent:
`interface Shipment{
    varchar: string,
    numero: number,
    falsch: boolean,
    anything: any,
    array: string[],
}
function foo(a: Shipment) {a;}

foo({
    varchar: "",
    numero: 0,
    falsch: false,
    anything: "any",
    array: [],
});`,
});
