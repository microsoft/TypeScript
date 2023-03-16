declare class Cell {
}
declare class Ship {
    isSunk: boolean;
}
declare class Board {
    ships: Ship[];
    cells: Cell[];
    private allShipsSunk;
}
