// basic valid forms of function literals

var x = () => 1;
var x: {
    (): number;
}

var y: { (x: string): string; };
var y: (x: string) => string;
var y2: { <T>(x: T): T; } = <T>(x: T) => x

var z: { new (x: number): number; };
var z: new (x: number) => number;