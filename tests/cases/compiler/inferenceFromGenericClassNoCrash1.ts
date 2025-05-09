// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61633#issuecomment-2841778576

function RenderFlagsMixin<T extends new (...args: any[]) => object>(Base?: T) {}
class Container<T> {
  t: T;
}
RenderFlagsMixin(Container);
