export interface Point { x: number; y: number; };
export function point (x: number, y: number): Point {
	return { x: x, y: y };
}