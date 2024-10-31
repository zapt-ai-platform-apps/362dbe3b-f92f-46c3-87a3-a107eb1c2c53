import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';
import { saveAs } from 'file-saver';
import DOMPurify from 'dompurify';

function App() {
  const [projectName, setProjectName] = createSignal('');
  const [projectType, setProjectType] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedCode, setGeneratedCode] = createSignal('');

  const projectTypes = [
    'موقع تجاري',
    'مدونة شخصية',
    'موقع إخباري',
    'موقع محفظة أعمال',
    'موقع تعليمي',
    'متجر إلكتروني',
  ];

  const handleGenerateCode = async () => {
    if (!projectName() || !projectType() || !projectDescription()) {
      alert('يرجى إدخال اسم المشروع، اختيار نوع المشروع، ووصف للمشروع.');
      return;
    }
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `قم بإنشاء كود HTML لموقع ويب احترافي باللغة العربية باسم "${projectName()}", نوعه "${projectType()}", وبناءً على الوصف التالي:\n${projectDescription()}\n`,
        response_type: 'text'
      });
      if (result) {
        setGeneratedCode(result);
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

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode()], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'index.html');
  };

  const sanitizedHTML = () => DOMPurify.sanitize(generatedCode());

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
          <select
            value={projectType()}
            onInput={(e) => setProjectType(e.target.value)}
            class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          >
            <option value="" disabled selected>اختر نوع المشروع</option>
            {projectTypes.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
          <textarea
            placeholder="أدخل وصفًا للموقع الذي تريد إنشاءه"
            value={projectDescription()}
            onInput={(e) => setProjectDescription(e.target.value)}
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

        <Show when={generatedCode()}>
          <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">معاينة الموقع</h2>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <div innerHTML={sanitizedHTML()} />
            </div>
            <button
              onClick={handleDownloadCode}
              class="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              تحميل الكود كملف HTML
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;