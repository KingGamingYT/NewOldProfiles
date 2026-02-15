/**
 * @name NewOldProfiles
 * @author KingGamingYT
 * @description A full, largely accurate restoration of Discord's profile layout used from 2018 to 2021. Features modern additions such as banners, theme colors, and guild tags.
 * @version 1.1.1
 */

/*@cc_on
@if (@_jscript)

	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

'use strict';

const betterdiscord = new BdApi("NewOldProfiles");
const react = BdApi.React;

// modules/common.js
const [
	entireProfileModal,
	ModalAccessUtils,
	ModalRoot,
	intl,
	ButtonClasses,
	ActivityCardClasses,
	AnchorClasses,
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
	RolePermissionCheck,
	RoleUpdater,
	BotTagRenderer,
	Tooltip,
	OrbTooltip,
	Popout,
	PopoutContainer,
	FormSwitch,
	ProfileFetch,
	OpenSpotifyAlbumFromStatus,
	GameProfile,
	DisplayNameStyleConfigurator,
	OpenUserSettings,
	PopUtils,
	RelationshipUtils,
	BlockToasts,
	Dispatcher,
	Endpoints,
	RestAPI
] = betterdiscord.Webpack.getBulk(
	{ filter: betterdiscord.Webpack.Filters.bySource("forceShowPremium", "pendingThemeColors", "profileThemeClassName") },
	{ filter: (x) => x.openUserProfileModal },
	{ filter: (x) => x.Modal },
	{ filter: (x) => x.t && x.t.formatToMarkdownString },
	{ filter: (x) => x.button && x.hasText && !x.hasTrailing },
	{ filter: betterdiscord.Webpack.Filters.byKeys("gameState", "clickableImage") },
	{ filter: betterdiscord.Webpack.Filters.byKeys("anchor", "anchorUnderlineOnHover") },
	{ filter: betterdiscord.Webpack.Filters.byKeys("getDetectableGamesSupplemental") },
	{ filter: betterdiscord.Webpack.Filters.byKeys("fetchApplication") },
	{ filter: betterdiscord.Webpack.Filters.byKeys("getGuildIconURL") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("displayProfile", "onOpenProfile", "animateOnHover", "previewStatus") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("translateSurrogatesToInlineEmoji") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("UserProfileMutualFriendRow") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("hasAvatarForGuild", "nick") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("timestamps", ".TEXT_FEEDBACK_POSITIVE"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("start", "end", "duration", "percentage") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("activity", "USER_PROFILE_ACTIVITY_BUTTONS") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("activity", "PRESS_PLAY_ON_SPOTIFY_BUTTON") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("PRESS_JOIN_CALL_BUTTON") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("users", "channel", "themeType") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("maxUsers", "guildId") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("channel", "isGuildStageVoice", "isDM", ".CONNECT") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("guildId", "name", "setPopoutRef", "onClose", "fetchGuildProfile") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("roles", "guild", "canRemoveAnyRoles", "map(e"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings(".ADMINISTRATOR", ".MANAGE_MESSAGES") },
	{ filter: (x) => x.updateMemberRoles },
	{ filter: betterdiscord.Webpack.Filters.bySource("BOT", "invertColor") },
	{ filter: betterdiscord.Webpack.Filters.byPrototypeKeys("renderTooltip"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("showSubtext", "tooltipWordmarkComponent") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("Unsupported animation config:"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("type", "position", "data-popout-animating"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings('"data-toggleable-component":"switch"', 'layout:"horizontal"'), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("connectionsRoleId", "USER_PROFILE_FETCH_START"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings(".metadata)?void", ".EPISODE?"), searchExports: true },
	{ filter: (x) => x.openGameProfileModal },
	{ filter: (x) => betterdiscord.Webpack.Filters.byStrings("data-username-with-effects")(x?.type) },
	{ filter: betterdiscord.Webpack.Filters.byKeys("openUserSettings") },
	{ filter: betterdiscord.Webpack.Filters.byKeys("popAll") },
	{ filter: (x) => x.unblockUser },
	{ filter: (x) => x.showUnblockSuccessToast },
	{ filter: (x) => x._dispatch, searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byKeys("GUILD_EMOJI", "GUILD_EMOJIS"), searchExports: true },
	{ filter: (x) => typeof x === "object" && x.del && x.put, searchExports: true }
);
const NavigationUtils = betterdiscord.Webpack.getMangled("transitionTo - Transitioning to", {
	transitionTo: betterdiscord.Webpack.Filters.byStrings("transitionTo - Transitioning to "),
	replace: betterdiscord.Webpack.Filters.byStrings("Replacing route with"),
	goBack: betterdiscord.Webpack.Filters.byStrings(".goBack()"),
	goForward: betterdiscord.Webpack.Filters.byStrings(".goForward()"),
	transitionToGuild: betterdiscord.Webpack.Filters.byStrings("transitionToGuild - Transitioning to")
});
const ModalSystem$1 = betterdiscord.Webpack.getMangled(".modalKey?", {
	openModalLazy: betterdiscord.Webpack.Filters.byStrings(".modalKey?"),
	openModal: betterdiscord.Webpack.Filters.byStrings(",instant:"),
	closeModal: betterdiscord.Webpack.Filters.byStrings(".onCloseCallback()"),
	closeAllModals: betterdiscord.Webpack.Filters.byStrings(".getState();for")
});
betterdiscord.Webpack.getMangled(".zROXEV", {
	Button: betterdiscord.Webpack.Filters.not(betterdiscord.Webpack.Filters.byStrings("aria-label")),
	ButtonWithTooltip: betterdiscord.Webpack.Filters.byStrings("tooltipText")
});
const FriendButton = betterdiscord.Webpack.getMangled("SEND_FRIEND_REQUEST,icon", {
	AddFriend: betterdiscord.Webpack.Filters.combine(betterdiscord.Webpack.Filters.byStrings("{userId:"), betterdiscord.Webpack.Filters.not(betterdiscord.Webpack.Filters.byStrings("tooltipText")))
});
const TagRenderer = react.lazy(async () => ({ default: (await betterdiscord.Webpack.waitForModule(betterdiscord.Webpack.Filters.bySource("tag", "isCurrentUser", "widgetType", "TAG_REMOVED"))).A }));

// modules/stores.js
const AccessibilityStore = betterdiscord.Webpack.getStore("AccessibilityStore");
const RelationshipStore = betterdiscord.Webpack.getStore("RelationshipStore");
const ActivityStore = betterdiscord.Webpack.getStore("PresenceStore");
const UserStore = betterdiscord.Webpack.getStore("UserStore");
const ChannelStore = betterdiscord.Webpack.getStore("ChannelStore");
const DetectableGameSupplementalStore = betterdiscord.Webpack.getStore("DetectableGameSupplementalStore");
const GuildStore = betterdiscord.Webpack.getStore("GuildStore");
const StreamStore = betterdiscord.Webpack.getStore("ApplicationStreamingStore");
const UserProfileStore = betterdiscord.Webpack.getStore("UserProfileStore");
const ApplicationStore = betterdiscord.Webpack.getStore("ApplicationStore");
const ApplicationStreamPreviewStore = betterdiscord.Webpack.getStore("ApplicationStreamPreviewStore");
const VoiceStateStore = betterdiscord.Webpack.getStore("VoiceStateStore");
const GuildMemberStore = betterdiscord.Webpack.getStore("GuildMemberStore");
const GuildRoleStore = betterdiscord.Webpack.getStore("GuildRoleStore");
const StreamerModeStore = betterdiscord.Webpack.getStore("StreamerModeStore");
const { useStateFromStores } = betterdiscord.Webpack.getMangled((m) => m.Store, {
	useStateFromStores: betterdiscord.Webpack.Filters.byStrings("useStateFromStores")
}, { raw: true });

// common/settings.js
const settings = {
	main: {
		showGuildTag: {
			name: "Show user guild tag",
			note: "Displays a user's guild tag on their profile.",
			initial: true
		},
		disableDiscrim: {
			name: "Disable discriminators",
			note: "Don't like legacy discriminators? This will always display a user's modern @ tag.",
			initial: false
		},
		disableProfileThemes: {
			name: "Disable profile themes",
			note: "Disable a user's custom nitro profile colors.",
			initial: false
		},
		boardTab: {
			name: "Board Tab",
			note: `If a user has game widgets, a "Board" tab will appear on the user profile. To edit your own widgets, press the button found under the "Profile Widgets" category on your profile.`,
			initial: false
		}
	},
	serverCategory: {
		showRoles: {
			name: "Show member roles",
			note: "When viewing a user's profile in a server, that user's roles will be visible in the user's profile details.",
			initial: true
		},
		serverBio: {
			name: "Show server about me",
			note: "When viewing a user's profile in a server, that user's custom about me will be displayed instead of their default one.",
			initial: true
		}
	},
	default: {
		showGuildTag: true,
		disableDiscrim: false,
		disableProfileThemes: false,
		boardTab: false,
		showRoles: true,
		serverBio: true
	}
};

// common/getIntlString.js
function getIntlString(hash, parameter) {
	if (parameter) return intl.intl.formatToPlainString(intl.t[`${hash}`], parameter);
	return intl.intl.formatToPlainString(intl.t[`${hash}`]);
}

// common/tabs.js
const tabs = {
	ABOUT: 0,
	SERVERS: 1,
	FRIENDS: 2,
	DATA: 3,
	BOARD: 4
};

// common/locale.js
const locale = {
	Sections: {
		MUTUAL_FRIENDS: tabs.FRIENDS,
		MUTUAL_GUILDS: tabs.SERVERS,
		WIDGETS: betterdiscord.Data.load("boardTab") ? tabs.BOARD : null
	},
	Strings: {
		ABOUT_ME: () => getIntlString("61W33d"),
		ACCEPT: () => getIntlString("MMlhsr"),
		BOARD: () => getIntlString("laViwx"),
		BOT: () => getIntlString("AOdOYr"),
		COMPETING_IN: (name) => getIntlString("QQ2wVE", name),
		CREATED_ON: () => getIntlString("A//N4k"),
		CUSTOM_STATUS: () => getIntlString("Q7eoCR"),
		DATA_ACCESS: () => getIntlString("QzDgMq"),
		DIRECT_MESSAGE: () => getIntlString("jN2DfZ"),
		EDIT: () => getIntlString("bt75uw"),
		FAVORITE_GAME: () => getIntlString("sUQar8"),
		GAME_ICON_FOR: (game) => getIntlString("nh+jWk", game),
		GAMES_I_LIKE: () => getIntlString("scOKET"),
		GAMES_IN_ROTATION: () => getIntlString("SqNnus"),
		IGNORE: () => getIntlString("xuio0C"),
		IN_A_VOICE_CHANNEL: () => getIntlString("grGyaf"),
		IN_CHANNEL: (channel) => getIntlString("Xe4de2", channel),
		INFO: () => getIntlString("HY+vdA"),
		LISTENING_TO: (name) => getIntlString("NF5xop", name),
		LIVE_ON: (platform) => getIntlString("Dzgz4u", platform),
		MEMBER_SINCE: () => getIntlString("xcKP1P"),
		MORE: () => getIntlString("UKOtz+"),
		MUTUAL_FRIENDS: () => getIntlString("afBKs5"),
		MUTUAL_SERVERS: () => getIntlString("sySsXR"),
		NO_FRIENDS_IN_COMMON: () => getIntlString("/5p4gx"),
		NO_SERVERS_IN_COMMON: () => getIntlString("zjVh8h"),
		NOTE: () => getIntlString("PbMNh2"),
		PLAYING: () => getIntlString("BMTj28"),
		PLAYING_A_GAME: () => getIntlString("2TbM/G"),
		PLAYING_ON: (platform) => getIntlString("A17aM8", platform),
		PROFILE_WIDGETS: () => getIntlString("Jzj9q4"),
		PRONOUNS: () => getIntlString("1w6drw"),
		ROLE: () => getIntlString("XPGZXP"),
		ROLES: () => getIntlString("2SZsWX"),
		SEND_FRIEND_REQUEST: () => getIntlString("gc9aSx"),
		SEND_MESSAGE: () => getIntlString("YzpScd"),
		STREAM: () => getIntlString("5AyH/p"),
		STREAMING: (name) => getIntlString("4CQq9Q", name),
		STREAMER_MODE_ENABLED: () => getIntlString("Br1ls3"),
		STREAMING_GAME_IN: (game, server) => `${getIntlString("4CQq9Q", game)} ${getIntlString("5YBAcS", server)}`,
		STREAMING_TO: (server) => getIntlString("sddlGK", server),
		UNBLOCK: () => getIntlString("Hro40y"),
		USER: () => getIntlString("E466pL"),
		WANT_TO_PLAY: () => getIntlString("bWSQwW"),
		WATCHING: (name) => getIntlString("pW3Ip3", name)
	}
};

// common/check.js
function activityCheck({ activities }) {
	let pass = {
		playing: 0,
		xbox: 0,
		playstation: 0,
		streaming: 0,
		listening: 0,
		spotify: 0,
		watching: 0,
		competing: 0,
		custom: 0
	};
	for (let i = 0; i < activities.length; i++) {
		if (!activities[i]) {
			return;
		}
		if (activities[i].type == 4) {
			pass.custom = 1;
		}
		if (activities[i].type == 0) {
			pass.playing = 1;
		}
		if (activities[i]?.platform?.includes("xbox")) {
			pass.xbox = 1;
		}
		if (activities[i]?.platform?.includes("playstation") || activities[i]?.platform?.includes("ps5")) {
			pass.playstation = 1;
		}
		if (activities[i].type == 1) {
			pass.streaming = 1;
		}
		if (activities[i].type == 2) {
			pass.listening = 1;
		}
		if (activities[i].name.includes("Spotify")) {
			pass.spotify = 1;
		}
		if (activities[i].type == 3) {
			pass.watching = 1;
		}
		if (activities[i].type == 5) {
			pass.competing = 1;
		}
	}
	return pass;
}

// modules/lazy.js
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
	MessageButtonLarge ??= betterdiscord.Webpack.getByStrings("let{userId", ",{variant", '"primary",', { searchExports: true });
	return BdApi.React.createElement(MessageButtonLarge, { autoFocus, onClose: () => PopUtils.popAll(), userId });
}
function MessageButtonSmallComponent({ onClose, userId, variant }) {
	MessageButtonSmall ??= betterdiscord.Webpack.getByStrings("userId", "tooltipText:", ",variant", "{text", { searchExports: true });
	return BdApi.React.createElement(MessageButtonSmall, { onClose: () => PopUtils.popAll(), userId, variant });
}
function FriendsButtonComponent({ relationshipType, shouldShowTooltip, type, themeColor, user }) {
	FriendsButton ??= betterdiscord.Webpack.getByStrings("menuItems", "relationshipType", { searchExports: true });
	return BdApi.React.createElement(FriendsButton, { relationshipType, shouldShowTooltip, type, themeColor, user });
}
function MoreOverflowButtonComponent({ user }) {
	MoreOverflowButton ??= betterdiscord.Webpack.getBySource("user-profile-overflow-menu", { searchExports: true });
	return BdApi.React.createElement(MoreOverflowButton.Zt, { user });
}
function FriendAddButtonComponent({ autoFocus, userId, variant }) {
	FriendAddButton ??= FriendButton.AddFriend;
	return BdApi.React.createElement(FriendAddButton, { autoFocus, userId, variant });
}
function EditProfileButtonComponent({ user }) {
	EditProfileButton ??= betterdiscord.Webpack.getByStrings("trackUserProfileAction", "EDIT_PROFILE", { searchExports: true });
	return BdApi.React.createElement(EditProfileButton, { user });
}
function MarkdownComponent({ userBio }) {
	MarkdownFormat ??= betterdiscord.Webpack.getByStrings("userBio", "disableAnimations");
	return BdApi.React.createElement(MarkdownFormat, { className: "userBio", userBio });
}
function NoteComponent({ userId }) {
	NoteRenderer ??= betterdiscord.Webpack.getByStrings("hidePersonalInformation", "onUpdate", "placeholder");
	return BdApi.React.createElement(NoteRenderer, { className: "note", userId });
}
function ConnectionComponent({ connectedAccount, userId }) {
	ConnectionRenderer ??= betterdiscord.Webpack.getByStrings("connectedAccount", "connectedAccountOpenIcon", "CONNECTED_ACCOUNT_VIEWED", { searchExports: true });
	return BdApi.React.createElement(ConnectionRenderer, { className: "connectedAccount", connectedAccount, userId, showMetadata: false });
}
function BotDataComponent({ user }) {
	BotDataRenderer ??= betterdiscord.Webpack.getByStrings("user", "hasMessageContent", "hasGuildPresences");
	return BdApi.React.createElement(BotDataRenderer, { user });
}
function BoardEditRenderer({ user }) {
	Board ??= betterdiscord.Webpack.getByStrings("data-scroller", "fade:!0,", { searchExports: true });
	return BdApi.React.createElement(Board, { user });
}

// components/common/TooltipBuilder.jsx
const TooltipBuilder = ({ note, position, children }) => {
	return BdApi.React.createElement(Tooltip, { text: note, position: position || "top" }, (props) => {
		children.props = {
			...props,
			...children.props
		};
		return children;
	});
};

// components/builders/header/customButtons.jsx
function BlockedPopout({ userId, close }) {
	return BdApi.React.createElement(betterdiscord.ContextMenu.Menu, { navId: "blocked-overflow", onClose: close }, BdApi.React.createElement(betterdiscord.ContextMenu.Item, { id: "user-context-block", label: locale.Strings.UNBLOCK(), action: () => {
		return RelationshipUtils.unblockUser(userId), BlockToasts.showUnblockSuccessToast(userId);
	} }));
}
function BlockedPopoutButton({ user }) {
	const [showPopout, setShowPopout] = react.useState(false);
	const refDOM = react.useRef(null);
	return BdApi.React.createElement(
		Popout,
		{
			targetElementRef: refDOM,
			clickTrap: true,
			onRequestClose: () => setShowPopout(false),
			renderPopout: () => BdApi.React.createElement(PopoutContainer, { position: "right" }, BdApi.React.createElement(BlockedPopout, { userId: user.id, close: () => setShowPopout(false) })),
			position: "right",
			shouldShow: showPopout
		},
		(props) => BdApi.React.createElement(
			"span",
			{
				...props,
				ref: refDOM,
				onClick: () => {
					setShowPopout(true);
				}
			},
			BdApi.React.createElement(TooltipBuilder, { note: locale.Strings.MORE() }, BdApi.React.createElement("button", { className: `${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary}`, type: "button" }, BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildrenWrapper}` }, BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildren}` }, BdApi.React.createElement("svg", { className: `${ButtonClasses.icon}`, role: "img", width: "16", height: "16", viewBox: "0 0 24 24" }, BdApi.React.createElement("path", { d: "M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z", fill: "currentColor" }))))))
		)
	);
}
function AcceptButton({ user }) {
	return BdApi.React.createElement(
		"button",
		{
			className: `${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText} ${ButtonClasses.active}`,
			type: "button",
			onClick: () => RelationshipUtils.acceptFriendRequest({ userId: user.id })
		},
		BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildrenWrapper}` }, BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildren}` }, BdApi.React.createElement("div", { style: { fontSize: "14px", fontWeight: "500" } }, locale.Strings.ACCEPT())))
	);
}
function IgnoreButton({ user }) {
	return BdApi.React.createElement(
		"button",
		{
			className: `${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText} primaryFilled`,
			type: "button",
			onClick: () => RelationshipUtils.cancelFriendRequest(user.id)
		},
		BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildrenWrapper}` }, BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildren}` }, BdApi.React.createElement("div", { style: { fontSize: "14px", fontWeight: "500" } }, locale.Strings.IGNORE())))
	);
}

// components/builders/header/inner.jsx
function BadgeBuilder({ badge, index, id }) {
	const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(id)).filter((activity) => activity && ![4, 6].includes(activity?.type));
	const voice = useStateFromStores([VoiceStateStore], () => VoiceStateStore.getVoiceStateForUser(id)?.channelId);
	const stream = useStateFromStores([StreamStore], () => StreamStore.getAnyStreamForUser(id));
	const links = ["staff", "partner", "certified_moderator", "hypesquad", "bug_hunter_level_1", "bug_hunter_level_2", "bot_commands"];
	const routes = ["quest_completed", "orb_profile_badge"];
	const settings = ["early_supporter", "premium", "guild_booster"];
	const settingsMatch = settings.filter((x) => badge.id.includes(x));
	return BdApi.React.createElement("div", { className: "profileBadgeWrapper" }, BdApi.React.createElement(TooltipBuilder, { note: badge.id.includes("orb_profile_badge") ? BdApi.React.createElement(OrbTooltip, { showSubtext: true }) : badge.description }, BdApi.React.createElement(
		"a",
		{
			tabIndex: index + 1,
			className: `${AnchorClasses.anchor} ${AnchorClasses.anchorUnderlineOnHover}`,
			role: "button",
			href: links.includes(badge.id) && badge?.link,
			rel: "noreferrer noopener",
			target: "_blank",
			onClick: () => routes.includes(badge.id) ? (() => {
				NavigationUtils.transitionTo(badge.id.includes("orb_profile_badge") ? "/shop?tab=orbs" : badge?.link?.substring(badge?.link?.indexOf("m") + 1));
				ModalSystem.closeAllModals();
			})() : settingsMatch.length && OpenUserSettings.openUserSettings((() => {
				if (settings.some((setting) => settingsMatch.includes(setting))) return "nitro_panel";
			})())
		},
		BdApi.React.createElement(
			"div",
			{
				className: betterdiscord.Utils.className((activities.length !== 0 || voice || stream) && "richBadge", "profileBadge", `profileBadge${badge.id.replaceAll(/(?:^|_)(\w)/g, (_, m) => m.toUpperCase())}`)
			}
		)
	)));
}
function BadgesBuilder({ badges, style, id }) {
	if (!badges) return;
	return BdApi.React.createElement("div", { className: "profileBadges", style }, badges.map((badge, index) => BdApi.React.createElement(BadgeBuilder, { badge, index, id })));
}
function ClanTagBuilder({ user }) {
	const [showPopout, setShowPopout] = react.useState(false);
	const refDOM = react.useRef(null);
	return BdApi.React.createElement(
		"div",
		{
			className: "clanTagContainer"
		},
		BdApi.React.createElement(
			Popout,
			{
				targetElementRef: refDOM,
				clickTrap: true,
				onRequestClose: () => setShowPopout(false),
				renderPopout: () => BdApi.React.createElement(TagGuildRenderer, { guildId: user.primaryGuild?.identityGuildId }),
				position: "right",
				shouldShow: showPopout
			},
			(props) => BdApi.React.createElement(
				"div",
				{
					...props,
					className: "clanTag",
					ref: refDOM,
					onClick: () => {
						setShowPopout(true);
					}
				},
				BdApi.React.createElement(
					"div",
					{
						className: "clanTagInner"
					},
					BdApi.React.createElement(
						"img",
						{
							className: "tagBadge",
							src: "https://cdn.discordapp.com/clan-badges/" + user.primaryGuild?.identityGuildId + "/" + user.primaryGuild?.badge + ".png?size=16"
						}
					),
					BdApi.React.createElement(
						"div",
						{
							className: "tagName",
							style: {
								color: "var(--text-default)",
								lineHeight: "16px",
								fontWeight: "600",
								fontSize: "14px"
							}
						},
						user.primaryGuild?.tag
					)
				)
			)
		)
	);
}
function HeaderButtonBuilder({ currentUser, relationshipType, user }) {
	if (user.id === currentUser.id) {
		return BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement(EditProfileButtonComponent, { user }), BdApi.React.createElement(MoreOverflowButtonComponent, { user }));
	}
	if (user.bot) {
		return BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement(MessageButtonLargeComponent, { autoFocus: true, onClose: () => PopUtils.popAll(), userId: user.id }), BdApi.React.createElement(MoreOverflowButtonComponent, { user }));
	}
	switch (relationshipType) {
		case 0:
			return BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement(FriendAddButtonComponent, { autoFocus: true, userId: user.id, variant: "primary" }), BdApi.React.createElement(MessageButtonSmallComponent, { onClose: () => PopUtils.popAll(), userId: user.id, variant: "secondary" }), BdApi.React.createElement(MoreOverflowButtonComponent, { user }));
		case 1:
		case 4:
			return BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement(MessageButtonLargeComponent, { autoFocus: true, onClose: () => PopUtils.popAll(), userId: user.id }), BdApi.React.createElement(FriendsButtonComponent, { relationshipType, shouldShowTooltip: true, type: "icon", themeColor: "secondary", user }), BdApi.React.createElement(MoreOverflowButtonComponent, { user }));
		case 2:
			return BdApi.React.createElement(BlockedPopoutButton, { user });
		case 3:
			return BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement(AcceptButton, { user }), BdApi.React.createElement(IgnoreButton, { user }), BdApi.React.createElement(MessageButtonSmallComponent, { onClose: () => PopUtils.popAll(), userId: user.id, variant: "secondary" }), BdApi.React.createElement(MoreOverflowButtonComponent, { user }));
	}
}
function DiscordTag({ user, displayProfile, tagName, displayName }) {
	const displayNameStylesEnabled = AccessibilityStore.displayNameStylesEnabled;
	const informationHidden = StreamerModeStore.hidePersonalInformation;
	const legacyName = displayProfile._userProfile?.legacyUsername;
	const isPomelo = !legacyName && !user.bot;
	return BdApi.React.createElement("div", { className: "nameSection" }, displayNameStylesEnabled && user?.displayNameStyles ? BdApi.React.createElement(
		DisplayNameStyleConfigurator.type,
		{
			userName: displayName || tagName,
			displayNameStyles: user.displayNameStyles,
			inProfile: 1,
			textClassName: "displayName"
		}
	) : BdApi.React.createElement("div", { className: "displayName" }, displayName || tagName), BdApi.React.createElement("div", { className: betterdiscord.Utils.className("nameTag", isPomelo && "nameTagPomelo") }, !informationHidden && !betterdiscord.Data.load("disableDiscrim") && legacyName ? legacyName?.substring(legacyName?.indexOf("#")) : user.bot ? `#${user.discriminator}` : `@${tagName}`), user.bot && BdApi.React.createElement(
		BotTagRenderer.A,
		{
			className: "botTag",
			type: user.system ? BotTagRenderer.A.Types.OFFICIAL : BotTagRenderer.A.Types.BOT,
			verified: user.publicFlags & 1 << 16
		}
	));
}
function HeaderInnerBuilder({ user, currentUser, displayProfile, tagName, displayName }) {
	const relationship = RelationshipStore.getRelationshipType(user.id);
	return BdApi.React.createElement("header", { className: "header" }, BdApi.React.createElement(AvatarFetch, { className: "avatar", user }), BdApi.React.createElement("div", { className: "headerInfo" }, BdApi.React.createElement(DiscordTag, { user, displayProfile, tagName, displayName }), user.primaryGuild?.tag && betterdiscord.Data.load("showGuildTag") ? BdApi.React.createElement("div", { className: "badgeSection", style: { display: "flex", flexWrap: "wrap", alignItems: "center" } }, BdApi.React.createElement(ClanTagBuilder, { user }), displayProfile._userProfile.badges && displayProfile._userProfile.badges.length !== 0 && BdApi.React.createElement("div", { className: "divider", style: { margin: "0 5px 0 5px" } }), BdApi.React.createElement(BadgesBuilder, { badges: displayProfile._userProfile.badges, style: { display: "contents" }, id: user.id })) : BdApi.React.createElement(BadgesBuilder, { badges: displayProfile._userProfile.badges, style: { display: "flex", flexWrap: "wrap" }, id: user.id })), BdApi.React.createElement("div", { className: "profileButtons" }, BdApi.React.createElement(HeaderButtonBuilder, { currentUser, relationshipType: relationship, user })));
}

// components/builders/tabbar/tabBar.jsx
function TabBarItem({ tab, setTab, ref, tabIndex, selectedItem, label }) {
	return BdApi.React.createElement(
		"div",
		{
			className: "tabBarItem",
			tabIndex,
			"aria-selected": tab === tabs[selectedItem],
			"aria-controls": `${selectedItem.toLowerCase()}-tab`,
			onClick: () => {
				setTab(tabs[selectedItem]);
				ref.current?.scrollTo(0, 0);
			}
		},
		label
	);
}
function TabBarBuilder({ user, displayProfile, currentUser, tab, setTab, ref }) {
	if (user.id === currentUser.id) return;
	const hasBoard = betterdiscord.Data.load("boardTab") && Boolean(displayProfile.widgets?.length);
	return BdApi.React.createElement("div", { className: "tabBarContainer", style: { borderTop: "1px solid hsla(0, 0%, 100%, .1", paddingLeft: "20px" } }, BdApi.React.createElement("div", { className: "tabBar", style: { display: "flex", alignItems: "stretch", height: "55px", flexDirection: "row" } }, BdApi.React.createElement(
		TabBarItem,
		{
			tab,
			setTab,
			ref,
			tabIndex: 0,
			selectedItem: "ABOUT",
			label: `${user.bot ? locale.Strings.BOT() : locale.Strings.USER().substring(0, 1).toUpperCase() + locale.Strings.USER().substring(1)} ${locale.Strings.INFO()}`
		}
	), hasBoard === true && BdApi.React.createElement(
		TabBarItem,
		{
			tab,
			setTab,
			ref,
			tabIndex: 1,
			selectedItem: "BOARD",
			label: locale.Strings.BOARD()
		}
	), BdApi.React.createElement(
		TabBarItem,
		{
			tab,
			setTab,
			ref,
			tabIndex: hasBoard === true ? 2 : 1,
			selectedItem: "SERVERS",
			label: locale.Strings.MUTUAL_SERVERS()
		}
	), user.bot ? BdApi.React.createElement(
		TabBarItem,
		{
			tab,
			setTab,
			ref,
			tabIndex: 2,
			selectedItem: "DATA",
			label: locale.Strings.DATA_ACCESS()
		}
	) : BdApi.React.createElement(
		TabBarItem,
		{
			tab,
			setTab,
			ref,
			tabIndex: hasBoard === true ? 3 : 2,
			selectedItem: "FRIENDS",
			label: locale.Strings.MUTUAL_FRIENDS()
		}
	)));
}

// components/activities/cardActivityWrapper.jsx
function ActivityCardWrapper({ user, activities, voice, stream }) {
	const _activities = activities.filter((activity) => activity && [0, 2, 3, 5].includes(activity?.type) && activity?.type !== 4 && activity.name && !activity.name.includes("Spotify"));
	const filterCheck = activityCheck({ activities: _activities });
	return BdApi.React.createElement("div", { className: "activityProfileContainer activityProfileContainerNormal" }, !stream ? BdApi.React.createElement(VoiceCard, { voice, stream }) : BdApi.React.createElement(StreamCard, { user, voice }), _activities.map((activity) => BdApi.React.createElement(ActivityCard, { user, activity, check: filterCheck })));
}

// common/GameProfileOpen.js
function GameProfileOpen({ gameId, userId }) {
	return GameProfile.openGameProfileModal({
		applicationId: gameId,
		gameProfileModalChecks: {
			shouldOpenGameProfile: true,
			applicationId: gameId
		},
		source: "tony",
		sourceUserId: userId,
		appContext: {}
	});
}

// methods/activities/headers.js
const headers = {
	0: locale.Strings.PLAYING_A_GAME(),
	1: locale.Strings.STREAMING({ name: "" }),
	2: locale.Strings.LISTENING_TO({ name: "" }),
	3: locale.Strings.WATCHING({ name: "" }),
	5: locale.Strings.COMPETING_IN({ name: "" })
};

// components/activities/common/ActivityHeader.jsx
function ActivityHeader$1({ activity, voice, stream, check }) {
	const filterCheck = activityCheck({ activities: [activity] });
	const channel = useStateFromStores([ChannelStore], () => ChannelStore.getChannel(voice));
	let result;
	switch (true) {
		case !!stream:
			result = locale.Strings.STREAMING_TO({ server: GuildStore.getGuild(channel.guild_id)?.name || channel.name || locale.Strings.DIRECT_MESSAGE() });
			break;
		case !!voice:
			result = locale.Strings.IN_A_VOICE_CHANNEL();
			break;
		case !![1].includes(activity?.type):
			result = locale.Strings.LIVE_ON({ platform: activity?.name || locale.Strings.STREAM() });
			break;
		case !![2, 3].includes(activity?.type):
			result = headers[activity.type] + activity?.name;
			break;
		case !!(filterCheck?.xbox || filterCheck?.playstation):
			result = locale.Strings.PLAYING_ON({ platform: activity?.platform });
			break;
		default:
			result = headers[activity.type];
	}
	return BdApi.React.createElement("h3", { className: "headerTextNormal headerText", style: { color: "var(--white)", marginBottom: "8px" } }, result);
}

// components/activities/common/ActivityAssets.jsx
function ConsoleImageAsset({ url, platform }) {
	return BdApi.React.createElement(
		"img",
		{
			className: `assetsLargeImage${platform} assetsLargeImage`,
			style: { width: "60px", height: "60px" },
			src: url
		}
	);
}
function FallbackAsset(props) {
	return BdApi.React.createElement("svg", { ...props }, BdApi.React.createElement(
		"path",
		{
			style: { transform: "scale(1.65)" },
			fill: "white",
			d: "M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		}
	));
}
function GameIconAsset({ url, name }) {
	const [shouldFallback, setShouldFallback] = react.useState(false);
	return BdApi.React.createElement(BdApi.React.Fragment, null, shouldFallback ? BdApi.React.createElement(FallbackAsset, { className: "gameIcon", style: { width: "40px", height: "40px" } }) : BdApi.React.createElement(
		"img",
		{
			className: "gameIcon",
			style: { width: "40px", height: "40px" },
			"aria-label": locale.Strings.GAME_ICON_FOR({ game: name }),
			src: url,
			onError: () => setShouldFallback(true)
		}
	));
}
function RichImageAsset({ url, tooltipText, onClick, type }) {
	const [shouldFallback, setShouldFallback] = react.useState(false);
	return BdApi.React.createElement(TooltipBuilder, { note: tooltipText }, shouldFallback ? BdApi.React.createElement(FallbackAsset, { className: `assets${type}Image` }) : BdApi.React.createElement(
		"img",
		{
			className: `assets${type}Image`,
			"aria-label": tooltipText,
			alt: tooltipText,
			src: url,
			onClick,
			onError: () => setShouldFallback(true)
		}
	));
}
function TwitchImageAsset({ url, imageId, altText }) {
	return BdApi.React.createElement(BdApi.React.Fragment, null, !imageId ? BdApi.React.createElement(FallbackAsset, { className: "assetsLargeImage" }) : BdApi.React.createElement(
		"img",
		{
			className: "assetsLargeImageTwitch assetsLargeImage",
			"aria-label": altText,
			alt: altText,
			src: url,
			onError: (e) => e.currentTarget.src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-162x90.jpg"
		}
	));
}
function StreamImageAsset({ stream }) {
	const preview = useStateFromStores([ApplicationStreamPreviewStore], () => ApplicationStreamPreviewStore.getPreviewURLForStreamKey(`${stream?.streamType}:${stream?.guildId}:${stream?.channelId}:${stream?.ownerId}`));
	return BdApi.React.createElement(BdApi.React.Fragment, null, preview ? BdApi.React.createElement(
		"img",
		{
			className: "streamPreviewImage",
			src: preview
		}
	) : BdApi.React.createElement(
		"img",
		{
			className: "streamPreviewPlaceholder",
			src: "https://discord.com/assets/6b1a461f35c05c7a.svg"
		}
	));
}

// methods/activities/getVoiceParticipants.js
function getVoiceParticipants({ voice }) {
	let participants = [];
	const channelParticipants = Object.keys(VoiceStateStore.getVoiceStatesForChannel(voice));
	for (let i = 0; i < channelParticipants.length; i++) {
		participants.push(UserStore.getUser(channelParticipants[i]));
	}
	return participants;
}

// components/activities/common/FlexInfo.jsx
function Header({ activity, channel, check }) {
	const guildChannel = useStateFromStores([GuildStore], () => GuildStore.getGuild(channel?.guild_id));
	if (channel) {
		const nickname = useStateFromStores([RelationshipStore], () => RelationshipStore.getNickname(guildChannel?.ownerId || channel.getRecipientId()));
		return BdApi.React.createElement("h3", { className: "textRow", style: { display: "flex", alignItems: "center" } }, VoiceIcon({ channel }), BdApi.React.createElement("h3", { className: "nameWrap nameNormal textRow", style: { fontWeight: "600" } }, channel.name || nickname));
	}
	if (!activity) return;
	let result = activity.name;
	if ([1, 2, 3].includes(activity?.type)) result = activity.details;
	return BdApi.React.createElement("div", { className: "nameNormal textRow ellipsis", style: { fontWeight: "600" } }, result);
}
function ActivityType({ type, filterCheck, activity, voice, channel, stream }) {
	const guildChannel = useStateFromStores([GuildStore], () => GuildStore.getGuild(channel?.guild_id));
	switch (type) {
		case "PLAYING":
			return BdApi.React.createElement(BdApi.React.Fragment, null, !(filterCheck?.listening || filterCheck?.watching) && BdApi.React.createElement("div", { className: "details textRow ellipsis" }, activity.details), BdApi.React.createElement("div", { className: "state textRow ellipsis" }, activity?.state && activity?.party && activity?.party?.size ? `${activity.state} (${activity.party.size[0]} of ${activity.party.size[1]})` : activity?.party && activity?.party?.size ? `Party: (${activity.party.size[0]} of ${activity.party.size[1]})` : activity.state), activity?.timestamps?.end ? BdApi.React.createElement("div", { className: "mediaProgressBarContainer" }, BdApi.React.createElement(MediaProgressBar, { start: activity?.timestamps?.start || activity?.created_at, end: activity?.timestamps?.end })) : BdApi.React.createElement(ActivityTimer, { activity }));
		case "TWITCH":
			return BdApi.React.createElement(BdApi.React.Fragment, null, activity.state && BdApi.React.createElement("div", { className: "state textRow ellipsis" }, `${locale.Strings.PLAYING()} ${activity.state}`));
		case "SPOTIFY":
			return BdApi.React.createElement(BdApi.React.Fragment, null, activity.state && BdApi.React.createElement("div", { className: "details textRow ellipsis" }, `by ${activity.state}`), activity.assets?.large_text && BdApi.React.createElement("div", { className: "state textRow ellipsis" }, `on ${activity.assets?.large_text}`), activity?.timestamps?.end ? BdApi.React.createElement("div", { className: "mediaProgressBarContainer" }, BdApi.React.createElement(MediaProgressBar, { start: activity?.timestamps?.start, end: activity?.timestamps?.end })) : BdApi.React.createElement(ActivityTimer, { activity }));
		case "VOICE":
			return BdApi.React.createElement(BdApi.React.Fragment, null, guildChannel?.name && BdApi.React.createElement("div", { className: "state textRow ellipsis" }, locale.Strings.IN_CHANNEL({ channelName: guildChannel?.name })));
		case "STREAM":
			return BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement(
				VoiceList,
				{
					className: "userList",
					users: getVoiceParticipants({ voice }),
					maxUsers: getVoiceParticipants({ voice }).length,
					guildId: stream.guildId,
					channelId: stream.channelId
				}
			));
	}
}
function FlexInfo(props) {
	const { className, style, activity, voice, stream, channel, check, type } = props;
	const filterCheck = activityCheck({ activities: [activity] });
	return BdApi.React.createElement("div", { className, style }, BdApi.React.createElement(Header, { activity, channel, check }), BdApi.React.createElement(ActivityType, { filterCheck, activity, voice, stream, channel, type }));
}

// components/activities/cardActivity.jsx
function ActivityCard({ user, activity, check }) {
	const gameId = activity?.application_id;
	react.useEffect(() => {
		(async () => {
			if (!DetectableGameSupplementalStore.getGame(gameId)) {
				await FetchGames.getDetectableGamesSupplemental([gameId]);
			}
		})();
	}, [gameId]);
	const game = DetectableGameSupplementalStore.getGame(gameId);
	const application = ApplicationStore.getApplication(activity?.application_id);
	return BdApi.React.createElement("div", { className: "activityProfile activity", id: `${activity.created_at}-${activity.type}`, key: `${activity.created_at}-${activity.type}` }, BdApi.React.createElement(ActivityHeader$1, { activity, check }), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement(
		"div",
		{
			className: "assets",
			style: { position: "relative" },
			onMouseOver: (e) => game && e.currentTarget.classList.add(`${ActivityCardClasses.clickableImage}`),
			onMouseLeave: (e) => game && e.currentTarget.classList.remove(`${ActivityCardClasses.clickableImage}`),
			onClick: () => game && GameProfileOpen({ gameId, userId: user.id })
		},
		activity?.assets && activity?.assets.large_image && !activity?.platform?.includes("xbox") && BdApi.React.createElement(
			RichImageAsset,
			{
				url: isNaN(activity?.assets?.large_image) ? `https://media.discordapp.net/${activity.assets.large_image.substring(activity.assets.large_image.indexOf(":") + 1)}` : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity?.assets.large_image}.png`,
				tooltipText: activity.assets.large_text || activity?.details,
				type: "Large"
			}
		),
		activity?.platform?.includes("xbox") && BdApi.React.createElement(ConsoleImageAsset, { url: "https://discord.com/assets/d8e257d7526932dcf7f88e8816a49b30.png", platform: "XBOX" }),
		activity?.platform?.includes("ps5") && BdApi.React.createElement(ConsoleImageAsset, { url: `https://media.discordapp.net/external${activity.assets.small_image.substring(activity.assets.small_image.indexOf("/"))}`, platform: "PLAYSTATION" }),
		activity?.application_id && (!activity?.assets || !activity?.assets.large_image) && !activity?.platform?.includes("xbox") && BdApi.React.createElement(GameIconAsset, { url: `https://cdn.discordapp.com/app-icons/${activity.application_id}/${application?.icon}.png`, name: activity.name }),
		!(user.bot || activity?.assets || activity?.application_id || application?.icon) && BdApi.React.createElement(FallbackAsset, { style: { width: "40px", height: "40px" } }),
		activity?.assets && activity?.assets?.large_image && activity?.assets?.small_image && BdApi.React.createElement(
			RichImageAsset,
			{
				url: isNaN(activity?.assets?.small_image) ? `https://media.discordapp.net/${activity.assets.small_image.substring(activity.assets.small_image.indexOf(":") + 1)}` : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity?.assets.small_image}.png`,
				tooltipText: activity.assets.small_text || activity?.details,
				type: "Small"
			}
		)
	), BdApi.React.createElement(FlexInfo, { className: "contentImagesProfile content", style: { display: "grid", flex: "1", marginBottom: "3px" }, activity, check, type: "PLAYING" }), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(ActivityButtons, { user, activity }))));
}

// components/activities/cardTwitch.jsx
function TwitchCard({ user, activities }) {
	const activity = activities.filter((activity2) => activity2 && activity2.name && activity2.type === 1)[0];
	return BdApi.React.createElement("div", { className: "activityProfileContainer activityProfileContainerTwitch" }, BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement(ActivityHeader$1, { activity }), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement("div", { className: "assets", style: { position: "relative" } }, BdApi.React.createElement(
		TwitchImageAsset,
		{
			url: activity.name.includes("YouTube") ? `https://i.ytimg.com/vi/${activity?.assets?.large_image.substring(activity?.assets?.large_image.indexOf(":") + 1)}/hqdefault_live.jpg` : `https://static-cdn.jtvnw.net/previews-ttv/live_user_${activity?.assets?.large_image.substring(activity?.assets?.large_image.indexOf(":") + 1)}-162x90.jpg`,
			imageId: activity?.assets?.large_image,
			altText: activity?.assets?.large_text
		}
	)), BdApi.React.createElement(FlexInfo, { className: "contentImagesProfile content", activity, type: "TWITCH" }), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(ActivityButtons, { user, activity })))));
}

// components/activities/cardSpotify.jsx
function SpotifyCard({ user, activities, check }) {
	const _activities = activities.filter((activity) => activity && activity.name && activity.name.includes("Spotify"));
	return BdApi.React.createElement("div", { className: "activityProfileContainer activityProfileContainerSpotify" }, _activities.map((activity) => BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement(ActivityHeader$1, { activity, check }), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement("div", { className: "assets", style: { position: "relative" } }, BdApi.React.createElement(
		RichImageAsset,
		{
			url: `https://i.scdn.co/image/${activity?.assets?.large_image?.substring(activity?.assets?.large_image.indexOf(":") + 1)}`,
			tooltipText: activity?.assets?.large_text || activity?.details,
			onClick: () => OpenSpotifyAlbumFromStatus(activity, user.id),
			type: "Large"
		}
	)), BdApi.React.createElement(FlexInfo, { className: "contentImagesProfile content", activity, check, type: "SPOTIFY" }), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(SpotifyButtons, { user, activity }))))));
}

// components/activities/cardVoice.jsx
function VoiceCard({ voice, stream }) {
	const channel = useStateFromStores([ChannelStore], () => ChannelStore.getChannel(voice));
	if (stream || !channel) return;
	return BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement("div", { className: "activityProfileContainerVoice" }, BdApi.React.createElement(ActivityHeader$1, { voice }), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement(VoiceBox, { users: getVoiceParticipants({ voice }), channel, themeType: "MODAL" }), BdApi.React.createElement(FlexInfo, { className: "contentImagesProfile content", channel, type: "VOICE" }), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(CallButtons, { channel })))));
}

// components/activities/cardStream.jsx
function StreamCard({ user, voice }) {
	const streams = useStateFromStores([StreamStore], () => StreamStore.getAllApplicationStreamsForChannel(voice));
	const _streams = streams.filter((streams2) => streams2 && streams2.ownerId == user.id);
	const channel = useStateFromStores([ChannelStore], () => ChannelStore.getChannel(voice));
	return _streams.map((stream) => BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement("div", { className: "activityProfileContainerStream" }, BdApi.React.createElement(ActivityHeader$1, { voice, stream }), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement(StreamImageAsset, { stream }), BdApi.React.createElement(FlexInfo, { className: "contentImagesProfile content", voice, stream, channel, type: "STREAM" }), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(CallButtons, { channel }))))));
}

// components/activities/cardCustom.jsx
function ActivityHeader({}) {
	return BdApi.React.createElement(
		"div",
		{
			className: "activityHeader"
		},
		locale.Strings.CUSTOM_STATUS()
	);
}
function CustomActivityContent({ activity, activities }) {
	const _emoji = activities.filter((activity2) => activity2.emoji);
	return BdApi.React.createElement(
		"div",
		{
			className: "customStatusContent"
		},
		_emoji.map((_) => BdApi.React.createElement(EmojiRenderer, { emoji: activity.emoji })),
		BdApi.React.createElement("div", { className: "customStatusText" }, activity.state)
	);
}
function CustomCard({ activities }) {
	const _activities = activities.filter((activity) => activity && activity.type === 4);
	return _activities.map((activity) => BdApi.React.createElement("div", { className: "activity" }, BdApi.React.createElement(ActivityHeader, null), BdApi.React.createElement(CustomActivityContent, { activity, activities: _activities })));
}

// components/builders/header/builder.jsx
function Banner({ url }) {
	return BdApi.React.createElement(
		"img",
		{
			className: "userBanner",
			src: url,
			style: {
				width: "600px",
				height: "200px"
			},
			alt: ""
		}
	);
}
function headerBuilder({ user, currentUser, displayProfile, tab, setTab, ref }) {
	const tagName = user.username;
	const displayName = user.globalName;
	const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(user.id));
	const check = activityCheck({ activities });
	const voice = useStateFromStores([VoiceStateStore], () => VoiceStateStore.getVoiceStateForUser(user.id)?.channelId);
	const stream = useStateFromStores([StreamStore], () => StreamStore.getAnyStreamForUser(user.id));
	if (activities.length !== 0 && check.streaming) {
		return BdApi.React.createElement("div", { className: "topSectionStreaming", style: { backgroundColor: "#593695" } }, displayProfile.banner && BdApi.React.createElement(Banner, { url: displayProfile.getBannerURL({ canAnimate: true }) }), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCard,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			TwitchCard,
			{
				user,
				activities
			}
		), BdApi.React.createElement(
			ActivityCardWrapper,
			{
				user,
				voice: voice && voice,
				stream: stream && stream,
				activities,
				check
			}
		)), BdApi.React.createElement(
			TabBarBuilder,
			{
				user,
				displayProfile,
				currentUser,
				tab,
				setTab,
				ref
			}
		)));
	} else if (activities.length !== 0 && check.spotify) {
		return BdApi.React.createElement("div", { className: "topSectionSpotify", style: { backgroundColor: "#1db954" } }, displayProfile.banner && BdApi.React.createElement(Banner, { url: displayProfile.getBannerURL({ canAnimate: true }) }), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCard,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			SpotifyCard,
			{
				user,
				activities
			}
		), BdApi.React.createElement(
			ActivityCardWrapper,
			{
				user,
				voice: voice && voice,
				stream: stream && stream,
				activities,
				check
			}
		)), BdApi.React.createElement(
			TabBarBuilder,
			{
				user,
				displayProfile,
				currentUser,
				tab,
				setTab,
				ref
			}
		)));
	} else if (activities.length !== 0 && check?.xbox) {
		return BdApi.React.createElement("div", { className: "topSectionXbox", style: { backgroundColor: "#107c10" } }, displayProfile.banner && BdApi.React.createElement(Banner, { url: displayProfile.getBannerURL({ canAnimate: true }) }), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCard,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			ActivityCardWrapper,
			{
				user,
				voice: voice && voice,
				stream: stream && stream,
				activities,
				check
			}
		)), BdApi.React.createElement(
			TabBarBuilder,
			{
				user,
				displayProfile,
				currentUser,
				tab,
				setTab,
				ref
			}
		)));
	} else if (activities.length !== 0 && (check.playing || check.listening || check.watching || check.competing) && (!check.spotify && !check.streaming && !check.xbox) || voice !== void 0) {
		return BdApi.React.createElement("div", { className: "topSectionPlaying", style: { backgroundColor: "var(--background-brand)" } }, displayProfile.banner && BdApi.React.createElement(Banner, { url: displayProfile.getBannerURL({ canAnimate: true }) }), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCard,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			ActivityCardWrapper,
			{
				user,
				activities,
				voice,
				stream,
				check
			}
		)), BdApi.React.createElement(
			TabBarBuilder,
			{
				user,
				displayProfile,
				currentUser,
				tab,
				setTab,
				ref
			}
		)));
	}
	return BdApi.React.createElement("div", { className: "topSectionNormal", style: { backgroundColor: "var(--background-tertiary, var(--background-base-lowest))" } }, displayProfile.banner && BdApi.React.createElement(Banner, { url: displayProfile.getBannerURL({ canAnimate: true }) }), BdApi.React.createElement(
		HeaderInnerBuilder,
		{
			user,
			currentUser,
			displayProfile,
			tagName,
			displayName
		}
	), BdApi.React.createElement(
		CustomCard,
		{
			className: "activity",
			activities
		}
	), BdApi.React.createElement(
		TabBarBuilder,
		{
			user,
			displayProfile,
			currentUser,
			tab,
			setTab,
			ref
		}
	));
}

// components/builders/widgets/common/gameCover.jsx
function GameCover({ game, image, imageURL }) {
	const user = UserStore.getCurrentUser();
	return BdApi.React.createElement(
		"div",
		{
			className: "gameCover hoverActiveEffect",
			onClick: () => DetectableGameSupplementalStore.getGame(game.id) && GameProfileOpen({ gameId: game.id, userId: user.id })
		},
		BdApi.React.createElement(
			"img",
			{
				alt: game?.name,
				className: "gameCover",
				style: { objectFit: "cover" },
				src: `${image.src}`
			}
		)
	);
}

// components/builders/widgets/common/fallbackCover.jsx
function FallbackCover(game) {
	return BdApi.React.createElement("div", { className: "gameCover" }, BdApi.React.createElement("div", { className: "fallback gameCover" }, BdApi.React.createElement("div", { className: "coverFallbackText" }, game?.game?.name || "Unknown Game")));
}

// components/builders/widgets/common/widgetCard.jsx
function WidgetCardDetails({ widget, game, index, type }) {
	return BdApi.React.createElement("div", { className: "widgetDetails" }, BdApi.React.createElement("h3", { className: "widgetTitle" }, game?.name || "Unknown Game"), type.includes("CURRENT") && widget.games[index].tags && BdApi.React.createElement(react.Suspense, null, BdApi.React.createElement(TagRenderer, { tags: widget.games[index].tags, widgetType: widget.type, className: "tagListContainer" })), type.includes("FAVORITE") && widget.games[0].comment && BdApi.React.createElement("div", { role: "group" }, BdApi.React.createElement(
		"svg",
		{
			className: "commentIcon",
			role: "img",
			width: "12",
			height: "12",
			fill: "none",
			viewBox: "0 0 24 24"
		},
		BdApi.React.createElement(
			"path",
			{
				fill: "var(--icon-muted)",
				d: "M2.35 19.44A4.75 4.75 0 0 0 6.07 21c1.43 0 2.58-.43 3.44-1.3.9-.9 1.35-2.06 1.35-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0C2.89 6.78 1 10.64 1 15.02c0 1.9.45 3.38 1.35 4.42ZM14.16 19.44A4.75 4.75 0 0 0 17.88 21c1.43 0 2.58-.43 3.45-1.3.9-.9 1.34-2.06 1.34-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0c-3.77 3.36-5.66 7.22-5.66 11.6 0 1.9.45 3.38 1.35 4.42Z"
			}
		)
	), BdApi.React.createElement("div", { className: "widgetTitle widgetSubtitle", style: { color: "var(--text-tertiary, var(--text-muted))", fontWeight: 400 } }, widget.games[0].comment)));
}
function WidgetCard({ widget, game, image, imageURL, index, loading, ref, type }) {
	return BdApi.React.createElement("div", { className: "widgetCard", ref }, BdApi.React.createElement(TooltipBuilder, { note: game?.name }, loading ? BdApi.React.createElement(FallbackCover, { game }) : BdApi.React.createElement(GameCover, { game, image, imageURL })), BdApi.React.createElement(WidgetCardDetails, { widget, game, index, type }));
}

// components/builders/widgets/widgetFavorite.jsx
function FavoriteWidgetBuilder({ widget, game }) {
	const [loading, setLoading] = react.useState(true);
	let imageURL = IconUtils.getGameAssetURL({ id: game?.id, hash: game?.coverImage, size: "1024", keepAspectRatio: true });
	const image = react.useMemo(() => new Image(), []);
	const ref = react.useRef(null);
	react.useLayoutEffect(() => {
		FetchGames.getDetectableGamesSupplemental([game?.id]);
	}, [game?.id]);
	react.useLayoutEffect(() => {
		if (!imageURL) imageURL = DetectableGameSupplementalStore.getCoverImageUrl(game?.id);
		image.src = imageURL;
		if (!image.src) {
			setLoading(true);
			if (image.parentElement) image.parentElement.removeChild(image);
			return;
		}
		if (image.isConnected) return;
		image.onload = () => {
			setLoading(false);
		};
		return () => {
			delete image.onload;
		};
	}, [imageURL]);
	return BdApi.React.createElement(WidgetCard, { widget, game, image, imageURL, loading, ref, type: "FAVORITE" });
}

// components/builders/widgets/widgetShelf.jsx
function ShelfWidgetBuilder({ game }) {
	const [loading, setLoading] = react.useState(() => true);
	let imageURL = IconUtils.getGameAssetURL({ id: game?.id, hash: game?.coverImage, size: "1024", keepAspectRatio: true });
	const image = react.useMemo(() => new Image(), []);
	const ref = react.useRef(null);
	react.useLayoutEffect(() => {
		FetchGames.getDetectableGamesSupplemental([game?.id]);
	}, [game?.id]);
	react.useLayoutEffect(() => {
		if (!imageURL) imageURL = DetectableGameSupplementalStore.getCoverImageUrl(game?.id);
		image.src = imageURL;
		if (!image.src) {
			setLoading(true);
			if (image.parentElement) image.parentElement.removeChild(image);
			return;
		}
		if (image.isConnected) return;
		image.onload = () => {
			setLoading(false);
		};
		return () => {
			delete image.onload;
		};
	}, [imageURL]);
	return BdApi.React.createElement("div", { style: { position: "relative" }, ref }, BdApi.React.createElement(TooltipBuilder, { note: game?.name }, loading ? BdApi.React.createElement(FallbackCover, { game }) : BdApi.React.createElement(GameCover, { game, image, imageURL })));
}

// components/builders/widgets/widgetCurrent.jsx
function CurrentWidgetBuilder({ widget, game, index }) {
	const [loading, setLoading] = react.useState(() => true);
	let imageURL = IconUtils.getGameAssetURL({ id: game?.id, hash: game?.coverImage, size: "1024", keepAspectRatio: true });
	const image = react.useMemo(() => new Image(), []);
	const ref = react.useRef(null);
	react.useLayoutEffect(() => {
		FetchGames.getDetectableGamesSupplemental([game?.id]);
	}, [game?.id]);
	react.useLayoutEffect(() => {
		if (!imageURL) imageURL = DetectableGameSupplementalStore.getCoverImageUrl(game?.id);
		image.src = imageURL;
		if (!image.src) {
			setLoading(true);
			if (image.parentElement) image.parentElement.removeChild(image);
			return;
		}
		if (image.isConnected) return;
		image.onload = () => {
			setLoading(false);
		};
		return () => {
			delete image.onload;
		};
	}, [imageURL]);
	return BdApi.React.createElement(WidgetCard, { widget, game, image, imageURL, index, loading, ref, type: "CURRENT" });
}

// components/builders/tabs/common/infoSections.jsx
function SectionHeader({ children }) {
	return BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, children);
}
function MemberDateSupplementalBuilder({ date, member }) {
	return BdApi.React.createElement(
		"div",
		{
			className: betterdiscord.Utils.className("memberSince", member && "memberSinceServer"),
			style: { color: "var(--text-default)" }
		},
		intl.intl.data.formatDate(new Date(date), { dateStyle: "medium" })
	);
}
function MemberDateIcon({ server }) {
	const [shouldFallback, setShouldFallback] = react.useState(false);
	return BdApi.React.createElement(TooltipBuilder, { note: server.name }, shouldFallback ? BdApi.React.createElement("div", { className: "noIcon guildIcon", style: { fontSize: "10px", backgroundImage: "none" } }, BdApi.React.createElement("div", { className: "acronym" }, server.name.substring(0, 1))) : BdApi.React.createElement("div", { className: "guildIcon" }, BdApi.React.createElement(
		"img",
		{
			src: IconUtils.getGuildIconURL(server) + "size=128",
			style: { borderRadius: "inherit", width: "inherit" },
			onError: () => setShouldFallback(true)
		}
	)));
}
function BoardButton({ user }) {
	return BdApi.React.createElement(
		"button",
		{
			className: `${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.primary} ${ButtonClasses.hasText}`,
			onClick: () => ModalSystem$1.openModal(
				(props) => BdApi.React.createElement(ModalRoot.Modal, { ...props, title: locale.Strings.PROFILE_WIDGETS() }, BdApi.React.createElement(BoardEditRenderer, { user }))
			)
		},
		BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildrenWrapper}` }, BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildren}`, style: { fontSize: "14px" } }, locale.Strings.EDIT()))
	);
}
function PronounsBuilder({ displayProfile }) {
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(SectionHeader, null, locale.Strings.PRONOUNS()), BdApi.React.createElement("div", { className: "userPronouns", style: { color: "var(--text-default)", fontSize: "14px" } }, displayProfile.pronouns));
}
function BioBuilder({ displayProfile }) {
	if (!displayProfile._userProfile.bio) return;
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(SectionHeader, null, locale.Strings.ABOUT_ME()), BdApi.React.createElement(
		MarkdownComponent,
		{
			userBio: displayProfile?._guildMemberProfile?.bio && betterdiscord.Data.load("serverBio") ? displayProfile.bio : displayProfile._userProfile.bio
		}
	));
}
function RoleBuilder({ user, data }) {
	if (!data?.guildId || !betterdiscord.Data.load("showRoles")) return;
	const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
	if (!serverMember || serverMember?.roles?.length === 0) {
		return;
	}
	const memberRoles = serverMember.roles?.map((role) => GuildRoleStore.getRole(data?.guildId, role));
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(SectionHeader, null, serverMember?.roles?.length !== 1 ? locale.Strings.ROLES() : locale.Strings.ROLE()), BdApi.React.createElement(
		RoleRenderer,
		{
			userId: user.id,
			roles: memberRoles,
			guild: GuildStore.getGuild(data?.guildId),
			className: "rolesList",
			allowEditing: RolePermissionCheck({ guildId: data.guildId }).canRemove
		}
	));
}
function MemberDateBuilder({ data, user }) {
	const server = GuildStore.getGuild(data?.guildId);
	const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
	const serverDate = new Date(serverMember?.joinedAt);
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(SectionHeader, null, user.bot ? locale.Strings.CREATED_ON() : locale.Strings.MEMBER_SINCE()), BdApi.React.createElement("div", { className: "memberSinceWrapper", style: { display: "flex", gap: "8px", alignItems: "center" } }, BdApi.React.createElement(MemberDateSupplementalBuilder, { date: user.createdAt }), data?.guildId && serverMember && BdApi.React.createElement(BdApi.React.Fragment, null, BdApi.React.createElement("div", { className: "divider" }), BdApi.React.createElement(MemberDateIcon, { server }), BdApi.React.createElement(MemberDateSupplementalBuilder, { date: serverDate, member: serverMember }))));
}
function NoteBuilder({ user }) {
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(SectionHeader, null, locale.Strings.NOTE()), BdApi.React.createElement(NoteComponent, { userId: user.id }));
}
function BoardButtonBuilder({ user }) {
	return BdApi.React.createElement("div", { className: "userInfoSection", style: { paddingBottom: "20px" } }, BdApi.React.createElement(SectionHeader, null, locale.Strings.PROFILE_WIDGETS()), BdApi.React.createElement(BoardButton, { user }));
}
function BoardBuilder({ widget, header, games }) {
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(SectionHeader, null, header), widget.type.includes("favorite_games") && BdApi.React.createElement(FavoriteWidgetBuilder, { widget, game: games[0] }), (widget.type.includes("played_games") || widget.type.includes("want_to_play_games")) && BdApi.React.createElement("div", { className: "widgetCoverList" }, widget.games.map((game, index) => BdApi.React.createElement(ShelfWidgetBuilder, { game: games[index] }))), widget.type.includes("current_games") && BdApi.React.createElement("div", { className: "cardList" }, widget.games.map((game, index) => BdApi.React.createElement(CurrentWidgetBuilder, { widget, game: games[index], index }))));
}
function ConnectionCards({ user, connections }) {
	if (connections.length == 0) return;
	return BdApi.React.createElement("div", { className: "userInfoSection", style: { borderTop: "1px solid var(--background-modifier-accent, var(--background-mod-normal))" } }, BdApi.React.createElement("div", { className: "connectedAccounts" }, connections.map((connection) => BdApi.React.createElement(ConnectionComponent, { connectedAccount: connection, userId: user.id }))));
}

// components/builders/tabs/common/streamerModeView.jsx
function StreamerModeView({}) {
	return BdApi.React.createElement("div", { className: "empty" }, BdApi.React.createElement("div", { className: "emptyIconStreamerMode emptyIcon" }), BdApi.React.createElement("div", { className: "emptyText" }, locale.Strings.STREAMER_MODE_ENABLED()));
}

// components/builders/tabs/common/scroller.jsx
function Scroller({ children, type, padding }) {
	return BdApi.React.createElement("div", { className: `${type.includes("INFO") ? "info" : "list"}Scroller scrollerBase`, style: { overflow: "hidden scroll", paddingRight: `${padding}px` || "0px" } }, children);
}

// components/builders/tabs/tabAbout.jsx
function AboutTab({ data, user, displayProfile }) {
	const connections = displayProfile._userProfile.connectedAccounts;
	if (StreamerModeStore.hidePersonalInformation) {
		return BdApi.React.createElement(Scroller, { type: "INFO" }, BdApi.React.createElement(StreamerModeView, null));
	}
	return BdApi.React.createElement(Scroller, { type: "INFO", padding: 12 }, displayProfile?.pronouns && BdApi.React.createElement(PronounsBuilder, { displayProfile }), BdApi.React.createElement(BioBuilder, { displayProfile }), BdApi.React.createElement(RoleBuilder, { user, data, displayProfile }), BdApi.React.createElement(MemberDateBuilder, { data, user }), BdApi.React.createElement(NoteBuilder, { user }), betterdiscord.Data.load("boardTab") && user.id === data.currentUser.id && BdApi.React.createElement(BoardButtonBuilder, { user }), BdApi.React.createElement(ConnectionCards, { user, connections }), BdApi.React.createElement("div", { "aria-hidden": true, style: { pointerEvents: "none", minHeight: "0px", minWidth: "1px", flex: "0 0 auto", height: "8px" } }));
}

// components/builders/widgets/builder.jsx
function getWidgetIntl(widget) {
	let header;
	if (widget.type.includes("favorite_games")) header = locale.Strings.FAVORITE_GAME();
	else if (widget.type.includes("played_games")) header = locale.Strings.GAMES_I_LIKE();
	else if (widget.type.includes("want_to_play_games")) header = locale.Strings.WANT_TO_PLAY();
	else if (widget.type.includes("current_games")) header = locale.Strings.GAMES_IN_ROTATION();
	return header;
}
function WidgetBuilder({ widget }) {
	const [isLoaded, setIsLoaded] = react.useState(false);
	const gameIds = Array.isArray(widget.games) ? widget.games.map((game) => game.applicationId) : [];
	const games = useStateFromStores([ApplicationStore], () => gameIds.map((id) => ApplicationStore.getApplication(id)));
	const header = getWidgetIntl(widget);
	react.useEffect(() => {
		(async () => {
			if (isLoaded) return;
			const urlSearch = new URLSearchParams(gameIds.map((x) => ["application_ids", x])).toString();
			const applicationPublic = await RestAPI.get({ url: Endpoints.APPLICATIONS_PUBLIC, query: urlSearch });
			const supplementalData = await RestAPI.get({ url: Endpoints.APPLICATIONS_GAMES_SUPPLEMENTAL, query: urlSearch });
			Dispatcher.dispatch({
				type: "APPLICATIONS_FETCH_SUCCESS",
				applications: applicationPublic.body,
				unknownApplicationIds: []
			});
			Dispatcher.dispatch({
				type: "DETECTABLE_GAME_SUPPLEMENTAL_FETCH_SUCCESS",
				applicationIds: gameIds,
				supplementalGameData: supplementalData.body.supplemental_game_data
			});
			setIsLoaded(true);
		})();
	}, [gameIds]);
	return BdApi.React.createElement(BoardBuilder, { widget, header, games });
}

// components/builders/tabs/tabBoard.jsx
function BoardTab({ displayProfile }) {
	const widgets = displayProfile.widgets;
	if (!widgets.length) return;
	return BdApi.React.createElement(Scroller, { type: "INFO" }, [
		widgets.map((widget) => BdApi.React.createElement(WidgetBuilder, { widget }))
	]);
}

// components/builders/tabs/tabMutualServers.jsx
function ServersTab({ data, user }) {
	const mutualServers = UserProfileStore.getMutualGuilds(user.id);
	if (!mutualServers || mutualServers?.length == 0) {
		return BdApi.React.createElement(Scroller, { type: "LIST" }, BdApi.React.createElement("div", { className: "empty" }, BdApi.React.createElement("div", { className: "emptyIconGuilds emptyIcon" }), BdApi.React.createElement("div", { className: "emptyText" }, locale.Strings.NO_SERVERS_IN_COMMON())));
	}
	return BdApi.React.createElement(Scroller, { type: "LIST" }, mutualServers.map((mutual) => BdApi.React.createElement(
		MutualServerRenderer,
		{
			key: mutual.guild.id,
			user,
			guild: mutual.guild,
			nick: mutual?.nick,
			onSelect: () => {
				NavigationUtils.transitionToGuild(mutual.guild.id);
				data.onClose();
			}
		}
	)));
}

// components/builders/tabs/tabMutualFriends.jsx
function FriendsTab({ data, user }) {
	const mutualFriends = UserProfileStore.getMutualFriends(user.id);
	if (!mutualFriends || mutualFriends?.length == 0) {
		return BdApi.React.createElement(Scroller, { type: "LIST" }, BdApi.React.createElement("div", { className: "empty" }, BdApi.React.createElement("div", { className: "emptyIconFriends emptyIcon" }), BdApi.React.createElement("div", { className: "emptyText" }, locale.Strings.NO_FRIENDS_IN_COMMON())));
	}
	return BdApi.React.createElement(Scroller, { type: "LIST" }, mutualFriends.map((mutual) => BdApi.React.createElement(
		MutualFriendRenderer,
		{
			user: mutual.user,
			status: mutual.status,
			guildId: mutual.displayProfile?.guildId,
			onSelect: () => {
				ModalAccessUtils.openUserProfileModal({ userId: mutual.user.id });
				data.onClose();
			}
		}
	)));
}

// components/builders/tabs/tabData.jsx
function DataTab({ user }) {
	return BdApi.React.createElement(BotDataComponent, { user });
}

// components/builders/tabs/tabFallback.jsx
function FallbackTab() {
	return BdApi.React.createElement("div", { className: "listScroller scrollerBase", style: { overflow: "hidden scroll" } }, BdApi.React.createElement(
		"img",
		{
			className: "emptyIcon",
			style: { alignSelf: "center" },
			src: "https://discord.com/assets/8c998f8fb62016fcfb4901e424ff378b.svg"
		}
	), BdApi.React.createElement("div", { className: "emptyText", style: { textAlign: "center" } }, "You've found yourself in the fallback tab! Close and re-open the profile to try again!"));
}

// components/builders/bodyBase.jsx
function bodyBuilder({ data, user, displayProfile, tab, ref }) {
	return BdApi.React.createElement("div", { className: "body", style: { height: "240px", backgroundColor: "var(--background-secondary, var(--background-base-lower))" }, ref, id: `${Object.keys(tabs).find((t) => tabs[t] === tab).toLowerCase()}-tab` }, tab === tabs.ABOUT ? BdApi.React.createElement(AboutTab, { data, user, displayProfile }) : tab === tabs.BOARD ? BdApi.React.createElement(BoardTab, { data, user, displayProfile }) : tab === tabs.SERVERS ? BdApi.React.createElement(ServersTab, { data, user }) : tab === tabs.FRIENDS ? BdApi.React.createElement(FriendsTab, { data, user }) : tab === tabs.DATA ? BdApi.React.createElement(DataTab, { user }) : BdApi.React.createElement(FallbackTab, null));
}

// common/styles.js
const styles = Object.assign(
	{
		outer: betterdiscord.Webpack.getByKeys("outer", "overlay").outer,
		hasText: betterdiscord.Webpack.getModule((x) => x.primary && x.hasText && !x.hasTrailing).hasText,
		sm: betterdiscord.Webpack.getModule((x) => x.primary && x.hasText && !x.hasTrailing).sm,
		buttonChildrenWrapper: betterdiscord.Webpack.getModule((x) => x.primary && x.hasText && !x.hasTrailing).buttonChildrenWrapper,
		disabledButtonWrapper: betterdiscord.Webpack.getByKeys("disabledButtonWrapper", "sizeSmall").disabledButtonWrapper,
		fullscreenOnMobile: betterdiscord.Webpack.getByKeys("focusLock", "fullscreenOnMobile").fullscreenOnMobile,
		clickableImage: betterdiscord.Webpack.getByKeys("gameState", "clickableImage").clickableImage,
		bannerButton: betterdiscord.Webpack.getByKeys("bannerButton").bannerButton
	},
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getByKeys("container", "bar", "progress")),
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getModule((x) => x.container && x.badge && Object.keys(x).length === 2)),
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getByKeys("colorPrimary", "grow")),
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getByKeys("lineClamp2Plus")),
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getByKeys("badgeContainer", "badgesContainer")),
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getByKeys("tabularNumbers")),
	betterdiscord.Webpack.getByKeys("icon", "buttonInner"),
	Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getModule((x) => x.buttonContainer && Object.keys(x).length === 1))
);
let CSS = webpackify(
	`\n  	body {\n  			.custom-user-profile-theme:not(.disable-profile-themes) {\n  					--control-primary-background-default: var(--profile-gradient-button-color);\n  					--control-primary-background-hover: color-mix(in srgb, var(--profile-gradient-button-color) 80%, transparent);\n  					--control-primary-background-active: color-mix(in srgb, var(--profile-gradient-button-color) 70%, transparent);\n  			}\n  	}\n\n  	.outer.user-profile-modal-v2, .outer.user-profile-modal {\n  			height: fit-content;\n  			min-height: 400px;\n  			max-width: 600px;\n  			min-width: 600px;\n  			border-radius: 5px;\n  			border: unset;\n  			--profile-gradient-start: color-mix(in oklab, var(--profile-gradient-primary-color) 100%, var(--profile-gradient-primary-color)) !important;\n  			--profile-gradient-end: color-mix(in oklab, var(--profile-gradient-secondary-color) 100%, var(--profile-gradient-secondary-color)) !important;\n  			--custom-user-profile-theme-color-blend: linear-gradient(color-mix(in oklab, var(--profile-gradient-overlay-color), var(--profile-gradient-start)), color-mix(in oklab, var(--profile-gradient-overlay-color), var(--profile-gradient-end)));\n  	}\n  	.outer.user-profile-modal-v2.custom-user-profile-theme:not(.disable-profile-themes) {\n  			:is(.topSectionNormal, .body) {\n  					background-color: unset !important;\n  			}\n  	}\n  	.inner {\n  			position: relative;\n  			pointer-events: auto;\n  			display: flex;\n  			flex-direction: column;\n  			min-height: 0;\n  	}\n  	:where(.theme-dark) .outer:not(.disable-profile-themes) .inner {\n  			background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), var(--custom-theme-base-color, var(--background-secondary, var(--background-base-lower))) !important;\n  	}\n  	:where(.theme-light) .outer:not(.disable-profile-themes) .inner {\n  			background: var(--custom-theme-base-color, var(--background-secondary, var(--background-base-lower))) !important;\n  	}\n  	.custom-theme-background:is(.user-profile-modal-v2) .theme-dark, .theme-dark.custom-theme-background:is(.user-profile-modal-v2) {\n  			--custom-theme-base-color: var(--custom-user-profile-theme-color-blend, var(--theme-base-color-dark)) !important;\n  	}\n  	.custom-theme-background:is(.user-profile-modal-v2) .theme-light, .theme-light.custom-theme-background:is(.user-profile-modal-v2) {\n  			--custom-theme-base-color: var(--custom-user-profile-theme-color-blend, var(--theme-base-color-light)) !important;\n  	}\n  	.custom-theme-background:is(.disable-profile-themes) {\n  			 --custom-theme-base-color: unset !important;\n  			 --custom-theme-base-color-amount: 0% !important;\n  	}\n  	.custom-user-profile-theme:is(.disable-profile-themes) {\n  			--custom-theme-text-color: unset !important;\n  			--custom-theme-text-color-amount: 0% !important;\n  	}\n  	.inner .userBanner {\n  			position: absolute;\n  			z-index: 0;\n  			opacity: 25%;\n  			mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));\n  			pointer-events: none;\n  	}\n  	.inner .header {\n  			display: flex;\n  			align-items: center;\n  			padding: 20px; \n  			flex-direction: row;\n  	}\n  	.inner .avatar {\n  			position: unset !important;\n  			margin-right: 20px;\n  			width: unset !important;\n  	}\n  	.inner .clanTagContainer {\n  			max-width: 80px;\n  			overflow: hidden;\n  	}\n  	.inner .clanTag {\n  			align-items: center;\n  			background: rgba(0,0,0,0.2);\n  			border-radius: 4px;\n  			display: inline-flex;\n  			line-height: 16px !important;\n  			padding: 0 4px;\n  			transition: background .1s ease-in-out;\n  			vertical-align: middle;\n  			height: 20px;\n  	}\n  	.inner .clanTagInner {\n  			align-items: center;\n  			display: inline-flex;\n  			line-height: 16px !important;\n  			max-width: 60px;\n  	}\n  	.inner .tagBadge {\n  			margin-right: 2px;\n  			margin-top: 0;\n  			width: 14px;\n  			height: 14px;\n  	}\n  	.headerInfo {\n  			flex: 1;\n  			min-width: 0; \n  			padding-right: 16px;\n  			position: relative;\n  	}\n  	.nameSection {\n  			display: flex; \n  			white-space: normal; \n  			word-break: break-word; \n  			line-height: 20px; \n  			flex-wrap: wrap; \n  			margin-right: 20px;\n  			align-items: baseline;\n  	}\n  	.nameSection .displayName {\n  			color: var(--interactive-text-active);\n  			font-weight: 600;\n  			font-size: 18px;\n  	}\n  	.nameSection .nameTag {\n  			color: var(--header-secondary, var(--text-default));\n  			font-weight: 500;\n  			font-size: 14px;\n  	}\n  	.nameSection .nameTag.nameTagPomelo {\n  			margin-left: 5px;\n  	}\n  	.profileBadges, .profileBadges:is([style="display: contents;"]) .profileBadgeWrapper {\n  			margin-top: 4px;\n  	}\n  	.profileBadge {\n  			background-repeat: no-repeat;\n  			background-size: contain;\n  			background-position: 50%;\n  			cursor: pointer;\n  			width: 24px;\n  			height: 24px;\n  	}\n  	.profileBadgeWrapper {\n  			margin-right: 6px;\n  	}\n  	.profileButtons {\n  			display: flex;\n  			align-items: center;\n  			gap: 8px;\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText:not(.primaryFilled) {\n  					background: var(--green, var(--control-primary-background-default));\n  					svg {\n  							display: none;\n  					}\n  			}\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					padding: 2px 16px;\n  					.buttonChildrenWrapper {\n  							padding: unset;\n  					} \n  			}\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):hover, .hasText:not(.primaryFilled):hover {\n  					background: var(--green-hover, var(--control-primary-background-hover)) !important;\n  			}\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):active, .hasText:not(.primaryFilled):active {\n  					background: var(--green-active, var(--control-primary-background-active)) !important;\n  			}\n  			.bannerButton, .sm:not(.hasText) {\n  					background: unset !important;\n  					border: unset !important;\n  					color: #7c7e81;\n  					width: var(--custom-button-button-sm-height);\n  					padding: 0;\n  					svg {\n  							stroke: #7c7e81;\n  					}\n  			}\n  			.bannerButton:hover, .sm:not(.hasText):hover {\n  					color: var(--interactive-hover, var(--interactive-text-hover));\n  					svg {\n  							stroke: var(--interactive-hover, var(--interactive-text-hover));\n  					}\n  			}\n  			.bannerButton:active, .sm:not(.hasText):active {\n  					color: var(--interactive-active, var(--interactive-text-active));\n  					svg {\n  							stroke: var(--interactive-active, var(--interactive-text-active));\n  					}\n  			}\n  	}\n  	.topSectionPlaying .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: var(--background-brand);\n  			}\n  	}\n  	.topSectionSpotify .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: #43b581\n  			}\n  	}\n  	.topSectionStreaming .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: #593695\n  			}\n  	}\n  	.topSectionXbox .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: #107c10\n  			}\n  	}\n  	.headerFill {\n  			background-color: rgba(0,0,0,.05);\n  			display: flex; \n  			flex-direction: column;\n  	}\n  	.tabBarItem {\n  			display: flex;\n  			align-items: center;\n  			margin-right: 40px;\n  			font-size: 14px;\n  			font-weight: 500;\n  			color: var(--interactive-normal, var(--interactive-text-default));\n  			border-bottom: 3px solid transparent;\n  			cursor: pointer;\n  	}\n  	.tabBarItem:hover {\n  			color: var(--interactive-hover, var(--interactive-text-hover));\n  			border-bottom: 3px solid transparent;\n  			border-bottom-color: var(--interactive-active, var(--interactive-text-active));\n  	}\n  	.tabBarItem[aria-selected=true] {\n  			color: var(--interactive-active, var(--interactive-text-active));\n  			border-bottom: 3px solid transparent;\n  			border-bottom-color: var(--interactive-active, var(--interactive-text-active));\n  	}\n  	.inner .body {\n  			display: flex;\n  	}\n  	.infoScroller {\n  			padding: 0 20px;\n  			height: 100%;\n  			&::-webkit-scrollbar {\n  					background: none;\n  					border-radius: 8px;\n  					width: 8px;\n  			}\n  			&::-webkit-scrollbar-thumb {\n  					background-clip: padding-box;\n  					border: solid 2px #0000;\n  					border-radius: 8px;\n  			}\n  			&:hover::-webkit-scrollbar-thumb {\n  					background-color: var(--bg-overlay-6, var(--background-tertiary, var(--background-base-lowest)));\n  			}\n  	}\n  	.listScroller {\n  			padding: 8px 0;\n  			&::-webkit-scrollbar {\n  					background: none;\n  					border-radius: 8px;\n  					width: 8px;\n  			}\n  			&::-webkit-scrollbar-thumb {\n  					background-clip: padding-box;\n  					border: solid 2px #0000;\n  					border-radius: 8px;\n  			}\n  			&:hover::-webkit-scrollbar-thumb {\n  					background-color: var(--bg-overlay-6, var(--background-tertiary, var(--background-base-lowest)));\n  			}\n  	}\n  	.inner .scrollerBase {\n  			box-sizing: border-box;\n  			min-height: 0;\n  			display: flex;\n  			flex-direction: column;\n  			flex: 1 1 auto;\n  	}\n  	.userInfoSection {\n  			padding: 20px 0 10px 0;\n  	}\n  	.userInfoSection:empty {\n  			display: none;\n  	}\n  	.userInfoSectionHeader {\n  			font-weight: 700;\n  			font-size: 12px;\n  			color: var(--channels-default);\n  			margin-bottom: 10px;\n  			text-transform: uppercase;\n  	}\n  	.divider {\n  			background-color: var(--interactive-normal, var(--interactive-text-default));\n  			border-radius: 50%;\n  			height: 4px;\n  			width: 4px;\n  	}\n  	.userBio .lineClamp2Plus {\n  			-webkit-line-clamp: unset !important;\n  	}\n  	.guildIcon {\n  			border-radius: 4px;\n  			width: 16px;\n  			height: 16px;\n  	}\n  	.noIcon {\n  			line-height: 16px;\n  			background-color: var(--background-base-lower);\n  			color: var(--text-default);\n  			text-align: center;\n  			width: 16px;\n  			height: 16px;\n  			background-clip: padding-box;\n  			background-position: 50%;\n  			background-size: 100% 100%;\n  			position: relative;\n  			border-radius: 4px;\n  	}\n  	.acronym {\n  			overflow: hidden;\n  			white-space: nowrap;\n  			width: 100%;\n  	}\n  	.rolesList {\n  			[data-text-variant="text-xs/normal"] {\n  					font-weight: 500;\n  			}\n  	}\n  	.inner .activity {\n  			padding: 20px;\n  			border-radius: var(--radius-sm);\n  			position: relative;\n  	}\n  	.inner .activityHeader {\n  			font-family: var(--font-display);\n  			font-size: 12px; \n  			line-height: 1.2857142857142858;\n  			font-weight: 600;\n  			color: var(--header-secondary, var(--text-default));\n  			margin-bottom: 8px;\n  			text-transform: uppercase;\n  	}\n  	.customStatusContent {\n  			user-select: text;\n  			white-space: pre-wrap;\n  			overflow: hidden;\n  			.emoji {\n  					margin-right: 8px;\n  					height: 20px;\n  					width: 20px;\n  			}\n  			.emoji+span+.customStatusText {\n  					display: inline;\n  			}\n  			&:has(.customStatusText:empty) .emoji {\n  					height: 48px;\n  					width: 48px;\n  			}\n  	}\n  	.customStatusContent .customStatusText {\n  			color: var(--header-secondary, var(--text-default));\n  			font-weight: 500;\n  			font-size: 14px;\n  	}\n  	.nameSection .botTag {\n  			flex: 0 0 auto;\n  			margin-left: 1ch;\n  			align-self: center;\n  	}\n  	.userInfoSection .note {\n  			margin: -4px;\n  	}\n  	.userInfoSection .note textarea {\n  			border-radius: 3px;\n  			border: unset !important;\n  			background-color: unset !important;\n  			font-size: 14px;\n  			line-height: 16px;\n  			padding: 4px;\n  	}\n  	.userInfoSection .note textarea:focus {\n  			background-color: var(--background-tertiary, var(--background-base-lowest)) !important;\n  	}\n  	.connectedAccounts {\n  			display: flex;\n  			justify-content: space-between;\n  			flex-wrap: wrap;\n  			flex-direction: row;\n  			margin-top: -20px;\n  			list-style-type: none;\n  	}\n  	.connectedAccount {\n  			border-radius: 3px;\n  			margin-top: 20px;\n  			padding: 8px 14px 8px 8px;\n  			width: 240px;\n  			border: 1px solid;\n  			border-color: var(--background-modifier-accent, var(--background-modifier-active));\n  			flex: 0 1 auto !important\n  	}\n  	.empty {\n  			display: flex;\n  			flex-direction: column;\n  			align-items: center;\n  			justify-content: center;\n  			box-sizing: border-box;\n  			flex: 1;\n  			min-height: 100%;\n  			padding: 20px 0;\n  	}\n  	.emptyIcon {\n  			width: 240px;\n  			height: 130px;\n  			background-position: 50%;\n  			background-repeat: no-repeat;\n  			background-size: cover;\n  	}\n  	.theme-dark .emptyIconStreamerMode {\n  			background-image: url('https://discord.com/assets/e18336bc1141d8a5e88379e41e91cacb.svg');\n  	}\n  	.theme-light .emptyIconStreamerMode {\n  			background-image: url('https://discord.com/assets/40311479d87be9ab59aef9571750cd5f.svg');\n  	}\n  	.emptyText {\n  			font-weight: 500;\n  			font-size: 14px;\n  			line-height: 16px;\n  			margin-top: 12px;\n  			text-transform: uppercase;\n  			color: var(--header-secondary, var(--text-default));\n  	}\n  	:is(.theme-dark) .emptyIconFriends {\n  			background-image: url(https://discord.com/assets/ca3f5ec71bb86c6aeb015bb0d54a10fa.svg);\n  	}\n  	:is(.theme-dark) .emptyIconGuilds {\n  			background-image: url(https://discord.com/assets/1fc96c69951bfa5c.svg);\n  	}\n  	:is(.theme-light) .emptyIconFriends {\n  			background-image: url(https://discord.com/assets/898a7791572e9e050735eeec7e25739d.svg);\n  	}\n  	:is(.theme-light) .emptyIconGuilds {\n  			background-image: url(https://discord.com/assets/38af48da1542dfedce582fc5e8042285.svg);\n  	}\n  	.widgetCard {\n  			align-items: start;\n  			display: grid;\n  			gap: 16px;\n  			grid-template-columns: auto 1fr;\n  			justify-content: flex-start;\n  			position: relative;\n  			width: 100%;\n  			z-index: 0;\n  	}\n  	.gameCover {\n  			border-radius: 8px;\n  			box-sizing: border-box;\n  			height: var(--custom-game-cover-height, 117px);\n  			width: var(--custom-game-cover-width, 88px);\n  	}\n  	.gameCover:not(.gameCover > .gameCover):before {\n  			background: linear-gradient(150deg, hsla(0, 0%, 100%, .2), hsla(0, 0%, 100%, 0) 40%);\n  			border-radius: 8px;\n  			box-shadow: inset 0 0 13px 0 hsla(0, 0%, 100%, .06), inset 0 0 0 1px var(--border-faint);\n  			content: "";\n  			height: 100%;\n  			left: 0;\n  			position: absolute;\n  			top: 0;\n  			transition: background 50ms ease-in;\n  			width: 88px;\n  			z-index: 1;\n  	}\n  	.gameCover img[src="null"] {\n  			display: none;\n  	}\n  	.full-motion .hoverActiveEffect {\n  			transition: transform .15s ease-in-out;\n  			will-change: transform;\n  	}\n  	.full-motion .hoverActiveEffect:hover {\n  			transform: scale(1.0225);\n  	}\n  	.full-motion .hoverActiveEffect:active {\n  			transform: scale(0.9775)\n  	}\n  	.fallback {\n  			align-items: center;\n  			display: flex;\n  			flex-direction: column;\n  			justify-content: center;\n  			padding: 4px;\n  			text-align: center;\n  			word-break: break-word;\n  	}\n  	.coverFallbackText {\n  			display: -webkit-box;\n  			-webkit-box-orient: vertical;\n  			overflow: hidden;\n  			font-size: 10px;\n  			font-weight: 500;\n  			line-height: 1.2;\n  			color: var(--text-default);\n  			text-transform: uppercase;\n  	}\n  	.widgetDetails {\n  			display: flex;\n  			flex-direction: column;\n  			flex-grow: 1;\n  			gap: 4px;\n  			justify-content: center;\n  			min-height: 117px;\n  			overflow-wrap: break-word;\n  			word-break: break-word;\n  	}\n  	.widgetTitle {\n  			color: var(--text-default);\n  			font-size: 14px;\n  			font-weight: 500;\n  			line-height: 1.2857142857142858;\n  	}\n  	.commentIcon {\n  			float: left;\n  			margin: 3px 4px 0 0;\n  	}\n  	.widgetCoverList {\n  			display: grid;\n  			grid-template-columns: repeat(var(--custom-game-cover-grid-row-size, 5), var(--custom-game-cover-width, 88px));\n  			justify-content: space-between;\n  			row-gap: 16px;\n  	}\n  	.cardList {\n  			align-items: stretch;\n  			display: flex;\n  			flex-direction: column;\n  			gap: 12px;\n  	}\n  	.tagListContainer {\n  			box-sizing: border-box;\n  			display: flex;\n  			flex-direction: row;\n  			flex-wrap: wrap;\n  			gap: 4px;\n  			margin-top: 4px;\n  	}\n  	\n  	.activityCardsContainer {\n  			flex: 1 0 fit-content;\n  			scroll-snap-type: y mandatory;\n  			max-height: 240px;\n  			& .overlay {\n  							scroll-snap-align: start;\n  							scroll-margin-top: 15px;\n  					}\n			&::-webkit-scrollbar {\n  					background: none;\n  					border-radius: 8px;\n  					width: 8px;\n  			}\n  			&::-webkit-scrollbar-thumb {\n  					background-clip: padding-box;\n  					border: solid 2px #0000;\n  					border-radius: 8px;\n  			}\n  			&:hover::-webkit-scrollbar-thumb {\n  					background-color: var(--white));\n  			}\n  	}\n  	.activityProfileContainerVoice .bodyNormal > div:nth-child(1) {\n  			height: 60px;\n  			width: 60px;\n  			background: rgb(255 255 255 / 0.15) !important;\n  			margin-right: 20px;\n  	}\n  	.activityProfileContainerVoice .bodyNormal > div:nth-child(1):before {\n  			background: rgb(255 255 255 / 0.15) !important;\n  	}\n  	:is(.activityProfileContainerVoice, .activityProfileContainerStream) .textRow svg {\n  			width: 12px;\n  			height: 12px;\n  			margin-right: 2px;\n  			position: relative;\n  			bottom: 1px;\n  			path {\n  					fill: #fff;\n  			}\n  	}\n  	.activityProfile .headerText {\n  			font-family: var(--font-display);\n  			font-size: 12px;\n  			line-height: 1.2857142857142858;\n  			font-weight: 700;\n  			text-transform: uppercase;\n  	}\n  	.activityProfile .contentImagesProfile {\n  			display: grid;\n  			flex: 1;\n  			margin-bottom: 3px;\n  	}\n  	.activityProfile .contentImagesProfile .mediaProgressBarContainer {\n  			margin-top: 10px;\n  			margin-right: 8px;\n  			width: auto;\n  					&> div {\n  							display: grid;\n  							grid-template-areas: "progressbar progressbar" "lefttext righttext";\n  					}\n  					.bar {\n  							background-color: rgba(79,84,92,.16);\n  							height: 4px;\n  							grid-area: progressbar;\n  					}\n  					[data-text-variant="text-xs/normal"] {\n  							color: var(--white) !important;\n  							grid-area: lefttext;\n  					}\n  					[data-text-variant="text-xs/normal"]:last-child {\n  							justify-self: end;\n  							grid-area: righttext;\n  					}   \n  			\n  	}\n  	.activityProfile :is(.nameNormal, .details, .state, .timestamp) {\n  			color: #fff;\n  	}\n  	.activityProfile .textRow {\n  			display: block;\n  			font-size: 14px;\n  			line-height: 18px;\n  	}\n  	.activityProfile .ellipsis {\n  			white-space: nowrap;\n  			text-overflow: ellipsis;\n  			overflow: hidden;\n  	}\n  	.activityProfile .state {\n  			white-space: wrap;\n  	}\n  	.activityProfile .actionsProfile {\n  			display: flex;\n  			flex: 0 1 auto;\n  			flex-direction: column;\n  			flex-wrap: nowrap;\n  			justify-content: flex-end;\n  			align-items: flex-end;\n  			margin-left: 20px;\n  	}\n  	.activityProfile .buttonContainer {\n  			flex-direction: inherit;\n  			gap: inherit;\n  	}\n  	:is(.activityProfileContainerSpotify, .activityProfileContainerVoice, .activityProfileContainerStream) .actionsProfile {\n  			gap: 6px;\n  			flex-direction: row;\n  	}\n  	.activityProfile .actionsProfile .hasText {\n  			padding: 2px 16px;\n  			&:has(svg path[d^="M20.97 4.06c0 .18.08.35.24.43.55.28.9.82 1.04 1.42.3 1.24.75 3.7.75 7.09v4.91a3.09 3.09 0 0 1-5.85 1.38l-1.76-3.51a1.09 1.09 0 0 0-1.23-.55c-.57.13-1.36.27-2.16.27s-1.6-.14-2.16-.27c-.49-.11-1 .1-1.23.55l-1.76 3.51A3.09 3.09 0 0 1 1"]) {\n  					background: var(--white) !important;\n  					border: unset !important;\n  					color: var(--background-brand);\n  					&:hover {\n  							background: #e6e6e6 !important;\n  					}\n  					&:active {\n  							background: #ccc !important;\n  					}\n  			}\n  	}\n  	.activityProfile .actionsProfile .sm:not(.hasText) {\n  			padding: 0;\n  			width: calc(var(--custom-button-button-sm-height) + 4px);\n  	}\n  	.activityProfile .actionsProfile button {\n  			background: transparent !important;\n  			border: 1px solid var(--white) !important;\n  			font-size: 14px;\n  			margin-bottom: 8px;\n  			width: auto;\n  			height: 32px;\n  			min-height: 32px !important;\n  			color: #fff;\n  			svg {\n  					display: none;\n  			}\n  	}\n  	:where(.button).icon {\n  			width: var(--custom-button-button-sm-height) !important;\n  	} \n  	.activityProfile .actionsProfile button:active {\n  			background-color: hsla(0,0%,100%,.1) !important;\n  	}\n  	.activityProfile .actionsProfile button svg {\n  			display: unset;\n  	}\n  	.activityProfile .actionsProfile .disabledButtonWrapper {\n  			margin-bottom: 8px;\n  			width: auto;\n  	}\n  	.activityProfile .badgeContainer .tabularNumbers {\n  			color: #f6fbf9 !important;\n  	}\n  	.activityProfile .badgeContainer svg path {\n  			fill: #f6fbf9 !important;\n  	}\n  	.activityProfile .assets:not(:empty) {\n  			margin-right: 20px;\n  	}\n  	.activityProfile .assets .gameIcon {\n  			-webkit-user-drag: none;\n  			background-size: 100%;\n  			border-radius: 3px;\n  	}\n  	.activityProfile .userList {\n  			padding-top: 3px;\n  	}\n  	.activityProfile .assets .assetsLargeImage {\n  			width: 90px;\n  			height: 90px;\n  			border-radius: 8px; \n  			object-fit: cover;\n  	}\n  	.activityProfile .assets .assetsLargeImageTwitch {\n  			width: 160px;\n  			height: 90px;\n  	}\n  	.activityProfile .assets:has(.assetsSmallImage) .assetsLargeImage {\n  			mask: url('https://discord.com/assets/725244a8d98fc7f9f2c4a3b3257176e6.svg');\n  	}\n  	.activityProfile .assets .assetsSmallImage, .activityProfile .assets .assetsSmallImage path {\n  			width: 30px;\n  			height: 30px;\n  			border-radius: 50%;\n  			position: absolute;\n  			bottom: -2px;\n  			right: -4px; \n  	}\n  	.activityProfile .assets .assetsLargeImage path {\n  			transform: scale(3.65) !important;\n  	}\n  	.activityProfile .assets svg.assetsSmallImage {\n  			border-radius: unset !important;\n  	}   \n  	.activityProfile .assets .assetsSmallImage path {\n  			transform: scale(1.3) !important;\n  	}\n  	.activityProfile .activityProfileContainerStream .streamPreviewImage {\n  			max-height: 90px;\n  			border-radius: 8px;\n  			margin-right: 20px;\n  	}\n  	.activityProfile .activityProfileContainerStream .streamPreviewPlaceholder {\n  			width: 120px;\n  			height: 120px;\n  			margin-right: 20px;\n  	}\n  	.activityProfile .assets.clickableImage {\n  			border-radius: 3px;\n  			cursor: pointer;\n  			&:after {\n  					border-radius: 3px;\n  			}\n  	}\n  	:is(.topSectionPlaying, .topSectionSpotify, .topSectionStreaming, .topSectionXbox) {\n  			.userBanner {\n  					opacity: 50%;\n  			}\n  			.avatar rect {\n  					fill: #fff;\n  			}\n  			.nameTag {\n  					color: #fff; \n  					font-weight: 600; \n  					opacity: 0.6;\n  			}\n  			.botTag {\n  					background: var(--white);\n  					> span {\n  							color: var(--bg-brand);\n  					}\n  			}\n  			.profileButtons {\n  					.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  							background: #fff;  	 \n  					}\n  					.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):hover, .hasText:hover {\n  							background: #f8f9fd !important;\n  					}\n  					.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):active, .hasText:active {\n  							background: #e3e7f8 !important;\n  					}\n  					.bannerButton, .sm:not(.hasText) {\n  							color: var(--white);\n  							svg {\n  									stroke: var(--white) !important;\n  							}\n  					}\n  			}\n  			.tabBarItem {\n  					color: rgba(255, 255, 255, 0.4);\n  			}\n  			.tabBarItem:hover {\n  					color: rgba(255, 255, 255, 0.6);\n  			}\n  			.tabBarItem[aria-selected=true] {\n  					color: var(--interactive-active, var(--interactive-text-active));\n  			}\n  			.activityHeader {\n  					color: var(--white);\n  			}\n  			.customStatusText {\n  					color: var(--white);\n  					font-weight: 550;\n  			}\n  			.divider {\n  					background-color: var(--white);\n  			}\n  	}\n\n  	.theme-light :is(.topSectionPlaying, .topSectionSpotify, .topSectionStreaming, .topSectionXbox) {\n  			.displayName {\n  					color: #fff;\n  			}\n  			.tabBarItem:hover {\n  					border-bottom-color: transparent;\n  			}\n  			.tabBarItem[aria-selected=true] {\n  					color: #fff;\n  					border-bottom-color: #fff;\n  			}\n  	}\n  	\n  	.background {\n  			background: url('https://raw.githubusercontent.com/KingGamingYT/kinggamingyt.github.io/refs/heads/main/Assets/DiscordProfileModalSkeleton_2020_Darker.svg');\n  			background-size: cover;\n  	}\n  	.background:before {\n  			left: 0;\n  			top: 0;\n  			right: 0;\n  	}\n  	.background:after {\n  			display: none;\n  	}\n  	.fullscreenOnMobile > div > .content {\n  			width: 600px;\n  			height: 400px;\n  	}\n\n  	/* badges */\n\n  	.profileBadges {\n  			/* Staff */\n  			.profileBadgeStaff\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.76273 5.98744C5.76273 5.98744 6.19897 5.33477 6.37989 5.04563C6.56082 4.75649 5.91152 4.07338 5.65958 3.85695C5.40765 3.64052 5.01029 3.74873 5.01029 3.74873C1.83992 5.15384 0.253888 8.03677 0.0374573 8.61335C-0.178974 9.18994 0.588679 9.81894 1.15512 10.1267C1.41551 10.2687 1.82977 9.95421 2.08509 9.72087L2.17133 9.63294L2.30491 9.49768L2.3066 9.49599L10.9317 18.0873L12.1102 16.9087L14.2762 14.7427L5.75089 5.99927L5.76273 5.98744Z' fill='%235865F2'/%3E%3Cpath d='M26.1396 15.0504L26.5944 14.6175L30.6813 18.6655C30.71 18.6908 30.7404 18.701 30.7675 18.701C30.8453 18.701 30.9095 18.63 30.9095 18.63C30.9095 18.63 35.4343 14.1407 35.4495 14.1255C35.5831 13.9936 35.4495 13.9209 35.4495 13.9209L31.9596 10.4073L31.9545 10.4123L31.476 9.94398L31.7431 9.68697L32.3146 9.75291L32.2064 8.9954L32.3501 8.84999L32.1354 7.75769C31.3897 6.7009 29.3472 5.00834 29.3472 5.00834L28.2785 4.81558L28.1703 4.95931L27.3655 4.83926L27.4433 5.52575L27.494 5.57647L27.2556 5.81658L25.9367 4.52645C25.9367 4.52645 18.2838 0.3703 17.8763 0.177541C17.6464 0.0710164 17.4773 0 17.315 0C17.1898 0 17.0681 0.0422717 16.9278 0.142033C16.6031 0.3703 16.7942 0.830215 16.7942 0.830215L21.5523 9.62271L22.5042 10.5662L22.2066 10.8638L22.0967 10.9737L21.3358 10.8689L21.4525 11.623L21.2327 11.8428L21.1938 11.8039C21.1583 11.7684 21.1093 11.7498 21.0619 11.7498C21.0146 11.7498 20.9672 11.7684 20.93 11.8039C20.8573 11.8766 20.8573 11.995 20.93 12.0677L20.9689 12.1066L20.8641 12.2131L20.837 12.1844C20.7998 12.1489 20.7525 12.1303 20.7052 12.1303C20.6561 12.1303 20.6088 12.1489 20.5733 12.1844C20.5006 12.2571 20.5006 12.3754 20.5733 12.4482L20.602 12.4769L18.6 14.489L18.5544 14.4434C18.5172 14.4079 18.4698 14.3893 18.4225 14.3893C18.3751 14.3893 18.3278 14.4079 18.2906 14.4434C18.2179 14.5161 18.2179 14.6344 18.2906 14.7071L18.3379 14.7528L18.2314 14.8593L18.1959 14.8255C18.1604 14.7883 18.1114 14.7697 18.0657 14.7697C18.0167 14.7697 17.9693 14.7883 17.9321 14.8255C17.8611 14.8982 17.8611 15.0149 17.9321 15.0876L17.9676 15.1231L17.7073 15.3869L17.6717 15.7217L17.8087 15.862L17.8053 15.8637L17.6396 16.0328L6.83668 26.834L6.69634 26.7174L6.24826 26.7816L5.99463 27.0386L5.97772 27.0217C5.94052 26.9845 5.89318 26.9659 5.84583 26.9659C5.79849 26.9659 5.74946 26.9845 5.71395 27.0217C5.64124 27.0944 5.64124 27.2111 5.71395 27.2838L5.73424 27.3041L5.6294 27.4123L5.61926 27.4022C5.58375 27.365 5.53472 27.3464 5.48737 27.3464C5.44003 27.3464 5.39268 27.365 5.35548 27.4022C5.28447 27.4749 5.28447 27.5915 5.35548 27.6642L5.36732 27.6778L3.3907 29.6882L3.35012 29.6476C3.31292 29.6104 3.26727 29.5935 3.21823 29.5935C3.17089 29.5935 3.12354 29.6104 3.08634 29.6476C3.01364 29.7203 3.01364 29.8387 3.08634 29.9114L3.13031 29.9537L3.02547 30.0602L2.99334 30.0281C2.95615 29.9926 2.9088 29.974 2.85977 29.974C2.81411 29.974 2.76508 29.9926 2.72957 30.0281C2.65686 30.1008 2.65686 30.2191 2.72957 30.2919L2.76339 30.3274L2.61628 30.4778L1.85032 30.3409L1.90781 31.1965L1.66602 31.4433L1.87568 32.5965C1.87568 32.5965 2.19695 33.6009 2.85808 34.2671C3.49891 34.913 4.47623 35.2224 4.51851 35.2545L5.62264 35.4473L5.89487 35.1801L6.65576 35.3036L6.53064 34.5511L6.76228 34.3246L6.86881 34.4311C6.90432 34.4666 6.95166 34.4852 6.99901 34.4852C7.04635 34.4852 7.09538 34.4666 7.13089 34.4311C7.2036 34.3567 7.2036 34.24 7.13089 34.1673L7.02606 34.0625L7.13427 33.9576L7.22558 34.049C7.26109 34.0862 7.31012 34.1048 7.35747 34.1048C7.40481 34.1048 7.45216 34.0862 7.48936 34.049C7.56206 33.9762 7.56206 33.8596 7.48936 33.7869L7.39974 33.6956L9.4068 31.7156L9.49472 31.8035C9.53023 31.8407 9.57927 31.8576 9.62661 31.8576C9.67395 31.8576 9.7213 31.8407 9.7585 31.8035C9.82951 31.7308 9.82951 31.6124 9.7585 31.5397L9.67226 31.4552L9.77879 31.3486L9.85319 31.423C9.88869 31.4586 9.93604 31.4771 9.98338 31.4771C10.0324 31.4771 10.0798 31.4586 10.1153 31.423C10.188 31.3503 10.188 31.232 10.1153 31.1593L10.0426 31.0866L10.2674 30.8667L10.3486 30.3849L10.2286 30.2648L10.2302 30.2631L10.4484 30.0467L21.1786 19.3131L21.1735 19.3029L21.3832 19.5193L21.7197 19.4821L22.0223 19.1778L22.0714 19.2268C22.1086 19.2623 22.1559 19.2809 22.2033 19.2809C22.2506 19.2809 22.2996 19.2623 22.3352 19.2268C22.4079 19.1541 22.4079 19.0358 22.3352 18.9631L22.2861 18.914L22.3926 18.8092L22.4298 18.8464C22.4653 18.8819 22.5127 18.9005 22.5617 18.9005C22.6091 18.9005 22.6564 18.8819 22.6919 18.8464C22.7646 18.7737 22.7646 18.6553 22.6919 18.5826L22.6547 18.5437L24.6601 16.535L24.7125 16.5874C24.748 16.6229 24.7954 16.6415 24.8427 16.6415C24.8917 16.6415 24.9391 16.6229 24.9746 16.5874C25.0473 16.5147 25.0473 16.3963 24.9746 16.3236L24.9222 16.2712L25.0287 16.1647L25.0693 16.2069C25.1065 16.2425 25.1538 16.2611 25.2012 16.2611C25.2485 16.2611 25.2959 16.2425 25.3331 16.2069C25.4058 16.1325 25.4058 16.0159 25.3331 15.9432L25.2925 15.9009L25.5157 15.6777L26.2613 15.7944L26.1396 15.0504Z' fill='%235865F2'/%3E%3Cpath d='M27.6287 27.1822L22.8723 23.5773L22.0251 22.7048L18.7432 25.9868L19.5683 26.7747L22.6677 31.4229L26.8475 36.0001L31.6648 31.5058L27.6287 27.1822Z' fill='%235865F2'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url(https://static.discord.com/assets/7cfd90c8062139e4804a1fa59f564731.svg);\n  					}\n  			}\n  			/* Nitro */\n  			.profileBadgePremium {\n  					background-image: url("data:image/svg+xml,%3Csvg width='44' height='31' viewBox='0 0 44 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 26.6182C34.6274 26.6182 40 21.2456 40 14.6182C40 7.99075 34.6274 2.61816 28 2.61816C21.3726 2.61816 16 7.99075 16 14.6182C16 21.2456 21.3726 26.6182 28 26.6182Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.41624 10.8662C3.26896 10.8662 3.97944 10.1698 3.97944 9.33394C3.97944 8.49808 3.26896 7.80164 2.41624 7.80164H1.56354C0.71082 7.80164 0 8.49808 0 9.33394C0 10.1698 0.71082 10.8662 1.56354 10.8662H2.41624ZM34.677 29.3948C42.7778 25.7728 46.1886 16.5782 42.4936 8.91602C39.9354 3.48288 34.535 0.27884 28.8502 0H12.7909C11.3696 0 10.3747 1.1147 10.3747 2.3685C10.3747 3.7614 11.5118 4.73668 12.7909 4.73668H16.9122C17.7649 4.73668 18.4754 5.43312 18.4754 6.269C18.4754 7.10486 17.7649 7.80164 16.9122 7.80164H6.8219C5.9692 7.80164 5.25838 8.49808 5.25838 9.33394C5.25838 10.1698 5.9692 10.8662 6.8219 10.8662H14.07C14.9227 10.8662 15.6332 11.563 15.6332 12.399C15.6332 13.2348 14.9227 13.9312 14.07 13.9312H9.52194C8.66922 13.9312 7.95874 14.6276 7.95874 15.4636C7.95874 16.2994 8.66922 16.9962 9.52194 16.9962H12.6487C12.7909 18.668 13.2173 20.3396 13.9277 21.872C17.4808 29.5342 26.8606 32.8776 34.677 29.3948ZM20.132 19.018C18.0684 14.613 20.0388 9.40208 24.5326 7.3793C29.0264 5.3565 34.3424 7.28802 36.4058 11.693C38.4694 16.098 36.4994 21.3088 32.0052 23.3316C27.5114 25.3544 22.1956 23.423 20.132 19.018Z' fill='%234F5D7F'/%3E%3Cpath d='M31.6283 10.3513L34.4707 15.088C34.6129 15.3664 34.6129 15.5058 34.4707 15.7844L31.6283 20.521C31.4861 20.7996 31.2022 20.7996 31.06 20.7996H25.5172C25.2332 20.7996 25.0909 20.6602 24.9489 20.521L22.1064 15.7844C21.9646 15.5058 21.9646 15.3664 22.1064 15.088L24.9489 10.3513C25.0909 10.0728 25.3754 10.0728 25.5172 10.0728H31.06C31.3444 9.93335 31.4861 10.0728 31.6283 10.3513Z' fill='%23C5CEDD'/%3E%3C/svg%3E ");\n  			}\n  			.profileBadgePremiumTenure1MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.2725 17.8467C44.2725 22.6495 42.3841 27.1468 38.9569 30.5053C35.5365 33.8509 30.9609 35.692 26.0729 35.692C21.434 35.692 17.152 34.0089 13.9061 31.1657C11.4201 28.9951 9.5916 26.1717 8.62787 23.0153H4.95587L2.72413 12.6825H8.71947C8.99147 11.8793 9.3172 11.0952 9.69427 10.3357H2.2352L0 0.00293031H25.5741C36.2328 0.000396981 44.2725 7.67333 44.2725 17.8467Z' fill='%23AC350E'/%3E%3Cpath d='M33.1858 6.68227L35.7275 2.6952C32.8368 0.979331 29.3747 0 25.5751 0H0.000976562L8.29391 6.68266L33.1858 6.68227Z' fill='%23B94C01'/%3E%3Cpath d='M41.0936 27.9782L36.9143 25.1589L26.0752 30.2094L9.62628 21.7031H6.01468L4.95801 23.0119H8.63001C9.59388 26.1683 11.4223 28.9918 13.9084 31.1623C17.1548 34.0031 21.4363 35.6886 26.0752 35.6886C30.9632 35.6886 35.5388 33.8475 38.9591 30.5019C39.7468 29.7283 40.4615 28.8834 41.0936 27.9782Z' fill='%238C2E0E'/%3E%3Cpath d='M26.0727 28.2877C31.8397 28.2877 36.5147 23.6127 36.5147 17.8458C36.5147 12.0789 31.8397 7.40381 26.0727 7.40381C20.3058 7.40381 15.6309 12.0789 15.6309 17.8458C15.6309 23.6127 20.3058 28.2877 26.0727 28.2877Z' fill='%23922A08'/%3E%3Cpath d='M29.5604 8.00425C28.4403 7.60732 27.2603 7.40506 26.0719 7.40626C20.3047 7.40626 15.6299 12.0815 15.6299 17.8481C15.6299 17.9659 15.6349 18.0824 15.6389 18.1971L26.0719 17.8481L29.5604 8.00425Z' fill='%23792104'/%3E%3Cpath d='M30.2417 17.8452C30.2417 20.2155 28.4635 21.9818 26.0738 21.9818C23.6841 21.9818 21.9059 20.2175 21.9059 17.8452C21.9059 15.473 23.6841 13.7087 26.0738 13.7087C28.4635 13.7087 30.2417 15.475 30.2417 17.8452ZM42.9673 17.8452C42.9673 22.8628 40.7385 27.3232 37.1901 30.3439C34.2282 32.8652 30.3463 34.3807 26.0763 34.3807C21.6443 34.3807 17.6498 32.7635 14.6561 30.0878C12.1675 27.8678 10.4137 24.943 9.62754 21.7022H6.0158L4.34714 13.9848H9.6798C10.1757 12.2223 10.9443 10.5483 11.9578 9.02349H3.28914L1.62207 1.30615H25.5725C35.6874 1.30762 42.9673 8.63922 42.9673 17.8452ZM34.9647 17.8452C34.9647 12.9387 31.0191 9.02402 26.0738 9.02402C21.1285 9.02402 17.1823 12.9378 17.1823 17.8452C17.1823 22.7527 21.1279 26.6664 26.0738 26.6664C31.0197 26.6664 34.9647 22.7512 34.9647 17.8452Z' fill='%23D66B1F'/%3E%3Cpath d='M2.72461 12.6797L4.34528 13.9854L6.01234 21.7032L4.95634 23.0125L2.72461 12.6797Z' fill='%23A92600'/%3E%3Cpath d='M2.72461 12.6797H8.71954L9.67994 13.9854H4.34528L2.72461 12.6797Z' fill='%23B94C01'/%3E%3Cpath d='M2.23535 10.3326L3.28948 9.0249H11.9587L9.69455 10.3326H2.23535Z' fill='%238C2E0E'/%3E%3Cpath d='M2.23467 10.3328L3.2888 9.02506L1.62173 1.3072L0 0L2.23467 10.3328Z' fill='%23A92600'/%3E%3Cpath d='M27.5802 1.40918L3.00488 7.71065L3.28902 9.02545H11.9577C10.9438 10.5496 10.1749 12.2232 9.67862 13.9852H4.34595L4.89422 16.5269L18.6179 13.0078C20.1983 10.6008 22.9329 9.02091 26.0726 9.02091C27.5193 9.01731 28.9454 9.36345 30.2295 10.0296L39.457 7.66331C36.7254 4.23798 32.5674 1.90518 27.5802 1.40918Z' fill='%23E78A34'/%3E%3Cpath d='M42.9262 18.9429L34.3273 21.1477C33.0206 24.3951 29.8374 26.6647 26.0728 26.6647C24.0317 26.6729 22.0496 25.9809 20.457 24.7041L11.8936 26.8999C12.673 28.0767 13.6002 29.1487 14.6525 30.0895C15.8484 31.1554 17.191 32.0442 18.6394 32.7285L40.0068 27.2493C41.7254 24.8017 42.7357 21.9275 42.9262 18.9429Z' fill='%23CB5C0C'/%3E%3C/svg%3E ");\n  			}\n  			.profileBadgePremiumTenure3MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.2725 17.8463C44.2725 22.6491 42.3837 27.1464 38.9569 30.502C35.5361 33.8481 30.9609 35.6891 26.0729 35.6891C21.4336 35.6891 17.152 34.0061 13.9056 31.1628C11.4197 28.9921 9.59133 26.1688 8.62733 23.0124H4.95587L2.72413 12.6796H8.71907C8.9912 11.8764 9.3168 11.0924 9.69387 10.3328H2.23467L0 0H25.576C36.2328 0 44.2725 7.67293 44.2725 17.8463Z' fill='%23727E94'/%3E%3Cpath d='M33.1858 6.68227L35.7275 2.6952C32.8368 0.979334 29.3747 0 25.5746 0H0.000976562L8.29351 6.68267L33.1858 6.68227Z' fill='%239FA4B6'/%3E%3Cpath d='M41.0937 27.9782L36.9142 25.1589L26.0746 30.2094L9.62823 21.7031H6.0161L4.95996 23.0119H8.63156C9.59569 26.1682 11.4241 28.9915 13.9098 31.1623C17.1568 34.0031 21.4377 35.6886 26.0772 35.6886C30.9652 35.6886 35.5402 33.8475 38.9612 30.5015C39.7484 29.7282 40.4624 28.8834 41.0937 27.9782Z' fill='%23596478'/%3E%3Cpath d='M26.0729 28.2872C31.8398 28.2872 36.5147 23.6123 36.5147 17.8453C36.5147 12.0784 31.8398 7.40332 26.0729 7.40332C20.3059 7.40332 15.6309 12.0784 15.6309 17.8453C15.6309 23.6123 20.3059 28.2872 26.0729 28.2872Z' fill='%23576277'/%3E%3Cpath d='M29.5604 8.00146C28.4402 7.60453 27.2603 7.40226 26.0719 7.40332C20.3051 7.40332 15.6299 12.0787 15.6299 17.8453C15.6299 17.9629 15.635 18.0796 15.6388 18.1941L26.0719 17.8453L29.5604 8.00146Z' fill='%234B5362'/%3E%3Cpath d='M30.2407 17.8451C30.2407 20.2154 28.4625 21.9817 26.0727 21.9817C23.6831 21.9817 21.9054 20.2174 21.9054 17.8451C21.9054 15.4729 23.6835 13.7086 26.0727 13.7086C28.4619 13.7086 30.2407 15.4743 30.2407 17.8451ZM42.9662 17.8451C42.9662 22.8627 40.7379 27.3233 37.1895 30.3439C34.2271 32.8651 30.3458 34.3807 26.0727 34.3807C21.6413 34.3807 17.6467 32.763 14.653 30.0877C12.1646 27.8685 10.4106 24.9443 9.62447 21.7041H6.0122L4.34567 13.9862H9.6782C10.1743 12.2238 10.9433 10.5498 11.9569 9.02486H3.28914L1.62207 1.30713H25.5729C35.6869 1.30713 42.9662 8.63913 42.9662 17.8451ZM34.9643 17.8451C34.9643 12.9386 31.0186 9.02393 26.0727 9.02393C21.1269 9.02393 17.1818 12.9377 17.1818 17.8451C17.1818 22.7526 21.1274 26.6663 26.0727 26.6663C31.0182 26.6663 34.9643 22.7506 34.9643 17.8451Z' fill='%23A9BAC0'/%3E%3Cpath d='M2.72461 12.6797L4.34528 13.9854L6.01234 21.7032L4.95581 23.0125L2.72461 12.6797Z' fill='%23727E94'/%3E%3Cpath d='M2.72461 12.6797H8.71954L9.67994 13.9854H4.34528L2.72461 12.6797Z' fill='%239FA4B6'/%3E%3Cpath d='M2.23535 10.333L3.28948 9.0249H11.9582L9.69455 10.333H2.23535Z' fill='%23596478'/%3E%3Cpath d='M2.2352 10.3328L3.28933 9.02453L1.62227 1.3072L0 0L2.2352 10.3328Z' fill='%23727E94'/%3E%3Cpath d='M27.5798 1.40869L3.00488 7.71016L3.28902 9.02496H11.9577C10.9442 10.5498 10.1754 12.2238 9.67915 13.9862H4.34662L4.89475 16.5279L18.619 13.009C20.1989 10.6018 22.9339 9.02189 26.0731 9.02189C27.5199 9.01829 28.9461 9.36429 30.2301 10.0307L39.4581 7.66429C36.7254 4.23709 32.5675 1.90469 27.5798 1.40869Z' fill='%23BFCED7'/%3E%3Cpath d='M42.9268 18.9429L34.3273 21.1482C33.0212 24.3957 29.838 26.6653 26.0728 26.6653C24.0318 26.6737 22.0498 25.9815 20.4576 24.7046L11.8936 26.9005C12.6732 28.0773 13.6006 29.1493 14.653 30.0901C15.8488 31.1561 17.1914 32.0447 18.64 32.729L40.0068 27.2498C41.7256 24.8021 42.736 21.9278 42.9268 18.9429Z' fill='%2396A5AB'/%3E%3C/svg%3E ");\n  			}\n  			.profileBadgePremiumTenure6MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.2726 17.8463C44.2726 22.6491 42.3842 27.1464 38.9568 30.502C35.5366 33.848 30.961 35.6891 26.073 35.6891C21.434 35.6891 17.152 34.006 13.9056 31.1628C11.4199 28.992 9.59151 26.1687 8.62724 23.0124H4.95684L2.72511 12.6796H8.72004C8.99231 11.8764 9.31818 11.0924 9.69538 10.3328H2.23618L0.000976562 0H25.5746C36.2327 0 44.2726 7.67293 44.2726 17.8463Z' fill='%23A45200'/%3E%3Cpath d='M33.1856 6.68373L35.7274 2.6968C32.8368 0.980798 29.3746 0.00146484 25.5744 0.00146484H0.000976562L8.29391 6.68427L33.1856 6.68373Z' fill='%23FFBC29'/%3E%3Cpath d='M41.0942 27.9797L36.9143 25.1603L26.0733 30.2109L9.62432 21.7046H6.01219L4.95605 23.0133H8.62766C9.59179 26.1697 11.4203 28.993 13.9065 31.1638C17.1529 34.0045 21.4343 35.6899 26.0733 35.6899C30.9613 35.6899 35.5369 33.849 38.9573 30.5029C39.7459 29.7295 40.4614 28.8849 41.0942 27.9797Z' fill='%23933701'/%3E%3Cpath d='M26.0729 28.2877C31.8398 28.2877 36.5147 23.6127 36.5147 17.8458C36.5147 12.0789 31.8398 7.40381 26.0729 7.40381C20.3059 7.40381 15.6309 12.0789 15.6309 17.8458C15.6309 23.6127 20.3059 28.2877 26.0729 28.2877Z' fill='%23913C04'/%3E%3Cpath d='M29.5604 8.00181C28.4403 7.60501 27.2603 7.40275 26.0719 7.40381C20.3047 7.40381 15.6299 12.079 15.6299 17.8458C15.6299 17.9634 15.6349 18.0799 15.6384 18.1946L26.0719 17.8458L29.5604 8.00181Z' fill='%237B3003'/%3E%3Cpath d='M30.2412 17.8442C30.2412 20.2144 28.4631 21.9807 26.0739 21.9807C23.6847 21.9807 21.906 20.2164 21.906 17.8442C21.906 15.4719 23.6842 13.7076 26.0739 13.7076C28.4636 13.7076 30.2412 15.4734 30.2412 17.8442ZM42.9668 17.8442C42.9668 22.8618 40.7386 27.3223 37.1902 30.343C34.2283 32.8642 30.3464 34.3798 26.0739 34.3798C21.6419 34.3798 17.6474 32.762 14.6536 30.0867C12.1655 27.8672 10.4116 24.9432 9.62509 21.7031H6.01283L4.34576 13.9852H9.67843C10.1744 12.2227 10.9432 10.5487 11.957 9.02389H3.28816L1.62109 1.30615H25.5715C35.6875 1.30615 42.9668 8.63815 42.9668 17.8442ZM34.9648 17.8442C34.9648 12.9376 31.0192 9.02295 26.0739 9.02295C21.1286 9.02295 17.1824 12.9367 17.1824 17.8442C17.1824 22.7516 21.128 26.6654 26.0739 26.6654C31.0198 26.6654 34.9648 22.7496 34.9648 17.8442Z' fill='%23F59800'/%3E%3Cpath d='M2.72363 12.6812L4.3443 13.9869L6.01137 21.7048L4.95483 23.014L2.72363 12.6812Z' fill='%236F2A00'/%3E%3Cpath d='M2.72363 12.6812H8.71857L9.67897 13.9869H4.3443L2.72363 12.6812Z' fill='%23FFBC29'/%3E%3Cpath d='M2.23438 10.3332L3.28851 9.0249H11.9577L9.69358 10.3332H2.23438Z' fill='%23933701'/%3E%3Cpath d='M2.23467 10.3328L3.2888 9.02453L1.62173 1.3072L0 0L2.23467 10.3328Z' fill='%236F2A00'/%3E%3Cpath d='M27.5831 1.40918L3.00781 7.71065L3.29195 9.02531H11.9606C10.947 10.5502 10.1782 12.2242 9.68208 13.9866H4.34941L4.89768 16.5284L18.6214 13.0093C20.2013 10.6022 22.9363 9.02238 26.0761 9.02238C27.5226 9.01878 28.9486 9.36478 30.2325 10.031L39.4604 7.66478C36.7258 4.23745 32.5669 1.90505 27.5831 1.40918Z' fill='%23E48101'/%3E%3Cpath d='M42.9268 18.9429L34.3279 21.1482C33.0211 24.3955 29.838 26.6651 26.0734 26.6651C24.0319 26.6738 22.0492 25.9817 20.4567 24.7046L11.8926 26.9005C12.6724 28.0771 13.5998 29.149 14.652 30.0901C15.8479 31.1559 17.1906 32.0446 18.6391 32.7289L40.0059 27.2498C41.7252 24.8023 42.736 21.9278 42.9268 18.9429Z' fill='%23F5B419'/%3E%3C/svg%3E%0A");\n  			}\n  			.profileBadgePremiumTenure12MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.2731 17.8463C44.2731 22.6491 42.3843 27.1464 38.9569 30.502C35.5367 33.848 30.9611 35.6891 26.0735 35.6891C21.4341 35.6891 17.1525 34.006 13.9061 31.1628C11.4203 28.9921 9.59187 26.1687 8.62787 23.0124H4.95587L2.72413 12.6796H8.7196C8.99147 11.8763 9.3172 11.0923 9.6944 10.3328H2.2352L0 0H25.5741C36.2353 0 44.2731 7.67293 44.2731 17.8463Z' fill='%2301655B'/%3E%3Cpath d='M33.1856 6.68324L35.7274 2.69631C32.8368 0.980309 29.3751 0.000976562 25.575 0.000976562H0.000976562L8.29391 6.68378L33.1856 6.68324Z' fill='%234ED4D9'/%3E%3Cpath d='M41.0941 27.9797L36.9148 25.1603L26.0732 30.2109L9.62237 21.7046H6.01064L4.9541 23.0133H8.6261C9.59117 26.1701 11.421 28.9935 13.9084 31.1638C17.1548 34.0045 21.4362 35.6899 26.0757 35.6899C30.9632 35.6899 35.5388 33.849 38.9592 30.5029C39.7474 29.7298 40.4622 28.885 41.0941 27.9797Z' fill='%2300438F'/%3E%3Cpath d='M26.0729 28.2877C31.8397 28.2877 36.5147 23.6127 36.5147 17.8458C36.5147 12.0789 31.8397 7.40381 26.0729 7.40381C20.3059 7.40381 15.6309 12.0789 15.6309 17.8458C15.6309 23.6127 20.3059 28.2877 26.0729 28.2877Z' fill='%230052B0'/%3E%3Cpath d='M29.5605 8.00182C28.4403 7.60488 27.2604 7.40261 26.0719 7.40381C20.3052 7.40381 15.6299 12.079 15.6299 17.8458C15.6299 17.9634 15.6349 18.0799 15.6389 18.1946L26.0719 17.8458L29.5605 8.00182Z' fill='%23024B84'/%3E%3Cpath d='M30.2407 17.8458C30.2407 20.216 28.4626 21.9823 26.0728 21.9823C23.6831 21.9823 21.905 20.218 21.905 17.8458C21.905 15.4735 23.6831 13.7092 26.0728 13.7092C28.4626 13.7092 30.2407 15.475 30.2407 17.8458ZM42.9663 17.8458C42.9663 22.8634 40.7375 27.3238 37.1891 30.3444C34.2272 32.8658 30.3454 34.3814 26.0754 34.3814C21.6438 34.3814 17.6488 32.7636 14.6556 30.0883C12.1655 27.8696 10.4099 24.9454 9.62203 21.7047H6.0103L4.34323 13.9868H9.67576C10.1716 12.2243 10.9403 10.5503 11.9539 9.02549H3.28523L1.61816 1.30762H25.569C35.687 1.30762 42.9663 8.63975 42.9663 17.8458ZM34.9643 17.8458C34.9643 12.9392 31.0187 9.02455 26.0728 9.02455C21.127 9.02455 17.1819 12.9383 17.1819 17.8458C17.1819 22.7532 21.127 26.667 26.0728 26.667C31.0187 26.667 34.9643 22.7512 34.9643 17.8458Z' fill='%2336AAFF'/%3E%3Cpath d='M2.72363 12.6812L4.3443 13.9869L6.01137 21.7048L4.95537 23.014L2.72363 12.6812Z' fill='%23005A73'/%3E%3Cpath d='M2.72363 12.6812H8.71857L9.6795 13.9869H4.3443L2.72363 12.6812Z' fill='%234ED4D9'/%3E%3Cpath d='M2.23535 10.3332L3.28948 9.0249H11.9581L9.69455 10.3332H2.23535Z' fill='%2300438F'/%3E%3Cpath d='M2.2352 10.3328L3.28933 9.02453L1.62227 1.3072L0 0L2.2352 10.3328Z' fill='%23005A73'/%3E%3Cpath d='M27.5802 1.40918L3.00488 7.71065L3.28902 9.02531H11.9577C10.9441 10.5501 10.1754 12.2241 9.67968 13.9866H4.34702L4.89528 16.5284L18.6196 13.0093C20.1993 10.6022 22.9339 9.02238 26.0737 9.02238C27.5203 9.01878 28.9465 9.36478 30.2306 10.031L39.4585 7.66478C36.726 4.23745 32.5676 1.90505 27.5802 1.40918Z' fill='%237AD3FF'/%3E%3Cpath d='M42.9264 18.9443L34.3274 21.1491C33.0212 24.3965 29.8381 26.6661 26.0729 26.6661C24.0318 26.6742 22.0497 25.9822 20.4572 24.7055L11.8936 26.9014C12.6732 28.0783 13.6005 29.1502 14.653 30.091C15.8488 31.1571 17.1914 32.0458 18.6401 32.7298L40.0069 27.2507C41.7257 24.8033 42.736 21.929 42.9264 18.9443Z' fill='%230094DE'/%3E%3C/svg%3E%0A");\n  			}\n  			.profileBadgePremiumTenure24MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24.4307 10.0625L30.8188 21.6896L42.7409 19.5725L33.7617 11.0144L24.4307 10.0625Z' fill='%233E12A9'/%3E%3Cpath d='M30.8184 21.6883L42.7405 19.5712L33.7613 11.0132L30.8184 21.6883Z' fill='%233104A3'/%3E%3Cpath d='M24.4136 10.0621L12.3818 0.724121L15.0825 11.014L24.4136 10.0621Z' fill='%236B1EAD'/%3E%3Cpath d='M24.4133 10.0625L18.0251 21.6896L6.10254 19.5725L15.0821 11.0144L24.4133 10.0625Z' fill='%233E12A9'/%3E%3Cpath d='M18.0251 21.6883L6.10254 19.5712L15.0821 11.0132L18.0251 21.6883Z' fill='%233104A3'/%3E%3Cpath d='M24.4311 10.0625L18.043 21.6896L24.4311 27.9989L30.8188 21.6896L24.4311 10.0625Z' fill='%2338039E'/%3E%3Cpath d='M44.274 17.8464C44.274 22.6492 42.3857 27.1465 38.9584 30.502C35.538 33.8481 30.9624 35.6892 26.0744 35.6892C21.4355 35.6892 17.1535 34.0061 13.9071 31.1629C11.4213 28.992 9.59293 26.1687 8.6288 23.0125H4.95733L2.7256 12.6797H8.72053C8.99267 11.8765 9.31827 11.0925 9.69533 10.3328H2.23467L0 0H25.5736C36.2343 0 44.274 7.67306 44.274 17.8464Z' fill='%233C28F9'/%3E%3Cpath d='M33.1877 6.68373L35.7295 2.69667C32.8388 0.980799 29.3767 0.00146484 25.5765 0.00146484H0.00292969L8.29546 6.68413L33.1877 6.68373Z' fill='%237E13CF'/%3E%3Cpath d='M41.0956 27.9782L36.9161 25.1589L26.0745 30.2094L9.62823 21.7031H6.01596L4.95996 23.0118H8.63143C9.59556 26.1681 11.424 28.9914 13.9097 31.1622C17.1566 34.003 21.4381 35.6885 26.077 35.6885C30.965 35.6885 35.5406 33.8475 38.961 30.5014C39.749 29.7282 40.4636 28.8834 41.0956 27.9782Z' fill='%23381DB5'/%3E%3Cpath d='M26.0738 28.2877C31.8406 28.2877 36.5157 23.6126 36.5157 17.8457C36.5157 12.0787 31.8406 7.40381 26.0738 7.40381C20.3069 7.40381 15.6318 12.0787 15.6318 17.8457C15.6318 23.6126 20.3069 28.2877 26.0738 28.2877Z' fill='%233829CC'/%3E%3Cpath d='M29.562 8.00181C28.4417 7.60488 27.2617 7.40261 26.0733 7.40381C20.3066 7.40381 15.6318 12.079 15.6318 17.8457C15.6318 17.9633 15.6369 18.0799 15.6404 18.1946L26.0733 17.8457L29.562 8.00181Z' fill='%233A1CC5'/%3E%3Cpath d='M30.2442 17.8458C30.2442 20.216 28.4661 21.9822 26.0763 21.9822C23.6866 21.9822 21.9089 20.218 21.9089 17.8458C21.9089 15.4735 23.6871 13.7092 26.0763 13.7092C28.4655 13.7092 30.2442 15.475 30.2442 17.8458ZM42.9697 17.8458C42.9697 22.8634 40.7415 27.3238 37.193 30.3444C34.2307 32.8658 30.3494 34.3812 26.0763 34.3812C21.6447 34.3812 17.6503 32.7635 14.6566 30.0883C12.1675 27.8692 10.4131 24.9451 9.62647 21.7046H6.0142L4.34714 13.9868H9.6798C10.1761 12.2243 10.9449 10.5503 11.9583 9.02549H3.28967L1.62207 1.30762H25.573C35.689 1.30762 42.9682 8.63975 42.9682 17.8458H42.9697ZM34.9678 17.8458C34.9678 12.9392 31.0222 9.02442 26.0763 9.02442C21.1305 9.02442 17.1853 12.9382 17.1853 17.8458C17.1853 22.7532 21.131 26.667 26.0763 26.667C31.0217 26.667 34.9663 22.7512 34.9663 17.8458H34.9678Z' fill='%23A172FF'/%3E%3Cpath d='M2.72559 12.6812L4.34625 13.9869L6.01332 21.7048L4.95679 23.014L2.72559 12.6812Z' fill='%233131FF'/%3E%3Cpath d='M2.72559 12.6812H8.72052L9.68079 13.9869H4.34625L2.72559 12.6812Z' fill='%237E13CF'/%3E%3Cpath d='M2.23633 10.3332L3.29046 9.0249H11.9591L9.69553 10.3332H2.23633Z' fill='%233F1DDB'/%3E%3Cpath d='M2.23618 10.3328L3.29031 9.02467L1.62325 1.30733L0.000976562 0L2.23618 10.3328Z' fill='%233131FF'/%3E%3Cpath d='M27.5816 1.40869L3.00684 7.71016L3.29084 9.02482H11.9596C10.946 10.5496 10.1772 12.2236 9.6811 13.9862H4.34843L4.8967 16.5279L18.6208 13.0088C20.2007 10.6016 22.9358 9.02189 26.0751 9.02189C27.5218 9.01816 28.9479 9.36416 30.232 10.0306L39.4599 7.66429C36.7274 4.23696 32.5694 1.90456 27.5816 1.40869Z' fill='%23D48BFF'/%3E%3Cpath d='M42.9282 18.9429L34.3303 21.1477C33.0241 24.395 29.8409 26.6646 26.0757 26.6646C24.0348 26.673 22.0528 25.981 20.4605 24.7041L11.8965 26.8999C12.6761 28.0767 13.6036 29.1486 14.656 30.0895C15.8517 31.1555 17.1945 32.0442 18.643 32.7283L40.0098 27.2493C41.728 24.8015 42.7378 21.9274 42.9282 18.9429Z' fill='%23A699FF'/%3E%3C/svg%3E%0A");\n  			}\n  			.profileBadgePremiumTenure36MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.2725 17.8464C44.2725 22.6492 42.3841 27.1465 38.9569 30.502C35.5365 33.8481 30.9609 35.6892 26.0733 35.6892C21.434 35.6892 17.1525 34.0061 13.9061 31.1629C11.42 28.9923 9.5916 26.1689 8.62787 23.0125H4.95573L2.72653 12.6797H8.722C8.99387 11.8764 9.3196 11.0924 9.6968 10.3328H2.2352L0 0H25.574C36.2328 0 44.2725 7.67306 44.2725 17.8464Z' fill='%233B8600'/%3E%3Cpath d='M33.1857 6.68227L35.7275 2.69533C32.8368 0.979333 29.3747 0 25.5751 0H0L8.29293 6.6828L33.1857 6.68227Z' fill='%23008704'/%3E%3Cpath d='M41.0942 27.9782L36.9153 25.1589L26.0737 30.2094L9.62432 21.7031H6.01259L4.95605 23.0118H8.62805C9.59205 26.1682 11.4205 28.9915 13.9063 31.1622C17.1527 34.003 21.4318 35.6885 26.0737 35.6885C30.9613 35.6885 35.5367 33.8475 38.9571 30.5014C39.7462 29.7283 40.4615 28.8837 41.0942 27.9782Z' fill='%23317000'/%3E%3Cpath d='M26.0729 28.2877C31.8398 28.2877 36.5147 23.6126 36.5147 17.8457C36.5147 12.0787 31.8398 7.40381 26.0729 7.40381C20.3059 7.40381 15.6309 12.0787 15.6309 17.8457C15.6309 23.6126 20.3059 28.2877 26.0729 28.2877Z' fill='%2306870A'/%3E%3Cpath d='M29.5606 8.00181C28.4403 7.60488 27.2604 7.40261 26.0719 7.40381C20.3047 7.40381 15.6299 12.079 15.6299 17.8457C15.6299 17.9633 15.635 18.0799 15.639 18.1946L26.0719 17.8457L29.5606 8.00181Z' fill='%23006F03'/%3E%3Cpath d='M30.2407 17.8443C30.2407 20.2146 28.4626 21.9808 26.0729 21.9808C23.6831 21.9808 21.905 20.2166 21.905 17.8443C21.905 15.472 23.6831 13.7078 26.0729 13.7078C28.4626 13.7078 30.2407 15.4735 30.2407 17.8443ZM42.9662 17.8443C42.9662 22.8619 40.7375 27.3223 37.1891 30.343C34.2273 32.8643 30.3454 34.3799 26.0754 34.3799C21.6438 34.3799 17.6489 32.7622 14.6551 30.0868C12.1661 27.8676 10.4113 24.9436 9.62407 21.7032H6.01234L4.34527 13.9854H9.6778C10.1737 12.2228 10.9423 10.5488 11.9559 9.02402H3.28914L1.62207 1.30615H25.5725C35.6865 1.30615 42.9662 8.63829 42.9662 17.8443ZM34.9638 17.8443C34.9638 12.9378 31.0187 9.02309 26.0729 9.02309C21.127 9.02309 17.1818 12.9368 17.1818 17.8443C17.1818 22.7518 21.127 26.6655 26.0729 26.6655C31.0187 26.6655 34.9638 22.7498 34.9638 17.8443Z' fill='%2349EC12'/%3E%3Cpath d='M2.72363 12.6797L4.3443 13.9854L6.01137 21.7033L4.95537 23.0125L2.72363 12.6797Z' fill='%231EAD02'/%3E%3Cpath d='M2.72363 12.6797H8.71857L9.67896 13.9854H4.3443L2.72363 12.6797Z' fill='%23008704'/%3E%3Cpath d='M2.23535 10.3332L3.28948 9.0249H11.9582L9.69455 10.3332H2.23535Z' fill='%23317000'/%3E%3Cpath d='M2.2352 10.3328L3.2892 9.02467L1.62213 1.30733L0 0L2.2352 10.3328Z' fill='%231EAD02'/%3E%3Cpath d='M27.5802 1.40869L3.00488 7.71016L3.28902 9.02482H11.9577C10.9441 10.5496 10.1754 12.2236 9.67968 13.9862H4.34702L4.89528 16.5279L18.6195 13.0088C20.1994 10.6016 22.9339 9.02189 26.0737 9.02189C27.5203 9.01816 28.9465 9.36429 30.2306 10.0306L39.4565 7.66722C36.7254 4.23696 32.5675 1.90456 27.5802 1.40869Z' fill='%23CCFB4B'/%3E%3Cpath d='M42.9264 18.9429L34.3274 21.1477C33.0212 24.395 29.8381 26.6646 26.0729 26.6646C24.0318 26.6727 22.0497 25.9807 20.4572 24.7041L11.8936 26.8999C12.6732 28.0767 13.6004 29.1486 14.6526 30.0895C15.8485 31.1554 17.1912 32.0441 18.6396 32.7283L40.0049 27.2487C41.7244 24.8017 42.7353 21.9275 42.9264 18.9429Z' fill='%234DFF59'/%3E%3C/svg%3E%0A");\n  			}\n  			.profileBadgePremiumTenure60MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30.8747 7.93555H17.9678V23.7321H30.8747V7.93555Z' fill='%23631828'/%3E%3Cpath d='M30.875 7.93555L39.6274 15.8334L30.875 23.7315V7.93555Z' fill='%23611014'/%3E%3Cpath d='M17.9678 7.93555L9.21582 15.8334L17.9678 23.7315V7.93555Z' fill='%23611014'/%3E%3Cpath d='M44.274 17.8464C44.274 22.6492 42.3852 27.1465 38.9584 30.502C35.5375 33.8481 30.9624 35.6892 26.0744 35.6892C21.4351 35.6892 17.1535 34.0061 13.9071 31.1629C11.4212 28.9921 9.5928 26.1688 8.6288 23.0125H4.95733L2.7256 12.6797H8.72147C8.9936 11.8765 9.31933 11.0925 9.69627 10.3328H2.23613L0 0H25.5735C36.2317 0 44.274 7.67306 44.274 17.8464Z' fill='%239C0449'/%3E%3Cpath d='M33.1872 6.68324L35.7289 2.69618C32.8384 0.98031 29.3767 0.000976562 25.5765 0.000976562H0L8.2924 6.68364L33.1872 6.68324Z' fill='%23AD0C81'/%3E%3Cpath d='M41.0957 27.9782L36.9162 25.1589L26.0746 30.2094L9.62822 21.7031H6.01609L4.95996 23.0118H8.63156C9.59569 26.1681 11.4241 28.9914 13.9098 31.1622C17.1568 34.003 21.4353 35.6885 26.0772 35.6885C30.9652 35.6885 35.5402 33.8475 38.9612 30.5014C39.7492 29.7282 40.4637 28.8834 41.0957 27.9782Z' fill='%23AE0A81'/%3E%3Cpath d='M26.0737 28.2872C31.8406 28.2872 36.5157 23.6121 36.5157 17.8452C36.5157 12.0783 31.8406 7.40332 26.0737 7.40332C20.3069 7.40332 15.6318 12.0783 15.6318 17.8452C15.6318 23.6121 20.3069 28.2872 26.0737 28.2872Z' fill='%238F0142'/%3E%3Cpath d='M29.5615 8.00133C28.4413 7.60439 27.2614 7.40213 26.0729 7.40333C20.3062 7.40333 15.6309 12.0785 15.6309 17.8452C15.6309 17.9628 15.6359 18.0795 15.6399 18.1941L26.0729 17.8452L29.5615 8.00133Z' fill='%23750346'/%3E%3Cpath d='M30.2418 17.8453C30.2418 20.2155 28.4635 21.9817 26.0738 21.9817C23.6842 21.9817 21.9065 20.2175 21.9065 17.8453C21.9065 15.473 23.6846 13.7087 26.0738 13.7087C28.463 13.7087 30.2418 15.4745 30.2418 17.8453ZM42.9673 17.8453C42.9673 22.8629 40.739 27.3233 37.1906 30.3439C34.2282 32.8653 30.3469 34.3807 26.0738 34.3807C21.6423 34.3807 17.6478 32.763 14.6541 30.0878C12.1657 27.8686 10.4117 24.9443 9.62553 21.7041H6.01327L4.3462 13.9863H9.67887C10.175 12.2238 10.9438 10.5498 11.9574 9.025H3.28913L1.62207 1.30713H25.573C35.6875 1.30713 42.9673 8.63926 42.9673 17.8453ZM34.9654 17.8453C34.9654 12.9387 31.0197 9.02393 26.0738 9.02393C21.1279 9.02393 17.1829 12.9377 17.1829 17.8453C17.1829 22.7527 21.1285 26.6665 26.0738 26.6665C31.0193 26.6665 34.9654 22.7507 34.9654 17.8453Z' fill='%23FF3D6A'/%3E%3Cpath d='M2.72559 12.6807L4.34679 13.9864L6.01385 21.7043L4.95732 23.0135L2.72559 12.6807Z' fill='%23A8003F'/%3E%3Cpath d='M2.72559 12.6807H8.72105L9.68145 13.9864H4.34679L2.72559 12.6807Z' fill='%23AD0C81'/%3E%3Cpath d='M2.23633 10.3327L3.29046 9.02441H11.9593L9.69553 10.3327H2.23633Z' fill='%239C0449'/%3E%3Cpath d='M2.23618 10.3328L3.29018 9.02467L1.62311 1.30733L0.000976562 0L2.23618 10.3328Z' fill='%23A8003F'/%3E%3Cpath d='M27.5816 1.4082L3.00684 7.70967L3.29097 9.02434H11.9611C10.9476 10.5491 10.1788 12.2231 9.68257 13.9857H4.35004L4.89817 16.5274L18.6224 13.0083C20.2023 10.6011 22.9374 9.0214 26.0766 9.0214C27.5232 9.01767 28.9494 9.36367 30.2335 10.0301L39.4614 7.6638C36.7274 4.23647 32.5694 1.90407 27.5816 1.4082Z' fill='%23FF82C1'/%3E%3Cpath d='M42.9277 18.9424L34.3284 21.1472C33.0221 24.3945 29.8389 26.6641 26.0737 26.6641C24.0328 26.6725 22.0508 25.9805 20.4585 24.7036L11.8945 26.8994C12.6741 28.0762 13.6016 29.1481 14.654 30.089C15.8497 31.155 17.1925 32.0437 18.6411 32.7278L40.0079 27.2488C41.7265 24.8012 42.7369 21.927 42.9277 18.9424Z' fill='%23FE7192'/%3E%3C/svg%3E%0A");\n  			}\n  			.profileBadgePremiumTenure72MonthV2 {\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='36' viewBox='0 0 45 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.2725 17.8462C44.2725 22.6492 42.3841 27.1464 38.9568 30.502C35.5365 33.8481 30.9609 35.689 26.0729 35.689C21.434 35.689 17.152 34.0061 13.9061 31.1628C11.42 28.9922 9.5916 26.1688 8.62773 23.0124H4.95573L2.724 12.6796H8.71947C8.9916 11.877 9.31746 11.0937 9.6948 10.3348H2.2352L0 0.00195352H25.574C36.2328 -4.64842e-05 44.2725 7.67288 44.2725 17.8462Z' fill='%234E11A6'/%3E%3Cpath d='M33.1857 6.68325L35.7273 2.69618C32.8368 0.98031 29.3747 0.000976562 25.5751 0.000976562H0L8.29293 6.68378L33.1857 6.68325Z' fill='%23FEC2B2'/%3E%3Cpath d='M41.0926 27.9776L36.9133 25.1582L26.0731 30.2104L9.62432 21.7041H6.01205L4.95605 23.0128H8.62806C9.59179 26.1692 11.4203 28.9926 13.9063 31.1632C17.1527 34.004 21.4343 35.6894 26.0731 35.6894C30.9611 35.6894 35.5367 33.8485 38.9571 30.5024C39.7454 29.7285 40.4603 28.8833 41.0926 27.9776Z' fill='%233F3FCC'/%3E%3Cpath d='M26.0729 28.2872C31.8398 28.2872 36.5147 23.6121 36.5147 17.8452C36.5147 12.0783 31.8398 7.40332 26.0729 7.40332C20.3059 7.40332 15.6309 12.0783 15.6309 17.8452C15.6309 23.6121 20.3059 28.2872 26.0729 28.2872Z' fill='%235545D2'/%3E%3Cpath d='M29.5604 8.00133C28.4403 7.60439 27.2603 7.40213 26.0719 7.40333C20.3047 7.40333 15.6299 12.0785 15.6299 17.8452C15.6299 17.9629 15.635 18.0795 15.6384 18.1941L26.0719 17.8452L29.5604 8.00133Z' fill='%233838C7'/%3E%3Cpath d='M2.72461 12.6807L4.34528 13.9864L6.01234 21.7043L4.95581 23.0135L2.72461 12.6807Z' fill='%239E41A6'/%3E%3Cpath d='M2.72461 12.6807H8.71954L9.67995 13.9864H4.34528L2.72461 12.6807Z' fill='%23FEC2B2'/%3E%3Cpath d='M2.23535 10.3327L3.28935 9.02441H11.9587L9.69455 10.3327H2.23535Z' fill='%235E50CC'/%3E%3Cpath d='M2.23466 10.3328L3.2888 9.02453L1.62173 1.3072L0 0L2.23466 10.3328Z' fill='%239E41A6'/%3E%3Cpath d='M30.8583 2.02539L3.59473 9.02566H11.9525L11.9455 9.03659L34.1661 3.33166C33.1105 2.78552 32.0022 2.34779 30.8583 2.02539Z' fill='%23B1EDFF'/%3E%3Cpath d='M26.0842 9.02568C27.6245 9.02235 29.1393 9.41715 30.4819 10.172L39.5882 7.83355C38.8491 6.88248 38.0059 6.01702 37.0743 5.25342L10.3242 12.1195C10.0725 12.7298 9.85845 13.355 9.68325 13.9914H4.35059L4.94365 16.727L18.489 13.2489C20.039 10.7077 22.8483 9.02568 26.0842 9.02568Z' fill='%231FD2FF'/%3E%3Cpath d='M36.0518 4.47528C35.4486 4.05354 34.8184 3.67194 34.165 3.33301L11.9449 9.03794C11.5472 9.65221 11.1845 10.2885 10.8585 10.9437C10.6666 11.3299 10.4872 11.7222 10.3242 12.1209L37.0745 5.25328C36.745 4.98168 36.4046 4.72154 36.0518 4.47528Z' fill='%237EE6FC'/%3E%3Cpath d='M39.9016 8.25474C39.799 8.11221 39.6959 7.97061 39.5887 7.83154L30.4824 10.1699C30.6818 10.2811 30.8756 10.3982 31.0635 10.5238C31.6158 10.8942 32.1243 11.3258 32.5795 11.8106L40.8302 9.69248C40.5468 9.19688 40.2368 8.71688 39.9016 8.25474Z' fill='%231EA5FF'/%3E%3Cpath d='M5.04558 17.2042L5.38998 18.7919L17.4676 15.6911C17.628 15.0486 17.861 14.4264 18.1622 13.8366C18.262 13.6372 18.3716 13.4404 18.4877 13.2495L4.94238 16.7276L5.04558 17.2042Z' fill='%231EA5FF'/%3E%3Cpath d='M26.0847 13.708C23.8176 13.708 22.0947 15.2968 21.9277 17.4985L29.5872 15.532C28.8581 14.4127 27.5913 13.708 26.0847 13.708Z' fill='%235AFFF7'/%3E%3Cpath d='M17.2439 18.701C17.2175 18.4214 17.2026 18.1379 17.2026 17.8509C17.2024 17.1229 17.2912 16.3977 17.4672 15.6914L5.38965 18.7922L5.99565 21.5891L17.2439 18.701Z' fill='%235AFFF7'/%3E%3Cpath d='M34.2402 14.3363L42.0358 12.3348C41.7146 11.4195 41.3107 10.5354 40.8292 9.69336L32.5791 11.812C33.2751 12.5506 33.8371 13.4048 34.2402 14.3363Z' fill='%235AFFF7'/%3E%3Cpath d='M17.2432 18.7012C17.253 18.8082 17.2665 18.9145 17.2805 19.0201L17.2432 18.7012Z' fill='%23FBFAA2'/%3E%3Cpath d='M21.9111 17.831C21.9111 17.7183 21.9186 17.6078 21.9271 17.498L21.9111 17.831Z' fill='%23FBFAA2'/%3E%3Cpath d='M17.2807 19.0201C17.2668 18.9145 17.2534 18.8082 17.2434 18.7012L5.99512 21.5917L6.02099 21.7124H9.62578C9.65218 21.82 9.68152 21.9261 9.70952 22.0328L17.4726 20.0393C17.3889 19.7036 17.3247 19.3633 17.2807 19.0201Z' fill='%23FBFAA2'/%3E%3Cpath d='M42.1393 12.6378C42.106 12.5382 42.0727 12.4356 42.0397 12.3354L34.2441 14.3369C34.2865 14.4365 34.3264 14.5362 34.3652 14.6358C34.4909 14.9573 34.5976 15.2859 34.6847 15.6197L42.436 13.6297C42.3457 13.2933 42.2456 12.9638 42.1393 12.6378Z' fill='%23FBFAA2'/%3E%3Cpath d='M29.7566 15.8188C29.7042 15.719 29.647 15.6264 29.5866 15.5337L21.9271 17.5002C21.9186 17.61 21.9117 17.7205 21.9111 17.8332C21.9111 17.8397 21.9111 17.8461 21.9111 17.8526C21.9121 18.1948 21.9521 18.5357 22.0303 18.8688L30.1249 16.7906C30.0438 16.4524 29.9201 16.1258 29.7566 15.8188Z' fill='%23FBFAA2'/%3E%3Cpath d='M30.2538 17.8514C30.2533 17.4972 30.2105 17.1443 30.1262 16.8003L22.0322 18.8786C22.1958 19.5923 22.5525 20.2475 23.0633 20.7723L30.1089 18.9632C30.2045 18.6003 30.2533 18.2267 30.2538 17.8514Z' fill='%23FFD3D3'/%3E%3Cpath d='M17.4756 20.0488L9.71289 22.0423C9.88769 22.719 10.0972 23.3862 10.3404 24.0414L18.2372 22.0139C17.905 21.392 17.6493 20.7322 17.4756 20.0488Z' fill='%23FFD3D3'/%3E%3Cpath d='M34.9596 17.7198L42.8264 15.6998C42.7402 15.0058 42.6096 14.318 42.4358 13.6406L34.6846 15.6306C34.8586 16.3137 34.9508 17.015 34.9596 17.7198Z' fill='%23FFD3D3'/%3E%3Cpath d='M30.1248 16.7886L22.0303 18.8668L22.0332 18.8778L30.1293 16.7995C30.1276 16.796 30.126 16.7923 30.1248 16.7886Z' fill='%23FFD3D3'/%3E%3Cpath d='M34.6837 15.6298L42.4349 13.6398L42.4319 13.6289L34.6807 15.6189L34.6837 15.6298Z' fill='%23FFD3D3'/%3E%3Cpath d='M17.4732 20.0371L9.70996 22.0307L9.71302 22.0416L17.4757 20.0482C17.4746 20.0442 17.4742 20.0406 17.4732 20.0371Z' fill='%23FFD3D3'/%3E%3Cpath d='M42.8952 16.3213C42.8763 16.1125 42.8524 15.9055 42.8259 15.6987L34.9591 17.7187C34.9591 17.763 34.9625 17.8063 34.9625 17.8507C34.9625 18.0227 34.9567 18.1926 34.9467 18.3621C34.8441 20.2599 34.1269 22.0729 32.9033 23.5273L42.6575 21.0223C42.8621 19.9775 42.9652 18.9154 42.9655 17.8507C42.966 17.3345 42.94 16.8251 42.8952 16.3213Z' fill='%23F8B7E1'/%3E%3Cpath d='M23.0635 20.7736C23.2423 20.9553 23.4381 21.1194 23.6485 21.2634C24.3249 21.7264 25.1581 21.9941 26.0841 21.9941C27.7985 21.9941 29.2 21.0661 29.8539 19.6701C29.9601 19.4432 30.0456 19.2069 30.1091 18.9644L23.0635 20.7736Z' fill='%23F8B7E1'/%3E%3Cpath d='M18.5631 22.5688C18.4484 22.3879 18.3394 22.2026 18.2376 22.0127L10.3408 24.0411C10.4136 24.2367 10.4894 24.4306 10.5682 24.6227C11.1547 26.072 11.9432 27.4311 12.9106 28.6595L22.8979 26.0954C21.1086 25.4215 19.587 24.1836 18.5631 22.5688Z' fill='%23F8B7E1'/%3E%3Cpath d='M32.9044 23.5278C32.5566 23.9421 32.1713 24.3232 31.7532 24.6661C30.1544 25.9741 28.1502 26.6848 26.0846 26.6761C25.5477 26.6756 25.012 26.6277 24.4834 26.533C23.9422 26.437 23.411 26.2912 22.8966 26.0974L12.9092 28.6616C13.0976 28.8984 13.292 29.1301 13.4937 29.3544C16.3016 32.4746 20.4525 34.394 26.0846 34.394C34.0392 34.394 40.6302 29.1192 42.4597 21.9176C42.5345 21.6226 42.5998 21.3241 42.6592 21.0205L32.9044 23.5278Z' fill='%23FF7AD9'/%3E%3Cpath d='M25.573 1.3082H1.62207L3.29807 9.0266H3.59367L30.8571 2.02633C29.1373 1.54446 27.359 1.30273 25.573 1.3082Z' fill='%23DBFDF7'/%3E%3C/svg%3E%0A");\n  			}\n  			.profileBadgePremium,\n  			.profileBadgePremiumTenure1MonthV2,\n  			.profileBadgePremiumTenure3MonthV2,\n  			.profileBadgePremiumTenure6MonthV2,\n  			.profileBadgePremiumTenure12MonthV2,\n  			.profileBadgePremiumTenure24MonthV2,\n  			.profileBadgePremiumTenure36MonthV2,\n  			.profileBadgePremiumTenure60MonthV2,\n  			.profileBadgePremiumTenure72MonthV2\n  			{\n  					width: 28px;\n  					&.richBadge {\n  							background-image: url(https://discord.com/assets/379d2b3171722ef8be494231234da5d1.svg) !important;\n  					}\n  			}\n  			/* Partner */\n  			.profileBadgePartner\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='36' height='22' viewBox='0 0 36 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26.2859 5.67322L21.8025 8.66214C21.3543 9.11051 20.6069 8.96111 20.4575 8.66214C20.0092 8.21375 19.262 7.91496 18.8136 7.76538C17.618 7.46658 16.5719 7.76538 15.6753 8.21376L14.1808 9.25991L5.8118 14.6399C4.01845 15.8355 1.77674 15.3873 0.581185 13.4444C-0.614393 11.5016 0.132841 9.40932 1.9262 8.36334L11.4908 1.78761C14.1808 0.293144 17.3192 -0.454091 20.3081 0.293143C22.8487 0.741469 25.0904 2.0865 26.5849 4.17875C27.0331 4.47764 27.0331 5.37433 26.2859 5.67322Z' fill='%235865F2'/%3E%3Cpath d='M36 10.1565C36 11.5016 35.2526 12.6972 34.2067 13.295L24.3432 19.7211C22.5497 20.9167 20.3081 21.5145 18.2158 21.5145C17.3191 21.5145 16.4225 21.5145 15.6753 21.2157C13.1346 20.7673 11.1918 19.1234 9.39849 17.33C9.09958 17.031 9.09958 16.1345 9.69738 15.9849L14.1808 12.996C14.6291 12.5478 15.3763 12.6972 15.5257 12.996C15.9741 13.4444 16.4225 13.7433 17.1697 13.8927C18.3652 14.1915 19.4114 13.8927 20.3081 13.4444L22.5497 12.0994L29.2748 7.61595L30.1716 6.86872C31.9649 5.67316 34.2067 6.1215 35.4022 8.06433C35.701 8.81151 36 9.40929 36 10.1565Z' fill='%235865F2'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMS45NSI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgICBzdHJva2Utd2lkdGg6IDBweDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTQuNiwzLjE1bC0yLjQ5LDEuNjZjLS4yNS4yNS0uNjYuMTctLjc1LDAtLjI1LS4yNS0uNjYtLjQyLS45MS0uNS0uNjYtLjE3LTEuMjUsMC0xLjc0LjI1bC0uODMuNTgtNC42NSwyLjk5Yy0xLC42Ni0yLjI0LjQyLTIuOTEtLjY2LS42Ni0xLjA4LS4yNS0yLjI0Ljc1LTIuODJMNi4zOC45OUM3Ljg4LjE2LDkuNjItLjI1LDExLjI4LjE2YzEuNDEuMjUsMi42NiwxLDMuNDksMi4xNi4yNS4xNy4yNS42Ni0uMTcuODNaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjAsNS42NGMwLC43NS0uNDIsMS40MS0xLDEuNzRsLTUuNDgsMy41N2MtMSwuNjYtMi4yNCwxLTMuNCwxLS41LDAtMSwwLTEuNDEtLjE3LTEuNDEtLjI1LTIuNDktMS4xNi0zLjQ5LTIuMTYtLjE3LS4xNy0uMTctLjY2LjE3LS43NWwyLjQ5LTEuNjZjLjI1LS4yNS42Ni0uMTcuNzUsMCwuMjUuMjUuNS40Mi45MS41LjY2LjE3LDEuMjUsMCwxLjc0LS4yNWwxLjI1LS43NSwzLjc0LTIuNDkuNS0uNDJjMS0uNjYsMi4yNC0uNDIsMi45MS42Ni4xNy40Mi4zMy43NS4zMywxLjE2WiIvPgo8L3N2Zz4=");\n  					}\n  			}\n  			/* Moderator Program Alumni */\n  			.profileBadgeCertifiedModerator\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='34' height='36' viewBox='0 0 34 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26.5438 0H7.45614C7.1579 3.8772 3.8772 6.85964 0 6.85964V8.64912C0 17.4474 4.17544 25.6492 11.4825 31.465L17 35.7894L22.5176 31.465C29.8246 25.7982 34 17.4474 34 8.64912V6.85964C30.1228 6.85964 26.9912 3.8772 26.5438 0ZM13.5702 25.7982C9.0965 22.2192 6.41228 17.1492 6.41228 11.6316V10.5877C8.79824 10.5877 10.886 8.79824 11.0351 6.41228H17V28.6316L13.5702 25.7982Z' fill='%23FC964B'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'%3E%3Cpath fill='%23FFF' d='M13.77 0H4.23A3.74 3.74 0 0 1 .5 3.43v.9c0 4.4 2.09 8.5 5.74 11.4L9 17.9l2.76-2.16c3.65-2.83 5.74-7 5.74-11.4v-.9A3.8 3.8 0 0 1 13.77 0ZM7.3 12.9a9.08 9.08 0 0 1-3.6-7.08v-.53c1.19 0 2.23-.9 2.3-2.08h3v11.1L7.29 12.9Z'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* HypeSquad Events */\n  			.profileBadgeHypesquad\n  			{   \n  					background-image: url("data:image/svg+xml,%3Csvg width='40' height='38' viewBox='0 0 40 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M39.1824 9.68705L23.4436 20.0181C23.1734 20.1941 22.9548 20.4387 22.8096 20.7267L20.4102 25.5379C20.3754 25.6177 20.318 25.6857 20.2452 25.7333C20.1724 25.7811 20.0872 25.8065 20 25.8065C19.9128 25.8065 19.8276 25.7811 19.7548 25.7333C19.682 25.6857 19.6246 25.6177 19.5898 25.5379L17.1904 20.7267C17.0452 20.4387 16.8266 20.1941 16.5564 20.0181L0.817516 9.68705C0.738376 9.59309 0.625156 9.53441 0.502756 9.52391C0.380356 9.51343 0.258796 9.55199 0.164836 9.63111C0.0708763 9.71025 0.012176 9.82347 0.00169597 9.94587C-0.00880403 10.0683 0.0297561 10.1898 0.108896 10.2838L6.6854 23.0763C6.71736 23.1433 6.7331 23.2169 6.73134 23.2911C6.72958 23.3653 6.71036 23.4379 6.67526 23.5033C6.64014 23.5687 6.59012 23.6249 6.52924 23.6673C6.46838 23.7097 6.39836 23.7373 6.32486 23.7477H2.3715C2.27388 23.7467 2.1785 23.7769 2.09916 23.8337C2.01982 23.8907 1.96064 23.9713 1.93018 24.0641C1.89972 24.1569 1.89958 24.2569 1.92974 24.3497C1.95992 24.4425 2.01884 24.5235 2.098 24.5805L19.7264 37.2115C19.807 37.2665 19.9024 37.2959 20 37.2959C20.0976 37.2959 20.193 37.2665 20.2736 37.2115L37.902 24.5805C37.9812 24.5235 38.04 24.4425 38.0702 24.3497C38.1004 24.2569 38.1002 24.1569 38.0698 24.0641C38.0394 23.9713 37.9802 23.8907 37.9008 23.8337C37.8216 23.7769 37.7262 23.7467 37.6284 23.7477H33.6752C33.5974 23.7447 33.5214 23.7225 33.4542 23.6831C33.3872 23.6437 33.3308 23.5883 33.2902 23.5219C33.2496 23.4555 33.226 23.3799 33.2216 23.3023C33.2172 23.2245 33.232 23.1469 33.2648 23.0763L39.8912 10.2838C39.9702 10.1898 40.0088 10.0683 39.9984 9.94587C39.9878 9.82347 39.9292 9.71025 39.8352 9.63111C39.7412 9.55199 39.6196 9.51343 39.4972 9.52391C39.3748 9.53441 39.2616 9.59309 39.1824 9.68705Z' fill='%23FBB848'/%3E%3Cpath d='M20.3486 0.213921L21.9648 3.50838C21.9934 3.5628 22.034 3.61006 22.0836 3.64664C22.133 3.68322 22.1902 3.7082 22.2506 3.71972L25.8932 4.24186C25.9644 4.25234 26.0314 4.28258 26.0864 4.32918C26.1414 4.37578 26.1822 4.43684 26.2042 4.50546C26.2262 4.57408 26.2286 4.6475 26.211 4.71736C26.1932 4.78724 26.1564 4.85078 26.1046 4.90076L23.469 7.46174C23.4264 7.5058 23.3944 7.55882 23.375 7.6169C23.3556 7.67498 23.3496 7.73666 23.357 7.7974L23.9786 11.4151C23.9924 11.4848 23.9858 11.557 23.9598 11.6232C23.9338 11.6893 23.8896 11.7467 23.832 11.7885C23.7746 11.8303 23.7064 11.8548 23.6354 11.8591C23.5646 11.8634 23.4938 11.8474 23.4316 11.8129L20.1746 10.1097C20.1216 10.0792 20.0616 10.0631 20.0004 10.0631C19.9394 10.0631 19.8794 10.0792 19.8264 10.1097L16.5692 11.8129C16.5072 11.8474 16.4364 11.8634 16.3654 11.8591C16.2946 11.8548 16.2264 11.8303 16.1688 11.7885C16.1114 11.7467 16.067 11.6893 16.041 11.6232C16.0152 11.557 16.0086 11.4848 16.0222 11.4151L16.6438 7.7974C16.6514 7.73666 16.6454 7.67498 16.626 7.6169C16.6066 7.55882 16.5744 7.5058 16.532 7.46174L13.8964 4.90076C13.8445 4.85078 13.8076 4.78724 13.79 4.71736C13.7724 4.6475 13.7747 4.57408 13.7967 4.50546C13.8187 4.43684 13.8596 4.37578 13.9145 4.32918C13.9695 4.28258 14.0364 4.25234 14.1077 4.24186L17.7502 3.73216C17.8108 3.72064 17.8678 3.69566 17.9174 3.65908C17.9668 3.6225 18.0074 3.57524 18.0362 3.52082L19.6524 0.226361C19.6824 0.159941 19.7308 0.103421 19.7916 0.063381C19.8526 0.023321 19.9236 0.0013613 19.9966 6.13023e-05C20.0694 -0.0012387 20.1412 0.018161 20.2036 0.056021C20.2658 0.093881 20.3162 0.148621 20.3486 0.213921Z' fill='%23FBB848'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 116.67 108.78'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:white;stroke-width:0}%3c/style%3e%3c/defs%3e%3cpath class='cls-1' d='m114.28 28.25-45.9 30.13c-.79.51-1.43 1.23-1.85 2.07l-7 14.03a1.291 1.291 0 0 1-1.2.78c-.26 0-.5-.07-.72-.21a1.33 1.33 0 0 1-.48-.57l-7-14.03a5.344 5.344 0 0 0-1.85-2.07L2.38 28.25c-.23-.27-.56-.45-.92-.48-.36-.03-.71.08-.99.31-.27.23-.45.56-.48.92-.03.36.08.71.31.99L19.48 67.3c.09.2.14.41.13.63s-.06.43-.16.62-.25.35-.43.48c-.18.12-.38.2-.6.23H6.92c-.28 0-.56.09-.79.25-.23.17-.4.4-.49.67s-.09.56 0 .83c.09.27.26.51.49.67l51.42 36.84c.24.16.51.25.8.25s.56-.09.8-.25l51.42-36.84c.23-.17.4-.4.49-.67s.09-.56 0-.83-.26-.51-.49-.67c-.23-.17-.51-.25-.79-.25H98.25c-.23 0-.45-.07-.64-.19-.2-.11-.36-.28-.48-.47s-.19-.41-.2-.64c-.01-.23.03-.45.13-.66l19.33-37.31c.23-.27.34-.63.31-.99a1.356 1.356 0 0 0-1.47-1.23c-.36.03-.69.2-.92.48Z'/%3e%3cpath class='cls-1' d='m59.35.62 4.71 9.61c.08.16.2.3.35.4.14.11.31.18.49.21l10.62 1.52c.21.03.4.12.56.25s.28.31.34.51.07.41.02.62c-.05.2-.16.39-.31.53l-7.69 7.47c-.12.13-.22.28-.27.45s-.07.35-.05.53l1.81 10.55c.04.2.02.41-.05.61-.08.19-.2.36-.37.48a1.2 1.2 0 0 1-.57.21c-.21.01-.41-.03-.59-.13l-9.5-4.97a1.002 1.002 0 0 0-1.02 0l-9.5 4.97c-.18.1-.39.15-.59.13a.971.971 0 0 1-.57-.21c-.17-.12-.3-.29-.37-.48-.08-.19-.09-.4-.05-.61l1.81-10.55c.02-.18 0-.36-.05-.53s-.15-.32-.27-.45l-7.69-7.47c-.15-.15-.26-.33-.31-.53-.05-.2-.04-.42.02-.62s.18-.38.34-.51c.16-.14.36-.22.56-.25l10.62-1.49c.18-.03.34-.11.49-.21.14-.11.26-.24.35-.4l4.7-9.6c.09-.19.23-.36.41-.48.18-.12.38-.18.6-.18.21 0 .42.05.6.16s.33.27.42.46Z'/%3e%3c/svg%3e")\n  					}\n  			}\n  			/* HypeSquad Balance */\n  			.profileBadgeHypesquadHouse3\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.7244 0.113925C15.8764 -0.037975 16.1236 -0.037975 16.2756 0.113925L31.8852 15.7234C31.9594 15.7958 32 15.8964 32 15.9988C32 16.1014 31.9576 16.202 31.8852 16.2744L16.2756 31.8838C16.1996 31.9598 16.099 31.9986 16 31.9986C15.901 31.9986 15.8004 31.9598 15.7244 31.8838L0.1148 16.2744C0.0406205 16.202 0 16.103 0 15.9988C0 15.8946 0.0406205 15.7958 0.1148 15.7234L15.7244 0.113925ZM17.5842 16.7034L24.8134 11.9559C24.9952 11.8375 25.216 12.0354 25.1154 12.2278L22.1182 18.111C22.0474 18.2524 22.1498 18.4184 22.307 18.4184H24.1016C24.3082 18.4184 24.393 18.6816 24.2252 18.8016L16.1218 24.6072C16.0494 24.6602 15.9506 24.6602 15.8764 24.6072L7.77304 18.8016C7.60702 18.6816 7.6918 18.4184 7.89668 18.4184H9.68936C9.84832 18.4184 9.95076 18.2524 9.87834 18.111L6.8811 12.2278C6.7822 12.0354 7.00298 11.8375 7.1849 11.9559L14.4158 16.7034C14.5412 16.7864 14.6418 16.8994 14.7088 17.0336L15.811 19.245C15.8888 19.4004 16.1112 19.4004 16.189 19.245L17.291 17.0336C17.3582 16.8994 17.4588 16.7846 17.5842 16.7034Z' fill='%2345DDC0'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url(https://discord.com/assets/2a085ed9c86f3613935a6a8667ba8b89.svg);\n  					}\n  			}\n  			/* HypeSquad Bravery */\n  			.profileBadgeHypesquadHouse1\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='29' height='32' viewBox='0 0 29 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.42994 0H28.3701C28.6075 0 28.8001 0.19984 28.8001 0.4461V20.4034C28.8001 20.5428 28.7377 20.672 28.6327 20.7568L14.6627 31.9072C14.5849 31.9698 14.4933 32 14.3999 32C14.3067 32 14.2151 31.9698 14.1373 31.9072L0.1673 20.7568C0.0622602 20.672 0 20.5428 0 20.4034V0.4461C0 0.19984 0.1926 0 0.42994 0ZM16.0729 14.1944L24.3279 8.76848C24.5357 8.63122 24.7877 8.85932 24.6729 9.08136L21.2501 15.8052C21.1695 15.9666 21.2865 16.1564 21.4659 16.1564H23.5151C23.7511 16.1564 23.8479 16.4572 23.6563 16.5944L14.4029 23.2294C14.3201 23.29 14.2073 23.29 14.1225 23.2294L4.8691 16.5944C4.6795 16.4572 4.77632 16.1564 5.01028 16.1564H7.0574C7.23892 16.1564 7.3559 15.9666 7.27322 15.8052L3.85058 9.07934C3.73762 8.85932 3.98974 8.63324 4.19748 8.76848L12.4545 14.1944C12.5977 14.2892 12.7127 14.4184 12.7893 14.5718L14.0479 17.099C14.1367 17.2766 14.3907 17.2766 14.4795 17.099L15.7381 14.5718C15.8147 14.4184 15.9297 14.2872 16.0729 14.1944Z' fill='%239C84EF'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url(https://discord.com/assets/1115767aed344e96a27a12e97718c171.svg);\n  					}\n  			}\n  			/* HypeSquad Brilliance */\n  			.profileBadgeHypesquadHouse2\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM17.5842 15.45L24.8134 10.7024C24.9952 10.5841 25.216 10.7819 25.1154 10.9744L22.1182 16.8576C22.0474 16.999 22.1498 17.165 22.307 17.165H24.1016C24.3082 17.165 24.393 17.428 24.2252 17.5482L16.1218 23.3536C16.0494 23.4066 15.9506 23.4066 15.8764 23.3536L7.77304 17.5482C7.60702 17.428 7.6918 17.165 7.89668 17.165H9.68936C9.84832 17.165 9.95076 16.999 9.87834 16.8576L6.8811 10.9744C6.7822 10.7819 7.00298 10.5841 7.1849 10.7024L14.4158 15.45C14.5412 15.533 14.6418 15.646 14.7088 15.7802L15.811 17.9916C15.8888 18.147 16.1112 18.147 16.189 17.9916L17.291 15.7802C17.3582 15.646 17.4588 15.5312 17.5842 15.45Z' fill='%23F47B67'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url(https://discord.com/assets/d3478c6bd5cee0fc600e55935ddc81aa.svg);\n  					}\n  			}\n  			/* Early Supporter */\n  			.profileBadgeEarlySupporter\n  			{   \n  					background-image: url("data:image/svg+xml,%3Csvg width='35' height='24' viewBox='0 0 35 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M23.2236 17.4549H21.3909C20.3367 17.4405 19.3312 17.0087 18.595 16.254C17.8588 15.4994 17.4519 14.4836 17.4636 13.4294V11.553C17.4607 11.1326 17.6242 10.7279 17.9185 10.4274C18.2128 10.127 18.6139 9.95522 19.0345 9.94937H27.6418V7.70215H12.369C10.9836 10.8222 9.5654 14.073 9.09632 15.3386C8.79468 16.0818 8.27669 16.7175 7.6095 17.1629C6.94232 17.6084 6.15669 17.8431 5.35449 17.8367V19.1786C5.9571 19.782 6.67311 20.2604 7.46132 20.5862C8.24952 20.912 9.09435 21.0786 9.94722 21.0767H23.6818C24.733 21.0767 25.7413 20.6598 26.4858 19.9175C27.2302 19.1751 27.6498 18.168 27.6526 17.1167V16.833C27.0328 17.2373 26.3091 17.4533 25.569 17.4549H23.2236ZM14.0272 14.3894C13.7569 14.3913 13.4923 14.3123 13.2674 14.1624C13.0424 14.0126 12.8675 13.7988 12.7653 13.5486C12.663 13.2984 12.638 13.0233 12.6935 12.7589C12.7491 12.4943 12.8826 12.2525 13.0768 12.0645C13.2711 11.8766 13.5172 11.7512 13.7833 11.7044C14.0496 11.6576 14.3238 11.6918 14.5704 11.8022C14.817 11.9127 15.025 12.0945 15.1674 12.3243C15.3097 12.554 15.3799 12.8211 15.369 13.0913C15.355 13.4385 15.2079 13.7672 14.958 14.009C14.7082 14.2506 14.3748 14.387 14.0272 14.3894Z' fill='%239CB8FF'/%3E%3Cpath d='M27.9249 9.94922H19.0449C18.8358 9.95072 18.6289 9.99332 18.4363 10.0746C18.2436 10.1561 18.0688 10.2746 17.9218 10.4235C17.775 10.5723 17.6589 10.7487 17.5801 10.9425C17.5015 11.1363 17.4616 11.3438 17.4631 11.5529V13.4292C17.4514 14.4834 17.8584 15.4992 18.5946 16.2539C19.3308 17.0085 20.3362 17.4404 21.3904 17.4548H25.5685C26.3086 17.4531 27.0324 17.2371 27.6522 16.8329L27.7614 16.7675C28.291 16.3875 28.722 15.8861 29.0181 15.3053C29.3142 14.7245 29.4667 14.0811 29.4631 13.4292V11.5529C29.469 11.1371 29.3109 10.7357 29.023 10.4355C28.7352 10.1354 28.3407 9.96062 27.9249 9.94922ZM24.0085 15.6983H22.2741C22.1802 15.7104 22.0849 15.7023 21.9945 15.6747C21.904 15.6471 21.8206 15.6005 21.7495 15.5381C21.6786 15.4757 21.6216 15.3987 21.5827 15.3126C21.5437 15.2264 21.5235 15.1329 21.5235 15.0383C21.5235 14.9438 21.5437 14.8503 21.5827 14.7641C21.6216 14.678 21.6786 14.601 21.7495 14.5386C21.8206 14.4762 21.904 14.4296 21.9945 14.402C22.0849 14.3744 22.1802 14.3663 22.2741 14.3783H24.0085C24.1024 14.3663 24.1977 14.3744 24.2881 14.402C24.3786 14.4296 24.462 14.4762 24.5331 14.5386C24.604 14.601 24.661 14.678 24.6999 14.7641C24.7389 14.8503 24.7591 14.9438 24.7591 15.0383C24.7591 15.1329 24.7389 15.2264 24.6999 15.3126C24.661 15.3987 24.604 15.4757 24.5331 15.5381C24.462 15.6005 24.3786 15.6471 24.2881 15.6747C24.1977 15.7023 24.1024 15.7104 24.0085 15.6983ZM27.1177 15.6983H26.4522C26.2918 15.6777 26.1444 15.5993 26.0376 15.4778C25.9308 15.3563 25.8718 15.2001 25.8718 15.0383C25.8718 14.8766 25.9308 14.7204 26.0376 14.5989C26.1444 14.4774 26.2918 14.399 26.4522 14.3783H27.1177C27.2115 14.3663 27.3067 14.3744 27.3972 14.402C27.4876 14.4296 27.5712 14.4762 27.6421 14.5386C27.7132 14.601 27.7701 14.678 27.8091 14.7641C27.8479 14.8503 27.8682 14.9438 27.8682 15.0383C27.8682 15.1329 27.8479 15.2264 27.8091 15.3126C27.7701 15.3987 27.7132 15.4757 27.6421 15.5381C27.5712 15.6005 27.4876 15.6471 27.3972 15.6747C27.3067 15.7023 27.2115 15.7104 27.1177 15.6983Z' fill='%23CBDAF7'/%3E%3Cpath d='M24.0085 14.3785H22.2739C22.1801 14.3664 22.0847 14.3745 21.9943 14.4021C21.9038 14.4297 21.8204 14.4763 21.7493 14.5387C21.6784 14.6013 21.6215 14.6781 21.5825 14.7642C21.5435 14.8504 21.5234 14.9439 21.5234 15.0385C21.5234 15.133 21.5435 15.2265 21.5825 15.3127C21.6215 15.3988 21.6784 15.4758 21.7493 15.5382C21.8204 15.6006 21.9038 15.6472 21.9943 15.6748C22.0847 15.7024 22.1801 15.7105 22.2739 15.6985H24.0085C24.1022 15.7105 24.1975 15.7024 24.2879 15.6748C24.3784 15.6472 24.4619 15.6006 24.5329 15.5382C24.604 15.4758 24.6608 15.3988 24.6998 15.3127C24.7387 15.2265 24.7589 15.133 24.7589 15.0385C24.7589 14.9439 24.7387 14.8504 24.6998 14.7642C24.6608 14.6781 24.604 14.6013 24.5329 14.5387C24.4619 14.4763 24.3784 14.4297 24.2879 14.4021C24.1975 14.3745 24.1022 14.3664 24.0085 14.3785ZM27.0956 14.3785H26.4302C26.2697 14.3991 26.1224 14.4775 26.0155 14.599C25.9087 14.7205 25.8497 14.8767 25.8497 15.0385C25.8497 15.2002 25.9087 15.3564 26.0155 15.4779C26.1224 15.5994 26.2697 15.6778 26.4302 15.6985H27.0956C27.1895 15.7105 27.2848 15.7024 27.3752 15.6748C27.4657 15.6472 27.5491 15.6006 27.6202 15.5382C27.6911 15.4758 27.7481 15.3988 27.787 15.3127C27.826 15.2265 27.8462 15.133 27.8462 15.0385C27.8462 14.9439 27.826 14.8504 27.787 14.7642C27.7481 14.6781 27.6911 14.6013 27.6202 14.5387C27.5491 14.4763 27.4657 14.4297 27.3752 14.4021C27.2848 14.3745 27.1895 14.3664 27.0956 14.3785Z' fill='%239CB8FF'/%3E%3Cpath d='M2.44191 16.7563C2.27756 16.6813 2.11733 16.5976 1.96191 16.5054V22.8109L3.66374 24L5.35464 22.8109V17.8363C4.27931 17.8746 3.23243 17.4864 2.44191 16.7563Z' fill='%23FF903E'/%3E%3Cpath d='M7.97231 14.6186C7.76636 15.1361 7.4566 15.6061 7.06211 15.9994C6.66764 16.3927 6.19681 16.7009 5.67863 16.9054C5.16044 17.1098 4.60589 17.206 4.04915 17.1878C3.4924 17.1698 2.94524 17.038 2.44141 16.8004C3.23018 17.5343 4.27727 17.9266 5.35414 17.8913C6.15913 17.8751 6.94057 17.6167 7.59641 17.1496C8.25226 16.6825 8.75203 16.0286 9.0305 15.2731C9.52141 14.0294 10.9396 10.7786 12.3032 7.63672H10.9178C10.9178 7.63672 9.0305 11.924 7.97231 14.6186Z' fill='%23D0D9EA'/%3E%3Cpath d='M23.8455 4.66905C25.1589 4.70277 26.4679 4.83405 27.7618 5.06178C26.9109 4.04724 23.5945 0.698145 16.7328 0.0981445C21.6963 1.28724 23.5291 4.11268 23.8455 4.66905ZM7.97274 14.6182C9.03091 11.9236 10.9182 7.70178 10.9182 7.70178C10.9182 7.70178 14.2782 5.15997 21.1945 4.7236C18.7836 1.45087 14.8236 0.35997 12.38 0.0981445C3.94728 1.0036 0.00910225 7.40724 0.00910225 12.5127C-0.0405343 13.2906 0.113457 14.0679 0.455892 14.7681C0.798327 15.4683 1.31737 16.0671 1.96183 16.5054C2.11723 16.5976 2.27746 16.6813 2.44183 16.7563C2.94295 16.9951 3.48753 17.1291 4.04223 17.1501C4.59691 17.1711 5.15007 17.0787 5.66781 16.8786C6.18556 16.6783 6.65703 16.3747 7.05334 15.9861C7.44967 15.5974 7.76251 15.132 7.97274 14.6182ZM0.849102 11.52C0.885972 10.7049 1.24176 9.937 1.83973 9.38185C2.43769 8.82676 3.2299 8.52895 4.04547 8.55268C4.84401 8.72571 5.54235 9.2062 5.98944 9.89005C6.43653 10.5739 6.59643 11.4064 6.43455 12.2073C6.39778 13.0146 6.04807 13.776 5.45955 14.3298C4.87102 14.8837 4.08993 15.1867 3.28183 15.1746C2.88175 15.0951 2.50129 14.9374 2.16231 14.7105C1.82332 14.4837 1.53247 14.1921 1.30645 13.8525C1.08042 13.513 0.923667 13.1322 0.845187 12.7318C0.766707 12.3316 0.768027 11.9197 0.849102 11.52Z' fill='white'/%3E%3Cpath d='M22.7326 4.6582C22.198 4.6582 21.6416 4.6582 21.1834 4.72365C14.267 5.16001 10.918 7.70184 10.918 7.70184H34.3289C32.3939 6.30316 30.1474 5.39703 27.7834 5.06184C26.4895 4.83409 25.1804 4.70283 23.867 4.66911L22.7326 4.6582Z' fill='%237687B2'/%3E%3Cpath d='M3.28164 15.1749C4.09906 15.2016 4.89406 14.9051 5.49439 14.3496C6.09474 13.7942 6.45204 13.0247 6.48891 12.2076C6.64936 11.399 6.48207 10.5597 6.02382 9.87437C5.56557 9.18902 4.85389 8.71376 4.04527 8.55308C3.22972 8.52933 2.43751 8.82714 1.83954 9.38221C1.24158 9.93736 0.885794 10.7052 0.848909 11.5203C0.767849 11.9201 0.766514 12.332 0.845009 12.7322C0.923489 13.1325 1.08024 13.5134 1.30627 13.8528C1.53229 14.1924 1.82314 14.484 2.16213 14.7108C2.50111 14.9378 2.88156 15.0954 3.28164 15.1749ZM1.36164 11.6403C1.37277 11.3666 1.43832 11.0978 1.55449 10.8497C1.67067 10.6016 1.83513 10.3791 2.03826 10.1952C2.24139 10.0115 2.47912 9.87002 2.73756 9.77897C2.99601 9.68807 3.26997 9.64967 3.54346 9.66587C4.07449 9.78107 4.53856 10.1012 4.83478 10.5567C5.13099 11.0123 5.23539 11.5664 5.12527 12.0986C5.10258 12.6407 4.86597 13.1517 4.46725 13.5198C4.06854 13.8878 3.54022 14.0828 2.998 14.0622C2.46063 13.9566 1.9869 13.6425 1.6803 13.1888C1.37368 12.735 1.25913 12.1784 1.36164 11.6403Z' fill='%237687B2'/%3E%3Cpath d='M2.94384 14.0618C3.48606 14.0825 4.01437 13.8875 4.41309 13.5194C4.81179 13.1514 5.04841 12.6404 5.07111 12.0983C5.18121 11.5661 5.07681 11.0119 4.7806 10.5564C4.48438 10.1008 4.02031 9.78075 3.48928 9.6654C2.94603 9.6477 2.41774 9.84525 2.01936 10.215C1.62097 10.5848 1.38474 11.097 1.36201 11.64C1.258 12.1702 1.36515 12.7201 1.66062 13.1724C1.95609 13.6248 2.41653 13.944 2.94384 14.0618ZM21.1839 4.73454H23.8129C23.4856 4.16727 21.6312 1.35273 16.7112 0.163635L15.7947 0H14.4202C13.7421 0.0003 13.0646 0.0403649 12.3911 0.12C14.8239 0.41454 18.7729 1.41818 21.1839 4.73454Z' fill='%23FF903E'/%3E%3Cpath d='M13.9199 14.625C14.7483 14.625 15.4199 13.9534 15.4199 13.125C15.4199 12.2966 14.7483 11.625 13.9199 11.625C13.0915 11.625 12.4199 12.2966 12.4199 13.125C12.4199 13.9534 13.0915 14.625 13.9199 14.625Z' fill='%23040405'/%3E%3C/svg%3E ");\n  					width: 28px;\n  					&.richBadge {\n  							background-image: url(https://discord.com/assets/ce15562552e3d70c56d5408cfeed2ffd.svg);\n  					}\n  			}\n  			/* Pomelo */\n  			.profileBadgeLegacyUsername\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18 36C27.9412 36 36 27.9412 36 18C36 8.05888 27.9412 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9412 8.05888 36 18 36ZM15.6966 8.74384C16.4641 8.87173 16.9825 9.59754 16.8546 10.3649L16.3874 13.1679H21.5286L22.073 9.90177C22.2009 9.13436 22.9267 8.61593 23.6941 8.74384C24.4615 8.87173 24.9799 9.59754 24.8521 10.3649L24.3848 13.1679H26.1286C26.9066 13.1679 27.5373 13.7986 27.5373 14.5766C27.5373 15.3546 26.9066 15.9853 26.1286 15.9853H23.9153L23.2001 20.2769H25.2401C26.018 20.2769 26.6488 20.9077 26.6488 21.6856C26.6488 22.4637 26.018 23.0943 25.2401 23.0943H22.7306L22.1862 26.3605C22.0583 27.1279 21.3325 27.6463 20.5651 27.5184C19.7977 27.3905 19.2793 26.6647 19.4071 25.8973L19.8742 23.0943H14.733L14.1886 26.3605C14.0607 27.1279 13.3349 27.6463 12.5675 27.5184C11.8001 27.3905 11.2817 26.6647 11.4096 25.8973L11.8767 23.0943H10.1331C9.35513 23.0943 8.72444 22.4637 8.72444 21.6856C8.72444 20.9077 9.35513 20.2769 10.1331 20.2769H12.3463L13.0616 15.9853H11.0218C10.2438 15.9853 9.61306 15.3546 9.61306 14.5766C9.61306 13.7986 10.2438 13.1679 11.0218 13.1679H13.5311L14.0755 9.90177C14.2034 9.13436 14.9292 8.61593 15.6966 8.74384ZM21.0591 15.9853L20.3438 20.2769H15.2025L15.9178 15.9853H21.0591Z' fill='%231ABC9C'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_4488_19832)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24ZM10.4644 5.82922C10.976 5.91449 11.3216 6.39836 11.2364 6.90997L10.9249 8.77859H14.3524L14.7153 6.60118C14.8006 6.08957 15.2845 5.74395 15.7961 5.82922C16.3077 5.91449 16.6533 6.39836 16.568 6.90997L16.2566 8.77859H17.4191C17.9377 8.77859 18.3582 9.19906 18.3582 9.71773C18.3582 10.2364 17.9377 10.6568 17.4191 10.6568H15.9435L15.4667 13.5179H16.8267C17.3453 13.5179 17.7658 13.9385 17.7658 14.4571C17.7658 14.9758 17.3453 15.3962 16.8267 15.3962H15.1537L14.7908 17.5736C14.7055 18.0853 14.2217 18.4309 13.7101 18.3456C13.1984 18.2603 12.8528 17.7765 12.9381 17.2649L13.2495 15.3962H9.82198L9.45908 17.5736C9.37382 18.0853 8.88994 18.4309 8.37834 18.3456C7.86673 18.2603 7.52111 17.7765 7.60637 17.2649L7.91781 15.3962H6.75543C6.23675 15.3962 5.8163 14.9758 5.8163 14.4571C5.8163 13.9385 6.23675 13.5179 6.75543 13.5179H8.23085L8.70771 10.6568H7.34784C6.82917 10.6568 6.40871 10.2364 6.40871 9.71773C6.40871 9.19906 6.82917 8.77859 7.34784 8.77859H9.02075L9.38366 6.60118C9.46892 6.08957 9.95279 5.74395 10.4644 5.82922ZM14.0394 10.6568L13.5625 13.5179H10.135L10.6119 10.6568H14.0394Z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E%0A");\n  					}\n  			}\n  			/* Active Developer */\n  			.profileBadgeActiveDeveloper\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.94426 0L0 4.94426V27.0558L4.94434 32H27.0556L32 27.0558V4.94426L27.0558 0H4.94426ZM13.7164 24.851H9.29102C9.29102 21.1904 6.3134 18.2128 2.65284 18.2128V13.7872C6.3134 13.7872 9.29102 10.8097 9.29102 7.14908H13.7164C13.7164 10.7808 11.9337 13.9816 9.22258 16C11.9337 18.0186 13.7164 21.2192 13.7164 24.851ZM29.3334 18.2128C25.6728 18.2128 22.6952 21.1904 22.6952 24.851H18.2696C18.2696 21.2192 20.0526 18.0186 22.7636 16C20.0526 13.9816 18.2696 10.7808 18.2696 7.14908H22.6952C22.6952 10.8097 25.6728 13.7872 29.3334 13.7872V18.2128Z' fill='%232EA967'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath fill='%23FFF' fill-rule='evenodd' d='M2 0a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm4.2 15h2.5c0-2-1-3.9-2.5-5 1.5-1.1 2.5-3 2.5-5H6.2c0 2-1.6 3.8-3.7 3.8v2.4c2 0 3.7 1.7 3.7 3.8Zm7.6 0c0-2 1.6-3.8 3.7-3.8V8.8c-2 0-3.7-1.7-3.7-3.8h-2.5c0 2 1 3.9 2.5 5a6.2 6.2 0 0 0-2.5 5h2.5Z' clip-rule='evenodd'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Early Verified Bot Developer */\n  			.profileBadgeVerifiedDeveloper\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='40' height='35' viewBox='0 0 40 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M39.02 15.98L30.46 1.2L29.76 0H9.94L9.24 1.2L0.7 15.98L0 17.18L0.7 18.38L9.24 33.16L9.94 34.36H29.78L30.48 33.16L39.04 18.38L39.74 17.18L39.02 15.98ZM12.88 13.92L9.62 17.18L12.88 20.44V25.9L4.16 17.18L12.9 8.44V13.92H12.88ZM19.12 27.78L15.04 26.52L21.24 6.56L25.32 7.84L19.12 27.78ZM26.84 25.92V20.46L30.1 17.18L26.84 13.92V8.44L35.56 17.18L26.84 25.92Z' fill='%233E70DD'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 115.91 100.22'%3e%3cpath d='M113.81 46.61 88.84 3.5 86.8 0H28.99l-2.04 3.5L2.04 46.61 0 50.11l2.04 3.5 24.91 43.11 2.04 3.5h57.87l2.04-3.5 24.97-43.11 2.04-3.5-2.1-3.5ZM37.57 40.6l-9.51 9.51 9.51 9.51v15.93L12.14 50.12l25.49-25.49v15.98h-.06Zm18.2 40.42-11.9-3.67 18.08-58.22 11.9 3.73-18.08 58.16Zm22.51-5.42V59.68l9.51-9.57-9.51-9.51V24.62l25.43 25.49L78.28 75.6Z' style='fill:white;stroke-width:0'/%3e%3c/svg%3e");\n  					}\n  			}\n  			/* Bug Hunter Level 1 */\n  			.profileBadgeBugHunterLevel1\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='40' height='38' viewBox='0 0 40 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.1642 1.27612C29.1642 1.27612 44.5084 11.7486 38.6776 26.4535C32.8468 41.1585 21.2492 37.0795 25.5838 32.7831C29.9186 28.4867 20.4692 25.5713 14.4209 19.9961L29.1514 1.27612' fill='%233BA55C'/%3E%3Cpath d='M28.231 15.6743C24.996 19.7918 20.431 21.8504 16.9018 21.1088L4.58812 36.7982C4.38088 37.063 4.1235 37.2842 3.8307 37.4494C3.5379 37.6144 3.21542 37.7202 2.88168 37.7606C2.54796 37.801 2.20956 37.7752 1.88582 37.6846C1.56208 37.5942 1.25938 37.4406 0.994996 37.233C0.727516 37.0266 0.503596 36.7692 0.336156 36.4758C0.168716 36.1824 0.0610761 35.8586 0.0194761 35.5234C-0.0221439 35.188 0.00309582 34.8478 0.0937158 34.5224C0.184336 34.197 0.338556 33.8926 0.547456 33.6272L12.7973 17.9632C11.1734 14.7153 12.0684 9.74122 15.3547 5.58548C19.4336 0.419581 25.5842 -1.51124 29.1518 1.2763C32.7192 4.06384 32.2846 10.5084 28.231 15.6743Z' fill='%23B4E1CD'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cg fill='%23fff' clip-path='url(%23a)'%3E%3Cpath fill-opacity='.6' d='M14.58.64s7.67 5.23 4.76 12.59c-2.92 7.35-8.71 5.31-6.55 3.16 2.17-2.15-2.55-3.6-5.58-6.4L14.58.65'/%3E%3Cpath d='M14.12 7.84c-1.62 2.06-3.9 3.09-5.67 2.71L2.3 18.4a1.28 1.28 0 0 1-2.12-.16 1.28 1.28 0 0 1 .1-1.43L6.4 8.98c-.81-1.62-.37-4.1 1.28-6.19C9.72.21 12.79-.76 14.58.64c1.78 1.4 1.56 4.61-.46 7.2Z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h20v20H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Bug Hunter Level 2 */\n  			.profileBadgeBugHunterLevel2\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='40' height='38' viewBox='0 0 40 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.1774 1.20337C29.1774 1.20337 44.5586 11.7224 38.6476 26.468C32.7366 41.2136 21.2006 37.114 25.5862 32.7602C29.9718 28.4064 20.4698 25.5782 14.4316 19.9214L29.1774 1.20337Z' fill='%23FFEAC0'/%3E%3Cpath d='M28.2876 15.6947C25.078 19.7942 20.47 21.86 16.8788 21.0972L4.58028 36.8598C3.69046 38.0038 2.13326 38.131 0.9892 37.2412C-0.15486 36.3512 -0.28196 34.7942 0.48074 33.65L12.7793 18.0146C11.1268 14.8049 12.0166 9.81552 15.3535 5.58888C19.453 0.440617 25.5864 -1.46614 29.1774 1.20332C32.7686 3.87278 32.26 10.4511 28.2876 15.6947Z' fill='%23FFD56C'/%3E%3Cmask id='mask0_0_1' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='38'%3E%3Cpath d='M28.2876 15.6947C25.078 19.7942 20.47 21.86 16.8788 21.0972L4.58028 36.8598C3.69046 38.0038 2.13326 38.131 0.9892 37.2412C-0.15486 36.3512 -0.28196 34.7942 0.48074 33.65L12.7793 18.0146C11.1268 14.8049 12.0166 9.81552 15.3535 5.58888C19.453 0.440617 25.5864 -1.46614 29.1774 1.20332C32.7686 3.87278 32.26 10.4511 28.2876 15.6947Z' fill='%23FFD56C'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_0_1)'%3E%3Cpath d='M22.0779 -6.53564L23.5589 -6.34056L17.2455 41.5818L15.7646 41.3866L22.0779 -6.53564Z' fill='white'/%3E%3Cpath d='M24.5642 -7.03613L27.8094 -6.60859L21.4962 41.3137L18.251 40.8863L24.5642 -7.03613Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' fill-opacity='.45' d='M8.44 10.55c1.8.38 4.1-.65 5.7-2.7 1.99-2.62 2.24-5.91.45-7.25 0 0 7.69 5.26 4.73 12.63-2.95 7.38-8.72 5.33-6.53 3.15 1.49-1.47-.2-2.6-2.4-4.05-.7-.46-1.45-.96-2.16-1.51l.2-.27Z'/%3E%3Cpath fill='%23fff' fill-opacity='.65' d='M14.14 7.85c-1.6 2.05-3.9 3.08-5.7 2.7l-6.15 7.88c-.44.57-1.22.64-1.8.2a1.32 1.32 0 0 1-.25-1.8L6.39 9c-.83-1.6-.38-4.1 1.29-6.22C9.73.22 12.79-.73 14.58.6c1.8 1.34 1.55 4.63-.44 7.25Z'/%3E%3Cmask id='a' width='16' height='19' x='0' y='0' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M14.14 7.85c-1.6 2.05-3.9 3.08-5.7 2.7l-6.15 7.88c-.44.57-1.22.64-1.8.2a1.32 1.32 0 0 1-.25-1.8L6.39 9c-.83-1.6-.38-4.1 1.29-6.22C9.73.22 12.79-.73 14.58.6c1.8 1.34 1.55 4.63-.44 7.25Z'/%3E%3C/mask%3E%3Cg fill='%23fff' mask='url(%23a)'%3E%3Cpath d='m11.04-3.27.74.1-3.16 23.96-.74-.1 3.16-23.96Zm1.24-.25 1.62.22-3.15 23.96-1.63-.22 3.16-23.96Z'/%3E%3C/g%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Booster Level 1 */\n  			.profileBadgeGuildBoosterLvl1\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L0 32H40L20 0ZM20 11.32L29.18 26H10.82L20 11.32Z' fill='%23FF6BFA'/%3E%3Cpath d='M10.8193 25.9999L19.9993 11.3198L29.1793 25.9999H10.8193Z' fill='%23FFDEF9'/%3E%3Cpath d='M20 0V11.32L29.18 26L40 32L20 0Z' fill='%23FFB0FF'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 4 2 20h20L12 4Zm0 5.66L16.59 17H7.41L12 9.66Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M7.41 17 12 9.66 16.59 17H7.41Z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M12 4v5.66L16.59 17 22 20 12 4Z'/%3E%3C/svg%3E");\n  					}\n  			}   \n  			/* Server Booster Level 2 */\n  			.profileBadgeGuildBoosterLvl2\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.6001 0L0 18.6L18.6001 37.2L37.1999 18.6L18.6001 0ZM18.6001 29.3L7.9 18.6L18.6001 7.9L29.3001 18.6L18.6001 29.3Z' fill='%23FF6BFA'/%3E%3Cpath d='M18.5874 7.89453L7.88184 18.6001L18.5874 29.3057L29.293 18.6001L18.5874 7.89453Z' fill='%23FFDEF9'/%3E%3Cpath d='M18.6006 0V7.9L29.3006 18.6H37.2006L18.6006 0Z' fill='%23FFB0FF'/%3E%3C/svg%3E ");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 2.7 2.7 12l9.3 9.3 9.3-9.3L12 2.7Zm0 14.65L6.65 12 12 6.65 17.35 12 12 17.35Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M12 6.65 6.63 12 12 17.35 17.35 12l-5.36-5.35Z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M12 2.7v3.95L17.35 12h3.95L12 2.7Z'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Booster Level 3 */\n  			.profileBadgeGuildBoosterLvl3\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='22' height='38' viewBox='0 0 22 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9199 0L0 10.92V26.28L10.9199 37.2L21.8399 26.28V10.92L10.9199 0ZM16.3799 24L10.9199 29.48L5.46 24.02V13.18L10.9199 7.72L16.3799 13.18V24Z' fill='%23FF6BFA'/%3E%3Cpath d='M5.45996 13.1802V24.0202L10.9199 29.4802L16.3799 24.0202V13.1802L10.9199 7.72021L5.45996 13.1802Z' fill='%23FFDEF9'/%3E%3Cpath d='M10.9199 0V7.72L16.3799 13.18L21.8399 10.92L10.9199 0Z' fill='%23FFB0FF'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 2.7 6.54 8.16v7.68L12 21.3l5.46-5.46V8.16L12 2.7Zm2.73 12L12 17.44l-2.73-2.73V9.29L12 6.56l2.73 2.73v5.41Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M9.27 9.29v5.42L12 17.44l2.73-2.73V9.29L12 6.56 9.27 9.29Z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M12 2.7v3.86l2.73 2.73 2.73-1.13L12 2.7Z'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Booster Level 4 */\n  			.profileBadgeGuildBoosterLvl4\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='31' height='35' viewBox='0 0 31 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.0801 0.0200195L0 8.72002V26.12L15.0801 34.84L30.1601 26.12V8.72002L15.0801 0.0200195ZM24.9401 23.12L15.0801 28.8L5.24 23.12V11.74L15.0801 6.04002L24.9401 11.74V23.12Z' fill='%23FF6BFA'/%3E%3Cpath d='M22.4608 10.3L5.2207 20.26V11.72L15.0608 6.04004L22.4608 10.3Z' fill='%23FFDEF9'/%3E%3Cpath d='M24.9412 11.7202V14.7602L7.88121 24.6402L5.24121 23.1002L24.9412 11.7202Z' fill='%23FFDEF9'/%3E%3Cpath d='M10.3213 26.0401L24.9412 17.6001V23.1001L15.0612 28.8201L10.3213 26.0401Z' fill='%23FFDEF9'/%3E%3Cpath d='M15.0801 0V6.04L24.9401 11.72L30.1601 8.72L15.0801 0Z' fill='%23FFB0FF'/%3E%3Cpath d='M5.22 23.1201L0 26.1201L15.0801 34.8401V28.8001L5.22 23.1201Z' fill='%23E34BD1'/%3E%3Cpath d='M24.9408 11.7198L22.4608 10.2998L5.2207 20.2598V23.1198L24.9408 11.7198Z' fill='white'/%3E%3Cpath d='M24.9399 14.7598V17.5998L10.3199 26.0398L7.87988 24.6398L24.9399 14.7598Z' fill='white'/%3E%3C/svg%3E ");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 3.3 4.46 7.65v8.71l2.62-1.51V9.16L12 6.31l4.93 2.85v5.69L12 17.69v3l7.54-4.35V7.65L12 3.3Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M12 3.29v3.02l4.93 2.85 2.61-1.51L12 3.29Z'/%3E%3Cpath fill='%23fff' d='m7.08 14.85-2.62 1.51L12 20.7v-3.01l-4.92-2.84Z' opacity='.4'/%3E%3Cpath fill='%23fff' d='m15.68 8.44-8.6 4.98V9.16L12 6.31l3.68 2.13Zm1.25.72v1.51l-8.54 4.94-1.31-.76 9.85-5.69Zm-7.31 7.15 7.31-4.22v2.75L12 17.69l-2.38-1.38Z' opacity='.75'/%3E%3Cpath fill='%23fff' d='m16.93 9.16-9.85 5.69v-1.43l8.6-4.98 1.25.72Zm0 1.51v1.42l-7.31 4.22-1.23-.7 8.54-4.94Z'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Booster Level 5 */\n  			.profileBadgeGuildBoosterLvl5\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.82 0H3.18L0 3.18V28.82L3.18 32H28.82L32 28.82V3.18L28.82 0ZM26 26H6V6H26V26Z' fill='%23FF6BFA'/%3E%3Cpath d='M22.38 5.95996L5.95996 22.36V5.95996H22.38Z' fill='%23FFDEF9'/%3E%3Cpath d='M26.04 5.95996V10.2L10.2 26.04H5.95996V26.02L26.04 5.95996Z' fill='%23FFDEF9'/%3E%3Cpath d='M13.8799 26.0399L26.0399 13.8599V26.0399H13.8799Z' fill='%23FFDEF9'/%3E%3Cpath d='M28.8195 0L26.0195 5.98L31.9995 3.18L28.8195 0Z' fill='%23E34BD1'/%3E%3Cpath d='M0 28.82L5.98 26.02L3.18 32L0 28.82Z' fill='%23E34BD1'/%3E%3Cpath d='M3.18066 0L5.98066 5.98H26.0207L28.8207 0H3.18066Z' fill='%23FFB0FF'/%3E%3Cpath d='M31.9995 28.82L26.0195 26.02L28.8195 32L31.9995 28.82Z' fill='%23FFC0FF'/%3E%3Cpath d='M26.02 5.97998H22.38L5.95996 22.36V26.02L26.02 5.97998Z' fill='white'/%3E%3Cpath d='M26.0402 10.2002V13.8602L13.8802 26.0402H10.2002L26.0402 10.2002Z' fill='white'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M17 7v10H7l-1.4 3h12.81L20 18.41V5.59L17 7Zm0 0 1.4-3H5.59L4 5.59v12.82L7 17V7h10Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='m18.41 4-1.4 2.99L20 5.59 18.41 4ZM4 18.41l2.99-1.4L5.59 20 4 18.41Z' opacity='.4'/%3E%3Cpath fill='%23fff' d='m5.59 4 1.4 2.99h10.02L18.41 4H5.59Z'/%3E%3Cpath fill='%23fff' d='m20 18.41-2.99-1.4 1.4 2.99L20 18.41ZM15.18 6.99l-8.19 8.18V6.99h8.19Zm1.83 0v2.12l-7.9 7.9H6.99V17L17.01 6.99Zm-6.07 10.02 6.07-6.07v6.07h-6.07Z' opacity='.75'/%3E%3Cpath fill='%23fff' d='M17.01 6.99 6.99 17.01v-1.84l8.19-8.18h1.83Zm0 2.12v1.83l-6.07 6.07H9.11l7.9-7.9Z'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Booster Level 6 */\n  			.profileBadgeGuildBoosterLvl6\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='38' height='34' viewBox='0 0 38 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99973 6.20026L2.17973 7.88026C2.08425 7.96248 2.02535 8.07926 2.01597 8.2049C2.00659 8.33056 2.04751 8.45478 2.12973 8.55026C2.21195 8.64574 2.32873 8.70464 2.45437 8.71402C2.58003 8.7234 2.70425 8.68248 2.79973 8.60026L4.47973 7.80026C4.54211 7.77014 4.61047 7.7545 4.67973 7.7545C4.74899 7.7545 4.81737 7.77014 4.87973 7.80026L6.55973 8.60026C6.64645 8.64516 6.74521 8.6613 6.84171 8.64634C6.93823 8.63138 7.02747 8.5861 7.09651 8.51704C7.16557 8.44798 7.21085 8.35876 7.22581 8.26224C7.24077 8.16574 7.22463 8.06698 7.17973 7.98026L6.35973 6.20026C6.32987 6.14138 6.31429 6.07628 6.31429 6.01026C6.31429 5.94424 6.32987 5.87914 6.35973 5.82026L7.17973 4.14026C7.22463 4.05354 7.24077 3.95478 7.22581 3.85828C7.21085 3.76178 7.16557 3.67254 7.09651 3.60348C7.02747 3.53442 6.93823 3.48914 6.84171 3.47418C6.74521 3.45922 6.64645 3.47536 6.55973 3.52026L4.87973 4.32026C4.81737 4.35038 4.74899 4.36602 4.67973 4.36602C4.61047 4.36602 4.54211 4.35038 4.47973 4.32026L2.79973 3.52026C2.71301 3.47536 2.61425 3.45922 2.51775 3.47418C2.42125 3.48914 2.33201 3.53442 2.26295 3.60348C2.19389 3.67254 2.14861 3.76178 2.13365 3.85828C2.11869 3.95478 2.13483 4.05354 2.17973 4.14026L2.99973 5.82026C3.02961 5.87914 3.04517 5.94424 3.04517 6.01026C3.04517 6.07628 3.02961 6.14138 2.99973 6.20026Z' fill='%23FFD836'/%3E%3Cpath d='M35.44 12.88L24.42 9.42L17.72 0L11.04 9.42L0 12.88L6.9 22.16L6.78 33.7L17.72 30.02L28.68 33.7L28.56 22.16L35.44 12.88Z' fill='%23FFDEF9'/%3E%3Cpath d='M35.44 12.88L24.42 9.42L17.76 0L11.04 9.42L0 12.88L6.9 22.16L6.78 33.7L17.76 30.02L28.72 33.7L28.6 22.16L35.44 12.88ZM24.54 19.18L23.54 20.52V22.2V26.72L19.24 25.28L17.76 24.74L16.16 25.28L11.76 26.72V22.2V20.6L10.76 19.26L8.2 15.54L12.52 14.18L14.14 13.68L15.12 12.3L17.76 8.6L20.38 12.28L21.36 13.64L22.96 14.14L27.28 15.5L24.54 19.18Z' fill='%23FF73FA'/%3E%3Cpath d='M17.7197 0V8.64L21.3197 13.68L27.2397 15.54L35.4397 12.88L24.4197 9.42L17.7197 0Z' fill='%23FFB0FF'/%3E%3Cpath d='M6.8993 22.16L11.8993 20.52L11.8393 26.72L17.6993 24.74V30.02L6.7793 33.7L6.8993 22.16Z' fill='%23E655D4'/%3E%3Cpath d='M23.54 20.52L28.56 22.16L28.68 33.7L23.6 26.72L23.54 20.52Z' fill='%23FFB0FF'/%3E%3Cpath d='M31.7794 26.8803H31.7994C32.2854 26.8803 32.6794 26.4863 32.6794 26.0003V24.2203C32.6794 23.7343 32.2854 23.3403 31.7994 23.3403H31.7794C31.2934 23.3403 30.8994 23.7343 30.8994 24.2203V26.0003C30.8994 26.4863 31.2934 26.8803 31.7794 26.8803Z' fill='%23D4E4FF'/%3E%3Cpath d='M31.7794 33.9604H31.7994C32.2854 33.9604 32.6794 33.5664 32.6794 33.0804V31.3004C32.6794 30.8144 32.2854 30.4204 31.7994 30.4204H31.7794C31.2934 30.4204 30.8994 30.8144 30.8994 31.3004V33.0804C30.8994 33.5664 31.2934 33.9604 31.7794 33.9604Z' fill='%23D4E4FF'/%3E%3Cpath d='M30.0195 28.6603V28.6403C30.0195 28.1543 29.6255 27.7603 29.1395 27.7603H27.3595C26.8735 27.7603 26.4795 28.1543 26.4795 28.6403V28.6603C26.4795 29.1463 26.8735 29.5403 27.3595 29.5403H29.1395C29.6255 29.5403 30.0195 29.1463 30.0195 28.6603Z' fill='%23D4E4FF'/%3E%3Cpath d='M37.1191 28.6603V28.6403C37.1191 28.1543 36.7251 27.7603 36.2391 27.7603H34.4591C33.9731 27.7603 33.5791 28.1543 33.5791 28.6403V28.6603C33.5791 29.1463 33.9731 29.5403 34.4591 29.5403H36.2391C36.7251 29.5403 37.1191 29.1463 37.1191 28.6603Z' fill='%23D4E4FF'/%3E%3Cpath d='M21.3193 13.68L11.8992 20.5201L10.6992 18.8801L20.1393 12.04L21.3193 13.68Z' fill='white'/%3E%3Cpath d='M27.2398 15.5403L11.8398 26.7203V24.2003L24.8198 14.7803L27.2398 15.5403Z' fill='white'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cg clip-path='url(%23a)'%3E%3Cmask id='b' width='24' height='24' x='0' y='0' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M24 0H0v24h24V0Z'/%3E%3C/mask%3E%3Cg fill='%23fff' mask='url(%23b)'%3E%3Cpath d='m4.62 5.81-.4.84a.22.22 0 0 0 .3.3l.88-.4a.23.23 0 0 1 .2 0l.84.4a.23.23 0 0 0 .31-.3l-.4-.84a.18.18 0 0 1 0-.2l.4-.84a.23.23 0 0 0-.35-.31l-.84.4a.23.23 0 0 1-.2 0l-.84-.4a.23.23 0 0 0-.3.31l.4.84a.23.23 0 0 1 0 .2Z' opacity='.6'/%3E%3Cpath d='m14.9 12.96.03 3.1-2.15-.72-.8-.27-.79.27-2.14.72.02-2.26.01-.84-.5-.67-1.35-1.82 2.16-.68.81-.25.48-.69 1.3-1.83 1.32 1.84.48.68.81.25 2.15.68-1.34 1.82-.5.67Z' opacity='.75'/%3E%3Cpath d='M11.98 2.7v4.32l1.8 2.52 2.96.93 4.1-1.33-5.51-1.73-3.35-4.71Z'/%3E%3Cpath d='m11.98 15.07.8.27 2.15.72 2.53 3.49-5.48-1.84v-2.64ZM3.12 9.14l5.52-1.73 3.34-4.71v4.32l-1.3 1.83-.48.69-.81.25-2.16.68 1.35 1.82.5.67-2.51.82-3.45-4.64Zm17.72 0-4.1 1.33-1.34 1.82-.5.67 2.5.82 3.44-4.64Z' opacity='.55'/%3E%3Cpath d='M19.01 16.14h.01c.24 0 .44-.2.44-.44v-.89c0-.24-.2-.44-.44-.44h-.01c-.24 0-.44.2-.44.44v.89c0 .24.2.44.44.44Zm0 3.54h.01c.24 0 .44-.2.44-.44v-.89c0-.24-.2-.44-.44-.44h-.01c-.24 0-.44.2-.44.44v.89c0 .24.2.44.44.44Zm-.87-2.66v-.01c0-.24-.2-.44-.44-.44h-.89c-.24 0-.44.2-.44.44v.01c0 .24.2.44.44.44h.89c.24 0 .44-.2.44-.44Zm3.54.01v-.01c0-.24-.2-.44-.44-.44h-.89c-.24 0-.44.2-.44.44v.01c0 .24.2.44.44.44h.89c.24 0 .44-.2.44-.44Zm-7.9-7.49-4.7 3.42-.61-.81 4.72-3.43.59.82Zm2.96.93-7.69 5.59.01-1.26 6.48-4.71 1.2.38Z'/%3E%3Cpath d='m6.51 19.55 5.47-1.84v-2.64l-.28.09-.51.18-2.14.72.02-2.26.01-.84-2.51.82-.06 5.77Z' opacity='.4'/%3E%3Cpath d='m17.4 13.78-2.5-.82.03 3.1 2.53 3.49-.06-5.77Z' opacity='.75'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Booster Level 7 */\n  			.profileBadgeGuildBoosterLvl7\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='30' height='38' viewBox='0 0 30 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.23151 3.26034L5.05151 4.94034C5.09641 5.02706 5.11255 5.12582 5.09759 5.22232C5.08263 5.31882 5.03733 5.40806 4.96829 5.47712C4.89923 5.54618 4.80999 5.59146 4.71349 5.60642C4.61699 5.62138 4.51823 5.60524 4.43151 5.56034L2.75151 4.74034C2.68913 4.71022 2.62077 4.69458 2.55151 4.69458C2.48225 4.69458 2.41387 4.71022 2.35151 4.74034L0.671512 5.56034C0.584792 5.60524 0.486033 5.62138 0.389513 5.60642C0.293013 5.59146 0.203773 5.54618 0.134733 5.47712C0.065673 5.40806 0.0203929 5.31882 0.00543288 5.22232C-0.00952712 5.12582 0.00659252 5.02706 0.0515125 4.94034L0.871513 3.26034C0.901613 3.19796 0.917253 3.1296 0.917253 3.06034C0.917253 2.99108 0.901613 2.92272 0.871513 2.86034L0.0515125 1.18034C0.0198125 1.09528 0.0139927 1.00276 0.0347927 0.914399C0.0555727 0.826059 0.102033 0.745818 0.168313 0.683818C0.234593 0.621818 0.317733 0.580798 0.407273 0.565938C0.496813 0.551098 0.588752 0.563058 0.671512 0.600338L2.35151 1.42034C2.41387 1.45046 2.48225 1.4661 2.55151 1.4661C2.62077 1.4661 2.68913 1.45046 2.75151 1.42034L4.43151 0.600338C4.51823 0.555438 4.61699 0.539298 4.71349 0.554258C4.80999 0.569218 4.89923 0.614498 4.96829 0.683558C5.03733 0.752618 5.08263 0.841838 5.09759 0.938358C5.11255 1.03486 5.09641 1.13362 5.05151 1.22034L4.23151 2.90034C4.20729 2.95726 4.19483 3.01848 4.19483 3.08034C4.19483 3.1422 4.20729 3.20342 4.23151 3.26034Z' fill='%23FFD836'/%3E%3Cpath d='M15.5117 0L4.5918 10.92V26.28L15.5117 37.2L26.4317 26.28V10.92L15.5117 0ZM20.9717 24L15.5117 29.48L10.0518 24.02V13.18L15.5117 7.72L20.9717 13.18V24Z' fill='%23FF73FA'/%3E%3Cpath d='M15.5117 0V7.72L20.9717 13.18L26.4317 10.92L15.5117 0Z' fill='%23FFC0FF'/%3E%3Cpath d='M10.0518 24.02L4.5918 26.28L15.5117 37.2V29.48L10.0518 24.02Z' fill='%23E655D4'/%3E%3Cpath d='M23.9523 30H23.9723C24.4583 30 24.8523 29.606 24.8523 29.12V27.34C24.8523 26.854 24.4583 26.46 23.9723 26.46H23.9523C23.4663 26.46 23.0723 26.854 23.0723 27.34V29.12C23.0723 29.606 23.4663 30 23.9523 30Z' fill='%23D4E4FF'/%3E%3Cpath d='M23.9523 37.1001H23.9723C24.4583 37.1001 24.8523 36.7061 24.8523 36.2201V34.4401C24.8523 33.9541 24.4583 33.5601 23.9723 33.5601H23.9523C23.4663 33.5601 23.0723 33.9541 23.0723 34.4401V36.2201C23.0723 36.7061 23.4663 37.1001 23.9523 37.1001Z' fill='%23D4E4FF'/%3E%3Cpath d='M22.1923 31.7799V31.7599C22.1923 31.2739 21.7983 30.8799 21.3123 30.8799H19.5323C19.0463 30.8799 18.6523 31.2739 18.6523 31.7599V31.7799C18.6523 32.2659 19.0463 32.6599 19.5323 32.6599H21.3123C21.7983 32.6599 22.1923 32.2659 22.1923 31.7799Z' fill='%23D4E4FF'/%3E%3Cpath d='M29.2724 31.7799V31.7599C29.2724 31.2739 28.8784 30.8799 28.3924 30.8799H26.6124C26.1264 30.8799 25.7324 31.2739 25.7324 31.7599V31.7799C25.7324 32.2659 26.1264 32.6599 26.6124 32.6599H28.3924C28.8784 32.6599 29.2724 32.2659 29.2724 31.7799Z' fill='%23D4E4FF'/%3E%3Cpath d='M10.0518 13.1802V24.0202L15.5117 29.4802L20.9717 24.0202V13.1802L15.5117 7.72021L10.0518 13.1802Z' fill='%23FFDEF9'/%3E%3Cpath d='M20.9522 13.1802V13.2002L10.0923 24.0602L10.0723 24.0402V21.1002L19.4722 11.6802L20.9522 13.1802Z' fill='white'/%3E%3Cpath d='M20.9518 17.2803V20.2803L13.6318 27.6003L12.1318 26.1003L20.9518 17.2803Z' fill='white'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath opacity='0.6' d='M6.3599 4.33012L6.7699 5.17012C6.79235 5.21348 6.80042 5.26286 6.79294 5.31111C6.78546 5.35936 6.76281 5.40398 6.72829 5.43851C6.69376 5.47304 6.64914 5.49568 6.60089 5.50316C6.55264 5.51064 6.50326 5.50257 6.4599 5.48012L5.6199 5.07012C5.58871 5.05506 5.55453 5.04724 5.5199 5.04724C5.48527 5.04724 5.45108 5.05506 5.4199 5.07012L4.5799 5.48012C4.53654 5.50257 4.48716 5.51064 4.4389 5.50316C4.39065 5.49568 4.34603 5.47304 4.31151 5.43851C4.27698 5.40398 4.25434 5.35936 4.24686 5.31111C4.23938 5.26286 4.24744 5.21348 4.2699 5.17012L4.6799 4.33012C4.69495 4.29893 4.70277 4.26475 4.70277 4.23012C4.70277 4.19549 4.69495 4.16131 4.6799 4.13012L4.2699 3.29012C4.25405 3.24759 4.25114 3.20133 4.26154 3.15715C4.27193 3.11298 4.29516 3.07286 4.3283 3.04186C4.36144 3.01086 4.40301 2.99035 4.44778 2.98292C4.49255 2.9755 4.53852 2.98148 4.5799 3.00012L5.4199 3.41012C5.45108 3.42518 5.48527 3.433 5.5199 3.433C5.55453 3.433 5.58871 3.42518 5.6199 3.41012L6.4599 3.00012C6.50326 2.97767 6.55264 2.9696 6.60089 2.97708C6.64914 2.98456 6.69376 3.0072 6.72829 3.04173C6.76281 3.07626 6.78546 3.12087 6.79294 3.16913C6.80042 3.21738 6.79235 3.26676 6.7699 3.31012L6.3599 4.15012C6.34779 4.17858 6.34156 4.20919 6.34156 4.24012C6.34156 4.27105 6.34779 4.30166 6.3599 4.33012Z' fill='white'/%3E%3C/g%3E%3Cpath opacity='0.55' d='M12 2.69995L6.54004 8.15995V15.8499L9.27004 14.7199V9.28995L12 6.55995L14.72 9.28995V14.7199L12 17.4499V21.2999L17.45 15.8499V8.15995L12 2.69995Z' fill='white'/%3E%3Cpath d='M12 2.69995V6.55995L14.73 9.28995L17.46 8.15995L12 2.69995Z' fill='white'/%3E%3Cpath opacity='0.4' d='M9.27004 14.71L6.54004 15.84L12 21.3V17.44L9.27004 14.71Z' fill='white'/%3E%3Cpath d='M16.2199 17.6999H16.2299C16.4729 17.6999 16.6699 17.5029 16.6699 17.2599V16.3699C16.6699 16.1269 16.4729 15.9299 16.2299 15.9299H16.2199C15.9769 15.9299 15.7799 16.1269 15.7799 16.3699V17.2599C15.7799 17.5029 15.9769 17.6999 16.2199 17.6999Z' fill='white'/%3E%3Cpath d='M16.2199 21.25H16.2299C16.4729 21.25 16.6699 21.053 16.6699 20.81V19.92C16.6699 19.677 16.4729 19.48 16.2299 19.48H16.2199C15.9769 19.48 15.7799 19.677 15.7799 19.92V20.81C15.7799 21.053 15.9769 21.25 16.2199 21.25Z' fill='white'/%3E%3Cpath d='M15.3401 18.5899V18.5799C15.3401 18.3369 15.1431 18.1399 14.9001 18.1399H14.0101C13.7671 18.1399 13.5701 18.3369 13.5701 18.5799V18.5899C13.5701 18.8329 13.7671 19.0299 14.0101 19.0299H14.9001C15.1431 19.0299 15.3401 18.8329 15.3401 18.5899Z' fill='white'/%3E%3Cpath d='M18.8799 18.5899V18.5799C18.8799 18.3369 18.6829 18.1399 18.4399 18.1399H17.5499C17.3069 18.1399 17.1099 18.3369 17.1099 18.5799V18.5899C17.1099 18.8329 17.3069 19.0299 17.5499 19.0299H18.4399C18.6829 19.0299 18.8799 18.8329 18.8799 18.5899Z' fill='white'/%3E%3Cpath opacity='0.75' d='M9.28003 9.29006V14.7101L12.01 17.4401L14.73 14.7101V9.29006L12.01 6.56006L9.28003 9.29006Z' fill='white'/%3E%3Cpath d='M14.73 9.29004V9.30004L9.29003 14.7301L9.28003 14.7201V13.2501L13.99 8.54004L14.73 9.29004Z' fill='white'/%3E%3Cpath d='M14.7301 11.3401V12.8401L11.0701 16.5001L10.3201 15.7501L14.7301 11.3401Z' fill='white'/%3E%3C/svg%3E%0A");\n  					}\n  			}\n  			/* Server Booster Level 8 */\n  			.profileBadgeGuildBoosterLvl8\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='33' height='37' viewBox='0 0 33 37' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.23151 2.71151L5.05151 4.39151C5.09641 4.47823 5.11255 4.57699 5.09759 4.67349C5.08263 4.76999 5.03733 4.85923 4.96829 4.92829C4.89923 4.99735 4.80999 5.04263 4.71349 5.05759C4.61699 5.07255 4.51823 5.05641 4.43151 5.01151L2.75151 4.19151C2.68913 4.16139 2.62077 4.14575 2.55151 4.14575C2.48225 4.14575 2.41387 4.16139 2.35151 4.19151L0.671512 5.01151C0.584792 5.05641 0.486033 5.07255 0.389513 5.05759C0.293013 5.04263 0.203773 4.99735 0.134733 4.92829C0.065673 4.85923 0.0203929 4.76999 0.00543288 4.67349C-0.00952712 4.57699 0.00659252 4.47823 0.0515125 4.39151L0.871513 2.71151C0.901613 2.64913 0.917253 2.58077 0.917253 2.51151C0.917253 2.44225 0.901613 2.37389 0.871513 2.31151L0.0515125 0.63151C0.0198125 0.54645 0.0139927 0.45393 0.0347927 0.36557C0.0555727 0.27723 0.102033 0.19699 0.168313 0.13499C0.234593 0.0729901 0.317733 0.0319703 0.407273 0.0171103C0.496813 0.00227026 0.588752 0.0142302 0.671512 0.0515102L2.35151 0.87151C2.41387 0.90163 2.48225 0.91727 2.55151 0.91727C2.62077 0.91727 2.68913 0.90163 2.75151 0.87151L4.43151 0.0515102C4.51823 0.00661025 4.61699 -0.00952987 4.71349 0.00543013C4.80999 0.0203901 4.89923 0.0656703 4.96829 0.13473C5.03733 0.20379 5.08263 0.29301 5.09759 0.38953C5.11255 0.48603 5.09641 0.58479 5.05151 0.67151L4.23151 2.35151C4.20729 2.40843 4.19483 2.46965 4.19483 2.53151C4.19483 2.59337 4.20729 2.65459 4.23151 2.71151Z' fill='%23FFD836'/%3E%3Cpath d='M26.6915 36.851H26.7115C27.1975 36.851 27.5915 36.457 27.5915 35.971V34.191C27.5915 33.705 27.1975 33.311 26.7115 33.311H26.6915C26.2055 33.311 25.8115 33.705 25.8115 34.191V35.971C25.8115 36.457 26.2055 36.851 26.6915 36.851Z' fill='%23D4E4FF'/%3E%3Cpath d='M32.0322 31.5514V31.5314C32.0322 31.0454 31.6382 30.6514 31.1522 30.6514H29.3722C28.8862 30.6514 28.4922 31.0454 28.4922 31.5314V31.5514C28.4922 32.0374 28.8862 32.4314 29.3722 32.4314H31.1522C31.6382 32.4314 32.0322 32.0374 32.0322 31.5514Z' fill='%23D4E4FF'/%3E%3Cpath d='M22.8924 10.9314L5.65234 20.8914V12.3514L15.5324 6.67139L22.8924 10.9314Z' fill='%23FFDEF9'/%3E%3Cpath d='M25.3729 12.3516V15.3915L8.29285 25.2715L5.67285 23.7315L25.3729 12.3516Z' fill='%23FFDEF9'/%3E%3Cpath d='M10.7529 26.6714L25.3729 18.2314V23.7314L15.5329 29.4514L10.7529 26.6714Z' fill='%23FFDEF9'/%3E%3Cpath d='M25.3724 12.3512L22.8924 10.9312L5.65234 20.8912V23.7512L25.3724 12.3512Z' fill='white'/%3E%3Cpath d='M25.371 15.3911V18.2311L10.751 26.6711L8.29102 25.2711L25.371 15.3911Z' fill='white'/%3E%3Cpath d='M15.5117 0.651367L0.431641 9.35137V26.7514L15.5117 35.4714L30.5917 26.7514V9.35137L15.5117 0.651367ZM25.3517 23.7514L15.5117 29.4314L5.65164 23.7514V12.3714L15.5117 6.67137L25.3517 12.3714V23.7514Z' fill='%23FF73FA'/%3E%3Cpath d='M26.6915 29.7714H26.7115C27.1975 29.7714 27.5915 29.3774 27.5915 28.8914V27.1114C27.5915 26.6254 27.1975 26.2314 26.7115 26.2314H26.6915C26.2055 26.2314 25.8115 26.6254 25.8115 27.1114V28.8914C25.8115 29.3774 26.2055 29.7714 26.6915 29.7714Z' fill='%23D4E4FF'/%3E%3Cpath d='M24.9316 31.5514V31.5314C24.9316 31.0454 24.5376 30.6514 24.0516 30.6514H22.2716C21.7856 30.6514 21.3916 31.0454 21.3916 31.5314V31.5514C21.3916 32.0374 21.7856 32.4314 22.2716 32.4314H24.0516C24.5376 32.4314 24.9316 32.0374 24.9316 31.5514Z' fill='%23D4E4FF'/%3E%3Cpath d='M15.5117 0.631348V6.67135L25.3717 12.3513L30.5917 9.35135L15.5117 0.631348Z' fill='%23FFC0FF'/%3E%3Cpath d='M5.65164 23.7515L0.431641 26.7515L15.5117 35.4715V29.4315L5.65164 23.7515Z' fill='%23E655D4'/%3E%3C/svg%3E ");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.55' d='M12 3.30005L4.45996 7.65005V16.3601L7.06996 14.8501V9.16005L12 6.31005L16.92 9.16005V14.8501L12 17.6901V20.6901L19.54 16.3401V7.65005L12 3.30005Z' fill='white'/%3E%3Cg opacity='0.6'%3E%3Cpath opacity='0.6' d='M6.3599 4.33012L6.7699 5.17012C6.79235 5.21348 6.80042 5.26286 6.79294 5.31111C6.78546 5.35936 6.76281 5.40398 6.72829 5.43851C6.69376 5.47304 6.64914 5.49568 6.60089 5.50316C6.55264 5.51064 6.50326 5.50257 6.4599 5.48012L5.6199 5.07012C5.58871 5.05506 5.55453 5.04724 5.5199 5.04724C5.48527 5.04724 5.45108 5.05506 5.4199 5.07012L4.5799 5.48012C4.53654 5.50257 4.48716 5.51064 4.4389 5.50316C4.39065 5.49568 4.34603 5.47304 4.31151 5.43851C4.27698 5.40398 4.25434 5.35936 4.24686 5.31111C4.23938 5.26286 4.24744 5.21348 4.2699 5.17012L4.6799 4.33012C4.69495 4.29893 4.70277 4.26475 4.70277 4.23012C4.70277 4.19549 4.69495 4.16131 4.6799 4.13012L4.2699 3.29012C4.25405 3.24759 4.25114 3.20133 4.26154 3.15715C4.27193 3.11298 4.29516 3.07286 4.3283 3.04186C4.36144 3.01086 4.40301 2.99035 4.44778 2.98292C4.49255 2.9755 4.53852 2.98148 4.5799 3.00012L5.4199 3.41012C5.45108 3.42518 5.48527 3.433 5.5199 3.433C5.55453 3.433 5.58871 3.42518 5.6199 3.41012L6.4599 3.00012C6.50326 2.97767 6.55264 2.9696 6.60089 2.97708C6.64914 2.98456 6.69376 3.0072 6.72829 3.04173C6.76281 3.07626 6.78546 3.12087 6.79294 3.16913C6.80042 3.21738 6.79235 3.26676 6.7699 3.31012L6.3599 4.15012C6.34779 4.17858 6.34156 4.20919 6.34156 4.24012C6.34156 4.27105 6.34779 4.30166 6.3599 4.33012Z' fill='white'/%3E%3C/g%3E%3Cpath d='M17.59 17.8601H17.6C17.843 17.8601 18.04 17.6631 18.04 17.4201V16.5301C18.04 16.2871 17.843 16.0901 17.6 16.0901H17.59C17.347 16.0901 17.15 16.2871 17.15 16.5301V17.4201C17.15 17.6631 17.347 17.8601 17.59 17.8601Z' fill='white'/%3E%3Cpath d='M17.59 21.3999H17.6C17.843 21.3999 18.04 21.2029 18.04 20.9599V20.0699C18.04 19.8269 17.843 19.6299 17.6 19.6299H17.59C17.347 19.6299 17.15 19.8269 17.15 20.0699V20.9599C17.15 21.2029 17.347 21.3999 17.59 21.3999Z' fill='white'/%3E%3Cpath d='M16.7099 18.75V18.74C16.7099 18.497 16.5129 18.3 16.2699 18.3H15.3799C15.1369 18.3 14.9399 18.497 14.9399 18.74V18.75C14.9399 18.993 15.1369 19.1901 15.3799 19.1901H16.2699C16.5129 19.1901 16.7099 18.993 16.7099 18.75Z' fill='white'/%3E%3Cpath d='M20.26 18.75V18.74C20.26 18.497 20.063 18.3 19.82 18.3H18.93C18.687 18.3 18.49 18.497 18.49 18.74V18.75C18.49 18.993 18.687 19.1901 18.93 19.1901H19.82C20.063 19.1901 20.26 18.993 20.26 18.75Z' fill='white'/%3E%3Cpath d='M12 3.29004V6.31004L16.93 9.15004L19.54 7.65004L12 3.29004Z' fill='white'/%3E%3Cpath opacity='0.4' d='M7.06996 14.8501L4.45996 16.3501L12 20.7101V17.6901L7.06996 14.8501Z' fill='white'/%3E%3Cpath opacity='0.75' d='M15.6901 8.43006L7.07007 13.4201V9.15006L12.0001 6.31006L15.6901 8.43006Z' fill='white'/%3E%3Cpath opacity='0.75' d='M16.9301 9.1499V10.6699L8.39008 15.6099L7.08008 14.8399L16.9301 9.1499Z' fill='white'/%3E%3Cpath opacity='0.75' d='M9.62012 16.3101L16.9301 12.0901V14.8401L12.0001 17.7001L9.62012 16.3101Z' fill='white'/%3E%3Cpath d='M16.9301 9.14993L7.08008 14.8399V13.4199L15.6901 8.42993L16.9301 9.14993Z' fill='white'/%3E%3Cpath d='M8.38989 15.6099L9.61989 16.3099L16.9299 12.0899V10.6699L8.38989 15.6099Z' fill='white'/%3E%3C/svg%3E%0A");\n  					}\n  			}\n  			/* Server Booster Level 9 */\n  			.profileBadgeGuildBoosterLvl9\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='37' height='32' viewBox='0 0 37 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.965076 2.71896L0.165076 4.39896C0.117796 4.43966 0.0790159 4.48928 0.0509159 4.54498C0.0228159 4.6007 0.00595574 4.66138 0.00131574 4.7236C-0.00332426 4.78582 0.00433583 4.84834 0.0238558 4.9076C0.0433758 4.96684 0.0743757 5.02168 0.115076 5.06896C0.197296 5.16444 0.314076 5.22334 0.439716 5.23272C0.501936 5.23736 0.564456 5.2297 0.623716 5.21018C0.682976 5.19066 0.737796 5.15966 0.785076 5.11896L2.46508 4.31896C2.52746 4.28884 2.59582 4.2732 2.66508 4.2732C2.73434 4.2732 2.80272 4.28884 2.86508 4.31896L4.54508 5.11896C4.6318 5.16386 4.73056 5.18 4.82706 5.16504C4.92358 5.15008 5.0128 5.10478 5.08186 5.03574C5.15092 4.96668 5.1962 4.87744 5.21116 4.78094C5.22612 4.68444 5.20998 4.58568 5.16508 4.49896L4.36508 2.81896C4.33522 2.76008 4.31964 2.69498 4.31964 2.62896C4.31964 2.56294 4.33522 2.49784 4.36508 2.43896L5.16508 0.758959C5.20998 0.672239 5.22612 0.573478 5.21116 0.476958C5.1962 0.380458 5.15092 0.291218 5.08186 0.222178C5.0128 0.153118 4.92358 0.107838 4.82706 0.092878C4.73056 0.077918 4.6318 0.0940576 4.54508 0.138958L2.78508 0.838958C2.72272 0.869058 2.65434 0.884699 2.58508 0.884699C2.51582 0.884699 2.44746 0.869058 2.38508 0.838958L0.785076 0.0389582C0.699056 0.00109823 0.603516 -0.009482 0.511296 0.008598C0.419096 0.026678 0.334616 0.0725783 0.269276 0.140118C0.203916 0.207638 0.160816 0.293558 0.145776 0.386318C0.130716 0.479078 0.144436 0.574218 0.185076 0.658958L0.985076 2.33896C1.0119 2.3994 1.02406 2.46532 1.02058 2.53134C1.01712 2.59738 0.998096 2.66166 0.965076 2.71896Z' fill='%23FFD836'/%3E%3Cpath d='M30.6052 28.1594L31.2252 29.9194C31.254 30.0138 31.3122 30.0962 31.3914 30.155C31.4706 30.2136 31.5666 30.2452 31.6652 30.2452C31.7638 30.2452 31.8598 30.2136 31.939 30.155C32.0182 30.0962 32.0764 30.0138 32.1052 29.9194L32.7052 28.1594C32.7302 28.0928 32.7702 28.0328 32.8222 27.9842C32.8744 27.9356 32.937 27.8996 33.0052 27.8794L34.7652 27.2594C34.8524 27.2262 34.9274 27.1674 34.9804 27.0906C35.0334 27.0138 35.0618 26.9228 35.0618 26.8294C35.0618 26.7362 35.0334 26.645 34.9804 26.5682C34.9274 26.4914 34.8524 26.4326 34.7652 26.3994L33.0052 25.7794C32.9388 25.7556 32.878 25.7184 32.8264 25.6702C32.7748 25.6222 32.7336 25.564 32.7052 25.4994L32.1052 23.7394C32.0764 23.6452 32.0182 23.5626 31.939 23.504C31.8598 23.4452 31.7638 23.4136 31.6652 23.4136C31.5666 23.4136 31.4706 23.4452 31.3914 23.504C31.3122 23.5626 31.254 23.6452 31.2252 23.7394L30.6052 25.4994C30.5836 25.5648 30.5472 25.624 30.4984 25.6728C30.4498 25.7214 30.3906 25.7578 30.3252 25.7794L28.5652 26.3994C28.478 26.4326 28.403 26.4914 28.35 26.5682C28.297 26.645 28.2686 26.7362 28.2686 26.8294C28.2686 26.9228 28.297 27.0138 28.35 27.0906C28.403 27.1674 28.478 27.2262 28.5652 27.2594L30.3252 27.8794C30.3922 27.8978 30.4532 27.9332 30.5022 27.9824C30.5514 28.0314 30.5868 28.0924 30.6052 28.1594Z' fill='%23FFD836'/%3E%3Cpath d='M30.8852 2.87891H9.94516L4.78516 8.09891H36.1852L30.8852 2.87891Z' fill='%23FF73FA'/%3E%3Cpath d='M4.70508 8.09912L20.4052 31.2591L36.1052 8.09912H4.70508Z' fill='%23FF73FA'/%3E%3Cpath d='M9.94508 2.87891L4.70508 8.09891H15.1852L9.94508 2.87891Z' fill='%23FFC0FF'/%3E%3Cpath d='M20.4055 2.87891L15.1855 8.09891H25.6455L20.4055 2.87891Z' fill='%23E655D4'/%3E%3Cpath d='M30.8845 2.87891L25.6445 8.09891H36.1045L30.8845 2.87891Z' fill='%23FFC0FF'/%3E%3Cpath d='M25.6445 8.09891V2.87891H30.8845L25.6445 8.09891Z' fill='%23FFDEF9'/%3E%3Cpath d='M25.6455 8.09912L20.4055 31.2591L15.1855 8.09912H25.6455Z' fill='%23FFC0FF'/%3E%3Cpath d='M25.6445 8.09912V8.11912L17.1045 16.6391L16.6045 14.4191L22.9045 8.09912H25.6445Z' fill='white'/%3E%3Cpath d='M24.1449 14.7393L23.3449 18.2793L18.5649 23.0593L18.0449 20.8393L24.1449 14.7393Z' fill='white'/%3E%3Cpath d='M6.86484 19.7393H6.84484C6.35882 19.7393 5.96484 20.1333 5.96484 20.6193V22.3993C5.96484 22.8853 6.35882 23.2793 6.84484 23.2793H6.86484C7.35084 23.2793 7.74484 22.8853 7.74484 22.3993V20.6193C7.74484 20.1333 7.35084 19.7393 6.86484 19.7393Z' fill='%23D4E4FF'/%3E%3Cpath d='M6.86484 26.8193H6.84484C6.35882 26.8193 5.96484 27.2133 5.96484 27.6993V29.4793C5.96484 29.9653 6.35882 30.3593 6.84484 30.3593H6.86484C7.35084 30.3593 7.74484 29.9653 7.74484 29.4793V27.6993C7.74484 27.2133 7.35084 26.8193 6.86484 26.8193Z' fill='%23D4E4FF'/%3E%3Cpath d='M12.1855 25.0792V25.0592C12.1855 24.5732 11.7915 24.1792 11.3055 24.1792H9.52551C9.03951 24.1792 8.64551 24.5732 8.64551 25.0592V25.0792C8.64551 25.5652 9.03951 25.9592 9.52551 25.9592H11.3055C11.7915 25.9592 12.1855 25.5652 12.1855 25.0792Z' fill='%23D4E4FF'/%3E%3Cpath d='M5.08492 25.0792V25.0592C5.08492 24.5732 4.69094 24.1792 4.20492 24.1792H2.42492C1.93892 24.1792 1.54492 24.5732 1.54492 25.0592V25.0792C1.54492 25.5652 1.93892 25.9592 2.42492 25.9592H4.20492C4.69094 25.9592 5.08492 25.5652 5.08492 25.0792Z' fill='%23D4E4FF'/%3E%3C/svg%3E%0A"); \n  					&.richBadge {\n  							background-image: url(https://discord.com/assets/cfbc2d8ceacfacf07850f986c8165195.svg);\n  					}\n  			}\n  			/* Completed a Quest */\n  			.profileBadgeQuestCompleted\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='45' height='40' viewBox='0 0 45 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 39.4051C15.733 37.8154 18.8383 36.978 22 36.978C25.1617 36.978 28.267 37.8154 31 39.4051C31.4571 39.6442 31.9889 39.6975 32.4843 39.5538C32.9797 39.41 33.4004 39.0805 33.6586 38.6339C33.9167 38.1872 33.9923 37.6582 33.8696 37.1571C33.7469 36.6561 33.4353 36.2219 33 35.9451C31.8 35.2451 30.52 34.6651 29.2 34.2051C30.28 33.6051 31.3 32.9051 32.24 32.0651C33.1913 32.5792 34.2373 32.894 35.3143 32.9904C36.3913 33.0868 37.4766 32.9628 38.504 32.6259C39.5315 32.2891 40.4796 31.7464 41.2904 31.031C42.1012 30.3157 42.7577 29.4426 43.22 28.4651C43.373 28.142 43.4088 27.7756 43.3212 27.4289C43.2336 27.0823 43.0281 26.7769 42.74 26.5651C41.559 25.696 40.161 25.17 38.7 25.0451C40.3471 24.4595 41.757 23.3505 42.7141 21.8877C43.6712 20.4249 44.1229 18.6889 44 16.9451C43.9764 16.5763 43.8193 16.2286 43.5579 15.9672C43.2965 15.7059 42.9489 15.5487 42.58 15.5251C41.4946 15.456 40.4064 15.6056 39.38 15.9651C40.8614 14.6372 41.7934 12.8038 41.9932 10.8244C42.193 8.84497 41.6462 6.86231 40.46 5.26513C40.2483 4.97699 39.9429 4.7715 39.5962 4.68392C39.2495 4.59633 38.8832 4.63212 38.56 4.78513C37.06 5.50513 35.82 6.68513 35.02 8.12513V8.00513C35.0208 6.80114 34.7498 5.61249 34.2272 4.52781C33.7047 3.44313 32.944 2.49039 32.002 1.74061C31.0599 0.990824 29.9608 0.46334 28.7865 0.197478C27.6123 -0.0683846 26.3931 -0.065769 25.22 0.20513C24.8894 0.279673 24.5926 0.461184 24.3757 0.72153C24.1587 0.981875 24.0337 1.30651 24.02 1.64513C23.9258 3.72486 24.6461 5.75938 26.0278 7.31661C27.4095 8.87385 29.3438 9.83112 31.42 9.98513C33.2 12.5851 34.02 15.8851 34.02 19.0051C34.02 26.3251 28.52 32.0051 22.02 32.0051C15.52 32.0051 10.02 26.3251 10.02 19.0051C10.02 15.8851 10.84 12.5851 12.62 9.98513C14.6926 9.82618 16.6219 8.86677 17.9994 7.31007C19.3769 5.75338 20.0944 3.72164 20 1.64513C19.9863 1.30651 19.8613 0.981875 19.6443 0.72153C19.4274 0.461184 19.1306 0.279673 18.8 0.20513C17.6173 -0.0641746 16.389 -0.061708 15.2074 0.212344C14.0258 0.486396 12.9217 1.02489 11.9783 1.78731C11.0349 2.54973 10.2768 3.5162 9.76089 4.61398C9.24501 5.71177 8.98486 6.91227 9 8.12513C8.19016 6.68024 6.95382 5.52073 5.46001 4.80513C5.13683 4.65212 4.77048 4.61633 4.4238 4.70392C4.07713 4.7915 3.77173 4.99699 3.56001 5.28513C2.37178 6.88302 1.82561 8.86822 2.02924 10.849C2.23288 12.8299 3.17154 14.6624 4.66001 15.9851C3.63435 15.6224 2.54549 15.4727 1.46001 15.5451C1.08759 15.564 0.735093 15.7191 0.469579 15.9809C0.204066 16.2427 0.0440613 16.593 0.0200055 16.9651L5.51819e-06 17.5251C-0.00193186 19.1751 0.506319 20.7852 1.45513 22.135C2.40394 23.4848 3.74689 24.5083 5.30001 25.0651C3.80001 25.1851 2.40001 25.7251 1.26001 26.5851C0.660005 27.0251 0.460005 27.8251 0.780005 28.4851C1.24669 29.4587 1.9056 30.3277 2.71704 31.0398C3.52849 31.752 4.47568 32.2925 5.50157 32.6288C6.52746 32.9652 7.61082 33.0904 8.68639 32.997C9.76196 32.9035 10.8075 32.5934 11.76 32.0851C12.7 32.9251 13.72 33.6451 14.82 34.2251C13.48 34.6851 12.22 35.2651 11 35.9651C10.761 36.0902 10.5497 36.2622 10.379 36.471C10.2082 36.6798 10.0814 36.921 10.0063 37.1801C9.9311 37.4391 9.90912 37.7107 9.94165 37.9785C9.97417 38.2462 10.0605 38.5047 10.1955 38.7382C10.3305 38.9717 10.5113 39.1755 10.7271 39.3374C10.9429 39.4992 11.1892 39.6157 11.4512 39.6799C11.7132 39.744 11.9855 39.7546 12.2517 39.7108C12.5178 39.667 12.7724 39.5698 13 39.4251V39.4051Z' fill='url(%23paint0_linear_726_10946)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_726_10946' x1='22.0099' y1='0' x2='22.0099' y2='39.7373' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CEF4FE'/%3E%3Cstop offset='1' stop-color='%237C7AFE'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E ");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='1.7 3.775 43.91 39.9'%3E%3Cpath d='M14.6,43.3c2.7-1.6,5.8-2.4,9-2.4s6.3,0.8,9,2.4c0.5,0.2,1,0.3,1.5,0.1c0.5-0.1,0.9-0.5,1.2-0.9 c0.3-0.4,0.3-1,0.2-1.5c-0.1-0.5-0.4-0.9-0.9-1.2c-1.2-0.7-2.5-1.3-3.8-1.7c1.1-0.6,2.1-1.3,3-2.1c1,0.5,2,0.8,3.1,0.9 c1.1,0.1,2.2,0,3.2-0.4c1-0.3,2-0.9,2.8-1.6c0.8-0.7,1.5-1.6,1.9-2.6c0.2-0.3,0.2-0.7,0.1-1c-0.1-0.3-0.3-0.7-0.6-0.9 c-1.2-0.9-2.6-1.4-4-1.5c1.6-0.6,3.1-1.7,4-3.2c1-1.5,1.4-3.2,1.3-4.9c0-0.4-0.2-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4 c-1.1-0.1-2.2,0.1-3.2,0.4c1.5-1.3,2.4-3.2,2.6-5.1c0.2-2-0.3-4-1.5-5.6c-0.2-0.3-0.5-0.5-0.9-0.6c-0.3-0.1-0.7-0.1-1,0.1 c-1.5,0.7-2.7,1.9-3.5,3.3v-0.1c0-1.2-0.3-2.4-0.8-3.5c-0.5-1.1-1.3-2-2.2-2.8c-0.9-0.7-2-1.3-3.2-1.5c-1.2-0.3-2.4-0.3-3.6,0 c-0.3,0.1-0.6,0.3-0.8,0.5c-0.2,0.3-0.3,0.6-0.4,0.9c-0.1,2.1,0.6,4.1,2,5.7c1.4,1.6,3.3,2.5,5.4,2.7c1.8,2.6,2.6,5.9,2.6,9 c0,7.3-5.5,13-12,13s-12-5.7-12-13c0-3.1,0.8-6.4,2.6-9c2.1-0.2,4-1.1,5.4-2.7c1.4-1.6,2.1-3.6,2-5.7c0-0.3-0.1-0.7-0.4-0.9 c-0.2-0.3-0.5-0.4-0.8-0.5c-1.2-0.3-2.4-0.3-3.6,0s-2.3,0.8-3.2,1.6c-0.9,0.8-1.7,1.7-2.2,2.8c-0.5,1.1-0.8,2.3-0.8,3.5 c-0.8-1.4-2-2.6-3.5-3.3c-0.3-0.2-0.7-0.2-1-0.1C5.7,8.7,5.4,8.9,5.2,9.2c-1.2,1.6-1.7,3.6-1.5,5.6c0.2,2,1.1,3.8,2.6,5.1 c-1-0.4-2.1-0.5-3.2-0.4c-0.4,0-0.7,0.2-1,0.4c-0.3,0.3-0.4,0.6-0.4,1l0,0.6c0,1.6,0.5,3.3,1.5,4.6s2.3,2.4,3.8,2.9 c-1.5,0.1-2.9,0.7-4,1.5c-0.6,0.4-0.8,1.2-0.5,1.9c0.5,1,1.1,1.8,1.9,2.6c0.8,0.7,1.8,1.3,2.8,1.6c1,0.3,2.1,0.5,3.2,0.4 c1.1-0.1,2.1-0.4,3.1-0.9c0.9,0.8,2,1.6,3.1,2.1c-1.3,0.5-2.6,1-3.8,1.7c-0.2,0.1-0.5,0.3-0.6,0.5c-0.2,0.2-0.3,0.5-0.4,0.7 c-0.1,0.3-0.1,0.5-0.1,0.8c0,0.3,0.1,0.5,0.3,0.8c0.1,0.2,0.3,0.4,0.5,0.6c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0.1,0.5,0.1,0.8,0 C14.2,43.5,14.4,43.4,14.6,43.3L14.6,43.3z' fill='%23fff'/%3E%3C/svg%3E%0A");\n  					}\n  			}\n  			/* Orbs */\n  			.profileBadgeOrbProfileBadge\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_726_10952)'%3E%3Cpath d='M23.064 0.1845C23.6565 -0.0615 24.3225 -0.0615 24.915 0.1845L40.167 6.5025C40.7595 6.7485 41.2305 7.2195 41.4765 7.812L47.7945 23.064C48.0405 23.6565 48.0405 24.3225 47.7945 24.915L41.4765 40.167C41.2305 40.7595 40.7595 41.2305 40.167 41.4765L24.915 47.7945C24.3225 48.0405 23.6565 48.0405 23.064 47.7945L7.812 41.4765C7.2195 41.2305 6.7485 40.7595 6.5025 40.167L0.1845 24.915C-0.0615 24.3225 -0.0615 23.6565 0.1845 23.064L6.5025 7.812C6.7485 7.2195 7.2195 6.7485 7.812 6.5025L23.064 0.1845Z' fill='white'/%3E%3Cmask id='mask0_726_10952' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='48' height='48'%3E%3Cpath d='M23.064 0.1845C23.6565 -0.0615 24.3225 -0.0615 24.915 0.1845L40.167 6.5025C40.7595 6.7485 41.2305 7.2195 41.4765 7.812L47.7945 23.064C48.0405 23.6565 48.0405 24.3225 47.7945 24.915L41.4765 40.167C41.2305 40.7595 40.7595 41.2305 40.167 41.4765L24.915 47.7945C24.3225 48.0405 23.6565 48.0405 23.064 47.7945L7.812 41.4765C7.2195 41.2305 6.7485 40.7595 6.5025 40.167L0.1845 24.915C-0.0615 24.3225 -0.0615 23.6565 0.1845 23.064L6.5025 7.812C6.7485 7.2195 7.2195 6.7485 7.812 6.5025L23.064 0.1845Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_726_10952)'%3E%3Cpath d='M23.9892 -6.65991H-6.81934V54.7396H23.9892V-6.65991Z' fill='%23EF51E8'/%3E%3Cpath d='M6.33105 41.6475L41.6471 6.33154L50.2466 10.0065L54.1136 40.6725L31.7141 55.473L6.98055 52.806L6.33105 41.6475Z' fill='%233C40F3'/%3E%3Cpath d='M6.33105 6.33155L41.6471 41.6476L52.2476 16.0726L35.7131 -6.05995L9.44655 -8.12695L6.33105 6.33155Z' fill='%23CF92FF'/%3E%3Cpath d='M54.7978 -6.65991H23.9893V54.7396H54.7978V-6.65991Z' fill='white'/%3E%3Cpath d='M41.6474 6.3315L24.4814 23.4975L24.6509 43.7475L45.0719 46.089L53.0729 28.4235L45.4724 5.823L41.6474 6.3315Z' fill='%237AE9D6'/%3E%3Cpath d='M23.9893 50.073V33.171L32.2468 31.74L41.6473 41.4735L42.2473 44.5395L23.9893 50.073Z' fill='%237B49FF'/%3E%3C/g%3E%3Cpath d='M24.7889 6.66293C24.3464 6.22043 23.6294 6.22043 23.1869 6.66293L6.66293 23.1884C6.22043 23.6309 6.22043 24.3479 6.66293 24.7904L23.1869 41.3159C23.6294 41.7584 24.3464 41.7584 24.7889 41.3159L41.3144 24.7904C41.7569 24.3479 41.7569 23.6309 41.3144 23.1884L24.7889 6.66293Z' fill='%23141414'/%3E%3Cpath d='M24.7889 6.66293C24.3464 6.22043 23.6294 6.22043 23.1869 6.66293L6.66293 23.1884C6.22043 23.6309 6.22043 24.3479 6.66293 24.7904L23.1869 41.3159C23.6294 41.7584 24.3464 41.7584 24.7889 41.3159L41.3144 24.7904C41.7569 24.3479 41.7569 23.6309 41.3144 23.1884L24.7889 6.66293Z' fill='%23000777'/%3E%3Cmask id='mask1_726_10952' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='6' y='6' width='36' height='36'%3E%3Cpath d='M24.7889 6.66293C24.3464 6.22043 23.6294 6.22043 23.1869 6.66293L6.66293 23.1884C6.22043 23.6309 6.22043 24.3479 6.66293 24.7904L23.1869 41.3159C23.6294 41.7584 24.3464 41.7584 24.7889 41.3159L41.3144 24.7904C41.7569 24.3479 41.7569 23.6309 41.3144 23.1884L24.7889 6.66293Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask1_726_10952)'%3E%3Cpath d='M23.9899 23.9893H4.98047V47.7388H23.9899V23.9893Z' fill='%2300043B'/%3E%3Cpath d='M42.8572 0.239746H23.8477V23.9892H42.8572V0.239746Z' fill='%232F379E'/%3E%3C/g%3E%3Cpath d='M24.8329 15.2731C25.2634 17.1976 26.2294 18.9616 27.6199 20.3596C29.0104 21.7576 30.7684 22.7341 32.6914 23.1751C32.8789 23.2186 33.0469 23.3251 33.1669 23.4751C33.2869 23.6266 33.3529 23.8141 33.3529 24.0061C33.3529 24.1981 33.2869 24.3871 33.1669 24.5371C33.0469 24.6886 32.8789 24.7936 32.6914 24.8371C30.7714 25.2676 29.0134 26.2336 27.6214 27.6256C26.2294 29.0176 25.2634 30.7756 24.8329 32.6956C24.7894 32.8831 24.6829 33.0511 24.5329 33.1711C24.3814 33.2911 24.1939 33.3571 24.0019 33.3571C23.8099 33.3571 23.6209 33.2911 23.4709 33.1711C23.3194 33.0511 23.2144 32.8831 23.1709 32.6956C22.7314 30.7756 21.7594 29.0191 20.3659 27.6301C18.9724 26.2396 17.2129 25.2721 15.2914 24.8386C15.1039 24.7951 14.9359 24.6886 14.8159 24.5386C14.6959 24.3871 14.6299 24.1996 14.6299 24.0076C14.6299 23.8156 14.6959 23.6266 14.8159 23.4766C14.9359 23.3251 15.1039 23.2201 15.2914 23.1766C17.2129 22.7371 18.9709 21.7636 20.3644 20.3701C21.7579 18.9766 22.7314 17.2186 23.1709 15.2971C23.2114 15.1081 23.3149 14.9386 23.4649 14.8171C23.6149 14.6956 23.8009 14.6266 23.9944 14.6251C24.1879 14.6221 24.3754 14.6851 24.5284 14.8036C24.6814 14.9221 24.7894 15.0886 24.8344 15.2761L24.8329 15.2731Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_726_10952'%3E%3Crect width='48' height='48' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-161.925 -161.924 323.8 323.8'%3E%3Cpath d='M158.69700622558594,-6.170000076293945 C158.69700622558594,-6.170000076293945 116.5790023803711,-107.85199737548828 116.5790023803711,-107.85199737548828 C114.94200134277344,-111.8030014038086 111.8030014038086,-114.94200134277344 107.85199737548828,-116.5790023803711 C107.85199737548828,-116.5790023803711 6.171000003814697,-158.69700622558594 6.171000003814697,-158.69700622558594 C2.2200000286102295,-160.33299255371094 -2.2200000286102295,-160.33299255371094 -6.171000003814697,-158.69700622558594 C-6.171000003814697,-158.69700622558594 -107.85199737548828,-116.5790023803711 -107.85199737548828,-116.5790023803711 C-111.80400085449219,-114.94200134277344 -114.94300079345703,-111.8030014038086 -116.5790023803711,-107.85199737548828 C-116.5790023803711,-107.85199737548828 -158.69700622558594,-6.170000076293945 -158.69700622558594,-6.170000076293945 C-160.33399963378906,-2.2190001010894775 -160.33399963378906,2.2200000286102295 -158.69700622558594,6.171000003814697 C-158.69700622558594,6.171000003814697 -116.5790023803711,107.85299682617188 -116.5790023803711,107.85299682617188 C-114.94300079345703,111.80400085449219 -111.80400085449219,114.94200134277344 -107.85199737548828,116.5790023803711 C-107.85199737548828,116.5790023803711 -6.171000003814697,158.697998046875 -6.171000003814697,158.697998046875 C-2.2200000286102295,160.33399963378906 2.2200000286102295,160.33399963378906 6.171000003814697,158.697998046875 C6.171000003814697,158.697998046875 107.85199737548828,116.5790023803711 107.85199737548828,116.5790023803711 C111.8030014038086,114.94200134277344 114.94200134277344,111.80400085449219 116.5790023803711,107.85299682617188 C116.5790023803711,107.85299682617188 158.69700622558594,6.171000003814697 158.69700622558594,6.171000003814697 C160.33399963378906,2.2200000286102295 160.33399963378906,-2.2190001010894775 158.69700622558594,-6.170000076293945z M115.50900268554688,5.099999904632568 C115.50900268554688,5.099999904632568 5.334000110626221,115.26799774169922 5.334000110626221,115.26799774169922 C2.384999990463257,118.21800231933594 -2.3980000019073486,118.21800231933594 -5.3470001220703125,115.26799774169922 C-5.3470001220703125,115.26799774169922 -115.51100158691406,5.099999904632568 -115.51100158691406,5.099999904632568 C-118.45999908447266,2.1500000953674316 -118.45999908447266,-2.631999969482422 -115.51100158691406,-5.581999778747559 C-115.51100158691406,-5.581999778747559 -5.3470001220703125,-115.7509994506836 -5.3470001220703125,-115.7509994506836 C-2.3980000019073486,-118.69999694824219 2.384999990463257,-118.69999694824219 5.334000110626221,-115.7509994506836 C5.334000110626221,-115.7509994506836 115.50900268554688,-5.581999778747559 115.50900268554688,-5.581999778747559 C118.45899963378906,-2.631999969482422 118.45899963378906,2.1500000953674316 115.50900268554688,5.099999904632568z M5.618000030517578,-58.10300064086914 C8.482999801635742,-45.27199935913086 14.923999786376953,-33.513999938964844 24.19499969482422,-24.191999435424805 C33.465999603271484,-14.869000434875488 45.1879997253418,-8.36299991607666 58.00299835205078,-5.427000045776367 C59.25699996948242,-5.13700008392334 60.375,-4.431000232696533 61.17599868774414,-3.4240000247955322 C61.97700119018555,-2.4170000553131104 62.41299819946289,-1.1679999828338623 62.41299819946289,0.11800000071525574 C62.41299819946289,1.4049999713897705 61.97700119018555,2.6540000438690186 61.17599868774414,3.6610000133514404 C60.375,4.668000221252441 59.25699996948242,5.374000072479248 58.00299835205078,5.663000106811523 C45.202999114990234,8.529000282287598 33.48099899291992,14.975000381469727 24.20599937438965,24.250999450683594 C14.930000305175781,33.5260009765625 8.484000205993652,45.24800109863281 5.618000030517578,58.04800033569336 C5.328999996185303,59.301998138427734 4.623000144958496,60.42100143432617 3.615999937057495,61.22200012207031 C2.6089999675750732,62.02299880981445 1.3600000143051147,62.45899963378906 0.0729999989271164,62.45899963378906 C-1.2139999866485596,62.45899963378906 -2.4619998931884766,62.02299880981445 -3.4690001010894775,61.22200012207031 C-4.47599983215332,60.42100143432617 -5.182000160217285,59.301998138427734 -5.4720001220703125,58.04800033569336 C-8.397000312805176,45.250999450683594 -14.880999565124512,33.542999267578125 -24.176000595092773,24.27400016784668 C-33.47100067138672,15.005000114440918 -45.198001861572266,8.553000450134277 -58.00299835205078,5.663000106811523 C-59.25600051879883,5.374000072479248 -60.375,4.668000221252441 -61.17599868774414,3.6610000133514404 C-61.97700119018555,2.6540000438690186 -62.41299819946289,1.4049999713897705 -62.41299819946289,0.11800000071525574 C-62.41299819946289,-1.1679999828338623 -61.97700119018555,-2.4170000553131104 -61.17599868774414,-3.4240000247955322 C-60.375,-4.431000232696533 -59.25600051879883,-5.13700008392334 -58.00299835205078,-5.427000045776367 C-45.194000244140625,-8.359000205993652 -33.47200012207031,-14.843999862670898 -24.18000030517578,-24.135000228881836 C-14.888999938964844,-33.42599868774414 -8.404999732971191,-45.14899826049805 -5.4720001220703125,-57.957000732421875 C-5.198999881744385,-59.21500015258789 -4.507999897003174,-60.34400177001953 -3.51200008392334,-61.15800094604492 C-2.515000104904175,-61.972999572753906 -1.2719999551773071,-62.42499923706055 0.014999999664723873,-62.44200134277344 C1.3020000457763672,-62.45899963378906 2.556999921798706,-62.03900146484375 3.5739998817443848,-61.250999450683594 C4.5920000076293945,-60.4630012512207 5.313000202178955,-59.354000091552734 5.618000030517578,-58.10300064086914z' stroke='' stroke-width='2' fill='%23fff'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Slash Commands */\n  			.profileBadgeBotCommands\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='40' height='33' viewBox='0 0 40 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.2354 24.4478L21.9015 8.10889H27.7647L18.0985 24.4478H12.2354Z' fill='%232EA967'/%3E%3Cpath d='M36.8379 11.0859V6.22363C36.8379 2.26855 34.6729 0 30.8984 0H27.7822V3.56055L29.7012 3.55762C31.4092 3.55762 32.3887 4.69434 32.3887 6.6748V11.4688C32.3887 13.1289 32.75 15.1533 35.5674 16.0889L36.1387 16.2783L35.5674 16.4678C32.75 17.4033 32.3887 19.4277 32.3887 21.0879V25.8809C32.3887 27.8623 31.4092 28.999 29.7012 28.999L27.7822 28.9961V32.5566H30.8984C34.6729 32.5566 36.8379 30.2881 36.8379 26.333V21.4697C36.8379 18.9531 37.5244 18.2168 40 18.1807V14.376C37.5244 14.3398 36.8379 13.6035 36.8379 11.0859Z' fill='%232EA967'/%3E%3Cpath d='M7.6123 6.6748C7.6123 4.72266 8.61719 3.55762 10.2988 3.55762L12.2178 3.56055V0H9.10254C5.32812 0 3.16309 2.26855 3.16309 6.22363V11.0859C3.16309 13.6035 2.47656 14.3398 0 14.376V18.1807C2.47656 18.2168 3.16309 18.9531 3.16309 21.4697V26.333C3.16309 30.2881 5.32812 32.5566 9.10254 32.5566H12.2178V28.9961L10.2988 28.999C8.61719 28.999 7.6123 27.833 7.6123 25.8809V21.0879C7.6123 19.4277 7.25098 17.4033 4.43262 16.4678L3.86133 16.2783L4.43262 16.0889C7.25098 15.1533 7.6123 13.1289 7.6123 11.4688V6.6748Z' fill='%232EA967'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 5.72168 44 36.56'%3E%3Cpath d='M16.2354 32.1695L25.9015 15.8306H31.7647L22.0985 32.1695H16.2354Z%0AM40.8379 18.8076V13.9453C40.8379 9.99023 38.6729 7.72168 34.8984 7.72168H31.7822V11.2822L33.7012 11.2793C35.4092 11.2793 36.3887 12.416 36.3887 14.3965V19.1904C36.3887 20.8506 36.75 22.875 39.5674 23.8105L40.1387 24L39.5674 24.1895C36.75 25.125 36.3887 27.1494 36.3887 28.8096V33.6025C36.3887 35.584 35.4092 36.7207 33.7012 36.7207L31.7822 36.7178V40.2783H34.8984C38.6729 40.2783 40.8379 38.0098 40.8379 34.0547V29.1914C40.8379 26.6748 41.5244 25.9385 44 25.9023V22.0977C41.5244 22.0615 40.8379 21.3252 40.8379 18.8076Z M11.6123 14.3965C11.6123 12.4443 12.6172 11.2793 14.2988 11.2793L16.2178 11.2822V7.72168H13.1025C9.32812 7.72168 7.16309 9.99023 7.16309 13.9453V18.8076C7.16309 21.3252 6.47656 22.0615 4 22.0977V25.9023C6.47656 25.9385 7.16309 26.6748 7.16309 29.1914V34.0547C7.16309 38.0098 9.32812 40.2783 13.1025 40.2783H16.2178V36.7178L14.2988 36.7207C12.6172 36.7207 11.6123 35.5547 11.6123 33.6025V28.8096C11.6123 27.1494 11.251 25.125 8.43262 24.1895L7.86133 24L8.43262 23.8105C11.251 22.875 11.6123 20.8506 11.6123 19.1904V14.3965Z' stroke='' stroke-width='2' fill='%23fff'/%3E%3C/svg%3E");\n  					}\n  			}\n  			/* Server Subscriptions */\n  			.profileBadgeApplicationGuildSubscription\n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='44' height='32' viewBox='0 0 44 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44 12V0H0V12C2.2 12 4 13.8 4 16C4 18.2 2.2 20 0 20V32H44V20C41.8 20 40 18.2 40 16C40 13.8 41.8 12 44 12ZM24 24V28H20V24H16V20H24C24.54 20 25 19.66 25 19.24C25 17.16 15 19.24 15 12.74C15 10.14 17.24 8 20 8V4H24V8H28V12H20C19.46 12 19 12.34 19 12.76C19 14.84 29 12.76 29 19.26C29 21.86 26.76 24 24 24Z' fill='%232EA967'/%3E%3C/svg%3E%0A");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 32'%3E%3Cpath d='M44 12V0H0V12C2.2 12 4 13.8 4 16C4 18.2 2.2 20 0 20V32H44V20C41.8 20 40 18.2 40 16C40 13.8 41.8 12 44 12ZM24 24V28H20V24H16V20H24C24.54 20 25 19.66 25 19.24C25 17.16 15 19.24 15 12.74C15 10.14 17.24 8 20 8V4H24V8H28V12H20C19.46 12 19 12.34 19 12.76C19 14.84 29 12.76 29 19.26C29 21.86 26.76 24 24 24Z' fill='%23fff'/%3E%3C/svg%3E%0A");\n  					}\n  			}\n  			/* Uses Automod */\n  			.profileBadgeAutomod \n  			{\n  					background-image: url("data:image/svg+xml,%3Csvg width='36' height='27' viewBox='0 0 36 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30.424 3.9653C29.4581 1.75389 28.2635 0 24.0186 0H3.7852C2.43801 0 0.433959 0.869037 0.255167 3.9653C-0.208823 12.0002 -0.0279195 16.7267 0.69925 20.3544C1.45446 24.1221 5.13671 26.3539 8.97935 26.3539H31.691C33.3128 26.3539 34.9232 25.5763 35.4761 24.0518C37.0159 19.8078 35.1113 15.0384 30.424 3.9653Z' fill='url(%23paint0_linear_0_1)'/%3E%3Cpath d='M13.7489 20.0354H32.4097C33.6469 20.0354 34.0938 19.4169 33.5095 17.4236C32.0438 12.5372 30.2646 7.75033 28.1826 3.09295C26.7393 3.53205e-07 25.7084 0 22.8216 0H3.55566C7.8422 0 7.99096 -1.41282e-06 9.9686 17.4236C10.5185 20.0354 11.3089 20.0354 13.7489 20.0354Z' fill='url(%23paint1_linear_0_1)'/%3E%3Cpath d='M26.2005 9.20295C27.0275 8.92303 27.308 7.54477 26.8273 6.1245C26.3466 4.70426 25.2866 3.77981 24.4596 4.05973C23.6325 4.33965 23.3518 5.71792 23.8325 7.13818C24.3133 8.55843 25.3734 9.48287 26.2005 9.20295Z' fill='%2357F287'/%3E%3Cpath d='M13.9217 9.24957C14.7616 8.94885 15.0275 7.54624 14.5156 6.11671C14.0038 4.68719 12.908 3.7721 12.0682 4.07281C11.2283 4.37351 10.9624 5.77615 11.4743 7.20567C11.9861 8.63518 13.0819 9.55027 13.9217 9.24957Z' fill='%2357F287'/%3E%3Cpath d='M25.2624 12.166C25.3654 14.8808 24.0252 16.8398 21.7569 16.8398C19.4888 16.8398 16.9457 14.8808 15.4336 12.166H25.2624Z' fill='%2357F287'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_0_1' x1='10.5376' y1='33.9499' x2='23.8252' y2='3.45691' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.180208' stop-color='%233442D9'/%3E%3Cstop offset='0.747916' stop-color='%23737FFF'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_0_1' x1='16.0858' y1='1.97605' x2='20.2854' y2='19.5337' gradientUnits='userSpaceOnUse'%3E%3Cstop/%3E%3Cstop offset='0.11' stop-color='%23050409'/%3E%3Cstop offset='0.7' stop-color='%231B1934'/%3E%3Cstop offset='1' stop-color='%23242145'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E ");\n  					&.richBadge {\n  							background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_4157_20124)'%3E%3Cmask id='mask0_4157_20124' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'%3E%3Cpath d='M24 0H0V24H24V0Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_4157_20124)'%3E%3Cpath d='M9.1656 16.5725H21.6062C22.431 16.5725 22.7289 16.1601 22.3394 14.8313C21.3622 11.5737 20.1761 8.38246 18.7881 5.27754C17.8259 3.21558 17.1386 3.21558 15.2141 3.21558H2.37012C5.22781 3.21558 5.32698 3.21558 6.64541 14.8313C7.01198 16.5725 7.53893 16.5725 9.1656 16.5725Z' fill='white' fill-opacity='0.15'/%3E%3Cpath d='M16.0124 3.21533C18.8423 3.21533 19.6387 4.38459 20.2827 5.85887C23.4075 13.241 24.6773 16.4205 23.6507 19.2498C23.2821 20.2662 22.2085 20.7846 21.1273 20.7846H5.98623C3.42447 20.7846 0.969637 19.2967 0.466167 16.7849C-0.0186131 14.3665 -0.139215 11.2154 0.170111 5.85887C0.287807 3.82065 1.59193 3.23014 2.48938 3.21561C5.23085 3.21789 5.34557 3.37938 6.64541 14.8313C7.01198 16.5725 7.53893 16.5725 9.1656 16.5725H21.6062C22.431 16.5725 22.7289 16.1601 22.3394 14.8313C21.3622 11.5737 20.1761 8.38246 18.7881 5.27754C17.8259 3.21558 17.1386 3.21558 15.2141 3.21558H2.49145C2.50218 3.21541 2.51286 3.21533 2.52347 3.21533H16.0124Z' fill='white' fill-opacity='0.5'/%3E%3Cpath d='M17.4666 9.35104C18.018 9.16443 18.205 8.24558 17.8845 7.29874C17.564 6.35191 16.8574 5.73561 16.3061 5.92223C15.7547 6.10884 15.5676 7.02768 15.888 7.97453C16.2085 8.92136 16.9153 9.53765 17.4666 9.35104Z' fill='white'/%3E%3Cpath d='M9.28083 9.38212C9.84072 9.18164 10.018 8.24656 9.67676 7.29355C9.33554 6.34053 8.60503 5.73047 8.04513 5.93095C7.48523 6.13141 7.30796 7.0665 7.6492 8.01952C7.99043 8.97252 8.72093 9.58258 9.28083 9.38212Z' fill='white'/%3E%3Cpath d='M16.8416 11.3262C16.9102 13.136 16.0168 14.442 14.5046 14.442C12.9926 14.442 11.2972 13.136 10.2891 11.3262H16.8416Z' fill='white'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_4157_20124'%3E%3Crect width='24' height='24' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");\n  					}\n  			}\n  	}\n\n  	.settingsContainer > div {\n  			padding-bottom: 10px;\n  	}\n  	`
);
let profileCSS = webpackify(CSS);
function addProfileCSS() {
	betterdiscord.DOM.addStyle("profileCSS", profileCSS);
	betterdiscord.Utils.forceLoad(betterdiscord.Webpack.getBySource("USER_PROFILE_MODAL_KEY:$", { raw: true }).id).then((r) => {
		Object.assign(styles, Object.getOwnPropertyDescriptors(betterdiscord.Webpack.getByKeys("background", "content", "safetyTable")));
		profileCSS = webpackify(CSS);
		betterdiscord.DOM.addStyle("profileCSS", profileCSS);
	});
}
function webpackify(css) {
	for (const key in styles) {
		let regex = new RegExp(`\\.${key}([\\s,.):>])`, "g");
		css = styles[key]?.value ? css.replace(regex, `.${styles[key].value}$1`) : css.replace(regex, `.${styles[key]}$1`);
	}
	return css;
}

// index.js
function Starter({ props, res }) {
	const options = {
		walkable: [
			"props",
			"children"
		],
		ignore: []
	};
	const data = betterdiscord.Utils.findInTree(props, (tree) => Object.hasOwn(tree, "initialSection"), options);
	const user = data.user;
	const currentUser = data.currentUser;
	const displayProfile = data.displayProfile;
	const [tab, setTab] = react.useState(locale.Sections[data.initialSection] || tabs.ABOUT);
	const ref = react.useRef(null);
	if (betterdiscord.Data.load("disableProfileThemes")) {
		res.props.className = betterdiscord.Utils.className(res.props.className, "disable-profile-themes");
	}
	react.useEffect(() => {
		(async () => {
			if (!UserProfileStore.getMutualFriends(user.id)) {
				await ProfileFetch(user.id, { withMutualFriends: true });
			}
		})();
	}, [user.id]);
	return [
		react.createElement(
			"div",
			{ className: "inner", "data-user-id": user.id },
			[
				react.createElement(headerBuilder, { props, user, currentUser, displayProfile, tab, setTab, ref }),
				react.createElement(bodyBuilder, { data, user, displayProfile, tab, ref })
			]
		)
	];
}
class NewOldProfiles {
	constructor(meta) {
	}
	start() {
		addProfileCSS();
		betterdiscord.Patcher.after(entireProfileModal.A, "render", (that, [props], res) => {
			if (!props.themeType?.includes("MODAL")) return;
			if (!betterdiscord.Utils.findInTree(props, (x) => x?.displayProfile, { walkable: ["props", "children"] })) return;
			if (!betterdiscord.Utils.findInTree(props, (tree) => Object.hasOwn(tree, "initialSection"), { walkable: ["props", "children"] })) {
				return res.props.children;
			}
			res.props.children = react.createElement(Starter, { props, res });
		});
	}
	stop() {
		betterdiscord.Patcher.unpatchAll("NewOldProfiles");
		betterdiscord.DOM.removeStyle("profileCSS");
	}
	getSettingsPanel() {
		return [
			react.createElement(
				"div",
				{ className: "settingsContainer" },
				react.createElement(() => Object.keys(settings.main).map(
					(key) => {
						const { name, note, initial, changed } = settings.main[key];
						const [state, setState] = react.useState(betterdiscord.Data.load(key));
						return react.createElement(FormSwitch, {
							label: name,
							description: note,
							checked: state ?? initial,
							onChange: (v) => {
								betterdiscord.Data.save(key, v);
								setState(v);
								if (changed)
									changed(v);
							}
						});
					}
				))
			),
			react.createElement(
				betterdiscord.Components.SettingGroup,
				{
					name: "Server Profile Settings",
					collapsible: true,
					shown: false,
					children: react.createElement(
						"div",
						{ className: "settingsContainer" },
						react.createElement(() => Object.keys(settings.serverCategory).map((key) => {
							const { name, note, initial, changed } = settings.serverCategory[key];
							const [state, setState] = react.useState(betterdiscord.Data.load(key));
							return react.createElement(FormSwitch, {
								label: name,
								description: note,
								checked: state ?? initial,
								onChange: (v) => {
									betterdiscord.Data.save(key, v);
									setState(v);
									if (changed)
										changed(v);
								}
							});
						}))
					)
				}
			)
		];
	}
}

module.exports = NewOldProfiles;

/*@end@*/