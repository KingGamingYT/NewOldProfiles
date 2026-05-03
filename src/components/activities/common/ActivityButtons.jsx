import { Webpack } from "betterdiscord";
import { ActivityCardClasses } from "@modules/common";
import { AuthenticationStore, useStateFromStores } from "@modules/stores";
import { locale } from '@common/locale';

const themeContext = Webpack.getBySource('themePreferenceForSystemTheme', 'createContext');
const activityAuth = Webpack.getByStrings('alpha2', 'embeddedActivityConfig', {searchExports: true});
const activityIdCheck = Webpack.getBySource('{return!!(0', ')(e)}}', {searchExports: true});
const getCTA = Webpack.getByStrings('ctaConfig', 'flatMap');
const fetchAuthorization = Webpack.getByStrings('parentId', 'disableFetch', {searchExports: true});
const CloudPlayButton = Webpack.getByStrings('"PRESS_CLOUD_PLAY_BUTTON"');
const isEmbeddedActivity = Webpack.getByStrings(".EMBEDDED", "{return(0,");
const isSupportedPlatform = Webpack.getByStrings('META_QUEST', 'supported_platforms');
const CTAButton = Webpack.getByStrings('distributorCTAConfigs', '"noopener,noreferrer"');
const isNonConsole = Webpack.getByStrings('.CUSTOM_STATUS&&(null');
const isXbox = Webpack.getByStrings('platform===', '.XBOX');
const isPlayStation = Webpack.getByStrings('platform===', '.PS5');
const XboxIcon = Webpack.getByStrings('M8.95185131');
const PlayStationIcon = Webpack.getByStrings('M17.7516');
const isStream = Webpack.getByStrings('Array.isArray(e)?e.some(');
const isJoinable = Webpack.getByStrings('JOIN)&&', '&&!!(0,', {searchExports: true});
const isInstance = Webpack.getByStrings('.INSTANCE&&null!=e');
const isStageChannel = Webpack.getByStrings('e?.application_id===', 'SS', {searchExports: true});
const ManaButtons = Webpack.getMangled(Webpack.Filters.bySource('SPINNING_CIRCLE', '__unsupportedReactNodeAsText', 'tooltipAlign', '"sm","aria-label"'), {
    PrimaryButtonWithIcon: x => String(x).includes('"sm",.'),
    PrimaryButtonLazy: x => String(x).includes('loading'),
    IconOnlyButton: x => String(x).includes('targetElementRef')
});
const ActivityMetadataUpdate = Webpack.getByStrings('USER_ACTIVITY_METADATA', 'ACTIVITY_METADATA_UPDATE', {searchExports: true});
const Parser = Webpack.getByKeys('formatPathWithQuery');
const sanitize = Webpack.getByStrings('sanitizeUrl', 'contextKey', {searchExports: true});
const ChannelContext = Webpack.getByStrings('.POPOUT', 'onClose', 'contextless');
const joinProps = Webpack.getByStrings('DispatchApplicationStore', 'embeddedActivity', {searchExports: true});
const getPlayableGame = Webpack.getByStrings('data', 'getOfficialGame' , 'null:null', {searchExports: true});
const SlashCommandIcon = Webpack.getByStrings('7.61c-.25.95.31', {searchExports: true});
const GameUtils = Webpack.getByKeys('launch', 'reportUnverifiedGame');
const ContainerTooltip = Webpack.getByStrings('asContainer', 'keyboardShortcut', {searchExports: true});
const DoorExitIcon = Webpack.getByStrings('"string"==typeof', '18.5V22a1', {searchExports: true});
const GameControllerIcon = Webpack.getByStrings('.09v4.91a3.09', {searchExports: true})

const getTrack = Webpack.getByStrings('USER_ACTIVITY_PLAY', 'spotifyData', {searchExports: true});
const getTrackSync = Webpack.getByStrings('USER_ACTIVITY_SYNC', 'spotifyData', {searchExports: true});
const hasParty = Webpack.getByStrings('LISTENING', 'SPOTIFY).name', {searchExports: true});
const SpotifyIcon = Webpack.getByStrings('M12.7609503,7.08043507', {searchExports: true});
const ListenAlongIcon = Webpack.getByStrings('0Zm-2.77-.2-3.33-2.5a.25', 'className', {searchExports: true});

function WidgetButton({applicationId, onAction, onClose}) {
    return;
}

