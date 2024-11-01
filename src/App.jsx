import { createSignal } from 'solid-js';
import { createEvent } from './supabaseClient';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import Preview from './components/Preview';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DOMPurify from 'dompurify';

function App() {
  const [projectName, setProjectName] = createSignal('');
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
        <Header />
        <ProjectForm
          projectName={projectName}
          setProjectName={setProjectName}
          availableLanguages={availableLanguages}
          selectedLanguages={selectedLanguages}
          toggleLanguage={toggleLanguage}
          projectTypes={projectTypes}
          projectType={projectType}
          setProjectType={setProjectType}
          projectRequirements={projectRequirements}
          setProjectRequirements={setProjectRequirements}
          loading={loading}
          handleGenerateCode={handleGenerateCode}
        />
        <Preview
          generatedFiles={generatedFiles}
          sanitizedHTML={sanitizedHTML}
          handleDownloadCode={handleDownloadCode}
        />
      </div>
    </div>
  );
}

export default App;