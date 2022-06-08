type O = { a: string; b: number; c: number; };
type F1 = (arg: number) => any; // OK
type F2 = ({ a: string }: O) => any; // Error
type F3 = ({ a: string, b, c }: O) => any; // Error
type F4 = ({ a: string }: O) => any; // Error
type F5 = ({ a: string, b, c }: O) => any; // Error
type F6 = ({ a: string }) => typeof string; // OK
type F7 = ({ a: string, b: number }) => typeof number; // Error
type F8 = ({ a, b: number }) => typeof number; // OK
type F9 = ([a, b, c]) => void; // Error

type G1 = (arg: number) => any; // OK
type G2 = ({ a: string }: O) => any; // Error
type G3 = ({ a: string, b, c }: O) => any; // Error
type G4 = ({ a: string }: O) => any; // Error
type G5 = ({ a: string, b, c }: O) => any; // Error
type G6 = ({ a: string }) => typeof string; // OK
type G7 = ({ a: string, b: number }) => typeof number; // Error
type G8 = ({ a, b: number }) => typeof number; // OK
type G9 = ([a, b, c]) => void; // Error

interface I {
  method1(arg: number): any; // OK
  method2({ a: string }): any; // Error

  (arg: number): any; // OK
  ({ a: string }): any; // Error

  new (arg: number): any; // OK
  new ({ a: string }): any; // Error
}