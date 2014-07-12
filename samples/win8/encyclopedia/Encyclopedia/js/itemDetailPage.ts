///<reference path='win.ts'/>
///<reference path='topic.ts'/>
///<reference path='data.ts'/>

module ItemDetailPage {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    function ready(element: HTMLElement, options: { item: Topic; }) {

        var item: Topic = options && options.item ? options.item : Data.items.getAt(0);
        element.querySelector(".titlearea .pagetitle").textContent = item.title;
        var content = <HTMLElement>element.querySelector('.content');
        goToPage(content, item);
        document.body.focus();
        setupMenu(element);

        var appbarControl = document.querySelector('#appbar').winControl;
        appbarControl.showCommands(['addfavorite', 'removefavorite', 'pin']);
        var pin = appbarControl.getCommandById('pin');
        pin.onclick = function handler() {
            var uri = new Windows.Foundation.Uri("ms-appdata:///local/" + item.localImageSrc);
            var tile = new Windows.UI.StartScreen.SecondaryTile();
            tile.tileId = encodeURIComponent(item.title);
            tile.displayName = item.title;
            tile.shortName = item.title;
            tile.arguments = item.title;
            tile.tileOptions = Windows.UI.StartScreen.TileOptions.showNameOnLogo;
            tile.logo = uri;
            tile.foregroundText = Windows.UI.StartScreen.ForegroundText.light;
            tile.requestCreateAsync().done();
        }
    }

    function setupMenu(elements: Element) {
        var commandList = [];
        var menu = new ui.Menu(elements.querySelector('header[role=banner] .menu'), { commands: commandList });
        var title = elements.querySelector('.titleArea .win-type-xx-large');
    }


    function goToPage(rootElem: HTMLElement, topic: Topic) {

        topic.htmlContent.done(function(bodyInnerText: string) {
            //document.querySelector(".win-contentTitle").innerText = topic.title;
            MSApp.execUnsafeLocalFunction(function() {
                rootElem.innerHTML = toStaticHTML(bodyInnerText);
                Array.prototype.forEach.call(rootElem.querySelectorAll('*[href]'), function(a: HTMLAnchorElement) {
                    a.addEventListener("click", function(ev) {
                        //console.log("Clicked: " + ev.target + ", " + ev.currentTarget.href);
                        ev.preventDefault();
                        var url = a.href;
                        if (url.indexOf('ms-appx:') == 0) {
                            var i = a.href.lastIndexOf('\/');
                            var topicRef = decodeURIComponent(a.href.slice(i + 1)).replace(/_/g, " ");
                            var topic = createTopicFromTitle(topicRef, null);
                            WinJS.Navigation.navigate("/html/itemDetailPage.html", { item: topic });
                        }
                        else {
                            var dialog = new Windows.UI.Popups.MessageDialog("This link will take you to an external page.  Would you like to launch the browser?", "Open external browser?");
                            dialog.commands.push(new Windows.UI.Popups.UICommand("launch browser", function() {
                                // External page
                                Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(url)).done();
                            }));
                            dialog.commands.push(new Windows.UI.Popups.UICommand("cancel", function() { }));
                            dialog.showAsync().done();
                        }
                    })
                });
            });

        }, noInternetConnection);
    }

    function refreshCurrent(element: Element) {
        var title = element.querySelector(".itemDetailPage header[role=banner] .pagetitle").textContent;
        var topic = createTopicFromTitle(title, null);
        downloadAndCacheLocally(topic);
        goToPage(<HTMLElement>element.querySelector('.content'), topic);
    }

    ui.Pages.define("/html/itemDetailPage.html", {
        ready: ready,
        refreshCurrent: refreshCurrent
    });
}
