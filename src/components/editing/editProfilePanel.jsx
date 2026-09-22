import { useState, useRef, useMemo, useCallback } from "react";
import { AvatarButton, AvatarDecorationButton, Text, TextInput, LabeledField, NameplateButton, EditableTileProfileButtons, SetPendingUserChanges, ManaButtons, PencilIcon, OpenDisplayNameStylesModal, RichTextArea, FieldSelect, SelectClasses, getAvailablePrimaryGuilds, GuildTag, ClanGuildIcon, GuildBadge } from "@modules/common";
import { UserProfileStore, UserProfileSettingsStore, UserStore, useStateFromStores } from "@modules/stores";
import { locale } from "@common/locale";

function EditingCategoryHeader({ variant, children }) {
  return <Text tag="legend" variant={variant ?? "heading-xl/normal"}>{children}</Text>
}

function EditingField({title, Component}) {}

function ServerTagSelect({availablePrimaryGuilds, pendingPrimaryGuildId, onChange}) {
  const guildDetails = useMemo(() => new Map(availablePrimaryGuilds.map(guild => [guild.id, guild])), [availablePrimaryGuilds]);
  const currentPrimaryGuildId = useStateFromStores([UserStore], () => UserStore.getCurrentUser()?.primaryGuild)?.guildId;
  let pendingGuildId = pendingPrimaryGuildId ? pendingPrimaryGuildId : currentPrimaryGuildId;
  const guildTags = useMemo(() => availablePrimaryGuilds.reduce((tags, guild) => (guild.profile?.tag != null && tags.push({
    label: guild.name,
    value: guild.id
  }), tags), []), [availablePrimaryGuilds]);

  const getGuildTag = useCallback(option => {
    if (option == null) return null;

    const guild = guildDetails.get(option.value);

    if (guild == null) return null;

    const guildTag = guild.profile?.tag;

    return guildTag == null ? null : <GuildTag 
      guildTag={guildTag}
      guildBadge={guild.profile?.badge}
      guildId={guild.id}
      guildName={option.label}
      guildIcon={guild.icon}
      guildIconSize={32}
    />
  }, [guildDetails]);

  const handleLeading = useCallback(option => {
    if (option == null) return null;
    
    const guild = guildDetails.get(option.value);
    return guild == null || guild.profile?.tag == null ? null : <ClanGuildIcon 
      guildId={guild.id}
      guildName={guild.name}
      guildIcon={guild.icon}
      iconSize={32}
      animate={false}
    />
  }, [guildDetails]);

  const handleTrailing = useCallback(option => {
    if (option == null) return null;

    const guild = guildDetails.get(option.value);

    if (guild == null) return null;

    const guildTag = guild.profile?.tag;

    return guildTag == null ? null : <GuildBadge 
      guildId={guild.id}
      guildTag={guildTag}
      guildBadge={guild.profile?.badge}
      badgeSize="SIZE_16"
      textColor="interactive-text-default"
      textVariant="text-sm/semibold"
    />
  }, [guildDetails]);

  const handleOption = useCallback(options => {
    const option = options[0];
    return option == null ? null : <>{
      getGuildTag(option)
    }</>
  }, [getGuildTag]);

  const handleSelect = useCallback(option => {
    onChange?.(option);
  }, [onChange]);

  const isSelected = useCallback(option => option === pendingGuildId, [pendingGuildId]);

  const handleSerialization = useCallback(option => option, []); // caches option

  const handleClear = useCallback(() => {
    onSelect?.(null);
  }, [onChange]);

  const refDOM = useRef(null);
  return <FieldSelect 
    className={SelectClasses.select}
    optionClassName={SelectClasses.selectPopout}
    isSelected={isSelected}
    options={guildTags}
    select={handleSelect}
    renderLeading={handleLeading}
    renderTrailing={handleTrailing}
    renderOptionValue={handleOption}
    serialize={handleSerialization}
    clear={handleClear}
    clearable={pendingGuildId != null}
    maxVisibleItems={8}
    dataMigrationPending={true}
  />
}

