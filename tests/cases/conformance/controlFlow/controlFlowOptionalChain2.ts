// @strictNullChecks: true

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
