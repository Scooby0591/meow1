let videoStream;
let scanner;

function requestCameraPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Get back camera by specifying facingMode: environment
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function (stream) {
                videoStream = stream;
                document.getElementById('qr-video').srcObject = stream;
                document.getElementById('permission-request').style.display = 'none';
                document.getElementById('scanner').style.display = 'block';
            })
            .catch(function (err) {
                alert('Camera permission denied.');
            });
    }
}

function toggleFlashlight() {
    const videoTrack = videoStream.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities();
    if (capabilities.torch) {
        const torchState = videoTrack.getSettings().torch ? false : true;
        videoTrack.applyConstraints({ advanced: [{ torch: torchState }] });
    }
}

function uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            // Assuming we use some QR code scanner library here, like `jsQR`
            const qrCode = jsQR(e.target.result, file.width, file.height);
            if (qrCode) {
                document.getElementById('qr-url').value = qrCode.data;
                document.getElementById('url-display').style.display = 'block';
            } else {
                alert('No QR code detected in the image.');
            }
        };
        reader.readAsDataURL(file);
    };
}

function copyURL() {
    const url = document.getElementById('qr-url');
    url.select();
    document.execCommand('copy');
    alert('URL copied to clipboard!');
}
