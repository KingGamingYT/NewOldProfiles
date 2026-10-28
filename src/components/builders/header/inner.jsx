import { Data, Plugins, Utils, ReactUtils } from 'betterdiscord';
import { useState, useRef } from 'react';
import { AccessibilityStore, ActivityStore, RelationshipStore, StreamStore, StreamerModeStore, VoiceStateStore, BadgeDirectoryStore, useStateFromStores } from '@modules/stores';
import { AnchorClasses, Avatar, BotTagRenderer, DisplayNameStyleConfigurator, NavigationUtils, ModalSystem, OpenUserSettings, PencilIcon, Popout, PopUtils, TagGuildRenderer, UserProfileBadgeList } from '@modules/common';
import { FriendAddButtonComponent, FriendsButtonComponent, MessageButtonLargeComponent, MessageButtonSmallComponent, MoreOverflowButtonComponent, BotAddButtonComponent } from '@modules/lazy'
import { TooltipBuilder } from '@components/common/TooltipBuilder';
import { locale } from '@common/locale';
import { AcceptButton, BlockedPopoutButton, IgnoreButton } from './customButtons';
import { EditProfileButton } from '@components/editing/editProfileButton';

function BadgeManagerButton({ badges, displayProfile }) {
    const [showPopout, setShowPopout] = useState(false);
    const refDOM = useRef(null);
    const BadgePopout = ReactUtils.wrapInHooks(UserProfileBadgeList)({badges, displayProfile, popoutAnchorRef: {} })?.props.renderPopout;

    return (
        <Popout
            targetElementRef={refDOM}
            clickTrap={true}
            onRequestClose={() => setShowPopout(false)}
            renderPopout={BadgePopout}
            position="bottom" 
            shouldShow={showPopout}>
            {(props) =>
                <TooltipBuilder note={locale.Strings.CUSTOMIZE_YOUR_BADGES()}>
                    <button {...props} className="editButton" type="button" ref={refDOM} onClick={(e) => {e.stopPropagation(); setShowPopout(true)}} style={{ opacity: showPopout ? 1 : null }}>
                        <PencilIcon size="md" />
                    </button>
                </TooltipBuilder>
            }
        </Popout>
    )
}

function RichBadgeTooltip({ badge }) {
	return (
		<div className="richBadgeTooltip">
			<div className="title">{badge.name}</div>
			<div className="description">{badge.info_label}</div>
		</div>
	)
}

function BadgeInner({ user, badge, index, id }) {
    const directoryBadge = useStateFromStores([BadgeDirectoryStore], () => BadgeDirectoryStore.getBadges(user.id)).find(x => { return (x.name === badge.description || x.name.toLowerCase() === badge.id)});
    const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(id)).filter(activity => activity && !([4, 6].includes(activity?.type)));
    const voice = useStateFromStores([VoiceStateStore], () => VoiceStateStore.getVoiceStateForUser(id)?.channelId);
    const stream = useStateFromStores([StreamStore], () => StreamStore.getAnyStreamForUser(id));
    const links = ['staff', 'partner', 'certified_moderator', 'hypesquad', 'bug_hunter_level_1', 'bug_hunter_level_2', 'bot_commands'];
    const routes = ['quest_completed', 'orb_profile_badge'];
    const settings = ['early_supporter', 'premium', 'guild_booster'];
    const settingsMatch = settings.filter(x => badge.id.includes(x));
    const badgeRegex = (id) => id.replaceAll(/(?:^|_)(\w)/g, (_, m) => m.toUpperCase());
    
    return (
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
                    className={Utils.className(((activities.length !== 0 || voice || stream) && !Data.load('disableRichBadges')) && "richBadge", "profileBadge", directoryBadge && directoryBadge.tiers ? `profileBadge${badgeRegex(badge.id)} profileBadge${badgeRegex(badge.id)+badgeRegex(directoryBadge?.current_tier)}` : `profileBadge${badgeRegex(badge.id)}`)}
                    style={{backgroundImage: (badge.iconSrc && `url(${badge.iconSrc})`) ?? undefined}}
                    icon={badge.icon && badge.icon}
                />
            </a>
    )
}

