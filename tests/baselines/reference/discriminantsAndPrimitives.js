//// [discriminantsAndPrimitives.ts]

// Repro from #10257 plus other tests

interface Foo {
    kind: "foo";
    name: string;
}

interface Bar {
    kind: "bar";
    length: string;
}

function f1(x: Foo | Bar | string) {
    if (typeof x !== 'string') {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

function f2(x: Foo | Bar | string | undefined) {
    if (typeof x === "object") {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

function f3(x: Foo | Bar | string | null) {
    if (x && typeof x !== "string") {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

function f4(x: Foo | Bar | string | number | null) {
    if (x && typeof x === "object") {
        switch(x.kind) {
            case 'foo':
                x.name;
        }
    }
}

//// [discriminantsAndPrimitives.js]
// Repro from #10257 plus other tests
function f1(x) {
    if (typeof x !== 'string') {
        switch (x.kind) {
            case 'foo':
                x.name;
        }
    }
}
function f2(x) {
    if (typeof x === "object") {
        switch (x.kind) {
            case 'foo':
                x.name;
        }
    }
}
function f3(x) {
    if (x && typeof x !== "string") {
        switch (x.kind) {
            case 'foo':
                x.name;
        }
    }
}
function f4(x) {
    if (x && typeof x === "object") {
        switch (x.kind) {
            case 'foo':
                x.name;
        }
    }
}
