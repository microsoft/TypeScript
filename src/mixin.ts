type ClassConstructor = new(...args: unknown[]) => {};

function mixin<C extends ClassConstructor>(Class: C) {
  return class extends Class {};
}