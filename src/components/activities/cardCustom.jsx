import { EmojiRenderer } from '@modules/common'; 

function ActivityHeader({activity}) {
    return (
        <div 
            className="activityHeader">
            {activity.name}
        </div>
    )
}

function CustomActivityContent({activity, activities}) {
    const _emoji = activities.filter(activity => activity.emoji);

    return (
        <div 
            className="customStatusContent">
            { _emoji.map(_ => <EmojiRenderer emoji={activity.emoji}/>) }
            <div className="customStatusText">{activity.state}</div>
        </div>
    )
}

export function CustomCard({activities}) {
    const _activities = activities.filter(activity => activity && activity.type === 4);

    return (
        _activities.map(activity => <div className="activity">
            <ActivityHeader activity={activity} />
            <CustomActivityContent activity={activity} activities={_activities} />
        </div>)
    )
}