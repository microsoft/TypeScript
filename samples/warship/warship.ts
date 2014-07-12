/// <reference path="jquery.d.ts" />
/// <reference path='jqueryui.d.ts' />

class Cell {
    shipIndex: number;
    hasHit: boolean;
    element: HTMLElement;

    constructor(public row: number, public column: number) {
        this.element = $("<div class='cell notBombed'></div>")[0];
    }

    // Parse a cell location of the format "row,column"
    static parseCellLocation(pos: string) {
        var indices: string[] = pos.split(",");
        return { 'row': parseInt(indices[0]), 'column': parseInt(indices[1]) };
    }

    // Return the cell location of the format "row,column"
    cellLocation() {
        return "" + this.row + "," + this.column;
    }
}

class Ship {
    column = 0;
    row = 0;
    isVertical = true;
    hits = 0;
    element: HTMLElement;

    constructor(public size: number) {
        this.element = $("<div class='ship'></div>")[0];
    }

    updatePosition(row: number, column: number, vertical: boolean) {
        this.row = row;
        this.column = column;
        this.isVertical = vertical;
        this.updateLayout();
    }

    updateLayout() {
        var width = "9.9%";
        var height = "" + (this.size * 9.9) + "%";
        this.element.style.left = "" + (this.column * 10) + "%";
        this.element.style.top = "" + (this.row * 10) + "%";
        this.element.style.width = this.isVertical ? width : height;
        this.element.style.height = this.isVertical ? height : width;
    }

    flipShip() {
        this.isVertical = !this.isVertical;
        if (this.isVertical) {
            if (this.row + this.size > 10) {
                this.row = 10 - this.size;
            }
        } else {
            if (this.column + this.size > 10) {
                this.column = 10 - this.size;
            }
        }
        this.updateLayout();
    }

    getCellsCovered() {
        var cells: string[] = [];
        var row = this.row;
        var col = this.column;
        for (var i = 0; i < this.size; i++) {
            cells.push(row.toString() + "," + col.toString());
            if (this.isVertical) {
                row++;
            } else {
                col++;
            }
        }
        return cells;
    }

    isSunk() {
        return this.hits === this.size;
    }
}

class Board {
    ships: Ship[];
    cells: Cell[][];             // Indexed by [rows][columns]
    playerTurn = false;          // Set to true when player can move
    onEvent: Function;           // Callback function when an action on the board occurs
    shipSizes = [5, 4, 3, 3, 2];

    private positioningEnabled: boolean;    // Set to true when the player can position the ships

    constructor(public element: HTMLElement, playerBoard: boolean = true) {
        this.positioningEnabled = playerBoard;
        this.cells = [];
        this.ships = [];
        var cell: Cell = null;

        // Create the cells for the board
        for (var row = 0; row < 10; row++) {
            this.cells[row] = [];
            for (var column = 0; column < 10; column++) {
                cell = new Cell(row, column);
                this.cells[row][column] = cell;
                element.appendChild(cell.element);
                $(cell.element).data("cellLocation", cell.cellLocation());
                if (playerBoard) {
                    $(cell.element).droppable({
                        disabled: false,
                        drop: (event, ui) => {
                            var shipElement = <HTMLElement>ui.draggable[0];
                            var shipIndex: number = $(shipElement).data("shipIndex");
                            var ship = this.ships[shipIndex];
                            var shipX = Math.round(shipElement.offsetLeft / cell.element.offsetWidth);
                            var shipY = Math.round(shipElement.offsetTop / cell.element.offsetHeight);
                            ship.updatePosition(shipY, shipX, ship.isVertical);
                        }
                    });
                }
            }
        }

        var referenceCell = $(cell.element);
        for (var i = 0; i < this.shipSizes.length; i++) {
            var ship = new Ship(this.shipSizes[i]);
            this.ships[i] = ship;
            ship.updatePosition(i, 0, false);
            if (playerBoard) { // Show the ships for positioning.
                this.element.appendChild(ship.element);
                ship.updateLayout();
                $(ship.element).data("shipIndex", i).draggable({
                    disabled: false,
                    containment: 'parent',
                    // Reduce size slightly to avoid overlap issues blocking the last cell
                    grid: [referenceCell.width() * 0.99 + 2, referenceCell.height() * 0.99 + 2],
                    cursor: 'crosshair'
                }).click((evt: JQueryEventObject) => {
                        if (this.positioningEnabled) {
                            var shipIndex: number = $(evt.target).data("shipIndex");
                            this.ships[shipIndex].flipShip();
                        }
                    });
            }
        }

        $(window).resize((evt) => {
            $(this.element).children(".ship").draggable("option", "grid", [referenceCell.width() * 0.99 + 2, referenceCell.height() * 0.99 + 2]);
        });

        if (!playerBoard) {
            // Computer board, this is where the player clicks to bomb
            $(element).click((evt: JQueryEventObject) => this.onCellClick(evt));
        }
    }

