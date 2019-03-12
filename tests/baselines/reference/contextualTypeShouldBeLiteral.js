//// [contextualTypeShouldBeLiteral.ts]
interface X {
    type: 'x';
    value: string;
    method(): void;
}

interface Y {
    type: 'y';
    value: 'none' | 'done';
    method(): void;
}

function foo(bar: X | Y) { }

foo({
    type: 'y',
    value: 'done',
    method() {
        this;
        this.type;
        this.value;
    }
});

interface X2 {
    type1: 'x';
    value: string;
    method(): void;
}

interface Y2 {
    type2: 'y';
    value: 'none' | 'done';
    method(): void;
}

function foo2(bar: X2 | Y2) { }

foo2({
    type2: 'y',
    value: 'done',
    method() {
        this;
        this.value;
    }
});

interface X3 {
    type: 'x';
    value: 1 | 2 | 3;
    xtra: number;
}

interface Y3 {
    type: 'y';
    value: 11 | 12 | 13;
    ytra: number;
}

let xy: X3 | Y3 = {
    type: 'y',
    value: 11,
    ytra: 12
};

xy;


interface LikeA {
    x: 'x';
    y: 'y';
    value: string;
    method(): void;
}

interface LikeB {
    x: 'xx';
    y: 'yy';
    value: number;
    method(): void;
}

let xyz: LikeA | LikeB = {
    x: 'x',
    y: 'y',
    value: "foo",
    method() {
        this;
        this.x;
        this.y;
        this.value;
    }
};

xyz;

// Repro from #29168

interface TestObject {
  type?: 'object';
  items: {
    [k: string]: TestGeneric;
  };
}

interface TestString {
  type: 'string';
}

type TestGeneric = (TestString | TestObject) & { [k: string]: any; };

const test: TestGeneric = {
  items: {
    hello: { type: 'string' },
    world: {
      items: {
        nested: { type: 'string' }
      }
    }
  }
};


//// [contextualTypeShouldBeLiteral.js]
"use strict";
function foo(bar) { }
foo({
    type: 'y',
    value: 'done',
    method: function () {
        this;
        this.type;
        this.value;
    }
});
function foo2(bar) { }
foo2({
    type2: 'y',
    value: 'done',
    method: function () {
        this;
        this.value;
    }
});
var xy = {
    type: 'y',
    value: 11,
    ytra: 12
};
xy;
var xyz = {
    x: 'x',
    y: 'y',
    value: "foo",
    method: function () {
        this;
        this.x;
        this.y;
        this.value;
    }
};
xyz;
var test = {
    items: {
        hello: { type: 'string' },
        world: {
            items: {
                nested: { type: 'string' }
            }
        }
    }
};