function BadgeBuilder({ user, badge, index, id }) {
    const directoryBadge = useStateFromStores([BadgeDirectoryStore], () => BadgeDirectoryStore.getBadges(user.id)).find(x => { return (x.name === badge.description || x.name.toLowerCase() === badge.id)});
    const refDOM = useRef(null);

    return (
        <div className="profileBadgeWrapper" ref={refDOM}>
            <TooltipBuilder note={directoryBadge && directoryBadge.tiers ? <RichBadgeTooltip badge={directoryBadge} /> : badge.description}>
                <div><BadgeInner user={user} badge={badge} index={index} id={id} /></div>
            </TooltipBuilder>
        </div>
    )
}


function BadgesBuilder({ user, currentUser, displayProfile, badges, style, id }) {
    if (!badges) return;

    return (
        <div className="profileBadges" style={style}>
            {badges.map((badge, index) => <BadgeBuilder user={user} badge={badge} index={index} id={id} />)}
            {user.id === currentUser.id && <BadgeManagerButton badges={badges} displayProfile={displayProfile} />}
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
                <EditProfileButton />
                <MoreOverflowButtonComponent user={user} />
            </>
        )
    }
    if (user.bot) {
        return (
            <>
                <MessageButtonLargeComponent autoFocus={true} onClose={() => PopUtils.popAll()} userId={user.id} />
                <BotAddButtonComponent user={user} />
                <MoreOverflowButtonComponent user={user} />
            </>
        )
    }
    switch (relationshipType) {
        case 0: return (
            <>
                <FriendAddButtonComponent autoFocus={true} userId={user.id} variant={"primary"} />
                <MessageButtonSmallComponent onClose={() => PopUtils.popAll()} userId={user.id} variant={"secondary"} />
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
    const isPomelo = (!legacyName && !user.bot);

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
            <div className={Utils.className("nameTag", isPomelo && "nameTagPomelo")}>{
                !informationHidden && !Data.load('disableDiscrim') && legacyName ?
                    legacyName?.substring(legacyName?.indexOf("#"))
                : user.bot ?
                    `#${user.discriminator}`
                :
                    `@${tagName}`
            }</div>
            {
                user.bot && <BotTagRenderer.A
                    className="botTag"
                    type={user.system ? BotTagRenderer.A.Types.OFFICIAL : BotTagRenderer.A.Types.BOT}
                    verified={user.publicFlags & (1 << 16)}
                />
            }
        </div>
    )
}

export function HeaderInnerBuilder({ user, currentUser, displayProfile, tagName, displayName }) {
    const relationship = RelationshipStore.getRelationshipType(user.id);
    const badges = displayProfile._userProfile.badges;
    const Timezone = Plugins.get("Timezones")?.instance?.getTimezoneComp?.({user});

    return (
        <header className="header">
            <Avatar className="avatar" user={user} displayProfile={displayProfile} avatarSize={"SIZE_80"} />
            <div className="headerInfo">
                <DiscordTag user={user} displayProfile={displayProfile} tagName={tagName} displayName={displayName} />
                {
                    user.primaryGuild?.tag && Data.load('showGuildTag') ? 
                    <div className="badgeSection" style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        <ClanTagBuilder user={user} />
                        {badges && badges.length !== 0 && 
                            <>
                                <div className="divider" style={{ margin: "0 5px 0 5px" }} />
                                <BadgesBuilder user={user} currentUser={currentUser} displayProfile={displayProfile} badges={displayProfile._userProfile.badges} style={{ display: "contents" }} id={user.id} />
                            </>
                        }
                    </div>
                    : <BadgesBuilder user={user} currentUser={currentUser} displayProfile={displayProfile} badges={displayProfile._userProfile.badges} style={{ display: "flex", flexWrap: "wrap" }} id={user.id} />
                }
            </div>
            <div className="profileButtons">
                <HeaderButtonBuilder currentUser={currentUser} relationshipType={relationship} user={user} />
            </div>
            {Plugins.get("Timezones") && Plugins.isEnabled("Timezones") && Timezone}
        </header>
    )
}