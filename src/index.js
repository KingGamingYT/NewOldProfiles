import { Webpack, Data, Patcher, DOM, Utils, Components } from "betterdiscord";
import { entireProfileModal, FormSwitch } from "./modules";
import { settings } from "./settings";
import { createElement, useState, useRef, useMemo } from "react";
import { tabs } from "./globals";
import { headerBuilder, bodyBuilder } from "./builders";
import { profileCSS } from "./styles";

function Starter({props, res}) {
    const options = {
        walkable: [
            'props',
            'children'
        ],
        ignore: []
    };
    const data = Utils.findInTree(props, (tree) => Object.hasOwn(tree, 'initialSection'), options)
    const user = data.user;
    const currentUser = data.currentUser;
    const displayProfile = data.displayProfile;
    const [tab, setTab] = useState(tabs.ABOUT);
    const ref = useRef(null);

    const detailsCheck = useMemo(() => { 
        if (!data.displayProfile._userProfile) return null;
        return data.displayProfile._userProfile; }, [ data.displayProfile._userProfile ]
    );
    if (!detailsCheck) return;
    if (Data.load('disableProfileThemes')) {
        res.props.className = Utils.className(res.props.className, "disable-profile-themes");
    }
    return [
        createElement('div', {className: "inner"}, 
            [
                createElement(headerBuilder, {props, user, currentUser, displayProfile, tab, setTab, ref}),
                createElement(bodyBuilder, {data, user, displayProfile, tab, ref})
            ]
        )
    ]
}

export default class NewOldProfiles {
    constructor(meta){}
    start() {
        Utils.forceLoad(Webpack.getBySource(`"USER_PROFILE_MODAL_KEY:".concat`,{raw:true}).id).then(
            DOM.addStyle('profileCSS', profileCSS)
        );
        Patcher.after(entireProfileModal.Z, "render", (that, [props], res) => {
            if (!props.themeType?.includes("MODAL")) return;
            if (!Utils.findInTree(props, x => x?.displayProfile, { walkable: ['props', 'children'] })) return;
            if (!Utils.findInTree(props, (tree) => Object.hasOwn(tree, 'initialSection'), { walkable: ['props', 'children'] })) {
                return res.props.children;
            }
            res.props.children = createElement(Starter, {props, res})
        })
    }
    stop() {
        Patcher.unpatchAll("NewOldProfiles");
        DOM.removeStyle('profileCSS');
    }

    getSettingsPanel() {
        return [
            createElement(() => Object.keys(settings.main).map((key) => {
                    const { name, note, initial, changed } = settings.main[key];
                    const [state, setState] = useState(Data.load(key));

                    return createElement(FormSwitch, {
                        children: name,
                        note: note,
                        value: state ?? initial,
                        hideBorder: 1,
                        onChange: (v) => {
                            Data.save(key, v);
                            setState(v);
                            if (changed)
                                changed(v);
                        }
                    });
                }
            )),
            createElement(Components.SettingGroup, {
            name: "Server Profile Settings",
            collapsible: true,
            shown: false,
            children:
                createElement(() => Object.keys(settings.serverCategory).map((key) => {
                    const { name, note, initial, changed } = settings.serverCategory[key];
                    const [state, setState] = useState(Data.load(key));

                    return createElement(FormSwitch, {
                        children: name,
                        note: note,
                        value: state ?? initial,
                        onChange: (v) => {
                            Data.save(key, v);
                            setState(v);
                            if (changed)
                                changed(v);
                        }
                    });
                }))
            }
        )
	]}
}