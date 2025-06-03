const { AudioPathMap } = require("./Sound/audioKeys");
const SoundController = require("./Sound/SoundController");
const { loadAudioClip } = require("./Utils/fileUtils");

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.loadSound();
    },
    loadSound() {
        Object.keys(AudioPathMap).forEach(key => {
            const path = AudioPathMap[key];
            loadAudioClip(path, key, (audioKey, clip) => {
                SoundController.instance.setAudioClip(audioKey, clip);
            });
        });
    },
});
