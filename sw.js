// اسم كاش جديد ومختلف
const CACHE_NAME = 'azkar-app-cache-v-simple-test';

// حدث التثبيت: بسيط جداً، فقط تفعيل فوري
self.addEventListener('install', (event) => {
  console.log('[SW Simple Test] Install event');
  event.waitUntil(self.skipWaiting());
});

// حدث التفعيل: بسيط جداً، فقط التحكم الفوري
self.addEventListener('activate', (event) => {
    console.log('[SW Simple Test] Activate event');
    event.waitUntil(self.clients.claim());
     // حذف أي كاشات قديمة تبدأ بـ azkar-app-cache-
     event.waitUntil(
         caches.keys().then((cacheNames) => {
             return Promise.all(
                 cacheNames.map((cacheName) => {
                     if (cacheName.startsWith('azkar-app-cache-') && cacheName !== CACHE_NAME) {
                         console.log('[SW Simple Test] Deleting old cache:', cacheName);
                         return caches.delete(cacheName);
                     }
                 })
             );
         })
     );
});

// حدث الجلب: بسيط جداً، بيجيب من النت علطول
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});