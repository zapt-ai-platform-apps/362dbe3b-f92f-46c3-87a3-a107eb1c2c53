import { For, Show } from 'solid-js';
import { useI18n } from 'solid-i18n';

function ProjectForm(props) {
  const {
    projectName,
    setProjectName,
    availableLanguages,
    selectedLanguages,
    toggleLanguage,
    projectTypes,
    projectType,
    setProjectType,
    projectRequirements,
    setProjectRequirements,
    loading,
    handleGenerateCode,
  } = props;

  const [t, { locale }] = useI18n();

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">{t('project_details')}</h2>
      <input
        type="text"
        placeholder={t('project_name')}
        value={projectName()}
        onInput={(e) => setProjectName(e.target.value)}
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black"
      />

      <div class="mb-4">
        <p class="mb-2 font-semibold text-gray-700">{t('select_languages')}</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <For each={availableLanguages}>
            {(language) => (
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLanguages().includes(language)}
                  onChange={() => toggleLanguage(language)}
                  class="cursor-pointer"
                />
                <span>{language}</span>
              </label>
            )}
          </For>
        </div>
      </div>

      <select
        value={projectType()}
        onInput={(e) => setProjectType(e.target.value)}
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black cursor-pointer"
      >
        <option value="" disabled selected>
          {t('select_project_type')}
        </option>
        <For each={projectTypes}>
          {(type) => (
            <option value={type.value}>{type.label[locale()]}</option>
          )}
        </For>
      </select>

      <textarea
        placeholder={t('specify_requirements')}
        value={projectRequirements()}
        onInput={(e) => setProjectRequirements(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black"
        rows="5"
      />

      <button
        onClick={handleGenerateCode}
        class={`mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading()}
      >
        <Show when={loading()} fallback={t('generate_website')}>
          {t('generating')}
        </Show>
      </button>
    </div>
  );
}

export default ProjectForm;