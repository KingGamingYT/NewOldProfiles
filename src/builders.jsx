import { Webpack, Data } from 'betterdiscord';
import { useState, useRef } from 'react';
import { 
    ActivityStore, 
    UserStore, 
    StreamStore, 
    VoiceStateStore, 
    RelationshipStore, 
    GuildStore, 
    GuildMemberStore, 
    UserProfileStore, 
    useStateFromStores, 
    MutualServerRenderer, 
    MutualFriendRenderer, 
    NavigationUtils, 
    ModalAccessUtils, 
    intl, 
    IconUtils, 
    AvatarFetch, 
    RoleRenderer,
    BotTagRenderer, 
    TagGuildRenderer, 
    Tooltip, 
    Popout 
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
let ButtonFetch;
let MarkdownFormat;
let BadgeFetch;
let NoteRenderer;
let ConnectionRenderer;
let BotDataRenderer;

function ButtonComponent({user, currentUser, relationshipType}) {
    ButtonFetch ??= Webpack.getByStrings('gameFriends', 'PENDING_OUTGOING', 'hasIncomingPendingGameFriends', 'onClose');

    return <ButtonFetch user={user} currentUser={currentUser} relationshipType={relationshipType}/>
}
function MarkdownComponent({userBio}) {
    MarkdownFormat ??= Webpack.getByStrings('userBio', 'markup');

    return <MarkdownFormat className="userBio" userBio={userBio}/>
}
function BadgeComponent({badges, style}) {
    BadgeFetch ??= Webpack.getByStrings('pendingBadges', 'pendingLegacyUsernameDisabled');

    return (
        <div className="profileBadges" style={style}>
            <BadgeFetch pendingBadges={badges}/>
        </div>
    );
}
function NoteComponent({userId}) {
    NoteRenderer ??= Webpack.getByStrings('hidePersonalInformation', 'onUpdate', 'placeholder');

    return <NoteRenderer className="note" userId={userId}/>
}
function ConnectionComponent({connectedAccount, userId}) {
    ConnectionRenderer ??= Webpack.getByStrings('connectedAccount', 'connectedAccountOpenIcon', 'CONNECTED_ACCOUNT_VIEWED', {searchExports: true});

    return <ConnectionRenderer className="connectedAccount" connectedAccount={connectedAccount} userId={userId} />
}
function BotDataComponent({user}) {
    BotDataRenderer ??= Webpack.getByStrings('user', 'hasMessageContent', 'hasGuildPresences');

    return <BotDataRenderer user={user} />
}

function BioBuilder({displayProfile}) {
    if (displayProfile?._guildMemberProfile?.bio && Data.load('serverBio')) {
        return [
            <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['NepzEx'])}</div>,
            <MarkdownComponent userBio={displayProfile.bio} />
        ]
    }
    else if (displayProfile._userProfile.bio) {
        return [
            <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['NepzEx'])}</div>,
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
    if (serverMember?.roles?.length === 0) {
        return;
    }
    return [
        serverMember?.roles?.length !== 1 ? <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['LPJmLy'])}</div> 
        : <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['IqVT2N'])}</div>,
        <RoleRenderer user={user} currentUser={data.currentUser} guild={GuildStore.getGuild(data?.guildId)} />
    ]
}

