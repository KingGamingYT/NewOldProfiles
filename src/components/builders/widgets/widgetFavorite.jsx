import { useState, useLayoutEffect, useMemo, useRef } from 'react';
import { IconUtils, FetchGames } from '@modules/common';
import { WidgetCard } from './common/widgetCard';

export function FavoriteWidgetBuilder({ widget, game }) {
    const [loading, setLoading] = useState(true);

    let imageURL = IconUtils.getGameAssetURL({id: game?.id, hash: game?.coverImage, size:"1024", keepAspectRatio: true});
    const image = useMemo(() => new Image(), []);

    const ref = useRef(null);

    useLayoutEffect(() => { FetchGames.getDetectableGamesSupplemental([game?.id]); }, [game?.id]);

    useLayoutEffect(() => {
        if (imageURL == null) imageURL = `https://cdn.discordapp.com/app-icons/${game?.id}/${game?.coverImage}.png?size=1024&keep_aspect_ratio=true`;
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
        <WidgetCard widget={widget} game={game} image={image} imageURL={imageURL} loading={loading} ref={ref} type="FAVORITE" />
    )
}