import React from 'react';
import { Webpack, Patcher } from 'betterdiscord';
import { PopUtils, MessageButtons } from '@modules/common';
import { intl, ButtonClasses, Tooltip } from '../modules.js';

function getIntlString(hash, parameter) {
    if (parameter) return intl.intl.formatToPlainString(intl.t[`${hash}`], parameter);
    return intl.intl.formatToPlainString(intl.t[`${hash}`]);
}

let MessageButtonLarge;
let MessageButtonSmall;
let MoreOverflowButton;
let SendFriendRequestButton;
let EditProfileButton;
let BotAddButton;
let MarkdownFormat;
let NoteRenderer;
let ConnectionRenderer;
let Board;
let RolePermissionCheck;
let TagRenderer;
let MutualFriends;
let MutualServers;

export function MessageButtonLargeComponent({ autoFocus, onClose, userId }) {
    MessageButtonLarge ??= Webpack.getByStrings("let{userId", ",{variant", '"primary",', { searchExports: true });
    return <MessageButtonLarge autoFocus={autoFocus} onClose={() => PopUtils.popAll()} userId={userId} text={getIntlString("YzpScd")} />;
}

export function MessageButtonSmallComponent({ onClose, userId, variant }) {
    MessageButtonSmall ??= Webpack.getByStrings("userId", "tooltipText:", ",variant", "{text", { searchExports: true });
    return <MessageButtonSmall onClose={() => PopUtils.popAll()} userId={userId} variant={variant} />;
}

export function MoreOverflowButtonComponent({ user }) {
    MoreOverflowButton ??= Webpack.getMangled("user-profile-overflow-menu", {
        Button: Webpack.Filters.byStrings("popoutTargetRef")
    });
    return <MoreOverflowButton.Button user={user} />;
}

export function SendFriendRequestButtonComponent({ autoFocus, userId, variant }) {
    SendFriendRequestButton ??= Webpack.getMangled("SEND_FRIEND_REQUEST,icon", {
        SendFriendRequest: Webpack.Filters.combine(Webpack.Filters.byStrings("{userId:"), Webpack.Filters.not(Webpack.Filters.byStrings("tooltipText")))
    });
    return <SendFriendRequestButton.SendFriendRequest autoFocus={autoFocus} userId={userId} variant={variant} text={getIntlString("gc9aSx")} />;
}

export function PendingRequestButton() {
    return (
        <button
            className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText}`}
            type="button"
            disabled={true}
            style={{ opacity: 0.6, cursor: "default" }}
        >
            <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                <div className={`${ButtonClasses.buttonChildren}`} style={{ fontSize: "14px", fontWeight: "500" }}>
                    {getIntlString("xMH6vD")}
                </div>
            </div>
        </button>
    );
}

export function EditProfileButtonComponent({ user }) {
    EditProfileButton ??= Webpack.getByStrings("trackUserProfileAction", "EDIT_PROFILE", { searchExports: true });
    return <EditProfileButton user={user} />;
}

export function BotAddButtonComponent({ user }) {
    BotAddButton ??= Webpack.getByStrings('"user-bot-profile-add-app"');
    return <BotAddButton user={user} text={getIntlString("E64YCz")} />;
}

export function MarkdownComponent({ userBio }) {
    MarkdownFormat ??= Webpack.getByStrings("userBio", "disableAnimations");
    return <MarkdownFormat className="userBio" userBio={userBio} />;
}

export function NoteComponent({ userId }) {
    NoteRenderer ??= Webpack.getByStrings("hidePersonalInformation", "onUpdate", "placeholder");
    return <NoteRenderer className="note" userId={userId} />;
}

export function ConnectionComponent({ connectedAccount, userId }) {
    ConnectionRenderer ??= Webpack.getByStrings("connectedAccount", "connectedAccountOpenIcon", "CONNECTED_ACCOUNT_VIEWED", { searchExports: true });
    return <ConnectionRenderer className="connectedAccount" connectedAccount={connectedAccount} userId={userId} showMetadata={false} />;
}

export function BoardEditRenderer({ user }) {
    Board ??= Webpack.getByStrings("data-scroller", "fade:!0,", { searchExports: true });
    return <Board user={user} />;
}

export function RolePermissionHook({ guildId }) {
    RolePermissionCheck ??= Webpack.getByStrings(".ADMINISTRATOR", ".MANAGE_MESSAGES");
    return RolePermissionCheck({ guildId });
}

export function WidgetTagRenderer({ tags, widgetType, className }) {
    TagRenderer ??= Webpack.getBySource('"EXPAND_GAME_TAGS"', { declarationFilter: (x) => String(x).includes('"EXPAND_GAME_TAGS"') });
    return <TagRenderer tags={tags} widgetType={widgetType} className={className} />;
}

export function MutualFriendRenderer({ user, status, guildId, onSelect }) {
    MutualFriends ??= Webpack.getByStrings("MODAL_V2", "discriminatorClass");
    return <MutualFriends user={user} status={status} guildId={guildId} onSelect={onSelect} />;
}

export function MutualServerRenderer({ key, user, guild, nick, onSelect }) {
    MutualServers ??= Webpack.getByStrings("hasAvatarForGuild", "nick");
    return <MutualServers key={key} user={user} guild={guild} nick={nick} onSelect={onSelect} />;
}
