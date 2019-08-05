//// [extendedUnicodePlaneIdentifiers.ts]
const 𝑚 = 4;
const 𝑀 = 5;
console.log(𝑀 + 𝑚); // 9

// lower 8 bits look like 'a'
const ၡ = 6;
console.log(ၡ ** ၡ);

// lower 8 bits aren't a valid unicode character
const ဒ = 7;
console.log(ဒ ** ဒ);


//// [extendedUnicodePlaneIdentifiers.js]
const 𝑚 = 4;
const 𝑀 = 5;
console.log(𝑀 + 𝑚); // 9
// lower 8 bits look like 'a'
const ၡ = 6;
console.log(ၡ ** ၡ);
// lower 8 bits aren't a valid unicode character
const ဒ = 7;
console.log(ဒ ** ဒ);
