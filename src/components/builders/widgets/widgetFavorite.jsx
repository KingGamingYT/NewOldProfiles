import { useState, useLayoutEffect, useMemo, useRef } from 'react';
import { IconUtils } from '@modules/common';
import { NewGameStore } from '@modules/stores';
import { WidgetCard } from './common/widgetCard';

export function FavoriteWidgetBuilder({ widget, game, user }) {
    const [loading, setLoading] = useState(true);

    let imageURL = IconUtils.getGameAssetURL({id: game?.id, hash: game?.coverImage, size:"1024", keepAspectRatio: true});
    const image = useMemo(() => new Image(), []);

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!imageURL) imageURL = NewGameStore.getCoverImageUrl(game?.id);
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
        <WidgetCard widget={widget} game={game} user={user} image={image} imageURL={imageURL} loading={loading} ref={ref} type="FAVORITE" />
    )
}