// @target: es2018
const 𝑚 = 4;
const 𝑀 = 5;
console.log(𝑀 + 𝑚); // 9

// lower 8 bits look like 'a'
const ၡ = 6;
console.log(ၡ ** ၡ);

// lower 8 bits aren't a valid unicode character
const ဒ = 7;
console.log(ဒ ** ဒ);

// a mix, for good measure
const ဒၡ𝑀 = 7;
console.log(ဒၡ𝑀 ** ဒၡ𝑀);

const ၡ𝑀ဒ = 7;
console.log(ၡ𝑀ဒ ** ၡ𝑀ဒ);

const 𝑀ဒၡ = 7;
console.log(𝑀ဒၡ ** 𝑀ဒၡ);

const 𝓱𝓮𝓵𝓵𝓸 = "𝔀𝓸𝓻𝓵𝓭";
