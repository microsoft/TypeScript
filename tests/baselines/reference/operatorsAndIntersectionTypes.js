//// [tests/cases/conformance/types/intersection/operatorsAndIntersectionTypes.ts] ////

//// [operatorsAndIntersectionTypes.ts]
type Guid = string & { $Guid };          // Tagged string type
type SerialNo = number & { $SerialNo };  // Tagged number type

function createGuid() {
    return "21EC2020-3AEA-4069-A2DD-08002B30309D" as Guid;
}

function createSerialNo() {
    return 12345 as SerialNo;
}

let map1: { [x: string]: number } = {};
let guid = createGuid();
map1[guid] = 123;  // Can with tagged string

let map2: { [x: number]: string } = {};
let serialNo = createSerialNo();
map2[serialNo] = "hello";  // Can index with tagged number

const s1 = "{" + guid + "}";
const s2 = guid.toLowerCase();
const s3 = guid + guid;
const s4 = guid + serialNo;
const s5 = serialNo.toPrecision(0);
const n1 = serialNo * 3;
const n2 = serialNo + serialNo;
const b1 = guid === "";
const b2 = guid === guid;
const b3 = serialNo === 0;
const b4 = serialNo === serialNo;


//// [operatorsAndIntersectionTypes.js]
function createGuid() {
    return "21EC2020-3AEA-4069-A2DD-08002B30309D";
}
function createSerialNo() {
    return 12345;
}
var map1 = {};
var guid = createGuid();
map1[guid] = 123; // Can with tagged string
var map2 = {};
var serialNo = createSerialNo();
map2[serialNo] = "hello"; // Can index with tagged number
var s1 = "{" + guid + "}";
var s2 = guid.toLowerCase();
var s3 = guid + guid;
var s4 = guid + serialNo;
var s5 = serialNo.toPrecision(0);
var n1 = serialNo * 3;
var n2 = serialNo + serialNo;
var b1 = guid === "";
var b2 = guid === guid;
var b3 = serialNo === 0;
var b4 = serialNo === serialNo;
