

export function DataTab({ user }) {
    const sections = [{ section: "BOT_DATA_ACCESS", text: "Data Access" }]
    const BotProfile = BdApi.ReactUtils.wrapInHooks(BdApi.Webpack.getByStrings('hideRestrictedProfile', 'isNonUserBot'))({user})
    const BotProfileInner = BdApi.ReactUtils.wrapInHooks(BotProfile.type)({user})
    const point = BdApi.Utils.findInTree(BotProfileInner, (tree) => tree?.className?.includes('body'), {walkable: ['props', 'children'] });
    const bar = BdApi.ReactUtils.wrapInHooks(point.children[1].type)({user, items: sections});
    const BotDataComponent = bar.props.children[1].type;
    return <BotDataComponent user={user} section={"BOT_DATA_ACCESS"} />
}