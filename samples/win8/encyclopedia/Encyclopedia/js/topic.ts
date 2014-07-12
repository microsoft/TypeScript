///<reference path='win.ts'/>
///<reference path='data.ts'/>

interface Topic {
    group: any;
    title: string;
    imageSrc: string;
    localImageSrc: string;
    htmlContent: any;
}

var topiccache: { [name: string]: Topic } = {};

function createTopicFromUrl(url: string, group: Data.Group): Topic {
    var encodedName = url.slice(url.lastIndexOf('/') + 1);
    var title = decodeURIComponent(encodedName).replace('_', ' ');
    return createTopicFromTitle(title, group);
}

function downloadImageAndStoreLocal(bodyInnerText: string, topic: Topic) {
    var imageSrc = findImage(bodyInnerText);
    WinJS.xhr({ url: imageSrc, responseType: "blob" }).then(function (xhr) {
        var blob = xhr.response;
        topic.imageSrc = URL.createObjectURL(blob);
        var encodedImageUri = imageSrc.slice(imageSrc.lastIndexOf('/') + 1);
        topic.localImageSrc = encodedImageUri;
        Windows.Storage.ApplicationData.current.localFolder.createFileAsync(encodedImageUri, Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
            file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (ras) {
                var inputStream = blob.msDetachStream().getInputStreamAt(0);
                var outputStream = ras.getOutputStreamAt(0);
                Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, outputStream).then(function () {
                    inputStream.close();
                    return outputStream.flushAsync();
                }).done();
            }).then(function () {
                Windows.Storage.ApplicationData.current.localSettings.values[topic.title + "image"] = encodedImageUri;
            });
        });
    });
}

function createTopicFromTitle(title: string, group: Data.Group): Topic {
    var topic = topiccache[title + "--" + (group && group.title)];
    if (topic)
        return topic;

    // Create the topic as a databindable object
    topic = WinJS.Binding.as({
        group: group,
        title: title,
        imageSrc: null,
        localImageSrc: null
    });

    // Kick off the work to aquire the HTML content
    var url = "http://en.wikipedia.org/w/index.php?title=" + encodeURI(title);

    var htmlContentPromise: WinJS.Promise<string>;
    var localContent = Windows.Storage.ApplicationData.current.localSettings.values[title];

    // 
    htmlContentPromise = localContent ? retrieveCached(topic) : downloadAndCacheLocally(topic);

    // Don't want the topic to be tracked by the observable (TODO: I'm sure there is a 'better' way to do this)
    topic.htmlContent = htmlContentPromise;

    topiccache[title + "--" + (group && group.title)] = topic;
    return topic;
}

function retrieveCached(topic: Topic) {
    // If content is already available locally:
    // 1) set the htmlContentPromise to read it from disk
    // 2) in parallel, grab the image from disk and display it.
    var title = topic.title;
    var encodedTitle = encodeURIComponent(title);
    var htmlContentPromise = WinJS.Application.local.readText(encodedTitle + ".html");
    var localImageSrc = <string>Windows.Storage.ApplicationData.current.localSettings.values[title + "image"];
    topic.localImageSrc = localImageSrc;

    Windows.Storage.ApplicationData.current.localFolder.getFileAsync(localImageSrc)
        .then(function (file) {
            return file.openAsync(Windows.Storage.FileAccessMode.read);
        }).then(function (ras) {
            var blob = MSApp.createBlobFromRandomAccessStream("image/png", ras);
            topic.imageSrc = URL.createObjectURL(blob);
        }).then(null, function (err) {
            // The image file wasn't available for some reason,
            // retry downloading the image.
            return htmlContentPromise.then(function (bodyInnerHtml) {
                downloadImageAndStoreLocal(bodyInnerHtml, topic);
            });
        }).done();

    return htmlContentPromise;
}

function downloadAndCacheLocally(topic: Topic) {
    // If content is *not* already available locally, set htmlContentPromise to do the following:
    // 1) read it from the network
    // 2) then write it to local disk
    // 2.5) also record in local settings that it is stored locally
    // 3) find the associated image
    // 4) set that as the databound imageSrc
    // 5) write the image to disk
    // 5.5) also record in local settings that it is stored locally
    var title = topic.title;
    var url = "http://en.wikipedia.org/w/index.php?title=" + encodeURI(title);
    var htmlContentPromise = WinJS.xhr({ url: url })
        .then(function (result) {
            var text = <string>result.response;
            var bodyStartStart = text.indexOf("<body");
            var bodyStartEnd = text.indexOf(">", bodyStartStart) + 1;
            var bodyEndStart = text.indexOf("</body>");
            text = text.slice(bodyStartEnd, bodyEndStart);
            text = text.replace(/"\/\//g, '"http://');
            return text;
        });

    var encodedTitle = encodeURIComponent(title);

    var bodyInnerText: string = null;
    htmlContentPromise.then(function (innerText) {
        bodyInnerText = innerText;
        // Store text to local storage
        return WinJS.Application.local.writeText(encodedTitle + ".html", bodyInnerText);
    }).then(function () {
            Windows.Storage.ApplicationData.current.localSettings.values[title] = encodedTitle + ".html";
            // Download the image and store to local storage
            return downloadImageAndStoreLocal(bodyInnerText, topic);
    }).done(null, function (err) {
        if (err instanceof XMLHttpRequest) {
            return;
        } else {
            throw err;
        }
    });
    return htmlContentPromise;
}

function findImage(bodyHtml: string) {
    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = toStaticHTML(bodyHtml);
    var imgs: HTMLImageElement[] = Array.prototype.slice.call(dummyDiv.getElementsByTagName('img'), 0);
    imgs = imgs.filter(function (img) {
        var widthAttr = img.attributes["width"];
        if (!widthAttr) return false;
        var keep = (+widthAttr.value) > 100;
        return keep;
    });
    imgs.forEach(function (img, i) {
        img.attributes["width"].value *= (1 - (i / imgs.length) / 2);
        img.attributes["height"].value *= (1 - (i / imgs.length) / 2);
    });
    imgs.sort(function (img1, img2) {
        var awidth = +img1.attributes["width"].value;
        var aheight = +img1.attributes["height"].value;
        var bwidth = +img2.attributes["width"].value;
        var bheight = +img2.attributes["height"].value;
        return Math.min(bwidth, bheight) - Math.min(awidth, aheight);
    });
    var jpgs = imgs.filter(function (img) {
        var s = img.src;
        if (s.slice(s.length - 4) == ".jpg" || s.slice(s.length - 5) == ".jpeg")
            return true;
        return false;
    });
    if (jpgs.length > 0 && (+jpgs[0].attributes["width"].value > 100) && (+jpgs[0].attributes["height"].value > 100)) {
        return jpgs[0].src;
    } else if (imgs.length > 0) {
        return (<HTMLImageElement>imgs[0]).src;
    } else {
        return "http://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png";
    }
}

function noInternetConnection(err) {
    var flyout = new Windows.UI.Popups.MessageDialog("No internet connection");
    flyout.showAsync().done();
}
