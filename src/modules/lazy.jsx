import { Webpack } from 'betterdiscord';
import { PopUtils, MessageButtons } from '@modules/common';

let MessageButtonLarge;
let MessageButtonSmall;
let FriendsButton;
let MoreOverflowButton;
let FriendAddButton;
let EditProfileButton;
let BotAddButton;
let MarkdownFormat;
let NoteRenderer;
let ConnectionRenderer;
let BotDataRenderer;
let Board;
let RolePermissionCheck;
let TagRenderer;
let MutualFriends;
let MutualServers;

function MessageButtonLargeComponent({ autoFocus, onClose, userId }) {
    MessageButtonLarge ??= Webpack.getByStrings("let{userId", ",{variant", '"primary",', { searchExports: true});

    return <MessageButtonLarge autoFocus={autoFocus} onClose={() => PopUtils.popAll()} userId={userId} />
}
function MessageButtonSmallComponent({ onClose, userId, variant }) {
    MessageButtonSmall ??= Webpack.getByStrings("userId", "tooltipText:", ",variant", "{text", { searchExports: true });

    return <MessageButtonSmall onClose={() => PopUtils.popAll()} userId={userId} variant={variant} />
}
function FriendsButtonComponent({ relationshipType, shouldShowTooltip, type, themeColor, user }) {
    FriendsButton ??= Webpack.getByStrings('menuItems', 'relationshipType', { searchExports: true });

    return <FriendsButton relationshipType={relationshipType} shouldShowTooltip={shouldShowTooltip} type={type} themeColor={themeColor} user={user} />
}
function MoreOverflowButtonComponent({ user }) {
    MoreOverflowButton ??= Webpack.getMangled('user-profile-overflow-menu', {
        Button: Webpack.Filters.byStrings('popoutTargetRef')
    });

    return <MoreOverflowButton.Button user={user} />
}
function FriendAddButtonComponent({ autoFocus, userId, variant }) {
    FriendAddButton ??= Webpack.getMangled('SEND_FRIEND_REQUEST,icon', {
        AddFriend: Webpack.Filters.combine(Webpack.Filters.byStrings('{userId:'), Webpack.Filters.not(Webpack.Filters.byStrings('tooltipText')))
    });

    return <FriendAddButton.AddFriend autoFocus={autoFocus} userId={userId} variant={variant} />
}
function EditProfileButtonComponent({ user }) {
    EditProfileButton ??= Webpack.getByStrings('trackUserProfileAction', 'EDIT_PROFILE', { searchExports: true });

    return <EditProfileButton user={user} />
}
function BotAddButtonComponent({ user }) {
    BotAddButton ??= Webpack.getByStrings('"user-bot-profile-add-app"');

    return <BotAddButton user={user} />
}
function MarkdownComponent({ userBio }) {
    MarkdownFormat ??= Webpack.getByStrings('userBio', 'disableAnimations');

    return <MarkdownFormat className="userBio" userBio={userBio} />
}
function NoteComponent({ userId }) {
    NoteRenderer ??= Webpack.getByStrings('hidePersonalInformation', 'onUpdate', 'placeholder');

    return <NoteRenderer className="note" userId={userId} />
}
function ConnectionComponent({ connectedAccount, userId }) {
    ConnectionRenderer ??= Webpack.getByStrings('connectedAccount', 'connectedAccountOpenIcon', 'CONNECTED_ACCOUNT_VIEWED', { searchExports: true });

    return <ConnectionRenderer className="connectedAccount" connectedAccount={connectedAccount} userId={userId} showMetadata={false} />
}
function BoardEditRenderer({ user }) {
    Board ??= Webpack.getByStrings('data-scroller', 'fade:!0,', {searchExports: true});

    return <Board user={user} />
}
function RolePermissionHook({ guildId }) {
    RolePermissionCheck ??= Webpack.getByStrings('.ADMINISTRATOR', '.MANAGE_MESSAGES');

    return RolePermissionCheck({guildId});
}
function WidgetTagRenderer({ tags, widgetType, className }) {
    TagRenderer ??= Webpack.getBySource('"EXPAND_GAME_TAGS"', {declarationFilter: x => String(x).includes('"EXPAND_GAME_TAGS"')});

    return <TagRenderer tags={tags} widgetType={widgetType} className={className} />
}
function MutualFriendRenderer({user, status, guildId, onSelect}) {
    MutualFriends ??= Webpack.getByStrings('MODAL_V2', 'discriminatorClass');

    return <MutualFriends user={user} status={status} guildId={guildId} onSelect={onSelect} />
}
    
function MutualServerRenderer({key, user, guild, nick, onSelect}) {
    MutualServers ??= Webpack.getByStrings('hasAvatarForGuild', 'nick');

    return <MutualServers key={key} user={user} status={status} guild={guild} nick={nick} onSelect={onSelect} />
}

export {
    MessageButtonLargeComponent,
    MessageButtonSmallComponent,
    FriendsButtonComponent,
    MoreOverflowButtonComponent,
    FriendAddButtonComponent,
    EditProfileButtonComponent,
    BotAddButtonComponent,
    MarkdownComponent,
    NoteComponent,
    ConnectionComponent,
    BoardEditRenderer,
    RolePermissionHook,
    WidgetTagRenderer,
    MutualFriendRenderer,
    MutualServerRenderer,
}