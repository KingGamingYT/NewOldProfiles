import { UserProfileStore } from '@modules/stores';
import { ModalAccessUtils, MutualFriendRenderer } from '@modules/common';
import { locale } from '@common/locale';
import { Scroller } from './common/scroller';

export function FriendsTab({ data, user }) {
    const mutualFriends = UserProfileStore.getMutualFriends(user.id)
    if (!mutualFriends || mutualFriends?.length == 0) {
        return (
            <Scroller type="LIST">
                <div className="empty">
                    <div className="emptyIconFriends emptyIcon" />
                    <div className="emptyText">{locale.Strings.NO_FRIENDS_IN_COMMON()}</div>
                </div>
            </Scroller>
        )
    }

    return (
        <Scroller type="LIST">
            {
                mutualFriends.map(mutual => <MutualFriendRenderer
                    user={mutual.user}
                    status={mutual.status}
                    guildId={mutual.displayProfile?.guildId}
                    onSelect={() => { ModalAccessUtils.openUserProfileModal({ userId: mutual.user.id }); data.onClose() }}
                />)
            }
        </Scroller>
    )
}