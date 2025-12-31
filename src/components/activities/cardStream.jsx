import { CallButtons } from '@modules/common';
import { ChannelStore, StreamStore, useStateFromStores } from '@modules/stores';
import { ActivityHeader } from './common/ActivityHeader';
import { StreamImageAsset } from './common/ActivityAssets';
import { FlexInfo } from './common/FlexInfo';

export function StreamCard({user, voice}) {
    const streams = useStateFromStores([ StreamStore ], () => StreamStore.getAllApplicationStreamsForChannel(voice));
    const _streams = streams.filter(streams => streams && streams.ownerId == user.id)
    const channel = useStateFromStores([ ChannelStore ], () => ChannelStore.getChannel(voice));

    return (
        _streams.map(stream => <div className="activityProfile activity">
            <div className="activityProfileContainerStream">
                <ActivityHeader voice={voice} stream={stream} />
                <div className="bodyNormal" style={{ display: "flex", alignItems: "center", width: "auto" }}>
                    <StreamImageAsset stream={stream} />
                    <FlexInfo className="contentImagesProfile content" voice={voice} stream={stream} channel={channel} type="STREAM" />
                    <div className="buttonsWrapper actionsProfile">
                        <CallButtons channel={channel} />
                    </div>
                </div>
            </div>
        </div>)
    )
}