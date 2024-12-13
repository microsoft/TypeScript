//// [tests/cases/compiler/narrowUnionOfObjectsByPrimitiveProperty.ts] ////

//// [narrowUnionOfObjectsByPrimitiveProperty.ts]
export {}

interface State<Type> {
  state: Type;
}

interface UserName {
  first: string;
  last?: string;
}

const nameState = {} as {
  value: string;
  state: State<string>;
} | {
  value: UserName;
  state: State<UserName>;
}

if (typeof nameState.value === "string") {
  nameState.state satisfies State<string>;
} else {
  nameState.state satisfies State<UserName>;
}


declare const arr: [string, number] | [number, string];
if (typeof arr[0] === "string") {
  arr[1] satisfies number;
} else {
  arr[1] satisfies string;
}


function aStringOrANumber<T extends { a: string } | { a: number }>(param: T): T extends { a: string } ? string : T extends { a: number } ? number : never {
  if (typeof param.a === "string") {
    return param.a.repeat(3);
  }
  if (typeof param.a === "number") {
    return Math.exp(param.a);
  }
  throw new Error()
}

aStringOrANumber({ a: "string" })
aStringOrANumber({ a: 42 })


// The following two tests ensure that the discriminativeness of property 'prop'
// is treated differently in assignability and narrowing, and that the discriminativeness is properly cached.
declare let obj: { prop: string, other: string } | { prop: number, other: number }

// Here, we first perform narrowing, but the subsequent assignability should not be affected.
// We expect an error there because of an incorrect value assigned to 'prop'.
// See contextualTypeWithUnionTypeObjectLiteral.ts
if(typeof obj.prop === "string") {
  obj.other.repeat(3);
} else {
  Math.exp(obj.other);
}

obj = { prop: Math.random() > 0.5 ? "whatever" : 42, other: "irrelevant" as never }


declare let obj2: { prop: string, other: string } | { prop: number, other: number }

// Here, we first assign a value to 'obj2' and then perform narrowing.
// We expect an error here because of an incorrect value assigned to 'prop', like above,
// but the subsequent narrowing should not be affected by the assignability.
obj2 = { prop: Math.random() > 0.5 ? "whatever" : 42, other: "irrelevant" as never }

if(typeof obj2.prop === "string") {
  obj2.other.repeat(3);
} else {
  Math.exp(obj2.other);
}


interface ILocalizedString {
    original: string;
    value: string;
}

type Opt = ({
    label: ILocalizedString;
    alias?: string;
} | {
    label: string;
    alias: string;
})

declare const opt: Opt

if (typeof opt.label === 'string') {
    const l = opt.label;
    const a = opt.alias ?? opt.label;
} else {
    const l = opt.label;
    const a = opt.alias ?? opt.label.original;
}

//// [narrowUnionOfObjectsByPrimitiveProperty.js]
const nameState = {};
if (typeof nameState.value === "string") {
    nameState.state;
}
else {
    nameState.state;
}
if (typeof arr[0] === "string") {
    arr[1];
}
else {
    arr[1];
}
function aStringOrANumber(param) {
    if (typeof param.a === "string") {
        return param.a.repeat(3);
    }
    if (typeof param.a === "number") {
        return Math.exp(param.a);
    }
    throw new Error();
}
aStringOrANumber({ a: "string" });
aStringOrANumber({ a: 42 });
// Here, we first perform narrowing, but the subsequent assignability should not be affected.
// We expect an error there because of an incorrect value assigned to 'prop'.
// See contextualTypeWithUnionTypeObjectLiteral.ts
if (typeof obj.prop === "string") {
    obj.other.repeat(3);
}
else {
    Math.exp(obj.other);
}
obj = { prop: Math.random() > 0.5 ? "whatever" : 42, other: "irrelevant" };
// Here, we first assign a value to 'obj2' and then perform narrowing.
// We expect an error here because of an incorrect value assigned to 'prop', like above,
// but the subsequent narrowing should not be affected by the assignability.
obj2 = { prop: Math.random() > 0.5 ? "whatever" : 42, other: "irrelevant" };
if (typeof obj2.prop === "string") {
    obj2.other.repeat(3);
}
else {
    Math.exp(obj2.other);
}
if (typeof opt.label === 'string') {
    const l = opt.label;
    const a = opt.alias ?? opt.label;
}
else {
    const l = opt.label;
    const a = opt.alias ?? opt.label.original;
}
export {};