function MemberDateBuilder({data, user}) {
    const server = GuildStore.getGuild(data?.guildId);
    const serverDate = new Date(GuildMemberStore.getMember(data?.guildId, user.id)?.joinedAt);
    return [
        <div className="memberSince" style={{ color: "var(--text-default)" }}>{user.createdAt.toString().substring(3, 7) + " " + user.createdAt.getDate() + ", " + user.createdAt.toString().substring(11, 15)}</div>,
        data?.guildId && [
            <div className="divider" />,
            <TooltipBuilder note={server.name}>
                <div className="guildIcon">
                    <img src={ IconUtils.getGuildIconURL(server) + 'size=16' } />
                </div>
            </TooltipBuilder>,
            <div className="memberSinceServer" style={{ color: "var(--text-default)" }}>{serverDate.toString().substring(3, 7) + " " + serverDate.getDate() + ", " + serverDate.toString().substring(11, 15)}</div>
        ]
    ]
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

function TabBarBuilder({user, currentUser, tab, setTab, ref}) {
    if (user.id === currentUser.id) return;
    if (user.bot) {
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
                        { intl.intl.formatToPlainString(intl.t['AOdOYm']) + " " + intl.intl.formatToPlainString(intl.t['HY+vdH']) }
                </div>
                <div 
                    className="tabBarItem" 
                    tabIndex={1} 
                    aria-selected={tab === tabs.SERVERS} 
                    aria-controls="servers-tab" 
                    onClick={() => {
                        setTab(tabs.SERVERS); 
                        ref.current?.scrollTo(0, 0)
                    }}>
                        { intl.intl.formatToPlainString(intl.t['sySsXV']) }
                </div>
                <div 
                    className="tabBarItem" 
                    tabIndex={2} 
                    aria-selected={tab === tabs.DATA} 
                    aria-controls="data-access-tab" 
                    onClick={() => {
                        setTab(tabs.DATA); 
                        ref.current?.scrollTo(0, 0)
                    }}>
                        { intl.intl.formatToPlainString(intl.t['QzDgMj']) }
                </div>
            </div>       
        </div>
        )
    }
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
                        { intl.intl.formatToPlainString(intl.t['E466pK']).substring(0,1).toUpperCase() + intl.intl.formatToPlainString(intl.t['E466pK']).substring(1) + " " + intl.intl.formatToPlainString(intl.t['HY+vdH']) }
                </div>
                <div 
                    className="tabBarItem" 
                    tabIndex={1} 
                    aria-selected={tab === tabs.SERVERS} 
                    aria-controls="servers-tab" 
                    onClick={() => {
                        setTab(tabs.SERVERS); 
                        ref.current?.scrollTo(0, 0)
                    }}>
                        { intl.intl.formatToPlainString(intl.t['sySsXV']) }
                </div>
                <div 
                    className="tabBarItem" 
                    tabIndex={2} 
                    aria-selected={tab === tabs.FRIENDS} 
                    aria-controls="friends-tab" 
                    onClick={() => {
                        setTab(tabs.FRIENDS); 
                        ref.current?.scrollTo(0, 0)
                    }}>
                        { intl.intl.formatToPlainString(intl.t['afBKs7']) }
                </div>
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
                    <div className="displayName">{ displayName || tagName }</div>
                    {
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
                            <BadgeComponent badges={displayProfile._userProfile.badges} style={{ display: "contents" }} />
                        ]}
                    </div>
                    : <BadgeComponent badges={displayProfile._userProfile.badges} style={{ display: "flex", flexWrap: "wrap" }}/>
                }
            </div>
            <div className="profileButtons">
                <ButtonComponent user={user} currentUser={currentUser} relationshipType={RelationshipStore.getRelationshipType(user.id)}/>
            </div>
        </header>
    )
}

export function headerBuilder({props, user, currentUser, displayProfile, tab, setTab, ref}) {
    const tagName = user.username;
    const displayName = user.globalName;
    const activities = useStateFromStores([ ActivityStore ], () => ActivityStore.getActivities(user.id));
    const check = activityCheck({activities});
    const voice = useStateFromStores([ Webpack.getStore('VoiceStateStore') ], () => Webpack.getStore('VoiceStateStore').getVoiceStateForUser(user.id)?.channelId);
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
    return (
        <div className="infoScroller scrollerBase" style={{ overflow: "hidden scroll", paddingRight: "12px"}}>
            { displayProfile?.pronouns && <div className="userInfoSection">
                <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['+T3RIy'])}</div>
                <div className="userPronouns" style={{ color: "var(--text-default)", fontSize: "14px" }}>{displayProfile.pronouns}</div>
            </div> }
            <div className="userInfoSection">
                <BioBuilder displayProfile={displayProfile} /> 
            </div>
            <div className="userInfoSection">
                <RoleBuilder user={user} data={data} displayProfile={displayProfile} />
            </div>
            <div className="userInfoSection">
                <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['a6XYDw'])}</div>
                <div className="memberSinceWrapper" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {MemberDateBuilder({data, user})}
                </div>
            </div>
            <div className="userInfoSection">
                <div className="userInfoSectionHeader">{intl.intl.formatToPlainString(intl.t['PbMNh4'])}</div>
                <NoteComponent userId={user.id} />
            </div>
            <div className="userInfoSection" style={{ borderTop: "1px solid var(--background-modifier-accent, var(--background-modifider-active))" }}>
                <ConnectionCards user={user} connections={connections} />
            </div>
            <div aria-hidden={true} style={{ pointerEvents: "none", minHeight: "0px", minWidth: "1px", flex: "0 0 auto", height: "8px" }}></div>
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
                <div className="emptyText">{intl.intl.formatToPlainString(intl.t['zjVh8v'])}</div>
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
                <div className="emptyText">{intl.intl.formatToPlainString(intl.t['/5p4g4'])}</div>
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
        <div className="body" style={{ height: "240px", backgroundColor: "var(--background-secondary, var(--background-base-lower))" }} ref={ref}>
            { tab === tabs.ABOUT
                ? <AboutTab data={data} user={user} displayProfile={displayProfile} />
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