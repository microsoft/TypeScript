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

declare const x: [string, number] | [number, string];
if (typeof x[0] === "string") {
  x[1] satisfies number;
} else {
  x[1] satisfies string;
}
