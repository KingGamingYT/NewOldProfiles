/**
 * @name NewOldProfiles
 * @author KingGamingYT
 * @description A full, largely accurate restoration of Discord's profile layout used from 2018 to 2021. Features modern additions such as banners, theme colors, and guild tags.
 * @version 1.0.0-dev
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

// modules.js
const [
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
	DisplayNameStyleConfigurator
] = betterdiscord.Webpack.getBulk(
	{ filter: betterdiscord.Webpack.Filters.bySource("forceShowPremium", "pendingThemeColors") },
	{ filter: (x) => x.openUserProfileModal },
	{ filter: (x) => x.Modal },
	{ filter: (x) => x.t && x.t.formatToMarkdownString },
	{ filter: (x) => x.button && x.hasText && !x.hasTrailing },
	{ filter: betterdiscord.Webpack.Filters.byKeys("gameState", "clickableImage") },
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
	{ filter: betterdiscord.Webpack.Filters.byStrings("channel", "isGuildStageVoice", "isDM", "Pl.CONNECT") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("guildId", "name", "setPopoutRef", "onClose", "fetchGuildProfile") },
	{ filter: betterdiscord.Webpack.Filters.byStrings("guildMember", "roles", "canManageRoles") },
	{ filter: betterdiscord.Webpack.Filters.bySource(".botTag", "invertColor") },
	{ filter: betterdiscord.Webpack.Filters.byPrototypeKeys("renderTooltip"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("Unsupported animation config:"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings('"data-toggleable-component":"switch"', 'layout:"horizontal"'), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("user", "data-scroller"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings("connectionsRoleId", "USER_PROFILE_FETCH_START"), searchExports: true },
	{ filter: betterdiscord.Webpack.Filters.byStrings(".metadata)?void", ".EPISODE?"), searchExports: true },
	{ filter: (x) => x.openGameProfileModal },
	{ filter: (x) => betterdiscord.Webpack.Filters.byStrings("data-username-with-effects")(x?.type) }
);
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
const StreamerModeStore = betterdiscord.Webpack.getStore("StreamerModeStore");
const { useStateFromStores } = betterdiscord.Webpack.getMangled((m) => m.Store, {
	useStateFromStores: betterdiscord.Webpack.Filters.byStrings("useStateFromStores")
}, { raw: true });
const NavigationUtils = betterdiscord.Webpack.getMangled("transitionTo - Transitioning to", {
	transitionTo: betterdiscord.Webpack.Filters.byStrings('"transitionTo - Transitioning to "'),
	replace: betterdiscord.Webpack.Filters.byStrings('"Replacing route with "'),
	goBack: betterdiscord.Webpack.Filters.byStrings(".goBack()"),
	goForward: betterdiscord.Webpack.Filters.byStrings(".goForward()"),
	transitionToGuild: betterdiscord.Webpack.Filters.byStrings('"transitionToGuild - Transitioning to "')
});
const ModalSystem = betterdiscord.Webpack.getMangled(".modalKey?", {
	openModalLazy: betterdiscord.Webpack.Filters.byStrings(".modalKey?"),
	openModal: betterdiscord.Webpack.Filters.byStrings(",instant:"),
	closeModal: betterdiscord.Webpack.Filters.byStrings(".onCloseCallback()"),
	closeAllModals: betterdiscord.Webpack.Filters.byStrings(".getState();for")
});
const TagRenderer = react.lazy(async () => ({ default: (await betterdiscord.Webpack.waitForModule(betterdiscord.Webpack.Filters.bySource("tag", "isCurrentUser", "widgetType", "TAG_REMOVED"))).Z }));

// settings.js
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
	}
};

// globals.js
const tabs = {
	ABOUT: 0,
	SERVERS: 1,
	FRIENDS: 2,
	DATA: 3,
	BOARD: 4
};

// presence.jsx
const headers = {
	0: intl.intl.formatToPlainString(intl.t["iKo3yJ"]),
	1: intl.intl.formatToPlainString(intl.t["4CQq9Q"], { name: "" }),
	2: intl.intl.formatToPlainString(intl.t["NF5xop"], { name: "" }),
	3: intl.intl.formatToPlainString(intl.t["pW3Ip3"], { name: "" }),
	5: intl.intl.formatToPlainString(intl.t["QQ2wVE"], { name: "" })
};
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
function CustomCards({ activities }) {
	const _activities = activities.filter((activity) => activity && activity.type === 4);
	const _emoji = _activities.filter((activity) => activity.emoji);
	return _activities.map((activity) => BdApi.React.createElement("div", { className: "activity" }, BdApi.React.createElement(
		"div",
		{
			className: "activityHeader"
		},
		activity.name
	), BdApi.React.createElement(
		"div",
		{
			className: "customStatusContent"
		},
		_emoji.map((emoji) => BdApi.React.createElement(EmojiRenderer, { emoji: activity.emoji })),
		BdApi.React.createElement("div", { className: "customStatusText" }, activity.state)
	)));
}
function ActivityCard({ user, activity, check }) {
	const [shouldLargeFallback, setShouldLargeFallback] = react.useState(false);
	const [shouldSmallFallback, setShouldSmallFallback] = react.useState(false);
	const filterCheck = activityCheck({ activities: [activity] });
	const gameId = activity?.application_id;
	react.useEffect(() => {
		(async () => {
			if (!DetectableGameSupplementalStore.getGame(gameId)) {
				await FetchGames.getDetectableGamesSupplemental([gameId]);
			}
		})();
	}, [gameId]);
	const game = DetectableGameSupplementalStore.getGame(gameId);
	return BdApi.React.createElement("div", { className: "activityProfile activity", id: activity.created_at + "-" + activity.type, key: activity.created_at + "-" + activity.type }, BdApi.React.createElement("h3", { className: "headerTextNormal headerText", style: { color: "var(--white)", marginBottom: "8px" } }, (check?.listening || check?.watching) && [2, 3].includes(activity?.type) ? headers[activity.type] + activity?.name : filterCheck?.xbox || filterCheck?.playstation ? intl.intl.formatToPlainString(intl.t["A17aM8"], { platform: activity?.platform }) : headers[activity.type]), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement(
		"div",
		{
			className: "assets",
			style: { position: "relative" },
			onMouseOver: (e) => game && e.currentTarget.classList.add(`${ActivityCardClasses.clickableImage}`),
			onMouseLeave: (e) => game && e.currentTarget.classList.remove(`${ActivityCardClasses.clickableImage}`),
			onClick: (e) => game && GameProfile.openGameProfileModal({
				applicationId: gameId,
				gameProfileModalChecks: {
					shouldOpenGameProfile: true,
					applicationId: gameId
				},
				source: "tony",
				sourceUserId: user.id,
				appContext: {}
			})
		},
		activity?.assets && activity?.assets.large_image && BdApi.React.createElement(TooltipBuilder, { note: activity.assets.large_text || activity?.details }, shouldLargeFallback ? BdApi.React.createElement(FallbackAsset, { className: "assetsLargeImage" }) : BdApi.React.createElement(
			"img",
			{
				className: "assetsLargeImage",
				"aria-label": activity?.assets?.large_text,
				alt: activity?.assets?.large_text,
				src: activity?.assets?.large_image?.includes("external") ? "https://media.discordapp.net/external" + activity.assets.large_image.substring(activity.assets.large_image.indexOf("/")) : "https://cdn.discordapp.com/app-assets/" + activity.application_id + "/" + activity?.assets.large_image + ".png",
				onError: () => setShouldLargeFallback(true)
			}
		)),
		activity?.platform?.includes("xbox") && BdApi.React.createElement(
			"img",
			{
				className: "assetsLargeImageXbox assetsLargeImage",
				style: { width: "60px", height: "60px" },
				src: "https://discord.com/assets/d8e257d7526932dcf7f88e8816a49b30.png"
			}
		),
		activity?.platform?.includes("ps5") && BdApi.React.createElement(
			"img",
			{
				className: "assetsLargeImagePlaystation assetsLargeImage",
				style: { width: "60px", height: "60px" },
				src: "https://media.discordapp.net/external" + activity.assets.small_image.substring(activity.assets.small_image.indexOf("/"))
			}
		),
		activity?.application_id && (!activity?.assets || !activity?.assets.large_image) && !activity?.platform?.includes("xbox") && shouldLargeFallback ? BdApi.React.createElement(FallbackAsset, { className: "gameIcon", style: { width: "40px", height: "40px" } }) : activity?.application_id && (!activity?.assets || !activity?.assets.large_image) && !activity?.platform?.includes("xbox") && BdApi.React.createElement(
			"img",
			{
				className: "gameIcon",
				style: { width: "40px", height: "40px" },
				src: "https://cdn.discordapp.com/app-icons/" + activity.application_id + "/" + ApplicationStore.getApplication(activity?.application_id)?.icon + ".png",
				onError: () => setShouldLargeFallback(true)
			}
		),
		!(user.bot || activity?.assets || activity?.application_id || ApplicationStore.getApplication(activity?.application_id)?.icon) && BdApi.React.createElement(FallbackAsset, { style: { width: "40px", height: "40px" } }),
		activity?.assets && activity?.assets?.large_image && activity?.assets?.small_image && BdApi.React.createElement(TooltipBuilder, { note: activity.assets.small_text || activity?.details }, shouldSmallFallback ? BdApi.React.createElement(FallbackAsset, { className: "assetsSmallImage" }) : BdApi.React.createElement(
			"img",
			{
				className: "assetsSmallImage",
				"aria-label": activity?.assets?.small_text,
				alt: activity?.assets?.small_text,
				src: activity?.assets?.small_image?.includes("external") ? "https://media.discordapp.net/external" + activity.assets.small_image.substring(activity.assets.small_image.indexOf("/")) : "https://cdn.discordapp.com/app-assets/" + activity.application_id + "/" + activity?.assets.small_image + ".png",
				onError: () => setShouldSmallFallback(true)
			}
		))
	), BdApi.React.createElement("div", { className: "contentImagesProfile content", style: { display: "grid", flex: "1", marginBottom: "3px" } }, BdApi.React.createElement("div", { className: "nameNormal textRow ellipsis", style: { fontWeight: "600" } }, (check?.listening || check?.watching) && [2, 3].includes(activity?.type) ? activity.details : activity.name), !(filterCheck?.listening || filterCheck?.watching) && BdApi.React.createElement("div", { className: "details textRow ellipsis" }, activity.details), BdApi.React.createElement("div", { className: "state textRow ellipsis" }, activity?.state && activity?.party && activity?.party?.size ? activity.state + " (" + activity.party.size[0] + " of " + activity.party.size[1] + ")" : activity?.party && activity?.party?.size ? "Party:  (" + activity.party.size[0] + " of " + activity.party.size[1] + ")" : activity.state), activity?.timestamps?.end ? BdApi.React.createElement("div", { className: "mediaProgressBarContainer" }, BdApi.React.createElement(MediaProgressBar, { start: activity?.timestamps?.start || activity?.created_at, end: activity?.timestamps?.end })) : BdApi.React.createElement(ActivityTimer, { activity })), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(ActivityButtons, { user, activity }))));
}
function ActivityCards({ user, activities, voice, stream, check }) {
	const _activities = activities.filter((activity) => activity && [0, 2, 3, 5].includes(activity?.type) && activity?.type !== 4 && activity.name && !activity.name.includes("Spotify"));
	const filterCheck = activityCheck({ activities: _activities });
	return BdApi.React.createElement("div", { className: "activityProfileContainer activityProfileContainerNormal" }, !stream ? BdApi.React.createElement(VoiceCards, { voice, stream }) : BdApi.React.createElement(StreamCards, { user, voice }), _activities.map((activity) => BdApi.React.createElement(ActivityCard, { user, activity, check: filterCheck })));
}
function SpotifyCards({ user, activities }) {
	const _activities = activities.filter((activity) => activity && activity.name && activity.name.includes("Spotify"));
	return BdApi.React.createElement("div", { className: "activityProfileContainer activityProfileContainerSpotify" }, _activities.map((activity) => BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement("h3", { className: "headerTextNormal headerText", style: { color: "var(--white)", marginBottom: "8px" } }, headers[activity.type] + activity?.name), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement("div", { className: "assets", style: { position: "relative" } }, activity?.assets && activity?.assets.large_image ? BdApi.React.createElement(TooltipBuilder, { note: activity.assets.large_text || activity?.details }, BdApi.React.createElement(
		"img",
		{
			className: "assetsLargeImage",
			"aria-label": activity?.assets?.large_text,
			alt: activity?.assets?.large_text,
			src: "https://i.scdn.co/image/" + activity.assets.large_image.substring(activity.assets.large_image.indexOf(":") + 1),
			onClick: () => OpenSpotifyAlbumFromStatus(activity, user.id)
		}
	)) : BdApi.React.createElement("svg", { style: { width: "40px", height: "40px" } }, BdApi.React.createElement(
		"path",
		{
			style: { transform: "scale(1.65)" },
			fill: "white",
			d: "M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		}
	))), BdApi.React.createElement("div", { className: "contentImagesProfile content" }, BdApi.React.createElement("div", { className: "nameNormal textRow ellipsis", style: { fontWeight: "600" } }, activity.details), BdApi.React.createElement("div", { className: "details textRow ellipsis" }, "by " + activity.state), activity.assets?.large_text && BdApi.React.createElement("div", { className: "state textRow ellipsis" }, "on " + activity.assets?.large_text), activity?.timestamps?.end ? BdApi.React.createElement("div", { className: "mediaProgressBarContainer" }, BdApi.React.createElement(MediaProgressBar, { start: activity?.timestamps?.start, end: activity?.timestamps?.end })) : BdApi.React.createElement(ActivityTimer, { activity })), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(SpotifyButtons, { user, activity }))))));
}
function TwitchCards({ user, activities }) {
	const _activities = activities.filter((activity) => activity && activity.name && activity.type === 1);
	const __activities = [_activities[0]];
	return BdApi.React.createElement("div", { className: "activityProfileContainer activityProfileContainerTwitch" }, __activities.map((activity) => BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement("h3", { className: "headerTextNormal headerText", style: { color: "var(--white)", marginBottom: "8px" } }, intl.intl.formatToPlainString(intl.t["Dzgz4u"], { platform: activity?.name || intl.intl.formatToPlainString(intl.t["5AyH/p"]) })), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement("div", { className: "assets", style: { position: "relative" } }, activity?.assets && activity?.assets.large_image ? BdApi.React.createElement("div", null, BdApi.React.createElement(
		"img",
		{
			className: "assetsLargeImageTwitch assetsLargeImage",
			"aria-label": activity?.assets?.large_text,
			alt: activity?.assets?.large_text,
			src: activity.name.includes("YouTube") ? "https://i.ytimg.com/vi/" + activity.assets.large_image.substring(activity.assets.large_image.indexOf(":") + 1) + "/hqdefault_live.jpg" : "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + activity.assets.large_image.substring(activity.assets.large_image.indexOf(":") + 1) + "-162x90.jpg",
			onError: (e) => e.currentTarget.src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-162x90.jpg"
		}
	)) : BdApi.React.createElement("svg", { style: { width: "40px", height: "40px" } }, BdApi.React.createElement(
		"path",
		{
			style: { transform: "scale(1.65)" },
			fill: "white",
			d: "M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		}
	))), BdApi.React.createElement("div", { className: "contentImagesProfile content" }, BdApi.React.createElement("div", { className: "nameNormal textRow ellipsis", style: { fontWeight: "600" } }, activity.details), activity.state && BdApi.React.createElement("div", { className: "state textRow ellipsis" }, intl.intl.formatToPlainString(intl.t["BMTj28"]) + " " + activity.state)), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(ActivityButtons, { user, activity }))))));
}
function VoiceCards({ voice, stream }) {
	const channel = useStateFromStores([ChannelStore], () => ChannelStore.getChannel(voice));
	if (stream || !channel) return;
	return BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement("div", { className: "activityProfileContainerVoice" }, BdApi.React.createElement("h3", { className: "headerTextNormal headerText", style: { color: "var(--white)", marginBottom: "8px" } }, intl.intl.formatToPlainString(intl.t["grGyaf"])), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, BdApi.React.createElement(VoiceBox, { users: userVoice({ voice }), channel, themeType: "MODAL" }), BdApi.React.createElement("div", { className: "contentImagesProfile content" }, BdApi.React.createElement("h3", { className: "textRow", style: { display: "flex", alignItems: "center" } }, VoiceIcon({ channel }), BdApi.React.createElement("h3", { className: "nameWrap nameNormal textRow", style: { fontWeight: "600" } }, channel.name || RelationshipStore.getNickname(channel.getRecipientId()))), GuildStore.getGuild(channel.guild_id)?.name && BdApi.React.createElement("div", { className: "state textRow ellipsis" }, intl.intl.formatToPlainString(intl.t["Xe4de2"], { channelName: GuildStore.getGuild(channel.guild_id)?.name }))), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(CallButtons, { channel })))));
}
function StreamCards({ user, voice }) {
	const streams = useStateFromStores([StreamStore], () => StreamStore.getAllApplicationStreamsForChannel(voice));
	const _streams = streams.filter((streams2) => streams2 && streams2.ownerId == user.id);
	const channel = useStateFromStores([ChannelStore], () => ChannelStore.getChannel(voice));
	return _streams.map((stream) => BdApi.React.createElement("div", { className: "activityProfile activity" }, BdApi.React.createElement("div", { className: "activityProfileContainerStream" }, BdApi.React.createElement("h3", { className: "headerTextNormal headerText", style: { color: "var(--white)", marginBottom: "8px" } }, intl.intl.formatToPlainString(intl.t["sddlGK"], { server: GuildStore.getGuild(channel.guild_id)?.name || channel.name || intl.intl.formatToPlainString(intl.t["jN2DfZ"]) })), BdApi.React.createElement("div", { className: "bodyNormal", style: { display: "flex", alignItems: "center", width: "auto" } }, ApplicationStreamPreviewStore.getPreviewURLForStreamKey(stream?.streamType + ":" + stream?.guildId + ":" + stream?.channelId + ":" + stream?.ownerId) ? BdApi.React.createElement(
		"img",
		{
			className: "streamPreviewImage",
			src: ApplicationStreamPreviewStore.getPreviewURLForStreamKey(stream?.streamType + ":" + stream?.guildId + ":" + stream?.channelId + ":" + stream?.ownerId)
		}
	) : BdApi.React.createElement(
		"img",
		{
			className: "streamPreviewPlaceholder",
			src: "https://discord.com/assets/6b1a461f35c05c7a.svg"
		}
	), BdApi.React.createElement("div", { className: "contentImagesProfile content" }, BdApi.React.createElement("h3", { className: "textRow", style: { display: "flex", alignItems: "center" } }, VoiceIcon({ channel }), BdApi.React.createElement("h3", { className: "nameWrap nameNormal textRow", style: { fontWeight: "600" } }, channel.name || RelationshipStore.getNickname(channel.getRecipientId()))), BdApi.React.createElement(
		VoiceList,
		{
			className: "userList",
			users: userVoice({ voice }),
			maxUsers: userVoice({ voice }).length,
			guildId: stream.guildId,
			channelId: stream.channelId
		}
	)), BdApi.React.createElement("div", { className: "buttonsWrapper actionsProfile" }, BdApi.React.createElement(CallButtons, { channel }))))));
}

// builders.jsx
const TooltipBuilder = ({ note, position, children }) => {
	return BdApi.React.createElement(Tooltip, { text: note, position: position || "top" }, (props) => {
		children.props = {
			...props,
			...children.props
		};
		return children;
	});
};
let ButtonFetch;
let MarkdownFormat;
let BadgeFetch;
let NoteRenderer;
let ConnectionRenderer;
let BotDataRenderer;
function ButtonComponent({ user, currentUser, relationshipType }) {
	ButtonFetch ??= betterdiscord.Webpack.getByStrings("gameFriends", "PENDING_OUTGOING", "hasIncomingPendingGameFriends", "onClose");
	return BdApi.React.createElement(ButtonFetch, { user, currentUser, relationshipType });
}
function MarkdownComponent({ userBio }) {
	MarkdownFormat ??= betterdiscord.Webpack.getByStrings("userBio", "markup");
	return BdApi.React.createElement(MarkdownFormat, { className: "userBio", userBio });
}
function BadgeComponent({ badges, style }) {
	BadgeFetch ??= betterdiscord.Webpack.getByStrings("pendingBadges", "pendingLegacyUsernameDisabled");
	return BdApi.React.createElement("div", { className: "profileBadges", style }, BdApi.React.createElement(BadgeFetch, { pendingBadges: badges }));
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
function BioBuilder({ displayProfile }) {
	if (displayProfile?._guildMemberProfile?.bio && betterdiscord.Data.load("serverBio")) {
		return [
			BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["61W33d"])),
			BdApi.React.createElement(MarkdownComponent, { userBio: displayProfile.bio })
		];
	} else if (displayProfile._userProfile.bio) {
		return [
			BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["61W33d"])),
			BdApi.React.createElement(MarkdownComponent, { userBio: displayProfile._userProfile.bio })
		];
	}
	return;
}
function RoleBuilder({ user, data }) {
	if (!data?.guildId || !betterdiscord.Data.load("showRoles")) {
		return;
	}
	const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
	if (serverMember?.roles?.length === 0) {
		return;
	}
	return [
		serverMember?.roles?.length !== 1 ? BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["2SZsWX"])) : BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["XPGZXP"])),
		BdApi.React.createElement(RoleRenderer, { user, currentUser: data.currentUser, guild: GuildStore.getGuild(data?.guildId) })
	];
}
function MemberDateBuilder({ data, user }) {
	const server = GuildStore.getGuild(data?.guildId);
	const serverDate = new Date(GuildMemberStore.getMember(data?.guildId, user.id)?.joinedAt);
	return [
		BdApi.React.createElement("div", { className: "memberSince", style: { color: "var(--text-default)" } }, user.createdAt.toString().substring(3, 7) + " " + user.createdAt.getDate() + ", " + user.createdAt.toString().substring(11, 15)),
		data?.guildId && [
			BdApi.React.createElement("div", { className: "divider" }),
			BdApi.React.createElement(TooltipBuilder, { note: server.name }, BdApi.React.createElement("div", { className: "guildIcon" }, BdApi.React.createElement("img", { src: IconUtils.getGuildIconURL(server) + "size=16" }))),
			BdApi.React.createElement("div", { className: "memberSinceServer", style: { color: "var(--text-default)" } }, serverDate.toString().substring(3, 7) + " " + serverDate.getDate() + ", " + serverDate.toString().substring(11, 15))
		]
	];
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
function FallbackCover(game) {
	return BdApi.React.createElement("div", { className: "gameCover" }, BdApi.React.createElement("div", { className: "fallback gameCover" }, BdApi.React.createElement("div", { className: "coverFallbackText" }, game?.name || "Unknown Game")));
}
function FavoriteWidgetBuilder({ widget, game }) {
	const [loading, setLoading] = react.useState(() => true);
	const imageURL = useStateFromStores([DetectableGameSupplementalStore], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
	const image = react.useMemo(() => new Image(), []);
	const ref = react.useRef(null);
	react.useLayoutEffect(() => {
		FetchGames.getDetectableGamesSupplemental([game?.id]);
	}, [game?.id]);
	react.useLayoutEffect(() => {
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
	return BdApi.React.createElement("div", { className: "widgetCard", ref }, BdApi.React.createElement(TooltipBuilder, { note: game?.name }, loading ? BdApi.React.createElement(FallbackCover, { game }) : BdApi.React.createElement(
		"div",
		{
			className: "gameCover hoverActiveEffect",
			onClick: () => GameProfile.openGameProfileModal({
				applicationId: game?.id,
				gameProfileModalChecks: {
					shouldOpenGameProfile: true,
					applicationId: game?.id
				},
				source: "tony",
				sourceUserId: UserStore.getCurrentUser().id,
				appContext: {}
			})
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
	)), BdApi.React.createElement("div", { className: "widgetDetails" }, BdApi.React.createElement("h3", { className: "widgetTitle" }, game?.name || "Unknown Game"), widget.games[0].comment && BdApi.React.createElement("div", { role: "group" }, BdApi.React.createElement(
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
				fill: "var(--icon-tertiary)",
				d: "M2.35 19.44A4.75 4.75 0 0 0 6.07 21c1.43 0 2.58-.43 3.44-1.3.9-.9 1.35-2.06 1.35-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0C2.89 6.78 1 10.64 1 15.02c0 1.9.45 3.38 1.35 4.42ZM14.16 19.44A4.75 4.75 0 0 0 17.88 21c1.43 0 2.58-.43 3.45-1.3.9-.9 1.34-2.06 1.34-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0c-3.77 3.36-5.66 7.22-5.66 11.6 0 1.9.45 3.38 1.35 4.42Z"
			}
		)
	), BdApi.React.createElement("div", { className: "widgetTitle widgetSubtitle", style: { color: "var(--text-tertiary)", fontWeight: 400 } }, widget.games[0].comment))));
}
function ShelfWidgetBuilder({ game }) {
	const [loading, setLoading] = react.useState(() => true);
	const imageURL = useStateFromStores([DetectableGameSupplementalStore], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
	const image = react.useMemo(() => new Image(), []);
	react.useRef(null);
	react.useLayoutEffect(() => {
		FetchGames.getDetectableGamesSupplemental([game?.id]);
	}, [game?.id]);
	react.useLayoutEffect(() => {
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
	return BdApi.React.createElement("div", { style: { position: "relative" } }, BdApi.React.createElement(TooltipBuilder, { note: game?.name }, loading ? BdApi.React.createElement(FallbackCover, { game }) : BdApi.React.createElement(
		"div",
		{
			className: "gameCover hoverActiveEffect",
			onClick: () => GameProfile.openGameProfileModal({
				applicationId: game?.id,
				gameProfileModalChecks: {
					shouldOpenGameProfile: true,
					applicationId: game?.id
				},
				source: "tony",
				sourceUserId: UserStore.getCurrentUser().id,
				appContext: {}
			})
		},
		BdApi.React.createElement(
			"img",
			{
				alt: game?.name,
				className: "gameCover hoverActiveEffect",
				style: { objectFit: "cover" },
				src: `${image.src}`
			}
		)
	)));
}
function CurrentWidgetBuilder({ widget, game, index }) {
	const [loading, setLoading] = react.useState(() => true);
	const imageURL = useStateFromStores([DetectableGameSupplementalStore], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
	const image = react.useMemo(() => new Image(), []);
	const ref = react.useRef(null);
	react.useLayoutEffect(() => {
		FetchGames.getDetectableGamesSupplemental([game?.id]);
	}, [game?.id]);
	react.useLayoutEffect(() => {
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
	return BdApi.React.createElement("div", { className: "widgetCard", ref }, BdApi.React.createElement(TooltipBuilder, { note: game?.name }, loading ? BdApi.React.createElement(FallbackCover, { game }) : BdApi.React.createElement(
		"div",
		{
			className: "gameCover hoverActiveEffect",
			onClick: () => GameProfile.openGameProfileModal({
				applicationId: game?.id,
				gameProfileModalChecks: {
					shouldOpenGameProfile: true,
					applicationId: game?.id
				},
				source: "tony",
				sourceUserId: UserStore.getCurrentUser().id,
				appContext: {}
			})
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
	)), BdApi.React.createElement("div", { className: "widgetDetails" }, BdApi.React.createElement("h3", { className: "widgetTitle" }, game?.name || "Unknown Game"), widget.games[index].tags && BdApi.React.createElement(react.Suspense, null, BdApi.React.createElement(TagRenderer, { tags: widget.games[index].tags, widgetType: widget.type, className: "tagListContainer" }))));
}
function WidgetBuilder({ widget }) {
	const gameIds = widget.games.map((game) => game.applicationId);
	let header;
	if (widget.type.includes("favorite_games")) header = "sUQar8";
	else if (widget.type.includes("played_games")) header = "scOKET";
	else if (widget.type.includes("want_to_play_games")) header = "bWSQwW";
	else if (widget.type.includes("current_games")) header = "SqNnus";
	react.useEffect(() => {
		(async () => {
			for (let id of gameIds) {
				if (!ApplicationStore.getApplication(id)) {
					await FetchApplications.fetchApplications([id]);
				}
			}
		})();
	}, [gameIds]);
	const games = useStateFromStores([ApplicationStore], () => gameIds.map((id) => ApplicationStore.getApplication(id)));
	return BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t[header])), widget.type.includes("favorite_games") && BdApi.React.createElement(FavoriteWidgetBuilder, { widget, game: games[0] }), (widget.type.includes("played_games") || widget.type.includes("want_to_play_games")) && BdApi.React.createElement("div", { className: "widgetCoverList" }, widget.games.map((game, index) => BdApi.React.createElement(ShelfWidgetBuilder, { game: games[index] }))), widget.type.includes("current_games") && BdApi.React.createElement("div", { className: "cardList" }, widget.games.map((game, index) => BdApi.React.createElement(CurrentWidgetBuilder, { widget, game: games[index], index }))));
}
function ConnectionCards({ user, connections }) {
	if (!connections.length == 0) {
		return BdApi.React.createElement("div", { className: "connectedAccounts" }, connections.map((connection) => BdApi.React.createElement(ConnectionComponent, { connectedAccount: connection, userId: user.id })));
	}
	return;
}
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
function userVoice({ voice }) {
	let participants = [];
	const channelParticipants = Object.keys(VoiceStateStore.getVoiceStatesForChannel(voice));
	for (let i = 0; i < channelParticipants.length; i++) {
		participants.push(UserStore.getUser(channelParticipants[i]));
	}
	return participants;
}
function TabBarBuilder({ user, displayProfile, currentUser, tab, setTab, ref }) {
	if (user.id === currentUser.id) return;
	return BdApi.React.createElement(
		"div",
		{
			className: "tabBarContainer",
			style: {
				borderTop: "1px solid hsla(0, 0%, 100%, .1",
				paddingLeft: "20px"
			}
		},
		BdApi.React.createElement(
			"div",
			{
				className: "tabBar",
				style: {
					display: "flex",
					alignItems: "stretch",
					height: "55px",
					flexDirection: "row"
				}
			},
			BdApi.React.createElement(
				"div",
				{
					className: "tabBarItem",
					tabIndex: 0,
					"aria-selected": tab === tabs.ABOUT,
					"aria-controls": "about-tab",
					onClick: () => {
						setTab(tabs.ABOUT);
						ref.current?.scrollTo(0, 0);
					}
				},
				user.bot ? intl.intl.formatToPlainString(intl.t["AOdOYr"]) + " " + intl.intl.formatToPlainString(intl.t["HY+vdA"]) : intl.intl.formatToPlainString(intl.t["E466pL"]).substring(0, 1).toUpperCase() + intl.intl.formatToPlainString(intl.t["E466pL"]).substring(1) + " " + intl.intl.formatToPlainString(intl.t["HY+vdA"])
			),
			betterdiscord.Data.load("boardTab") && displayProfile.widgets?.length > 0 && BdApi.React.createElement(
				"div",
				{
					className: "tabBarItem",
					tabIndex: 1,
					"aria-selected": tab === tabs.BOARD,
					"aria-controls": "board-tab",
					onClick: () => {
						setTab(tabs.BOARD);
						ref.current?.scrollTo(0, 0);
					}
				},
				intl.intl.formatToPlainString(intl.t["laViwx"])
			),
			BdApi.React.createElement(
				"div",
				{
					className: "tabBarItem",
					tabIndex: displayProfile.widgets?.length ? 2 : 1,
					"aria-selected": tab === tabs.SERVERS,
					"aria-controls": "servers-tab",
					onClick: () => {
						setTab(tabs.SERVERS);
						ref.current?.scrollTo(0, 0);
					}
				},
				intl.intl.formatToPlainString(intl.t["sySsXR"])
			),
			user.bot ? BdApi.React.createElement(
				"div",
				{
					className: "tabBarItem",
					tabIndex: 2,
					"aria-selected": tab === tabs.DATA,
					"aria-controls": "data-access-tab",
					onClick: () => {
						setTab(tabs.DATA);
						ref.current?.scrollTo(0, 0);
					}
				},
				intl.intl.formatToPlainString(intl.t["QzDgMq"])
			) : BdApi.React.createElement(
				"div",
				{
					className: "tabBarItem",
					tabIndex: 2,
					"aria-selected": tab === tabs.FRIENDS,
					"aria-controls": "friends-tab",
					onClick: () => {
						setTab(tabs.FRIENDS);
						ref.current?.scrollTo(0, 0);
					}
				},
				intl.intl.formatToPlainString(intl.t["afBKs5"])
			)
		)
	);
}
function HeaderInnerBuilder({ user, currentUser, displayProfile, tagName, displayName }) {
	return BdApi.React.createElement("header", { className: "header" }, BdApi.React.createElement(AvatarFetch, { className: "avatar", user }), BdApi.React.createElement("div", { className: "headerInfo" }, BdApi.React.createElement("div", { className: "nameSection" }, AccessibilityStore.displayNameStylesEnabled && user?.displayNameStyles ? BdApi.React.createElement(
		DisplayNameStyleConfigurator.type,
		{
			userName: displayName || tagName,
			displayNameStyles: user.displayNameStyles,
			inProfile: 1,
			textClassName: "displayName"
		}
	) : BdApi.React.createElement("div", { className: "displayName" }, displayName || tagName), !StreamerModeStore.hidePersonalInformation && (!betterdiscord.Data.load("disableDiscrim") && displayProfile._userProfile?.legacyUsername ? BdApi.React.createElement(
		"div",
		{
			className: "nameTag",
			style: { marginLeft: "-5px" }
		},
		displayProfile._userProfile?.legacyUsername?.substring(displayProfile._userProfile?.legacyUsername?.indexOf("#"))
	) : user.bot ? BdApi.React.createElement(
		"div",
		{
			className: "nameTag",
			style: { marginLeft: "-5px" }
		},
		"#" + user.discriminator
	) : BdApi.React.createElement(
		"div",
		{
			className: "nameTag"
		},
		"@" + tagName
	)), user.bot && BdApi.React.createElement(
		BotTagRenderer.Z,
		{
			className: "botTag",
			type: user.system ? BotTagRenderer.Z.Types.OFFICIAL : BotTagRenderer.Z.Types.BOT,
			verified: user.publicFlags & 1 << 16
		}
	)), user.primaryGuild?.tag && betterdiscord.Data.load("showGuildTag") ? BdApi.React.createElement("div", { className: "badgeSection", style: { display: "flex", flexWrap: "wrap", alignItems: "center" } }, BdApi.React.createElement(ClanTagBuilder, { user }), [
		displayProfile._userProfile.badges && displayProfile._userProfile.badges.length !== 0 && BdApi.React.createElement("div", { className: "divider", style: { margin: "0 5px 0 5px" } }),
		BdApi.React.createElement(BadgeComponent, { badges: displayProfile._userProfile.badges, style: { display: "contents" } })
	]) : BdApi.React.createElement(BadgeComponent, { badges: displayProfile._userProfile.badges, style: { display: "flex", flexWrap: "wrap" } })), BdApi.React.createElement("div", { className: "profileButtons" }, BdApi.React.createElement(ButtonComponent, { user, currentUser, relationshipType: RelationshipStore.getRelationshipType(user.id) })));
}
function headerBuilder({ props, user, currentUser, displayProfile, tab, setTab, ref }) {
	const tagName = user.username;
	const displayName = user.globalName;
	const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(user.id));
	const check = activityCheck({ activities });
	const voice = useStateFromStores([betterdiscord.Webpack.getStore("VoiceStateStore")], () => betterdiscord.Webpack.getStore("VoiceStateStore").getVoiceStateForUser(user.id)?.channelId);
	const stream = useStateFromStores([StreamStore], () => StreamStore.getAnyStreamForUser(user.id));
	if (activities.length !== 0 && (check.playing || check.listening || check.watching || check.competing) && (!check.spotify && !check.streaming && !check.xbox) || voice !== void 0) {
		return BdApi.React.createElement("div", { className: "topSectionPlaying", style: { backgroundColor: "var(--background-brand)" } }, displayProfile.banner && BdApi.React.createElement(
			"img",
			{
				className: "userBanner",
				src: displayProfile.getBannerURL({ canAnimate: true }),
				style: {
					width: "600px",
					height: "200px"
				},
				alt: ""
			}
		), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCards,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			ActivityCards,
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
	} else if (activities.length !== 0 && check.streaming || voice !== void 0) {
		return BdApi.React.createElement("div", { className: "topSectionStreaming", style: { backgroundColor: "#593695" } }, displayProfile.banner && BdApi.React.createElement(
			"img",
			{
				className: "userBanner",
				src: displayProfile.getBannerURL({ canAnimate: true }),
				style: {
					width: "600px",
					height: "200px"
				},
				alt: ""
			}
		), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCards,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			TwitchCards,
			{
				user,
				activities
			}
		), BdApi.React.createElement(
			ActivityCards,
			{
				user,
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
	} else if (activities.length !== 0 && check.spotify || voice !== void 0) {
		return BdApi.React.createElement("div", { className: "topSectionSpotify", style: { backgroundColor: "#1db954" } }, displayProfile.banner && BdApi.React.createElement(
			"img",
			{
				className: "userBanner",
				src: displayProfile.getBannerURL({ canAnimate: true }),
				style: {
					width: "600px",
					height: "200px"
				},
				alt: ""
			}
		), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCards,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			SpotifyCards,
			{
				user,
				activities
			}
		), BdApi.React.createElement(
			ActivityCards,
			{
				user,
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
	} else if (activities.length !== 0 && check?.xbox || voice !== void 0) {
		return BdApi.React.createElement("div", { className: "topSectionXbox", style: { backgroundColor: "#107c10" } }, displayProfile.banner && BdApi.React.createElement(
			"img",
			{
				className: "userBanner",
				src: displayProfile.getBannerURL({ canAnimate: true }),
				style: {
					width: "600px",
					height: "200px"
				},
				alt: ""
			}
		), BdApi.React.createElement(
			HeaderInnerBuilder,
			{
				user,
				currentUser,
				displayProfile,
				tagName,
				displayName
			}
		), BdApi.React.createElement("div", { className: "headerFill" }, BdApi.React.createElement(
			CustomCards,
			{
				className: "activity",
				activities
			}
		), BdApi.React.createElement("div", { className: "activityCardsContainer", style: { overflow: "hidden auto", display: "flex", flexDirection: "column" } }, BdApi.React.createElement(
			ActivityCards,
			{
				user,
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
	}
	return BdApi.React.createElement("div", { className: "topSectionNormal", style: { backgroundColor: "var(--background-tertiary, var(--background-base-lowest))" } }, displayProfile.banner && BdApi.React.createElement(
		"img",
		{
			className: "userBanner",
			src: displayProfile.getBannerURL({ canAnimate: true }),
			style: {
				width: "600px",
				height: "200px"
			},
			alt: ""
		}
	), BdApi.React.createElement(
		HeaderInnerBuilder,
		{
			user,
			currentUser,
			displayProfile,
			tagName,
			displayName
		}
	), BdApi.React.createElement(
		CustomCards,
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
function AboutTab({ data, user, displayProfile }) {
	const connections = displayProfile._userProfile.connectedAccounts;
	if (StreamerModeStore.hidePersonalInformation) {
		return BdApi.React.createElement("div", { className: "infoScroller scrollerBase", style: { overflow: "hidden scroll", paddingRight: "12px" } }, BdApi.React.createElement("div", { className: "empty" }, BdApi.React.createElement("div", { className: "emptyIconStreamerMode emptyIcon" }), BdApi.React.createElement("div", { className: "emptyText" }, intl.intl.formatToPlainString(intl.t["Br1ls3"]))));
	}
	return BdApi.React.createElement("div", { className: "infoScroller scrollerBase", style: { overflow: "hidden scroll", paddingRight: "12px" } }, displayProfile?.pronouns && BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["1w6drw"])), BdApi.React.createElement("div", { className: "userPronouns", style: { color: "var(--text-default)", fontSize: "14px" } }, displayProfile.pronouns)), BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(BioBuilder, { displayProfile })), BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement(RoleBuilder, { user, data, displayProfile })), BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, user.bot ? intl.intl.formatToPlainString(intl.t["A//N4k"]) : intl.intl.formatToPlainString(intl.t["xcKP1P"])), BdApi.React.createElement("div", { className: "memberSinceWrapper", style: { display: "flex", gap: "8px", alignItems: "center" } }, MemberDateBuilder({ data, user }))), BdApi.React.createElement("div", { className: "userInfoSection" }, BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["PbMNh2"])), BdApi.React.createElement(NoteComponent, { userId: user.id })), betterdiscord.Data.load("boardTab") && user.id === data.currentUser.id && BdApi.React.createElement("div", { className: "userInfoSection", style: { paddingBottom: "20px" } }, BdApi.React.createElement("div", { className: "userInfoSectionHeader" }, intl.intl.formatToPlainString(intl.t["Jzj9q4"])), BdApi.React.createElement(
		"button",
		{
			className: `${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.primary} ${ButtonClasses.hasText}`,
			onClick: () => ModalSystem.openModal(
				(props) => BdApi.React.createElement(ModalRoot.Modal, { ...props, title: intl.intl.formatToPlainString(intl.t["Jzj9q4"]) }, BdApi.React.createElement(Board, { user }))
			)
		},
		BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildrenWrapper}` }, BdApi.React.createElement("div", { className: `${ButtonClasses.buttonChildren}`, style: { fontSize: "14px" } }, intl.intl.formatToPlainString(intl.t["Geikwq"])))
	)), BdApi.React.createElement("div", { className: "userInfoSection", style: { borderTop: "1px solid var(--background-modifier-accent, var(--background-modifider-active))" } }, BdApi.React.createElement(ConnectionCards, { user, connections })), BdApi.React.createElement("div", { "aria-hidden": true, style: { pointerEvents: "none", minHeight: "0px", minWidth: "1px", flex: "0 0 auto", height: "8px" } }));
}
function BoardTab({ data, user, displayProfile }) {
	const widgets = displayProfile.widgets;
	if (!widgets.length && user.id !== data.currentUser.id) return;
	return BdApi.React.createElement("div", { className: "infoScroller scrollerBase", style: { overflow: "hidden scroll" } }, [
		widgets.map((widget) => BdApi.React.createElement(WidgetBuilder, { widget }))
	]);
}
function ServersTab({ data, user }) {
	const mutualServers = UserProfileStore.getMutualGuilds(user.id);
	if (!mutualServers?.length == 0) {
		return BdApi.React.createElement("div", { className: "listScroller scrollerBase", style: { overflow: "hidden scroll" } }, mutualServers.map((mutual) => BdApi.React.createElement(
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
	return BdApi.React.createElement("div", { className: "listScroller scrollerBase", style: { overflow: "hidden scroll" } }, BdApi.React.createElement("div", { className: "empty" }, BdApi.React.createElement("div", { className: "emptyIconGuilds emptyIcon" }), BdApi.React.createElement("div", { className: "emptyText" }, intl.intl.formatToPlainString(intl.t["zjVh8h"]))));
}
function FriendsTab({ data, user }) {
	const mutualFriends = UserProfileStore.getMutualFriends(user.id);
	if (!mutualFriends?.length == 0) {
		return BdApi.React.createElement("div", { className: "listScroller scrollerBase", style: { overflow: "hidden scroll" } }, mutualFriends.map((mutual) => BdApi.React.createElement(
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
	return BdApi.React.createElement("div", { className: "listScroller scrollerBase", style: { overflow: "hidden scroll" } }, BdApi.React.createElement("div", { className: "empty" }, BdApi.React.createElement("div", { className: "emptyIconFriends emptyIcon" }), BdApi.React.createElement("div", { className: "emptyText" }, intl.intl.formatToPlainString(intl.t["/5p4gx"]))));
}
function DataTab({ user }) {
	return BdApi.React.createElement(BotDataComponent, { user });
}
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
function bodyBuilder({ data, user, displayProfile, tab, ref }) {
	return BdApi.React.createElement("div", { className: "body", style: { height: "240px", backgroundColor: "var(--background-secondary, var(--background-base-lower))" }, ref }, tab === tabs.ABOUT ? BdApi.React.createElement(AboutTab, { data, user, displayProfile }) : tab === tabs.BOARD ? BdApi.React.createElement(BoardTab, { data, user, displayProfile }) : tab === tabs.SERVERS ? BdApi.React.createElement(ServersTab, { data, user }) : tab === tabs.FRIENDS ? BdApi.React.createElement(FriendsTab, { data, user }) : tab === tabs.DATA ? BdApi.React.createElement(DataTab, { user }) : BdApi.React.createElement(FallbackTab, null));
}

// styles.js
const styles = Object.assign(
	{
		outer: betterdiscord.Webpack.getByKeys("outer", "overlay").outer,
		hasText: betterdiscord.Webpack.getModule((x) => x.primary && x.hasText && !x.hasTrailing).hasText,
		sm: betterdiscord.Webpack.getModule((x) => x.primary && x.hasText && !x.hasTrailing).sm,
		buttonChildrenWrapper: betterdiscord.Webpack.getModule((x) => x.primary && x.hasText && !x.hasTrailing).buttonChildrenWrapper,
		disabledButtonWrapper: betterdiscord.Webpack.getByKeys("disabledButtonWrapper", "sizeSmall").disabledButtonWrapper,
		fullscreenOnMobile: betterdiscord.Webpack.getByKeys("focusLock", "fullscreenOnMobile").fullscreenOnMobile,
		clickableImage: betterdiscord.Webpack.getByKeys("gameState", "clickableImage").clickableImage
	},
	betterdiscord.Webpack.getByKeys("container", "bar", "progress"),
	betterdiscord.Webpack.getModule((x) => x.container && x.badge && Object.keys(x).length === 2),
	betterdiscord.Webpack.getByKeys("colorPrimary", "grow"),
	betterdiscord.Webpack.getByKeys("themeColor", "secondary"),
	betterdiscord.Webpack.getByKeys("lineClamp2Plus"),
	betterdiscord.Webpack.getByKeys("badgeContainer", "badgesContainer"),
	betterdiscord.Webpack.getByKeys("tabularNumbers"),
	betterdiscord.Webpack.getByKeys("icon", "buttonInner"),
	betterdiscord.Webpack.getModule((x) => x.buttonContainer && Object.keys(x).length === 1)
);
let CSS = webpackify(
	`\n  	body {\n  			--background-brand: var(--bg-brand);\n  			.custom-user-profile-theme:not(.disable-profile-themes) {\n  					--button-filled-brand-background: var(--profile-gradient-button-color);\n  					--button-filled-brand-background-hover: color-mix(in srgb, var(--profile-gradient-button-color) 80%, transparent);\n  					--button-filled-brand-background-active: color-mix(in srgb, var(--profile-gradient-button-color) 70%, transparent);\n  			}\n  	}\n\n  	.outer.user-profile-modal-v2, .outer.user-profile-modal {\n  			height: fit-content;\n  			min-height: 400px;\n  			max-width: 600px;\n  			min-width: 600px;\n  			border-radius: 5px;\n  			border: unset;\n  			--profile-gradient-start: color-mix(in oklab, var(--profile-gradient-primary-color) 100%, var(--profile-gradient-primary-color)) !important;\n  			--profile-gradient-end: color-mix(in oklab, var(--profile-gradient-secondary-color) 100%, var(--profile-gradient-secondary-color)) !important;\n  			--custom-user-profile-theme-color-blend: linear-gradient(color-mix(in oklab, var(--profile-gradient-overlay-color), var(--profile-gradient-start)), color-mix(in oklab, var(--profile-gradient-overlay-color), var(--profile-gradient-end)));\n  	}\n  	.inner {\n  			position: relative;\n  			pointer-events: auto;\n  			display: flex;\n  			flex-direction: column;\n  			min-height: 0;\n  	}\n  	:where(.theme-dark) .outer:not(.disable-profile-themes) .inner {\n  			background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), var(--custom-theme-base-color, var(--background-secondary, var(--background-base-lower))) !important;\n  	}\n  	:where(.theme-light) .outer:not(.disable-profile-themes) .inner {\n  			background: var(--custom-theme-base-color, var(--background-secondary, var(--background-base-lower))) !important;\n  	}\n  	.custom-theme-background .theme-dark, .theme-dark.custom-theme-background {\n  			--custom-theme-base-color: var(--custom-user-profile-theme-color-blend, var(--theme-base-color-dark)) !important;\n  	}\n  	.custom-theme-background .theme-light, .theme-light.custom-theme-background {\n  			--custom-theme-base-color: var(--custom-user-profile-theme-color-blend, var(--theme-base-color-light)) !important;\n  	}\n  	.custom-theme-background:is(.disable-profile-themes) {\n  			 --custom-theme-base-color: unset !important;\n  			 --custom-theme-base-color-amount: 0% !important;\n  	}\n  	.custom-user-profile-theme:is(.disable-profile-themes) {\n  			--custom-theme-text-color: unset !important;\n  			--custom-theme-text-color-amount: 0% !important;\n  	}\n  	.inner .userBanner {\n  			position: absolute;\n  			z-index: 0;\n  			opacity: 25%;\n  			mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));\n  			pointer-events: none;\n  	}\n  	.inner .header {\n  			display: flex;\n  			align-items: center;\n  			padding: 20px; \n  			flex-direction: row;\n  	}\n  	.inner .avatar {\n  			position: unset !important;\n  			margin-right: 20px;\n  			width: unset !important;\n  	}\n  	.inner .clanTagContainer {\n  			max-width: 80px;\n  			overflow: hidden;\n  	}\n  	.inner .clanTag {\n  			align-items: center;\n  			background: rgba(0,0,0,0.2);\n  			border-radius: 4px;\n  			display: inline-flex;\n  			line-height: 16px !important;\n  			padding: 0 4px;\n  			transition: background .1s ease-in-out;\n  			vertical-align: middle;\n  			height: 20px;\n  	}\n  	.inner .clanTagInner {\n  			align-items: center;\n  			display: inline-flex;\n  			line-height: 16px !important;\n  			max-width: 60px;\n  	}\n  	.inner .tagBadge {\n  			margin-right: 2px;\n  			margin-top: 0;\n  			width: 14px;\n  			height: 14px;\n  	}\n  	.headerInfo {\n  			flex: 1;\n  			min-width: 0; \n  			padding-right: 16px;\n  			position: relative;\n  	}\n  	.nameSection {\n  			display: flex; \n  			white-space: normal; \n  			word-break: break-word; \n  			line-height: 20px; \n  			flex-wrap: wrap; \n  			margin-right: 20px;\n  			align-items: baseline;\n  	}\n  	.nameSection .displayName {\n  			color: var(--header-primary);\n  			font-weight: 600;\n  			font-size: 18px;\n  			margin-right: 5px;\n  	}\n  	.nameSection .nameTag {\n  			color: var(--header-secondary);\n  			font-weight: 500;\n  			font-size: 14px;\n  	}\n  	.profileBadges {\n  			.container {\n  					position: unset;\n  					flex: 0 1 auto;\n  					transform: unset;\n  					transform-origin: unset;\n  					margin-right: 3px;\n  					.badge {\n  							height: 28px;\n  							width: 28px;\n  					}\n  			}\n  	}\n  	.profileButtons {\n  			display: flex;\n  			gap: 8px;\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					background: var(--green, var(--button-filled-brand-background));\n  					padding: 2px 16px;\n  					svg {\n  							display: none;\n  					}\n  					.buttonChildrenWrapper {\n  							padding: unset;\n  					} \n  			}\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):hover, .hasText:hover {\n  					background: var(--green-hover, var(--button-filled-brand-background-hover)) !important;\n  			}\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):active, .hasText:active {\n  					background: var(--green-active, var(--button-filled-brand-background-active)) !important;\n  			}\n  			.themeColor.secondary, .sm:not(.hasText) {\n  					background: unset !important;\n  					border: unset !important;\n  					color: #7c7e81;\n  					width: var(--custom-button-button-sm-height);\n  					padding: 0;\n  					svg {\n  							stroke: #7c7e81;\n  					}\n  			}\n  			.themeColor.secondary:hover, .sm:not(.hasText):hover {\n  					color: var(--interactive-hover);\n  					svg {\n  							stroke: var(--interactive-hover);\n  					}\n  			}\n  			.themeColor.secondary:active, .sm:not(.hasText):active {\n  					color: var(--interactive-active);\n  					svg {\n  							stroke: var(--interactive-active);\n  					}\n  			}\n  	}\n  	.topSectionPlaying .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: var(--background-brand);\n  			}\n  	}\n  	.topSectionSpotify .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: #43b581\n  			}\n  	}\n  	.topSectionStreaming .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: #593695\n  			}\n  	}\n  	.topSectionXbox .profileButtons {\n  			.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  					color: #107c10\n  			}\n  	}\n  	.headerFill {\n  			background-color: rgba(0,0,0,.05);\n  			display: flex; \n  			flex-direction: column;\n  	}\n  	.tabBarItem {\n  			display: flex;\n  			align-items: center;\n  			margin-right: 40px;\n  			font-size: 14px;\n  			color: var(--interactive-normal);\n  			border-bottom: 3px solid transparent;\n  			cursor: pointer;\n  	}\n  	.tabBarItem:hover {\n  			color: var(--interactive-hover);\n  			border-bottom: 3px solid transparent;\n  			border-bottom-color: var(--interactive-active);\n  	}\n  	.tabBarItem[aria-selected=true] {\n  			color: var(--interactive-active);\n  			border-bottom: 3px solid transparent;\n  			border-bottom-color: var(--interactive-active);\n  	}\n  	.inner .body {\n  			display: flex;\n  	}\n  	.infoScroller {\n  			padding: 0 20px;\n  			height: 100%;\n  			&::-webkit-scrollbar {\n  					background: none;\n  					border-radius: 8px;\n  					width: 8px;\n  			}\n  			&::-webkit-scrollbar-thumb {\n  					background-clip: padding-box;\n  					border: solid 2px #0000;\n  					border-radius: 8px;\n  			}\n  			&:hover::-webkit-scrollbar-thumb {\n  					background-color: var(--bg-overlay-6, var(--background-tertiary, var(--background-base-lowest)));\n  			}\n  	}\n  	.listScroller {\n  			padding: 8px 0;\n  			&::-webkit-scrollbar {\n  					background: none;\n  					border-radius: 8px;\n  					width: 8px;\n  			}\n  			&::-webkit-scrollbar-thumb {\n  					background-clip: padding-box;\n  					border: solid 2px #0000;\n  					border-radius: 8px;\n  			}\n  			&:hover::-webkit-scrollbar-thumb {\n  					background-color: var(--bg-overlay-6, var(--background-tertiary, var(--background-base-lowest)));\n  			}\n  	}\n  	.inner .scrollerBase {\n  			box-sizing: border-box;\n  			min-height: 0;\n  			display: flex;\n  			flex-direction: column;\n  			flex: 1 1 auto;\n  	}\n  	.userInfoSection {\n  			padding: 20px 0 10px 0;\n  	}\n  	.userInfoSection:empty {\n  			display: none;\n  	}\n  	.userInfoSectionHeader {\n  			font-weight: 700;\n  			font-size: 12px;\n  			color: var(--channels-default);\n  			margin-bottom: 10px;\n  			text-transform: uppercase;\n  	}\n  	.divider {\n  			background-color: var(--interactive-normal);\n  			border-radius: 50%;\n  			height: 4px;\n  			width: 4px;\n  	}\n  	.userBio .lineClamp2Plus {\n  			-webkit-line-clamp: unset !important;\n  	}\n  	.inner .activity {\n  			padding: 20px;\n  			border-radius: var(--radius-sm);\n  			position: relative;\n  	}\n  	.inner .activityHeader {\n  			font-family: var(--font-display);\n  			font-size: 12px; \n  			line-height: 1.2857142857142858;\n  			font-weight: 600;\n  			color: var(--header-secondary);\n  			margin-bottom: 8px;\n  			text-transform: uppercase;\n  	}\n  	.customStatusContent {\n  			user-select: text;\n  			white-space: pre-wrap;\n  			overflow: hidden;\n  			.emoji {\n  					margin-right: 8px;\n  					height: 20px;\n  					width: 20px;\n  			}\n  			.emoji+.customStatusText {\n  					display: inline;\n  			}\n  			&:has(.customStatusText:empty) .emoji {\n  					height: 48px;\n  					width: 48px;\n  			}\n  	}\n  	.customStatusContent .customStatusText {\n  			color: var(--header-secondary);\n  			font-weight: 500;\n  			font-size: 14px;\n  	}\n  	.nameSection .botTag {\n  			flex: 0 0 auto;\n  			margin-left: 1ch;\n  			align-self: center;\n  	}\n  	.userInfoSection .note {\n  			margin: -4px;\n  	}\n  	.userInfoSection .note textarea {\n  			border-radius: 3px;\n  			border: unset !important;\n  			background-color: unset !important;\n  			font-size: 14px;\n  			line-height: 16px;\n  			padding: 4px;\n  	}\n  	.userInfoSection .note textarea:focus {\n  			background-color: var(--background-tertiary, var(--background-base-lowest)) !important;\n  	}\n  	.connectedAccounts {\n  			display: flex;\n  			justify-content: space-between;\n  			flex-wrap: wrap;\n  			flex-direction: row;\n  			margin-top: -20px;\n  			list-style-type: none;\n  	}\n  	.connectedAccount {\n  			border-radius: 3px;\n  			margin-top: 20px;\n  			padding: 8px 14px 8px 8px;\n  			width: 240px;\n  			border: 1px solid;\n  			border-color: var(--background-modifier-accent, var(--background-modifier-active));\n  			flex: 0 1 auto !important\n  	}\n  	.empty {\n  			display: flex;\n  			flex-direction: column;\n  			align-items: center;\n  			justify-content: center;\n  			box-sizing: border-box;\n  			flex: 1;\n  			min-height: 100%;\n  			padding: 20px 0;\n  	}\n  	.emptyIcon {\n  			width: 240px;\n  			height: 130px;\n  			background-position: 50%;\n  			background-repeat: no-repeat;\n  			background-size: cover;\n  	}\n  	.theme-dark .emptyIconStreamerMode {\n  			background-image: url('https://discord.com/assets/e18336bc1141d8a5e88379e41e91cacb.svg');\n  	}\n  	.theme-light .emptyIconStreamerMode {\n  			background-image: url('https://discord.com/assets/40311479d87be9ab59aef9571750cd5f.svg');\n  	}\n  	.emptyText {\n  			font-weight: 500;\n  			font-size: 14px;\n  			line-height: 16px;\n  			margin-top: 12px;\n  			text-transform: uppercase;\n  			color: var(--header-secondary);\n  	}\n  	:is(.theme-dark) .emptyIconFriends {\n  			background-image: url(https://discord.com/assets/ca3f5ec71bb86c6aeb015bb0d54a10fa.svg);\n  	}\n  	:is(.theme-dark) .emptyIconGuilds {\n  			background-image: url(https://discord.com/assets/1fc96c69951bfa5c.svg);\n  	}\n  	:is(.theme-light) .emptyIconFriends {\n  			background-image: url(https://discord.com/assets/898a7791572e9e050735eeec7e25739d.svg);\n  	}\n  	:is(.theme-light) .emptyIconGuilds {\n  			background-image: url(https://discord.com/assets/38af48da1542dfedce582fc5e8042285.svg);\n  	}\n  	.widgetCard {\n  			align-items: start;\n  			display: grid;\n  			gap: 16px;\n  			grid-template-columns: auto 1fr;\n  			justify-content: flex-start;\n  			position: relative;\n  			width: 100%;\n  			z-index: 0;\n  	}\n  	.gameCover {\n  			border-radius: 8px;\n  			box-sizing: border-box;\n  			height: var(--custom-game-cover-height, 117px);\n  			width: var(--custom-game-cover-width, 88px);\n  	}\n  	.gameCover:not(.gameCover > .gameCover):before {\n  			background: linear-gradient(150deg, hsla(0, 0%, 100%, .2), hsla(0, 0%, 100%, 0) 40%);\n  			border-radius: 8px;\n  			box-shadow: inset 0 0 13px 0 hsla(0, 0%, 100%, .06), inset 0 0 0 1px var(--border-faint);\n  			content: "";\n  			height: 100%;\n  			left: 0;\n  			position: absolute;\n  			top: 0;\n  			transition: background 50ms ease-in;\n  			width: 88px;\n  			z-index: 1;\n  	}\n  	.gameCover img[src="null"] {\n  			display: none;\n  	}\n  	.full-motion .hoverActiveEffect {\n  			transition: transform .15s ease-in-out;\n  			will-change: transform;\n  	}\n  	.full-motion .hoverActiveEffect:hover {\n  			transform: scale(1.0225);\n  	}\n  	.full-motion .hoverActiveEffect:active {\n  			transform: scale(0.9775)\n  	}\n  	.fallback {\n  			align-items: center;\n  			display: flex;\n  			flex-direction: column;\n  			justify-content: center;\n  			padding: 4px;\n  			text-align: center;\n  			word-break: break-word;\n  	}\n  	.coverFallbackText {\n  			display: -webkit-box;\n  			-webkit-box-orient: vertical;\n  			overflow: hidden;\n  			font-size: 10px;\n  			font-weight: 500;\n  			line-height: 1.2;\n  			color: var(--text-default);\n  			text-transform: uppercase;\n  	}\n  	.widgetDetails {\n  			display: flex;\n  			flex-direction: column;\n  			flex-grow: 1;\n  			gap: 4px;\n  			justify-content: center;\n  			min-height: 117px;\n  			overflow-wrap: break-word;\n  			word-break: break-word;\n  	}\n  	.widgetTitle {\n  			color: var(--text-default);\n  			font-size: 14px;\n  			font-weight: 500;\n  			line-height: 1.2857142857142858;\n  	}\n  	.commentIcon {\n  			float: left;\n  			margin: 3px 4px 0 0;\n  	}\n  	.widgetCoverList {\n  			display: grid;\n  			grid-template-columns: repeat(var(--custom-game-cover-grid-row-size, 5), var(--custom-game-cover-width, 88px));\n  			justify-content: space-between;\n  			row-gap: 16px;\n  	}\n  	.cardList {\n  			align-items: stretch;\n  			display: flex;\n  			flex-direction: column;\n  			gap: 12px;\n  	}\n  	.tagListContainer {\n  			box-sizing: border-box;\n  			display: flex;\n  			flex-direction: row;\n  			flex-wrap: wrap;\n  			gap: 4px;\n  			margin-top: 4px;\n  	}\n  	\n  	.activityCardsContainer {\n  			flex: 1 0 fit-content;\n  			scroll-snap-type: y mandatory;\n  			max-height: 240px;\n  			& .overlay {\n  							scroll-snap-align: start;\n  							scroll-margin-top: 15px;\n  					}\n			&::-webkit-scrollbar {\n  					background: none;\n  					border-radius: 8px;\n  					width: 8px;\n  			}\n  			&::-webkit-scrollbar-thumb {\n  					background-clip: padding-box;\n  					border: solid 2px #0000;\n  					border-radius: 8px;\n  			}\n  			&:hover::-webkit-scrollbar-thumb {\n  					background-color: var(--white));\n  			}\n  	}\n  	.activityProfileContainerVoice .bodyNormal > div:nth-child(1) {\n  			height: 60px;\n  			width: 60px;\n  			background: rgb(255 255 255 / 0.15) !important;\n  			margin-right: 20px;\n  	}\n  	.activityProfileContainerVoice .bodyNormal > div:nth-child(1):before {\n  			background: rgb(255 255 255 / 0.15) !important;\n  	}\n  	:is(.activityProfileContainerVoice, .activityProfileContainerStream) .textRow svg {\n  			width: 12px;\n  			height: 12px;\n  			margin-right: 2px;\n  			position: relative;\n  			bottom: 1px;\n  			path {\n  					fill: #fff;\n  			}\n  	}\n  	.activityProfile .headerText {\n  			font-family: var(--font-display);\n  			font-size: 12px;\n  			line-height: 1.2857142857142858;\n  			font-weight: 700;\n  			text-transform: uppercase;\n  	}\n  	.activityProfile .contentImagesProfile {\n  			display: grid;\n  			flex: 1;\n  			margin-bottom: 3px;\n  	}\n  	.activityProfile .contentImagesProfile .mediaProgressBarContainer {\n  			margin-top: 10px;\n  			margin-right: 8px;\n  			width: auto;\n  					&> div {\n  							display: grid;\n  							grid-template-areas: "progressbar progressbar" "lefttext righttext";\n  					}\n  					.bar {\n  							background-color: rgba(79,84,92,.16);\n  							height: 4px;\n  							grid-area: progressbar;\n  					}\n  					[data-text-variant="text-xs/normal"] {\n  							color: var(--white) !important;\n  							grid-area: lefttext;\n  					}\n  					[data-text-variant="text-xs/normal"]:last-child {\n  							justify-self: end;\n  							grid-area: righttext;\n  					}   \n  			\n  	}\n  	.activityProfile :is(.nameNormal, .details, .state, .timestamp) {\n  			color: #fff;\n  	}\n  	.activityProfile .textRow {\n  			display: block;\n  			font-size: 14px;\n  			line-height: 18px;\n  	}\n  	.activityProfile .ellipsis {\n  			white-space: nowrap;\n  			text-overflow: ellipsis;\n  			overflow: hidden;\n  	}\n  	.activityProfile .state {\n  			white-space: wrap;\n  	}\n  	.activityProfile .actionsProfile {\n  			display: flex;\n  			flex: 0 1 auto;\n  			flex-direction: column;\n  			flex-wrap: nowrap;\n  			justify-content: flex-end;\n  			align-items: flex-end;\n  			margin-left: 20px;\n  	}\n  	.activityProfile .buttonContainer {\n  			flex-direction: inherit;\n  			gap: inherit;\n  	}\n  	:is(.activityProfileContainerSpotify, .activityProfileContainerVoice, .activityProfileContainerStream) .actionsProfile {\n  			gap: 6px;\n  			flex-direction: row;\n  	}\n  	.activityProfile .actionsProfile .hasText {\n  			padding: 2px 16px;\n  			&:has(svg path[d^="M20.97 4.06c0 .18.08.35.24.43.55.28.9.82 1.04 1.42.3 1.24.75 3.7.75 7.09v4.91a3.09 3.09 0 0 1-5.85 1.38l-1.76-3.51a1.09 1.09 0 0 0-1.23-.55c-.57.13-1.36.27-2.16.27s-1.6-.14-2.16-.27c-.49-.11-1 .1-1.23.55l-1.76 3.51A3.09 3.09 0 0 1 1"]) {\n  					background: var(--white) !important;\n  					border: unset !important;\n  					color: var(--background-brand);\n  					&:hover {\n  							background: #e6e6e6 !important;\n  					}\n  					&:active {\n  							background: #ccc !important;\n  					}\n  			}\n  	}\n  	.activityProfile .actionsProfile .sm:not(.hasText) {\n  			padding: 0;\n  			width: calc(var(--custom-button-button-sm-height) + 4px);\n  	}\n  	.activityProfile .actionsProfile button {\n  			background: transparent !important;\n  			border: 1px solid var(--white) !important;\n  			font-size: 14px;\n  			margin-bottom: 8px;\n  			width: auto;\n  			height: 32px;\n  			min-height: 32px !important;\n  			color: #fff;\n  			svg {\n  					display: none;\n  			}\n  	}\n  	:where(.button).icon {\n  			width: var(--custom-button-button-sm-height) !important;\n  	} \n  	.activityProfile .actionsProfile button:active {\n  			background-color: hsla(0,0%,100%,.1) !important;\n  	}\n  	.activityProfile .actionsProfile button svg {\n  			display: unset;\n  	}\n  	.activityProfile .actionsProfile .disabledButtonWrapper {\n  			margin-bottom: 8px;\n  			width: auto;\n  	}\n  	.activityProfile .badgeContainer .tabularNumbers {\n  			color: #f6fbf9 !important;\n  	}\n  	.activityProfile .badgeContainer svg path {\n  			fill: #f6fbf9 !important;\n  	}\n  	.activityProfile .assets:not(:empty) {\n  			margin-right: 20px;\n  	}\n  	.activityProfile .assets .gameIcon {\n  			-webkit-user-drag: none;\n  			background-size: 100%;\n  			border-radius: 3px;\n  	}\n  	.activityProfile .assets .assetsLargeImage {\n  			width: 90px;\n  			height: 90px;\n  			border-radius: 8px; \n  			object-fit: cover;\n  	}\n  	.activityProfile .assets .assetsLargeImageTwitch {\n  			width: 160px;\n  			height: 90px;\n  	}\n  	.activityProfile .assets:has(.assetsSmallImage) .assetsLargeImage {\n  			mask: url('https://discord.com/assets/725244a8d98fc7f9f2c4a3b3257176e6.svg');\n  	}\n  	.activityProfile .assets .assetsSmallImage, .activityProfile .assets .assetsSmallImage path {\n  			width: 30px;\n  			height: 30px;\n  			border-radius: 50%;\n  			position: absolute;\n  			bottom: -2px;\n  			right: -4px; \n  	}\n  	.activityProfile .assets .assetsLargeImage path {\n  			transform: scale(3.65) !important;\n  	}\n  	.activityProfile .assets svg.assetsSmallImage {\n  			border-radius: unset !important;\n  	}   \n  	.activityProfile .assets .assetsSmallImage path {\n  			transform: scale(1.3) !important;\n  	}\n  	.activityProfile .activityProfileContainerStream .streamPreviewImage {\n  			max-height: 90px;\n  			border-radius: 8px;\n  			margin-right: 20px;\n  	}\n  	.activityProfile .activityProfileContainerStream .streamPreviewPlaceholder {\n  			width: 120px;\n  			height: 120px;\n  			margin-right: 20px;\n  	}\n  	.activityProfile .assets.clickableImage {\n  			border-radius: 3px;\n  			cursor: pointer;\n  			&:after {\n  					border-radius: 3px;\n  			}\n  	}\n  	:is(.topSectionPlaying, .topSectionSpotify, .topSectionStreaming, .topSectionXbox) {\n  			.userBanner {\n  					opacity: 50%;\n  			}\n  			.avatar rect {\n  					fill: #fff;\n  			}\n  			.nameTag {\n  					color: #fff; \n  					font-weight: 600; \n  					opacity: 0.6;\n  			}\n  			.botTag {\n  					background: var(--white);\n  					> span {\n  							color: var(--bg-brand);\n  					}\n  			}\n  			.profileButtons {\n  					.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)), .hasText {\n  							background: #fff;  	 \n  					}\n  					.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):hover, .hasText:hover {\n  							background: #f8f9fd !important;\n  					}\n  					.lookFilled:is(.colorBrand, .colorPrimary:is(.grow)):active, .hasText:active {\n  							background: #e3e7f8 !important;\n  					}\n  					.themeColor.secondary, .sm:not(.hasText) {\n  							color: var(--white);\n  							svg {\n  									stroke: var(--white) !important;\n  							}\n  					}\n  			}\n  			.tabBarItem {\n  					color: rgba(255, 255, 255, 0.4);\n  			}\n  			.tabBarItem:hover {\n  					color: rgba(255, 255, 255, 0.6);\n  			}\n  			.tabBarItem[aria-selected=true] {\n  					color: var(--interactive-active);\n  			}\n  			.activityHeader {\n  					color: var(--white);\n  			}\n  			.customStatusText {\n  					color: var(--white);\n  					font-weight: 550;\n  			}\n  			.divider {\n  					background-color: var(--white);\n  			}\n  	}\n\n  	.theme-light :is(.topSectionPlaying, .topSectionSpotify, .topSectionStreaming, .topSectionXbox) {\n  			.displayName {\n  					color: #fff;\n  			}\n  			.tabBarItem:hover {\n  					border-bottom-color: transparent;\n  			}\n  			.tabBarItem[aria-selected=true] {\n  					color: #fff;\n  					border-bottom-color: #fff;\n  			}\n  	}\n  	\n  	.background {\n  			background: url('https://raw.githubusercontent.com/KingGamingYT/kinggamingyt.github.io/refs/heads/main/Assets/DiscordProfileModalSkeleton_2020_Darker.svg');\n  			background-size: cover;\n  	}\n  	.background:before {\n  			left: 0;\n  			top: 0;\n  			right: 0;\n  	}\n  	.background:after {\n  			display: none;\n  	}\n  	.fullscreenOnMobile > div > .content {\n  			width: 600px;\n  			height: 400px;\n  	}\n\n  	/* badges */\n\n  	:is(.topSectionPlaying, .topSectionSpotify, .topSectionStreaming, .topSectionXbox) .profileBadges {\n  			/* Staff */\n  			[src="https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M24 12c0-6.628-5.372-12-12-12C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12ZM7.266 5.908c-.08.128-.273.417-.273.417l-.006.006 3.782 3.878-1.484 1.483-3.825-3.81h-.001l-.06.06-.038.04c-.113.103-.297.242-.412.18-.251-.137-.592-.416-.496-.672.096-.256.8-1.534 2.206-2.158 0 0 .176-.048.288.048.112.096.4.4.32.528Zm8.966 4.245-.202.192.054.33-.33-.052-.1.099.019.019a.083.083 0 0 1 0 .117.085.085 0 0 1-.059.024.085.085 0 0 1-.058-.024l-.018-.02-.048.048.024.023a.082.082 0 1 1-.116.117l-.024-.023-.89.891.017.017a.083.083 0 0 1 0 .117.082.082 0 0 1-.116 0l-.017-.016-.047.046.022.022a.083.083 0 0 1-.117.117l-.022-.022-.134.135-.15.017-.092-.096.002.004-4.76 4.761-.096.096-.001.001.053.053-.036.214-.1.098.033.032a.083.083 0 0 1-.059.14.082.082 0 0 1-.058-.023l-.033-.033-.047.047.038.038a.084.084 0 0 1 0 .117.082.082 0 0 1-.058.024.08.08 0 0 1-.059-.024l-.039-.04-.89.879.04.04a.082.082 0 0 1 0 .117.081.081 0 0 1-.117 0l-.04-.04-.049.046.047.046a.083.083 0 0 1-.059.141.082.082 0 0 1-.057-.024l-.048-.047-.102.1.055.334-.337-.055-.121.119-.49-.086-.04-.017c-.118-.046-.46-.181-.696-.42-.294-.296-.436-.742-.436-.742l-.093-.511.107-.11-.025-.38.34.062.065-.067-.015-.016a.083.083 0 0 1 .057-.14c.022 0 .043.007.06.023l.014.014.046-.047-.02-.019a.083.083 0 0 1 .118-.117l.018.018.877-.891-.006-.006a.083.083 0 0 1 0-.117.081.081 0 0 1 .117 0l.005.005.046-.048-.009-.01a.082.082 0 0 1 0-.115.081.081 0 0 1 .117 0l.008.007.112-.114.199-.028.062.051 4.792-4.79.074-.076h.001l-.06-.063.015-.148.116-.117-.016-.016a.083.083 0 0 1 .06-.141.08.08 0 0 1 .057.025l.016.015.047-.047-.021-.02a.083.083 0 0 1 0-.118.085.085 0 0 1 .058-.024.09.09 0 0 1 .059.024l.02.02.888-.892-.013-.013a.082.082 0 0 1 .059-.141c.02 0 .042.009.058.024l.012.013.047-.047-.017-.017a.083.083 0 0 1 .117-.117l.017.017.097-.098-.051-.334.337.046.18-.18-.421-.419-2.11-3.9s-.086-.204.058-.305a.29.29 0 0 1 .172-.063c.072 0 .147.031.25.079.18.085 3.574 1.929 3.574 1.929l.585.572.106-.107-.022-.022-.035-.305.357.054.048-.064.474.085s.906.751 1.237 1.22l.095.484-.064.065.048.336-.253-.03-.119.115.213.207.002-.002 1.548 1.559s.06.032 0 .09l-2.014 1.998s-.028.032-.063.032a.058.058 0 0 1-.038-.016l-1.813-1.795Zm-1.65 3.974 2.11 1.6 1.79 1.917-2.137 1.994-1.854-2.03-1.375-2.063-.366-.349 1.456-1.456.376.387Z' clip-rule='evenodd'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");\n  					transform: scale(0.9);\n  			}\n  			/* Nitro */\n  			:is([src="https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png"], \n  			[src="https://cdn.discordapp.com/badge-icons/2895086c18d5531d499862e41d1155a6.png"], \n  			[src='https://cdn.discordapp.com/badge-icons/11e2d339068b55d3a506cff34d3780f3.png'], \n  			[src='https://cdn.discordapp.com/badge-icons/0d61871f72bb9a33a7ae568c1fb4f20a.png'], \n  			[src="https://cdn.discordapp.com/badge-icons/4f33c4a9c64ce221936bd256c356f91f.png"], \n  			[src="https://cdn.discordapp.com/badge-icons/4514fab914bdbfb4ad2fa23df76121a6.png"], \n  			[src="https://cdn.discordapp.com/badge-icons/0334688279c8359120922938dcb1d6f8.png"], \n  			[src="https://cdn.discordapp.com/badge-icons/cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4.png"], \n  			[src="https://cdn.discordapp.com/badge-icons/5b154df19c53dce2af92c9b61e6be5e2.png"])\n  			{\n  					content: url(https://discord.com/assets/379d2b3171722ef8be494231234da5d1.svg);\n  					width: 21px;\n  					height: 16px;\n  					transform: scale(1.4);\n  					margin-top: 1px;\n  					margin-right: 5px;\n  			}\n  			/* Partner */\n  			[src="https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png"]\n  			{\n  					content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMS45NSI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgICBzdHJva2Utd2lkdGg6IDBweDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTQuNiwzLjE1bC0yLjQ5LDEuNjZjLS4yNS4yNS0uNjYuMTctLjc1LDAtLjI1LS4yNS0uNjYtLjQyLS45MS0uNS0uNjYtLjE3LTEuMjUsMC0xLjc0LjI1bC0uODMuNTgtNC42NSwyLjk5Yy0xLC42Ni0yLjI0LjQyLTIuOTEtLjY2LS42Ni0xLjA4LS4yNS0yLjI0Ljc1LTIuODJMNi4zOC45OUM3Ljg4LjE2LDkuNjItLjI1LDExLjI4LjE2YzEuNDEuMjUsMi42NiwxLDMuNDksMi4xNi4yNS4xNy4yNS42Ni0uMTcuODNaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjAsNS42NGMwLC43NS0uNDIsMS40MS0xLDEuNzRsLTUuNDgsMy41N2MtMSwuNjYtMi4yNCwxLTMuNCwxLS41LDAtMSwwLTEuNDEtLjE3LTEuNDEtLjI1LTIuNDktMS4xNi0zLjQ5LTIuMTYtLjE3LS4xNy0uMTctLjY2LjE3LS43NWwyLjQ5LTEuNjZjLjI1LS4yNS42Ni0uMTcuNzUsMCwuMjUuMjUuNS40Mi45MS41LjY2LjE3LDEuMjUsMCwxLjc0LS4yNWwxLjI1LS43NSwzLjc0LTIuNDkuNS0uNDJjMS0uNjYsMi4yNC0uNDIsMi45MS42Ni4xNy40Mi4zMy43NS4zMywxLjE2WiIvPgo8L3N2Zz4=") !important;\n  					transform: scale(0.5);\n  					width: 32px;\n  					margin-left: -5px;\n  					margin-right: -6px;\n  					height: 20px;\n  			}\n  			/* Moderator Program Alumni */\n  			[src="https://cdn.discordapp.com/badge-icons/fee1624003e2fee35cb398e125dc479b.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'%3E%3Cpath fill='%23FFF' d='M13.77 0H4.23A3.74 3.74 0 0 1 .5 3.43v.9c0 4.4 2.09 8.5 5.74 11.4L9 17.9l2.76-2.16c3.65-2.83 5.74-7 5.74-11.4v-.9A3.8 3.8 0 0 1 13.77 0ZM7.3 12.9a9.08 9.08 0 0 1-3.6-7.08v-.53c1.19 0 2.23-.9 2.3-2.08h3v11.1L7.29 12.9Z'/%3E%3C/svg%3E");\n  					transform: scale(0.8);\n  			}\n  			/* HypeSquad Events */\n  			[src="https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png"]\n  			{\n  					content: url("data:image/svg+xml,%3csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 116.67 108.78'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:white;stroke-width:0}%3c/style%3e%3c/defs%3e%3cpath class='cls-1' d='m114.28 28.25-45.9 30.13c-.79.51-1.43 1.23-1.85 2.07l-7 14.03a1.291 1.291 0 0 1-1.2.78c-.26 0-.5-.07-.72-.21a1.33 1.33 0 0 1-.48-.57l-7-14.03a5.344 5.344 0 0 0-1.85-2.07L2.38 28.25c-.23-.27-.56-.45-.92-.48-.36-.03-.71.08-.99.31-.27.23-.45.56-.48.92-.03.36.08.71.31.99L19.48 67.3c.09.2.14.41.13.63s-.06.43-.16.62-.25.35-.43.48c-.18.12-.38.2-.6.23H6.92c-.28 0-.56.09-.79.25-.23.17-.4.4-.49.67s-.09.56 0 .83c.09.27.26.51.49.67l51.42 36.84c.24.16.51.25.8.25s.56-.09.8-.25l51.42-36.84c.23-.17.4-.4.49-.67s.09-.56 0-.83-.26-.51-.49-.67c-.23-.17-.51-.25-.79-.25H98.25c-.23 0-.45-.07-.64-.19-.2-.11-.36-.28-.48-.47s-.19-.41-.2-.64c-.01-.23.03-.45.13-.66l19.33-37.31c.23-.27.34-.63.31-.99a1.356 1.356 0 0 0-1.47-1.23c-.36.03-.69.2-.92.48Z'/%3e%3cpath class='cls-1' d='m59.35.62 4.71 9.61c.08.16.2.3.35.4.14.11.31.18.49.21l10.62 1.52c.21.03.4.12.56.25s.28.31.34.51.07.41.02.62c-.05.2-.16.39-.31.53l-7.69 7.47c-.12.13-.22.28-.27.45s-.07.35-.05.53l1.81 10.55c.04.2.02.41-.05.61-.08.19-.2.36-.37.48a1.2 1.2 0 0 1-.57.21c-.21.01-.41-.03-.59-.13l-9.5-4.97a1.002 1.002 0 0 0-1.02 0l-9.5 4.97c-.18.1-.39.15-.59.13a.971.971 0 0 1-.57-.21c-.17-.12-.3-.29-.37-.48-.08-.19-.09-.4-.05-.61l1.81-10.55c.02-.18 0-.36-.05-.53s-.15-.32-.27-.45l-7.69-7.47c-.15-.15-.26-.33-.31-.53-.05-.2-.04-.42.02-.62s.18-.38.34-.51c.16-.14.36-.22.56-.25l10.62-1.49c.18-.03.34-.11.49-.21.14-.11.26-.24.35-.4l4.7-9.6c.09-.19.23-.36.41-.48.18-.12.38-.18.6-.18.21 0 .42.05.6.16s.33.27.42.46Z'/%3e%3c/svg%3e");\n  					transform: scale(0.9);\n  			}\n  			/* HypeSquad Balance */\n  			[src="https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png"]\n  			{\n  					content: url(https://discord.com/assets/2a085ed9c86f3613935a6a8667ba8b89.svg);\n  					transform: scale(0.9);\n  			}\n  			/* HypeSquad Bravery */\n  			[src="https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png"]\n  			{\n  					content: url(https://discord.com/assets/1115767aed344e96a27a12e97718c171.svg);\n  					transform: scale(0.7);\n  			}\n  			/* HypeSquad Brilliance */\n  			[src="https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png"]\n  			{\n  					content: url(https://discord.com/assets/d3478c6bd5cee0fc600e55935ddc81aa.svg);\n  					transform: scale(0.8);\n  			}\n  			/* Early Supporter */\n  			[src="https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png"]\n  			{\n  					content: url(https://discord.com/assets/ce15562552e3d70c56d5408cfeed2ffd.svg);\n  					width: 22px;\n  					height: 16px;\n  					transform: scale(1.3);\n  			}\n  			/* Pomelo */\n  			[src="https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_4488_19832)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24ZM10.4644 5.82922C10.976 5.91449 11.3216 6.39836 11.2364 6.90997L10.9249 8.77859H14.3524L14.7153 6.60118C14.8006 6.08957 15.2845 5.74395 15.7961 5.82922C16.3077 5.91449 16.6533 6.39836 16.568 6.90997L16.2566 8.77859H17.4191C17.9377 8.77859 18.3582 9.19906 18.3582 9.71773C18.3582 10.2364 17.9377 10.6568 17.4191 10.6568H15.9435L15.4667 13.5179H16.8267C17.3453 13.5179 17.7658 13.9385 17.7658 14.4571C17.7658 14.9758 17.3453 15.3962 16.8267 15.3962H15.1537L14.7908 17.5736C14.7055 18.0853 14.2217 18.4309 13.7101 18.3456C13.1984 18.2603 12.8528 17.7765 12.9381 17.2649L13.2495 15.3962H9.82198L9.45908 17.5736C9.37382 18.0853 8.88994 18.4309 8.37834 18.3456C7.86673 18.2603 7.52111 17.7765 7.60637 17.2649L7.91781 15.3962H6.75543C6.23675 15.3962 5.8163 14.9758 5.8163 14.4571C5.8163 13.9385 6.23675 13.5179 6.75543 13.5179H8.23085L8.70771 10.6568H7.34784C6.82917 10.6568 6.40871 10.2364 6.40871 9.71773C6.40871 9.19906 6.82917 8.77859 7.34784 8.77859H9.02075L9.38366 6.60118C9.46892 6.08957 9.95279 5.74395 10.4644 5.82922ZM14.0394 10.6568L13.5625 13.5179H10.135L10.6119 10.6568H14.0394Z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E%0A");\n  					transform: scale(0.8);\n  			}\n  			/* Active Developer */\n  			[src="https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath fill='%23FFF' fill-rule='evenodd' d='M2 0a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm4.2 15h2.5c0-2-1-3.9-2.5-5 1.5-1.1 2.5-3 2.5-5H6.2c0 2-1.6 3.8-3.7 3.8v2.4c2 0 3.7 1.7 3.7 3.8Zm7.6 0c0-2 1.6-3.8 3.7-3.8V8.8c-2 0-3.7-1.7-3.7-3.8h-2.5c0 2 1 3.9 2.5 5a6.2 6.2 0 0 0-2.5 5h2.5Z' clip-rule='evenodd'/%3E%3C/svg%3E");\n  					transform: scale(0.6);\n  			}\n  			/* Early Verified Bot Developer */\n  			[src="https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png"]\n  			{\n  					content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 115.91 100.22'%3e%3cpath d='M113.81 46.61 88.84 3.5 86.8 0H28.99l-2.04 3.5L2.04 46.61 0 50.11l2.04 3.5 24.91 43.11 2.04 3.5h57.87l2.04-3.5 24.97-43.11 2.04-3.5-2.1-3.5ZM37.57 40.6l-9.51 9.51 9.51 9.51v15.93L12.14 50.12l25.49-25.49v15.98h-.06Zm18.2 40.42-11.9-3.67 18.08-58.22 11.9 3.73-18.08 58.16Zm22.51-5.42V59.68l9.51-9.57-9.51-9.51V24.62l25.43 25.49L78.28 75.6Z' style='fill:white;stroke-width:0'/%3e%3c/svg%3e");\n  					transform: scale(0.7);\n  					margin-left: -1.45px;\n  			}\n  			/* Bug Hunter Level 1 */\n  			[src="https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cg fill='%23fff' clip-path='url(%23a)'%3E%3Cpath fill-opacity='.6' d='M14.58.64s7.67 5.23 4.76 12.59c-2.92 7.35-8.71 5.31-6.55 3.16 2.17-2.15-2.55-3.6-5.58-6.4L14.58.65'/%3E%3Cpath d='M14.12 7.84c-1.62 2.06-3.9 3.09-5.67 2.71L2.3 18.4a1.28 1.28 0 0 1-2.12-.16 1.28 1.28 0 0 1 .1-1.43L6.4 8.98c-.81-1.62-.37-4.1 1.28-6.19C9.72.21 12.79-.76 14.58.64c1.78 1.4 1.56 4.61-.46 7.2Z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h20v20H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");\n  					transform: scale(0.85);\n  			}\n  			/* Bug Hunter Level 2 */\n  			[src="https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' fill-opacity='.45' d='M8.44 10.55c1.8.38 4.1-.65 5.7-2.7 1.99-2.62 2.24-5.91.45-7.25 0 0 7.69 5.26 4.73 12.63-2.95 7.38-8.72 5.33-6.53 3.15 1.49-1.47-.2-2.6-2.4-4.05-.7-.46-1.45-.96-2.16-1.51l.2-.27Z'/%3E%3Cpath fill='%23fff' fill-opacity='.65' d='M14.14 7.85c-1.6 2.05-3.9 3.08-5.7 2.7l-6.15 7.88c-.44.57-1.22.64-1.8.2a1.32 1.32 0 0 1-.25-1.8L6.39 9c-.83-1.6-.38-4.1 1.29-6.22C9.73.22 12.79-.73 14.58.6c1.8 1.34 1.55 4.63-.44 7.25Z'/%3E%3Cmask id='a' width='16' height='19' x='0' y='0' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M14.14 7.85c-1.6 2.05-3.9 3.08-5.7 2.7l-6.15 7.88c-.44.57-1.22.64-1.8.2a1.32 1.32 0 0 1-.25-1.8L6.39 9c-.83-1.6-.38-4.1 1.29-6.22C9.73.22 12.79-.73 14.58.6c1.8 1.34 1.55 4.63-.44 7.25Z'/%3E%3C/mask%3E%3Cg fill='%23fff' mask='url(%23a)'%3E%3Cpath d='m11.04-3.27.74.1-3.16 23.96-.74-.1 3.16-23.96Zm1.24-.25 1.62.22-3.15 23.96-1.63-.22 3.16-23.96Z'/%3E%3C/g%3E%3C/svg%3E");\n  					transform: scale(0.85);\n  			}\n  			/* Server Booster Level 1 */\n  			[src="https://cdn.discordapp.com/badge-icons/51040c70d4f20a921ad6674ff86fc95c.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 4 2 20h20L12 4Zm0 5.66L16.59 17H7.41L12 9.66Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M7.41 17 12 9.66 16.59 17H7.41Z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M12 4v5.66L16.59 17 22 20 12 4Z'/%3E%3C/svg%3E");\n  			}\n  			/* Server Booster Level 2 */\n  			[src="https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 2.7 2.7 12l9.3 9.3 9.3-9.3L12 2.7Zm0 14.65L6.65 12 12 6.65 17.35 12 12 17.35Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M12 6.65 6.63 12 12 17.35 17.35 12l-5.36-5.35Z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M12 2.7v3.95L17.35 12h3.95L12 2.7Z'/%3E%3C/svg%3E");\n  			}\n  			/* Server Booster Level 3 */\n  			[src="https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 2.7 6.54 8.16v7.68L12 21.3l5.46-5.46V8.16L12 2.7Zm2.73 12L12 17.44l-2.73-2.73V9.29L12 6.56l2.73 2.73v5.41Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M9.27 9.29v5.42L12 17.44l2.73-2.73V9.29L12 6.56 9.27 9.29Z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M12 2.7v3.86l2.73 2.73 2.73-1.13L12 2.7Z'/%3E%3C/svg%3E");\n  			}\n  			/* Server Booster Level 4 */\n  			[src="https://cdn.discordapp.com/badge-icons/df199d2050d3ed4ebf84d64ae83989f8.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M12 3.3 4.46 7.65v8.71l2.62-1.51V9.16L12 6.31l4.93 2.85v5.69L12 17.69v3l7.54-4.35V7.65L12 3.3Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='M12 3.29v3.02l4.93 2.85 2.61-1.51L12 3.29Z'/%3E%3Cpath fill='%23fff' d='m7.08 14.85-2.62 1.51L12 20.7v-3.01l-4.92-2.84Z' opacity='.4'/%3E%3Cpath fill='%23fff' d='m15.68 8.44-8.6 4.98V9.16L12 6.31l3.68 2.13Zm1.25.72v1.51l-8.54 4.94-1.31-.76 9.85-5.69Zm-7.31 7.15 7.31-4.22v2.75L12 17.69l-2.38-1.38Z' opacity='.75'/%3E%3Cpath fill='%23fff' d='m16.93 9.16-9.85 5.69v-1.43l8.6-4.98 1.25.72Zm0 1.51v1.42l-7.31 4.22-1.23-.7 8.54-4.94Z'/%3E%3C/svg%3E");\n  			}\n  			/* Server Booster Level 5 */\n  			[src="https://cdn.discordapp.com/badge-icons/996b3e870e8a22ce519b3a50e6bdd52f.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M17 7v10H7l-1.4 3h12.81L20 18.41V5.59L17 7Zm0 0 1.4-3H5.59L4 5.59v12.82L7 17V7h10Z' opacity='.55'/%3E%3Cpath fill='%23fff' d='m18.41 4-1.4 2.99L20 5.59 18.41 4ZM4 18.41l2.99-1.4L5.59 20 4 18.41Z' opacity='.4'/%3E%3Cpath fill='%23fff' d='m5.59 4 1.4 2.99h10.02L18.41 4H5.59Z'/%3E%3Cpath fill='%23fff' d='m20 18.41-2.99-1.4 1.4 2.99L20 18.41ZM15.18 6.99l-8.19 8.18V6.99h8.19Zm1.83 0v2.12l-7.9 7.9H6.99V17L17.01 6.99Zm-6.07 10.02 6.07-6.07v6.07h-6.07Z' opacity='.75'/%3E%3Cpath fill='%23fff' d='M17.01 6.99 6.99 17.01v-1.84l8.19-8.18h1.83Zm0 2.12v1.83l-6.07 6.07H9.11l7.9-7.9Z'/%3E%3C/svg%3E");\n  			}\n  			/* Server Booster Level 6 */\n  			[src="https://cdn.discordapp.com/badge-icons/991c9f39ee33d7537d9f408c3e53141e.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cg clip-path='url(%23a)'%3E%3Cmask id='b' width='24' height='24' x='0' y='0' maskUnits='userSpaceOnUse' style='mask-type:luminance'%3E%3Cpath fill='%23fff' d='M24 0H0v24h24V0Z'/%3E%3C/mask%3E%3Cg fill='%23fff' mask='url(%23b)'%3E%3Cpath d='m4.62 5.81-.4.84a.22.22 0 0 0 .3.3l.88-.4a.23.23 0 0 1 .2 0l.84.4a.23.23 0 0 0 .31-.3l-.4-.84a.18.18 0 0 1 0-.2l.4-.84a.23.23 0 0 0-.35-.31l-.84.4a.23.23 0 0 1-.2 0l-.84-.4a.23.23 0 0 0-.3.31l.4.84a.23.23 0 0 1 0 .2Z' opacity='.6'/%3E%3Cpath d='m14.9 12.96.03 3.1-2.15-.72-.8-.27-.79.27-2.14.72.02-2.26.01-.84-.5-.67-1.35-1.82 2.16-.68.81-.25.48-.69 1.3-1.83 1.32 1.84.48.68.81.25 2.15.68-1.34 1.82-.5.67Z' opacity='.75'/%3E%3Cpath d='M11.98 2.7v4.32l1.8 2.52 2.96.93 4.1-1.33-5.51-1.73-3.35-4.71Z'/%3E%3Cpath d='m11.98 15.07.8.27 2.15.72 2.53 3.49-5.48-1.84v-2.64ZM3.12 9.14l5.52-1.73 3.34-4.71v4.32l-1.3 1.83-.48.69-.81.25-2.16.68 1.35 1.82.5.67-2.51.82-3.45-4.64Zm17.72 0-4.1 1.33-1.34 1.82-.5.67 2.5.82 3.44-4.64Z' opacity='.55'/%3E%3Cpath d='M19.01 16.14h.01c.24 0 .44-.2.44-.44v-.89c0-.24-.2-.44-.44-.44h-.01c-.24 0-.44.2-.44.44v.89c0 .24.2.44.44.44Zm0 3.54h.01c.24 0 .44-.2.44-.44v-.89c0-.24-.2-.44-.44-.44h-.01c-.24 0-.44.2-.44.44v.89c0 .24.2.44.44.44Zm-.87-2.66v-.01c0-.24-.2-.44-.44-.44h-.89c-.24 0-.44.2-.44.44v.01c0 .24.2.44.44.44h.89c.24 0 .44-.2.44-.44Zm3.54.01v-.01c0-.24-.2-.44-.44-.44h-.89c-.24 0-.44.2-.44.44v.01c0 .24.2.44.44.44h.89c.24 0 .44-.2.44-.44Zm-7.9-7.49-4.7 3.42-.61-.81 4.72-3.43.59.82Zm2.96.93-7.69 5.59.01-1.26 6.48-4.71 1.2.38Z'/%3E%3Cpath d='m6.51 19.55 5.47-1.84v-2.64l-.28.09-.51.18-2.14.72.02-2.26.01-.84-2.51.82-.06 5.77Z' opacity='.4'/%3E%3Cpath d='m17.4 13.78-2.5-.82.03 3.1 2.53 3.49-.06-5.77Z' opacity='.75'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");\n  			}\n  			/* Server Booster Level 7 */\n  			[src="https://cdn.discordapp.com/badge-icons/cb3ae83c15e970e8f3d410bc62cb8b99.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.6'%3E%3Cpath opacity='0.6' d='M6.3599 4.33012L6.7699 5.17012C6.79235 5.21348 6.80042 5.26286 6.79294 5.31111C6.78546 5.35936 6.76281 5.40398 6.72829 5.43851C6.69376 5.47304 6.64914 5.49568 6.60089 5.50316C6.55264 5.51064 6.50326 5.50257 6.4599 5.48012L5.6199 5.07012C5.58871 5.05506 5.55453 5.04724 5.5199 5.04724C5.48527 5.04724 5.45108 5.05506 5.4199 5.07012L4.5799 5.48012C4.53654 5.50257 4.48716 5.51064 4.4389 5.50316C4.39065 5.49568 4.34603 5.47304 4.31151 5.43851C4.27698 5.40398 4.25434 5.35936 4.24686 5.31111C4.23938 5.26286 4.24744 5.21348 4.2699 5.17012L4.6799 4.33012C4.69495 4.29893 4.70277 4.26475 4.70277 4.23012C4.70277 4.19549 4.69495 4.16131 4.6799 4.13012L4.2699 3.29012C4.25405 3.24759 4.25114 3.20133 4.26154 3.15715C4.27193 3.11298 4.29516 3.07286 4.3283 3.04186C4.36144 3.01086 4.40301 2.99035 4.44778 2.98292C4.49255 2.9755 4.53852 2.98148 4.5799 3.00012L5.4199 3.41012C5.45108 3.42518 5.48527 3.433 5.5199 3.433C5.55453 3.433 5.58871 3.42518 5.6199 3.41012L6.4599 3.00012C6.50326 2.97767 6.55264 2.9696 6.60089 2.97708C6.64914 2.98456 6.69376 3.0072 6.72829 3.04173C6.76281 3.07626 6.78546 3.12087 6.79294 3.16913C6.80042 3.21738 6.79235 3.26676 6.7699 3.31012L6.3599 4.15012C6.34779 4.17858 6.34156 4.20919 6.34156 4.24012C6.34156 4.27105 6.34779 4.30166 6.3599 4.33012Z' fill='white'/%3E%3C/g%3E%3Cpath opacity='0.55' d='M12 2.69995L6.54004 8.15995V15.8499L9.27004 14.7199V9.28995L12 6.55995L14.72 9.28995V14.7199L12 17.4499V21.2999L17.45 15.8499V8.15995L12 2.69995Z' fill='white'/%3E%3Cpath d='M12 2.69995V6.55995L14.73 9.28995L17.46 8.15995L12 2.69995Z' fill='white'/%3E%3Cpath opacity='0.4' d='M9.27004 14.71L6.54004 15.84L12 21.3V17.44L9.27004 14.71Z' fill='white'/%3E%3Cpath d='M16.2199 17.6999H16.2299C16.4729 17.6999 16.6699 17.5029 16.6699 17.2599V16.3699C16.6699 16.1269 16.4729 15.9299 16.2299 15.9299H16.2199C15.9769 15.9299 15.7799 16.1269 15.7799 16.3699V17.2599C15.7799 17.5029 15.9769 17.6999 16.2199 17.6999Z' fill='white'/%3E%3Cpath d='M16.2199 21.25H16.2299C16.4729 21.25 16.6699 21.053 16.6699 20.81V19.92C16.6699 19.677 16.4729 19.48 16.2299 19.48H16.2199C15.9769 19.48 15.7799 19.677 15.7799 19.92V20.81C15.7799 21.053 15.9769 21.25 16.2199 21.25Z' fill='white'/%3E%3Cpath d='M15.3401 18.5899V18.5799C15.3401 18.3369 15.1431 18.1399 14.9001 18.1399H14.0101C13.7671 18.1399 13.5701 18.3369 13.5701 18.5799V18.5899C13.5701 18.8329 13.7671 19.0299 14.0101 19.0299H14.9001C15.1431 19.0299 15.3401 18.8329 15.3401 18.5899Z' fill='white'/%3E%3Cpath d='M18.8799 18.5899V18.5799C18.8799 18.3369 18.6829 18.1399 18.4399 18.1399H17.5499C17.3069 18.1399 17.1099 18.3369 17.1099 18.5799V18.5899C17.1099 18.8329 17.3069 19.0299 17.5499 19.0299H18.4399C18.6829 19.0299 18.8799 18.8329 18.8799 18.5899Z' fill='white'/%3E%3Cpath opacity='0.75' d='M9.28003 9.29006V14.7101L12.01 17.4401L14.73 14.7101V9.29006L12.01 6.56006L9.28003 9.29006Z' fill='white'/%3E%3Cpath d='M14.73 9.29004V9.30004L9.29003 14.7301L9.28003 14.7201V13.2501L13.99 8.54004L14.73 9.29004Z' fill='white'/%3E%3Cpath d='M14.7301 11.3401V12.8401L11.0701 16.5001L10.3201 15.7501L14.7301 11.3401Z' fill='white'/%3E%3C/svg%3E%0A");\n  			}\n  			/* Server Booster Level 8 */\n  			[src="https://cdn.discordapp.com/badge-icons/7142225d31238f6387d9f09efaa02759.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.55' d='M12 3.30005L4.45996 7.65005V16.3601L7.06996 14.8501V9.16005L12 6.31005L16.92 9.16005V14.8501L12 17.6901V20.6901L19.54 16.3401V7.65005L12 3.30005Z' fill='white'/%3E%3Cg opacity='0.6'%3E%3Cpath opacity='0.6' d='M6.3599 4.33012L6.7699 5.17012C6.79235 5.21348 6.80042 5.26286 6.79294 5.31111C6.78546 5.35936 6.76281 5.40398 6.72829 5.43851C6.69376 5.47304 6.64914 5.49568 6.60089 5.50316C6.55264 5.51064 6.50326 5.50257 6.4599 5.48012L5.6199 5.07012C5.58871 5.05506 5.55453 5.04724 5.5199 5.04724C5.48527 5.04724 5.45108 5.05506 5.4199 5.07012L4.5799 5.48012C4.53654 5.50257 4.48716 5.51064 4.4389 5.50316C4.39065 5.49568 4.34603 5.47304 4.31151 5.43851C4.27698 5.40398 4.25434 5.35936 4.24686 5.31111C4.23938 5.26286 4.24744 5.21348 4.2699 5.17012L4.6799 4.33012C4.69495 4.29893 4.70277 4.26475 4.70277 4.23012C4.70277 4.19549 4.69495 4.16131 4.6799 4.13012L4.2699 3.29012C4.25405 3.24759 4.25114 3.20133 4.26154 3.15715C4.27193 3.11298 4.29516 3.07286 4.3283 3.04186C4.36144 3.01086 4.40301 2.99035 4.44778 2.98292C4.49255 2.9755 4.53852 2.98148 4.5799 3.00012L5.4199 3.41012C5.45108 3.42518 5.48527 3.433 5.5199 3.433C5.55453 3.433 5.58871 3.42518 5.6199 3.41012L6.4599 3.00012C6.50326 2.97767 6.55264 2.9696 6.60089 2.97708C6.64914 2.98456 6.69376 3.0072 6.72829 3.04173C6.76281 3.07626 6.78546 3.12087 6.79294 3.16913C6.80042 3.21738 6.79235 3.26676 6.7699 3.31012L6.3599 4.15012C6.34779 4.17858 6.34156 4.20919 6.34156 4.24012C6.34156 4.27105 6.34779 4.30166 6.3599 4.33012Z' fill='white'/%3E%3C/g%3E%3Cpath d='M17.59 17.8601H17.6C17.843 17.8601 18.04 17.6631 18.04 17.4201V16.5301C18.04 16.2871 17.843 16.0901 17.6 16.0901H17.59C17.347 16.0901 17.15 16.2871 17.15 16.5301V17.4201C17.15 17.6631 17.347 17.8601 17.59 17.8601Z' fill='white'/%3E%3Cpath d='M17.59 21.3999H17.6C17.843 21.3999 18.04 21.2029 18.04 20.9599V20.0699C18.04 19.8269 17.843 19.6299 17.6 19.6299H17.59C17.347 19.6299 17.15 19.8269 17.15 20.0699V20.9599C17.15 21.2029 17.347 21.3999 17.59 21.3999Z' fill='white'/%3E%3Cpath d='M16.7099 18.75V18.74C16.7099 18.497 16.5129 18.3 16.2699 18.3H15.3799C15.1369 18.3 14.9399 18.497 14.9399 18.74V18.75C14.9399 18.993 15.1369 19.1901 15.3799 19.1901H16.2699C16.5129 19.1901 16.7099 18.993 16.7099 18.75Z' fill='white'/%3E%3Cpath d='M20.26 18.75V18.74C20.26 18.497 20.063 18.3 19.82 18.3H18.93C18.687 18.3 18.49 18.497 18.49 18.74V18.75C18.49 18.993 18.687 19.1901 18.93 19.1901H19.82C20.063 19.1901 20.26 18.993 20.26 18.75Z' fill='white'/%3E%3Cpath d='M12 3.29004V6.31004L16.93 9.15004L19.54 7.65004L12 3.29004Z' fill='white'/%3E%3Cpath opacity='0.4' d='M7.06996 14.8501L4.45996 16.3501L12 20.7101V17.6901L7.06996 14.8501Z' fill='white'/%3E%3Cpath opacity='0.75' d='M15.6901 8.43006L7.07007 13.4201V9.15006L12.0001 6.31006L15.6901 8.43006Z' fill='white'/%3E%3Cpath opacity='0.75' d='M16.9301 9.1499V10.6699L8.39008 15.6099L7.08008 14.8399L16.9301 9.1499Z' fill='white'/%3E%3Cpath opacity='0.75' d='M9.62012 16.3101L16.9301 12.0901V14.8401L12.0001 17.7001L9.62012 16.3101Z' fill='white'/%3E%3Cpath d='M16.9301 9.14993L7.08008 14.8399V13.4199L15.6901 8.42993L16.9301 9.14993Z' fill='white'/%3E%3Cpath d='M8.38989 15.6099L9.61989 16.3099L16.9299 12.0899V10.6699L8.38989 15.6099Z' fill='white'/%3E%3C/svg%3E%0A");\n  			}\n  			/* Server Booster Level 9 */\n  			[src="https://cdn.discordapp.com/badge-icons/ec92202290b48d0879b7413d2dde3bab.png"]\n  			{\n  					content: url(https://discord.com/assets/cfbc2d8ceacfacf07850f986c8165195.svg);\n  			}\n  			/* Completed a Quest */\n  			[src="https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png"]\n  			{\n  					content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAAEYJBGSAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAVxJREFUeNqdkD9KRDEQxn9rxFgIaSwsxIAnsLTaQbyBN/AGdlosJp7AC4nEk/hAsN1XbhHemDeElcVm8SPz8WX+ZSYAF3AH9/n3nMMBAKfwCLfwATfwxRy6xODfYBkyZw6eXObag8SMr+zAX0G4BhFYReY8swefzZ76fRUyywhuBL+Bw2P+Ql4LHKXwBWFymokDKRMKAlKITeSZo7Gf/ZZTiJuFZvynTkBoEp7dwH6IEUBiAdLMJxq+4WIKa4jVK9YfYiEZC53ntUAyUkiZ2BnpbMI4FJbMnEBsr8baeGyT91e86rvNDxCNkxZg5QfggcJ/kJgweH3RAWve1MaUKFoBaprQSWChqSKT5qZ0JGhTTmsfxlldtOhI/2zr6hVIpipELeYbu3LWald5HXC9trDoKoNY58r2tULoEwx4VUCtVu1a5sCENgPfvJoLWPp2c+2bi661YqrgNvv/4g9K3sljKA20yAAAAABJRU5ErkJggg==");\n  			}\n  			/* Orbs */\n  			[src="https://cdn.discordapp.com/badge-icons/83d8a1eb09a8d64e59233eec5d4d5c2d.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-161.925 -161.924 323.8 323.8'%3E%3Cpath d='M158.69700622558594,-6.170000076293945 C158.69700622558594,-6.170000076293945 116.5790023803711,-107.85199737548828 116.5790023803711,-107.85199737548828 C114.94200134277344,-111.8030014038086 111.8030014038086,-114.94200134277344 107.85199737548828,-116.5790023803711 C107.85199737548828,-116.5790023803711 6.171000003814697,-158.69700622558594 6.171000003814697,-158.69700622558594 C2.2200000286102295,-160.33299255371094 -2.2200000286102295,-160.33299255371094 -6.171000003814697,-158.69700622558594 C-6.171000003814697,-158.69700622558594 -107.85199737548828,-116.5790023803711 -107.85199737548828,-116.5790023803711 C-111.80400085449219,-114.94200134277344 -114.94300079345703,-111.8030014038086 -116.5790023803711,-107.85199737548828 C-116.5790023803711,-107.85199737548828 -158.69700622558594,-6.170000076293945 -158.69700622558594,-6.170000076293945 C-160.33399963378906,-2.2190001010894775 -160.33399963378906,2.2200000286102295 -158.69700622558594,6.171000003814697 C-158.69700622558594,6.171000003814697 -116.5790023803711,107.85299682617188 -116.5790023803711,107.85299682617188 C-114.94300079345703,111.80400085449219 -111.80400085449219,114.94200134277344 -107.85199737548828,116.5790023803711 C-107.85199737548828,116.5790023803711 -6.171000003814697,158.697998046875 -6.171000003814697,158.697998046875 C-2.2200000286102295,160.33399963378906 2.2200000286102295,160.33399963378906 6.171000003814697,158.697998046875 C6.171000003814697,158.697998046875 107.85199737548828,116.5790023803711 107.85199737548828,116.5790023803711 C111.8030014038086,114.94200134277344 114.94200134277344,111.80400085449219 116.5790023803711,107.85299682617188 C116.5790023803711,107.85299682617188 158.69700622558594,6.171000003814697 158.69700622558594,6.171000003814697 C160.33399963378906,2.2200000286102295 160.33399963378906,-2.2190001010894775 158.69700622558594,-6.170000076293945z M115.50900268554688,5.099999904632568 C115.50900268554688,5.099999904632568 5.334000110626221,115.26799774169922 5.334000110626221,115.26799774169922 C2.384999990463257,118.21800231933594 -2.3980000019073486,118.21800231933594 -5.3470001220703125,115.26799774169922 C-5.3470001220703125,115.26799774169922 -115.51100158691406,5.099999904632568 -115.51100158691406,5.099999904632568 C-118.45999908447266,2.1500000953674316 -118.45999908447266,-2.631999969482422 -115.51100158691406,-5.581999778747559 C-115.51100158691406,-5.581999778747559 -5.3470001220703125,-115.7509994506836 -5.3470001220703125,-115.7509994506836 C-2.3980000019073486,-118.69999694824219 2.384999990463257,-118.69999694824219 5.334000110626221,-115.7509994506836 C5.334000110626221,-115.7509994506836 115.50900268554688,-5.581999778747559 115.50900268554688,-5.581999778747559 C118.45899963378906,-2.631999969482422 118.45899963378906,2.1500000953674316 115.50900268554688,5.099999904632568z M5.618000030517578,-58.10300064086914 C8.482999801635742,-45.27199935913086 14.923999786376953,-33.513999938964844 24.19499969482422,-24.191999435424805 C33.465999603271484,-14.869000434875488 45.1879997253418,-8.36299991607666 58.00299835205078,-5.427000045776367 C59.25699996948242,-5.13700008392334 60.375,-4.431000232696533 61.17599868774414,-3.4240000247955322 C61.97700119018555,-2.4170000553131104 62.41299819946289,-1.1679999828338623 62.41299819946289,0.11800000071525574 C62.41299819946289,1.4049999713897705 61.97700119018555,2.6540000438690186 61.17599868774414,3.6610000133514404 C60.375,4.668000221252441 59.25699996948242,5.374000072479248 58.00299835205078,5.663000106811523 C45.202999114990234,8.529000282287598 33.48099899291992,14.975000381469727 24.20599937438965,24.250999450683594 C14.930000305175781,33.5260009765625 8.484000205993652,45.24800109863281 5.618000030517578,58.04800033569336 C5.328999996185303,59.301998138427734 4.623000144958496,60.42100143432617 3.615999937057495,61.22200012207031 C2.6089999675750732,62.02299880981445 1.3600000143051147,62.45899963378906 0.0729999989271164,62.45899963378906 C-1.2139999866485596,62.45899963378906 -2.4619998931884766,62.02299880981445 -3.4690001010894775,61.22200012207031 C-4.47599983215332,60.42100143432617 -5.182000160217285,59.301998138427734 -5.4720001220703125,58.04800033569336 C-8.397000312805176,45.250999450683594 -14.880999565124512,33.542999267578125 -24.176000595092773,24.27400016784668 C-33.47100067138672,15.005000114440918 -45.198001861572266,8.553000450134277 -58.00299835205078,5.663000106811523 C-59.25600051879883,5.374000072479248 -60.375,4.668000221252441 -61.17599868774414,3.6610000133514404 C-61.97700119018555,2.6540000438690186 -62.41299819946289,1.4049999713897705 -62.41299819946289,0.11800000071525574 C-62.41299819946289,-1.1679999828338623 -61.97700119018555,-2.4170000553131104 -61.17599868774414,-3.4240000247955322 C-60.375,-4.431000232696533 -59.25600051879883,-5.13700008392334 -58.00299835205078,-5.427000045776367 C-45.194000244140625,-8.359000205993652 -33.47200012207031,-14.843999862670898 -24.18000030517578,-24.135000228881836 C-14.888999938964844,-33.42599868774414 -8.404999732971191,-45.14899826049805 -5.4720001220703125,-57.957000732421875 C-5.198999881744385,-59.21500015258789 -4.507999897003174,-60.34400177001953 -3.51200008392334,-61.15800094604492 C-2.515000104904175,-61.972999572753906 -1.2719999551773071,-62.42499923706055 0.014999999664723873,-62.44200134277344 C1.3020000457763672,-62.45899963378906 2.556999921798706,-62.03900146484375 3.5739998817443848,-61.250999450683594 C4.5920000076293945,-60.4630012512207 5.313000202178955,-59.354000091552734 5.618000030517578,-58.10300064086914z' stroke='' stroke-width='2' fill='%23fff'/%3E%3C/svg%3E");\n  					transform: scale(0.9);\n  			}\n  			/* Slash Commands */\n  			[src="https://cdn.discordapp.com/badge-icons/6f9e37f9029ff57aef81db857890005e.png"]\n  			{\n  					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 5.72168 44 36.56'%3E%3Cpath d='M16.2354 32.1695L25.9015 15.8306H31.7647L22.0985 32.1695H16.2354Z%0AM40.8379 18.8076V13.9453C40.8379 9.99023 38.6729 7.72168 34.8984 7.72168H31.7822V11.2822L33.7012 11.2793C35.4092 11.2793 36.3887 12.416 36.3887 14.3965V19.1904C36.3887 20.8506 36.75 22.875 39.5674 23.8105L40.1387 24L39.5674 24.1895C36.75 25.125 36.3887 27.1494 36.3887 28.8096V33.6025C36.3887 35.584 35.4092 36.7207 33.7012 36.7207L31.7822 36.7178V40.2783H34.8984C38.6729 40.2783 40.8379 38.0098 40.8379 34.0547V29.1914C40.8379 26.6748 41.5244 25.9385 44 25.9023V22.0977C41.5244 22.0615 40.8379 21.3252 40.8379 18.8076Z M11.6123 14.3965C11.6123 12.4443 12.6172 11.2793 14.2988 11.2793L16.2178 11.2822V7.72168H13.1025C9.32812 7.72168 7.16309 9.99023 7.16309 13.9453V18.8076C7.16309 21.3252 6.47656 22.0615 4 22.0977V25.9023C6.47656 25.9385 7.16309 26.6748 7.16309 29.1914V34.0547C7.16309 38.0098 9.32812 40.2783 13.1025 40.2783H16.2178V36.7178L14.2988 36.7207C12.6172 36.7207 11.6123 35.5547 11.6123 33.6025V28.8096C11.6123 27.1494 11.251 25.125 8.43262 24.1895L7.86133 24L8.43262 23.8105C11.251 22.875 11.6123 20.8506 11.6123 19.1904V14.3965Z' stroke='' stroke-width='2' fill='%23fff'/%3E%3C/svg%3E");\n  					transform: scale(0.9);\n  			}\n  	}\n  	`
);
let profileCSS = webpackify(CSS);
function addProfileCSS() {
	betterdiscord.DOM.addStyle("profileCSS", profileCSS);
	betterdiscord.Utils.forceLoad(betterdiscord.Webpack.getBySource(`"USER_PROFILE_MODAL_KEY:".concat`, { raw: true }).id).then((r) => {
		Object.assign(styles, betterdiscord.Webpack.getByKeys("background", "content", "safetyTable"));
		profileCSS = webpackify(CSS);
		betterdiscord.DOM.addStyle("profileCSS", profileCSS);
	});
}
function webpackify(css) {
	for (const key in styles) {
		let regex = new RegExp(`\\.${key}([\\s,.):>])`, "g");
		css = css.replace(regex, `.${styles[key]}$1`);
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
	const [tab, setTab] = react.useState(tabs.ABOUT);
	const ref = react.useRef(null);
	const detailsCheck = react.useMemo(
		() => {
			if (!data.displayProfile._userProfile) return null;
			return data.displayProfile._userProfile;
		},
		[data.displayProfile._userProfile]
	);
	if (!detailsCheck) return;
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
			{ className: "inner" },
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
		betterdiscord.Patcher.after(entireProfileModal.Z, "render", (that, [props], res) => {
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
			)),
			react.createElement(
				betterdiscord.Components.SettingGroup,
				{
					name: "Server Profile Settings",
					collapsible: true,
					shown: false,
					children: react.createElement(() => Object.keys(settings.serverCategory).map((key) => {
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
				}
			)
		];
	}
}

module.exports = NewOldProfiles;

/*@end@*/