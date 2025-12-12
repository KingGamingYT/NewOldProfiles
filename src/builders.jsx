import { Webpack, Data, Utils, ContextMenu } from 'betterdiscord';
import { useState, useRef, useEffect, useLayoutEffect, useMemo, Suspense } from 'react';
import {
    AccessibilityStore,
    ApplicationStore, 
    ActivityStore,
    DetectableGameSupplementalStore, 
    UserStore, 
    StreamStore, 
    VoiceStateStore, 
    RelationshipStore, 
    GuildStore, 
    GuildMemberStore, 
    UserProfileStore,
    StreamerModeStore, 
    useStateFromStores, 
    MutualServerRenderer, 
    MutualFriendRenderer, 
    NavigationUtils, 
    ModalAccessUtils, 
    ModalRoot,
    intl,
    AnchorClasses,
    ButtonClasses,
    FetchGames,
    FetchApplications, 
    IconUtils, 
    AvatarFetch, 
    RoleRenderer,
    BotTagRenderer, 
    TagGuildRenderer, 
    Tooltip,
    OrbTooltip,
    Popout,
    PopoutContainer,
    ModalSystem,
    Board,
    TagRenderer,
    DisplayNameStyleConfigurator,
    GameProfile,
    OpenUserSettings,
    PopUtils,
    MessageButtonLarge,
    MessageButtonSmall,
    FriendsButton,
    MoreOverflowButton,
    FriendAddButton,
    EditProfileButton,
    RelationshipUtils,
    BlockToasts
} from "./modules";
import { tabs } from "./globals";
import { CustomCards, ActivityCards, SpotifyCards, TwitchCards } from "./presence"

export const TooltipBuilder = ({ note, position, children }) => {
    return (
        <Tooltip text={note} position={position || "top" }>
            { props => {
                children.props = {
                    ...props,
                    ...children.props
                };
                return children;
            }}
        </Tooltip>
    )
}

/* Lazy-Loaded Components */
let MarkdownFormat;
let NoteRenderer;
let ConnectionRenderer;
let BotDataRenderer;

function MarkdownComponent({userBio}) {
    MarkdownFormat ??= Webpack.getByStrings('userBio', 'markup');

    return <MarkdownFormat className="userBio" userBio={userBio}/>
}
function NoteComponent({userId}) {
    NoteRenderer ??= Webpack.getByStrings('hidePersonalInformation', 'onUpdate', 'placeholder');

    return <NoteRenderer className="note" userId={userId}/>
}
function ConnectionComponent({connectedAccount, userId}) {
    ConnectionRenderer ??= Webpack.getByStrings('connectedAccount', 'connectedAccountOpenIcon', 'CONNECTED_ACCOUNT_VIEWED', {searchExports: true});

    return <ConnectionRenderer className="connectedAccount" connectedAccount={connectedAccount} userId={userId} showMetadata={false} />
}
function BotDataComponent({user}) {
    BotDataRenderer ??= Webpack.getByStrings('user', 'hasMessageContent', 'hasGuildPresences');

    return <BotDataRenderer user={user} />
}

function BlockedPopout({userId, close}) {
    return (
        <ContextMenu.Menu navId="blocked-overflow" onClose={close}>
            <ContextMenu.Item id="user-context-block" label={intl.intl.formatToPlainString(intl.t['Hro40y'])} action={() => { return RelationshipUtils.unblockUser(userId); BlockToasts.showUnblockSuccessToast(userId) }} />
        </ContextMenu.Menu>
    )
}

