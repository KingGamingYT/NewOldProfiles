import { GameProfile } from '@modules/common';

export function GameProfileOpen({gameId, userId}) {
    return (
        GameProfile.openGameProfileModal({
            applicationId: gameId,
            gameProfileModalChecks: {
                shouldOpenGameProfile: true,
                applicationId: gameId
            },
            source: "tony",
            sourceUserId: userId,
            appContext: {}    
        })
    )
}