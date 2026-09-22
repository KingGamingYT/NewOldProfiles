import { ButtonClasses, ModalSystem } from "@modules/common";
import { UserProfileSettingsStore, UserStore, useStateFromStores } from "@modules/stores";
import { ProfileEditingModal } from "./editProfileModal";
import { locale } from "@common/locale";

export function EditProfileButton() {
    const shouldShowNotice = useStateFromStores([UserProfileSettingsStore], () => UserProfileSettingsStore.showNotice());
    const currentUser = useStateFromStores([UserStore], () => UserStore.getCurrentUser());

    return (
        <button
            className={`${ButtonClasses.button} ${ButtonClasses.sm} ${ButtonClasses.primary} ${ButtonClasses.hasText}`}
            onClick={() => ModalSystem.openModal((props) => <ProfileEditingModal {...props} />, {modalKey: `EDIT_USER_PROFILE_MODAL_KEY:${currentUser.id}:`, dismissable: !shouldShowNotice})}>
            <div className={`${ButtonClasses.buttonChildrenWrapper}`}>
                <div className={`${ButtonClasses.buttonChildren}`} style={{ fontSize: "14px", fontWeight: 500 }}>{locale.Strings.EDIT_PROFILE()}</div>
            </div>
        </button>
    )
}