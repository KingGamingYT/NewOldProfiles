import { Data, Utils } from 'betterdiscord';
import { useState, useRef } from 'react';
import { AccessibilityStore, ActivityStore, RelationshipStore, StreamStore, StreamerModeStore, VoiceStateStore, useStateFromStores } from '@modules/stores';
import { AnchorClasses, AvatarFetch, BotTagRenderer, DisplayNameStyleConfigurator, NavigationUtils, OrbTooltip, OpenUserSettings, Popout, PopUtils, TagGuildRenderer } from '@modules/common';
import { EditProfileButtonComponent, FriendAddButtonComponent, FriendsButtonComponent, MessageButtonLargeComponent, MessageButtonSmallComponent, MoreOverflowButtonComponent } from '@modules/lazy'
import { TooltipBuilder } from '@components/common/TooltipBuilder';
import { AcceptButton, BlockedPopoutButton, IgnoreButton } from './customButtons';

function BadgeBuilder({ badge, index, id }) {
    const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(id)).filter(activity => activity && !([4, 6].includes(activity?.type)));
    const voice = useStateFromStores([VoiceStateStore], () => VoiceStateStore.getVoiceStateForUser(id)?.channelId);
    const stream = useStateFromStores([StreamStore], () => StreamStore.getAnyStreamForUser(id));
    const links = ['staff', 'partner', 'certified_moderator', 'hypesquad', 'bug_hunter_level_1', 'bug_hunter_level_2', 'bot_commands'];
    const routes = ['quest_completed', 'orb_profile_badge'];
    const settings = ['early_supporter', 'premium', 'guild_booster'];
    const settingsMatch = settings.filter(x => badge.id.includes(x));
    return (
        <div className="profileBadgeWrapper">
            <TooltipBuilder note={badge.id.includes('orb_profile_badge') ? <OrbTooltip showSubtext={true} /> : badge.description}>
                <a
                    tabIndex={index + 1}
                    className={`${AnchorClasses.anchor} ${AnchorClasses.anchorUnderlineOnHover}`}
                    role={"button"}
                    href={links.includes(badge.id) && badge?.link}
                    rel="noreferrer noopener"
                    target="_blank"
                    onClick={() =>
                        routes.includes(badge.id) ? (() => { NavigationUtils.transitionTo(badge.id.includes('orb_profile_badge') ? '/shop?tab=orbs' : badge?.link?.substring(badge?.link?.indexOf('m') + 1)); ModalSystem.closeAllModals() })()
                            : settingsMatch.length && OpenUserSettings.openUserSettings((() => {
                                if (settings.some(setting => settingsMatch.includes(setting))) return "nitro_panel";
                            })())
                    }>
                    <div
                        className={Utils.className((activities.length !== 0 || voice || stream) && "richBadge", "profileBadge", `profileBadge${badge.id.replaceAll(/(?:^|_)(\w)/g, (_, m) => m.toUpperCase())}`)}
                    />
                </a>
            </TooltipBuilder>
        </div>
    )
}


function BadgesBuilder({ badges, style, id }) {
    if (!badges) return;

    return (
        <div className="profileBadges" style={style}>
            {
                badges.map((badge, index) => <BadgeBuilder badge={badge} index={index} id={id} />)
            }
        </div>
    )
}

