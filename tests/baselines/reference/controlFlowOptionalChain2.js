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
    arg; // `B`
    return;
  }

  arg;
  arg?.name;
}


//// [controlFlowOptionalChain2.js]
function funcTwo(arg) {
    if ((arg === null || arg === void 0 ? void 0 : arg.type) === 'B') {
        arg; // `B`
        return;
    }
    arg;
    arg === null || arg === void 0 ? void 0 : arg.name;
}
