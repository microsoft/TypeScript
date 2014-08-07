interface A {
  (key:string):void;
}

interface B extends A {
  (key:'foo'):string;
}

var b:B;
// Should not error
b('foo').charAt(0);

interface A {
    (x: 'A1'): string;
    (x: string): void;
}

interface B extends A {
    (x: 'B1'): number;
}

interface A {
    (x: 'A2'): boolean;
}

interface B  {
    (x: 'B2'): string[];
}

var b: B;
// non of these lines should error
var x1: string[] = b('B2'); 
var x2: number = b('B1');
var x3: boolean = b('A2');
var x4: string = b('A1');
var x5: void = b('A0');