import { ActivityTimer, MediaProgressBar, VoiceIcon, VoiceList } from '@modules/common';
import { GuildStore, RelationshipStore, useStateFromStores } from '@modules/stores';
import { getVoiceParticipants } from '@methods/activities/getVoiceParticipants';
import { activityCheck } from '@common/check';
import { locale } from '@common/locale';

function Header({ activity, channel, check }) {
    const guildChannel = useStateFromStores([ GuildStore ], () => GuildStore.getGuild(channel?.guild_id));
    if (channel) {
        const nickname = useStateFromStores([ RelationshipStore ], () => RelationshipStore.getNickname(guildChannel.ownerId || channel.getRecipientId()))
        return (
            <h3 className="textRow" style={{ display: "flex", alignItems: "center" }}>
                {VoiceIcon({ channel: channel })}
                <h3 className="nameWrap nameNormal textRow" style={{ fontWeight: "600" }}>{channel.name || nickname}</h3>
            </h3>
        )
    }
    if (!activity) return;
    let result = activity.name;
    if ([1, 2, 3].includes(activity?.type)) result = activity.details;
    return (
        <div className="nameNormal textRow ellipsis" style={{ fontWeight: "600" }}>{result}</div>
    )
}

function ActivityType({ type, filterCheck, activity, voice, channel, stream }) {
    const guildChannel = useStateFromStores([ GuildStore ], () => GuildStore.getGuild(channel?.guild_id));
    switch (type) {
        case "PLAYING": return (
            <>
                {!(filterCheck?.listening || filterCheck?.watching) && <div className="details textRow ellipsis">{activity.details}</div>}
                <div className="state textRow ellipsis">{
                    activity?.state && activity?.party && activity?.party?.size ?
                        `${activity.state} (${activity.party.size[0]} of ${activity.party.size[1]})`
                        :
                        activity?.party && activity?.party?.size ?
                            `Party: (${activity.party.size[0]} of ${activity.party.size[1]})`
                            :
                            activity.state
                }
                </div>
                {
                    activity?.timestamps?.end ? <div className="mediaProgressBarContainer">
                        <MediaProgressBar start={activity?.timestamps?.start || activity?.created_at} end={activity?.timestamps?.end} />
                    </div>
                        : <ActivityTimer activity={activity} />
                }
            </>
        );
        case "TWITCH": return (
            <>
                {activity.state && <div className="state textRow ellipsis">{`${locale.Strings.PLAYING} ${activity.state}`}</div>}
            </>
        )
        case "SPOTIFY": return (
            <>
                {activity.state && <div className="details textRow ellipsis">{`by ${activity.state}`}</div>}
                {activity.assets?.large_text && <div className="state textRow ellipsis">{`on ${activity.assets?.large_text}`}</div>}
                {
                    activity?.timestamps?.end ? <div className="mediaProgressBarContainer">
                        <MediaProgressBar start={activity?.timestamps?.start} end={activity?.timestamps?.end} />
                    </div>
                        : <ActivityTimer activity={activity} />
                }
            </>
        )
        case "VOICE": return (
            <>
                { 
                    guildChannel?.name && 
                    <div className="state textRow ellipsis">
                        {locale.Strings.IN_CHANNEL({ channelName: guildChannel?.name })}
                    </div> 
                }
            </>
        )
        case "STREAM": return (
            <>
                <VoiceList
                    className="userList"
                    users={getVoiceParticipants({ voice })}
                    maxUsers={getVoiceParticipants({ voice }).length}
                    guildId={stream.guildId}
                    channelId={stream.channelId}
                />
            </>
        )
    }
}

export function FlexInfo(props) {
    const { className, style, activity, voice, stream, channel, check, type } = props
    const filterCheck = activityCheck({ activities: [activity] });

    return (
        <div className={className} style={style}>
            <Header activity={activity} channel={channel} check={check} />
            <ActivityType filterCheck={filterCheck} activity={activity} voice={voice} stream={stream} channel={channel} type={type} />
        </div>
    )
}