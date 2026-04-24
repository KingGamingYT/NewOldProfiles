import { Data, Patcher, DOM, Utils, Components, Webpack } from "betterdiscord";
import { entireProfileModal, FormSwitch, ProfileFetch, ProfileModalEntrypoint } from "@modules/common";
import { UserProfileStore, UserStore } from '@modules/stores';
import { settings } from "@common/settings";
import { createElement, useState, useRef, useEffect } from "react";
import { locale } from "@common/locale";
import { tabs } from "@common/tabs";
import { headerBuilder } from '@components/builders/header/builder';
import { bodyBuilder } from '@components/builders/bodyBase';
import { addProfileCSS } from "@common/styles";

function Starter({props, res}) {
    const options = {
        walkable: [
            'props',
            'children'
        ],
        ignore: []
    };
    const data = Utils.findInTree(props, (tree) => tree && Object.hasOwn(tree, 'initialSection'), options)
    const user = data?.user ?? props.user;
    const currentUser = data?.currentUser ?? UserStore.getCurrentUser();
    const displayProfile = data?.displayProfile ?? props.displayProfile;
    const [tab, setTab] = useState(locale.Sections[data?.initialSection] || tabs.ABOUT);
    const ref = useRef(null);

    if (Data.load('disableProfileThemes')) {
        res.props.className = Utils.className(res.props.className, "disable-profile-themes");
    }
    
    useEffect(() => {
        (async () => {
            if (!UserProfileStore.getMutualFriends(user.id)) { 
                await ProfileFetch(user.id, { withMutualFriends: true })
            }
        })()
    }, [user.id])
    return [
        createElement('div', {className: "inner", "data-user-id": user.id, "data-is-self": user.id === currentUser.id }, 
            [
                createElement(headerBuilder, {props, user, currentUser, displayProfile, tab, setTab, ref}),
                createElement(bodyBuilder, {data, user, currentUser, displayProfile, tab, ref})
            ]
        )
    ]
}

export default class NewOldProfiles {
    constructor(meta){}
    async start() {
        addProfileCSS();
        Patcher.after(entireProfileModal.A, "render", (that, [props], res) => {
            if (!props.themeType?.includes("MODAL")) return;

            if (!Utils.findInTree(props, x => x?.displayProfile, { walkable: ['props', 'children'] })) return;
            if (!Utils.findInTree(props, (tree) => { return tree && Object.hasOwn(tree, 'currentUser'), { walkable: ['props', 'children'] }})) {
                return res.props.children;
            }
            res.props.children = createElement(Starter, {props, res})
        })
        Patcher.after(await Webpack.waitForModule(Webpack.Filters.bySource('UserProfileModalV2', 'defaultWishlistId')), "A", (that, [props], res) => {
            const button = Utils.findInTree(res, (tree) => tree && Object.hasOwn(tree, 'parentComponent'), { walkable: ['props', 'children'] })
            const layoutContainer = button.children[0].props.children.props;
            useEffect(() => {layoutContainer.children[1].props.children[0]?.props?.children[0]?.props?.onClose()}, []);
            layoutContainer.children[0].props.children[0] = undefined;
        })
    }
    stop() {
        Patcher.unpatchAll("NewOldProfiles");
        DOM.removeStyle('profileCSS');
    }

    getSettingsPanel() {
        return [
            createElement('div', { className: "settingsContainer" },
                createElement(() => Object.keys(settings.main).map((key) => {
                        const { name, note, initial, changed } = settings.main[key];
                        const [state, setState] = useState(Data.load(key));

                        return createElement(FormSwitch, {
                            label: name,
                            description: note,
                            checked: state ?? initial,
                            onChange: (v) => {
                                Data.save(key, v);
                                setState(v);
                                if (changed)
                                    changed(v);
                            }
                        });
                    }
                ))
            ),
            createElement(Components.SettingGroup, {
            name: "Server Profile Settings",
            collapsible: true,
            shown: false,
            children:
                createElement('div', { className: "settingsContainer" },
                    createElement(() => Object.keys(settings.serverCategory).map((key) => {
                        const { name, note, initial, changed } = settings.serverCategory[key];
                        const [state, setState] = useState(Data.load(key));

                        return createElement(FormSwitch, {
                            label: name,
                            description: note,
                            checked: state ?? initial,
                            onChange: (v) => {
                                Data.save(key, v);
                                setState(v);
                                if (changed)
                                    changed(v);
                            }
                        });
                    }))
                )
            }
        )
	]}
}