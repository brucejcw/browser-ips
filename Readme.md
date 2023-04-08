## Browser ips

RTCPeerConnection is an API used for WebRTC connections that can be used to retrieve the IP addresses of local and remote devices. When you use RTCPeerConnection to get the local IP address on a web page, the browser's security mechanisms prevent the page from obtaining the local IP address information to protect the user's privacy.

However, when you use RTCPeerConnection to get the local IP address in a Chrome extension, the extension has higher privileges and wider access, so it can obtain the local IP address information.

It is worth noting that the behavior of the WebRTC API in Chrome extensions may differ slightly from standard WebRTC behavior, so you should be extra careful when developing extensions to ensure that your extension complies with Chrome's extension development guidelines and security requirements.

### Install
`npm i browser-ips`

### Usage
```javascript
import { getIPs } from 'browser-ips'

getIPs().then((ips) => {
    console.log(ips[0])
})
```

