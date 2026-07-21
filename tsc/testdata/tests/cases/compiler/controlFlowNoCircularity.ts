// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/4673

export function repro(board: number[][], pos: number | undefined): void {
  if (!pos) return;
  for (const pattern of [{ target: [-1, -1], intermediate: [-1, 0] }]) {
    const targetR = pos + pattern.target[0];
    const targetC = pos + pattern.target[1];
    if (board[targetR][targetC] !== 0) {}
    const [ir, ic] = pattern.intermediate;
    const midC = ic;
    if (board[ir][midC] === 0) {
    }
  }
}
