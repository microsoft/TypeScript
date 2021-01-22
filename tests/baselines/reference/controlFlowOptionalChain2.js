//// [controlFlowOptionalChain2.ts]
type A = {
  type: 'A';
  name: string;
}

type B = {
  type: 'B';
}

function funcTwo(arg: A | B | undefined) {
  if (arg?.type === 'B') {
    // arg; // `B`
    return 'B';
  }

  arg; // `A | B | undefined`

  // arg cannot be of type B here
  const errorTwo = arg?.name; // unexpected error

  return errorTwo;
}


//// [controlFlowOptionalChain2.js]
function funcTwo(arg) {
    if ((arg === null || arg === void 0 ? void 0 : arg.type) === 'B') {
        // arg; // `B`
        return 'B';
    }
    arg; // `A | B | undefined`
    // arg cannot be of type B here
    var errorTwo = arg === null || arg === void 0 ? void 0 : arg.name; // unexpected error
    return errorTwo;
}
