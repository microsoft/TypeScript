///<reference path='win.ts'/>
///<reference path='data.ts'/>

module GroupDetailPage {
    "use strict";

    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var views = Windows.UI.ViewManagement;
    var group: Data.Group;
    var items;

    function updateLayout(element: HTMLElement) {
        var listView = element.querySelector(".groupList").winControl;

        if (views.ApplicationView.value === views.ApplicationViewState.snapped) {
            listView.layout = new ui.ListLayout();
        } else {
            listView.layout = new ui.GridLayout({ groupHeaderPosition: "left" });
        }
    }

    function ready(element: HTMLElement, options: { group: Data.Group; }) {
        group = (options && options.group) ? options.group : Data.groups.getAt(0);
        items = Data.getItemsFromGroup(group);
        var pageList = items.createGrouped(
            function (item) { return group.key; },
            function (item) { return group; }
            );
        var groupDataSource = pageList.groups.dataSource;

        element.querySelector("header[role=banner] .win-type-xx-large").textContent = group.title;
        setupMenu(element);

        var listView = element.querySelector(".groupList").winControl;
        ui.setOptions(listView, {
            itemDataSource: pageList.dataSource,
            itemTemplate: element.querySelector(".itemTemplate"),
            groupDataSource: pageList.groups.dataSource,
            groupHeaderTemplate: element.querySelector(".headerTemplate"),
            oniteminvoked: itemInvoked
        });
    }

    function itemInvoked(e) {
        var item = items.getAt(e.detail.itemIndex);
        nav.navigate("/html/itemDetailPage.html", { item: item });
    }

    function setupMenu(element: HTMLElement) {
        var commandList = [];
        Data.groups.forEach(function (group) {
            commandList.push({
                label: group.title, onclick: function () {
                    nav.navigate("/html/groupDetailPage.html", { group: group });
                }
            });
        });

        var menu = new ui.Menu(element.querySelector("header[role=banner] .menu"), { commands: commandList });
        var title = <HTMLElement>element.querySelector(".titleArea .win-type-xx-large");

        title.onclick = function (eventObject) { menu.show(title, "bottom", "left"); };
        title.onkeypress = function (eventObject) {
            if (eventObject.keyCode === utils.Key.enter || eventObject.keyCode === utils.Key.space) {
                menu.show(title, "bottom", "left");
            }
        };
    }

    ui.Pages.define("/html/groupDetailPage.html", {
        ready: ready,
        updateLayout: updateLayout
    });
}
