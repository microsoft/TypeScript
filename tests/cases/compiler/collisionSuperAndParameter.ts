// @target: es5
class Foo {
    a() {
        var lamda = (_super: number) => { // No Error 
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    b(_super: number) { // No Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    set c(_super: number) { // No error
    }
}
class Foo2 extends Foo {
    x() {
        var lamda = (_super: number) => { // Error 
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    y(_super: number) { // Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    set z(_super: number) { // Error
    }
    public prop3: {
        doStuff: (_super: number) => void; // no error - no code gen
    }
    public prop4 = {
        doStuff: (_super: number) => { // should be error
        }
    }
    constructor(_super: number) { // should be error
        super();
    }
}
declare class Foo3 extends Foo {
    x();
    y(_super: number); // No error - no code gen
    constructor(_super: number); // No error - no code gen
    public prop2: {
        doStuff: (_super: number) => void; // no error - no code gen
    };
    public _super: number; // No error
}

class Foo4 extends Foo {
    constructor(_super: number); // no code gen - no error
    constructor(_super: string);// no code gen - no error
    constructor(_super: any) { // should be error
        super();
    }
    y(_super: number); // no code gen - no error
    y(_super: string); // no code gen - no error
    y(_super: any) { // Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}