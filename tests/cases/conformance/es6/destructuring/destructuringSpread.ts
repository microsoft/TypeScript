const { x } = {
  ...{},
  x: 0
};

const { y } = {
  y: 0,
  ...{}
};

const { z, a, b } = {
  z: 0,
  ...{ a: 0, b: 0 }
};
