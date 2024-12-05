interface State<Type> {
  state: Type;
}

interface UserName {
  first: string;
  last?: string;
}

// Can't union narrow of string | object:

const nameState1 = {} as unknown as {
  value: string;
  state: State<string>;
} | {
  value: UserName;
  state: State<UserName>;
} 
//  | {
//   value: undefined;
//   state: State<undefined>;
// };

if (typeof nameState1.value === "string") {
  const a: State<string> = nameState1.state;

  //               ^^^^^^^^^
  // Type 'State<string> | State<UserName>' does not satisfy the expected type 'State<string>'.
  //   Type 'State<UserName>' is not assignable to type 'State<string>'.
  //     Type 'UserName' is not assignable to type 'string'.(1360)
}

// But it works if I add undefined to the mix:

// const nameState2 = {} as unknown as {
//   value: undefined;
//   state: State<undefined>;
// } | {
//   value: string;
//   state: State<string>;
// } | {
//   value: UserName;
//   state: State<UserName>;
// };