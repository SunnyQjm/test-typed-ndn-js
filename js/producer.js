const {
    Face,
    KeyChain,
    PibMemory,
    TpmBackEndMemory,
    Data,
    SafeBag,
    Blob,
    Name
} = require('typed-ndn-js');
const fs = require('fs');

const face = new Face({
    host: "localhost",
    port: 6363
});
const keyChain = new KeyChain(new PibMemory(), new TpmBackEndMemory());

// import safe bag
keyChain.importSafeBag(new SafeBag(new Blob(fs.readFileSync("./qjm.safebag"))));

face.setCommandSigningInfo(keyChain, keyChain.getDefaultCertificateName());
face.registerPrefix(new Name('/test'), (prefix, interest, face, interestFilterId, filter) => {
    console.log(`receive interest: ` + interest.toUri());
    const data = new Data(interest.getName());
    data.setContent("hello");
    keyChain.sign(data);
    face.putData(data);
}, prefix => {
    console.log("register failed");
}, (prefix, registeredPrefixId) => {
    console.log("register success");
})

