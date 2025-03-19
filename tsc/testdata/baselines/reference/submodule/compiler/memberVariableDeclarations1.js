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
class Employee {
    name;
    address;
    retired = false;
    manager = null;
    reports = [];
}
class Employee2 {
    name;
    address;
    retired;
    manager;
    reports;
    constructor() {
        this.retired = false;
        this.manager = null;
        this.reports = [];
    }
}
var e1;
var e2;
e1 = e2;
e2 = e1;
