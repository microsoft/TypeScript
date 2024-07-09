class C1 {
	constructor(public p1:string); // ERROR
	constructor(private p2:number); // ERROR
	constructor(public p3:any) {} // OK
}

declare class C2 {
	constructor(public p1:string); // ERROR
	constructor(private p2:number); // ERROR
	constructor(public p3:any); // ERROR
}