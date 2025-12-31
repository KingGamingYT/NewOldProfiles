import { tabs } from '@common/tabs';
import { AboutTab, BoardTab, ServersTab, FriendsTab, DataTab, FallbackTab } from './tabs/index';

export function bodyBuilder({ data, user, displayProfile, tab, ref }) {
    return (
        <div className="body" style={{ height: "240px", backgroundColor: "var(--background-secondary, var(--background-base-lower))" }} ref={ref} id={`${Object.keys(tabs).find(t => tabs[t] === tab).toLowerCase()}-tab`}>
            {tab === tabs.ABOUT
                ? <AboutTab data={data} user={user} displayProfile={displayProfile} />
                : tab === tabs.BOARD
                    ? <BoardTab data={data} user={user} displayProfile={displayProfile} />
                    : tab === tabs.SERVERS
                        ? <ServersTab data={data} user={user} />
                        : tab === tabs.FRIENDS
                            ? <FriendsTab data={data} user={user} />
                            : tab === tabs.DATA
                                ? <DataTab user={user} />
                                : <FallbackTab />
            }
        </div>
    )
}