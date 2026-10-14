
import React, { useState, useEffect, useRef } from 'react';

import AnimatedTitle from './AnimatedTitle.jsx';


// SVG Icons for clean, zero-dependency rendering
const CameraIcon = () => (
  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4 text-emerald-400 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-emerald-400 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Preset tema untuk menu Setting (warna swatch hanya untuk pratinjau tombol)
const THEME_OPTIONS = [
  { value: 'dark', label: 'Dark Modern', bg: '#0f172a', accent: '#34d399' },
  { value: 'light', label: 'Light Clean', bg: '#ffffff', accent: '#0284c7' },
  { value: 'amber', label: 'Amber Caution', bg: '#18181b', accent: '#f59e0b' },
  { value: 'red', label: 'Emergency Red', bg: '#450a0a', accent: '#f87171' },
  { value: 'emerald', label: 'Field Emerald', bg: '#064e3b', accent: '#34d399' },
  { value: 'cyber', label: 'Cyber Neon', bg: '#0f0720', accent: '#06b6d4' },
  { value: 'blueprint', label: 'Blueprint', bg: '#0a2540', accent: '#38bdf8' },
  { value: 'glass', label: 'Frost Glass', bg: '#64748b', accent: '#ffffff' },
];

const POSITION_OPTIONS = [
  { value: 'top-left', label: '↖ Kiri Atas' },
  { value: 'top-right', label: '↗ Kanan Atas' },
  { value: 'bottom-left', label: '↙ Kiri Bawah' },
  { value: 'bottom-right', label: '↘ Kanan Bawah' },
];

const SETTINGS_KEY = 'geomap-overlay-settings-v1';
const DEFAULT_SETTINGS = {
  overlayPosition: 'bottom-left',
  themeColor: 'dark',
  overlayScale: 205,
  cardOpacity: 25,
  cardRadius: 12,
  customBgColor: '#0f172a',
  customTextColor: '#ffffff',
  customAccentColor: '#38bdf8',
  showThumb: true,
  thumbSize: 110,
  thumbShape: 'rounded', // 'rounded' | 'square' | 'circle'
  thumbFit: 'cover', // 'cover' | 'contain'
  layoutStyle: 'card', // 'card' | 'timestamp'
};

// Helper function to convert HEX color to RGBA
const hexToRgba = (hex, alpha) => {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

// Helper function to format date into Indonesian standard format
const formatIndonesianDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Format tanggal untuk template Timestamp: "15 Oktober 2026" + hari "Kamis"
const formatTimestampDate = (dateStr) => {
  if (!dateStr) return { dateText: '', dayText: '' };
  const parts = dateStr.split('-');
  if (parts.length !== 3) return { dateText: dateStr, dayText: '' };
  const [year, month, day] = parts;
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return {
    dateText: dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    dayText: dateObj.toLocaleDateString('id-ID', { weekday: 'long' }),
  };
};

// Ubah "-5.365792, 105.145480 (78m Alt)" menjadi "5.365792°S, 105.145480°E"
const formatCoordLabel = (coordStr) => {
  const m = (coordStr || '').match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!m) return coordStr || '';
  const lat = parseFloat(m[1]);
  const lng = parseFloat(m[2]);
  return `${Math.abs(lat).toFixed(6)}°${lat < 0 ? 'S' : 'N'}, ${Math.abs(lng).toFixed(6)}°${lng < 0 ? 'W' : 'E'}`;
};

// Default sample SVG pattern for initial image state
const createSampleImage = (text, bg, fg) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 800);
  grad.addColorStop(0, bg || '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 800);

  // Grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 1200; i += 40) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 800); ctx.stroke();
  }
  for (let j = 0; j < 800; j += 40) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(1200, j); ctx.stroke();
  }

  // Text
  ctx.fillStyle = fg || '#94a3b8';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 600, 400);

  return canvas.toDataURL();
};

// ===== Komponen UI gaya iPhone (iOS) =====
const IOS_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
const TAB_TITLES = { home: 'Home', tools: 'Setting', about: 'About' };

const HomeIcon = ({ active }) => (
  <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
  </svg>
);
const ToolsIcon = ({ active }) => (
  <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
    <circle cx="15" cy="7" r="2.2" />
    <circle cx="9" cy="17" r="2.2" />
  </svg>
);
const InfoIcon = ({ active }) => (
  <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" stroke={active ? '#1c1c1e' : 'currentColor'} strokeLinecap="round" />
    <circle cx="12" cy="7.8" r="0.4" stroke={active ? '#1c1c1e' : 'currentColor'} strokeWidth="1.6" />
  </svg>
);
const EllipsisCircleIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="8" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="16" cy="12" r="1" fill="currentColor" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#0a84ff] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const IOSGroup = ({ title, footer, children }) => (
  <section className="mb-6 px-4">
    {title && <h3 className="px-4 mb-1.5 text-[13px] uppercase tracking-wide text-[#8e8e93]">{title}</h3>}
    <div className="rounded-[12px] bg-[#1c1c1e] overflow-hidden divide-y divide-white/10">{children}</div>
    {footer && <p className="px-4 mt-1.5 text-[13px] leading-snug text-[#8e8e93]">{footer}</p>}
  </section>
);

const IOSRow = ({ label, onClick, tint, destructive, disabled, children }) => {
  const Tag = onClick ? 'button' : 'div';
  const color = destructive ? 'text-[#ff453a]' : tint ? 'text-[#0a84ff]' : 'text-white';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      disabled={onClick ? disabled : undefined}
      className={`w-full min-h-[44px] px-4 py-2.5 flex items-center justify-between gap-3 text-left ${
        onClick ? 'active:bg-white/10 cursor-pointer disabled:opacity-50' : ''
      }`}
    >
      <span className={`text-[17px] ${color}`}>{label}</span>
      {children}
    </Tag>
  );
};

