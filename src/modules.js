import { Webpack } from "betterdiscord";

export const [
    entireProfileModal,
    ModalAccessUtils, 
    intl, 
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
    FormSwitch 
] = /* @__PURE__ */ Webpack.getBulk(
    { filter: /* @__PURE__ */ Webpack.Filters.bySource('forceShowPremium', 'pendingThemeColors') },
    { filter: x => x.openUserProfileModal },
    { filter: x => x.t && x.t.formatToMarkdownString },
    { filter: /* @__PURE__ */ Webpack.Filters.byKeys("getGuildIconURL") },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('displayProfile', 'onOpenProfile', 'animateOnHover', 'previewStatus') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('translateSurrogatesToInlineEmoji') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('UserProfileMutualFriendRow') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('hasAvatarForGuild', 'nick') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings("UserProfileActivityBadges"), searchExports: true },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('start', 'end', 'duration', 'percentage') },
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('activity', 'onAction', 'application_id', 'INSTANCE') },
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
    { filter: /* @__PURE__ */ Webpack.Filters.byStrings('ERROR','tooltipNote'), searchExports: true },
)
export const RelationshipStore = /* @__PURE__ */ Webpack.getStore('RelationshipStore');
export const ActivityStore = /* @__PURE__ */ Webpack.getStore("PresenceStore");
export const UserStore = /* @__PURE__ */ Webpack.getStore("UserStore");
export const ChannelStore = /* @__PURE__ */ Webpack.getStore("ChannelStore");
export const GuildStore = /* @__PURE__ */ Webpack.getStore("GuildStore");
export const StreamStore = /* @__PURE__ */ Webpack.getStore('ApplicationStreamingStore');
export const UserProfileStore = /* @__PURE__ */ Webpack.getStore('UserProfileStore');
export const ApplicationStore = /* @__PURE__ */ Webpack.getStore('ApplicationStore');
export const ApplicationStreamPreviewStore = /* @__PURE__ */ Webpack.getStore('ApplicationStreamPreviewStore');
export const VoiceStateStore = /* @__PURE__ */ Webpack.getStore('VoiceStateStore');
export const GuildMemberStore = /* @__PURE__ */ Webpack.getStore('GuildMemberStore');
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