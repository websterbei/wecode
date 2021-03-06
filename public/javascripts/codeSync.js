//Creating peer for text communication to sync code
var codeSyncPeer;

generateCodeSyncPeerAndListen();

function generateCodeSyncPeerAndListen() {
  if(!codeSyncPeer || !codeSyncPeer.id) {
    codeSyncPeer = new Peer({host: "tan90.tech", port: 8080, path: "/peerjs", secure: true, debug:true, config: peerConfig});
    codeSyncPeer.on('open', function(id) {
      setCookie('codeSyncId', id, 3);
      codeSyncPeer.on('connection', function(conn) {
        setCookie('peerCodeSyncId', conn.peer, 3);
        conn.on('open', function() {
          conn.on('data', function(data) {
            console.log(data);
            incomingCodeHandler(data);
          });
          editor.session.on('change', function (delta) {
            if (editor.curOp && editor.curOp.command.name) {
              conn.send(delta);
            }
          });
        });
      });
    });
  }
}

function codeSyncInitializer() {
  generateCodeSyncPeerAndListen();
  if(codeSyncPeer && codeSyncPeer.id) {
    var codeSyncId = codeSyncPeer.id;
  } else {
    var codeSyncId = null;
  }
  if(codeSyncId) {
    document.getElementById('codeSyncId').value = codeSyncId;
  } else {
    document.getElementById('codeSyncId').value = "Waiting for code";
  }
}

function initiateCodeSync() {
  if(codeSyncPeer && codeSyncPeer.id) {
    var codeSyncId = codeSyncPeer.id;
  } else {
    var codeSyncId = null;
  }
  var input = document.getElementById('codeSyncId').value;
  if(input!==codeSyncId) {
    let peerCodeSyncId = input;
    setCookie('peerCodeSyncId', peerCodeSyncId, 3);
    var conn = codeSyncPeer.connect(peerCodeSyncId);
    conn.on('open', function() {
      conn.on('data', function(data) {
        incomingCodeHandler(data);
      });
      editor.session.on('change', function (delta) {
        if (editor.curOp && editor.curOp.command.name) {
          conn.send(delta);
        }
      });
    });
  }
}

function incomingCodeHandler(data) {
  var curDocument = editor.session.getDocument();
  curDocument.applyDeltas([data]);
}
