const { AudioKey } = require("./Enum/AudioKey");
const Emitter = require("./Event/Emitter");
const { AudioPath } = require("./Sound/AudioConfigs");
const { SoundController } = require("./Sound/SoundController");
const { loadAudioClip } = require("./Utils/FileUtils");

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.loadSound();
    },
    start() {

    },
    loadSound() {
        Object.keys(AudioPath).forEach(key => {
            const path = AudioPath[key];
            loadAudioClip(path, key, (clip) => {
                console.log(key);
                SoundController.instance.setAudioClip(key, clip);
                if (key === AudioKey.MUSIC) {
                    SoundController.instance.play(AudioKey.MUSIC, true);
                }
            });
        });
    },
    onDestroy() {
        SoundController.instance.destroy();
        Emitter.instance.destroy();
    }
});
