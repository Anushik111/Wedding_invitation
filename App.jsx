import React, { useEffect, useMemo, useState } from "react";
import { MapPin, CalendarDays, Clock3, Heart, Music2, Volume2, VolumeX, ChevronDown, Flower2 } from "lucide-react";

// Փոխիր այս արժեքները՝ հրավիրատոմսը քո հարսանիքին համապատասխանեցնելու համար։
const WEDDING = {
  bride: "Mane",
  groom: "Harutyun",
  dateLabel: "20 ՀՈՒՆԻՍ • 2027",
  dateISO: "2027-06-20T10:00:00+04:00",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
  // Կարող ես ավելացնել քո լուսանկարի հղումը այստեղ։
  quote: "Սերը երկու սրտերի հանդիպումը չէ միայն, այլ ամեն օր միմյանց նորից ընտրելու ամենագեղեցիկ որոշումը։",
  locations: [
    {
      time: "10:00",
      hy: "Հարսի տուն",
      ru: "Дом невесты",
      en: "Bride’s home",
      descriptionHy: "Մեր օրը սկսվում է այստեղ",
      descriptionRu: "Здесь начинается наш день",
      descriptionEn: "Where our day begins",
      mapUrl: "https://maps.google.com/?q=Armenia"
    },
    {
      time: "13:00",
      hy: "Սուրբ Սարգիս եկեղեցի",
      ru: "Церковь Святого Саркиса",
      en: "Saint Sarkis Church",
      descriptionHy: "Պսակադրության արարողություն",
      descriptionRu: "Церемония венчания",
      descriptionEn: "Wedding ceremony",
      mapUrl: "https://yandex.com/maps/org/armenian_apostolic_church_of_st_sarkis/242380405723/?ll=39.182941%2C51.674349&z=16"
    },
    {
      time: "17:00",
      hy: "Grace Hall",
      ru: "Grace Hall",
      en: "Grace Hall",
      descriptionHy: "Տոնական ընթրիք և ուրախություն",
      descriptionRu: "Праздничный ужин и веселье",
      descriptionEn: "Dinner, dancing & celebration",
      mapUrl: "https://yandex.com/maps/org/grace_hall/80368514301/?ll=39.544018%2C52.591290&z=16"
    }
  ],
  // Աուդիոյի հղումը ավելացրու այստեղ՝ օրինակ Dropbox-ի ?raw=1 հղումը։
  musicUrl: ""
};

const translations = {
  hy: {
    invite: "Սիրով հրավիրում ենք Ձեզ մեր հարսանիքին",
    date: "ՄԵՐ ՀԱՏՈՒԿ ՕՐԸ",
    countdown: "Մնացել է մինչև մեր հարսանիքը",
    days: "օր", hours: "ժամ", minutes: "րոպե", seconds: "վայրկյան",
    schedule: "Մեր օրվա ծրագիրը",
    scheduleSub: "Կլինենք ուրախ՝ կիսելով այս պահերը Ձեզ հետ",
    dressTitle: "Դրես-կոդ",
    dressText: "Մենք հրաժարվել ենք խիստ դրես-կոդից և չենք սահմանափակում Ձեզ որոշակի գույներով կամ ոճով։ Մեզ համար ամենակարևորը Ձեր ներկայությունն է, ժպիտներն ու լավ տրամադրությունը։ Ընտրեք հագուստ, որում Ձեզ գեղեցիկ և հարմարավետ կզգաք։ Միակ խնդրանքը՝ աղջիկներին խնդրում ենք զերծ մնալ սպիտակ զգեստներից, որպեսզի այդ գույնը մնա բացառապես հարսնացուինը։",
    gallery: "Մեր հիշողությունները",
    gallerySub: "Մի քանի ակնթարթ՝ մեր սիրո պատմությունից",
    location: "Բացել քարտեզը",
    footer: "Սիրով՝ Harutyun & Mane",
    musicOn: "Միացնել երաժշտությունը",
    musicOff: "Անջատել երաժշտությունը",
    noMusic: "Երաժշտության հղումը ավելացրու կոդում՝ WEDDING.musicUrl դաշտում։"
  },
  ru: {
    invite: "С любовью приглашаем Вас на нашу свадьбу",
    date: "НАШ ОСОБЕННЫЙ ДЕНЬ",
    countdown: "До нашей свадьбы осталось",
    days: "дней", hours: "часов", minutes: "минут", seconds: "секунд",
    schedule: "План нашего дня",
    scheduleSub: "Будем счастливы разделить эти моменты с Вами",
    dressTitle: "Дресс-код",
    dressText: "Мы решили отказаться от строгого дресс-кода и не ограничивать Вас определёнными цветами или стилем. Для нас важнее всего Ваше присутствие, улыбки и хорошее настроение. Выбирайте одежду, в которой чувствуете себя красиво и комфортно. Единственная просьба к девушкам — воздержаться от белых платьев, чтобы этот цвет остался исключительно цветом невесты.",
    gallery: "Наши воспоминания",
    gallerySub: "Несколько мгновений из нашей истории любви",
    location: "Открыть карту",
    footer: "С любовью, Harutyun & Mane",
    musicOn: "Включить музыку",
    musicOff: "Выключить музыку",
    noMusic: "Добавьте ссылку на музыку в поле WEDDING.musicUrl."
  },
  en: {
    invite: "With love, we invite you to celebrate our wedding",
    date: "OUR SPECIAL DAY",
    countdown: "Counting down to our wedding",
    days: "days", hours: "hours", minutes: "minutes", seconds: "seconds",
    schedule: "The day's itinerary",
    scheduleSub: "We would be delighted to share these moments with you",
    dressTitle: "Dress code",
    dressText: "We have chosen to keep our dress code relaxed, with no restrictions on colors or styles. What matters most to us is your presence, smiles, and good energy. Wear whatever makes you feel beautiful and comfortable. Our only request is that ladies avoid white dresses, leaving that color for the bride.",
    gallery: "Our memories",
    gallerySub: "A few moments from our love story",
    location: "Open map",
    footer: "With love, Harutyun & Mane",
    musicOn: "Play music",
    musicOff: "Pause music",
    noMusic: "Add your audio link in the WEDDING.musicUrl field."
  }
};

