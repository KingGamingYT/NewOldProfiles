import { UserStore, VoiceStateStore } from '@modules/stores'

export function getVoiceParticipants({voice}) {
    let participants = [];
    const channelParticipants = Object.keys(VoiceStateStore.getVoiceStatesForChannel(voice));
    for (let i = 0; i < channelParticipants.length; i++) {
        participants.push(UserStore.getUser(channelParticipants[i]))
    }
    return participants;
}