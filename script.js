window.addEventListener('load', () => {
    checkInternetConnection();
    setInterval(checkInternetConnection, 5000); // check every 5 sec
});

function checkInternetConnection() {
    const statusText = document.getElementById('statusText');
    const ipAddressText = document.getElementById('ipAddressText');
    const networkStrengthText = document.getElementById('networkStrengthText');

    if (navigator.onLine) {
        statusText.textContent = 'Connected';

        // IP address fetch
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                ipAddressText.textContent = data.ip;
            });

        // Speed test using image
        const image = new Image();
        const imageSizeInBytes = 2300000; // 2.3MB image
        const startTime = new Date().getTime();

        image.onload = function () {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000; // seconds
            const bitsLoaded = imageSizeInBytes * 8;
            const speedMbps = (bitsLoaded / duration / 1024 / 1024).toFixed(2);

            networkStrengthText.style.color = 'red';
            networkStrengthText.textContent = speedMbps + ' Mbps';
            setTimeout(() => {
                networkStrengthText.style.color = 'green';
            }, 500);
        };

        image.onerror = function () {
            networkStrengthText.style.color = 'gray';
            networkStrengthText.textContent = 'Speed check failed';
        };

        // Prevent cache by appending random query
        image.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?cache=' + Math.random();
    } else {
        statusText.textContent = 'Disconnected';
        ipAddressText.textContent = '-';
        networkStrengthText.textContent = '-';
    }
}