async function ParseCustomButton({activity, user, index}) {
    try {
        const request = await ActivityMetadataUpdate(activity, user.id);
        if (request.button_urls.length <= index) return;
        const url = request.button_urls[index];
        if ("string" != typeof url) return;
        const parsed = Parser.safeParseWithQuery(url);
        if (!parsed?.protocol || !parsed?.hostname) return;
        sanitize({href: Parser.format(parsed), trusted: 0});
    }
    catch (e) {}
}

function CustomButton({user, activity, onAction}) {
    const {themeType} = themeContext.E();
    if (!activity?.buttons || activity.buttons.length < 1) return;
    const isCrunchyroll = activity?.application_id === "981509069309354054";
    return themeType === "MODAL_V2" ? <div className={ActivityCardClasses.customButtons}>{
        activity.buttons.map((button, index) => 
            <ManaButtons.PrimaryButtonWithIcon 
                text={isCrunchyroll ? locale.Strings.WATCH() : button} 
                onClick={(e) => {
                    e.stopPropagation();
                    onAction?.({
                        action: isCrunchyroll ? "PRESS_WATCH_ON_CRUNCHYROLL_BUTTON" : "PRESS_CUSTOM_BUTTON"
                    })();
                    ParseCustomButton({user, activity, index})
                }}
            />)
    }</div> : <div className={ActivityCardClasses.customButtons}>{
        activity.buttons.map((button, index) => 
        <ManaButtons.PrimaryButtonWithIcon
            text={isCrunchyroll ? locale.Strings.WATCH() : button}
            fullWidth={true}
            onClick={(e) => { 
                e.stopPropagation();
                onAction?.({
                    action: isCrunchyroll ? "PRESS_WATCH_ON_CRUNCHYROLL_BUTTON" : "PRESS_CUSTOM_BUTTON"
                });
                ParseCustomButton({user, activity, index})
            }}
        />)
    }</div>
}

function ConnectAccountButton({startAuthorization, onAction}) {
    return;
}

function ConsoleButton({platformType, icon, onAction}) {
    return;
}

function WatchStreamButton({activity, onAction}) {
    const {themeType} = themeContext.E();
    return;
}

function PlayButton({user, activity, onAction, onClose}) {
    const {themeType} = themeContext.E();
    const channelContext = ChannelContext({applicationId: activity?.application_id, onClose});
    const isJoinable = joinProps({activity, user, onClose});
    const isPlayable = getPlayableGame(activity?.application_id)
    if (!isJoinable && activity && isEmbeddedActivity(activity)) return <ManaButtons.PrimaryButtonWithIcon
        icon={() => <SlashCommandIcon color="currentColor" />}
        text={locale.Strings.PLAY()}
        fullWidth={themeType !== "MODAL_V2"}
        onClick={(e) => {
            e.stopPropagation();
            isPlayable ? GameUtils.launch({applicationId: isPlayable}) : onAction?.({action: "PRESS_PLAY_BUTTON"});
            channelContext();
        }}
    />
    if (!isJoinable) return;
    const {isJoining, handleJoinRequest, buttonCTA, tooltip, isEnabled, isEmbedded} = isJoinable;
    return <>
        <ContainerTooltip text={tooltip} asContainer={!isEnabled}>
            <ManaButtons.PrimaryButtonWithIcon
                icon={isEmbedded ? <DoorExitIcon /> : <GameControllerIcon />}
                text={buttonCTA}
                disabled={!isEnabled}
                loading={isJoining}
                fullWidth={themeType !== "MODAL_V2"}
                onClick={(e) => {
                    e.stopPropagation();
                    onAction?.({action: isEmbedded ? "PRESS_JOIN_BUTTON" : "PRESS_ASK_TO_JOIN_BUTTON"});
                    handleJoinRequest();
                }}
            />
        </ContainerTooltip>
    </>
}

function NotifyButton({user, activity, onAction}) {
    const {themeType} = themeContext.E();
    return;
}

function StageChannelListenButton({activity, onAction, onClose}) {
    const {themeType} = themeContext.E();
    return;
}

