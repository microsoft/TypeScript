//// [doNotWidenAtObjectLiteralPropertyAssignment.ts]
interface ITestEventInterval {
    begin: number;
}

interface IIntervalTreeNode {
    interval: ITestEventInterval;
    children?: IIntervalTreeNode[];
}

var test: IIntervalTreeNode[] = [{ interval: { begin: 0 }, children: null }]; // was error here because best common type is {}


//// [doNotWidenAtObjectLiteralPropertyAssignment.js]
var test = [{ interval: { begin: 0 }, children: null }]; // was error here because best common type is {}
