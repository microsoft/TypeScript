let x: string | number | boolean;
let cond: boolean;

(x = "") || (x = 0);
x; // string | number

x = "";
cond || (x = 0);
x; // string | number

export interface NodeList {
    length: number;
}

export interface HTMLCollection {
    length: number;
}

declare function isNodeList(sourceObj: any): sourceObj is NodeList;
declare function isHTMLCollection(sourceObj: any): sourceObj is HTMLCollection;

type EventTargetLike = {a: string} | HTMLCollection | NodeList;

var sourceObj: EventTargetLike = <any>undefined;
if (isNodeList(sourceObj)) {
    sourceObj.length;
}

if (isHTMLCollection(sourceObj)) {
    sourceObj.length;
}

if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
    sourceObj.length;
}
