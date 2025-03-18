//// [tests/cases/compiler/recursivelySpecializedConstructorDeclaration.ts] ////

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
var MsPortal;
(function (MsPortal) {
    let Controls;
    (function (Controls) {
        let Base;
        (function (Base) {
            let ItemList;
            (function (ItemList) {
                class ItemValue {
                    constructor(value) {
                    }
                }
                ItemList.ItemValue = ItemValue;
                class ViewModel extends ItemValue {
                }
                ItemList.ViewModel = ViewModel;
            })(ItemList = Base.ItemList || (Base.ItemList = {}));
        })(Base = Controls.Base || (Controls.Base = {}));
    })(Controls = MsPortal.Controls || (MsPortal.Controls = {}));
})(MsPortal || (MsPortal = {}));
