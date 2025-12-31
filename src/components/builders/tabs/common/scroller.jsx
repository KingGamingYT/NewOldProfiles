export function Scroller({children, type, padding}) {
    return <div className={`${type.includes("INFO") ? "info" : "list"}Scroller scrollerBase`} style={{ overflow: "hidden scroll", paddingRight: `${padding}px` || "0px" }}>{children}</div>
}