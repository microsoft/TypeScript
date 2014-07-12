///<reference path="Driver.ts"/>

module Mankala {
    export var NoSpace = -1;
    export var homeSpaces = [[0, 1, 2, 3, 4, 5],
                             [7, 8, 9, 10, 11, 12]];
    export var firstHomeSpace = [0, 7];
    export var lastHomeSpace = [5, 12];
    export var capturedSpaces = [12, 11, 10, 9, 8, 7, NoSpace, 5, 4, 3, 2, 1, 0, NoSpace];
    export var NoScore = 31;
    export var NoMove = -1;

    export interface IPositionList extends Base.IList {
        data: Position;
        push(pos: Position);
        pop(): Position;
    }

    function pushPosition(pos: Position, l: IPositionList) {
        l.insertAfter(Base.listMakeEntry(pos));
    }

    function popPosition(l: IPositionList) {
        var entry: IPositionList = <IPositionList>Base.listRemove(l.next);
        if (entry != null) {
            return entry.data;
        } else {
            return null;
        }
    }

    export function testBrowser() {
        var game = new Game();
        game.interactive();
        var bod = document.getElementById("bod");
        bod.onresize = function() {
            game.resize();
        }
    }

    export class Game {
        private position = new DisplayPosition([3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0], NoMove, 0);
        private prevConfig: SeedCoords[][];
        private q: IPositionList = null;
        private scores: number[] = null;
        private positionCount = 0;
        private moveCount = 0;
        private isInteractive = false;

        private features = new Features();
        private nextSeedCounts: number[] = new Array<number>(14);
        private bod: Element;
        private boardElm: Element = null;

        public resize() {
            if (this.boardElm != null) {
                this.bod.removeChild(this.boardElm);
            }
            this.showMove();
        }

        private step(): boolean {
            var move = this.findMove();
            if (move != NoMove) {
                this.position.move(move, this.nextSeedCounts, this.features);
                this.position = new DisplayPosition(this.nextSeedCounts.slice(0), NoMove,
                                               this.features.turnContinues ? this.position.turn : 1 - this.position.turn);
                this.position.config = this.prevConfig;
                if ((!this.isInteractive) || (this.position.turn == 1)) {
                    this.setStep();
                }
                return true;
            }
            return false;
        }

        private setStep() {
            setTimeout(/*function()*/ () => {
                if (!this.step()) {
                    this.finish();
                }
                this.bod.removeChild(this.boardElm);
                this.showMove();
            }, 1000);
        }

        private finish() {
            var sum = 0;
            var otherSpaces = homeSpaces[1 - this.position.turn];
            for (var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.position.seedCounts[otherSpaces[k]];
                this.position.seedCounts[otherSpaces[k]] = 0;
            }
            this.position.seedCounts[storeHouses[this.position.turn]] += sum;
        }

        private auto() {
            // initialize
            this.bod = document.getElementById("bod");
            this.showMove();
            // run with timeout
            this.setStep();
        }

        private showMove(): void {
            var hsc = document.getElementById("humscore");
            var csc = document.getElementById("compscore");

            var g = this;
            if (!this.isInteractive) {
                g = null;
            }
            this.boardElm = this.position.toCircleSVG(g);
            this.prevConfig = this.position.config;
            hsc.innerText = this.position.seedCounts[storeHouses[0]] +
                ((this.position.turn == 0) ? "  <-Turn" : "");
            csc.innerText = this.position.seedCounts[storeHouses[1]] +
                ((this.position.turn == 1) ? "  <-Turn" : "");
            this.bod.appendChild(this.boardElm);
        }

        public humanMove(seed: number) {
            if (this.position.turn == 0) {
                this.position.move(seed, this.nextSeedCounts, this.features);
                this.position = new DisplayPosition(this.nextSeedCounts.slice(0), NoMove,
                                             this.features.turnContinues ? this.position.turn : 1 - this.position.turn);
                this.position.config = this.prevConfig;
                this.bod.removeChild(this.boardElm);
                this.showMove();
                if (this.position.turn == 1) {
                    this.setStep();
                }
            }
        }

