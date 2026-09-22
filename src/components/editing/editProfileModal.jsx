import { ReactUtils } from "betterdiscord";
import { useState, useCallback, useMemo } from "react";
import { ModalRoot, SliderAnimatedContainer, UnsavedNoticeContainer, SaveBar, UserProfileSettingsActionCreators, UserProfilePendingChangesActionCreators, InvalidUsernameToast, ToastMap, Toast, SetGuildIdentity, Settings } from "@modules/common";
import { UserProfileSettingsStore, UserStore, useStateFromStores } from "@modules/stores";
import { ProfileEditingPanel } from "./editProfilePanel";
import { locale } from "@common/locale";

function UpdateSettingsErrorToast() {
  return (
    <ToastMap>
      {Toast(locale.Strings.EDIT_PROFILE_GENERIC_ERROR(), "failure")}
    </ToastMap>
  )
}

function UserProfilePendingChangesBar() {
  const {canSubmit, errors} = useStateFromStores([ UserProfileSettingsStore ], () => ({
    canSubmit: UserProfileSettingsStore.canSubmit(),
    errors: UserProfileSettingsStore.getErrors()
  }));
  const [submitting, setSubmitting] = useState(false);
  const errorMessage = useMemo(() => Object.keys(errors ?? {}).length > 0 ? locale.Strings.EDIT_PROFILE_GENERIC_ERROR() : null, [errors]);
  
  const handleSubmit = useCallback(async () => {
    setSubmitting(true);

    const pendingChanges = UserProfileSettingsStore.getPendingChanges();
    const pendingUserIdentityChanges = UserProfilePendingChangesActionCreators.getAccountIdentityPatch(pendingChanges);
    const pendingUserProfileChanges = UserProfilePendingChangesActionCreators.getUserProfilePatch(pendingChanges);
    const pendingGuildIdentityChanges = UserProfilePendingChangesActionCreators.getGuildIdentityPatch(pendingChanges);

    let isUpdated = false;
    
    if (Object.keys(pendingUserIdentityChanges).length > 0) {
      const updatedUserIdentity = await UserProfileSettingsActionCreators.saveProfileChanges(pendingUserIdentityChanges);
      if (isUpdated = isUpdated && (updatedUserIdentity?.ok ?? false), updatedUserIdentity?.ok) {
        const response = updatedUserIdentity.body;
        // there's supposed to be an analytic track here for USER_AVATAR_UPDATED
        UserProfileSettingsActionCreators.clearErrors();
      }
      else {
        updatedUserIdentity?.body?.username != null && ReactUtils.wrapInHooks(InvalidUsernameToast)();
      }
    }

    if (Object.keys(pendingUserProfileChanges).length > 0) {
      const {bannerOriginalMd5, ...rest} = pendingUserProfileChanges;
      const updatedProfileSettings = await UserProfileSettingsActionCreators.updateProfileSettings(rest, undefined, bannerOriginalMd5);
      isUpdated = isUpdated && (updatedProfileSettings?.ok ?? false);
      updatedProfileSettings?.ok ? UserProfileSettingsActionCreators.resetPendingProfileChanges() : ReactUtils.wrapInHooks(UpdateSettingsErrorToast)();
    }
    if (pendingChanges.pendingLegacyUsernameDisabled !== undefined) {
      try {
        await Settings.privacy.hideLegacyUsername.updateSetting(pendingChanges.pendingLegacyUsername);
        UserProfileSettingsActionCreators.resetPendingLegacyUsernameDisabled();
      }
      catch {
        ReactUtils.wrapInHooks(UpdateSettingsErrorToast)();
        isUpdated = false;
      }
    }
    if (Object.keys(pendingGuildIdentityChanges).length > 0) {
      const {primaryGuildId} = pendingGuildIdentityChanges;
      if (primaryGuildId !== undefined) {
        const updatedGuildIdentity = await SetGuildIdentity(primaryGuildId, primaryGuildId !== null);
        isUpdated = isUpdated && (updatedGuildIdentity?.ok ?? false);
        updatedGuildIdentity?.ok ? UserProfileSettingsActionCreators.resetPendingPrimaryGuildChanges() : ReactUtils.wrapInHooks(UpdateSettingsErrorToast)();
      }
    }
    isUpdated && UserProfileSettingsActionCreators.clearErrors();
    setSubmitting(false);
  }, []);

  const handleReset = useCallback(() => {
    UserProfileSettingsActionCreators.resetPendingChanges();
  }, []);

  return <SaveBar 
    submitting={submitting} 
    onSave={handleSubmit} 
    onReset={handleReset} 
    disabled={!canSubmit} 
    errorMessage={errorMessage ?? undefined}
  />
}

function UnsavedContentNotice() {
  const shouldShowNotice = useStateFromStores([ UserProfileSettingsStore ], () => UserProfileSettingsStore.showNotice());
  return (
      <SliderAnimatedContainer component="div">
          {shouldShowNotice ? <UnsavedNoticeContainer className="editingSectionUnsavedChangesBar">
              <UserProfilePendingChangesBar />
          </UnsavedNoticeContainer> : null}
      </SliderAnimatedContainer>
  )
}

export function ProfileEditingModal(props) {
  const [isDismissable, setDismissable] = useState(props.dismissable);
  const user = useStateFromStores([ UserStore ], () => UserStore.getCurrentUser());
  const shouldShowNotice = useStateFromStores([ UserProfileSettingsStore ], () => UserProfileSettingsStore.showNotice());
  isDismissable && shouldShowNotice ? props.dismissable = false : props.dismissable = true;

  return (
    <>
        <ModalRoot.Modal {...props} title={locale.Strings.EDIT_PROFILE()} size="lg">
            <ProfileEditingPanel user={user} />
        </ModalRoot.Modal>
        <UnsavedContentNotice />
    </>
  )
}