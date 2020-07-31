import {
    Face,
    Interest,
    Name
} from 'typed-ndn-js';

const face = new Face({
    host: '127.0.0.1'
});

const interest = new Interest(new Name('/test'));
face.expressInterest(interest, (interest1, data) => {
    console.log(`Receive data: ${data.getContent().toString()}`);
    face.close();
}, interest1 => {
    console.log('onTimeout');
}, (interest1, nack) => {
    console.log(`onNack: ${nack.getReason()}`);
});