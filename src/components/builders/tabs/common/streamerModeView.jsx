import { locale } from '@common/locale';

export function StreamerModeView({}) {
    return (
        <div className="empty">
            <div className="emptyIconStreamerMode emptyIcon" />
            <div className="emptyText">{locale.Strings.STREAMER_MODE_ENABLED}</div>
        </div>
    )
}