//// [derivedInterfaceCallSignature.ts]
interface D3SvgPath {
    (data: any, index?: number): string;

    x(): (data: any, index?: number) => number;
    y(): (data: any, index?: number) => number;
    interpolate(): string;
    tension(): number;
    defined(): (data: any, index?: number) => boolean;
}

interface D3SvgArea extends D3SvgPath {
    x(x: (data: any, index?: number) => number): D3SvgArea;
    y(y: (data: any, index?: number) => number): D3SvgArea;
    y0(): (data: any, index?: number) => number;
    y0(y: number): D3SvgArea;
    y0(y: (data: any, index?: number) => number): D3SvgArea;
    y1(): (data: any, index?: number) => number;
    y1(y: number): D3SvgArea;
    y1(y: (data: any, index?: number) => number): D3SvgArea;

    interpolate(interpolator: string): D3SvgArea;
    tension(tension: number): D3SvgArea;
    defined(defined: (data: any, index?: number) => boolean): D3SvgArea;
}

var area: D3SvgArea;
area.interpolate('two')('one');

//// [derivedInterfaceCallSignature.js]
var area;
area.interpolate('two')('one');
