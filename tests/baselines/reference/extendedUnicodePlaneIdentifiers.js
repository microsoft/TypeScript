//// [tests/cases/compiler/extendedUnicodePlaneIdentifiers.ts] ////

//// [extendedUnicodePlaneIdentifiers.ts]
const 𝑚 = 4;
const 𝑀 = 5;
console.log(𝑀 + 𝑚); // 9

class K {
    #𝑚 = 4;
    #𝑀 = 5;
}

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

const Ɐⱱ = "ok"; // BMP

const 𓀸𓀹𓀺 = "ok"; // SMP

const 𡚭𡚮𡚯 = "ok"; // SIP

const 𡚭𓀺ⱱ𝓮 = "ok";

const 𓀺ⱱ𝓮𡚭 = "ok";

const ⱱ𝓮𡚭𓀺 = "ok";

const 𝓮𡚭𓀺ⱱ = "ok";


//// [extendedUnicodePlaneIdentifiers.js]
var _K_𝑚, _K_𝑀;
const 𝑚 = 4;
const 𝑀 = 5;
console.log(𝑀 + 𝑚); // 9
class K {
    constructor() {
        _K_𝑚.set(this, 4);
        _K_𝑀.set(this, 5);
    }
}
_K_𝑚 = new WeakMap(), _K_𝑀 = new WeakMap();
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
const Ɐⱱ = "ok"; // BMP
const 𓀸𓀹𓀺 = "ok"; // SMP
const 𡚭𡚮𡚯 = "ok"; // SIP
const 𡚭𓀺ⱱ𝓮 = "ok";
const 𓀺ⱱ𝓮𡚭 = "ok";
const ⱱ𝓮𡚭𓀺 = "ok";
const 𝓮𡚭𓀺ⱱ = "ok";
