import { Webpack } from 'betterdiscord';
import { PopUtils } from '@modules/common';

let MessageButtonLarge;
let MessageButtonSmall;
let FriendsButton;
let MoreOverflowButton;
let FriendAddButton;
let BotAddButton;
let MarkdownFormat;
let NoteRenderer;
let ConnectionRenderer;
let Board;
let RolePermissionCheck;
let TagRenderer;
let MutualFriends;
let MutualServers;
let AvatarButton;
let AvatarDecorationButton;
let NameplateButton;
let TileButtons;
let TextArea;
let loadAvailablePrimaryGuilds;

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
    Board ??= Webpack.getBySource("COLLECTIBLES_RECOMMENDATIONS_FETCH_START", {declarationFilter: Webpack.Filters.byStrings('Fragment', 'ipCountryCode')});
    let UserProfileModalV2EditingPanelNavigationProvider;
    {
        const baseModule = Webpack.getBySource("UserProfileModalV2EditingPanelNavigationProvider", { raw: true });

        const match = Webpack.modules[baseModule.id].toString().match(/\((.{1,3})\);if\(null==.{1,3}\)throw Error\("useIsUserProfileModalV2PremiumTryItOut/);

        UserProfileModalV2EditingPanelNavigationProvider = baseModule.declarations[match[1]];
    }

    return <UserProfileModalV2EditingPanelNavigationProvider.Provider value={false}>
        <Board user={user} />
    </UserProfileModalV2EditingPanelNavigationProvider.Provider>
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

function AvatarTileButton({user}) {
    AvatarButton ??= Webpack.getByStrings('currentProfileAvatarHash');

    return <AvatarButton user={user} />
}

function AvatarDecorationTileButton({user}) {
    AvatarDecorationButton ??= Webpack.getByStrings('pendingAvatarDecoration', 'accessibleLabel', 'disabled');

    return <AvatarDecorationButton user={user} />
}

function NameplateTileButton({user}) {
    NameplateButton ??= Webpack.Filters.byStrings('pendingNameplate');

    return <NameplateButton user={user} />
}

function EditableTileProfileButtons() {
    TileButtons ??= Webpack.getMangled('"UserProfileModalV2EditableDisplayName"', {
        ThemeButton: Webpack.Filters.byStrings('currentProfileThemeColors', 'disabled'),
        BannerButton: Webpack.Filters.byStrings('pendingBanner', 'isUsingGuildMemberBanner'),
        EffectButton: Webpack.Filters.byStrings('pendingProfileEffect', 'variant'),
        FrameButton: Webpack.Filters.byStrings('pendingProfileFrame', 'userValue')
    }, {mapDeclarations: true});

    return TileButtons;
}

function RichTextArea(props) {
    let {value, placeholder, minLength, maxLength, autoFocus = false, error, emojiPickerIntention = "CHAT", editorRef, onChange, onKeyDown, onFocus, onBlur, ...rest} = props;
    TextArea ??= Webpack.getByStrings('GENERIC_RICH_TEXTAREA', 'EmojiIntention.CHAT', {searchExports: true});

    return <TextArea value={value} placeholder={placeholder} minLength={minLength} maxLength={maxLength} autoFocus={autoFocus} error={error} emojiPickerIntention={emojiPickerIntention} editorRef={editorRef} onChange={onChange} onKeydown={onKeyDown} onFocus={onFocus} onBlur={onBlur} {...rest} />
}

function getAvailablePrimaryGuilds() {
    loadAvailablePrimaryGuilds ??= Webpack.getByStrings('getSelfMember', 'getGuildsArray', {searchExports: true});

    return loadAvailablePrimaryGuilds();
}

export {
    MessageButtonLargeComponent,
    MessageButtonSmallComponent,
    FriendsButtonComponent,
    MoreOverflowButtonComponent,
    FriendAddButtonComponent,
    BotAddButtonComponent,
    MarkdownComponent,
    NoteComponent,
    ConnectionComponent,
    BoardEditRenderer,
    RolePermissionHook,
    WidgetTagRenderer,
    MutualFriendRenderer,
    MutualServerRenderer,
    AvatarTileButton,
    AvatarDecorationTileButton,
    NameplateTileButton,
    EditableTileProfileButtons,
    RichTextArea,
    getAvailablePrimaryGuilds,
}