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
        for(let item of result.result) {
          let peerId = item.split(':').slice(-1)[0];
          if(peerId==id) continue;
          var peerCodeInput = document.getElementById('peerCodeInput');
          peerCodeInput.value = peerId;
          break;
        }
      }
    });
  }
  return sendHeartBeat;
}
