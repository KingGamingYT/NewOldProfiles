export function FallbackTab() {
    return (
        <div className="listScroller scrollerBase" style={{ overflow: "hidden scroll" }}>
            <img
                className="emptyIcon"
                style={{ alignSelf: "center" }}
                src={'https://discord.com/assets/8c998f8fb62016fcfb4901e424ff378b.svg'}
            />
            <div className="emptyText" style={{ textAlign: "center" }}>{"You've found yourself in the fallback tab! Close and re-open the profile to try again!"}</div>
        </div>
    )
}