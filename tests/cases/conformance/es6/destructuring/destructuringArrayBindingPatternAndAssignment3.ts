const [a, b = a] = [1]; // ok
const [a, b = a, c = c] = [1]; // error for c
const [a, b = a, c = d, d = a] = [1]; // error for c

