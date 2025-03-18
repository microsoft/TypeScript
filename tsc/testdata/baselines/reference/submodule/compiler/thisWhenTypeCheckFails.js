//// [tests/cases/compiler/thisWhenTypeCheckFails.ts] ////

//// [thisWhenTypeCheckFails.ts]
class c {
    public n() {
        var k = () => {
            var s: string = this.n();
        }
    }    
}


//// [thisWhenTypeCheckFails.js]
class c {
    n() {
        var k = () => {
            var s = this.n();
        };
    }
}
