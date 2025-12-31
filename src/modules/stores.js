import { Webpack } from 'betterdiscord';

export const AccessibilityStore = /* @__PURE__ */ Webpack.getStore('AccessibilityStore');
export const RelationshipStore = /* @__PURE__ */ Webpack.getStore('RelationshipStore');
export const ActivityStore = /* @__PURE__ */ Webpack.getStore("PresenceStore");
export const UserStore = /* @__PURE__ */ Webpack.getStore("UserStore");
export const ChannelStore = /* @__PURE__ */ Webpack.getStore("ChannelStore");
export const DetectableGameSupplementalStore = /* @__PURE__ */ Webpack.getStore("DetectableGameSupplementalStore");
export const GuildStore = /* @__PURE__ */ Webpack.getStore("GuildStore");
export const StreamStore = /* @__PURE__ */ Webpack.getStore('ApplicationStreamingStore');
export const UserProfileStore = /* @__PURE__ */ Webpack.getStore('UserProfileStore');
export const ApplicationStore = /* @__PURE__ */ Webpack.getStore('ApplicationStore');
export const ApplicationStreamPreviewStore = /* @__PURE__ */ Webpack.getStore('ApplicationStreamPreviewStore');
export const VoiceStateStore = /* @__PURE__ */ Webpack.getStore('VoiceStateStore');
export const GuildMemberStore = /* @__PURE__ */ Webpack.getStore('GuildMemberStore');
export const StreamerModeStore = /* @__PURE__ */ Webpack.getStore('StreamerModeStore');
export const { useStateFromStores } = /* @__PURE__ */ Webpack.getMangled(m => m.Store, {
        useStateFromStores: /* @__PURE__ */ Webpack.Filters.byStrings("useStateFromStores")
        }, { raw: true });