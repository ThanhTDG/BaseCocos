const { AudioItem } = require("./audioItem");
const { AudioKeyMap } = require("./audioKeys");
const { SoundItemValidator, SoundItem, SoundType } = require("./SoundItem");

class SoundController {
    static _instance = null;

    constructor() {
        this.soundMap = {};
        this.audioMap = {};
        this._initMaps();
    }

    static get instance() {
        if (!SoundController._instance) {
            SoundController._instance = new SoundController();
        }
        return SoundController._instance;
    }

    _initMaps() {
        Object.values(SoundType).forEach(type => {
            this.soundMap[type] = SoundItem.createDefault(type);
        });
        Object.keys(AudioKeyMap).forEach(key => {
            this.audioMap[key] = AudioItem.createDefault();
        });
    }
    getSoundMap() {
        return this.soundMap;
    }

    playSound(audioKey, loop = false) {
        const audioItem = this.getAudioItem(audioKey);
        const soundType = this.getTypeByKey(audioKey);
        if (!audioItem || !audioItem.audioClip) {
            cc.error(`Audio item or clip not found for key: ${audioKey}`);
            return;
        }
        const id = this.play(soundType, audioItem.audioClip, loop);
        if (id == null) {
            cc.error(`Failed to play sound for key: ${audioKey}`);
            return;
        }
        if (!loop) {
            cc.audioEngine.setFinishCallback(id, () => {
                audioItem.setId(null);
            });
        }
        audioItem.setId(id);
    }

    stopSound(audioKey) {
        const audioItem = this.getAudioItem(audioKey);
        if (audioItem && audioItem.getId() != null) {
            cc.audioEngine.stop(audioItem.getId());
            audioItem.setId(null);
        }
    }

    setDefault(type) {
        this.soundMap[type] = SoundItem.createDefault(type);
        this.updateVolume(type);
    }

    setAllDefault() {
        Object.values(SoundType).forEach(type => this.setDefault(type));
        this.updateVolume(SoundType.MASTER);
    }

    getTypeByKey(key) {
        const soundType = AudioKeyMap[key];
        if (!soundType) {
            cc.error(`Invalid audio key: ${key}`);
            return null;
        }
        return soundType;
    }

    getSoundItem(type) {
        SoundItemValidator.validateType(type);
        return this.soundMap[type];
    }

    getAudioItem(audioKey) {
        return this.audioMap[audioKey];
    }

    setSoundItem(soundItem) {
        const { type } = soundItem;
        this.soundMap[type] = soundItem;
        this.updateVolume(type);
    }

    updateVolume(type) {
        Object.keys(this.audioMap).forEach(key => {
            const audioItem = this.audioMap[key];
            const soundType = this.getTypeByKey(key);
            if (!audioItem || !soundType) return;
            if (soundType === type || type === SoundType.MASTER) {
                this.setVolume(audioItem.getId(), soundType);
            }
        });
    }

    calculateVolume(type) {
        const soundItem = this.getSoundItem(type);
        const masterItem = this.getSoundItem(SoundType.MASTER);
        if (!soundItem.canPlay() || !masterItem.canPlay()) {
            return 0;
        }
        return soundItem.volume * masterItem.volume;
    }

    setVolume(id, type) {
        if (id == null) return;
        const volume = this.calculateVolume(type);
        cc.audioEngine.setVolume(id, volume);
    }

    play(type, clip, loop = false) {
        const volume = this.calculateVolume(type);
        return cc.audioEngine.play(clip, loop, volume);
    }

    setAudioClip(audioKey, audioClip) {
        const audioItem = this.getAudioItem(audioKey);
        if (!audioItem) {
            cc.error(`Invalid audio key: ${audioKey}`);
            return;
        }
        audioItem.setAudioClip(audioClip);
    }

    stopAllSound() {
        cc.audioEngine.stopAll();
        Object.values(this.audioMap).forEach(audioItem => {
            if (audioItem) audioItem.setId(null);
        });
    }

    destroy() {
        this.soundMap = {};
        this.audioMap = {};
        cc.audioEngine.stopAll();
        SoundController._instance = null;
    }
}

module.exports = SoundController;