import { ActivityButtons, ActivityCardClasses, GameProfileCheck } from '@modules/common';
import { ApplicationStore } from '@modules/stores';
import { ActivityHeader } from './common/ActivityHeader';
import { ConsoleImageAsset, FallbackAsset, GameIconAsset, RichImageAsset } from './common/ActivityAssets';
import { FlexInfo } from './common/FlexInfo';

export function ActivityCard({user, activity, check}) {
    const application = ApplicationStore.getApplication(activity?.application_id);
    const useGameProfile = GameProfileCheck({trackEntryPointImpression: false, applicationId: application?.id});

    return (
        <div className="activityProfile activity" id={`${activity.created_at}-${activity.type}`} key={`${activity.created_at}-${activity.type}`}>
            <ActivityHeader activity={activity} check={check}/>
            <div className="bodyNormal" style={{ display: "flex", alignItems: "center", width: "auto" }}>
                <div className="assets" style={{ position: "relative" }}
                    onMouseOver={(e) => Boolean(useGameProfile) && e.currentTarget.classList.add(`${ActivityCardClasses.clickableImage}`)}
                    onMouseLeave={(e) => Boolean(useGameProfile) && e.currentTarget.classList.remove(`${ActivityCardClasses.clickableImage}`)}
                    onClick={useGameProfile}>
                    { 
                        activity?.assets && activity?.assets.large_image && !activity?.platform?.includes('xbox') && (
                            <RichImageAsset 
                                url={
                                    isNaN(activity?.assets?.large_image) ? `https://media.discordapp.net/${activity.assets.large_image.substring(activity.assets.large_image.indexOf(':')+1)}`
                                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity?.assets.large_image}.png`
                                }
                                tooltipText={activity.assets.large_text || activity?.details}
                                type="Large"
                            />
                        ) 
                    }
                    {
                        activity?.platform?.includes('xbox') && (
                            <ConsoleImageAsset url={'https://discord.com/assets/d8e257d7526932dcf7f88e8816a49b30.png'} platform="XBOX" />
                        )
                    }
                    {
                        activity?.platform?.includes('ps5') && (
                            <ConsoleImageAsset url={`https://media.discordapp.net/external${activity.assets.small_image.substring(activity.assets.small_image.indexOf('/'))}`} platform="PLAYSTATION" />
                        )
                    }
                    {
                        activity?.application_id && (!activity?.assets || !activity?.assets.large_image) && !activity?.platform?.includes('xbox') && (
                            <GameIconAsset url={`https://cdn.discordapp.com/app-icons/${activity.application_id}/${application?.icon}.png`} name={activity.name} />
                        )   
                    }
                    {
                        !(user.bot || activity?.assets || activity?.application_id || application?.icon) && (
                            <FallbackAsset style={{ width: "40px", height: "40px" }} />
                        )
                    }
                    {
                        activity?.assets && activity?.assets?.large_image && activity?.assets?.small_image && (
                            <RichImageAsset 
                                url={
                                    isNaN(activity?.assets?.small_image) ? `https://media.discordapp.net/${activity.assets.small_image.substring(activity.assets.small_image.indexOf(':')+1)}`
                                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity?.assets.small_image}.png`
                                }
                                tooltipText={activity.assets.small_text || activity?.details}
                                type="Small"
                            />
                        )
                    }
                </div>
                <FlexInfo className="contentImagesProfile content" style={{ display: "grid", flex: "1", marginBottom: "3px" }} activity={activity} check={check} type="PLAYING" />
                <div className="buttonsWrapper actionsProfile">
                    <ActivityButtons user={user} activity={activity} />
                </div>
            </div>
        </div>
    )
}