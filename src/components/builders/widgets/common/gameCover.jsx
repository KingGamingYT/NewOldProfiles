import { UserStore } from '@modules/stores';
import { GameProfileOpen } from '@common/GameProfileOpen';

export function GameCover({game, image, imageURL}) {
    const user = UserStore.getCurrentUser();

    return (
        <div 
            className="gameCover hoverActiveEffect"
            onClick={() => imageURL != null && GameProfileOpen({gameId: game.id, userId: user.id})}>
            <img
                alt={game?.name}
                className="gameCover"
                style={{ objectFit: "cover" }}
                src={`${image.src}`}
            />
        </div>
    )
}