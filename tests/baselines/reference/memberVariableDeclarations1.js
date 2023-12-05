//// [tests/cases/compiler/memberVariableDeclarations1.ts] ////

//// [memberVariableDeclarations1.ts]
// from spec

class Employee {
    public name: string;
    public address: string;
    public retired = false;
    public manager: Employee = null;
    public reports: Employee[] = [];
}

class Employee2 {
    public name: string;
    public address: string;
    public retired: boolean;
    public manager: Employee;
    public reports: Employee[];
    constructor() {
        this.retired = false;
        this.manager = null;
        this.reports = [];
    }
}

var e1: Employee;
var e2: Employee2;
e1 = e2;
e2 = e1;

//// [memberVariableDeclarations1.js]
// from spec
var Employee = /** @class */ (function () {
    function Employee() {
        this.retired = false;
        this.manager = null;
        this.reports = [];
    }
    return Employee;
}());
var Employee2 = /** @class */ (function () {
    function Employee2() {
        this.retired = false;
        this.manager = null;
        this.reports = [];
    }
    return Employee2;
}());
var e1;
var e2;
e1 = e2;
e2 = e1;
