import { SpotifyButtons, OpenSpotifyAlbumFromStatus } from '@modules/common';
import { RichImageAsset } from './common/ActivityAssets';
import { ActivityHeader } from './common/ActivityHeader';
import { FlexInfo } from './common/FlexInfo';

export function SpotifyCard({user, activities, check}) {
    const _activities = activities.filter(activity => activity && activity.name && activity.name.includes("Spotify"));

    return (
        <div className="activityProfileContainer activityProfileContainerSpotify">
            {_activities.map(activity => <div className="activityProfile activity">
                <ActivityHeader activity={activity} check={check} />
                <div className="bodyNormal" style={{ display: "flex", alignItems: "center", width: "auto" }}>
                    <div className="assets" style={{ position: "relative" }}>
                        <RichImageAsset 
                            url={`https://i.scdn.co/image/${activity?.assets?.large_image.substring(activity?.assets?.large_image.indexOf(':')+1)}`}
                            tooltipText={activity?.assets?.large_text || activity?.details}
                            onClick={() => OpenSpotifyAlbumFromStatus(activity, user.id)}
                            type="Large"
                        />
                    </div>
                    <FlexInfo className="contentImagesProfile content" activity={activity} check={check} type="SPOTIFY" />
                    <div className="buttonsWrapper actionsProfile">
                        <SpotifyButtons user={user} activity={activity} />
                    </div>
                </div>
            </div>)}
        </div>
    )
}