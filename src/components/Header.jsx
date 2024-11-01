import { useI18n } from 'solid-i18n';

function Header() {
  const [t, { locale }] = useI18n();

  const changeLanguage = (e) => {
    locale(e.target.value);
  };

  return (
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-purple-600">{t('app_title')}</h1>
      <select
        onChange={changeLanguage}
        class="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
      >
        <option value="ar">العربية</option>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default Header;