const IOSField = ({ label, children }) => (
  <label className="block px-4 py-2.5">
    <span className="block text-[13px] text-[#8e8e93] mb-0.5">{label}</span>
    {children}
  </label>
);

const IOSSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="relative w-[51px] h-[31px] rounded-full transition-colors shrink-0 cursor-pointer"
    style={{ background: checked ? '#30d158' : '#39393d' }}
  >
    <span
      className="absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow transition-transform"
      style={{ transform: checked ? 'translateX(20px)' : 'none' }}
    />
  </button>
);

const IOSSegmented = ({ options, value, onChange }) => (
  <div className="flex p-[2px] rounded-[9px] bg-[#2c2c2e] overflow-x-auto">
    {options.map((o) => (
      <button
        key={o.value}
        type="button"
        onClick={() => onChange(o.value)}
        className={`flex-1 whitespace-nowrap px-3 py-1.5 rounded-[7px] text-[13px] font-medium transition cursor-pointer ${
          value === o.value ? 'bg-[#636366] text-white shadow' : 'text-white/75'
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const IOSSliderRow = ({ label, valueText, min, max, step, value, onChange, onReset }) => (
  <div className="px-4 py-3">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[17px]">{label}</span>
      <span className="text-[17px] text-[#8e8e93]">{valueText}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-[#0a84ff]"
    />
    {onReset && (
      <button type="button" onClick={onReset} className="mt-1 text-[13px] text-[#0a84ff] cursor-pointer">
        Kembalikan default
      </button>
    )}
  </div>
);

export default function GeomapOverlayGenerator() {
  const now = new Date();
  // Pakai waktu lokal perangkat (toISOString memakai UTC sehingga tanggal bisa mundur 1 hari)
  const pad2 = (n) => String(n).padStart(2, '0');
  const defaultDate = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
  const defaultTime = now.toTimeString().split(' ')[0]; // HH:mm:ss (dengan detik)

  const [mainImage, setMainImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [title, setTitle] = useState('GUDANG LINI III PESAWARAN');
  const [address, setAddress] = useState('Tamansari, Kec. Gedong Tataan, Kabupaten Pesawaran, Lampung 35366');
  const [coordinates, setCoordinates] = useState('-5.365792, 105.145480 (78m Alt)');
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [timezone, setTimezone] = useState('WIB'); // 'WIB', 'WITA', 'WIT', 'UTC'
  const [activity, setActivity] = useState("Jum'at Bersih"); // dipakai template Timestamp
  const [layoutStyle, setLayoutStyle] = useState(DEFAULT_SETTINGS.layoutStyle); // 'card' | 'timestamp'

  // Overlay Layout & Styling States
  const [overlayPosition, setOverlayPosition] = useState('bottom-left'); // 'bottom-left', 'bottom-right', 'top-left', 'top-right'
  const [themeColor, setThemeColor] = useState('dark'); // 'dark', 'light', 'amber', 'red', 'emerald', 'cyber', 'blueprint', 'glass', 'custom'
  const [overlayScale, setOverlayScale] = useState(205); // Overlay manual scale (50% - 250%)
  const [cardOpacity, setCardOpacity] = useState(85); // Card Opacity (20% - 100%)
  const [cardRadius, setCardRadius] = useState(12); // Corner radius (0 - 24)

  // Custom theme color pickers
  const [customBgColor, setCustomBgColor] = useState('#0f172a');
  const [customTextColor, setCustomTextColor] = useState('#ffffff');
  const [customAccentColor, setCustomAccentColor] = useState('#38bdf8');

  // Menu Setting (tema & slide)
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'tools' | 'about'
  const [showMenu, setShowMenu] = useState(false);
  const [settingsTab, setSettingsTab] = useState('data'); // 'data' | 'template' | 'tema' | 'slide' | 'thumbnail'
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Custom thumbnail
  const [showThumb, setShowThumb] = useState(DEFAULT_SETTINGS.showThumb);
  const [thumbSizeSetting, setThumbSizeSetting] = useState(DEFAULT_SETTINGS.thumbSize);
  const [thumbShape, setThumbShape] = useState(DEFAULT_SETTINGS.thumbShape);
  const [thumbFit, setThumbFit] = useState(DEFAULT_SETTINGS.thumbFit);

  const [isLocating, setIsLocating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  useEffect(() => {
    setMainImage(createSampleImage('Pilih / Ambil Foto Utama', '#1e293b', '#cbd5e1'));
    setThumbImage('/peta-default.jpg'); // Thumbnail peta default
  }, []);

  // Muat setting yang tersimpan di perangkat
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const saved = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
        setOverlayPosition(saved.overlayPosition);
        setThemeColor(saved.themeColor);
        setOverlayScale(Number(saved.overlayScale));
        setCardOpacity(Number(saved.cardOpacity));
        setCardRadius(Number(saved.cardRadius));
        setCustomBgColor(saved.customBgColor);
        setCustomTextColor(saved.customTextColor);
        setCustomAccentColor(saved.customAccentColor);
        setShowThumb(Boolean(saved.showThumb));
        setThumbSizeSetting(Number(saved.thumbSize));
        setThumbShape(saved.thumbShape);
        setThumbFit(saved.thumbFit);
        setLayoutStyle(saved.layoutStyle);
      }
    } catch (e) {
      console.warn('Gagal memuat setting:', e);
    }
    setSettingsLoaded(true);
  }, []);

  // Simpan setiap perubahan setting
  useEffect(() => {
    if (!settingsLoaded) return;
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          showThumb, thumbSize: thumbSizeSetting, thumbShape, thumbFit, layoutStyle,
          overlayPosition, themeColor, overlayScale, cardOpacity, cardRadius,
          customBgColor, customTextColor, customAccentColor,
        })
      );
    } catch (e) {
      console.warn('Gagal menyimpan setting:', e);
    }
  }, [
    settingsLoaded, overlayPosition, themeColor, overlayScale, cardOpacity, cardRadius,
    showThumb, thumbSizeSetting, thumbShape, thumbFit, layoutStyle,
    customBgColor, customTextColor, customAccentColor,
  ]);

  const handleUseNow = () => {
    const n = new Date();
    setDate(`${n.getFullYear()}-${pad2(n.getMonth() + 1)}-${pad2(n.getDate())}`);
    setTime(n.toTimeString().split(' ')[0]);
  };

  const handleResetSettings = () => {
    setOverlayPosition(DEFAULT_SETTINGS.overlayPosition);
    setThemeColor(DEFAULT_SETTINGS.themeColor);
    setOverlayScale(DEFAULT_SETTINGS.overlayScale);
    setCardOpacity(DEFAULT_SETTINGS.cardOpacity);
    setCardRadius(DEFAULT_SETTINGS.cardRadius);
    setCustomBgColor(DEFAULT_SETTINGS.customBgColor);
    setCustomTextColor(DEFAULT_SETTINGS.customTextColor);
    setCustomAccentColor(DEFAULT_SETTINGS.customAccentColor);
    setShowThumb(DEFAULT_SETTINGS.showThumb);
    setThumbSizeSetting(DEFAULT_SETTINGS.thumbSize);
    setThumbShape(DEFAULT_SETTINGS.thumbShape);
    setThumbFit(DEFAULT_SETTINGS.thumbFit);
    setLayoutStyle(DEFAULT_SETTINGS.layoutStyle);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocator tidak didukung oleh browser ini.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const alt = pos.coords.altitude ? `${Math.round(pos.coords.altitude)}m Alt` : '±10m';
        setCoordinates(`${lat}, ${lng} (${alt})`);

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          }
        } catch (e) {
          console.error('Gagal mendapatkan nama alamat dari koordinat:', e);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Gagal mendapatkan lokasi:', err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleImageChange = (e, target) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (target === 'main') setMainImage(event.target.result);
        if (target === 'thumb') setThumbImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = async () => {
    if (!mainImage || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Load Main Image
    const imgMain = new Image();
    imgMain.crossOrigin = 'anonymous';
    imgMain.src = mainImage;

    await new Promise((resolve) => {
      imgMain.onload = resolve;
    });

    // Set high-res canvas size based on main photo natural aspect ratio
    canvas.width = imgMain.naturalWidth || 1200;
    canvas.height = imgMain.naturalHeight || 800;

    // 1. Draw Main Background Image
    ctx.drawImage(imgMain, 0, 0, canvas.width, canvas.height);

    // Load Thumbnail Image
    let imgThumb = null;
    if (thumbImage && showThumb) {
      imgThumb = new Image();
      imgThumb.crossOrigin = 'anonymous';
      imgThumb.src = thumbImage;
      await new Promise((resolve) => {
        imgThumb.onload = resolve;
        imgThumb.onerror = resolve;
      });
    }

    // Dynamic overlay size scaling based on main canvas dimensions & user scale slider
    const scale = (canvas.width / 1200) * (overlayScale / 100);
    const padding = 24 * scale;
    const overlayWidth = Math.min(canvas.width * 0.95, 540 * scale);
    const thumbSize = (showThumb ? thumbSizeSetting : 0) * scale;
    const cardPadding = 16 * scale;
    const alphaVal = cardOpacity / 100;

    // Calculate position
    let x = padding;
    if (overlayPosition.includes('right')) {
      x = canvas.width - overlayWidth - padding;
    }

    const cardHeight = Math.max(thumbSize + cardPadding * 2, 130 * scale);
    let y = canvas.height - cardHeight - padding;
    if (overlayPosition.includes('top')) {
      y = padding;
    }

    // Determine Theme Color Styles
    let bgStyle, borderStyle, accentColor, textColorPrimary, textColorSecondary;

    switch (themeColor) {
      case 'light':
        bgStyle = `rgba(255, 255, 255, ${alphaVal})`;
        borderStyle = 'rgba(0, 0, 0, 0.15)';
        accentColor = '#0284c7'; // Sky Blue
        textColorPrimary = '#0f172a';
        textColorSecondary = '#334155';
        break;

      case 'amber':
        bgStyle = `rgba(24, 24, 27, ${alphaVal})`;
        borderStyle = 'rgba(245, 158, 11, 0.8)';
        accentColor = '#f59e0b'; // Amber
        textColorPrimary = '#ffffff';
        textColorSecondary = '#e4e4e7';
        break;

      case 'red':
        bgStyle = `rgba(69, 10, 10, ${alphaVal})`;
        borderStyle = 'rgba(239, 68, 68, 0.8)';
        accentColor = '#f87171'; // Red
        textColorPrimary = '#ffffff';
        textColorSecondary = '#fca5a5';
        break;

      case 'emerald':
        bgStyle = `rgba(6, 78, 59, ${alphaVal})`;
        borderStyle = 'rgba(16, 185, 129, 0.8)';
        accentColor = '#34d399'; // Emerald
        textColorPrimary = '#ffffff';
        textColorSecondary = '#a7f3d0';
        break;

      case 'cyber':
        bgStyle = `rgba(15, 7, 32, ${alphaVal})`;
        borderStyle = 'rgba(236, 72, 153, 0.8)';
        accentColor = '#06b6d4'; // Cyan Accent
        textColorPrimary = '#f472b6'; // Neon Pink Title
        textColorSecondary = '#e0e7ff';
        break;

      case 'blueprint':
        bgStyle = `rgba(10, 37, 64, ${alphaVal})`;
        borderStyle = 'rgba(56, 189, 248, 0.7)';
        accentColor = '#38bdf8'; // Sky Blue Accent
        textColorPrimary = '#ffffff';
        textColorSecondary = '#bae6fd';
        break;

      case 'glass':
        bgStyle = `rgba(255, 255, 255, ${Math.min(alphaVal, 0.35)})`;
        borderStyle = 'rgba(255, 255, 255, 0.4)';
        accentColor = '#ffffff';
        textColorPrimary = '#ffffff';
        textColorSecondary = '#f1f5f9';
        break;

      case 'custom':
        bgStyle = hexToRgba(customBgColor, alphaVal);
        borderStyle = customAccentColor;
        accentColor = customAccentColor;
        textColorPrimary = customTextColor;
        textColorSecondary = customTextColor;
        break;

      case 'dark':
      default:
        bgStyle = `rgba(15, 23, 42, ${alphaVal})`;
        borderStyle = 'rgba(255, 255, 255, 0.2)';
        accentColor = '#34d399'; // Mint Green
        textColorPrimary = '#ffffff';
        textColorSecondary = '#cbd5e1';
        break;
    }

    // ===== Template "Timestamp": thumbnail peta, jam besar, alamat, kotak info =====
    if (layoutStyle === 'timestamp') {
      const u = scale;
      const ff = 'Inter, "Helvetica Neue", Arial, sans-serif';
      const padEdge = 24 * u;
      const boxW = Math.min(canvas.width - padEdge * 2, 340 * u);
      const addrW = Math.min(canvas.width - padEdge * 2, 400 * u);
      const blockW = Math.max(boxW, addrW);
      const hasThumb = !!(imgThumb && imgThumb.complete && imgThumb.naturalWidth > 0);
      const T = hasThumb ? thumbSize * 1.25 : 0;
      const isTop = overlayPosition.includes('top');
      const x0 = overlayPosition.includes('right') ? canvas.width - padEdge - blockW : padEdge;

      // Hitung baris alamat (maks 3 baris)
      ctx.font = `${22 * u}px ${ff}`;
      const addrLines = (() => {
        const words = (address || '').split(' ').filter(Boolean);
        const lines = [];
        let cur = '';
        words.forEach((w) => {
          const test = cur ? `${cur} ${w}` : w;
          if (ctx.measureText(test).width > addrW && cur) {
            lines.push(cur);
            cur = w;
          } else {
            cur = test;
          }
        });
        if (cur) lines.push(cur);
        if (lines.length > 3) {
          const cut = lines.slice(0, 3);
          cut[2] += '…';
          return cut;
        }
        return lines;
      })();

      // Baris di dalam kotak info
      const rows = [
        title ? title.toUpperCase() : '',
        coordinates ? `Koordinat: ${formatCoordLabel(coordinates)}` : '',
        activity ? `Kegiatan: ${activity}` : '',
      ].filter(Boolean);

      const thumbBlock = hasThumb ? T + 16 * u : 0;
      const timeBlock = 74 * u;
      const addrBlock = addrLines.length * 30 * u + 10 * u;
      const boxH = rows.length ? 28 * u + rows.length * 36 * u : 0;
      const boxBlock = rows.length ? boxH + 14 * u : 0;
      const totalH = thumbBlock + timeBlock + addrBlock + boxBlock + 2 * u;
      const y0 = isTop ? padEdge : canvas.height - padEdge - totalH;

      // Scrim gelap tipis supaya teks tetap terbaca di foto terang
      const scrimH = totalH + padEdge * 2.5;
      const grad = isTop
        ? ctx.createLinearGradient(0, 0, 0, scrimH)
        : ctx.createLinearGradient(0, canvas.height, 0, canvas.height - scrimH);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.save();
      ctx.fillStyle = grad;
      ctx.fillRect(0, isTop ? 0 : canvas.height - scrimH, canvas.width, scrimH);
      ctx.restore();

      let cy = y0;

      // 1. Thumbnail peta
      if (hasThumb) {
        const thumbR =
          thumbShape === 'circle' ? T / 2
          : thumbShape === 'square' ? 0
          : Math.max(4, cardRadius) * u;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x0, cy, T, T, thumbR);
        ctx.clip();
        const iw = imgThumb.naturalWidth;
        const ih = imgThumb.naturalHeight;
        if (thumbFit === 'contain') {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
          ctx.fillRect(x0, cy, T, T);
          const ratio = Math.min(T / iw, T / ih);
          ctx.drawImage(imgThumb, x0 + (T - iw * ratio) / 2, cy + (T - ih * ratio) / 2, iw * ratio, ih * ratio);
        } else {
          const side = Math.min(iw, ih);
          ctx.drawImage(imgThumb, (iw - side) / 2, (ih - side) / 2, side, side, x0, cy, T, T);
        }
        ctx.restore();
        ctx.beginPath();
        ctx.roundRect(x0, cy, T, T, thumbR);
        ctx.lineWidth = 1.5 * u;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.stroke();
        cy += T + 16 * u;
      }

      // Bayangan lembut untuk teks polos
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
      ctx.shadowBlur = 4 * u;
      ctx.fillStyle = textColorPrimary;
      ctx.textBaseline = 'alphabetic';

      // 2. Jam besar (dipipihkan agar mirip font condensed) + garis vertikal + tanggal/hari
      const timeText = (time || '').slice(0, 5);
      const squeeze = 0.8;
      ctx.font = `bold ${78 * u}px ${ff}`;
      const timeW = ctx.measureText(timeText).width * squeeze;
      ctx.save();
      ctx.translate(x0, cy + 56 * u);
      ctx.scale(squeeze, 1);
      ctx.fillText(timeText, 0, 0);
      ctx.restore();

      const barX = x0 + timeW + 16 * u;
      ctx.save();
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = themeColor === 'dark' ? '#fbbf24' : accentColor;
      ctx.fillRect(barX, cy - 2 * u, 3 * u, 62 * u);
      ctx.restore();

      const { dateText, dayText } = formatTimestampDate(date);
      ctx.font = `${22 * u}px ${ff}`;
      ctx.fillText(dateText, barX + 16 * u, cy + 22 * u);
      ctx.fillText(dayText, barX + 16 * u, cy + 54 * u);
      cy += timeBlock;

      // 3. Alamat
      ctx.font = `${22 * u}px ${ff}`;
      addrLines.forEach((l, i) => ctx.fillText(l, x0, cy + 22 * u + i * 30 * u));
      cy += addrBlock;
      ctx.restore();

      // 4. Kotak info (judul, koordinat, kegiatan)
      if (rows.length) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x0, cy, boxW, boxH, cardRadius * u);
        ctx.fillStyle = bgStyle;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = textColorPrimary;
        ctx.textBaseline = 'middle';
        const textMaxW = boxW - 32 * u;
        rows.forEach((r, i) => {
          let size = 22 * u;
          ctx.font = `${size}px ${ff}`;
          while (ctx.measureText(r).width > textMaxW && size > 22 * u * 0.6) {
            size -= 0.5 * u;
            ctx.font = `${size}px ${ff}`;
          }
          ctx.fillText(r, x0 + 16 * u, cy + 14 * u + 18 * u + i * 36 * u);
        });
        ctx.restore();
        cy += boxH + 14 * u;
      }

      // 5. Garis tipis penutup
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 1.5 * u;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.moveTo(x0, cy);
      ctx.lineTo(x0 + boxW * 0.85, cy);
      ctx.stroke();
      ctx.restore();

      setIsProcessing(false);
      return;
    }

    // 2. Draw Card Container with Glassmorphism / Solid Theme Background
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, overlayWidth, cardHeight, cardRadius * scale);

    ctx.fillStyle = bgStyle;
    ctx.strokeStyle = borderStyle;

    ctx.fill();
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    // Accent Bar on Top of Overlay Card
    ctx.beginPath();
    ctx.lineWidth = 4 * scale;
    ctx.strokeStyle = accentColor;
    ctx.moveTo(x + (cardRadius + 2) * scale, y);
    ctx.lineTo(x + overlayWidth - (cardRadius + 2) * scale, y);
    ctx.stroke();

    // 3. Draw Thumbnail Picture
    const thumbX = x + cardPadding;
    const thumbY = y + cardPadding;

    const drawThumb = !!(imgThumb && imgThumb.complete && imgThumb.naturalWidth > 0);
    if (drawThumb) {
      const thumbR =
        thumbShape === 'circle' ? thumbSize / 2
        : thumbShape === 'square' ? 0
        : Math.max(4, cardRadius - 4) * scale;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(thumbX, thumbY, thumbSize, thumbSize, thumbR);
      ctx.clip();

      const iw = imgThumb.naturalWidth;
      const ih = imgThumb.naturalHeight;
      if (thumbFit === 'contain') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(thumbX, thumbY, thumbSize, thumbSize);
        const ratio = Math.min(thumbSize / iw, thumbSize / ih);
        const dw = iw * ratio;
        const dh = ih * ratio;
        ctx.drawImage(imgThumb, thumbX + (thumbSize - dw) / 2, thumbY + (thumbSize - dh) / 2, dw, dh);
      } else {
        // Crop tengah supaya gambar tidak gepeng
        const side = Math.min(iw, ih);
        ctx.drawImage(imgThumb, (iw - side) / 2, (ih - side) / 2, side, side, thumbX, thumbY, thumbSize, thumbSize);
      }
      ctx.restore();

      // Border for thumbnail
      ctx.beginPath();
      ctx.roundRect(thumbX, thumbY, thumbSize, thumbSize, thumbR);
      ctx.lineWidth = 2 * scale;
      ctx.strokeStyle = accentColor;
      ctx.stroke();
    }

    // 4. Draw Overlay Text Stack
    const textX = drawThumb ? thumbX + thumbSize + (14 * scale) : x + cardPadding;
    const maxTextWidth = overlayWidth - (textX - x) - cardPadding;

    // Title
    ctx.fillStyle = accentColor;
    ctx.font = `bold ${Math.round(16 * scale)}px Inter, sans-serif`;
    ctx.fillText(title.toUpperCase(), textX, y + cardPadding + (14 * scale));

    // Address Multi-line Text Wrapping
    ctx.fillStyle = textColorPrimary;
    ctx.font = `${Math.round(12 * scale)}px Inter, sans-serif`;

    const words = address.split(' ');
    let line = '';
    let currentY = y + cardPadding + (32 * scale);
    const lineHeight = 15 * scale;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextWidth && n > 0) {
        if (linesDrawn < 2) {
          ctx.fillText(line, textX, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
          linesDrawn++;
        } else {
          ctx.fillText(line.trim() + '...', textX, currentY);
          line = '';
          break;
        }
      } else {
        line = testLine;
      }
    }
    if (line && linesDrawn < 2) {
      ctx.fillText(line, textX, currentY);
      currentY += lineHeight;
    }

    // Coordinates & GPS Info
    if (coordinates) {
      ctx.fillStyle = textColorSecondary;
      ctx.font = `${Math.round(11 * scale)}px Inter, monospace`;
      ctx.fillText(`GPS: ${coordinates}`, textX, currentY + (2 * scale));
      currentY += lineHeight;
    }

    // Date & Time (Formatted to Indonesian Standard)
    ctx.fillStyle = accentColor;
    ctx.font = `500 ${Math.round(11 * scale)}px Inter, sans-serif`;
    const formattedIndoDate = formatIndonesianDate(date);
    const formattedDateTime = `${formattedIndoDate} • ${time} ${timezone}`;
    ctx.fillText(`WAKTU: ${formattedDateTime}`, textX, currentY + (2 * scale));

    ctx.restore();
    setIsProcessing(false);
  };

  useEffect(() => {
    renderCanvas();
  }, [
    mainImage, thumbImage, title, address, coordinates, date, time, timezone, activity,
    showThumb, thumbSizeSetting, thumbShape, thumbFit, layoutStyle,
    overlayPosition, themeColor, overlayScale, cardOpacity, cardRadius,
    customBgColor, customTextColor, customAccentColor,
  ]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const targetBytes = 2 * 1024 * 1024; // ~2 MB
    const toBlob = (quality) =>
      new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));

    // Cari kualitas JPEG tertinggi yang masih menghasilkan file <= ~2 MB
    let quality = 0.92;
    let blob = await toBlob(quality);
    let steps = 0;
    while (blob && blob.size > targetBytes && quality > 0.35 && steps < 12) {
      quality -= 0.07;
      blob = await toBlob(quality);
      steps += 1;
    }

    if (!blob) {
      setIsProcessing(false);
      return;
    }

    const safeTitle = (title || 'geomap-overlay').trim().replace(/\s+/g, '-').toLowerCase();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${safeTitle}-${date}.jpg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    setIsProcessing(false);
  };

  const inputCls = 'w-full bg-transparent text-[17px] text-white placeholder:text-[#636366] outline-none';
  const rightInputCls = 'bg-transparent text-[17px] text-[#0a84ff] text-right outline-none';
  const goTab = (tab) => {
    setActiveTab(tab);
    setShowMenu(false);
  };

  const tabs = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'tools', label: 'Tools', Icon: ToolsIcon },
    { id: 'about', label: 'About', Icon: InfoIcon },
  ];

  const menuItem = (label, onClick, opts = {}) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-3 flex items-center justify-between gap-3 text-left text-[17px] active:bg-white/10 cursor-pointer ${
        opts.destructive ? 'text-[#ff453a]' : 'text-white'
      }`}
    >
      <span>{label}</span>
      {opts.checked && <CheckIcon />}
    </button>
  );

  return (
    <div className="min-h-[100dvh] bg-black flex justify-center" style={{ fontFamily: IOS_FONT }}>
      <div className="relative w-full max-w-md h-[100dvh] flex flex-col bg-black text-white overflow-hidden">
        {/* ===== Header + menubar ===== */}
        <header
          className="shrink-0 z-30 bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-white/10"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="relative h-11 px-4 flex items-center justify-between">
            <span className="w-7" />
            <h1 className="absolute inset-x-0 text-center text-[17px] font-semibold pointer-events-none">
              {TAB_TITLES[activeTab]}
            </h1>
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={showMenu}
              onClick={() => setShowMenu((v) => !v)}
              className="relative z-10 text-[#0a84ff] active:opacity-60 cursor-pointer"
            >
              <EllipsisCircleIcon />
            </button>
          </div>
        </header>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div
              className="absolute right-3 z-50 w-64 rounded-[14px] bg-[#2c2c2e]/95 backdrop-blur-xl shadow-2xl overflow-hidden divide-y divide-white/10"
              style={{ top: 'calc(env(safe-area-inset-top) + 48px)' }}
            >
              {menuItem('Setting', () => goTab('tools'))}
              {menuItem('Template Kartu', () => { setLayoutStyle('card'); setShowMenu(false); }, { checked: layoutStyle === 'card' })}
              {menuItem('Template Timestamp', () => { setLayoutStyle('timestamp'); setShowMenu(false); }, { checked: layoutStyle === 'timestamp' })}
              {menuItem('Tentang aplikasi', () => goTab('about'))}
              {menuItem('Reset setting', () => { handleResetSettings(); setShowMenu(false); }, { destructive: true })}
            </div>
          </>
        )}

        {/* ===== Isi halaman ===== */}
        <main className="flex-1 overflow-y-auto overscroll-contain">
          {/* HOME: tetap ter-mount agar canvas tidak hilang saat pindah tab */}
          <div className={activeTab === 'home' ? 'px-4 pt-3 pb-6' : 'hidden'}>
            <h2 className="text-[34px] font-bold tracking-tight leading-tight">Geocam</h2>
            <AnimatedTitle text="Minimal Push Rank !!!" className="text-sm font-extrabold" />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-4 rounded-[14px] bg-[#1c1c1e] text-[#0a84ff] active:bg-[#2c2c2e] cursor-pointer flex flex-col items-center gap-1.5 [&_svg]:mr-0 [&_svg]:w-7 [&_svg]:h-7"
              >
                <UploadIcon />
                <span className="text-[15px] font-medium">Upload</span>
              </button>
              <label className="py-4 rounded-[14px] bg-[#1c1c1e] text-[#0a84ff] active:bg-[#2c2c2e] cursor-pointer flex flex-col items-center gap-1.5 [&_svg]:mr-0 [&_svg]:w-7 [&_svg]:h-7">
                <CameraIcon />
                <span className="text-[15px] font-medium">Kamera</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'main')}
                />
              </label>
            </div>

            <div className="mt-4 rounded-[14px] bg-[#1c1c1e] p-2">
              <div className="flex items-center justify-between px-2 pt-1 pb-2">
                <span className="text-[13px] uppercase tracking-wide text-[#8e8e93]">Pratinjau</span>
                <span className="text-[13px] text-[#8e8e93]">{isProcessing ? 'Memproses…' : 'Siap'}</span>
              </div>
              <div className="rounded-[10px] bg-black flex items-center justify-center min-h-[200px] overflow-hidden">
                <canvas ref={canvasRef} className="max-w-full h-auto max-h-[58vh] object-contain" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isProcessing}
              className="mt-4 w-full h-[50px] rounded-[14px] bg-[#0a84ff] text-white text-[17px] font-semibold flex items-center justify-center active:opacity-70 disabled:opacity-50 cursor-pointer"
            >
              <DownloadIcon /> Unduh Foto
            </button>
          </div>

          {/* TOOLS / SETTING */}
          <div className={activeTab === 'tools' ? 'pt-3 pb-8' : 'hidden'}>
            <div className="px-4 mb-5">
              <IOSSegmented
                value={settingsTab}
                onChange={setSettingsTab}
                options={[
                  { value: 'data', label: 'Data' },
                  { value: 'template', label: 'Template' },
                  { value: 'tema', label: 'Tema' },
                  { value: 'slide', label: 'Slide' },
                  { value: 'thumbnail', label: 'Thumbnail' },
                ]}
              />
            </div>

            {settingsTab === 'data' && (
              <>
                <IOSGroup title="Informasi lokasi">
                  <IOSField label="Judul">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Survey Lokasi Lapangan" className={inputCls} />
                  </IOSField>
                  <IOSField label="Kegiatan (template Timestamp)">
                    <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="Contoh: Jum'at Bersih" className={inputCls} />
                  </IOSField>
                  <IOSField label="Alamat">
                    <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Masukkan alamat lengkap..." className={`${inputCls} resize-none`} />
                  </IOSField>
                  <IOSRow label={isLocating ? 'Mendeteksi lokasi…' : 'Ambil lokasi saya (GPS)'} tint onClick={handleGetLocation} disabled={isLocating} />
                  <IOSField label="Koordinat">
                    <input type="text" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} placeholder="-6.2088, 106.8456" className={`${inputCls} font-mono text-[15px]`} />
                  </IOSField>
                </IOSGroup>

                <IOSGroup title="Waktu" footer={`Hasil: ${formatIndonesianDate(date)}`}>
                  <IOSRow label="Tanggal">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={rightInputCls} style={{ colorScheme: 'dark' }} />
                  </IOSRow>
                  <IOSRow label="Jam">
                    <input type="time" step="1" value={time} onChange={(e) => setTime(e.target.value)} className={rightInputCls} style={{ colorScheme: 'dark' }} />
                  </IOSRow>
                  <IOSRow label="Zona">
                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={`${rightInputCls} cursor-pointer`} style={{ colorScheme: 'dark' }}>
                      <option value="WIB">WIB</option>
                      <option value="WITA">WITA</option>
                      <option value="WIT">WIT</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </IOSRow>
                  <IOSRow label="Pakai waktu sekarang" tint onClick={handleUseNow} />
                </IOSGroup>
              </>
            )}

            {settingsTab === 'template' && (
              <IOSGroup title="Template tampilan" footer="Timestamp memakai kolom Jam, Tanggal, dan Kegiatan dari tab Data.">
                {[
                  { value: 'card', label: 'Kartu', desc: 'Thumbnail dan teks dalam satu kartu' },
                  { value: 'timestamp', label: 'Timestamp', desc: 'Jam besar, alamat, dan kotak info' },
                ].map((o) => (
                  <IOSRow
                    key={o.value}
                    onClick={() => setLayoutStyle(o.value)}
                    label={
                      <span>
                        {o.label}
                        <span className="block text-[13px] text-[#8e8e93]">{o.desc}</span>
                      </span>
                    }
                  >
                    {layoutStyle === o.value && <CheckIcon />}
                  </IOSRow>
                ))}
              </IOSGroup>
            )}

            {settingsTab === 'tema' && (
              <>
                <IOSGroup title="Tema overlay">
                  {THEME_OPTIONS.map((t) => (
                    <IOSRow
                      key={t.value}
                      onClick={() => setThemeColor(t.value)}
                      label={
                        <span className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-md border-t-4 shrink-0" style={{ background: t.bg, borderColor: t.accent }} />
                          {t.label}
                        </span>
                      }
                    >
                      {themeColor === t.value && <CheckIcon />}
                    </IOSRow>
                  ))}
                  <IOSRow
                    onClick={() => setThemeColor('custom')}
                    label={
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-md border-t-4 shrink-0" style={{ background: customBgColor, borderColor: customAccentColor }} />
                        Custom
                      </span>
                    }
                  >
                    {themeColor === 'custom' && <CheckIcon />}
                  </IOSRow>
                </IOSGroup>

                {themeColor === 'custom' && (
                  <IOSGroup title="Warna manual">
                    {[
                      { label: 'Background', value: customBgColor, set: setCustomBgColor },
                      { label: 'Teks', value: customTextColor, set: setCustomTextColor },
                      { label: 'Aksen / judul', value: customAccentColor, set: setCustomAccentColor },
                    ].map((c) => (
                      <IOSRow key={c.label} label={c.label}>
                        <span className="flex items-center gap-2">
                          <span className="text-[15px] font-mono text-[#8e8e93]">{c.value}</span>
                          <input type="color" value={c.value} onChange={(e) => c.set(e.target.value)} className="w-8 h-8 rounded-full border-0 bg-transparent cursor-pointer" />
                        </span>
                      </IOSRow>
                    ))}
                  </IOSGroup>
                )}
              </>
            )}

            {settingsTab === 'slide' && (
              <>
                <IOSGroup title="Posisi overlay">
                  {POSITION_OPTIONS.map((o) => (
                    <IOSRow key={o.value} label={o.label} onClick={() => setOverlayPosition(o.value)}>
                      {overlayPosition === o.value && <CheckIcon />}
                    </IOSRow>
                  ))}
                </IOSGroup>
                <IOSGroup title="Ukuran & gaya">
                  <IOSSliderRow
                    label="Skala" valueText={`${overlayScale}%`} min={50} max={250} step={5}
                    value={overlayScale} onChange={setOverlayScale}
                    onReset={() => setOverlayScale(DEFAULT_SETTINGS.overlayScale)}
                  />
                  <IOSSliderRow
                    label="Transparansi" valueText={`${cardOpacity}%`} min={20} max={100} step={5}
                    value={cardOpacity} onChange={setCardOpacity}
                  />
                  <IOSSliderRow
                    label="Sudut" valueText={cardRadius === 0 ? 'Kotak' : `${cardRadius}px`} min={0} max={24} step={2}
                    value={cardRadius} onChange={setCardRadius}
                  />
                </IOSGroup>
              </>
            )}

            {settingsTab === 'thumbnail' && (
              <>
                <IOSGroup title="Gambar thumbnail">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 shrink-0 rounded-[14px] bg-black overflow-hidden flex items-center justify-center">
                      {thumbImage ? (
                        <img src={thumbImage} alt="Thumbnail saat ini" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[11px] text-[#8e8e93] text-center px-1">Belum ada</span>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <button type="button" onClick={() => thumbInputRef.current?.click()} className="text-[17px] text-[#0a84ff] cursor-pointer">
                        Ganti gambar
                      </button>
                      <button type="button" onClick={() => setThumbImage('/peta-default.jpg')} className="text-[17px] text-[#0a84ff] cursor-pointer">
                        Pakai default
                      </button>
                    </div>
                  </div>
                  <IOSRow label="Tampilkan thumbnail">
                    <IOSSwitch checked={showThumb} onChange={setShowThumb} />
                  </IOSRow>
                </IOSGroup>

                <div className={showThumb ? '' : 'opacity-40 pointer-events-none'}>
                  <IOSGroup title="Bentuk">
                    <div className="px-3 py-2.5">
                      <IOSSegmented
                        value={thumbShape}
                        onChange={setThumbShape}
                        options={[
                          { value: 'rounded', label: 'Bulat sudut' },
                          { value: 'square', label: 'Kotak' },
                          { value: 'circle', label: 'Lingkaran' },
                        ]}
                      />
                    </div>
                  </IOSGroup>
                  <IOSGroup title="Cara mengisi gambar">
                    <div className="px-3 py-2.5">
                      <IOSSegmented
                        value={thumbFit}
                        onChange={setThumbFit}
                        options={[
                          { value: 'cover', label: 'Penuh (crop)' },
                          { value: 'contain', label: 'Utuh' },
                        ]}
                      />
                    </div>
                  </IOSGroup>
                  <IOSGroup title="Ukuran">
                    <IOSSliderRow
                      label="Ukuran thumbnail" valueText={`${thumbSizeSetting}px`} min={60} max={180} step={5}
                      value={thumbSizeSetting} onChange={setThumbSizeSetting}
                      onReset={() => setThumbSizeSetting(DEFAULT_SETTINGS.thumbSize)}
                    />
                  </IOSGroup>
                </div>
              </>
            )}

            <IOSGroup footer="Setting tersimpan otomatis di perangkat ini.">
              <IOSRow label="Reset semua setting" destructive onClick={handleResetSettings} />
            </IOSGroup>
          </div>

          {/* ABOUT */}
          <div className={activeTab === 'about' ? 'pt-8 pb-8' : 'hidden'}>
            <div className="text-center px-4 mb-8">
              <div className="mx-auto w-24 h-24 rounded-[22px] bg-gradient-to-br from-emerald-400 to-cyan-600 flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="mt-4 text-[22px] font-bold">WP.EXE GEOCAM</h2>
              <p className="text-[15px] text-[#8e8e93]">Geomap Overlay Generator</p>
            </div>

            <IOSGroup title="Cara pakai">
              {[
                'Di Home, pilih foto lewat Upload atau Kamera.',
                'Isi judul, alamat, koordinat, dan waktu di Tools › Data.',
                'Pilih template, tema, dan ukuran di Tools.',
                'Kembali ke Home, cek pratinjau, lalu tekan Unduh Foto.',
              ].map((t, i) => (
                <div key={i} className="px-4 py-3 text-[15px] leading-snug">
                  <span className="text-[#8e8e93] mr-2">{i + 1}.</span>{t}
                </div>
              ))}
            </IOSGroup>

            <IOSGroup title="Template tersedia">
              <IOSRow label="Kartu">{layoutStyle === 'card' && <CheckIcon />}</IOSRow>
              <IOSRow label="Timestamp">{layoutStyle === 'timestamp' && <CheckIcon />}</IOSRow>
            </IOSGroup>
          </div>
        </main>

        {/* ===== Footer: tab bar ===== */}
        <nav
          className="shrink-0 z-30 grid grid-cols-3 bg-[#1c1c1e]/80 backdrop-blur-xl border-t border-white/10"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {tabs.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => goTab(id)}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center gap-0.5 pt-2 pb-1.5 cursor-pointer active:opacity-60"
                style={{ color: active ? '#0a84ff' : '#8e8e93' }}
              >
                <Icon active={active} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Input file tersembunyi */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'main')} />
        <input ref={thumbInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'thumb')} />
      </div>
    </div>
  );
}
