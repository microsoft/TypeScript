module Keyboard {
  export enum Key { UP, DOWN, LEFT, RIGHT }
}

module App {
  import Key = Keyboard.Key;

  export function foo(key: Key): void {}

  foo(Key.UP);
  foo(Key.DOWN);
  foo(Key.LEFT);
}