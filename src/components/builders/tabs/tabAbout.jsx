import { Data } from 'betterdiscord';
import { StreamerModeStore } from '@modules/stores';
import { PronounsBuilder, BioBuilder, RoleBuilder, MemberDateBuilder, NoteBuilder, BoardButtonBuilder, ConnectionCards } from './common/infoSections';
import { StreamerModeView } from './common/streamerModeView';
import { Scroller } from './common/scroller';

export function AboutTab({ data, user, displayProfile }) {
    const connections = displayProfile._userProfile.connectedAccounts;
    if (StreamerModeStore.hidePersonalInformation) {
        return (
            <Scroller type="INFO">
                <StreamerModeView />
            </Scroller>
        )
    }
    return (
        <Scroller type="INFO" padding={12}>
            {displayProfile?.pronouns && <PronounsBuilder displayProfile={displayProfile} />}
            <BioBuilder displayProfile={displayProfile} />
            <RoleBuilder user={user} data={data} displayProfile={displayProfile} />
            <MemberDateBuilder data={data} user={user} />
            <NoteBuilder user={user} />
            {Data.load('boardTab') && user.id === data.currentUser.id && <BoardButtonBuilder user={user} />}
            <ConnectionCards user={user} connections={connections} />
            <div aria-hidden={true} style={{ pointerEvents: "none", minHeight: "0px", minWidth: "1px", flex: "0 0 auto", height: "8px" }}></div>
        </Scroller>
    )
}