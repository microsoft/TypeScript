//// [tests/cases/compiler/objectCreationOfElementAccessExpression.ts] ////

//// [objectCreationOfElementAccessExpression.ts]
class Food {
    private amount: number;
    constructor(public name: string) {
        this.amount = 100;
    }
    public eat(amountToEat: number): boolean {
        this.amount -= amountToEat;
        if (this.amount <= 0) {
            this.amount = 0;
            return false;
        }
        else {
            return true;
        }
    }
}
class MonsterFood extends Food {
    constructor(name: string, public flavor: string) {
        super(name);
    }
}
class IceCream extends MonsterFood {
    private isDairyFree: boolean;
    constructor(public flavor: string) {
        super("Ice Cream", flavor);
    }
}
class Cookie extends MonsterFood {
    constructor(public flavor: string, public isGlutenFree: boolean) {
        super("Cookie", flavor);
    }
}
class PetFood extends Food {
    constructor(name: string, public whereToBuy: number) {
        super(name);
    }
}
class ExpensiveOrganicDogFood extends PetFood {
    constructor(public whereToBuy: number) {
        super("Origen", whereToBuy);
    }
}
class ExpensiveOrganicCatFood extends PetFood {
    constructor(public whereToBuy: number, public containsFish: boolean) {
        super("Nature's Logic", whereToBuy);
    }
}
class Slug {
    // This is NOT a food!!!
}

// ElementAccessExpressions can only contain one expression.  There should be a parse error here.
var foods = new PetFood[new IceCream('Mint chocolate chip') , Cookie('Chocolate chip', false) , new Cookie('Peanut butter', true)];
var foods2: MonsterFood[] = new PetFood[new IceCream('Mint chocolate chip') , Cookie('Chocolate chip', false) , new Cookie('Peanut butter', true)];


//// [objectCreationOfElementAccessExpression.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Food = /** @class */ (function () {
    function Food(name) {
        this.name = name;
        this.amount = 100;
    }
    Food.prototype.eat = function (amountToEat) {
        this.amount -= amountToEat;
        if (this.amount <= 0) {
            this.amount = 0;
            return false;
        }
        else {
            return true;
        }
    };
    return Food;
}());
var MonsterFood = /** @class */ (function (_super) {
    __extends(MonsterFood, _super);
    function MonsterFood(name, flavor) {
        var _this = _super.call(this, name) || this;
        _this.flavor = flavor;
        return _this;
    }
    return MonsterFood;
}(Food));
var IceCream = /** @class */ (function (_super) {
    __extends(IceCream, _super);
    function IceCream(flavor) {
        var _this = _super.call(this, "Ice Cream", flavor) || this;
        _this.flavor = flavor;
        return _this;
    }
    return IceCream;
}(MonsterFood));
var Cookie = /** @class */ (function (_super) {
    __extends(Cookie, _super);
    function Cookie(flavor, isGlutenFree) {
        var _this = _super.call(this, "Cookie", flavor) || this;
        _this.flavor = flavor;
        _this.isGlutenFree = isGlutenFree;
        return _this;
    }
    return Cookie;
}(MonsterFood));
var PetFood = /** @class */ (function (_super) {
    __extends(PetFood, _super);
    function PetFood(name, whereToBuy) {
        var _this = _super.call(this, name) || this;
        _this.whereToBuy = whereToBuy;
        return _this;
    }
    return PetFood;
}(Food));
var ExpensiveOrganicDogFood = /** @class */ (function (_super) {
    __extends(ExpensiveOrganicDogFood, _super);
    function ExpensiveOrganicDogFood(whereToBuy) {
        var _this = _super.call(this, "Origen", whereToBuy) || this;
        _this.whereToBuy = whereToBuy;
        return _this;
    }
    return ExpensiveOrganicDogFood;
}(PetFood));
var ExpensiveOrganicCatFood = /** @class */ (function (_super) {
    __extends(ExpensiveOrganicCatFood, _super);
    function ExpensiveOrganicCatFood(whereToBuy, containsFish) {
        var _this = _super.call(this, "Nature's Logic", whereToBuy) || this;
        _this.whereToBuy = whereToBuy;
        _this.containsFish = containsFish;
        return _this;
    }
    return ExpensiveOrganicCatFood;
}(PetFood));
var Slug = /** @class */ (function () {
    function Slug() {
    }
    return Slug;
}());
// ElementAccessExpressions can only contain one expression.  There should be a parse error here.
var foods = new PetFood[new IceCream('Mint chocolate chip'), Cookie('Chocolate chip', false), new Cookie('Peanut butter', true)];
var foods2 = new PetFood[new IceCream('Mint chocolate chip'), Cookie('Chocolate chip', false), new Cookie('Peanut butter', true)];
