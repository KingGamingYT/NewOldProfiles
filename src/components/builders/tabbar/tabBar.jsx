import { Data } from 'betterdiscord';
import { tabs } from '@common/tabs';
import { locale } from '@common/locale';


function TabBarItem({ tab, setTab, ref, tabIndex, selectedItem, label }) {
    return (
        <div
            className="tabBarItem"
            tabIndex={tabIndex}
            aria-selected={tab === tabs[selectedItem]}
            aria-controls={`${selectedItem.toLowerCase()}-tab`}
            onClick={() => {
                setTab(tabs[selectedItem]);
                ref.current?.scrollTo(0, 0)
            }}>
            {label}
        </div>
    )
}

export function TabBarBuilder({ user, displayProfile, currentUser, tab, setTab, ref }) {
    if (user.id === currentUser.id) return;
    const hasBoard = Data.load('boardTab') && Boolean(displayProfile.widgets?.length);
    return (
        <div className="tabBarContainer" style={{ borderTop: "1px solid hsla(0, 0%, 100%, .1", paddingLeft: "20px"}}>
            <div className="tabBar" style={{ display: "flex", alignItems: "stretch", height: "55px", flexDirection: "row" }}>
                <TabBarItem
                    tab={tab}
                    setTab={setTab}
                    ref={ref}
                    tabIndex={0}
                    selectedItem="ABOUT"
                    label={`${user.bot ? locale.Strings.BOT : locale.Strings.USER.substring(0, 1).toUpperCase() + locale.Strings.USER.substring(1)} ${locale.Strings.INFO}`}
                />
                {hasBoard === true && <TabBarItem
                    tab={tab}
                    setTab={setTab}
                    ref={ref}
                    tabIndex={1}
                    selectedItem="BOARD"
                    label={locale.Strings.BOARD}
                />}
                <TabBarItem
                    tab={tab}
                    setTab={setTab}
                    ref={ref}
                    tabIndex={hasBoard === true ? 2 : 1}
                    selectedItem="SERVERS"
                    label={locale.Strings.MUTUAL_SERVERS}
                />
                {user.bot ?
                    <TabBarItem
                        tab={tab}
                        setTab={setTab}
                        ref={ref}
                        tabIndex={2}
                        selectedItem="DATA"
                        label={locale.Strings.DATA_ACCESS}
                    />
                    :
                    <TabBarItem
                        tab={tab}
                        setTab={setTab}
                        ref={ref}
                        tabIndex={hasBoard === true ? 3 : 2}
                        selectedItem="FRIENDS"
                        label={locale.Strings.MUTUAL_FRIENDS}
                    />
                }
            </div>
        </div>
    )
}