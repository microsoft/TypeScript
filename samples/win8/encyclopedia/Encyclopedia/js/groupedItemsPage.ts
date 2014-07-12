///<reference path='win.ts'/>
///<reference path='data.ts'/>

module GroupedItemsPage {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/html/groupedItemsPage.html", {

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = Data.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = Data.items.dataSource;
                listView.groupDataSource = Data.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var group = Data.groups.getAt(args.detail.itemIndex);
                nav.navigate("/html/groupDetailPage.html", { groupKey: group.key });
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = Data.items.getAt(args.detail.itemIndex);
                nav.navigate("/html/itemDetailPage.html", { item: item });
            }
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headerTemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this.itemInvoked.bind(this);

            var appbarControl = (<any> document.querySelector('#appbar')).winControl;
            appbarControl.hideCommands(['addfavorite', 'removefavorite', 'pin']);
            
            this.initializeLayout(listView, appView.value);
            listView.element.focus();
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {

            var listView = element.querySelector(".groupeditemslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler: (e: Event) => void = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    this.initializeLayout(listView, viewState);
                }
            }
        }
    });



    //"use strict";

    //var appView = Windows.UI.ViewManagement.ApplicationView;
    //var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    //var nav = WinJS.Navigation;
    //var ui = WinJS.UI;
    //var utils = WinJS.Utilities;

    //function updateLayout(element: HTMLElement) {
    //    var listView = element.querySelector(".landingList").winControl;
    //    if (appLayout.value === appLayoutState.snapped) {
    //        ui.setOptions(listView, {
    //            itemDataSource: data.items.dataSource,
    //            itemTemplate: element.querySelector(".itemTemplate"),
    //            groupDataSource: null,
    //            oniteminvoked: itemInvoked
    //        });

    //        listView.layout = new ui.ListLayout();
    //    } else {
    //        var groupDataSource = data.items.createGrouped(groupKeySelector, groupDataSelector).groups;

    //        ui.setOptions(listView, {
    //            itemDataSource: data.items.dataSource,
    //            itemTemplate: element.querySelector(".itemTemplate"),
    //            groupDataSource: groupDataSource.dataSource,
    //            groupHeaderTemplate: element.querySelector(".headerTemplate"),
    //            oniteminvoked: itemInvoked
    //        });
    //        listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
    //    }
    //}

    //function groupKeySelector(item) {
    //    return item.group.key;
    //}

    //function groupDataSelector(item) {
    //    return {
    //        title: item.group.title,
    //        click: function () {
    //            nav.navigate("/html/groupDetailPage.html", { group: item.group });
    //        }
    //    }
    //}

    //function ready(element: HTMLElement, options) {
    //    var appbarControl = (<any> document.querySelector('#appbar')).winControl;
    //    appbarControl.hideCommands(['addfavorite', 'removefavorite', 'pin']);

    //    setupMenu(element);
    //}

    //function itemInvoked(e: {detail: {itemIndex: number; }; }) {
    //    //if (appLayout.value === appLayoutState.snapped) {
    //    //    var group = data.groups.getAt(e.detail.itemIndex);
    //    //    nav.navigate("/html/groupDetailPage.html", { group: group });
    //    //} else {
    //        var item = data.items.getAt(e.detail.itemIndex);
    //        nav.navigate("/html/itemDetailPage.html", { item: item });
    //    //}
    //}

    //function setupMenu(element: HTMLElement) {
    //    var commandList = [];
    //    //data.groups.forEach(function (group) {
    //    //    commandList.push({
    //    //        label: group.title, onclick: function () {
    //    //            nav.navigate("/html/groupDetailPage.html", { group: group });
    //    //        }
    //    //    });
    //    //});

    //    var menu = new ui.Menu(element.querySelector("header[role=banner] .menu"), { commands: commandList });
    //    var title = element.querySelector(".titleArea .win-type-xx-large");

    //    //title.onclick = function (eventObject) { menu.show(title, "bottom", "left"); };
    //    //title.onkeypress = function (eventObject) {
    //    //    if (eventObject.keyCode === utils.Key.enter || eventObject.keyCode === utils.Key.space) {
    //    //        menu.show(title, "bottom", "left");
    //    //    }
    //    //};
    //}

    //ui.Pages.define("/html/groupedItemsPage.html", {
    //    ready: ready,
    //    updateLayout: updateLayout
    //});
}
