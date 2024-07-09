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