        public interactive() {
            this.isInteractive = true;
            this.bod = document.getElementById("bod");
            this.showMove();
        }

        private expand(curPos: Position, move: number,
            startMove: number, nextSeedCounts: number[]) {
            var features = new Features();
            if (curPos.move(move, nextSeedCounts, features)) {
                var pos = new Position(nextSeedCounts.slice(0), startMove, curPos.turn);
                this.positionCount++;
                if (!features.turnContinues) {
                    pos.turn = 1 - pos.turn;
                }
                var score = pos.score();
                if (this.scores[startMove] == NoScore) {
                    this.scores[startMove] = score;
                }
                else {
                    this.scores[startMove] += score;
                }
                pushPosition(pos, this.q);
                return true;
            }
            return false;
        }

        private findMove() {
            var timeStart = new Date().getTime();
            this.q = <IPositionList>Base.listMakeHead();
            this.scores = [NoScore, NoScore, NoScore, NoScore, NoScore, NoScore];
            pushPosition(this.position, this.q);
            var deltaTime = 0;
            var moves = homeSpaces[this.position.turn];
            var nextSeedCounts: number[] = new Array<number>(14);
            var movePossible = false;
            while ((!this.q.empty()) && (deltaTime < 500)) {
                var firstPos = popPosition(this.q);
                for (var i = 0, len = moves.length; i < len; i++) {
                    var startMove = firstPos.startMove;
                    if (startMove == NoMove) {
                        startMove = i;
                    }
                    if (this.expand(firstPos, moves[i], startMove, nextSeedCounts)) {
                        movePossible = true;
                    }
                }
                deltaTime = new Date().getTime() - timeStart;
            }
            if (movePossible) {
                var bestScore = -100;
                var bestMove = NoMove;
                for (var j = 0, scoresLen = this.scores.length; j < scoresLen; j++) {
                    if ((this.scores[j] != NoScore) && ((this.scores[j] > bestScore) || (bestMove == NoMove))) {
                        bestScore = this.scores[j];
                        bestMove = j;
                    }
                }
                if (bestMove != NoMove) {
                    return moves[bestMove];
                } else {
                    return NoMove;
                }
            }
            return NoMove;
        }

        public test() {
            var features = new Features();
            var nextSeedCounts: number[] = new Array<number>(14);
            WScript.Echo("position: ")
            WScript.Echo(this.position.seedCounts.slice(0, 7));
            WScript.Echo(this.position.seedCounts.slice(7));
            do {
                var move = this.findMove();
                if (move == NoMove) {
                    // TODO: capture rest of other side
                } else {
                    this.moveCount++;
                    WScript.Echo(this.position.turn + " moves seeds in space " + move);
                    this.position.move(move, nextSeedCounts, features);
                    WScript.Echo(features.toString());
                    this.position = new DisplayPosition(nextSeedCounts.slice(0), NoMove,
                                            features.turnContinues ? this.position.turn : 1 - this.position.turn);
                    WScript.Echo("position: ")
                    WScript.Echo(this.position.seedCounts.slice(0, 7));
                    WScript.Echo(this.position.seedCounts.slice(7));
                }
            } while (move != NoMove);
            var sum = 0;
            var otherSpaces = homeSpaces[1 - this.position.turn];
            for (var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.position.seedCounts[otherSpaces[k]];
                this.position.seedCounts[otherSpaces[k]] = 0;
            }
            this.position.seedCounts[storeHouses[this.position.turn]] += sum;
            WScript.Echo("final position: ")
            WScript.Echo(this.position.seedCounts.slice(0, 7));
            WScript.Echo(this.position.seedCounts.slice(7));
            var player1Count = this.position.seedCounts[storeHouses[0]];
            var player2Count = this.position.seedCounts[storeHouses[1]];
            WScript.Echo("storehouse 1 has " + player1Count);
            WScript.Echo("storehouse 2 has " + player2Count);
            WScript.Echo("average positions explored per move " +
                 (this.positionCount / this.moveCount).toFixed(2));
        }
    }
}