function HeaderButtonBuilder({currentUser, relationshipType, user}) {
    const [showPopout, setShowPopout] = useState(false);
    const refDOM = useRef(null);

    if (user.id === currentUser.id) {
        return (
            <>
                <EditProfileButton user={user} />
                <MoreOverflowButton.wV user={user} />
            </>
        )
    }
    switch (relationshipType) {
        case 0: return (
            <>
                <FriendAddButton autoFocus={true} userId={user.id} variant={"primary"} />
                <MessageButtonSmall onCLose={() => PopUtils.popAll()} userId={user.id} variant={"secondary"} />
                <MoreOverflowButton.wV user={user} />
            </>
        );
        case (1 || 4): return (
            <>
                <MessageButtonLarge autoFocus={true} onClose={() => PopUtils.popAll()} userId={user.id} />
                <FriendsButton relationshipType={relationshipType} shouldShowTooltip={true} type={"icon"} themeColor={"secondary"} user={user} />
                <MoreOverflowButton.wV user={user} />
                
            </>
        );
        case 2: return (
            <>
                <Popout 
                    targetElementRef={refDOM}
                    clickTrap={true}
                    onRequestClose={ () => setShowPopout(false) } 
                    renderPopout={ () => <PopoutContainer position="right"><BlockedPopout userId={user.id} close={ () => setShowPopout(false) } /></PopoutContainer> } 
                    position="right" 
                    shouldShow={showPopout}>
                    {(props) => <span
                        {...props}  
                        ref={refDOM} 
                        onClick={ () => { setShowPopout(true) }}>
                        <TooltipBuilder note={intl.intl.formatToPlainString(intl.t['UKOtz+'])}>
                            <div className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary}`} type={"button"}>
                                <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                                    <div className={`${ButtonClasses.buttonChildren}`}>
                                        <svg className={`${ButtonClasses.icon}`} role="img" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </TooltipBuilder>
                    </span>}
                </Popout>
            </>
        )
        case 3: return (
            <>
                <button 
                    className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText} ${ButtonClasses.active}`} 
                    type={"button"}
                    onClick={() => RelationshipUtils.acceptFriendRequest({userId: user.id})}>
                    <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                        <div className={`${ButtonClasses.buttonChildren}`}>
                            <div style={{fontSize: "14px", fontWeight: "500"}}>{intl.intl.formatToPlainString(intl.t['MMlhsr'])}</div>
                        </div>
                    </div>
                </button>
                <button 
                    className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.secondary} ${ButtonClasses.hasText} primaryFilled`} 
                    type={"button"}
                    onClick={() => RelationshipUtils.cancelFriendRequest({userId: user.id})}>
                    <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                        <div className={`${ButtonClasses.buttonChildren}`}>
                            <div style={{fontSize: "14px", fontWeight: "500"}}>{intl.intl.formatToPlainString(intl.t['xuio0C'])}</div>
                        </div>
                    </div>
                </button>
                <MessageButtonSmall onCLose={() => PopUtils.popAll()} userId={user.id} variant={"secondary"} />
                <MoreOverflowButton.wV user={user} />
            </>
        )
    }
}

function BadgeBuilder({badge, index, id}) {
    const activities = useStateFromStores([ ActivityStore ], () => ActivityStore.getActivities(id)).filter(activity => activity && !([4, 6].includes(activity?.type)));
    const voice = useStateFromStores([ VoiceStateStore ], () => VoiceStateStore.getVoiceStateForUser(id)?.channelId);
    const stream = useStateFromStores([ StreamStore ], () => StreamStore.getAnyStreamForUser(id));
    const links = ['staff', 'partner', 'certified_moderator', 'hypesquad', 'bug_hunter_level_1', 'bug_hunter_level_2', 'bot_commands'];
    const routes = ['quest_completed', 'orb_profile_badge'];
    const settings = ['early_supporter', 'premium', 'guild_booster'];
    const settingsMatch = settings.filter(x => badge.id.includes(x));
    return (
        <div className="profileBadgeWrapper">
            <TooltipBuilder note={badge.id.includes('orb_profile_badge') ? <OrbTooltip showSubtext={true} /> : badge.description}>
                <a 
                    tabIndex={index+1} 
                    className={`${AnchorClasses.anchor} ${AnchorClasses.anchorUnderlineOnHover}`} 
                    role={"button"} 
                    href={links.includes(badge.id) && badge?.link}
                    rel="noreferrer noopener"
                    target="_blank"
                    onClick={() => 
                        routes.includes(badge.id) ? (() => { NavigationUtils.transitionTo(badge.id.includes('orb_profile_badge') ? '/shop?tab=orbs' : badge?.link?.substring(badge?.link?.indexOf('m')+1)); ModalSystem.closeAllModals()})()
                        : settingsMatch.length && OpenUserSettings.openUserSettings((() => {
                            if (settings.some(setting => settingsMatch.includes(setting))) return "nitro_panel";
                        })())
                    }>
                    <div 
                        className={Utils.className((activities.length !== 0 || voice || stream) && "richBadge", "profileBadge", `profileBadge${badge.id.charAt(0).toUpperCase() + badge.id.toLowerCase().replace(/_(.)/g, (group) => group[1].toUpperCase()).slice(1)}`)} 
                    />
                </a>
            </TooltipBuilder>
        </div>
    )
}


function BadgesBuilder({badges, style, id}) {
    if (!badges) {
        return;
    }

    return (
        <div className="profileBadges" style={style}>
            {
                badges.map((badge, index) => <BadgeBuilder badge={badge} index={index} id={id} />)
            }
        </div>
    )
}

function BioBuilder({displayProfile}) {
    if (displayProfile?._guildMemberProfile?.bio && Data.load('serverBio')) {
        return [
            <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['61W33d'])}</div>,
            <MarkdownComponent userBio={displayProfile.bio} />
        ]
    }
    else if (displayProfile._userProfile.bio) {
        return [
            <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['61W33d'])}</div>,
            <MarkdownComponent userBio={displayProfile._userProfile.bio} />
        ]
    }
    return;
}

function RoleBuilder({user, data}) {
    if (!data?.guildId || !Data.load('showRoles')) {
        return;
    }
    const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
    if (!serverMember || serverMember?.roles?.length === 0) {
        return;
    }
    return [
        serverMember?.roles?.length !== 1 ? <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['2SZsWX'])}</div> 
        : <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['XPGZXP'])}</div>,
        <RoleRenderer user={user} currentUser={data.currentUser} guild={GuildStore.getGuild(data?.guildId)} />
    ]
}

function MemberDateBuilder({data, user}) {
    const server = GuildStore.getGuild(data?.guildId);
    const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
    const serverDate = new Date(serverMember?.joinedAt);
    return (
        <>
            <div className="memberSince" style={{ color: "var(--text-default)" }}>{user.createdAt.toString().substring(3, 7) + " " + user.createdAt.getDate() + ", " + user.createdAt.toString().substring(11, 15)}</div>,
            { data?.guildId && serverMember &&
                <>
                    <div className="divider" />
                    <TooltipBuilder note={server.name}>
                        <div className="guildIcon">
                            <img src={ IconUtils.getGuildIconURL(server) + 'size=16' } />
                        </div>
                    </TooltipBuilder>
                    <div className="memberSinceServer" style={{ color: "var(--text-default)" }}>{serverDate.toString().substring(3, 7) + " " + serverDate.getDate() + ", " + serverDate.toString().substring(11, 15)}</div>
                </>
            }
        </>
    )
}

function ClanTagBuilder({user}) {
    const [showPopout, setShowPopout] = useState(false);
    const refDOM = useRef(null);
    return (
        <div 
            className="clanTagContainer">
            <Popout 
                targetElementRef={refDOM}
                clickTrap={true}
                onRequestClose={ () => setShowPopout(false) } 
                renderPopout={ () => <TagGuildRenderer guildId={user.primaryGuild?.identityGuildId}/> } 
                position="right" shouldShow={showPopout}>
                {(props) => <div 
                    {...props} 
                    className="clanTag" 
                    ref={refDOM} 
                    onClick={ () => { setShowPopout(true) }}>
                    <div 
                        className="clanTagInner">
                        <img 
                            className="tagBadge" 
                            src={ 'https://cdn.discordapp.com/clan-badges/' + user.primaryGuild?.identityGuildId + '/' + user.primaryGuild?.badge + '.png?size=16' }
                        />
                        <div 
                            className="tagName"
                            style={{ 
                                color: "var(--text-default)", 
                                lineHeight: "16px", 
                                fontWeight: "600", 
                                fontSize: "14px" 
                            }}>
                            {user.primaryGuild?.tag}
                        </div>
                    </div>
                </div>}
            </Popout>
        </div>
    )
}

function FallbackCover(game) {
    return (
        <div className="gameCover">
            <div className="fallback gameCover">
                <div className="coverFallbackText">{game?.name || "Unknown Game"}</div>
            </div>
        </div>
    )
}

function FavoriteWidgetBuilder({widget, game}) {
    const [loading, setLoading] = useState(() => true);
    
    const imageURL = useStateFromStores([ DetectableGameSupplementalStore ], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
    const image = useMemo(() => new Image(), []);

    const ref = useRef(null);

    useLayoutEffect(() => { FetchGames.getDetectableGamesSupplemental([game?.id]); }, [game?.id]);
    
    useLayoutEffect(() => {
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

        return () => {delete image.onload;};
    }, [imageURL]);

    return (
        <div className="widgetCard" ref={ref}>
            <TooltipBuilder note={game?.name}> 
                { loading ? <FallbackCover game={game} /> : <div className="gameCover hoverActiveEffect"
                onClick={() => GameProfile.openGameProfileModal({
                    applicationId: game?.id,
                    gameProfileModalChecks: {
                        shouldOpenGameProfile: true,
                        applicationId: game?.id
                    },
                    source: "tony",
                    sourceUserId: UserStore.getCurrentUser().id,
                    appContext: {}    
                })}>
                    <img 
                        alt={game?.name} 
                        className="gameCover" 
                        style={{ objectFit: "cover" }} 
                        src={`${image.src}`}
                    />
                </div>}
            </TooltipBuilder>
            <div className="widgetDetails">
                <h3 className="widgetTitle">{game?.name || "Unknown Game"}</h3>
                { widget.games[0].comment && <div role="group">
                    <svg 
                        className="commentIcon" 
                        role="img" 
                        width="12" 
                        height="12" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        ><path
                            fill="var(--icon-tertiary)"
                            d="M2.35 19.44A4.75 4.75 0 0 0 6.07 21c1.43 0 2.58-.43 3.44-1.3.9-.9 1.35-2.06 1.35-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0C2.89 6.78 1 10.64 1 15.02c0 1.9.45 3.38 1.35 4.42ZM14.16 19.44A4.75 4.75 0 0 0 17.88 21c1.43 0 2.58-.43 3.45-1.3.9-.9 1.34-2.06 1.34-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0c-3.77 3.36-5.66 7.22-5.66 11.6 0 1.9.45 3.38 1.35 4.42Z"
                        />    
                        </svg>
                        <div className="widgetTitle widgetSubtitle" style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>{widget.games[0].comment}</div>
                    </div> }
            </div>   
        </div>
    )
}

function ShelfWidgetBuilder({game}) {
    const [loading, setLoading] = useState(() => true);
    
    const imageURL = useStateFromStores([ DetectableGameSupplementalStore ], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
    const image = useMemo(() => new Image(), []);

    const ref = useRef(null);

    useLayoutEffect(() => { FetchGames.getDetectableGamesSupplemental([game?.id]); }, [game?.id]);
    
    useLayoutEffect(() => {
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

        return () => {delete image.onload;};
    }, [imageURL]);

    return (
        <div style={{ position: "relative" }}>
            <TooltipBuilder note={game?.name}>
                {loading ? <FallbackCover game={game} /> : <div className="gameCover hoverActiveEffect"
                onClick={() => GameProfile.openGameProfileModal({
                    applicationId: game?.id,
                    gameProfileModalChecks: {
                        shouldOpenGameProfile: true,
                        applicationId: game?.id
                    },
                    source: "tony",
                    sourceUserId: UserStore.getCurrentUser().id,
                    appContext: {}    
                })}>
                    <img 
                        alt={game?.name} 
                        className="gameCover hoverActiveEffect" 
                        style={{ objectFit: "cover" }} 
                        src={`${image.src}`}
                    />
                </div>}
            </TooltipBuilder>
        </div>
    )
}

function CurrentWidgetBuilder({widget, game, index}) {
    const [loading, setLoading] = useState(() => true);
    
    const imageURL = useStateFromStores([ DetectableGameSupplementalStore ], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
    const image = useMemo(() => new Image(), []);

    const ref = useRef(null);

    useLayoutEffect(() => { FetchGames.getDetectableGamesSupplemental([game?.id]); }, [game?.id]);
    
    useLayoutEffect(() => {
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

        return () => {delete image.onload;};
    }, [imageURL]);

    return (
        <div className="widgetCard" ref={ref}>
            <TooltipBuilder note={game?.name}> 
                { loading ? <FallbackCover game={game} /> : <div className="gameCover hoverActiveEffect"
                onClick={() => GameProfile.openGameProfileModal({
                    applicationId: game?.id,
                    gameProfileModalChecks: {
                        shouldOpenGameProfile: true,
                        applicationId: game?.id
                    },
                    source: "tony",
                    sourceUserId: UserStore.getCurrentUser().id,
                    appContext: {}    
                })}>
                    <img 
                        alt={game?.name} 
                        className="gameCover" 
                        style={{ objectFit: "cover" }} 
                        src={`${image.src}`}
                    />
                </div>}
            </TooltipBuilder>
            <div className="widgetDetails">
                <h3 className="widgetTitle">{game?.name || "Unknown Game"}</h3>
                { widget.games[index].tags && <Suspense><TagRenderer tags={widget.games[index].tags} widgetType={widget.type} className={"tagListContainer"} /></Suspense> }
            </div>   
        </div>
    )
}

function WidgetBuilder({widget}) {
    const gameIds = widget.games.map(game => game.applicationId);
    let header;
    if (widget.type.includes("favorite_games")) header = 'sUQar8';
    else if (widget.type.includes("played_games")) header = 'scOKET';
    else if (widget.type.includes("want_to_play_games")) header = 'bWSQwW';
    else if (widget.type.includes("current_games")) header = 'SqNnus';

    useEffect(() => { 
        (async () => {
            await FetchApplications.fetchApplications(gameIds);
        })()
    }, [gameIds]);
    const games = useStateFromStores([ ApplicationStore ], () =>  gameIds.map(id => ApplicationStore.getApplication(id)));
    return (
        <div className="userInfoSection">
            <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t[header])}</div>
            { widget.type.includes("favorite_games") &&
                <FavoriteWidgetBuilder widget={widget} game={games[0]} />
            }
            { (widget.type.includes("played_games") || widget.type.includes("want_to_play_games")) &&
                <div className="widgetCoverList">
                    {
                        widget.games.map((game, index) => <ShelfWidgetBuilder game={games[index]} />)
                    }
                </div> 
            }
            { widget.type.includes("current_games") &&
                <div className="cardList">
                    {
                        widget.games.map((game, index) => <CurrentWidgetBuilder widget={widget} game={games[index]} index={index} />)
                    }
                </div>
            }
        </div>
    )
}

function ConnectionCards({user, connections}) {
    if (!connections.length == 0) {
        return (
            <div className="connectedAccounts">
                { connections.map(connection => <ConnectionComponent connectedAccount={connection} userId={user.id}/>) }
            </div>
        )
    }
    return;
}
export function activityCheck({activities}) {
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

export function userVoice({voice}) {
    let participants = [];
    const channelParticipants = Object.keys(VoiceStateStore.getVoiceStatesForChannel(voice));
    for (let i = 0; i < channelParticipants.length; i++) {
        participants.push(UserStore.getUser(channelParticipants[i]))
    }
    return participants;
}

function TabBarBuilder({user, displayProfile, currentUser, tab, setTab, ref}) {
    if (user.id === currentUser.id) return;
    return (
        <div 
            className="tabBarContainer" 
            style={{ 
                borderTop: "1px solid hsla(0, 0%, 100%, .1", 
                paddingLeft: "20px"
            }}>
            <div 
                className="tabBar" 
                style={{
                    display: "flex", 
                    alignItems: "stretch", 
                    height: "55px", 
                    flexDirection: "row"
                }}>
                <div 
                    className="tabBarItem" 
                    tabIndex={0} 
                    aria-selected={tab === tabs.ABOUT} 
                    aria-controls="about-tab" 
                    onClick={() => {
                        setTab(tabs.ABOUT); 
                        ref.current?.scrollTo(0, 0)
                    }}>
                        { 
                            user.bot ? intl.intl.formatToPlainString(intl.t['AOdOYr']) + " " + intl.intl.formatToPlainString(intl.t['HY+vdA'])
                            : intl.intl.formatToPlainString(intl.t['E466pL']).substring(0,1).toUpperCase() + intl.intl.formatToPlainString(intl.t['E466pL']).substring(1) + " " + intl.intl.formatToPlainString(intl.t['HY+vdA']) 
                        }
                </div>
                { Data.load('boardTab') && displayProfile.widgets?.length > 0 &&
                    <div 
                        className="tabBarItem" 
                        tabIndex={1} 
                        aria-selected={tab === tabs.BOARD} 
                        aria-controls="board-tab" 
                        onClick={() => {
                            setTab(tabs.BOARD); 
                            ref.current?.scrollTo(0, 0)
                        }}>
                            { intl.intl.formatToPlainString(intl.t['laViwx']) }
                    </div>
                }
                <div 
                    className="tabBarItem" 
                    tabIndex={Data.load('boardTab') && displayProfile.widgets?.length ? 2 : 1} 
                    aria-selected={tab === tabs.SERVERS} 
                    aria-controls="servers-tab" 
                    onClick={() => {
                        setTab(tabs.SERVERS); 
                        ref.current?.scrollTo(0, 0)
                    }}>
                        { intl.intl.formatToPlainString(intl.t['sySsXR']) }
                </div>
                { user.bot ? 
                    <div 
                        className="tabBarItem" 
                        tabIndex={2} 
                        aria-selected={tab === tabs.DATA} 
                        aria-controls="data-access-tab" 
                        onClick={() => {
                            setTab(tabs.DATA); 
                            ref.current?.scrollTo(0, 0)
                        }}>
                            { intl.intl.formatToPlainString(intl.t['QzDgMq']) }
                    </div>
                    :
                    <div 
                        className="tabBarItem" 
                        tabIndex={Data.load('boardTab') && displayProfile.widgets?.length ? 3 : 2} 
                        aria-selected={tab === tabs.FRIENDS} 
                        aria-controls="friends-tab" 
                        onClick={() => {
                            setTab(tabs.FRIENDS); 
                            ref.current?.scrollTo(0, 0)
                        }}>
                            { intl.intl.formatToPlainString(intl.t['afBKs5']) }
                    </div>
                }
            </div>       
        </div>
    )
}

function HeaderInnerBuilder({user, currentUser, displayProfile, tagName, displayName}) {
    return (
        <header className="header">
            <AvatarFetch className="avatar" user={user} />
            <div className="headerInfo">
                <div className="nameSection">
                    { 
                        AccessibilityStore.displayNameStylesEnabled && user?.displayNameStyles ? 
                        <DisplayNameStyleConfigurator.type 
                            userName={ displayName || tagName } 
                            displayNameStyles={ user.displayNameStyles } 
                            inProfile={1}
                            textClassName="displayName" 
                        />
                        : <div className="displayName">{ displayName || tagName }</div>
                    }
                    {
                        !StreamerModeStore.hidePersonalInformation && (
                            !Data.load('disableDiscrim') && displayProfile._userProfile?.legacyUsername 
                            ? <div 
                                className="nameTag" 
                                style={{ marginLeft: "-5px" }}>
                                {displayProfile._userProfile?.legacyUsername?.substring(displayProfile._userProfile?.legacyUsername?.indexOf("#"))}
                            </div> 
                            : user.bot 
                            ? <div 
                                className="nameTag"
                                style={{ marginLeft: "-5px" }}>
                                {"#" + user.discriminator}
                            </div>    
                            :
                            <div 
                                className="nameTag">
                                { "@" + tagName }
                            </div>
                        )
                    }
                    { 
                        user.bot && <BotTagRenderer.Z 
                            className="botTag" 
                            type={user.system ? BotTagRenderer.Z.Types.OFFICIAL : BotTagRenderer.Z.Types.BOT} 
                            verified={user.publicFlags & (1<<16)}
                        />
                    }
                </div>
                { 
                    user.primaryGuild?.tag && Data.load('showGuildTag') ? <div className="badgeSection" style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                        <ClanTagBuilder user={user} />
                        {[
                            displayProfile._userProfile.badges && displayProfile._userProfile.badges.length !== 0 && <div className="divider" style={{ margin: "0 5px 0 5px" }} />,
                            <BadgesBuilder badges={displayProfile._userProfile.badges} style={{ display: "contents" }} id={user.id} />
                        ]}
                    </div>
                    : <BadgesBuilder badges={displayProfile._userProfile.badges} style={{ display: "flex", flexWrap: "wrap" }} id={user.id}/>
                }
            </div>
            <div className="profileButtons">
                <HeaderButtonBuilder currentUser={currentUser} relationshipType={RelationshipStore.getRelationshipType(user.id)} user={user} />
            </div>
        </header>
    )
}

export function headerBuilder({props, user, currentUser, displayProfile, tab, setTab, ref}) {
    const tagName = user.username;
    const displayName = user.globalName;
    const activities = useStateFromStores([ ActivityStore ], () => ActivityStore.getActivities(user.id));
    const check = activityCheck({activities});
    const voice = useStateFromStores([ VoiceStateStore ], () => VoiceStateStore.getVoiceStateForUser(user.id)?.channelId);
    const stream = useStateFromStores([ StreamStore ], () => StreamStore.getAnyStreamForUser(user.id));

    if (activities.length !== 0 && (check.playing || check.listening || check.watching || check.competing) && (!check.spotify && !check.streaming && !check.xbox) || voice !== undefined) {
        return (
            <div className="topSectionPlaying" style={{backgroundColor: "var(--background-brand)"}}>
                { displayProfile.banner && 
                    <img 
                        className="userBanner" 
                        src={displayProfile.getBannerURL({canAnimate: true})} 
                        style={{
                            width: "600px", 
                            height: "200px"
                        }} 
                        alt=""
                    /> 
                }
                <HeaderInnerBuilder
                    user={user} 
                    currentUser={currentUser} 
                    displayProfile={displayProfile} 
                    tagName={tagName} 
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCards 
                        className= "activity" 
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <ActivityCards 
                            user={user} 
                            activities={activities} 
                            voice={voice} 
                            stream={stream}
                            check={check} 
                        />
                    </div>
                    <TabBarBuilder 
                        user={user}
                        displayProfile={displayProfile} 
                        currentUser={currentUser} 
                        tab={tab} 
                        setTab={setTab} 
                        ref={ref}
                    />
                </div>
            </div>
        )
    }
    else if (activities.length !== 0 && check.streaming || voice !== undefined) {
        return (
            <div className="topSectionStreaming" style={{backgroundColor: "#593695"}}>
                { displayProfile.banner && 
                    <img 
                        className="userBanner" 
                        src={displayProfile.getBannerURL({canAnimate: true})} 
                        style={{
                            width: "600px", 
                            height: "200px"
                        }} 
                        alt=""
                    /> 
                }
                <HeaderInnerBuilder
                    user={user} 
                    currentUser={currentUser} 
                    displayProfile={displayProfile} 
                    tagName={tagName} 
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCards 
                        className= "activity" 
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <TwitchCards 
                            user={user} 
                            activities={activities} 
                        />
                        <ActivityCards 
                            user={user} 
                            activities={activities} 
                            check={check} 
                        />
                    </div>
                    <TabBarBuilder 
                        user={user} 
                        displayProfile={displayProfile}
                        currentUser={currentUser} 
                        tab={tab} 
                        setTab={setTab} 
                        ref={ref}
                    />
                </div>
            </div>
        )
    }
    else if (activities.length !== 0 && check.spotify || voice !== undefined) {
        return (
            <div className="topSectionSpotify" style={{backgroundColor: "#1db954"}}>
                { displayProfile.banner && 
                    <img 
                        className="userBanner" 
                        src={displayProfile.getBannerURL({canAnimate: true})} 
                        style={{
                            width: "600px", 
                            height: "200px"
                        }} 
                        alt=""
                    /> 
                }
                <HeaderInnerBuilder
                    user={user} 
                    currentUser={currentUser} 
                    displayProfile={displayProfile} 
                    tagName={tagName} 
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCards 
                        className= "activity" 
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <SpotifyCards 
                            user={user} 
                            activities={activities} 
                        />
                        <ActivityCards 
                            user={user} 
                            activities={activities} 
                            check={check} 
                        />
                    </div>
                    <TabBarBuilder 
                        user={user}
                        displayProfile={displayProfile} 
                        currentUser={currentUser} 
                        tab={tab} 
                        setTab={setTab} 
                        ref={ref}
                    />
                </div>
            </div>
        )
    }   
    else if (activities.length !== 0 && check?.xbox || voice !== undefined) {
        return (
            <div className="topSectionXbox" style={{backgroundColor: "#107c10"}}>
                { displayProfile.banner && 
                    <img 
                        className="userBanner" 
                        src={displayProfile.getBannerURL({canAnimate: true})} 
                        style={{
                            width: "600px", 
                            height: "200px"
                        }} 
                        alt=""
                    /> 
                }
                <HeaderInnerBuilder
                    user={user} 
                    currentUser={currentUser} 
                    displayProfile={displayProfile} 
                    tagName={tagName} 
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCards 
                        className= "activity" 
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <ActivityCards 
                            user={user} 
                            activities={activities} 
                            check={check} 
                        />
                    </div>
                    <TabBarBuilder 
                        user={user}
                        displayProfile={displayProfile} 
                        currentUser={currentUser} 
                        tab={tab} 
                        setTab={setTab} 
                        ref={ref}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className="topSectionNormal" style={{backgroundColor: "var(--background-tertiary, var(--background-base-lowest))"}}>
            { displayProfile.banner && 
                <img 
                    className="userBanner" 
                    src={displayProfile.getBannerURL({canAnimate: true})} 
                    style={{
                        width: "600px", 
                        height: "200px"
                    }} 
                    alt=""
                /> 
            }
            <HeaderInnerBuilder
                user={user} 
                currentUser={currentUser} 
                displayProfile={displayProfile} 
                tagName={tagName} 
                displayName={displayName}
            />
            <CustomCards 
                className= "activity" 
                activities={activities}
            />
            <TabBarBuilder 
                user={user}
                displayProfile={displayProfile} 
                currentUser={currentUser} 
                tab={tab} 
                setTab={setTab} 
                ref={ref}
            />
        </div>
    );
}

function AboutTab({data, user, displayProfile}) {
    const connections = displayProfile._userProfile.connectedAccounts;
    if (StreamerModeStore.hidePersonalInformation) {
        return (
            <div className="infoScroller scrollerBase" style={{ overflow: "hidden scroll", paddingRight: "12px"}}>
                <div className="empty">
                    <div className="emptyIconStreamerMode emptyIcon" />
                    <div className="emptyText">{intl.intl.formatToPlainString(intl.t['Br1ls3'])}</div>
                </div>
            </div>
        )
    }
    return (
        <div className="infoScroller scrollerBase" style={{ overflow: "hidden scroll", paddingRight: "12px"}}>
            { displayProfile?.pronouns && <div className="userInfoSection">
                <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['1w6drw'])}</div>
                <div className="userPronouns" style={{ color: "var(--text-default)", fontSize: "14px" }}>{displayProfile.pronouns}</div>
            </div> }
            <div className="userInfoSection">
                <BioBuilder displayProfile={displayProfile} /> 
            </div>
            <div className="userInfoSection">
                <RoleBuilder user={user} data={data} displayProfile={displayProfile} />
            </div>
            <div className="userInfoSection">
                <div className="userInfoSectionHeader">{user.bot ? intl.intl.formatToPlainString(intl.t['A//N4k']) : intl.intl.formatToPlainString(intl.t['xcKP1P'])}</div>
                <div className="memberSinceWrapper" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {MemberDateBuilder({data, user})}
                </div>
            </div>
            <div className="userInfoSection">
                <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['PbMNh2'])}</div>
                <NoteComponent userId={user.id} />
            </div>
            { Data.load('boardTab') && user.id === data.currentUser.id && <div className="userInfoSection" style={{ paddingBottom: "20px" }}>
                <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['Jzj9q4'])}</div>
                <button 
                    className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.primary} ${ButtonClasses.hasText}`} 
                    onClick= { () => ModalSystem.openModal((props) => 
                        <ModalRoot.Modal {...props} title={intl.intl.formatToPlainString(intl.t['Jzj9q4'])}>
                            <Board user={user} />
                        </ModalRoot.Modal>
                    )}>
                    <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                        <div className={`${ButtonClasses.buttonChildren}`} style={{ fontSize: "14px" }}>{intl.intl.formatToPlainString(intl.t['Geikwq'])}</div>
                    </div>
                </button>
            </div> }
            <div className="userInfoSection" style={{ borderTop: "1px solid var(--background-modifier-accent, var(--background-modifider-active))" }}>
                <ConnectionCards user={user} connections={connections} />
            </div>
            <div aria-hidden={true} style={{ pointerEvents: "none", minHeight: "0px", minWidth: "1px", flex: "0 0 auto", height: "8px" }}></div>
        </div>
    )
}

