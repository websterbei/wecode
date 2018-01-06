//heartbeat function
function heartBeatFactory(roomName, id) {
  function sendHeartBeat() {
    $.post({
      url: '/userInRoom',
      data: {
        roomName: roomName,
        peerId: id
      },
      success: function(result) {
        console.log('heartbeat');
        console.log(result);
        var peerCodeInput = document.getElementById('peerCodeInput');
        peerCodeInput.value = "";
        for(let item of result.result) {
          let peerId = item.split(':').slice(-1)[0];
          if(peerId==id) continue;
          peerCodeInput.value = peerId;
          break;
        }
      }
    });
  }
  return sendHeartBeat;
}
