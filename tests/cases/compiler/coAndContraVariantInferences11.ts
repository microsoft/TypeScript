// @strict: true
// @noEmit: true

// based on https://github.com/microsoft/TypeScript/issues/59656

interface Box<T> {
  select: <A>(op: (source: T) => A) => A;
  _v: T;
}
declare function tap<T>(next: (value: T) => void): (source: T) => T;

declare const box1: Box<{
  prop?: string;
}>;
function test1(): {} {
  return box1.select(tap((arg) => {}));
}

declare const box2: Box<{
  prop: string;
}>;
function test2(): {} {
  return box2.select(tap((arg) => {}));
}

declare const box3: Box<{
  prop: string;
  prop2?: number;
}>;
function test3(): {} {
  return box3.select(tap((arg) => {}));
}

declare const box4: Box<{
  prop?: string;
  prop2?: number;
}>;
function test4(): { prop?: string } {
  return box4.select(tap((arg) => {}));
}

declare const box5: Box<{
  prop: string;
  prop2?: number;
}>;
function test5(): { prop: string } {
  return box5.select(tap((arg) => {}));
}

declare const box6: Box<{
  prop: string;
  prop2?: number;
}>;
function test6(): { prop2?: number } {
  return box6.select(tap((arg) => {}));
}

declare const box7: Box<{
  prop?: string;
}>;
function test7(): any {
  return box7.select(tap((arg) => {}));
}

declare const box8: Box<{
  prop?: string;
}>;
function test8(): unknown {
  return box8.select(tap((arg) => {}));
}
