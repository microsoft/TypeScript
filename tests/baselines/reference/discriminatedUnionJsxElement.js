//// [tests/cases/compiler/discriminatedUnionJsxElement.tsx] ////

//// [discriminatedUnionJsxElement.tsx]
// Repro from #46021

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
interface IData<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine> {
    menuItemsVariant?: MenuItemVariant;
}
declare function Menu<MenuItemVariant extends ListItemVariant = ListItemVariant.OneLine>(data: IData<MenuItemVariant>): any;
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
