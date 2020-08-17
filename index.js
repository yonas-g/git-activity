const app = require("./src/app");

module.exports = {
    commit: app.makeCommit,
    addRemote: app.addRemote,
    init: app.init,
};
