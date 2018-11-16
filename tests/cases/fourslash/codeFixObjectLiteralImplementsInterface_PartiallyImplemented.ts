/// <reference path='fourslash.ts' />

//// interface Shipment{
////     varchar: string,
////     numero: number,
////     falsch: boolean,
////     anything: any,
////     array: string[],
//// }
////
//// let PartialShipment: Shipment = {
////     varchar: "",
////     anything: "any",
//// }

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

let PartialShipment: Shipment = {
    numero: 0,
    falsch: false,
    array: [],
    varchar: "",
    anything: "any",
}`,
});