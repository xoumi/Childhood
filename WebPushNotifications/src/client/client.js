//Register Worker
function registerWorker() {
  //If Browser supports serviceWorker
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('worker.js').then( reg => {
      reg.pushManager.getSubscription().then( sub => {
        if(sub === null) {
          subscribeUser();
          sendSubscription(sub);
        } else
          sendSubscription(sub);
      });
    });
  }
}

//Fetch public key from server then subscribe to push notifications
async function subscribefUser() {
  let response = await fetch('/api/publicKey');
  let responseJson = await response.json();
  let publicKey = responseJson.publicKey;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then( reg => {
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      }).then(sub => console.log('Subscribed', sub));
    });
  }
}

//Send the Subscription JSON Object to the Backend using POST request
function sendSubscription(sub) {
  console.log(JSON.stringify(sub));
  fetch('/sendsub', {
    method: 'POST',
    body: JSON.stringify(sub),
    headers: {
      'content-type': 'application/json'
    }
  }).then( res => {
    if (!res.ok) throw new Error('Could not send to Server');
    return res.json();
  }).then(resData => {
    if (!resData.data.success) throw new Error('Could not save to db');
  });
}

//Helper function to convert datatype of key for transfer through HTTP
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

registerWorker();
