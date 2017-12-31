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

## Local Test

### Step 1
Install homebrew
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Step 2
Install node.js and npm using homebrew
```bash
brew install node
```

### Step 3
cd into the folder where wecode.js resides, and run the following command
```bash
npm install nodemon -g
```
This should install nodemon for you. Nodemon is used to watch the changes in the source folder and restart the express app when code changes.

### Step 4
In the same folder, run the command
```bash
sudo nodemon wecode.js
```
This should start the WeCode framework at port 443.

### Step 5
You are now able to access WeCode at https://127.0.0.1
Note that your browser may warn you against your access because of the mismatch between the SSL certificate and the actual url. However, this will not be an issue and you should be able to proceed by dismissing the warning.
