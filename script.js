let transitionActive = false;

// Fare hareketine duyarlı şekiller
document.addEventListener('mousemove', (e) => {
  if (transitionActive) return;

  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Çeviri dosyalarını dinamik yükleyen fonksiyon
function loadTranslations(lang) {
  return fetch(`./${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Çeviri dosyası yüklenemedi.');
      }
      return response.json();
    });
}

// Sayfadaki çevirileri güncelleyen fonksiyon
function setLanguage(translations) {
  document.querySelectorAll('[data-key]').forEach(elem => {
    const key = elem.getAttribute('data-key');
    if (translations[key]) {
      elem.innerText = translations[key];
    }
  });
}

// Dil butonlarına tıklama olayını ekleyelim
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedLang = btn.getAttribute('data-lang');
    loadTranslations(selectedLang)
      .then(translations => {
        setLanguage(translations);
        localStorage.setItem('selectedLang', selectedLang);
      })
      .catch(error => console.error('Çeviri hatası:', error));
  });
});

// Sayfa yüklendiğinde, daha önce seçilmiş dil varsa onu uygula
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLang') || 'en';
  loadTranslations(savedLang)
    .then(translations => {
      setLanguage(translations);
    })
    .catch(error => console.error('Çeviri hatası:', error));
});

// Navigasyon bağlantılarının (örneğin, projeler sayfasına geçiş) tıklama olayını yakalıyoruz.
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = link.getAttribute('href');

    transitionActive = true;

    // Blob'lara geçiş animasyonunu başlatan sınıfı ekleyin
    document.querySelectorAll('.shape').forEach(shape => {
      shape.style.transform = ''; // Inline transform'u temizle
      shape.classList.add('transition-active');
    });

    // Animasyon tamamlandıktan sonra sayfayı yönlendirin
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1000); // 1 saniye animasyon süresi
  });
});

document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Slideshow'u durdur
    clearInterval(slideshowInterval);

    // Bu projeye ait resmi göster
    const imgPath = item.getAttribute('data-img');
    const preview = document.getElementById('projectPreview');
    preview.style.backgroundImage = `url(${imgPath})`;
  });

  item.addEventListener('mouseleave', () => {
    // Kullanıcı projeden ayrılınca slideshow'u yeniden başlat
    startSlideshow();
  });
});

const slideshowImages = [
  'images/slide1.png',
  'images/slide2.png',
  'images/slide3.png'
];

let currentSlideIndex = 0;       // Başlangıçta ilk resim
let slideshowInterval = null;    // setInterval referansı

// Bir resmi gösteren fonksiyon
function showSlide(index) {
  const preview = document.getElementById('projectPreview');
  preview.style.backgroundImage = `url(${slideshowImages[index]})`;
}

// Slideshow'u başlatan fonksiyon
function startSlideshow() {
  // Eğer zaten çalışıyorsa önce durdur (tekrar çağrılırsa sorun olmasın)
  if (slideshowInterval) clearInterval(slideshowInterval);

  slideshowInterval = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
    showSlide(currentSlideIndex);
  }, 2500); // 2.5 saniyede bir resim değişecek
}

window.addEventListener('DOMContentLoaded', () => {
  // İlk resmi göster
  showSlide(currentSlideIndex);
  // Slideshow'u başlat
  startSlideshow();

  // (Eğer bu sayfada da dil/tema vb. kodlar varsa onları da burada çağırın)
});

