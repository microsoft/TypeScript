const validHasKey = <A extends object>(
  thing: A,
  key: string,
): boolean => {
  return key in thing;
};

const invalidHasKey = <A>(
  thing: A,
  key: string,
): boolean => {
  return key in thing;
};
