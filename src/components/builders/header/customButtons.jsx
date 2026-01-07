import { ContextMenu } from 'betterdiscord'; 
import { useState, useRef } from 'react';
import { locale } from '@common/locale';
import { BlockToasts, ButtonClasses, Popout, PopoutContainer, RelationshipUtils } from '@modules/common';
import { TooltipBuilder } from '@components/common/TooltipBuilder';

function BlockedPopout({ userId, close }) {
    return (
        <ContextMenu.Menu navId="blocked-overflow" onClose={close}>
            <ContextMenu.Item id="user-context-block" label={locale.Strings.UNBLOCK()} action={() => { return RelationshipUtils.unblockUser(userId), BlockToasts.showUnblockSuccessToast(userId) }} />
        </ContextMenu.Menu>
    )
}

export function BlockedPopoutButton({ user }) {
    const [showPopout, setShowPopout] = useState(false);
    const refDOM = useRef(null);

    return (
        <Popout
            targetElementRef={refDOM}
            clickTrap={true}
            onRequestClose={() => setShowPopout(false)}
            renderPopout={() => <PopoutContainer position="right"><BlockedPopout userId={user.id} close={() => setShowPopout(false)} /></PopoutContainer>}
            position="right"
            shouldShow={showPopout}>
            {(props) => <span
                {...props}
                ref={refDOM}
                onClick={() => { setShowPopout(true) }}>
                <TooltipBuilder note={locale.Strings.MORE()}>
                    <button className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary}`} type={"button"}>
                        <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                            <div className={`${ButtonClasses.buttonChildren}`}>
                                <svg className={`${ButtonClasses.icon}`} role="img" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </TooltipBuilder>
            </span>}
        </Popout>
    )
}

export function AcceptButton({ user }) {
    return (
        <button
            className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText} ${ButtonClasses.active}`}
            type={"button"}
            onClick={() => RelationshipUtils.acceptFriendRequest({ userId: user.id })}>
            <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                <div className={`${ButtonClasses.buttonChildren}`}>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>{locale.Strings.ACCEPT()}</div>
                </div>
            </div>
        </button>
    )
}

export function IgnoreButton({ user }) {
    return (
        <button
            className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText} primaryFilled`}
            type={"button"}
            onClick={() => RelationshipUtils.cancelFriendRequest(user.id)}>
            <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                <div className={`${ButtonClasses.buttonChildren}`}>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>{locale.Strings.IGNORE()}</div>
                </div>
            </div>
        </button>
    )
}