function BoardTab({data, user, displayProfile}) {
    const widgets = displayProfile.widgets;

    if (!widgets.length && user.id !== data.currentUser.id) return;
    return (
        <div className="infoScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
            {[
                widgets.map(widget => <WidgetBuilder widget={widget} />)
            ]}
        </div>
    )
}

function ServersTab({data, user}) {
    const mutualServers = UserProfileStore.getMutualGuilds(user.id);
    if (!mutualServers?.length == 0) {
        return (
            <div className="listScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
                {
                    mutualServers.map(mutual => <MutualServerRenderer
                        key={mutual.guild.id} 
                        user={user} 
                        guild={mutual.guild} 
                        nick={mutual?.nick} 
                        onSelect={ () => { NavigationUtils.transitionToGuild(mutual.guild.id); data.onClose() }}
                    />)
                }
            </div>
        )
    }
    return (
        <div className="listScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
            <div className="empty">
                <div className="emptyIconGuilds emptyIcon" />
                <div className="emptyText">{intl.intl.formatToPlainString(intl.t['zjVh8h'])}</div>
            </div>
        </div>
    )
}

function FriendsTab({data, user}) {
    const mutualFriends = UserProfileStore.getMutualFriends(user.id)
    if (!mutualFriends?.length == 0) {
        return (
            <div className="listScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
                {
                    mutualFriends.map(mutual => <MutualFriendRenderer 
                        user={mutual.user} 
                        status={mutual.status} 
                        guildId={mutual.displayProfile?.guildId} 
                        onSelect={ () => { ModalAccessUtils.openUserProfileModal({ userId: mutual.user.id }); data.onClose() }}
                    />)
                }
            </div>
        )
    }
    return (
        <div className="listScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
            <div className="empty">
                <div className="emptyIconFriends emptyIcon" />
                <div className="emptyText">{intl.intl.formatToPlainString(intl.t['/5p4gx'])}</div>
            </div>
        </div>
    )
}

