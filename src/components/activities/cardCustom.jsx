import { EmojiRenderer } from '@modules/common';
import { locale } from '@common/locale'; 

function ActivityHeader({}) {
    return (
        <div 
            className="activityHeader">
            {locale.Strings.CUSTOM_STATUS()}
        </div>
    )
}

function CustomActivityContent({activity, activities}) {
    const _emoji = activities.filter(activity => activity.emoji);

    return (
        <div 
            className="customStatusContent">
            { _emoji.map(_ => <EmojiRenderer emoji={activity.emoji}/>) }
            <span className="customStatusText">{activity.state}</span>
        </div>
    )
}

export function CustomCard({activities}) {
    const _activities = activities.filter(activity => activity && activity.type === 4);

    return (
        _activities.map(activity => <div className="activity">
            <ActivityHeader />
            <CustomActivityContent activity={activity} activities={_activities} />
        </div>)
    )
}