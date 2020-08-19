const fs = require("fs");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";

const git = simpleGit();

/**
 * commit to remote repository
 * @param {Number} n Number of commits
 */
const makeCommit = (n) => {
    if (n === 0) {
        console.log("pushing...");
        return git.push("origin", "master");
    }

    const x = Math.floor(Math.random() * 54);
    const y = Math.floor(Math.random() * 6);

    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d")
        .format();

    const data = {
        date,
    };

    fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
        } else {
            git.add([FILE_PATH]).commit(
                date,
                { "--date": date },
                makeCommit.bind(this, --n)
            );
        }
    });
};

/**
 * Initialize empty git repository
 */
const init = () => {
    return git.init();
};

/**
 * Add remote github repository
 * @param {String} remote
 */
const addRemote = (remote) => {
    git.addRemote("origin", remote, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Remote Added");
        }
    });
};

module.exports = {
    makeCommit,
    addRemote,
    init,
};
