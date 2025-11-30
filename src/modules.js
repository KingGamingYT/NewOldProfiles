import { Webpack } from "betterdiscord";
import { lazy } from "react";

export const [
    entireProfileModal,
    ModalAccessUtils,
    ModalRoot, 
    intl,
    ButtonClasses,
    ActivityCardClasses,
    FetchGames,
    FetchApplications, 
    IconUtils, 
    AvatarFetch, 
    EmojiRenderer, 
    MutualFriendRenderer, 
    MutualServerRenderer, 
    ActivityTimer, 
    MediaProgressBar, 
    ActivityButtons, 
    SpotifyButtons, 
    CallButtons, 
    VoiceBox, 
    VoiceList, 
    VoiceIcon, 
    TagGuildRenderer, 
    RoleRenderer, 
    BotTagRenderer, 
    Tooltip, 
    Popout, 
    FormSwitch,
    Board,
    ProfileFetch,
    OpenSpotifyAlbumFromStatus,
    GameProfile,
    DisplayNameStyleConfigurator, 
] = /* @__PURE__ */ Webpack.getBulk(
    { filter: /* @__PURE__ */ Webpack.Filters.bySource('forceShowPremium', 'pendingThemeColors') },
    { filter: x => x.openUserProfileModal },
    { filter: x=>x.Modal },
    { filter: x => x.t && x.t.formatToMarkdownString },
    { filter: x=> x.button && x.hasText && !x.hasTrailing },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys('gameState', 'clickableImage') },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("getDetectableGamesSupplemental") },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("fetchApplication") },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("getGuildIconURL") },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('displayProfile', 'onOpenProfile', 'animateOnHover', 'previewStatus') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('translateSurrogatesToInlineEmoji') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('UserProfileMutualFriendRow') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('hasAvatarForGuild', 'nick') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('timestamps', '.TEXT_FEEDBACK_POSITIVE'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('start', 'end', 'duration', 'percentage') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('activity', 'USER_PROFILE_ACTIVITY_BUTTONS') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('activity', 'PRESS_PLAY_ON_SPOTIFY_BUTTON') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('PRESS_JOIN_CALL_BUTTON') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('users', 'channel', 'themeType') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('maxUsers', 'guildId') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('channel', 'isGuildStageVoice', 'isDM', 'Pl.CONNECT') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('guildId', 'name', 'setPopoutRef', 'onClose', 'fetchGuildProfile') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('guildMember', 'roles', 'canManageRoles') },
    { filter: /* @__PURE__ */ Webpack.Filters.bySource(".botTag", "invertColor") },
    { filter: /* @__PURE__ */ Webpack.Filters.byPrototypeKeys(("renderTooltip")), searchExports: true  },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings("Unsupported animation config:"), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('"data-toggleable-component":"switch"', 'layout:"horizontal"'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('["user"]'), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings("connectionsRoleId", "USER_PROFILE_FETCH_START"), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings(".metadata)?void", ".EPISODE?"), searchExports: true },
    { filter: x => x.openGameProfileModal },
    { filter: x => Webpack.Filters.byStrings('data-username-with-effects')(x?.type) }
)
export const AccessibilityStore = /* @__PURE__ */ Webpack.getStore('AccessibilityStore');
export const RelationshipStore = /* @__PURE__ */ Webpack.getStore('RelationshipStore');
export const ActivityStore = /* @__PURE__ */ Webpack.getStore("PresenceStore");
export const UserStore = /* @__PURE__ */ Webpack.getStore("UserStore");
export const ChannelStore = /* @__PURE__ */ Webpack.getStore("ChannelStore");
export const DetectableGameSupplementalStore = /* @__PURE__ */ Webpack.getStore("DetectableGameSupplementalStore");
export const GuildStore = /* @__PURE__ */ Webpack.getStore("GuildStore");
export const StreamStore = /* @__PURE__ */ Webpack.getStore('ApplicationStreamingStore');
export const UserProfileStore = /* @__PURE__ */ Webpack.getStore('UserProfileStore');
export const ApplicationStore = /* @__PURE__ */ Webpack.getStore('ApplicationStore');
export const ApplicationStreamPreviewStore = /* @__PURE__ */ Webpack.getStore('ApplicationStreamPreviewStore');
export const VoiceStateStore = /* @__PURE__ */ Webpack.getStore('VoiceStateStore');
export const GuildMemberStore = /* @__PURE__ */ Webpack.getStore('GuildMemberStore');
export const StreamerModeStore = /* @__PURE__ */ Webpack.getStore('StreamerModeStore');
export const { useStateFromStores } = /* @__PURE__ */ Webpack.getMangled(m => m.Store, {
        useStateFromStores: /* @__PURE__ */ Webpack.Filters.byStrings("useStateFromStores")
        }, { raw: true });
export const NavigationUtils = /* @__PURE__ */ Webpack.getMangled("transitionTo - Transitioning to", {
    transitionTo: /* @__PURE__ */ Webpack.Filters.byStrings("\"transitionTo - Transitioning to \""),
    replace: /* @__PURE__ */ Webpack.Filters.byStrings("\"Replacing route with \""),
    goBack: /* @__PURE__ */ Webpack.Filters.byStrings(".goBack()"),
    goForward: /* @__PURE__ */ Webpack.Filters.byStrings(".goForward()"),
    transitionToGuild: /* @__PURE__ */ Webpack.Filters.byStrings("\"transitionToGuild - Transitioning to \"")
});
export const ModalSystem = Webpack.getMangled(".modalKey?", {
    openModalLazy: Webpack.Filters.byStrings(".modalKey?"),
    openModal: Webpack.Filters.byStrings(",instant:"),
    closeModal: Webpack.Filters.byStrings(".onCloseCallback()"),
    closeAllModals: Webpack.Filters.byStrings(".getState();for")
});
export const TagRenderer = lazy(async () => ({ default: (await Webpack.waitForModule(Webpack.Filters.bySource('tag', 'isCurrentUser', 'widgetType', 'TAG_REMOVED'))).Z}))