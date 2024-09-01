//// [tests/cases/compiler/discriminatedUnionJsxElement.tsx] ////

//// [discriminatedUnionJsxElement.tsx]
// Repro from #46021

declare namespace JSX {
  interface Element<P, T> { props: P; type: T; }
}

interface IData<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine> {
    menuItemsVariant?: MenuItemVariant;
}

function Menu<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine>(data: IData<MenuItemVariant>) {
    const listItemVariant = data.menuItemsVariant ?? ListItemVariant.OneLine;
    return <ListItem variant={listItemVariant} />;
}

type IListItemData = { variant: ListItemVariant.Avatar; } | { variant: ListItemVariant.OneLine; };

enum ListItemVariant {
    OneLine,
    Avatar,
}

function ListItem(_data: IListItemData) {
    return null; 
}


//// [discriminatedUnionJsxElement.jsx]
"use strict";
// Repro from #46021
function Menu(data) {
    var _a;
    var listItemVariant = (_a = data.menuItemsVariant) !== null && _a !== void 0 ? _a : ListItemVariant.OneLine;
    return <ListItem variant={listItemVariant}/>;
}
var ListItemVariant;
(function (ListItemVariant) {
    ListItemVariant[ListItemVariant["OneLine"] = 0] = "OneLine";
    ListItemVariant[ListItemVariant["Avatar"] = 1] = "Avatar";
})(ListItemVariant || (ListItemVariant = {}));
function ListItem(_data) {
    return null;
}


//// [discriminatedUnionJsxElement.d.ts]
declare namespace JSX {
    interface Element<P, T> {
        props: P;
        type: T;
    }
}
interface IData<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine> {
    menuItemsVariant?: MenuItemVariant;
}
declare function Menu<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine>(data: IData<MenuItemVariant>): JSX.Element<P, T>;
type IListItemData = {
    variant: ListItemVariant.Avatar;
} | {
    variant: ListItemVariant.OneLine;
};
declare enum ListItemVariant {
    OneLine = 0,
    Avatar = 1
}
declare function ListItem(_data: IListItemData): null;


//// [DtsFileErrors]


discriminatedUnionJsxElement.d.ts(10,133): error TS2304: Cannot find name 'P'.
discriminatedUnionJsxElement.d.ts(10,136): error TS2304: Cannot find name 'T'.


==== discriminatedUnionJsxElement.d.ts (2 errors) ====
    declare namespace JSX {
        interface Element<P, T> {
            props: P;
            type: T;
        }
    }
    interface IData<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine> {
        menuItemsVariant?: MenuItemVariant;
    }
    declare function Menu<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine>(data: IData<MenuItemVariant>): JSX.Element<P, T>;
                                                                                                                                        ~
!!! error TS2304: Cannot find name 'P'.
                                                                                                                                           ~
!!! error TS2304: Cannot find name 'T'.
    type IListItemData = {
        variant: ListItemVariant.Avatar;
    } | {
        variant: ListItemVariant.OneLine;
    };
    declare enum ListItemVariant {
        OneLine = 0,
        Avatar = 1
    }
    declare function ListItem(_data: IListItemData): null;
    