const _getIPs = callback => {
    let ips = [];

    let RTCPeerConnection =
        window.RTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection;

    let pc = new RTCPeerConnection({
        // Don't specify any stun/turn servers, otherwise you will
        // also find your public IP addresses.
        iceServers: []
    });
    // Add a media line, this is needed to activate candidate gathering.
    pc.createDataChannel('');

    // onicecandidate is triggered whenever a candidate has been found.
    pc.onicecandidate = function (e) {
        if (!e.candidate) {
            // Candidate gathering completed.
            pc.close();
            callback(ips);
            return;
        }
        /**
         * get candidate which endwith 'network-id 1', it should be the right ip
         */
        let result = /^candidate:.+ (\S+) \d+ typ .* network-id 1/.exec(
            e.candidate.candidate
        );
        if (result) {
            let ip = result[1];
            if (ips.indexOf(ip) == -1) {
                // avoid duplicate entries (tcp/udp)
                ips.push(ip);
            }
        }
    };
    pc.createOffer(
        function (sdp) {
            pc.setLocalDescription(sdp);
        },
        function onerror() {}
    );
}

export const getIPs = () => {
    return new Promise((resolve, reject) => {
        try {
            _getIPs((ips) => {
                resolve(ips)
            })
        } catch (e) {
            reject(e)
        }
    })
}

