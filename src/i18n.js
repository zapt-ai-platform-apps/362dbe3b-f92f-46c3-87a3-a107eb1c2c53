import { createI18nContext } from 'solid-i18n';

const dict = {
  en: {
    app_title: 'Professional Website Builder',
    project_details: 'Project Details',
    project_name: 'Project Name',
    select_languages: 'Select Programming Languages:',
    select_project_type: 'Select Project Type',
    specify_requirements: 'Specify your requirements and desired features',
    generate_website: 'Generate Website using AI',
    generating: 'Generating...',
    enter_all_fields: 'Please enter project name, select programming languages, project type, and specify requirements.',
    error_generating_code: 'An error occurred while generating the code. Please try again.',
    preview_website: 'Website Preview',
    download_code: 'Download Code as ZIP',
    loading: 'Loading...',
    prompt_template: `Create a software project using "{languages}" languages for a {project_type} named "{project_name}". It should meet the following requirements:\n{requirements}\nEnsure all specified programming languages are appropriately integrated in the project. Split the code into separate files according to language and functionality (e.g., index.html, styles.css, script.js), and send the code as a JSON object with filenames as keys and file contents as values.`,
  },
  ar: {
    app_title: 'منشئ المواقع الاحترافي',
    project_details: 'تفاصيل المشروع',
    project_name: 'اسم المشروع',
    select_languages: 'اختر لغات البرمجة:',
    select_project_type: 'اختر نوع الموقع',
    specify_requirements: 'حدد متطلباتك وميزات الموقع الذي تريد إنشاءه',
    generate_website: 'إنشاء الموقع باستخدام الذكاء الاصطناعي',
    generating: 'جاري الإنشاء...',
    enter_all_fields: 'يرجى إدخال اسم المشروع، اختيار لغات البرمجة، نوع المشروع، وتحديد المتطلبات.',
    error_generating_code: 'حدث خطأ أثناء إنشاء الكود. يرجى المحاولة مرة أخرى.',
    preview_website: 'معاينة الموقع',
    download_code: 'تحميل الكود كملف مضغوط',
    loading: 'جاري التحميل...',
    prompt_template: `قم بإنشاء مشروع برمجي يستخدم لغات البرمجة "{languages}" لموقع {project_type} باسم "{project_name}". يجب أن يلبي المتطلبات التالية:\n{requirements}\nتأكد من دمج جميع لغات البرمجة المحددة بشكل مناسب في المشروع. قم بتقسيم الكود إلى ملفات منفصلة حسب اللغة والوظيفة (مثل index.html، styles.css، script.js)، وأرسل الكود ككائن JSON بالمفتاح كأسماء الملفات والقيم كمحتوى الملفات.`,
  },
  fr: {
    app_title: 'Constructeur de sites web professionnel',
    project_details: 'Détails du projet',
    project_name: 'Nom du projet',
    select_languages: 'Sélectionnez les langages de programmation:',
    select_project_type: 'Sélectionnez le type de projet',
    specify_requirements: 'Spécifiez vos exigences et les fonctionnalités souhaitées',
    generate_website: 'Générer le site web à l\'aide de l\'IA',
    generating: 'Génération en cours...',
    enter_all_fields: 'Veuillez saisir le nom du projet, sélectionner les langages de programmation, le type de projet et spécifier les exigences.',
    error_generating_code: 'Une erreur s\'est produite lors de la génération du code. Veuillez réessayer.',
    preview_website: 'Aperçu du site Web',
    download_code: 'Télécharger le code en ZIP',
    loading: 'Chargement...',
    prompt_template: `Créez un projet logiciel utilisant les langages "{languages}" pour un {project_type} nommé "{project_name}". Il doit répondre aux exigences suivantes:\n{requirements}\nAssurez-vous que tous les langages de programmation spécifiés sont correctement intégrés dans le projet. Divisez le code en fichiers séparés selon le langage et la fonctionnalité (par exemple, index.html, styles.css, script.js), et envoyez le code sous la forme d'un objet JSON avec les noms de fichiers comme clés et le contenu des fichiers comme valeurs.`,
  }
};

const i18nContext = createI18nContext(dict, 'ar');

export default i18nContext;