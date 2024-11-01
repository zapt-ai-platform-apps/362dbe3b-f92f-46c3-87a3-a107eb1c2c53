import { createSignal } from 'solid-js';
import { createEvent } from './supabaseClient';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import Preview from './components/Preview';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DOMPurify from 'dompurify';
import { useI18n } from 'solid-i18n';

function App() {
  const [projectName, setProjectName] = createSignal('');
  const [selectedLanguages, setSelectedLanguages] = createSignal([]);
  const [projectType, setProjectType] = createSignal('');
  const [projectRequirements, setProjectRequirements] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedFiles, setGeneratedFiles] = createSignal({});
  const [t, { locale }] = useI18n();

  const availableLanguages = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'PHP',
  ];

  const projectTypes = [
    { value: 'business_website', label: { ar: 'موقع تجاري', en: 'Business Website', fr: 'Site Web d\'entreprise' } },
    { value: 'personal_blog', label: { ar: 'مدونة شخصية', en: 'Personal Blog', fr: 'Blog personnel' } },
    { value: 'news_website', label: { ar: 'موقع إخباري', en: 'News Website', fr: 'Site d\'actualités' } },
    { value: 'portfolio', label: { ar: 'موقع محفظة أعمال', en: 'Portfolio Website', fr: 'Site de portfolio' } },
    { value: 'educational', label: { ar: 'موقع تعليمي', en: 'Educational Website', fr: 'Site éducatif' } },
    { value: 'ecommerce', label: { ar: 'متجر إلكتروني', en: 'E-commerce Website', fr: 'Site e-commerce' } },
    { value: 'web_app', label: { ar: 'تطبيق ويب', en: 'Web Application', fr: 'Application Web' } },
    { value: 'forum', label: { ar: 'منتدى', en: 'Forum', fr: 'Forum' } },
    { value: 'social_network', label: { ar: 'شبكة اجتماعية', en: 'Social Network', fr: 'Réseau social' } },
  ];

  const handleGenerateCode = async () => {
    if (!projectName() || selectedLanguages().length === 0 || !projectType() || !projectRequirements()) {
      alert(t('enter_all_fields'));
      return;
    }
    setLoading(true);
    try {
      const selectedLangsStr = selectedLanguages().join(', ');

      const selectedProjectTypeLabel = projectTypes.find((type) => type.value === projectType()).label[locale()];

      const prompt = t('prompt_template', {
        languages: selectedLangsStr,
        project_type: selectedProjectTypeLabel,
        project_name: projectName(),
        requirements: projectRequirements(),
      });

      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json',
      });

      if (result) {
        setGeneratedFiles(result);
      } else {
        alert(t('error_generating_code'));
      }
    } catch (error) {
      console.error('Error generating code:', error);
      alert(t('error_generating_code'));
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
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-black">
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