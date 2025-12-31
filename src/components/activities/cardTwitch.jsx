import { ActivityButtons } from '@modules/common';
import { ActivityHeader } from './common/ActivityHeader';
import { TwitchImageAsset } from './common/ActivityAssets';
import { FlexInfo } from './common/FlexInfo'

export function TwitchCard({user, activities}) {
    const activity = activities.filter(activity => activity && activity.name && activity.type === 1)[0];

    return (
        <div className="activityProfileContainer activityProfileContainerTwitch">
            <div className="activityProfile activity">
                <ActivityHeader activity={activity} />
                <div className="bodyNormal" style={{ display: "flex", alignItems: "center", width: "auto" }}>
                    <div className="assets" style={{ position: "relative" }}>
                        <TwitchImageAsset 
                            url={
                                activity.name.includes('YouTube') ? `https://i.ytimg.com/vi/${activity?.assets?.large_image.substring(activity?.assets?.large_image.indexOf(':')+1)}/hqdefault_live.jpg`
                                : `https://static-cdn.jtvnw.net/previews-ttv/live_user_${activity?.assets?.large_image.substring(activity?.assets?.large_image.indexOf(':')+1)}-162x90.jpg`
                            }
                            imageId={activity?.assets?.large_image}
                            altText={activity?.assets?.large_text}
                        />
                    </div>
                    <FlexInfo className="contentImagesProfile content" activity={activity} type="TWITCH" />
                    <div className="buttonsWrapper actionsProfile">
                        <ActivityButtons user={user} activity={activity} />
                    </div>
                </div>
            </div>
        </div>
    )
}