    set dragAndDropEnabled(val: boolean) {
        var cells = $(this.element).children(".cell");
        var ships = $(this.element).children(".ship");

        this.positioningEnabled = val;
        ships.draggable("option", "disabled", !val);
        cells.droppable("option", "disabled", !val);
    }

    static getRandomPosition() {
        return {
            "row": Math.floor(Math.random() * 10),
            "column": Math.floor(Math.random() * 10),
            "vertical": (Math.floor(Math.random() * 2) === 1)
        }
    }

    onCellClick(evt: JQueryEventObject) {
        var x = <HTMLElement>evt.target;
        if ($(x).hasClass("cell") === false) {
            return;
        }
        if (!this.playerTurn) {
            this.onEvent.call(this, 'click');
        }
        if (this.playerTurn) {       // May be updated by prior onEvent call, so check again
            this.bombCell(x);
        }
    }

    bombCell(cellElem: HTMLElement) {
        var cellPos = Cell.parseCellLocation($(cellElem).data("cellLocation"));
        var cell = this.cells[cellPos.row][cellPos.column];

        if (cell.hasHit) {
            return;  // Already been clicked on
        }
        cell.hasHit = true;
        if (cell.shipIndex >= 0) { // Has a ship
            $(cellElem).removeClass("notBombed");
            $(cellElem).addClass("cellHit");
            var ship = this.ships[cell.shipIndex];
            ship.hits++;
            if (ship.isSunk()) {
                if (this.allShipsSunk()) {
                    this.onEvent.call(this, 'allSunk');
                } else {
                    this.onEvent.call(this, 'shipSunk');
                }
            } else {
                this.onEvent.call(this, 'hit');
            }
        } else {
            $(cellElem).removeClass("notBombed");
            $(cellElem).addClass("cellMiss");
            this.onEvent.call(this, 'playerMissed');
        }
    }

    randomize() {
        var shipCount = this.ships.length;
        do {
            for (var shipIndex = 0; shipIndex < shipCount; shipIndex++) {
                var pos = Board.getRandomPosition();
                this.ships[shipIndex].updatePosition(pos.row, pos.column, pos.vertical);
            }
        } while (!this.boardIsValid());
    }

    boardIsValid() {
        // Check if any ships overlap my checking their cells for duplicates.
        // Do this by putting into a flat array, sorting, and seeing if any adjacent cells are equal
        var allCells: string[] = [];
        for (var i = 0; i < this.ships.length; i++) {
            allCells = allCells.concat(this.ships[i].getCellsCovered());
        }
        allCells.sort();
        var dups = allCells.some(function (val, idx, arr) { return val === arr[idx + 1]; });

        // See if any ship cells are off the board
        var outOfRange = allCells.some(function (val: string) {
            var pos = Cell.parseCellLocation(val);
            return !(pos.column >= 0 && pos.column <= 9 && pos.row >= 0 && pos.row <= 9);
        });
        if (dups || outOfRange) {
            return false;
        } else {
            this.updateCellData();
            return true;
        }
    }

    chooseMove() {
        do {
            var pos = Board.getRandomPosition();
            var cell = this.cells[pos.row][pos.column];
        } while (cell.hasHit);
        this.bombCell(cell.element);
    }

