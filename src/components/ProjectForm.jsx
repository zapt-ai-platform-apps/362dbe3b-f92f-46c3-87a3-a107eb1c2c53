import { For, Show } from 'solid-js';

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

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">تفاصيل المشروع</h2>
      <input
        type="text"
        placeholder="اسم المشروع"
        value={projectName()}
        onInput={(e) => setProjectName(e.target.value)}
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black"
      />

      <div class="mb-4">
        <p class="mb-2 font-semibold text-gray-700">اختر لغات البرمجة:</p>
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
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black"
      >
        <option value="" disabled selected>
          اختر نوع الموقع
        </option>
        <For each={projectTypes}>
          {(type) => <option value={type}>{type}</option>}
        </For>
      </select>

      <textarea
        placeholder="حدد متطلباتك وميزات الموقع الذي تريد إنشاءه"
        value={projectRequirements()}
        onInput={(e) => setProjectRequirements(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black"
        rows="5"
      />

      <button
        onClick={handleGenerateCode}
        class={`mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={loading()}
      >
        <Show when={loading()} fallback="إنشاء الموقع باستخدام الذكاء الاصطناعي">
          جاري الإنشاء...
        </Show>
      </button>
    </div>
  );
}

export default ProjectForm;