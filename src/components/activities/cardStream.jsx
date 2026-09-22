import { CallButtons, ManaButtons, OpenStream, SelectedChannelActionCreators } from '@modules/common';
import { ChannelStore, StreamStore, UserStore, useStateFromStores } from '@modules/stores';
import { ActivityHeader } from './common/ActivityHeader';
import { StreamImageAsset } from './common/ActivityAssets';
import { FlexInfo } from './common/FlexInfo';
import { locale } from "@common/locale";

export function StreamCard({user, voice}) {
    const streams = useStateFromStores([ StreamStore ], () => StreamStore.getAllApplicationStreamsForChannel(voice));
    const _streams = streams.filter(streams => streams && streams.ownerId == user.id)
    const channel = useStateFromStores([ ChannelStore ], () => ChannelStore.getChannel(voice));
    const currentUser = useStateFromStores([ UserStore ], () => UserStore.getCurrentUser());

    return (
        _streams.map(stream => <div className="activityProfile activity">
            <div className="activityProfileContainerStream">
                <ActivityHeader voice={voice} stream={stream} />
                <div className="bodyNormal" style={{ display: "flex", alignItems: "center", width: "auto" }}>
                    <StreamImageAsset stream={stream} />
                    <FlexInfo className="contentImagesProfile content" voice={voice} stream={stream} channel={channel} type="STREAM" />
                    <div className="buttonsWrapper actionsProfile">
                        {user.id === currentUser.id ? <ManaButtons.PrimaryButtonWithIcon
                            text={locale.Strings.STREAMING()}
                            disabled
                        /> :
                        <ManaButtons.PrimaryButtonWithIcon
                            text={locale.Strings.WATCH()}
                            onClick={(e) => {
                                e.stopPropagation();
                                SelectedChannelActionCreators.selectVoiceChannel(stream.channelId);
                                OpenStream(stream);
                            }}
                        />}
                    </div>
                </div>
            </div>
        </div>)
    )
}