// @strict: true
// @noEmit: true

declare const gridMap: { startRow: number; startColumn: number }[][];
for (let i = 0; i < gridMap.length; i++) {
    if (i !== 0) {
    }
    for (let j = 0; j < gridMap[0].length; j++) {
        const cellMap = gridMap[i][j];
        if (cellMap.startRow === i && cellMap.startColumn === j) {
        }
    }
}
