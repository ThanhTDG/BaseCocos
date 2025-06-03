export class AudioItem {
    constructor({ id = null, audioClip = null }) {
        this.id = id;
        this.audioClip = audioClip;
    }
    setAudioClip(audioClip) {
        this.id = null;
        this.audioClip = audioClip;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    static createDefault() {
        return new SoundPlayItem();
    }

}