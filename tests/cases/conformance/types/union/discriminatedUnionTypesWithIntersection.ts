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
