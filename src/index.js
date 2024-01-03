import { sequence } from '0xsequence';

let connectButton, emailHolder, addressHolder;

const wallet = sequence.initWallet({
    projectAccessKey: 'QymuJkTf4nZUoMTWRo3qyUPAAAAAAAAAA'
});

function handleConnectWallet(event) {
    if (!wallet.isConnected()) {
        wallet.connect({
            app: 'Sequence Demo',
            authorize: true,
            askForEmail: true,
        }).then((connectDetails) => {
            updateState();

            if (!connectDetails.connected) {
                return;
            }

            console.log(connectDetails);
            console.log("Wallet: ", connectDetails.session.accountAddress);
            console.log("Email: ", connectDetails.email);

            addressHolder.innerHTML = connectDetails.session.accountAddress;
            emailHolder.innerHTML = connectDetails.email;
        }).catch((error) => {
            console.log(error);
        });
    } else {
        wallet.disconnect().then(() => {
            console.log("Disconnected");

            updateState();
        }).catch((error) => {
            console.log(error);
        });
    }
}

function generateUI() {
    const wrapper = document.createElement('div');
    
    connectButton = document.createElement('button');
  
    connectButton.addEventListener('mouseup', handleConnectWallet, false);

    wrapper.appendChild(connectButton);

    emailHolder = document.createElement("p");
    addressHolder = document.createElement("p");

    wrapper.appendChild(emailHolder);
    wrapper.appendChild(addressHolder);
  
    return wrapper;
  }

  function updateState() {
    if (wallet.isConnected()) {
        connectButton.innerHTML = "Disconnect";
    } else {
        connectButton.innerHTML = "Connect Wallet";
        emailHolder.innerHTML = "";
        addressHolder.innerHTML = "";
    }
  }
  
  document.body.appendChild(generateUI());

  updateState();
