import { Webpack } from "betterdiscord";
import { lazy } from "react";

export const [
    entireProfileModal,
    ModalAccessUtils,
    ModalRoot, 
    intl,
    ButtonClasses,
    ActivityActions,
    ActivityCardClasses,
    AnchorClasses,
    FetchApplications, 
    IconUtils, 
    Avatar,
    AvatarDecorationButton,
    AvatarFetch, 
    AvatarButton,
    EmojiRenderer, 
    ActivityTimer, 
    MediaProgressBar, 
    ActivityButtons, 
    SpotifyButtons, 
    CallButtons, 
    VoiceList, 
    TagGuildRenderer, 
    RoleUpdater, 
    BotTagRenderer, 
    Tooltip,
    Popout, 
    FormSwitch,
    ProfileFetch,
    OpenSpotifyAlbumFromStatus,
    GameProfile,
    GameProfileCheck,
    DisplayNameStyleConfigurator,
    OpenUserSettings,
    PopUtils,
    RelationshipUtils,
    BlockToasts,
    Dispatcher,
    Endpoints,
    RestAPI,
    ProfileModalEntrypoint,
    ContentInventoryEntryByActivity,
    ClampedText,
    Text,
    Card,
    CustomWidgetCard,
    SelectedChannelActionCreators,
    OpenStream,
    NameplateButton,
] = /* @__PURE__ */ Webpack.getBulk(
    { filter: /* @__PURE__ */ Webpack.Filters.bySource('forceShowPremium', 'pendingThemeColors', 'profileThemeClassName') },
    { filter: x => x.openUserProfileModal },
    { filter: x=>x.Modal },
    { filter: x => x.t && x.t.formatToMarkdownString },
    { filter: x=> x.button && x.hasText && !x.hasTrailing },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('display', 'getUserOutbox') },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys('gameState', 'clickableImage') },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys('anchor', 'anchorUnderlineOnHover') },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("fetchApplication") },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("getGuildIconURL") },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('imageClassName', 'A.AVATAR') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('pendingAvatarDecoration', 'disabled') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('STREAMING', 'isVROnline') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('currentProfileAvatarHash') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('translateSurrogatesToInlineEmoji') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('timestamps', '.TEXT_FEEDBACK_POSITIVE'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('start', 'end', 'duration', 'percentage') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('activity', 'USER_PROFILE_ACTIVITY_BUTTONS') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('activity', 'PRESS_PLAY_ON_SPOTIFY_BUTTON') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('PRESS_JOIN_CALL_BUTTON') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('maxUsers', 'guildId', 'getNickname') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('guildId', 'name', 'setPopoutRef', 'onClose', 'fetchGuildProfile') },
    { filter: /* @__PURE__ */ x=>x.updateMemberRoles },
    { filter: /* @__PURE__ */ Webpack.Filters.bySource("BOT", "invertColor") },
    { filter: /* @__PURE__ */ Webpack.Filters.byPrototypeKeys(("renderTooltip")), searchExports: true  },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings("Unsupported animation config:"), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('hasIcon', 'switchIconsEnabled'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings("connectionsRoleId", "USER_PROFILE_FETCH_START"), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings(".metadata)?void", ".EPISODE?"), searchExports: true },
    { filter: x => x.openGameProfileModal },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('gameProfileModalChecks',  'onOpened') },
    { filter: x => Webpack.Filters.byStrings('data-username-with-effects')(x?.type) },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys('openUserSettings') },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys('popAll') },
    { filter: x => x.unblockUser },
    { filter: x => x.showUnblockSuccessToast },
    { filter: x => x._dispatch, searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("GUILD_EMOJI", "GUILD_EMOJIS"), searchExports: true },
    { filter: x => typeof x === "object" && x.del && x.put, searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.bySource('UserProfileModalV2', 'defaultWishlistId') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('getMatchingInboxEntry', 'getMatchingOutboxEntry') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('delay', 'lineClamp') },
    { filter: x => x?.render && x?.render?.toString().includes('tabularNumbers'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('warn', 'preview', 'messageType'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('instanceof', 'widget'), searchExports: true },
    { filter: x=> x.selectVoiceChannel, searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('guildId', 'getWindowOpen', 'CHANNEL_CALL_POPOUT'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('pendingNameplate') },
)

export const [
    UnsavedNoticeContainer,
    SaveBar,
    SliderAnimatedContainer,
    InvalidUsernameToast,
    ToastMap,
    Toast,
    SetGuildIdentity,
    SetPendingUserChanges,
    PencilIcon,
    OpenDisplayNameStylesModal,
    LabeledField,
    TextInput,
    RichTextArea,
    Stack,
    FieldSelect,
    getAvailablePrimaryGuilds,
    GuildTag,
    ClanGuildIcon,
    GuildBadge,
    SelectClasses,
    ModalSystem,
] = /* @__PURE__ */ Webpack.getBulk(
    { filter: /* @__PURE__ */ Webpack.Filters.byPrototypeKeys('animateTo'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('submitting', 'message') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('childFactory', 'component'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('"TGg/2k"', 'FAILURE'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('currentToastMap', 'slice(1)'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('component', 'duration', 'appContext'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('USER_SET_GUILD_IDENTITY'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_PENDING_CHANGES"'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('0l1.38-1.38a2'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('DISPLAY_NAME_STYLES_CLOSED'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('labelId', 'helperText'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('"boolean"', 'defaultDirty'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('GENERIC_RICH_TEXTAREA', 'EmojiIntention.CHAT'), searchExports: true },
    { filter: x => String(x?.render).includes('"data-full-width"'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('?.value??', 'maxOptionsVisible'), searchExports: true },
    { filter: /* @__PURE __ */ Webpack.Filters.byStrings('getSelfMember', 'getGuildsArray'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('guildBadge', '__unsupportedReactNodeAsText'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('Masks.CLAN_ICON', 'getGuildIconURL'), searchExports: true },
    { filter: x => String(x?.type).includes('"fw2p/x"'), searchExports: true },
    { filter: x => x.selectPopout },
    { filter: x => x.useModalsStore }
)

export const UserProfilePendingChangesActionCreators = /* @__PURE__ */ Webpack.getMangled('avatarOriginalMd5', {
    getUserProfilePatch: Webpack.Filters.byStrings('PROFILE_EFFECT'),
    getAccountIdentityPatch: Webpack.Filters.byStrings('pendingGlobalName'),
    getGuildMemberProfilePatch: Webpack.Filters.byStrings('pendingNickname'),
    getGuildIdentityPatch: Webpack.Filters.byStrings('pendingPrimaryGuildId'),
});
export const UserProfileSettingsActionCreators1 = /* @__PURE__ */ Webpack.getMangled('"USER_PROFILE_SETTINGS_CLOSE"', {
    saveProfileChanges: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SUBMIT"'),
    updateUserPassword: Webpack.Filters.byStrings('"PASSWORD_UPDATED"'),
    defaultLogout: Webpack.Filters.byStrings('DISABLE_ACCOUNT'),
    init: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_INIT"'),
    close: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_CLOSE"'),
    harvestUserData: Webpack.Filters.byStrings('USER_HARVEST'),
    clearErrors: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_CLEAR_ERRORS"'),
    resetPendingAccountChanges: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_PENDING_ACCOUNT_CHANGES"'),
    resetPendingChanges: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_PENDING_CHANGES"'),
    resetAndCloseForm: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_AND_CLOSE_FORM"'),
    resetPendingLegacyUsernameDisabled: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_PENDING_LEGACY_USERNAME_DISABLED"'),
    resetPendingPrimaryGuildChanges: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_PENDING_PRIMARY_GUILD_CHANGES"')
});
export const UserProfileSettingsActionCreators2 = /* @__PURE__ */ Webpack.getMangled('"USER_PROFILE_UPDATE_START"', {
    updateProfileSettings: Webpack.Filters.byStrings('"USER_PROFILE_UPDATE_START"'),
    pinBadgesOnClient: Webpack.Filters.byStrings('"USER_PROFILE_PIN_BADGES_ON_CLIENT"'),
    resetPendingProfileChanges: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_PENDING_PROFILE_CHANGES"'),
    resetTryItOutChanges: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_RESET_TRY_IT_OUT_CHANGES"'),
    setTryItOutAvatar: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_TRY_IT_OUT_AVATAR"'),
    setTryItOutAvatarDecoration: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_TRY_IT_OUT_AVATAR_DECORATION"'),
    setTryItOutBanner: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_TRY_IT_OUT_BANNER"'),
    setTryItOutThemeColors: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_TRY_IT_OUT_THEME_COLORS"'),
    setTryItOutDisplayNameStyles: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_TRY_IT_OUT_DISPLAY_NAME_STYLES"'),
    setTryItOutPresent: Webpack.Filters.byStrings('"USER_PROFILE_SETTINGS_SET_TRY_IT_OUT_PRESET"'),
    shake: Webpack.Filters.byStrings('SHAKE_PROFILE_MODAL')
});
export const UserProfileSettingsActionCreators = Object.assign(UserProfileSettingsActionCreators1, UserProfileSettingsActionCreators2);
export const EditableTileProfileButtons = Webpack.getMangled('"UserProfileModalV2EditableDisplayName"', {
    ThemeButton: Webpack.Filters.byStrings('currentProfileThemeColors', 'disabled'),
    BannerButton: Webpack.Filters.byStrings('pendingBanner', 'accessibleValue'),
    EffectButton: Webpack.Filters.byStrings('pendingProfileEffect', 'variant'),
    FrameButton: Webpack.Filters.byStrings('pendingProfileFrame', 'userValue')
}, {mapDeclarations: true});
export const NavigationUtils = /* @__PURE__ */ Webpack.getMangled("transitionTo - Transitioning to", {
    transitionTo: /* @__PURE__ */ Webpack.Filters.byStrings("transitionTo - Transitioning to "),
    replace: /* @__PURE__ */ Webpack.Filters.byStrings("Replacing route with"),
    goBack: /* @__PURE__ */ Webpack.Filters.byStrings(".goBack()"),
    goForward: /* @__PURE__ */ Webpack.Filters.byStrings(".goForward()"),
    transitionToGuild: /* @__PURE__ */ Webpack.Filters.byStrings("transitionToGuild - Transitioning to")
});
export const MessageButtons = Webpack.getMangled('.zROXEV', {
    Button: Webpack.Filters.not(Webpack.Filters.byStrings("aria-label")),
    ButtonWithTooltip: Webpack.Filters.byStrings("tooltipText")
});
export const ManaButtons = Webpack.getMangled(Webpack.Filters.bySource('SPINNING_CIRCLE', '__unsupportedReactNodeAsText', 'tooltipAlign', '"sm","aria-label"'), {
    PrimaryButtonWithIcon: x => String(x).includes('"sm",.'),
    PrimaryButtonLazy: x => String(x).includes('loading'),
    IconOnlyButton: x => String(x).includes('targetElementRef')
});
export const LaunchableGameUtils = Webpack.getMangled(Webpack.Filters.bySource('ConnectedAppsStore', 'isLaunchableLoading'), {
    useApplicationLaunchState: Webpack.Filters.byStrings('isLaunchableLoading'),
    useLaunchableGameId: Webpack.Filters.byStrings('data', 'getOfficialGame'),
    useLaunchableApplicationId: Webpack.Filters.byStrings('data', 'getOfficialGame', 'getGameByApplication')
});
export const LayerSurfaceModule = Webpack.getMangled(Webpack.Filters.bySource('"scrim":"empty"'), {
    LayerSurface: Webpack.Filters.byStrings('"scrim":"empty"')
});
export const RoleRenderer = lazy(async () => ({ default: (await Webpack.waitForModule(Webpack.Filters.byStrings('roles', 'guild', 'canRemoveAnyRoles', 'map(e'), {searchExports: true} ))}));
export const VoiceIcon = Webpack.getByStrings('channel', 'isGuildStageVoice', 'isDM', '.CONNECT')

const settingsModuleId = Webpack.getModule(Webpack.Filters.bySource('"allowGameFriendDmsInDiscord"'), { raw: true }).id;
const matches = [...Webpack.modules[settingsModuleId].toString().matchAll(/(\w+)\s?=\s?.\("(\w+)",\s?"(\w+)/g)];
const settingsModule = BdApi.Webpack.getById(settingsModuleId, { raw:true }).declarations;

export const Settings = {};

matches.forEach(x => {
    const delc = x[1], _ = x[2], key = x[3];
    Settings[_] = {
        ...Settings[_],
        [key]: settingsModule[delc]
    }
})