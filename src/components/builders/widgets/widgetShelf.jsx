import { useState, useLayoutEffect, useMemo, useRef } from 'react';
import { FetchGames } from '@modules/common';
import { DetectableGameSupplementalStore, useStateFromStores } from '@modules/stores';
import { TooltipBuilder } from '@components/common/TooltipBuilder';
import { GameCover } from './common/gameCover';
import { FallbackCover } from './common/fallbackCover';

export function ShelfWidgetBuilder({ game }) {
    const [loading, setLoading] = useState(() => true);

    let imageURL = useStateFromStores([DetectableGameSupplementalStore], () => DetectableGameSupplementalStore.getCoverImageUrl(game?.id), [game?.id]);
    const image = useMemo(() => new Image(), []);

    const ref = useRef(null);

    useLayoutEffect(() => { FetchGames.getDetectableGamesSupplemental([game?.id]); }, [game?.id]);

    useLayoutEffect(() => {
        if (imageURL == null) imageURL = `https://cdn.discordapp.com/app-icons/${game?.id}/${game?.coverImage}.png?size=1024&keep_aspect_ratio=true`
        image.src = imageURL;
        
        if (!image.src) {
            setLoading(true);

            if (image.parentElement) image.parentElement.removeChild(image);

            return;
        }

        if (image.isConnected) return;

        image.onload = () => {
            setLoading(false);
        };

        return () => { delete image.onload; };
    }, [imageURL]);

    return (
        <div style={{ position: "relative" }} ref={ref}>
            <TooltipBuilder note={game?.name}>
                {loading ? <FallbackCover game={game} /> : <GameCover game={game} image={image} imageURL={imageURL} />}
            </TooltipBuilder>
        </div>
    )
}