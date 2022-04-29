//// [indexTypeCheck.ts]
interface Red {
	[n:number]; // ok
	[s:string]; // ok
}

interface Blue {
	[n:number]: any; // ok
	[s:string]: any; // ok
}

interface Yellow {
	[n:number]: Red; // ok
	[s:string]: Red; // ok
}

interface Orange {
	[n:number]: number; // ok
	[s:string]: string; // error
}

interface Green {
	[n:number]: Orange; // error
	[s:string]: Yellow; // ok
}

interface Cyan {
	[n:number]: number; // error
	[s:string]: string; // ok
}

interface Purple {
	[n:number, s:string]; // error
}

interface Magenta {
	[p:Purple]; // error
}

var yellow: Yellow;
var blue: Blue;
var s = "some string";

yellow[5]; // ok
yellow["hue"]; // ok
yellow[<any>{}]; // ok

s[0]; // error
s["s"]; // ok
s[<any>{}]; // ok

yellow[blue]; // error

var x:number[];
x[0];

class Benchmark {

    public results: { [x:string]: any; } = <{ [x:string]: any; }>{};

    public addTimingFor(name: string, timing: number) {
        this.results[name] = this.results[name];
    }
}

//// [indexTypeCheck.js]
var yellow;
var blue;
var s = "some string";
yellow[5]; // ok
yellow["hue"]; // ok
yellow[{}]; // ok
s[0]; // error
s["s"]; // ok
s[{}]; // ok
yellow[blue]; // error
var x;
x[0];
var Benchmark = /** @class */ (function () {
    function Benchmark() {
        this.results = {};
    }
    Benchmark.prototype.addTimingFor = function (name, timing) {
        this.results[name] = this.results[name];
    };
    return Benchmark;
}());
