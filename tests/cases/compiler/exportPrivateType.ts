module foo {
    class C1 {
        x: string;
        y: C1;
    }
 
    class C2 {
        test() { return true; }
    }
 
    interface I1 {
        (a: string, b: string): string;
        (x: number, y: number): I1;
    }
 
    interface I2 {
        x: string;
        y: number;
    }
 
    // None of the types are exported, so per section 10.3, should all be errors
    export var e: C1;
    export var f: I1;
    export var g: C2;
    export var h: I2;
}
 
var y = foo.g; // Exported variable 'y' has or is using private type 'foo.C2'.

