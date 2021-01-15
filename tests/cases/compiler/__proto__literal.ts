const o = { a: 1 }
const __proto__ = o
// Should
const x1 = { __proto__: o }
const x2 = { __proto_\u005f: o }
const x3 = { "__proto__": o }
const x4 = { "__proto_\u005f": o }

// Duplicate
const y1 = { __proto__: o, __proto_\u005f: o }

// Spread order
const z1 = { ...({a: ''}), __proto__: o }
const z2 = { __proto__: o, ...({a: ''}) }

// Null
const w = { __proto__: null }

// Non-object
const q = { __proto__: 1, x: 1 }

// Should not
const x5 = { ["__proto__"]: o }
const x6 = { __proto__ }
const x7 = { __proto__() {} }
enum e { __proto__ = 1 }
{
    const { __proto__ } = { ['__proto__']: 1 }
}