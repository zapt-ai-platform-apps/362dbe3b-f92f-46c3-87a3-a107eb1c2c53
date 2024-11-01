import { createSignal, Show, For } from 'solid-js';
import { createEvent } from './supabaseClient';
import { saveAs } from 'file-saver';
import DOMPurify from 'dompurify';
import JSZip from 'jszip';

function App() {
  const [projectName, setProjectName] = createSignal('');
  const [projectLanguages, setProjectLanguages] = createSignal([]);
  const [selectedLanguages, setSelectedLanguages] = createSignal([]);
  const [projectType, setProjectType] = createSignal('');
  const [projectRequirements, setProjectRequirements] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedFiles, setGeneratedFiles] = createSignal({});

  const availableLanguages = [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'Ruby',
    'PHP',
    'Java',
    'C#',
    'C++',
    'TypeScript',
  ];

  const projectTypes = [
    'موقع تجاري',
    'مدونة شخصية',
    'موقع إخباري',
    'موقع محفظة أعمال',
    'موقع تعليمي',
    'متجر إلكتروني',
    'تطبيق ويب',
    'منتدى',
    'شبكة اجتماعية',
  ];

  const handleGenerateCode = async () => {
    if (!projectName() || selectedLanguages().length === 0 || !projectType() || !projectRequirements()) {
      alert('يرجى إدخال اسم المشروع، اختيار لغات البرمجة، نوع المشروع، وتحديد المتطلبات.');
      return;
    }
    setLoading(true);
    try {
      const selectedLangsStr = selectedLanguages().join(', ');
      const prompt = `قم بإنشاء مشروع برمجي بلغة${selectedLanguages().length > 1 ? 'ات' : ''} "${selectedLangsStr}" لموقع ${projectType()} باسم "${projectName()}". يجب أن يلبي المتطلبات التالية:\n${projectRequirements()}\n
      قم بتقسيم الكود إلى ملفات منفصلة حسب اللغة والوظيفة (مثل index.html، styles.css، script.js)، وأرسل الكود ككائن JSON بالمفتاح كأسماء الملفات والقيم كمحتوى الملفات.`;

      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json',
      });

      if (result) {
        setGeneratedFiles(result);
      } else {
        alert('حدث خطأ أثناء إنشاء الكود. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      alert('حدث خطأ أثناء إنشاء الكود. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCode = async () => {
    const zip = new JSZip();

    for (const filename in generatedFiles()) {
      zip.file(filename, generatedFiles()[filename]);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${projectName() || 'project'}.zip`);
  };

  const sanitizedHTML = () => {
    const htmlContent = generatedFiles()['index.html'] || '';
    return DOMPurify.sanitize(htmlContent);
  };

  const toggleLanguage = (language) => {
    if (selectedLanguages().includes(language)) {
      setSelectedLanguages(selectedLanguages().filter((lang) => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages(), language]);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-black">
      <div class="max-w-4xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">منشئ المواقع الاحترافي</h1>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4 text-purple-600">تفاصيل المشروع</h2>
          <input
            type="text"
            placeholder="اسم المشروع"
            value={projectName()}
            onInput={(e) => setProjectName(e.target.value)}
            class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          />

          <div class="mb-4">
            <p class="mb-2 font-semibold text-gray-700">اختر لغات البرمجة:</p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <For each={availableLanguages}>
                {(language) => (
                  <label class="flex items-center space-x-2">
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
            class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          >
            <option value="" disabled selected>اختر نوع الموقع</option>
            <For each={projectTypes}>
              {(type) => (
                <option value={type}>{type}</option>
              )}
            </For>
          </select>

          <textarea
            placeholder="حدد متطلباتك وميزات الموقع الذي تريد إنشاءه"
            value={projectRequirements()}
            onInput={(e) => setProjectRequirements(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            rows="5"
          />

          <button
            onClick={handleGenerateCode}
            class={`mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading()}
          >
            <Show when={loading()} fallback="إنشاء الموقع باستخدام الذكاء الاصطناعي">
              جاري الإنشاء...
            </Show>
          </button>
        </div>

        <Show when={Object.keys(generatedFiles()).length > 0}>
          <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">معاينة الموقع</h2>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <iframe srcDoc={sanitizedHTML()} class="w-full h-96"></iframe>
            </div>
            <button
              onClick={handleDownloadCode}
              class="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              تحميل الكود كملف مضغوط
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;