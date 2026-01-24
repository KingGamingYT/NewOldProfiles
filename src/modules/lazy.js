import { Webpack } from 'betterdiscord';
import { PopUtils } from '@modules/common';

let MessageButtonLarge;
let MessageButtonSmall;
let FriendsButton;
let MoreOverflowButton;
let FriendAddButton;
let EditProfileButton;
let MarkdownFormat;
let NoteRenderer;
let ConnectionRenderer;
let BotDataRenderer;
let Board;

function MessageButtonLargeComponent({ autoFocus, onClose, userId }) {
    MessageButtonLarge ??= Webpack.getByStrings('["userId",', '"variant"]', { searchExports: true });

    return <MessageButtonLarge autoFocus={autoFocus} onClose={() => PopUtils.popAll()} userId={userId} />
}
function MessageButtonSmallComponent({ onClose, userId, variant }) {
    MessageButtonSmall ??= Webpack.getByStrings('["userId",', '["text"]', { searchExports: true });

    return <MessageButtonSmall onClose={() => PopUtils.popAll()} userId={userId} variant={variant} />
}
function FriendsButtonComponent({ relationshipType, shouldShowTooltip, type, themeColor, user }) {
    FriendsButton ??= Webpack.getAllByStrings('["user",', 'relationshipType', { searchExports: true })[1];

    return <FriendsButton relationshipType={relationshipType} shouldShowTooltip={shouldShowTooltip} type={type} themeColor={themeColor} user={user} />
}
function MoreOverflowButtonComponent({ user }) {
    MoreOverflowButton ??= Webpack.getBySource('user-profile-overflow-menu', { searchExports: true });

    return <MoreOverflowButton.Zt user={user} />
}
function FriendAddButtonComponent({ autoFocus, userId, variant }) {
    FriendAddButton ??= Webpack.getByStrings('["userId",', 'analyticsLocation', { searchExports: true });

    return <FriendAddButton autoFocus={autoFocus} userId={userId} variant={variant} />
}
function EditProfileButtonComponent({ user }) {
    EditProfileButton ??= Webpack.getByStrings('trackUserProfileAction', 'EDIT_PROFILE', { searchExports: true });

    return <EditProfileButton user={user} />
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
function BotDataComponent({ user }) {
    BotDataRenderer ??= Webpack.getByStrings('user', 'hasMessageContent', 'hasGuildPresences');

    return <BotDataRenderer user={user} />
}
function BoardEditRenderer({ user }) {
    Board ??= Webpack.getByStrings('["user"]', { searchExports: true });

    return <Board user={user} />
}

export {
    MessageButtonLargeComponent,
    MessageButtonSmallComponent,
    FriendsButtonComponent,
    MoreOverflowButtonComponent,
    FriendAddButtonComponent,
    EditProfileButtonComponent,
    MarkdownComponent,
    NoteComponent,
    ConnectionComponent,
    BotDataComponent,
    BoardEditRenderer,
}