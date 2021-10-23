let a = false;
[1].forEach(() => a = true);

const b: false = a; // Error
