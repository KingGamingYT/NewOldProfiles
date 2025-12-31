import { ActivityStore, StreamStore, VoiceStateStore, useStateFromStores } from '@modules/stores';
import { activityCheck } from '@common/check';
import { HeaderInnerBuilder } from './inner';
import { TabBarBuilder } from '../tabbar/tabBar';
import { ActivityCardWrapper, CustomCard, SpotifyCard, TwitchCard } from '@components/activities/index';

function Banner({url}) {
    return (
        <img
            className="userBanner"
            src={url}
            style={{
                width: "600px",
                height: "200px"
            }}
            alt=""
        />
    )
}

export function headerBuilder({ user, currentUser, displayProfile, tab, setTab, ref }) {
    const tagName = user.username;
    const displayName = user.globalName;
    const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(user.id));
    const check = activityCheck({ activities });
    const voice = useStateFromStores([VoiceStateStore], () => VoiceStateStore.getVoiceStateForUser(user.id)?.channelId);
    const stream = useStateFromStores([StreamStore], () => StreamStore.getAnyStreamForUser(user.id));

    if (activities.length !== 0 && (check.playing || check.listening || check.watching || check.competing) && (!check.spotify && !check.streaming && !check.xbox) || voice !== undefined) {
        return (
            <div className="topSectionPlaying" style={{ backgroundColor: "var(--background-brand)" }}>
                {displayProfile.banner && <Banner url={displayProfile.getBannerURL({ canAnimate: true })} />}
                <HeaderInnerBuilder
                    user={user}
                    currentUser={currentUser}
                    displayProfile={displayProfile}
                    tagName={tagName}
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCard
                        className="activity"
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <ActivityCardWrapper
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
            <div className="topSectionStreaming" style={{ backgroundColor: "#593695" }}>
                {displayProfile.banner && <Banner url={displayProfile.getBannerURL({ canAnimate: true })} />}
                <HeaderInnerBuilder
                    user={user}
                    currentUser={currentUser}
                    displayProfile={displayProfile}
                    tagName={tagName}
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCard
                        className="activity"
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <TwitchCard
                            user={user}
                            activities={activities}
                        />
                        <ActivityCardWrapper
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
            <div className="topSectionSpotify" style={{ backgroundColor: "#1db954" }}>
                {displayProfile.banner && <Banner url={displayProfile.getBannerURL({ canAnimate: true })} />}
                <HeaderInnerBuilder
                    user={user}
                    currentUser={currentUser}
                    displayProfile={displayProfile}
                    tagName={tagName}
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCard
                        className="activity"
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <SpotifyCard
                            user={user}
                            activities={activities}
                        />
                        <ActivityCardWrapper
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
            <div className="topSectionXbox" style={{ backgroundColor: "#107c10" }}>
                {displayProfile.banner && <Banner url={displayProfile.getBannerURL({ canAnimate: true })} />}
                <HeaderInnerBuilder
                    user={user}
                    currentUser={currentUser}
                    displayProfile={displayProfile}
                    tagName={tagName}
                    displayName={displayName}
                />
                <div className="headerFill">
                    <CustomCard
                        className="activity"
                        activities={activities}
                    />
                    <div className="activityCardsContainer" style={{ overflow: "hidden auto", display: "flex", flexDirection: "column" }}>
                        <ActivityCardWrapper
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
        <div className="topSectionNormal" style={{ backgroundColor: "var(--background-tertiary, var(--background-base-lowest))" }}>
            {displayProfile.banner && <Banner url={displayProfile.getBannerURL({ canAnimate: true })} />}
            <HeaderInnerBuilder
                user={user}
                currentUser={currentUser}
                displayProfile={displayProfile}
                tagName={tagName}
                displayName={displayName}
            />
            <CustomCard
                className="activity"
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