export function ActivityButtons({user, activity, onAction, onClose, application, containerClassName}) {
    const {themeType} = themeContext.E();
    const isSelf = useStateFromStores([AuthenticationStore], () => AuthenticationStore.getId() === user.id);
    const hasConfig = activityAuth(application);
    const idCheck = activityIdCheck.o(activity?.application_id ?? application?.id);
    const ctaButtons = getCTA("user_profile_activity_buttons", activity?.application_id);
    const {fetched, canStartAuthorization, hasAlreadyLinked, startAuthorization} = fetchAuthorization(application);
    const isModal = themeType === "MODAL" || themeType === "MODAL_V2";
    const isPopout = themeType === "POPOUT";
    const buttons = (() => {
        if (isSelf) return isPopout && activity?.type === 0 && application?.id ? <WidgetButton
            applicationId={application.id}
            onAction={onAction}
            onClose={onClose}
        /> : null;
        if (activity?.buttons && activity?.buttons.length >= 1) return <CustomButton 
            user={user}
            activity={activity}
            onAction={onAction}
        />
        if (!idCheck && hasConfig && application && !isModal) return <CloudPlayButton.A 
            application={application}
            onAction={onAction}
            onClose={onClose}
        />
        if (isEmbeddedActivity(activity) || isSupportedPlatform(activity) && idCheck) return <PlayButton 
            user={user}
            activity={activity}
            onAction={onAction}
            onClose={onClose}
        />
        if (fetched && canStartAuthorization && !hasAlreadyLinked) return <ConnectAccountButton 
            startAuthorization={startAuthorization}
            onAction={onAction}
        />
        if (ctaButtons.length > 0) return <CTAButton 
            distributorCTAConfigs={ctaButtons}
            fullWidth={themeType !== "MODAL_V2"}
            stopPropagation={true}
            onAction={onAction}
            onClose={onClose}
        />
        if (!isNonConsole(activity)) {
            if (isXbox(activity)) return <ConsoleButton 
                platformType={"xbox"}
                icon={() => <XboxIcon />}
                onAction={onAction}
            />
            if (isPlayStation(activity)) return <ConsoleButton 
                platformType={"playstation"}
                icon={() => <PlayStationIcon />}
                onAction={onAction}
            />
        }
        return (
            isStream(activity) ? <WatchStreamButton 
                activity={activity}
                onAction={onAction}
            /> : isJoinable(activity) ? <PlayButton 
                user={user}
                activity={activity}
                onAction={onAction}
                onClose={onClose}
            /> : isInstance(activity, 1) ? <NotifyButton 
                user={user}
                activity={activity}
                onAction={onAction}
            /> : isStageChannel(activity) ? <StageChannelListenButton 
                activity={activity}
                onAction={onAction}
                onClose={onClose}
            /> : null
        )
    })();
    return !buttons ? null : <div className={containerClassName}>{buttons}</div>
}

export function SpotifyButtons({user, activity, onAction}) {
    const {themeType} = themeContext.E();
    const track = getTrack(activity, user);
    const trackSync = getTrackSync(activity, user);
    if (!hasParty(activity) || !isInstance(activity, 32) && !isInstance(activity, 16)) return;
    const handleListenAlongOnClick = (e) => {
        e.stopPropagation();
        onAction?.({action: "PRESS_LISTEN_ALONG_ON_SPOTIFY_BUTTON"});
        trackSync.onClick();
    }
    const handlePlayOnClick = (e) => {
        e?.stopPropagation();
        onAction?.({action: "PRESS_PLAY_ON_SPOTIFY_BUTTON"});
        track.onClick();
    }
    return themeType === "MODAL_V2" ? <>
        <ContainerTooltip text={trackSync.tooltip}>
            <ManaButtons.PrimaryButtonWithIcon
                text={trackSync.label ?? locale.Strings.LISTEN_ALONG()}
                onClick={handleListenAlongOnClick}
                disabled={trackSync.disabled}
                loading={trackSync.loading}
            />
        </ContainerTooltip>
        <ContainerTooltip text={track.tooltip}>
            <ManaButtons.PrimaryButtonWithIcon 
                text={track.label ?? locale.Strings.PLAY_ON_SPOTIFY()}
                onClick={handlePlayOnClick}
                disabled={track.disabled}
                loading={track.loading}
            />
        </ContainerTooltip>
    </> : <>
        <div className={ActivityCardClasses.primaryButton}>
            <ContainerTooltip text={track.tooltip}>
                <ManaButtons.PrimaryButtonWithIcon
                    icon={() => <SpotifyIcon />} 
                    text={track.label ?? locale.Strings.PLAY_ON_SPOTIFY()}
                    onClick={handlePlayOnClick}
                    disabled={track.disabled}
                    loading={track.loading}
                    fullWidth={true}
                />
            </ContainerTooltip>
        </div>
        <ManaButtons.IconOnlyButton 
            icon={() => <ListenAlongIcon color={"currentColor"} />}
            tooltipText={trackSync.tooltip ?? locale.Strings.LISTEN_ALONG()}
            ariaLabel={trackSync.label ?? locale.Strings.LISTEN_ALONG()}
            disabled={trackSync.disabled}
            loading={trackSync.loading}
            fullWidth={true}
        />
    </>
}