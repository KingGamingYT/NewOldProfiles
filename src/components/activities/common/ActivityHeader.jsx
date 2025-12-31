import { ChannelStore, GuildStore, useStateFromStores } from '@modules/stores';
import { locale } from '@common/locale';
import { headers } from '@methods/activities/headers';
import { activityCheck } from '@common/check';

export function ActivityHeader({activity, voice, stream, check}) {
    const filterCheck = activityCheck({activities: [activity]});
    const channel = useStateFromStores([ ChannelStore ], () => ChannelStore.getChannel(voice));
    let result;

    switch (true) {
        case !! stream: result = locale.Strings.STREAMING_TO({ server: GuildStore.getGuild(channel.guild_id)?.name || channel.name || locale.Strings.DIRECT_MESSAGE }); break;
        case !! voice: result = locale.Strings.IN_A_VOICE_CHANNEL; break;
        case !! [1].includes(activity?.type): result = locale.Strings.LIVE_ON({ platform: (activity?.name || locale.Strings.STREAM) }); break;
        case !! ([2, 3].includes(activity?.type)): result = headers[activity.type] + activity?.name; break;
        case !! (filterCheck?.xbox || filterCheck?.playstation): result = locale.Strings.PLAYING_ON({ platform: activity?.platform }); break;
        default: result = headers[activity.type];
    }
    return <h3 className="headerTextNormal headerText" style={{ color: "var(--white)", marginBottom: "8px" }}>{result}</h3>;
}