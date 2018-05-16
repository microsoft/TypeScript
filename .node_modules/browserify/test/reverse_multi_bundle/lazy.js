t.equal(
  require("./shared")(),2,
  "lazy.js can use the shared library"
);
t.equal(
  require("not/real")(),1,
  "lazy.js can use library code with arbitrary names"
);

