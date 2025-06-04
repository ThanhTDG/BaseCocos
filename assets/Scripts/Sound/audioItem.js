export class AudioItem {
    constructor({ id = null, clip = null } = {}) {
        this.id = id;
        this.clip = clip;
    }
    setClip(clip) {
        this.id = null;
        this.clip = clip;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    static createDefault() {
        return new AudioItem();
    }

}