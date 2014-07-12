//// [recursivelySpecializedConstructorDeclaration.ts]
module MsPortal.Controls.Base.ItemList {

    export interface Interface<TValue> {
        // Removing this line fixes the constructor of ItemValue
        options: ViewModel<TValue>;
    }    

    export class ItemValue<T> {
        constructor(value: T) {
        }
    }    
 
    export class ViewModel<TValue> extends ItemValue<TValue> {
    }
}

// Generates:
/*
declare module MsPortal.Controls.Base.ItemList {
    interface Interface<TValue> {
        options: ViewModel<TValue>;
    }
    class ItemValue<T> {
        constructor(value: T);
    }
    class ViewModel<TValue> extends ItemValue<TValue> {
    }
}
*/

//// [recursivelySpecializedConstructorDeclaration.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MsPortal;
(function (MsPortal) {
    (function (Controls) {
        (function (Base) {
            (function (ItemList) {
                var ItemValue = (function () {
                    function ItemValue(value) {
                    }
                    return ItemValue;
                })();
                ItemList.ItemValue = ItemValue;

                var ViewModel = (function (_super) {
                    __extends(ViewModel, _super);
                    function ViewModel() {
                        _super.apply(this, arguments);
                    }
                    return ViewModel;
                })(ItemValue);
                ItemList.ViewModel = ViewModel;
            })(Base.ItemList || (Base.ItemList = {}));
            var ItemList = Base.ItemList;
        })(Controls.Base || (Controls.Base = {}));
        var Base = Controls.Base;
    })(MsPortal.Controls || (MsPortal.Controls = {}));
    var Controls = MsPortal.Controls;
})(MsPortal || (MsPortal = {}));
// Generates:
/*
declare module MsPortal.Controls.Base.ItemList {
interface Interface<TValue> {
options: ViewModel<TValue>;
}
class ItemValue<T> {
constructor(value: T);
}
class ViewModel<TValue> extends ItemValue<TValue> {
}
}
*/
