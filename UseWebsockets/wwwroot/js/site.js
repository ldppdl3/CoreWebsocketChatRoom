// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var server = 'ws://localhost:17848'; //如果开启了https则这里是wss

var WEB_SOCKET = new WebSocket(server + '/ws');

WEB_SOCKET.onopen = function (evt) {
    console.log('Connection open ...');
    $('#msgList').val('websocket connection opened .');
};

WEB_SOCKET.onclose = function (evt) {
    console.log('Connection closed.');
    $('#msgList').val('websocket connection closed .');
};

WEB_SOCKET.onmessage = function (evt) {
    debugger;
    console.log('Received Message: ' + evt.data);
    if (evt.data) {
        var content = $('#msgList').val();
        content = content + '\r\n' + evt.data;

        $('#msgList').val(content);
    }
};

$('#btnJoin').on('click', function () {
    var roomNo = $('#txtRoomNo').val();
    var nick = $('#txtNickName').val();
    if (roomNo) {
        var msg = {
            action: 'join',
            msg: roomNo,
            nick: nick
        };
        WEB_SOCKET.send(JSON.stringify(msg));
    }
});

$('#btnSend').on('click', function () {
    var message = $('#txtMsg').val();
    var nick = $('#txtNickName').val();
    if (message) {
        var msg = {
            action: 'send_to_room',
            msg: message,
            nick: nick
        };
        WEB_SOCKET.send(JSON.stringify(msg));
    }
});

$('#btnLeave').on('click', function () {
    var nick = $('#txtNickName').val();
    var msg = {
        action: 'leave',
        msg: '',
        nick: nick
    };
    WEB_SOCKET.send(JSON.stringify(msg));
});