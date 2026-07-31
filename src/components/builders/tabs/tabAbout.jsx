import { Data } from 'betterdiscord';
import { RelationshipStore, StreamerModeStore } from '@modules/stores';
import { PronounsBuilder, BioBuilder, RoleBuilder, MemberDateBuilder, FriendsSince, NoteBuilder, BoardButtonBuilder, ConnectionCards, PrivateProfileNotice, FailedToLoadProfileNotice } from './common/infoSections';
import { StreamerModeView } from './common/streamerModeView';
import { Scroller } from './common/scroller';

export function AboutTab({ data, user, currentUser, displayProfile }) {
    const connections = displayProfile._userProfile.connectedAccounts;
    const relationship = RelationshipStore.getRelationshipType(user.id);
    if (StreamerModeStore.hidePersonalInformation) {
        return (
            <Scroller type="INFO">
                <StreamerModeView />
            </Scroller>
        )
    }
    return (
        <Scroller type="INFO" padding={12}>
            {displayProfile._userProfile?.fetchError && <FailedToLoadProfileNotice />}
            {displayProfile?.private && <PrivateProfileNotice username={user.globalName || user.username} />}
            {displayProfile?.pronouns && <PronounsBuilder displayProfile={displayProfile} />}
            <BioBuilder displayProfile={displayProfile} />
            <RoleBuilder user={user} data={data} displayProfile={displayProfile} />
            <MemberDateBuilder data={data} user={user} />
            {relationship === 1 && <FriendsSince user={user} />}
            <NoteBuilder user={user} />
            {Data.load('boardTab') && user.id === currentUser.id && <BoardButtonBuilder user={user} />}
            <ConnectionCards user={user} connections={connections} />
            <div aria-hidden={true} style={{ pointerEvents: "none", minHeight: "0px", minWidth: "1px", flex: "0 0 auto", height: "8px" }}></div>
        </Scroller>
    )
}