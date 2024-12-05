//// [tests/cases/compiler/000.ts] ////

//// [000.ts]
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
}

//// [000.js]
var nameState = {};
if (typeof nameState.value === "string") {
    nameState.state;
}