function ClanTagBuilder({ user }) {
    const [showPopout, setShowPopout] = useState(false);
    const refDOM = useRef(null);

    return (
        <div
            className="clanTagContainer">
            <Popout
                targetElementRef={refDOM}
                clickTrap={true}
                onRequestClose={() => setShowPopout(false)}
                renderPopout={() => <TagGuildRenderer guildId={user.primaryGuild?.identityGuildId} />}
                position="right" shouldShow={showPopout}>
                {(props) => <div
                    {...props}
                    className="clanTag"
                    ref={refDOM}
                    onClick={() => { setShowPopout(true) }}>
                    <div
                        className="clanTagInner">
                        <img
                            className="tagBadge"
                            src={'https://cdn.discordapp.com/clan-badges/' + user.primaryGuild?.identityGuildId + '/' + user.primaryGuild?.badge + '.png?size=16'}
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

function HeaderButtonBuilder({ currentUser, relationshipType, user }) {
    if (user.id === currentUser.id) {
        return (
            <>
                <EditProfileButtonComponent user={user} />
                <MoreOverflowButtonComponent user={user} />
            </>
        )
    }
    if (user.bot) {
        return (
            <>
                <MessageButtonLargeComponent autoFocus={true} onClose={() => PopUtils.popAll()} userId={user.id} />
                <MoreOverflowButtonComponent user={user} />
            </>
        )
    }
    switch (relationshipType) {
        case 0: return (
            <>
                <FriendAddButtonComponent autoFocus={true} userId={user.id} variant={"primary"} />
                <MessageButtonSmallComponent onCLose={() => PopUtils.popAll()} userId={user.id} variant={"secondary"} />
                <MoreOverflowButtonComponent user={user} />
            </>
        );
        case 1: case 4: return (
            <>
                <MessageButtonLargeComponent autoFocus={true} onClose={() => PopUtils.popAll()} userId={user.id} />
                <FriendsButtonComponent relationshipType={relationshipType} shouldShowTooltip={true} type={"icon"} themeColor={"secondary"} user={user} />
                <MoreOverflowButtonComponent user={user} />
            </>
        );
        case 2: return <BlockedPopoutButton user={user} />
        case 3: return (
            <>
                <AcceptButton user={user} />
                <IgnoreButton user={user} />
                <MessageButtonSmallComponent onClose={() => PopUtils.popAll()} userId={user.id} variant={"secondary"} />
                <MoreOverflowButtonComponent user={user} />
            </>
        )
    }
}

function DiscordTag({ user, displayProfile, tagName, displayName }) {
    const displayNameStylesEnabled = AccessibilityStore.displayNameStylesEnabled;
    const informationHidden = StreamerModeStore.hidePersonalInformation;
    const legacyName = displayProfile._userProfile?.legacyUsername;

    return (
        <div className="nameSection">
            {
                displayNameStylesEnabled && user?.displayNameStyles ?
                    <DisplayNameStyleConfigurator.type
                        userName={displayName || tagName}
                        displayNameStyles={user.displayNameStyles}
                        inProfile={1}
                        textClassName="displayName"
                    />
                    : <div className="displayName">{displayName || tagName}</div>
            }
            {
                !informationHidden && !Data.load('disableDiscrim') && legacyName ? 
                    <div
                        className="nameTag"
                        style={{ marginLeft: "-5px" }}>
                        {legacyName?.substring(legacyName?.indexOf("#"))}
                    </div>
                : user.bot ? 
                    <div
                        className="nameTag"
                        style={{ marginLeft: "-5px" }}>
                        {`#${user.discriminator}`}
                    </div>
                :
                    <div
                        className="nameTag">
                        {`@${tagName}`}
                    </div>
            }
            {
                user.bot && <BotTagRenderer.Z
                    className="botTag"
                    type={user.system ? BotTagRenderer.Z.Types.OFFICIAL : BotTagRenderer.Z.Types.BOT}
                    verified={user.publicFlags & (1 << 16)}
                />
            }
        </div>
    )
}

export function HeaderInnerBuilder({ user, currentUser, displayProfile, tagName, displayName }) {
    const relationship = RelationshipStore.getRelationshipType(user.id);

    return (
        <header className="header">
            <AvatarFetch className="avatar" user={user} />
            <div className="headerInfo">
                <DiscordTag user={user} displayProfile={displayProfile} tagName={tagName} displayName={displayName} />
                {
                    user.primaryGuild?.tag && Data.load('showGuildTag') ? 
                    <div className="badgeSection" style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        <ClanTagBuilder user={user} />
                        {displayProfile._userProfile.badges && displayProfile._userProfile.badges.length !== 0 && <div className="divider" style={{ margin: "0 5px 0 5px" }} />}
                        <BadgesBuilder badges={displayProfile._userProfile.badges} style={{ display: "contents" }} id={user.id} />
                    </div>
                    : <BadgesBuilder badges={displayProfile._userProfile.badges} style={{ display: "flex", flexWrap: "wrap" }} id={user.id} />
                }
            </div>
            <div className="profileButtons">
                <HeaderButtonBuilder currentUser={currentUser} relationshipType={relationship} user={user} />
            </div>
        </header>
    )
}