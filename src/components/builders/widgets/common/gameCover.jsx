import { GameProfileCheck } from '@modules/common'

export function GameCover({game, image, imageURL}) {
    return (
        <div 
            className="gameCover hoverActiveEffect"
            onClick={GameProfileCheck({trackEntryPointImpression: false, applicationId: game.id})}>
            <img
                alt={game?.name}
                className="gameCover"
                style={{ objectFit: "cover" }}
                src={`${image.src}`}
            />
        </div>
    )
}