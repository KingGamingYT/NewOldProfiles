import { Webpack } from "betterdiscord";
import { Clamp, ClampedText } from "@modules/common";
import { TooltipBuilder } from '@components/common/TooltipBuilder';

const BoxClasses = Webpack.getByKeys("overflowCount", "circle");
const Lodash = Webpack.getByKeys('clamp');

const positions = [[{
    top: 15,
    left: 15,
    width: 28,
    height: 28
}], [{
    top: 7,
    left: 7,
    width: 20,
    height: 20
}, {
    top: 25,
    left: 25,
    width: 26,
    height: 26
}], [{
    top: 5,
    left: 10,
    width: 18,
    height: 18
}, {
    top: 15,
    left: 31,
    width: 22,
    height: 22
}, {
    top: 29,
    left: 5,
    width: 24,
    height: 24
}], [{
    top: 5,
    left: 5,
    width: 22,
    height: 22
}, {
    top: 7,
    left: 33,
    width: 18,
    height: 18
}, {
    top: 33,
    left: 7,
    width: 18,
    height: 18
}, {
    top: 31,
    left: 31,
    width: 22,
    height: 22
}]]

export function VoiceBox({users, channel, themeType}) {
    const isOverflown = users.length > 4;
    const overflowCount = users.length - 3;

    return (
        <div className={BoxClasses.container}>
            {positions[Lodash.clamp(users.length - 1, 0, positions.length - 1)].map((pos, index) => {
                const user = users[index];
                return (
                    !user ? null : <div className={BoxClasses.circle} style={pos}>{
                        (isOverflown && index === (overflowCount >= 10 ? 3 : 1)) ? <div className={BoxClasses.overflowCount}>
                            <Clamp.E variant={"text-xxs/semibold"} lineClamp={1}>
                                <ClampedText>{overflowCount > 99 ? ">99" : `+${overflowCount}`}</ClampedText>
                            </Clamp.E>
                        </div> : <TooltipBuilder note={user.globalName || user.username}>
                            <img className={BoxClasses.avatar} src={user.getAvatarURL(channel.guild_id, "SIZE_80")} alt=""></img>
                        </TooltipBuilder>
                    }</div>
                )
            })}
        </div>
    )
}