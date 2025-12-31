import {ActivityCard, VoiceCard, StreamCard} from './index';
import { activityCheck } from '@common/check';

export function ActivityCardWrapper({user, activities, voice, stream}) {
    const _activities = activities.filter(activity => activity && ([0, 2, 3, 5].includes(activity?.type)) && activity?.type !== 4 && activity.name && !activity.name.includes("Spotify"));
    const filterCheck = activityCheck({activities: _activities});

    return (
        <div className="activityProfileContainer activityProfileContainerNormal">
            { !stream ? <VoiceCard voice={voice} stream={stream} /> : <StreamCard user={user} voice={voice} /> }
            {_activities.map(activity => <ActivityCard user={user} activity={activity} check={filterCheck} />)}
        </div>
    )
}