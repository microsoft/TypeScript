// @strict: true
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: esnext
// @checkOrder: default, typesfirst, editorfirst
// @filename: bubble.js

// Each element access on the right of a chained assignment reports its
// implicit any once, whichever of the assignments is typed first (64710,
// 64849).

export class C {
  /** @param {any} iScale @param {any} vScale @param {boolean} reset */
  updateElements(iScale, vScale, reset) {
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const properties = {};
    const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(1);
    const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(2);
    properties.skip = isNaN(iPixel) || isNaN(vPixel);
  }
}
