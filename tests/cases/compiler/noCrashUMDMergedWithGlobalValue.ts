//@filename: /other.d.ts
export as namespace SomeInterface;
export type Action = "PUSH" | "POP" | "REPLACE";

//@filename: /main.ts
interface SomeInterface {
  readonly length: number;
}
declare const value: SomeInterface;
