//// [tests/cases/compiler/conditionalTypeExtendsNewline.ts] ////

//// [conditionalTypeExtendsNewline.ts]
// Repro from #53589

type Example1 = string 
     extends string ? true : false;

type Example2 = `${string
     extends string ? true : false}`;

type Example3 = Array<string
     extends string ? true : false>;

type Example4<K extends string
     extends string ? true : false> = string;

type Example5<K = string
     extends string ? true : false> = string;

function example6(a: string
     extends string ? true : false): void {};

type Example7 = {
  foo: string
     extends string ? true : false;
};

type Example8 = {
     [Key in string as Key 
          extends string ? 'true' : 'false']: string;
};

class Example9 {
  a?: number
  extends = null;
}

type Example10Interface = {
  extends: number | undefined;
}

class Example10 implements Example10Interface {
  a?: number
  extends;
}


//// [conditionalTypeExtendsNewline.js]
// Repro from #53589
function example6(a) { }
;
var Example9 = /** @class */ (function () {
    function Example9() {
        this.extends = null;
    }
    return Example9;
}());
var Example10 = /** @class */ (function () {
    function Example10() {
    }
    return Example10;
}());
