//// [discriminatedUnionTypesWithIntersection.ts]
type WithX = {
    x: string;
}

type BoxedValue = { kind: 'int',    num: number }
                | { kind: 'string', str: string }

type BoxIntersection = BoxedValue & WithX

type BoxInline = { kind: 'int',    num: number } & WithX
               | { kind: 'string', str: string } & WithX

function getValueAsString_inline_if(value: BoxInline): string {
    if (value.kind === 'int') {
        value; // { kind: "int", num: number } & { x: string }
        return '' + value.num;
    }

    value; // { kind: "string", str: string } & { x: string }
    return value.str;
}

function getValueAsString_inline_switch(value: BoxInline): string {
    switch (value.kind) {
        case 'int':
            value; // { kind: "int", num: number } & { x: string }
            return '' + value.num;

        case 'string':
            value; // { kind: "string", str: string } & { x: string }
            return value.str;
    }
}

function getValueAsString_if(value: BoxIntersection): string {
    if (value.kind === 'int') {
        value; // { kind: "int", num: number } & { x: string }
        return '' + value.num;
    }

    value; // { kind: "string", str: string } & { x: string }
    return value.str;
}

function getValueAsString_switch(value: BoxIntersection): string {
    switch (value.kind) {
        case 'int':
            value; // { kind: "int", num: number } & { x: string }
            return '' + value.num;

        case 'string':
            value; // { kind: "string", str: string } & { x: string }
            return value.str;
    }
}

function getValueAsString_if_fixed(value: BoxIntersection & { kind: 'int' }): string {
    if (value.kind === 'int') {
        value; // { kind: "int", num: number } & { x: string } & { kind: "number" }
        return '' + value.num;
    }

    value; // never
    return value.str;
}

function getValueAsString_switch_fixed(value: BoxIntersection & { kind: 'int' }): string {
    switch (value.kind) {
        case 'int':
            value; // { kind: "int", num: number } & { x: string } & { kind: "number" }
            return '' + value.num;

        case 'string':
            value; // never
            return value.str;
    }
}

function getValueAsString_if_never(value: BoxIntersection & { kind: number }): string {
    if (value.kind === 'int') {
        value; // never
        return '' + value.num;
    }

    value; // { kind: "string", str: string } & { x: string } & { kind: "number" }
    return value.str;
}

function getValueAsString_switch_never(value: BoxIntersection & { kind: number }): string {
    switch (value.kind) {
        case 'int':
            value; // never
            return '' + value.num;

        case 'string':
            value; // never
            return value.str;
    }
}

type Ext = { strVal: string } & { kind:    'int' }
         | { intVal: string } & { kind: 'string' }

type Boxed2 = { kind: 'null' }
            | BoxIntersection & Ext;

function arbitraryNesting_if(value: Boxed2): void {
    if (value.kind === 'null') {
        return;
    }

    if (value.kind === 'int') {
        value; // { kind: 'int', num: number } & { x: string; }
        value.x;
        value.num;
        value.strVal;
        return;
    }

    value; // { kind: 'string', str: string } & { x: string } & { intVal: string } & { kind: 'string' }
    value.x;
    value.str;
    value.intVal;
}

function arbitraryNesting_switch(value: Boxed2): void {
    switch (value.kind) {
        case 'null':
            return;

        case 'int':
            value.x;
            value.num;
            value.strVal;
            return;

        case 'string':
            value.x;
            value.str;
            value.intVal;
    }
}


//// [discriminatedUnionTypesWithIntersection.js]
function getValueAsString_inline_if(value) {
    if (value.kind === 'int') {
        value; // { kind: "int", num: number } & { x: string }
        return '' + value.num;
    }
    value; // { kind: "string", str: string } & { x: string }
    return value.str;
}
function getValueAsString_inline_switch(value) {
    switch (value.kind) {
        case 'int':
            value; // { kind: "int", num: number } & { x: string }
            return '' + value.num;
        case 'string':
            value; // { kind: "string", str: string } & { x: string }
            return value.str;
    }
}
function getValueAsString_if(value) {
    if (value.kind === 'int') {
        value; // { kind: "int", num: number } & { x: string }
        return '' + value.num;
    }
    value; // { kind: "string", str: string } & { x: string }
    return value.str;
}
function getValueAsString_switch(value) {
    switch (value.kind) {
        case 'int':
            value; // { kind: "int", num: number } & { x: string }
            return '' + value.num;
        case 'string':
            value; // { kind: "string", str: string } & { x: string }
            return value.str;
    }
}
function getValueAsString_if_fixed(value) {
    if (value.kind === 'int') {
        value; // { kind: "int", num: number } & { x: string } & { kind: "number" }
        return '' + value.num;
    }
    value; // never
    return value.str;
}
function getValueAsString_switch_fixed(value) {
    switch (value.kind) {
        case 'int':
            value; // { kind: "int", num: number } & { x: string } & { kind: "number" }
            return '' + value.num;
        case 'string':
            value; // never
            return value.str;
    }
}
function getValueAsString_if_never(value) {
    if (value.kind === 'int') {
        value; // never
        return '' + value.num;
    }
    value; // { kind: "string", str: string } & { x: string } & { kind: "number" }
    return value.str;
}
function getValueAsString_switch_never(value) {
    switch (value.kind) {
        case 'int':
            value; // never
            return '' + value.num;
        case 'string':
            value; // never
            return value.str;
    }
}
function arbitraryNesting_if(value) {
    if (value.kind === 'null') {
        return;
    }
    if (value.kind === 'int') {
        value; // { kind: 'int', num: number } & { x: string; }
        value.x;
        value.num;
        value.strVal;
        return;
    }
    value; // { kind: 'string', str: string } & { x: string } & { intVal: string } & { kind: 'string' }
    value.x;
    value.str;
    value.intVal;
}
function arbitraryNesting_switch(value) {
    switch (value.kind) {
        case 'null':
            return;
        case 'int':
            value.x;
            value.num;
            value.strVal;
            return;
        case 'string':
            value.x;
            value.str;
            value.intVal;
    }
}
