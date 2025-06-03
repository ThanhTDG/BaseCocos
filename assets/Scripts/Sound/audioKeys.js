import { SoundType } from "./SoundItem"
const root = "assets/Sounds";
export const AudioKey = {
    MUSIC: 'MUSIC',
    CLICK: 'CLICK',
    COIN: 'COIN',
}
export const AudioKeyMap = {
    [AudioKey.MUSIC]: SoundType.MUSIC,
    [AudioKey.CLICK]: SoundType.Effect,
    [AudioKey.COIN]: SoundType.Effect,
}
export const AudioPathMap = {
    [AudioKey.MUSIC]: `${root}/bgm.mp3`,
    [AudioKey.CLICK]: `${root}/click.mp3`,
    [AudioKey.COIN]: `${root}/coin_counting.mp3`,
}