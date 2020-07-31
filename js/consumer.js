const {
    Face,
    Interest,
    Data,
    Name
} = require('typed-ndn-js');

const face = new Face({
    host: "127.0.0.1",
    port: 6363
});

const interest = new Interest(new Name('/test'));
face.expressInterest(interest, (interest, data) => {        // onData
    console.log(`Receive data: ${data.getContent().toString()}`);
    face.close();
}, interest => {                    // onTimeout
    console.log('onTimeout');
}, (interest, networkNack) => {     // onNack
    console.log(`onNack: ${networkNack.reason}`);
})

