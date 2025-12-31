export function FallbackCover(game) {
    return (
        <div className="gameCover">
            <div className="fallback gameCover">
                <div className="coverFallbackText">{game?.name || "Unknown Game"}</div>
            </div>
        </div>
    )
}