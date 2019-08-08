// @strict: true

// Repro from #18758

type A = { type2: "a", a: number }
type B = { type2: "b", b: number }
type C = { type2: "c", b: number | string }

type X = { type1: A, x: string }
type Y = { type1: B, y: string }
type Z = { type1: C, z: string }

let x!: X | Y

if (x.type1.type2 === "a") {
	x.x // typeof x is X
} else if(x.type1.type2 === "b") {
  x.y // typeof x is Y
} 


switch(x.type1.type2) {
  case "a":
    x.x // typeof x is X
    break;
  case "b":
    x.y // typeof x is Y
    break;
}

let z!: Y | Z

if(z.type1.b == "") {
  z.z // typeof z is x
}

type S = {sub: {type0: X}, s: string }
type T = {sub: {type0: Y}, t: string } 

let s!: S | T

if(s.sub.type0.type1.type2 === "a") {
  s.s // typeof s is S
  s.sub.type0.x // type of s.sub.type is X
  s.sub.type0.type1.a // type of s.sub.type.type is A
} else {
  s.s // type error!
}