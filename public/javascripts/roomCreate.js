function createRoom() {
  console.log('Here');
  var roomName = document.getElementById('roomName').value;
  console.log(roomName);
  $.post({
    url: "createRoom",
    data: {
      roomName: roomName
    },
    success: function(result) {
      if(result.status) $('#alertMessageContent').html('Succeed');
      else $('#alertMessageContent').html(result.reason);
      $('#alertMessage').show();
    }
  });
}
