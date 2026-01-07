import { UserStore, DetectableGameSupplementalStore } from '@modules/stores';
import { GameProfileOpen } from '@common/GameProfileOpen';

export function GameCover({game, image, imageURL}) {
    const user = UserStore.getCurrentUser();

    return (
        <div 
            className="gameCover hoverActiveEffect"
            onClick={() => DetectableGameSupplementalStore.getGame(game.id) && GameProfileOpen({gameId: game.id, userId: user.id})}>
            <img
                alt={game?.name}
                className="gameCover"
                style={{ objectFit: "cover" }}
                src={`${image.src}`}
            />
        </div>
    )
}