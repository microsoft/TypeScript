// @strictNullChecks: true

type T1 = { a: number };
type T2 = T1 & { b: number };
type T3 = number[];
type T4 = [string, number];
type T5 = { [P in 'a' | 'b' | 'c']: string };

interface I1 extends T1 { a: string }
interface I2 extends T2 { b: string }
interface I3 extends T3 { length: string }
interface I4 extends T4 { 0: number }
interface I5 extends T5 { c: number }

type Constructor<T> = new () => T;
declare function Constructor<T>(): Constructor<T>;

class C1 extends Constructor<T1>() { a: string }
class C2 extends Constructor<T2>() { b: string }
class C3 extends Constructor<T3>() { length: string }
class C4 extends Constructor<T4>() { 0: number }
class C5 extends Constructor<T5>() { c: number }

declare class CX { static a: string }
declare enum EX { A, B, C }
declare namespace NX { export const a = "hello" }

type TCX = typeof CX;
type TEX = typeof EX;
type TNX = typeof NX;

interface I10 extends TCX { a: number }
interface I11 extends TEX { C: string }
interface I12 extends TNX { a: number }
interface I14 extends TCX { [x: string]: number }
interface I15 extends TEX { [x: string]: number }
interface I16 extends TNX { [x: string]: number }

type Identifiable<T> = { _id: string } & T;

interface I20 extends Partial<T1> { a: string }
interface I21 extends Readonly<T1> { a: string }
interface I22 extends Identifiable<T1> { a: string }
interface I23 extends Identifiable<T1 & { b: number}> { a: string }

type U = { a: number } | { b: string };

interface I30 extends U { x: string }
interface I31<T> extends T { x: string }
