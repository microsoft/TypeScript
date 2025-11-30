// block body
const a = (): number => {
  return "foo";
};

const a = (): number => {
  return missing;
};

// expression body
const b = (): number => "foo";

type F<T> = T;
const c = (): F<number> => "foo";

const d = (): number => missing;
