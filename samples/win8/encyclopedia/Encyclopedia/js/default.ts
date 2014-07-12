///<reference path='win.ts'/>
///<reference path='topic.ts'/> 

module Default {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    //WinJS.strictProcessing();
    
    var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();
    searchPane.onquerysubmitted = function (ev: Windows.ApplicationModel.Search.ISearchPaneQuerySubmittedEventArgs) {
        var topic = createTopicFromTitle(ev.queryText, null);
        WinJS.Navigation.navigate('/html/itemDetailPage.html', { item: topic });
    }

    searchPane.onsuggestionsrequested = function (ev: Windows.ApplicationModel.Search.SearchPaneSuggestionsRequestedEventArgs) {
        var deferral = ev.request.getDeferral();
        var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=20&search='
            + encodeURI(ev.queryText);
        WinJS.xhr({ url: url }).then(function (xhr) {
            var data = JSON.parse(xhr.response);
            ev.request.searchSuggestionCollection.appendQuerySuggestions(data[1]);
            deferral.complete();
        });
    }

    var settingsPane = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
    settingsPane.oncommandsrequested = function (ev: Windows.UI.ApplicationSettings.SettingsPaneCommandsRequestedEventArgs) {
        ev.request.applicationCommands.push(new Windows.UI.ApplicationSettings.SettingsCommand("1", "Encyclopedia Settings", function (a) {
            var panel = document.getElementById('KnownSettingsCommand.Preferences');
            WinJS.UI.process(panel);
        }));
    };

    app.addEventListener("activated", function (args: WinJS.Application.ApplicationActivationEvent) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            var launchEv = <Windows.ApplicationModel.Activation.LaunchActivatedEventArgs>args.detail;

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    if (launchEv.arguments !== '') {
                        var topic = createTopicFromTitle(launchEv.arguments, null);
                        nav.navigate('/html/itemDetailPage.html', { item: topic });
                    } else {
                        return nav.navigate(Encyclopedia.navigator.home);
                    }
                }
            }));
        } else if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.search) {
            var searchEv = <Windows.ApplicationModel.Activation.SearchActivatedEventArgs>args.detail;
            WinJS.UI.processAll();
            var topic = createTopicFromTitle(searchEv.queryText, null);
            WinJS.Navigation.navigate('/html/itemDetailPage.html', { item: topic });
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
}
