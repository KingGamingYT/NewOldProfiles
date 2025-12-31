import { Suspense } from 'react';
import { TagRenderer } from '@modules/common';
import { TooltipBuilder } from '@components/common/TooltipBuilder';
import { GameCover } from './gameCover';
import { FallbackCover } from './fallbackCover';

function WidgetCardDetails({widget, game, index, type}) {
    return (
        <div className="widgetDetails">
            <h3 className="widgetTitle">{game?.name || "Unknown Game"}</h3>
            { type.includes("CURRENT") && widget.games[index].tags && <Suspense><TagRenderer tags={widget.games[index].tags} widgetType={widget.type} className={"tagListContainer"} /></Suspense>}
            { type.includes("FAVORITE") && widget.games[0].comment && <div role="group">
                <svg
                    className="commentIcon"
                    role="img"
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                ><path
                        fill="var(--icon-muted)"
                        d="M2.35 19.44A4.75 4.75 0 0 0 6.07 21c1.43 0 2.58-.43 3.44-1.3.9-.9 1.35-2.06 1.35-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0C2.89 6.78 1 10.64 1 15.02c0 1.9.45 3.38 1.35 4.42ZM14.16 19.44A4.75 4.75 0 0 0 17.88 21c1.43 0 2.58-.43 3.45-1.3.9-.9 1.34-2.06 1.34-3.5 0-1.43-.43-2.58-1.3-3.45a4.63 4.63 0 0 0-3.5-1.34c.6-1.6 1.99-3.1 4.16-4.49a.8.8 0 0 0 .1-1.3l-2.68-2.2a.76.76 0 0 0-.98 0c-3.77 3.36-5.66 7.22-5.66 11.6 0 1.9.45 3.38 1.35 4.42Z"
                    />
                </svg>
                <div className="widgetTitle widgetSubtitle" style={{ color: "var(--text-tertiary, var(--text-muted))", fontWeight: 400 }}>{widget.games[0].comment}</div>
            </div>}
        </div>
    )
}

export function WidgetCard({widget, game, image, imageURL, index, loading, ref, type}) {
    return (
        <div className="widgetCard" ref={ref}>
            <TooltipBuilder note={game?.name}>
                {loading ? <FallbackCover game={game} /> : <GameCover game={game} image={image} imageURL={imageURL} />}
            </TooltipBuilder>
            <WidgetCardDetails widget={widget} game={game} index={index} type={type} />
        </div>
    )
}