const nestedArray = [[[1, 2]], [[3, 4]]];

nestedArray.forEach(([[a, b]]) => {
  console.log(a, b);
});
