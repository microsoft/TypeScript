///<reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js" />
///<reference path="http://connect.facebook.net/en_US/all.js" />

// initialize the library with the API key
FB.init({ appId: '349900301735115' });

// fetch the status on load
FB.getLoginStatus(handleSessionResponse2);

$('#login').bind('click', function () {
    FB.login(handleSessionResponse);
});

$('#logout').bind('click', function () {
    FB.logout(handleSessionResponse);
});

function handleSessionResponse2() { }
// handle a session response from any of the auth related calls
function handleSessionResponse() {
    FB.api('/me', function (response) {
        console.dir(response);
        //$('#user-info').html(response.id + ' - ' + response.name);
    });
    FB.api('/me/picture', function (response) {
        console.dir(response);
        var img = document.createElement('img');
        img.src = response;
        document.body.appendChild(img);
    });
}
