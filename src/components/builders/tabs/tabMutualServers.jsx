import { UserProfileStore } from '@modules/stores';
import { MutualServerRenderer, NavigationUtils } from '@modules/common';
import { locale } from '@common/locale';
import { Scroller } from './common/scroller';

export function ServersTab({ data, user }) {
    const mutualServers = UserProfileStore.getMutualGuilds(user.id);
    if (mutualServers?.length == 0) {
        return (
            <Scroller type="LIST">
                <div className="empty">
                    <div className="emptyIconGuilds emptyIcon" />
                    <div className="emptyText">{locale.Strings.NO_SERVERS_IN_COMMON()}</div>
                </div>
            </Scroller>
        )
    }
    return (
        <Scroller type="LIST">
            {
                mutualServers.map(mutual => <MutualServerRenderer
                    key={mutual.guild.id}
                    user={user}
                    guild={mutual.guild}
                    nick={mutual?.nick}
                    onSelect={() => { NavigationUtils.transitionToGuild(mutual.guild.id); data.onClose() }}
                />)
            }
        </Scroller>
    )
}