export function ProfileEditingPanel({ user }) {
  const userProfile = useStateFromStores([UserProfileStore], () => UserProfileStore.getUserProfile(user.id));
  const {pendingGlobalName, 
    pendingBanner, 
    pendingBio, 
    pendingPronouns, 
    pendingAccentColor, 
    pendingThemeColors, 
    pendingLegacyUsernameDisabled, 
    pendingPrimaryGuildId, 
    errors} = useStateFromStores([UserProfileSettingsStore], () => {
      const pendingChanges = UserProfileSettingsStore.getPendingChanges();
      const errors = UserProfileSettingsStore.getErrors();
      return {
        ...pendingChanges,
        errors
      }
  });
  const availablePrimaryGuilds = getAvailablePrimaryGuilds();

  return (
    <>
      <div className="editingSectionDecoration">
        <div>
          <EditingCategoryHeader variant="text-md/medium">{locale.Strings.AVATAR_AND_DECORATION()}</EditingCategoryHeader>
          <div className="editingSectionContainer" style={{gap: "var(--space-8)"}}>
            <div className="editingSectionInnerContainer">
              <AvatarButton user={user} />
              <AvatarDecorationButton user={user} />
            </div>
            <NameplateButton user={user} />
          </div>
        </div>
        <div>
          <EditingCategoryHeader variant="text-md/medium">{locale.Strings.THEME_AND_BANNER()}</EditingCategoryHeader>
          <div className="editingSectionContainer">
            <div className="editingSectionInnerContainer">
              <EditableTileProfileButtons.ThemeButton user={user} />
              <EditableTileProfileButtons.BannerButton userId={user.id} />
            </div>
          </div>
        </div>
        <div>
          <EditingCategoryHeader variant="text-md/medium">{locale.Strings.PROFILE_EFFECT_AND_FRAME()}</EditingCategoryHeader>
          <div className="editingSectionContainer">
            <div className="editingSectionInnerContainer">
              <EditableTileProfileButtons.EffectButton user={user} variant="square" />
              <EditableTileProfileButtons.FrameButton user={user} />
            </div>
          </div>
        </div>
      </div>
      <EditingCategoryHeader>{locale.Strings.ABOUT_ME()}</EditingCategoryHeader>
      <div className="editingSectionContainer">
        <LabeledField layout="horizontal" label={locale.Strings.DISPLAY_NAME()}>
          <div className="editingSectionDisplayNameContainer">
            <TextInput 
              value={pendingGlobalName ?? user.globalName} 
              placeholder={user.username} 
              maxLength={32}
              onChange={(change) => SetPendingUserChanges({
                globalName: change
            })} />
            <ManaButtons.IconOnlyButton 
              icon={() => <PencilIcon color={"currentColor"} />}
              variant="primary"
              tooltipText={locale.Strings.EDIT_DISPLAY_NAME_STYLE()}
              ariaLabel={locale.Strings.EDIT_DISPLAY_NAME_STYLE()}
              fullWidth={true}
              onClick={() => OpenDisplayNameStylesModal({analyticsLocation: null})}
            />
          </div>
        </LabeledField>
        {availablePrimaryGuilds.length > 0 && <LabeledField layout="horizontal" role="guild-tag" label={locale.Strings.SERVER_TAG()}>
          <ServerTagSelect
            availablePrimaryGuilds={availablePrimaryGuilds}
            pendingPrimaryGuildId={pendingPrimaryGuildId} 
            onChange={(change) => SetPendingUserChanges({
              primaryGuildId: change
            })}
          />
        </LabeledField>}
        <LabeledField layout="horizontal" label={locale.Strings.PRONOUNS()}>
          <TextInput
            value={pendingPronouns ?? userProfile.pronouns}
            placeholder={locale.Strings.ADD_YOUR_PRONOUNS()}
            maxLength={40}
            onChange={(change) => SetPendingUserChanges({
              pronouns: change
            })}
          />
        </LabeledField>
        <LabeledField layout="horizontal" role="bio" label={locale.Strings.BIO()}>
          <RichTextArea 
            value={pendingBio ?? userProfile.bio}
            maxLength={190}
            onChange={(change) => SetPendingUserChanges({
              bio: change
            })}
          />
        </LabeledField>
      </div>
    </>
  )
}