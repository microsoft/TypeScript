//// [externModule.ts]
declare module {
    export class XDate {
		public getDay():number;
		public getXDate():number;
		// etc.

	    // Called as a function
	    // Not supported anymore? public (): string;
	    
	    // Called as a constructor
	    constructor(year: number, month: number);
	    constructor(year: number, month: number, date: number);
	    constructor(year: number, month: number, date: number, hours: number);
	    constructor(year: number, month: number, date: number, hours: number, minutes: number);
	    constructor(year: number, month: number, date: number, hours: number, minutes: number, seconds: number);
	    constructor(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, ms: number);
	    constructor(value: number);
	    constructor();
	    
	    static parse(string: string): number;
	    static UTC(year: number, month: number): number;
	    static UTC(year: number, month: number, date: number): number;
	    static UTC(year: number, month: number, date: number, hours: number): number;
	    static UTC(year: number, month: number, date: number, hours: number, minutes: number): number;
	    static UTC(year: number, month: number, date: number, hours: number, minutes: number, seconds: number): number;
	    static UTC(year: number, month: number, date: number, hours: number, minutes: number, seconds: number,
		         ms: number): number;
	    static now(): number;
    }
}

var d=new XDate();
d.getDay();
d=new XDate(1978,2);
d.getXDate();
var n=XDate.parse("3/2/2004");
n=XDate.UTC(1964,2,1);



//// [externModule.js]
declare;
module;
{
    var XDate = (function () {
        function XDate() {
        }
        return XDate;
    }());
    export { XDate };
}
var d = new XDate();
d.getDay();
d = new XDate(1978, 2);
d.getXDate();
var n = XDate.parse("3/2/2004");
n = XDate.UTC(1964, 2, 1);
