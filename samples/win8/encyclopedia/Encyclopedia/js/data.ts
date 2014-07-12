///<reference path='win.ts'/>
///<reference path='topic.ts'/>
///<reference path='navigator.ts'/>

module Data {
    "use strict";

    export interface UserData {
        favorites: string[];
        recent: string[];
        today: string[];
    }

    export interface Group {
        key: string;
        title: string;
    }

    interface Groups {
        [idx: string]: Group;
    }

    var groupsHash = <Groups>(<any>{
        recent: { key: 'recent', title: 'Recent' },
        favorites: { key: 'favorites', title: 'Favorites' },
        today: { key: 'today', title: 'Today' },
        nearby: { key: 'xxnearby', title: 'Nearby' }
    });

    var list = new WinJS.Binding.List([]);

    function saveUserData() {
        Windows.Storage.ApplicationData.current.localSettings.values["userdata"] = JSON.stringify(userData);
    }

    var userdatastring: string = Windows.Storage.ApplicationData.current.localSettings.values["userdata"];
    var userData: UserData;
    //if (userdatastring != null) {
    //    userData = JSON.parse(userdatastring);
    //} else {
    userData = {
        favorites: ['Topology', 'Windows 8', 'Windows Phone 7'],
        recent: ['Einstein', 'Quantum Field Theory', 'Einstein Field Equations', 'Macleay\'s Swallowtail', 'Gödel metric'],
        today: ['Transformers', 'XBox', 'Mount Rainier', 'Independence Day (film)', 'Independence Day', 'Roland Emmerich', 'Padmanabhaswamy Temple']
    };
    saveUserData();
    //} 
    Object.keys(userData).forEach(function (groupName) {
        msSetImmediate(function () { populate(groupName, userData[groupName]); });
    });

    function populate(groupName: string, itemTitles: string[]) {
        for (var i = 0; i < itemTitles.length; i++) {
            list.push(createTopicFromTitle(itemTitles[i], groupsHash[groupName]));
        }
    }
    var locator = new Windows.Devices.Geolocation.Geolocator();
    locator.getGeopositionAsync().then(function (pos) {
        var lat = pos.coordinate.latitude;
        var long = pos.coordinate.longitude;
        var url = 'http://api.wikilocation.org/articles?radius=100000&limit=10&lat=' + lat + '&lng=' + long;
        return WinJS.xhr({ url: url });
    }).then(function (xhr) {
            var data = JSON.parse(xhr.responseText);
            addTopicsToGroup(data.articles, groupsHash['nearby']);
        }).done();

    function addTopicsToGroup(articles: { title: string; }[], group: Data.Group) {
        articles.forEach(function (article) {
            msSetImmediate(function () {
                list.push(createTopicFromTitle(article.title, group));
            });
        });
    }

    export function addFavorite(title: string) {
        if (userData.favorites.indexOf(title) == -1) {
            userData.favorites.push(title);
            saveUserData();
            var topic = createTopicFromTitle(title, groupsHash['favorites'])
            list.push(topic);
            Encyclopedia.addToTile(title, topic.localImageSrc);
        }
    }

    export function removeFavorite(title: string) {
        var i = userData.favorites.indexOf(title);
        if (i != -1) {
            userData.favorites.splice(i, 1);
            saveUserData();
            var j = list.indexOf(createTopicFromTitle(title, groupsHash['favorites']));
            if (j != -1) {
                list.splice(j, 1);
            }
        }
    }

    var groupedItems = list.createGrouped(groupKeySelector, groupDataSelector);

    function groupKeySelector(item) {
        return item.group.key;
    }

    function groupDataSelector(item) {
        return item.group;
    }

    export function getItemsFromGroup(group: Group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    export var items = groupedItems;
    export var groups = groupedItems.groups;
    export function getItemReference(item) {
        return [item.group.key, item.title];
    }
}
