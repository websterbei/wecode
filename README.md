# WeCode
WeCode is a WebApp and also a framework that provides Peer to Peer coding tutoring experience, and it is also suited for technical interview or basic coding collaboration.

The interface of WeCode is simplistic, and consists of three panels: the coding section, the video chat section and the console section. Users do programming in the coding section while connected with peers through the interface in the video chat section. They will run the code in the editor and obtain output through the console. Code synchronization between two peers is supported.

## Deployment
Deployment of the WeCode framework is simple:
  1. Clone the repo
  2. Replace the ssl credentials in the ./ssl folder and make necessary changes in the wecode.js file
  3. Run wecode.js and peerServer.js

## Explanation
wecode.js will provide the functionalities that support the capabilities of the framework and peerServer.js will start a signaling system for the WebRTC framework used in WeCode framework.
