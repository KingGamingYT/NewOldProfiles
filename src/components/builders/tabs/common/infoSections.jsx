import { Data } from 'betterdiscord';
import { Board, IconUtils, ButtonClasses, ModalRoot, ModalSystem, RoleRenderer } from '@modules/common';
import { GuildMemberStore, GuildStore } from '@modules/stores';
import { ConnectionComponent, MarkdownComponent, NoteComponent } from '@modules/lazy';
import { locale } from '@common/locale';
import { FavoriteWidgetBuilder, ShelfWidgetBuilder, CurrentWidgetBuilder } from '@components/builders/widgets/index';
import { TooltipBuilder } from '@components/common/TooltipBuilder';

function SectionHeader({children}) {
    return <div className="userInfoSectionHeader">{children}</div>
}

function MemberDateSupplementalBuilder({date, member}) {
    return (
        <div 
            className={`memberSince${member && "Server"}`} 
            style={{ color: "var(--text-default)" }}>
                {
                    `${date.toString().substring(3, 7)} ${date.getDate()}, ${date.toString().substring(11, 15)}`
                }
        </div>
    )
}

function BoardButton({user}) {
    return (
        <button
            className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.primary} ${ButtonClasses.hasText}`}
            onClick={() => ModalSystem.openModal((props) =>
                <ModalRoot.Modal {...props} title={locale.Strings.PROFILE_WIDGETS}>
                    <Board user={user} />
                </ModalRoot.Modal>
            )}>
            <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                <div className={`${ButtonClasses.buttonChildren}`} style={{ fontSize: "14px" }}>{locale.Strings.EDIT}</div>
            </div>
        </button>
    )
}

export function PronounsBuilder({ displayProfile }) {
    return (
        <div className="userInfoSection">
            <SectionHeader>{locale.Strings.PRONOUNS}</SectionHeader>
            <div className="userPronouns" style={{ color: "var(--text-default)", fontSize: "14px" }}>{displayProfile.pronouns}</div>
        </div>
    )
}

export function BioBuilder({ displayProfile }) {
    if (!displayProfile._userProfile.bio) return;
    return (
        <div className="userInfoSection">
            <SectionHeader>{locale.Strings.ABOUT_ME}</SectionHeader>
            <MarkdownComponent 
                userBio={
                    displayProfile?._guildMemberProfile?.bio && Data.load('serverBio') ? displayProfile.bio
                    : displayProfile._userProfile.bio
                }
            /> 
        </div>
    )
}

export function RoleBuilder({ user, data }) {
    if (!data?.guildId || !Data.load('showRoles')) return;
    const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
    if (!serverMember || serverMember?.roles?.length === 0) {
        return;
    }
    return (
        <div className="userInfoSection">
            <SectionHeader>
                {
                    serverMember?.roles?.length !== 1 ? locale.Strings.ROLES
                    : locale.Strings.ROLE
                }
            </SectionHeader>
            <RoleRenderer user={user} currentUser={data.currentUser} guild={GuildStore.getGuild(data?.guildId)} />
        </div>
    )
}

export function MemberDateBuilder({ data, user }) {
    const server = GuildStore.getGuild(data?.guildId);
    const serverMember = GuildMemberStore.getMember(data?.guildId, user.id);
    const serverDate = new Date(serverMember?.joinedAt);

    return (
        <div className="userInfoSection">
            <SectionHeader>{user.bot ? locale.Strings.CREATED_ON : locale.Strings.MEMBER_SINCE}</SectionHeader>
            <div className="memberSinceWrapper" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <MemberDateSupplementalBuilder date={user.createdAt} />
                {data?.guildId && serverMember &&
                    <>
                        <div className="divider" />
                        <TooltipBuilder note={server.name}>
                            <div className="guildIcon">
                                <img src={IconUtils.getGuildIconURL(server) + 'size=16'} />
                            </div>
                        </TooltipBuilder>
                        <MemberDateSupplementalBuilder date={serverDate} member={serverMember} />
                    </>
                }
            </div>
        </div>
    )
}

export function NoteBuilder({ user }) {
    return (
        <div className="userInfoSection">
            <SectionHeader>{locale.Strings.NOTE}</SectionHeader>
            <NoteComponent userId={user.id} />
        </div>
    )
}

export function BoardButtonBuilder({ user }) {
    return (
        <div className="userInfoSection" style={{ paddingBottom: "20px" }}>
            <SectionHeader>{locale.Strings.PROFILE_WIDGETS}</SectionHeader>
            <BoardButton user={user} />
        </div>
    )
}

export function BoardBuilder({widget, header, games}) {
    return (
        <div className="userInfoSection">
            <SectionHeader>{header}</SectionHeader>
            {widget.type.includes("favorite_games") &&
                <FavoriteWidgetBuilder widget={widget} game={games[0]} />
            }
            {(widget.type.includes("played_games") || widget.type.includes("want_to_play_games")) &&
                <div className="widgetCoverList">
                    {
                        widget.games.map((game, index) => <ShelfWidgetBuilder game={games[index]} />)
                    }
                </div>
            }
            {widget.type.includes("current_games") &&
                <div className="cardList">
                    {
                        widget.games.map((game, index) => <CurrentWidgetBuilder widget={widget} game={games[index]} index={index} />)
                    }
                </div>
            }
        </div>
    )
}

export function ConnectionCards({ user, connections }) {
    if (connections.length == 0) return;
    return (
        <div className="userInfoSection" style={{ borderTop: "1px solid var(--background-modifier-accent, var(--background-mod-normal))" }}>
            <div className="connectedAccounts">
                {connections.map(connection => <ConnectionComponent connectedAccount={connection} userId={user.id} />)}
            </div>
        </div>
    )
}