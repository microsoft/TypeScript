// @allowJs: true
// @checkJs: true
// @noEmit: true

// #40767

// @Filename: GeometryType.d.ts
declare namespace _default {
  export const POINT: string;
}
export default _default;

// @Filename: Main.js
export default function () {
  return /** @type {import('./GeometryType.js').default} */ ('Point');
}