    private updateCellData() {
        for (var i = 0; i < 100; i++) {
            var x = this.cells[Math.floor(i / 10)][i % 10];
            x.hasHit = false;
            x.shipIndex = -1;
        }

        for (var index = 0; index < this.ships.length; index++) {
            var ship = this.ships[index]
            ship.hits = 0;
            var cells = ship.getCellsCovered();
            for (var cell = 0; cell < cells.length; cell++) {
                var cellPos = Cell.parseCellLocation(cells[cell]);
                var targetCell = this.cells[cellPos.row][cellPos.column];
                targetCell.shipIndex = index;
            }
        }

        $(this.element).children(".cell").removeClass("cellHit cellMiss").addClass("notBombed");
    }

    private allShipsSunk() {
        return this.ships.every(function (val) { return val.isSunk(); });
    }
}

class Game {
    static gameState = { begin: 0, computerTurn: 1, playerTurn: 2, finished: 3 };
    static msgs = {
        gameStart: "Drag your ships to the desired location on your board (on the right), then bomb a square on the left board to start the game!",
        invalidPositions: "All ships must be in valid positions before the game can begin.",
        wait: "Wait your turn!",
        gameOn: "Game on!",
        hit: "Good hit!",
        shipSunk: "You sunk a ship!",
        lostShip: "You lost a ship :-(",
        lostGame: "You lost this time. Click anywhere on the left board to play again.",
        allSunk: "Congratulations!  You won!  Click anywhere on the left board to play again."
    };

    state = Game.gameState.begin;
    playerBoard: Board;
    computerBoard: Board;

    constructor() {
        this.updateStatus(Game.msgs.gameStart);
        this.playerBoard = new Board($("#playerBoard")[0]);
        this.computerBoard = new Board($("#computerBoard")[0], false);
        this.computerBoard.randomize();
        this.playerBoard.randomize();
        this.playerBoard.dragAndDropEnabled = true;
        this.computerBoard.onEvent = (evt: string) => {
            switch (evt) {
                case 'click': // The user has click outside a turn.  Action depends on current state
                    switch (this.state) {
                        case Game.gameState.begin:
                            this.startGame();
                            break;
                        case Game.gameState.computerTurn:  // Not their turn yet.  Ask to wait.
                            this.updateStatus(Game.msgs.wait);
                            break;
                        case Game.gameState.finished: // Start a new game
                            this.computerBoard.randomize();
                            this.playerBoard.randomize();
                            this.playerBoard.dragAndDropEnabled = true;
                            this.updateStatus(Game.msgs.gameStart);
                            this.state = Game.gameState.begin;
                            break;
                    }
                    break;
                case 'playerMissed':
                    this.computersTurn();
                    break;
                case 'hit':
                    this.updateStatus(Game.msgs.hit);
                    this.computersTurn();
                    break;
                case 'shipSunk':
                    this.updateStatus(Game.msgs.shipSunk);
                    this.computersTurn();
                    break;
                case 'allSunk':
                    this.state = Game.gameState.finished;
                    this.computerBoard.playerTurn = false;
                    this.updateStatus(Game.msgs.allSunk);
                    break;
            }
        };
        this.playerBoard.onEvent = (evt: string) => {
            switch (evt) {
                case 'playerMissed':
                case 'hit':
                    this.computerBoard.playerTurn = true;
                    break;
                case 'shipSunk':
                    this.updateStatus(Game.msgs.lostShip);
                    this.computerBoard.playerTurn = true;
                    break;
                case 'allSunk':
                    this.updateStatus(Game.msgs.lostGame);
                    this.computerBoard.playerTurn = false;
                    this.state = Game.gameState.finished;
                    break;
            }
        };
    }

    private computersTurn() {
        this.computerBoard.playerTurn = false;
        this.state = Game.gameState.computerTurn;
        setTimeout(() => {
            this.playerBoard.chooseMove();
        }, 250);
    }

    private startGame() {
        if (this.playerBoard.boardIsValid()) {
            this.state = Game.gameState.playerTurn;
            this.playerBoard.dragAndDropEnabled = false;
            this.computerBoard.playerTurn = true;
            this.updateStatus(Game.msgs.gameOn);
        }
        else {
            this.updateStatus(Game.msgs.invalidPositions);
        }
    }

    private updateStatus(msg: string) {
        $("#status").slideUp('fast', function () {  // Slide out the old text
            $(this).text(msg).slideDown('fast');  // Then slide in the new text
        });
    }
}

$(new Function("var game = new Game();"));
