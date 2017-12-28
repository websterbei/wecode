var proxyList = [{url:'stun:stun01.sipphone.com'},
            {url:'stun:stun.ekiga.net'},
            {url:'stun:stun.fwdnet.net'},
            {url:'stun:stun.ideasip.com'},
            {url:'stun:stun.iptel.org'},
            {url:'stun:stun.rixtelecom.se'},
            {url:'stun:stun.schlund.de'},
            {url:'stun:stun.l.google.com:19302'},
            {url:'stun:stun1.l.google.com:19302'},
            {url:'stun:stun2.l.google.com:19302'},
            {url:'stun:stun3.l.google.com:19302'},
            {url:'stun:stun4.l.google.com:19302'},
            {url:'stun:stunserver.org'},
            {url:'stun:stun.softjoys.com'},
            {url:'stun:stun.voiparound.com'},
            {url:'stun:stun.voipbuster.com'},
            {url:'stun:stun.voipstunt.com'},
            {url:'stun:stun.voxgratia.org'},
            {url:'stun:stun.xten.com'},
            {
              url: 'turn:turn.anyfirewall.com:443?transport=tcp',
              credential: 'webrtc',
              username: 'webrtc'
            },
            {
              url: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com'
            },
            {
              url: 'turn:192.158.29.39:3478?transport=udp',
              credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
              username: '28224511:1379330808'
            }];
var peerConfig = {'iceServers': proxyList};
//Creating peer object through peerjs server
var peer = new Peer({host: "wecode.datinker.com", port: 8080, path: "/peerjs", secure: true, debug:true, config: peerConfig});
//Open socket, get personal ID and display ID
peer.on('open', function(id) {
  document.getElementById('myCode').innerHTML = id;
  document.getElementById('myCodeInvisible').value = id;
});

peer.on('call', function(call) {
  navigator.getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    document.getElementById('selfView').srcObject = stream;
    call.on('stream', function(remoteStream) { //receiving A/V stream
      peerView = document.getElementById('peerView');
      peerView.srcObject = remoteStream;
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});

function connect() {
  var peerCodeInput = document.getElementById('peerCodeInput');
  var peerCode = peerCodeInput.value; //Get peer ID
  navigator.getUserMedia({video: true, audio:true}, function(stream) {
    var call = peer.call(peerCode, stream); //Make call request, sending A/V stream
    document.getElementById('selfView').srcObject = stream;
    call.on('stream', function(remoteStream) { //If received stream, put to video object
      peerView = document.getElementById('peerView');
      peerView.srcObject = remoteStream;
    });
  }, function(err) {
    console.log('Failed', err);
  });
};