function DataTab({user}) {
    return <BotDataComponent user={user} />
}

function FallbackTab() {
    return (
        <div className="listScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
            <img 
                className="emptyIcon"
                style={{ alignSelf: "center" }}
                src={'https://discord.com/assets/8c998f8fb62016fcfb4901e424ff378b.svg'}
            />
            <div className="emptyText" style={{ textAlign: "center" }}>{"You've found yourself in the fallback tab! Close and re-open the profile to try again!"}</div>
        </div>
    )
}

export function bodyBuilder({data, user, displayProfile, tab, ref}) {
    return (
        <div className="body" style={{ height: "240px", backgroundColor: "var(--background-secondary, var(--background-base-lower))" }} ref={ref} id={`${Object.keys(tabs).find(t => tabs[t] === tab).toLowerCase()}-tab`}>
            { tab === tabs.ABOUT
                ? <AboutTab data={data} user={user} displayProfile={displayProfile} />
                    : tab === tabs.BOARD
                        ? <BoardTab data={data} user={user} displayProfile={displayProfile} />
                            : tab === tabs.SERVERS
                                ? <ServersTab data={data} user={user} />
                                    : tab === tabs.FRIENDS
                                        ? <FriendsTab data={data} user={user} />
                                            : tab === tabs.DATA 
                                                ? <DataTab user={user} />
                                                    : <FallbackTab/>
            }
        </div>
    )
}