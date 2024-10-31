import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { createEvent, supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { saveAs } from 'file-saver';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedCode, setGeneratedCode] = createSignal('');
  const [downloadUrl, setDownloadUrl] = createSignal('');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      setCurrentPage('homePage')
    }
  }

  onMount(checkUserSignedIn)

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user)
        setCurrentPage('homePage')
      } else {
        setUser(null)
        setCurrentPage('login')
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  })

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const handleGenerateCode = async () => {
    if (!projectDescription()) {
      alert('يرجى إدخال وصف للمشروع.');
      return;
    }
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `قم بإنشاء كود لموقع ويب احترافي باللغة العربية يدعم جميع لغات البرمجة بناءً على الوصف التالي:\n${projectDescription()}\nأعد الكود داخل مجلد مضغوط بصيغة base64.`,
        response_type: 'json'
      });
      if (result && result.base64_zip) {
        setGeneratedCode(result.base64_zip);
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
    const byteCharacters = atob(generatedCode());
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/zip' });
    saveAs(blob, 'project.zip');
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">تسجيل الدخول باستخدام ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                تعرف على المزيد حول ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                view="magic_link"
                showLinks={false}
                authView="magic_link"
              />
            </div>
          </div>
        }
      >
        <div class="max-w-4xl mx-auto h-full">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">منشئ المواقع الاحترافي</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              تسجيل الخروج
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">وصف المشروع</h2>
            <textarea
              placeholder="أدخل وصفًا للموقع الذي تريد إنشاءه"
              value={projectDescription()}
              onInput={(e) => setProjectDescription(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-black"
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
              <h2 class="text-2xl font-bold mb-4 text-purple-600">تحميل الكود المولد</h2>
              <button
                onClick={handleDownloadCode}
                class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              >
                تحميل الكود كاملاً في ملف Zip
              </button>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default App;