const galleryImages = [
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"
];

function getCountdown(dateISO) {
  const diff = Math.max(0, new Date(dateISO).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  };
}

export default function App() {
  const [lang, setLang] = useState("hy");
  const [countdown, setCountdown] = useState(() => getCountdown(WEDDING.dateISO));
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [slide, setSlide] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(WEDDING.dateISO)), 1000);
    return () => clearInterval(timer);
  }, []);

  const labels = useMemo(() => ({
    days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds
  }), [t]);

  function toggleMusic() {
    const audio = document.getElementById("wedding-audio");
    if (!WEDDING.musicUrl) {
      alert(t.noMusic);
      return;
    }
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {
        alert("Երաժշտությունը չհաջողվեց միացնել։ Ստուգիր հղումը։");
      });
    }
  }

  return (
    <main>
      <div className="topbar">
        <a className="monogram" href="#home" aria-label="Home">H <span>&</span> M</a>
        <div className="language-switch" aria-label="Language">
          {["hy", "ru", "en"].map((item) => (
            <button key={item} className={lang === item ? "active" : ""} onClick={() => setLang(item)}>
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-photo-wrap">
          <img className="hero-photo" src={WEDDING.heroImage} alt="Wedding couple" />
          <div className="photo-shade" />
          <span className="photo-caption">THE BEGINNING OF FOREVER</span>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">{t.date}</span>
          <h1><span>{WEDDING.groom}</span><i>&</i><span>{WEDDING.bride}</span></h1>
          <div className="ornament"><span /><Heart size={15} strokeWidth={1.2} /><span /></div>
          <p className="quote">“{WEDDING.quote}”</p>
          <p className="invite-text">{t.invite}</p>
          <div className="wedding-date"><CalendarDays size={17} strokeWidth={1.4} /> {WEDDING.dateLabel}</div>
          <a className="scroll-link" href="#schedule"><ChevronDown size={18} /> <span>SCROLL TO EXPLORE</span></a>
        </div>
        <Flower2 className="hero-flower flower-one" strokeWidth={0.7} />
        <Flower2 className="hero-flower flower-two" strokeWidth={0.7} />
      </section>

      <section className="countdown-section">
        <p className="section-kicker">{t.countdown}</p>
        <div className="countdown-grid">
          {Object.entries(countdown).map(([key, value]) => (
            <div className="countdown-item" key={key}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{labels[key]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="schedule-section section-pad" id="schedule">
        <div className="section-heading">
          <span className="section-kicker">SAVE THE DATE</span>
          <h2>{t.schedule}</h2>
          <p>{t.scheduleSub}</p>
          <div className="ornament"><span /><Heart size={14} strokeWidth={1.2} /><span /></div>
        </div>
        <div className="timeline">
          {WEDDING.locations.map((place, index) => (
            <article className={`timeline-item item-${index + 1}`} key={place.time}>
              <div className="timeline-time"><Clock3 size={15} /> {place.time}</div>
              <div className="timeline-dot"><span /></div>
              <div className="timeline-card">
                <span className="place-number">0{index + 1}</span>
                <h3>{place[lang]}</h3>
                <p>{place[`description${lang.toUpperCase()}`]}</p>
                <a href={place.mapUrl} target="_blank" rel="noreferrer" className="map-link">
                  <MapPin size={15} /> {t.location}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dress-section section-pad">
        <div className="dress-card">
          <Flower2 className="dress-flower" strokeWidth={0.8} />
          <span className="section-kicker">A NOTE FROM US</span>
          <h2>{t.dressTitle}</h2>
          <div className="small-divider">✳</div>
          <p>{t.dressText}</p>
        </div>
      </section>

      <section className="gallery-section section-pad">
        <div className="section-heading">
          <span className="section-kicker">LOVE IN FRAMES</span>
          <h2>{t.gallery}</h2>
          <p>{t.gallerySub}</p>
        </div>
        <div className="gallery">
          <button className="gallery-arrow prev" onClick={() => setSlide((slide + galleryImages.length - 1) % galleryImages.length)} aria-label="Previous photo">‹</button>
          <img src={galleryImages[slide]} alt={`Wedding memory ${slide + 1}`} />
          <button className="gallery-arrow next" onClick={() => setSlide((slide + 1) % galleryImages.length)} aria-label="Next photo">›</button>
          <div className="gallery-dots">
            {galleryImages.map((_, i) => <button key={i} onClick={() => setSlide(i)} className={slide === i ? "selected" : ""} aria-label={`Show photo ${i + 1}`} />)}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-ornament"><span /><Heart size={20} /><span /></div>
        <h2>{WEDDING.groom} <i>&</i> {WEDDING.bride}</h2>
        <p>{t.footer}</p>
        <button className={`music-button ${musicPlaying ? "playing" : ""}`} onClick={toggleMusic}>
          {musicPlaying ? <VolumeX size={17} /> : <Music2 size={17} />}
          {musicPlaying ? t.musicOff : t.musicOn}
        </button>
        {WEDDING.musicUrl && <audio id="wedding-audio" src={WEDDING.musicUrl} loop preload="none" onPause={() => setMusicPlaying(false)} />}
        <span className="closing-date">{WEDDING.dateLabel}</span>
      </section>
    </main>
  );
}