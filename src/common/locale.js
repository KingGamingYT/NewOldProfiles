import { Data } from 'betterdiscord';
import { getIntlString } from './getIntlString';
import { tabs } from './tabs';

export const locale = {
    Sections: {
        MUTUAL_FRIENDS: tabs.FRIENDS,
        MUTUAL_GUILDS: tabs.SERVERS,
        WIDGETS: Data.load('boardTab') ? tabs.BOARD : null
    },
    Strings: {
        ABOUT_ME: () => getIntlString('61W33d'),
        ACCEPT: () => getIntlString('MMlhsr'),
        BOARD: () => getIntlString('laViwx'),
        BOT: () => getIntlString('AOdOYr'),
        COMPETING_IN: (name) => getIntlString('QQ2wVE', name),
        CREATED_ON: () => getIntlString('A//N4k'),
        CUSTOM_STATUS: () => getIntlString('Q7eoCR'),
        DATA_ACCESS: () => getIntlString('QzDgMq'),
        DIRECT_MESSAGE: () => getIntlString('jN2DfZ'),
        EDIT: () => getIntlString('bt75uw'),
        FAVORITE_GAME: () => getIntlString('sUQar8'),
        GAME_ICON_FOR: (game) => getIntlString('nh+jWk', game),
        GAMES_I_LIKE: () => getIntlString('scOKET'),
        GAMES_IN_ROTATION: () => getIntlString('SqNnus'),
        IGNORE: () => getIntlString('xuio0C'),
        IN_A_VOICE_CHANNEL: () => getIntlString('grGyaf'),
        IN_CHANNEL: (channel) => getIntlString('Xe4de2', channel),
        INFO: () => getIntlString('HY+vdA'),
        LISTENING_TO: (name) => getIntlString('NF5xop', name),
        LIVE_ON: (platform) => getIntlString('Dzgz4u', platform),
        MEMBER_SINCE: () => getIntlString('xcKP1P'),
        MORE: () => getIntlString('UKOtz+'),
        MUTUAL_FRIENDS: () => getIntlString('afBKs5'),
        MUTUAL_SERVERS: () => getIntlString('sySsXR'),
        NO_FRIENDS_IN_COMMON: () => getIntlString('/5p4gx'),
        NO_SERVERS_IN_COMMON: () => getIntlString('zjVh8h'),
        NOTE: () => getIntlString('PbMNh2'),
        PLAYING: () => getIntlString('BMTj28'),
        PLAYING_A_GAME: () => getIntlString('2TbM/G'),
        PLAYING_ON: (platform) => getIntlString('A17aM8', platform),
        PROFILE_WIDGETS: () => getIntlString('Jzj9q4'),
        PRONOUNS: () => getIntlString('1w6drw'),
        ROLE: () => getIntlString('XPGZXP'),
        ROLES: () => getIntlString('2SZsWX'),
        SEND_FRIEND_REQUEST: () => getIntlString('gc9aSx'),
        SEND_MESSAGE: () => getIntlString('YzpScd'),
        STREAM: () => getIntlString('5AyH/p'),
        STREAMING: (name) => getIntlString('4CQq9Q', name),
        STREAMER_MODE_ENABLED: () => getIntlString('Br1ls3'),
        STREAMING_GAME_IN: (game, server) => `${getIntlString('4CQq9Q', game)} ${getIntlString('5YBAcS', server)}`,
        STREAMING_TO: (server) => getIntlString('sddlGK', server),
        UNBLOCK: () => getIntlString('Hro40y'),
        USER: () => getIntlString('E466pL'),
        WANT_TO_PLAY: () => getIntlString('bWSQwW'),
        WATCHING: (name) => getIntlString('pW3Ip3', name)
    }
}