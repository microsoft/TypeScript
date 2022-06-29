// @filename: a.d.ts
type O = { a: string; b: number; c: number; };
type F1 = (arg: number) => any; 
type F2 = ({ a: string }: O) => any; 
type F3 = ({ a: string, b, c }: O) => any; 
type F4 = ({ a: string }: O) => any; 
type F5 = ({ a: string, b, c }: O) => any; 
type F6 = ({ a: string }) => typeof string; 
type F7 = ({ a: string, b: number }) => typeof number; 
type F8 = ({ a, b: number }) => typeof number; 
type F9 = ([a, b, c]) => void; 

type G1 = (arg: number) => any; 
type G2 = ({ a: string }: O) => any; 
type G3 = ({ a: string, b, c }: O) => any; 
type G4 = ({ a: string }: O) => any; 
type G5 = ({ a: string, b, c }: O) => any; 
type G6 = ({ a: string }) => typeof string; 
type G7 = ({ a: string, b: number }) => typeof number; 
type G8 = ({ a, b: number }) => typeof number; 
type G9 = ([a, b, c]) => void; 

interface I {
  method1(arg: number): any; 
  method2({ a: string }): any; 

  (arg: number): any; 
  ({ a: string }): any; 

  new (arg: number): any; 
  new ({ a: string }): any; 
}

