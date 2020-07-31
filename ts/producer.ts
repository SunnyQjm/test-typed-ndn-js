import {
    Face,
    KeyChain, PibMemory, SafeBag, TpmBackEndMemory,
    Blob,
    Name,
    Data
} from 'typed-ndn-js';

import * as fs from 'fs';

const face = new Face({
    host: '127.0.0.1'
});

const keyChain = new KeyChain(new PibMemory(), new TpmBackEndMemory());
keyChain.importSafeBag(new SafeBag(new Blob(fs.readFileSync('./qjm.safebag'))));

face.setCommandSigningInfo(keyChain, keyChain.getDefaultCertificateName());

face.registerPrefix(new Name('/test'), (prefix, interest, face1, filterId, filter) => {
    console.log(`receive interest: ` + interest.toUri());
    const data = new Data(interest.getName());
    data.setContent("hello");
    keyChain.sign(data);
    face.putData(data);
}, prefix => {
    console.log("register failed");
}, (prefix, registeredPrefixId) => {
    console.log("register success");
});