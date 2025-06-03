const { VolumeValidate, EnumValidate } = require("../Utils/validatesUtils");

export const SoundType = cc.Enum({
    MASTER: "MASTER",
    MUSIC: "MUSIC",
    EFFECT: "EFFECT",
})
class SoundConfig {
    static default = {
        [SoundType.MASTER]: { volume: 1.0, enable: true },
        [SoundType.MUSIC]: { volume: 1.0, enable: true },
        [SoundType.Effect]: { volume: 1.0, enable: true },
    };

    static get(type) {
        return this.default[type];
    }
}

export class SoundItemValidator {
    static validateType(type) {
        if (!EnumValidate(type, SoundType)) {
            throw new Error(`Invalid sound type: ${type}`);
        }
    }

    static validateVolume(volume) {
        if (VolumeValidate(volume) === false) {
            throw new Error(`Invalid volume: ${volume}. Volume must be a number between 0 and 1.`);
        }
    }

    static validateEnable(enable) {
        if (typeof enable !== 'boolean') {
            throw new Error(`Invalid enable value: ${enable}. Enable must be a boolean.`);
        }
    }
}

export class SoundItem {
    constructor(type, volume, enable) {
        this.type = type;
        this.volume = volume;
        this.enable = enable;
    }

    setVolume(volume) {
        SoundItemValidator.validateVolume(volume);
        this.volume = volume;
    }

    setEnable(enable) {
        SoundItemValidator.validateEnable(enable);
        this.enable = enable;
    }

    canPlay() {
        return this.enable && this.volume > 0;
    }

    static getDefaultConfig() {
        return SoundConfig.default;
    }

    static create(type, volume, enable) {
        SoundItemValidator.validateType(type);
        SoundItemValidator.validateVolume(volume);
        SoundItemValidator.validateEnable(enable);
        return new SoundItem(type, volume, enable);
    }

    static createDefault(type) {
        const config = SoundConfig.get(type);
        return new SoundItem(type, config.volume, config.enable);
    }
}