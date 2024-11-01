import { Show } from 'solid-js';
import { useI18n } from 'solid-i18n';

function Preview(props) {
  const { generatedFiles, sanitizedHTML, handleDownloadCode } = props;
  const [t] = useI18n();

  return (
    <Show when={Object.keys(generatedFiles()).length > 0}>
      <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">{t('preview_website')}</h2>
        <div class="border border-gray-300 rounded-lg overflow-hidden">
          <iframe srcDoc={sanitizedHTML()} class="w-full h-96"></iframe>
        </div>
        <button
          onClick={handleDownloadCode}
          class="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          {t('download_code')}
        </button>
      </div>
    </Show>
  );
}

export default Preview;