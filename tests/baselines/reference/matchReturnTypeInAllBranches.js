//// [matchReturnTypeInAllBranches.ts]
// Represents a monster who enjoys ice cream
class IceCreamMonster {
    private iceCreamFlavor: string;
    private iceCreamRemaining: number;
    private wantsSprinkles: boolean;
    private soundsWhenEating: string;
    public name: string;
    constructor(iceCreamFlavor: string, wantsSprinkles: boolean, soundsWhenEating: string, name: string) {
        this.iceCreamFlavor = iceCreamFlavor;
        this.iceCreamRemaining = 100;
        this.wantsSprinkles = wantsSprinkles;
        this.soundsWhenEating = soundsWhenEating;
        this.name = name;
    }
    /**
* Tells the IceCreamMonster to eat their ice cre    am!    
*
* @param {number} amount The amount of ice cream to e    at.
* @return {boolean} True if ice cream remains, false if there is no more ice cream le    ft.
*/
    public eatIceCream(amount: number): boolean {
        this.iceCreamRemaining -= amount;
        if (this.iceCreamRemaining <= 0)
        {
            this.iceCreamRemaining = 0;
            return false;
        }
        else
        {
            return 12345;
        }
    }
}
var cookieMonster: IceCreamMonster;
cookieMonster = new IceCreamMonster("Chocolate Chip", false, "COOOOOKIE", "Cookie Monster");

//// [matchReturnTypeInAllBranches.js]
// Represents a monster who enjoys ice cream
var IceCreamMonster = /** @class */ (function () {
    function IceCreamMonster(iceCreamFlavor, wantsSprinkles, soundsWhenEating, name) {
        this.iceCreamFlavor = iceCreamFlavor;
        this.iceCreamRemaining = 100;
        this.wantsSprinkles = wantsSprinkles;
        this.soundsWhenEating = soundsWhenEating;
        this.name = name;
    }
    /**
* Tells the IceCreamMonster to eat their ice cre    am!
*
* @param {number} amount The amount of ice cream to e    at.
* @return {boolean} True if ice cream remains, false if there is no more ice cream le    ft.
*/
    IceCreamMonster.prototype.eatIceCream = function (amount) {
        this.iceCreamRemaining -= amount;
        if (this.iceCreamRemaining <= 0) {
            this.iceCreamRemaining = 0;
            return false;
        }
        else {
            return 12345;
        }
    };
    return IceCreamMonster;
}());
var cookieMonster;
cookieMonster = new IceCreamMonster("Chocolate Chip", false, "COOOOOKIE", "Cookie Monster");
