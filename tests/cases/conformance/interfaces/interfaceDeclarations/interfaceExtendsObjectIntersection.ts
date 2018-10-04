// @strictNullChecks: true

type T1 = { a: number };
type T2 = T1 & { b: number };
type T3 = () => void;
type T4 = new () => { a: number };
type T5 = number[];
type T6 = [string, number];
type T7 = { [P in 'a' | 'b' | 'c']: string };

interface I1 extends T1 { x: string }
interface I2 extends T2 { x: string }
interface I3 extends T3 { x: string }
interface I4 extends T4 { x: string }
interface I5 extends T5 { x: string }
interface I6 extends T6 { x: string }
interface I7 extends T7 { x: string }

type Constructor<T> = new () => T;
declare function Constructor<T>(): Constructor<T>;

class C1 extends Constructor<I1>() { x: string }
class C2 extends Constructor<I2>() { x: string }
class C3 extends Constructor<I3>() { x: string }
class C4 extends Constructor<I4>() { x: string }
class C5 extends Constructor<I5>() { x: string }
class C6 extends Constructor<I6>() { x: string }
class C7 extends Constructor<I7>() { x: string }

declare function fx(x: string): string;
declare class CX { a: number }
declare enum EX { A, B, C }
declare namespace NX { export const a = 1 }

type T10 = typeof fx;
type T11 = typeof CX;
type T12 = typeof EX;
type T13 = typeof NX;

interface I10 extends T10 { x: string }
interface I11 extends T11 { x: string }
interface I12 extends T12 { x: string }
interface I13 extends T13 { x: string }

type Identifiable<T> = { _id: string } & T;

interface I20 extends Partial<T1> { x: string }
interface I21 extends Readonly<T1> { x: string }
interface I22 extends Identifiable<T1> { x: string }
interface I23 extends Identifiable<T1 & { b: number}> { x: string }

class C20 extends Constructor<Partial<T1>>() { x: string }
class C21 extends Constructor<Readonly<T1>>() { x: string }
class C22 extends Constructor<Identifiable<T1>>() { x: string }
class C23 extends Constructor<Identifiable<T1 & { b: number}>>() { x: string }
