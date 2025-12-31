import { useState } from 'react';
import { ApplicationStreamPreviewStore, useStateFromStores } from '@modules/stores';
import { TooltipBuilder } from '@components/common/TooltipBuilder';
import { locale } from '@common/locale';

export function ConsoleImageAsset({url, platform}) {
    return (
        <img 
            className={`assetsLargeImage${platform} assetsLargeImage`} 
            style={{ width: "60px", height: "60px" }}
            src={url}
        />
    )
}

export function FallbackAsset(props) {
    return (
        <svg {...props}>
            <path
                style={{ transform: "scale(1.65)" }}
                fill="white" 
                d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm6.81 7c-.54 0-1 .26-1.23.61A1 1 0 0 1 8.92 8.5 3.49 3.49 0 0 1 11.82 7c1.81 0 3.43 1.38 3.43 3.25 0 1.45-.98 2.61-2.27 3.06a1 1 0 0 1-1.96.37l-.19-1a1 1 0 0 1 .98-1.18c.87 0 1.44-.63 1.44-1.25S12.68 9 11.81 9ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7-10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            />
        </svg> 
    )
}

export function GameIconAsset({url, name}) {
    const [shouldFallback, setShouldFallback] = useState(false);

    return (
        <>
            { shouldFallback ? ( <FallbackAsset className="gameIcon" style={{ width: "40px", height: "40px" }} /> ) :
                <img 
                    className="gameIcon"
                    style={{ width: "40px", height: "40px" }}
                    aria-label={locale.Strings.GAME_ICON_FOR({ game: name })}
                    src={url}
                    onError={() => (setShouldFallback(true))}
                ></img>
            }
        </> 
    )
}

export function RichImageAsset({url, tooltipText, onClick, type}) {
    const [shouldFallback, setShouldFallback] = useState(false);

    return (
        <TooltipBuilder note={tooltipText}>
            { shouldFallback ? ( <FallbackAsset className={`assets${type}Image`} /> ) :
                <img 
                    className={`assets${type}Image`}
                    aria-label={tooltipText}
                    alt={tooltipText}
                    src={url}
                    onClick={onClick}
                    onError={() => (setShouldFallback(true))}
                ></img>
            }
        </TooltipBuilder> 
    )
}

export function TwitchImageAsset({url, imageId, altText}) {
    return (
        <>
            { !imageId ? ( <FallbackAsset className="assetsLargeImage" /> ) :
                <img 
                    className="assetsLargeImageTwitch assetsLargeImage"
                    aria-label={altText}
                    alt={altText}
                    src={url}
                    onError={(e) => e.currentTarget.src = 'https://static-cdn.jtvnw.net/ttv-static/404_preview-162x90.jpg'}
                ></img>
            }
        </> 
    )
}

export function StreamImageAsset({stream}) {
    const preview = useStateFromStores([ ApplicationStreamPreviewStore ], () => ApplicationStreamPreviewStore.getPreviewURLForStreamKey(`${stream?.streamType}:${stream?.guildId}:${stream?.channelId}:${stream?.ownerId}`));
    return (
        <>
            { 
                preview
                ? <img
                    className="streamPreviewImage"
                    src={preview}
                />
                : <img 
                    className="streamPreviewPlaceholder"
                    src={'https://discord.com/assets/6b1a461f35c05c7a.svg'}
                />
            }
        </>
    )
}