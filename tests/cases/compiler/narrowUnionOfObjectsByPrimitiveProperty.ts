// @strict: true

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
  nameState.state satisfies  State<string>;
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