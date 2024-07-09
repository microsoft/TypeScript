declare let x: { (): string; prop: number };
declare let y: { (): string; }

x = y;
y = x;