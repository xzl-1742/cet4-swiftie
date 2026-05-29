import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Headphones,
  Heart,
  Home,
  Layers3,
  Music2,
  PlayCircle,
  RefreshCcw,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  XCircle,
  Disc3,
  PauseCircle,
  Volume2,
} from "lucide-react";

const albumCovers = {
  "Taylor Swift": "bg-gradient-to-br from-teal-400 via-emerald-300 to-cyan-200",
  Fearless: "bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-200",
  "Speak Now": "bg-gradient-to-br from-violet-500 via-purple-400 to-fuchsia-300",
  Red: "bg-gradient-to-br from-red-500 via-rose-400 to-orange-300",
  "1989": "bg-gradient-to-br from-sky-400 via-blue-300 to-cyan-200",
  Reputation: "bg-gradient-to-br from-zinc-800 via-slate-700 to-gray-600",
  Lover: "bg-gradient-to-br from-pink-400 via-rose-300 to-fuchsia-200",
  Folklore: "bg-gradient-to-br from-stone-500 via-neutral-400 to-gray-300",
  Evermore: "bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300",
  Midnights: "bg-gradient-to-br from-indigo-600 via-blue-500 to-violet-400",
  "The Tortured Poets Department": "bg-gradient-to-br from-gray-300 via-stone-200 to-neutral-100",
};

const albumThemes = {
  "Taylor Swift": {
    gradient: "from-emerald-100 via-teal-50 to-white",
    accent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    chip: "bg-emerald-100 text-emerald-700",
    theme: "青春、校园、第一次心动",
    line: "Start small. Your story is just beginning.",
  },
  Fearless: {
    gradient: "from-amber-100 via-yellow-50 to-white",
    accent: "bg-amber-100 text-amber-700 border-amber-200",
    chip: "bg-amber-100 text-amber-700",
    theme: "勇敢、尝试、迈出第一步",
    line: "Be fearless, even if you only learn 8 words today.",
  },
  "Speak Now": {
    gradient: "from-violet-100 via-purple-50 to-white",
    accent: "bg-violet-100 text-violet-700 border-violet-200",
    chip: "bg-violet-100 text-violet-700",
    theme: "表达、选择、把话说出来",
    line: "Say it clearly. Write it simply.",
  },
  Red: {
    gradient: "from-rose-100 via-red-50 to-white",
    accent: "bg-rose-100 text-rose-700 border-rose-200",
    chip: "bg-rose-100 text-rose-700",
    theme: "回忆、变化、强烈情绪",
    line: "Old memories can help new words stay.",
  },
  "1989": {
    gradient: "from-sky-100 via-blue-50 to-white",
    accent: "bg-sky-100 text-sky-700 border-sky-200",
    chip: "bg-sky-100 text-sky-700",
    theme: "城市、自信、重新开始",
    line: "A new start can begin with one word.",
  },
  Reputation: {
    gradient: "from-zinc-200 via-slate-100 to-white",
    accent: "bg-zinc-200 text-zinc-800 border-zinc-300",
    chip: "bg-zinc-200 text-zinc-800",
    theme: "压力、评价、复杂关系",
    line: "Quiet progress is still progress.",
  },
  Lover: {
    gradient: "from-pink-100 via-rose-50 to-white",
    accent: "bg-pink-100 text-pink-700 border-pink-200",
    chip: "bg-pink-100 text-pink-700",
    theme: "爱、关系、温柔日常",
    line: "Make learning feel soft, not stressful.",
  },
  Folklore: {
    gradient: "from-stone-200 via-neutral-100 to-white",
    accent: "bg-stone-200 text-stone-700 border-stone-300",
    chip: "bg-stone-200 text-stone-700",
    theme: "故事、安静、普通人的经历",
    line: "Every ordinary word has a story.",
  },
  Evermore: {
    gradient: "from-orange-100 via-amber-50 to-white",
    accent: "bg-orange-100 text-orange-700 border-orange-200",
    chip: "bg-orange-100 text-orange-700",
    theme: "反思、经历、长期影响",
    line: "Keep going. Evermore is built by repetition.",
  },
  Midnights: {
    gradient: "from-indigo-100 via-blue-50 to-white",
    accent: "bg-indigo-100 text-indigo-700 border-indigo-200",
    chip: "bg-indigo-100 text-indigo-700",
    theme: "夜晚、焦虑、自我分析",
    line: "Even anxious nights can become learning moments.",
  },
  "The Tortured Poets Department": {
    gradient: "from-gray-100 via-stone-50 to-white",
    accent: "bg-gray-200 text-gray-800 border-gray-300",
    chip: "bg-gray-200 text-gray-800",
    theme: "写作、文学、复杂表达",
    line: "Turn feelings into words. Turn words into scores.",
  },
};

const vocabWords = [
  {
    id: "w1", word: "delicate", phonetic: "/ˈdelɪkət/", meaningZh: "脆弱的；精致的；微妙的",
    level: "high-frequency", album: "Reputation", song: "Delicate",
    lyricCue: "delicate",
    memoryScene: "一段关系刚开始，不能太用力，所有话都很微妙。",
    exampleEn: "The situation is delicate and needs careful handling.",
    exampleZh: "这个情况很微妙，需要谨慎处理。",
    memoryTip: "歌名就是单词本身：delicate = 微妙的、脆弱的、精致的。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/73/c9/de/73c9de73-c848-8f13-abe3-928c3cbfb025/mzaf_7190450308644546687.plus.aac.p.m4a",
    bilibiliId: "BV1AW411W7Xr", lyricStart: 55,
    status: "learning", correctCount: 1, wrongCount: 1,
  },
  {
    id: "w2", word: "memory", phonetic: "/ˈmeməri/", meaningZh: "记忆；回忆",
    level: "core", album: "Red", song: "All Too Well",
    lyricCue: "remember / memory / fall",
    memoryScene: "秋天、围巾、旧照片，某段回忆突然回来。",
    exampleEn: "Music often brings back old memories.",
    exampleZh: "音乐常常唤起旧日回忆。",
    memoryTip: "memory 不只是「记忆力」，也可以指一段具体回忆。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/45/02/1d/45021da5-d3d5-a2ee-c161-7fade4cb5932/mzaf_10401167100735325676.plus.aac.p.m4a",
    bilibiliId: "BV1bj9kY6EnY", lyricStart: 45,
    status: "review", correctCount: 0, wrongCount: 2,
  },
  {
    id: "w3", word: "confident", phonetic: "/ˈkɑːnfɪdənt/", meaningZh: "自信的；有把握的",
    level: "core", album: "1989", song: "Style",
    lyricCue: "style / city / confident",
    memoryScene: "走进城市，换上新状态，感觉自己可以重新开始。",
    exampleEn: "She felt confident before the exam.",
    exampleZh: "考试前她感到很有信心。",
    memoryTip: "常考搭配：be confident about / be confident in。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/88/c3/2b/88c32bb1-395a-1788-aac9-41b4cdd94a00/mzaf_3234809686154416095.plus.aac.p.m4a",
    bilibiliId: "BV14t411v7y3", lyricStart: 58,
    status: "new", correctCount: 0, wrongCount: 0,
  },
  {
    id: "w4", word: "improve", phonetic: "/ɪmˈpruːv/", meaningZh: "提高；改善",
    level: "core", album: "1989", song: "Welcome To New York",
    lyricCue: "new / welcome / start",
    memoryScene: "来到新地方，状态一点点变好，能力也一点点提高。",
    exampleEn: "You can improve your English by practicing every day.",
    exampleZh: "你可以通过每天练习来提高英语。",
    memoryTip: "作文万能词：improve ability / improve life / improve quality。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e1/a8/59/e1a859cd-bcfc-f56d-a6c9-f596e815fa61/mzaf_7432994354090760572.plus.aac.p.m4a",
    bilibiliId: "BV1U6Z2B9Euz", lyricStart: 5,
    status: "new", correctCount: 0, wrongCount: 0,
  },
  {
    id: "w5", word: "ordinary", phonetic: "/ˈɔːrdneri/", meaningZh: "普通的；平常的",
    level: "core", album: "Folklore", song: "cardigan",
    lyricCue: "story / old / ordinary",
    memoryScene: "安静小镇、普通下午、普通人也有自己的故事。",
    exampleEn: "An ordinary day can become meaningful.",
    exampleZh: "普通的一天也可以变得有意义。",
    memoryTip: "ordinary 常和 people / life / experience 一起出现。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/1c/70/a51c709a-d42a-2229-b589-1791c05b8ed0/mzaf_10707034134841273677.plus.aac.p.m4a",
    bilibiliId: "BV1kdYvzqEhW", lyricStart: 90,
    status: "learning", correctCount: 1, wrongCount: 0,
  },
  {
    id: "w6", word: "relationship", phonetic: "/rɪˈleɪʃnʃɪp/", meaningZh: "关系；联系",
    level: "high-frequency", album: "Lover", song: "Lover",
    lyricCue: "lover / together / home",
    memoryScene: "两个人、一个家、稳定的陪伴感。",
    exampleEn: "Good communication helps build a strong relationship.",
    exampleZh: "良好的沟通有助于建立牢固的关系。",
    memoryTip: "relationship 不只指恋爱，也指社会关系、因果关系。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/db/47/e0db47b0-7f70-0631-0414-cd4777d2fb3e/mzaf_6362891154838442638.plus.aac.p.m4a",
    bilibiliId: "BV1a4411r7p4", lyricStart: 70,
    status: "new", correctCount: 0, wrongCount: 0,
  },
  {
    id: "w7", word: "challenge", phonetic: "/ˈtʃælɪndʒ/", meaningZh: "挑战；质疑",
    level: "core", album: "Fearless", song: "Change",
    lyricCue: "change / fight / try",
    memoryScene: "害怕也继续做，困难就是 challenge。",
    exampleEn: "Learning English is a challenge, but it is worth it.",
    exampleZh: "学英语是一个挑战，但它值得。",
    memoryTip: "face a challenge / challenge an idea。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/7d/e2/2a7de27f-e693-a31f-6cfe-cffdf46f1e36/mzaf_16922478598714905095.plus.aac.p.m4a",
    bilibiliId: null, lyricStart: 60,
    status: "review", correctCount: 0, wrongCount: 1,
  },
  {
    id: "w8", word: "express", phonetic: "/ɪkˈspres/", meaningZh: "表达；表示",
    level: "core", album: "Speak Now", song: "Speak Now",
    lyricCue: "speak / now",
    memoryScene: "想法不要憋着，清楚说出来。",
    exampleEn: "It is important to express your ideas clearly.",
    exampleZh: "清楚地表达你的想法很重要。",
    memoryTip: "作文高频：express one's opinion / express feelings。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2f/81/e9/2f81e9bc-11de-2ff2-424a-838f221a8f92/mzaf_10049334175784997815.plus.aac.p.m4a",
    bilibiliId: null, lyricStart: 80,
    status: "new", correctCount: 0, wrongCount: 0,
  },
  {
    id: "w9", word: "pressure", phonetic: "/ˈpreʃər/", meaningZh: "压力",
    level: "high-frequency", album: "Reputation", song: "Look What You Made Me Do",
    lyricCue: "reputation / pressure / noise",
    memoryScene: "别人怎么评价你，声音越多，压力越大。",
    exampleEn: "Many students are under great pressure before exams.",
    exampleZh: "许多学生在考试前承受巨大压力。",
    memoryTip: "常考搭配：under pressure / reduce pressure。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fa/9b/ad/fa9bad92-2498-0fff-f97a-c0b9f910f908/mzaf_6245464994890253965.plus.aac.p.m4a",
    bilibiliId: "BV1Rx411b7QX", lyricStart: 50,
    status: "learning", correctCount: 1, wrongCount: 1,
  },
  {
    id: "w10", word: "experience", phonetic: "/ɪkˈspɪriəns/", meaningZh: "经历；经验；体验",
    level: "core", album: "Evermore", song: "long story short",
    lyricCue: "long story / experience",
    memoryScene: "经历过很多事，最后都变成自己的故事。",
    exampleEn: "This volunteer experience changed my view of life.",
    exampleZh: "这次志愿者经历改变了我的人生观。",
    memoryTip: "experience 作「经历」可数，作「经验」通常不可数。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/c2/7f/e0c27f6e-c087-fbc7-84ed-276d84028c6d/mzaf_2421847857347404410.plus.aac.p.m4a",
    bilibiliId: null, lyricStart: 30,
    status: "new", correctCount: 0, wrongCount: 0,
  },
  {
    id: "w11", word: "anxiety", phonetic: "/æŋˈzaɪəti/", meaningZh: "焦虑；担心",
    level: "advanced", album: "Midnights", song: "Anti-Hero",
    lyricCue: "midnight / problem / anxiety",
    memoryScene: "半夜睡不着，反复想考试、未来和自己。",
    exampleEn: "Exam anxiety is common among college students.",
    exampleZh: "考试焦虑在大学生中很常见。",
    memoryTip: "anxiety 是名词；anxious 是形容词。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/56/2a/1d562a07-dc5f-a9c0-1f36-2051a8c14eb7/mzaf_7214829135431340590.plus.aac.p.m4a",
    bilibiliId: "BV1vopMzdEUg", lyricStart: 45,
    status: "review", correctCount: 0, wrongCount: 2,
  },
  {
    id: "w12", word: "creative", phonetic: "/kriˈeɪtɪv/", meaningZh: "有创造力的；创造性的",
    level: "core", album: "The Tortured Poets Department", song: "The Tortured Poets Department",
    lyricCue: "poets / write / creative",
    memoryScene: "把复杂感受写成文字，就是创造力。",
    exampleEn: "Creative thinking is important in modern education.",
    exampleZh: "创造性思维在现代教育中很重要。",
    memoryTip: "作文常用：creative thinking / creative ability。",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3a/e6/30/3ae63069-e186-3493-5aa2-43c6929258f5/mzaf_2003557152266367047.plus.aac.p.m4a",
    bilibiliId: null, lyricStart: 10,
    status: "new", correctCount: 0, wrongCount: 0,
  },
];

const tabs = [
  { id: "today", label: "Today", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "albums", label: "Albums", icon: Disc3 },
  { id: "review", label: "Review", icon: RefreshCcw },
  { id: "progress", label: "Progress", icon: TrendingUp },
];

function cnLevel(level) {
  if (level === "core") return "核心词";
  if (level === "high-frequency") return "高频词";
  return "拓展词";
}

function AppCard({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[24px] border border-white/60 bg-white/70 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

let speechSynth = null;
function speakWord(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  u.pitch = 1;
  speechSynth = u;
  speechSynthesis.speak(u);
}

function SentenceAudio({ text }) {
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    if (playing) {
      speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.8;
    u.onend = () => setPlaying(false);
    speechSynthesis.speak(u);
  };
  return (
    <button
      onClick={handlePlay}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold active:scale-95 transition ${
        playing ? "bg-pink-500 text-white" : "bg-white/60 text-slate-600"
      }`}
    >
      {playing ? <PauseCircle size={14} /> : <Volume2 size={14} />}
      {playing ? "播放中..." : "朗读例句"}
    </button>
  );
}

function LyricPlayer({ previewUrl, lyricOffset = 0 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [seeked, setSeeked] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      // 首次播放跳到歌词偏移位置
      if (!seeked && lyricOffset > 0) {
        audio.currentTime = Math.min(lyricOffset, audio.duration || 30);
        setSeeked(true);
      }
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setSeeked(true);
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={togglePlay}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md active:scale-95 transition-transform ${
          playing
            ? "bg-pink-500 text-white shadow-pink-500/25"
            : "bg-slate-900 text-white shadow-slate-900/20"
        }`}
      >
        {playing ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className="h-2 w-full rounded-full bg-white/60 cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
        >
          <div
            className="h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-100"
            style={{ width: `${progressPct}%` }}
          />
          {/* 歌词偏移标记线 */}
          {lyricOffset > 0 && (
            <div
              className="absolute top-0 h-2 w-0.5 bg-pink-600 rounded"
              style={{ left: `${(lyricOffset / duration) * 100}%` }}
              title={`歌词偏移 ${lyricOffset}s`}
            />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] font-bold text-slate-400">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </span>
          {lyricOffset > 0 && (
            <span className="text-[10px] font-bold text-pink-400">
              歌词约 {lyricOffset}s
            </span>
          )}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={previewUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => { setDuration(e.target.duration || 30); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setCurrentTime(0); setSeeked(false); }}
      />
    </div>
  );
}

export default function CET4SwiftieMobileApp() {
  const [activeTab, setActiveTab] = useState("today");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("All");
  const [knownIds, setKnownIds] = useState(() => {
    try { const saved = localStorage.getItem("cet4_known"); return saved ? JSON.parse(saved) : ["w5", "w9"]; }
    catch { return ["w5", "w9"]; }
  });
  const [reviewIds, setReviewIds] = useState(() => {
    try { const saved = localStorage.getItem("cet4_review"); return saved ? JSON.parse(saved) : ["w2", "w7", "w11"]; }
    catch { return ["w2", "w7", "w11"]; }
  });

  const updateKnownIds = (fn) => {
    setKnownIds((prev) => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      localStorage.setItem("cet4_known", JSON.stringify(next));
      return next;
    });
  };
  const updateReviewIds = (fn) => {
    setReviewIds((prev) => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      localStorage.setItem("cet4_review", JSON.stringify(next));
      return next;
    });
  };

  const todayAlbum = "Red";
  const todayTheme = albumThemes[todayAlbum];

  const filteredWords = useMemo(() => {
    return vocabWords.filter((item) => {
      const albumMatch = selectedAlbum === "All" || item.album === selectedAlbum;
      const q = query.trim().toLowerCase();
      const queryMatch = !q || item.word.toLowerCase().includes(q) || item.meaningZh.includes(query) || item.album.toLowerCase().includes(q) || item.song.toLowerCase().includes(q);
      return albumMatch && queryMatch;
    });
  }, [query, selectedAlbum]);

  const activeWord = filteredWords[currentIndex % Math.max(filteredWords.length, 1)] || vocabWords[0];
  const activeTheme = albumThemes[activeWord.album];
  const activeCover = albumCovers[activeWord.album];
  const learnedCount = knownIds.length;
  const progress = Math.round((learnedCount / vocabWords.length) * 100);

  const handleKnow = () => {
    updateKnownIds((prev) => prev.includes(activeWord.id) ? prev : [...prev, activeWord.id]);
    updateReviewIds((prev) => prev.filter((id) => id !== activeWord.id));
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(filteredWords.length, 1));
  };

  const handleUnsure = () => {
    updateReviewIds((prev) => prev.includes(activeWord.id) ? prev : [...prev, activeWord.id]);
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(filteredWords.length, 1));
  };

  // 自动朗读单词发音
  useEffect(() => {
    if (!flipped) {
      const timer = setTimeout(() => speakWord(activeWord.word), 300);
      return () => clearTimeout(timer);
    }
  }, [activeWord.id, flipped]);

  const renderToday = () => (
    <div className="space-y-5">
      {/* Hero Card */}
      <AppCard className={`overflow-hidden bg-gradient-to-br ${todayTheme.gradient}`}>
        <div className="relative p-6">
          <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
          <div className="flex items-center justify-between">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${todayTheme.accent}`}>
              Today's Era
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-rose-500 shadow-sm">
              <Flame size={13} className="fill-rose-500 text-rose-500" /> 6 day streak
            </div>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Album</p>
              <h1 className="mt-1 text-5xl font-black tracking-tight text-slate-900">Red</h1>
            </div>
            <div className={`h-16 w-16 rounded-2xl shadow-lg ${albumCovers[todayAlbum]}`} />
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{todayTheme.theme}</p>
          <p className="mt-2 text-base font-semibold leading-snug text-slate-800">"{todayTheme.line}"</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { value: 8, label: "新词", icon: Sparkles, color: "text-violet-500" },
              { value: 5, label: "复习", icon: RefreshCcw, color: "text-amber-500" },
              { value: 30, label: "分钟", icon: Layers3, color: "text-sky-500" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/60 p-3.5 text-center backdrop-blur-sm">
                <item.icon size={16} className={`mx-auto mb-1 ${item.color}`} />
                <p className="text-2xl font-black">{item.value}</p>
                <p className="text-[11px] font-medium text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab("learn")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-[15px] font-bold text-white shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-transform"
          >
            Start Learning <ChevronRight size={18} />
          </button>
        </div>
      </AppCard>

      {/* Soft Goals */}
      <div className="grid grid-cols-2 gap-4">
        <AppCard className="p-5">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-pink-100 p-2 text-pink-500"><Heart size={16} /></div>
            <span className="text-[13px] font-bold text-slate-600">温柔目标</span>
          </div>
          <p className="mt-4 text-3xl font-black">不求多</p>
          <p className="mt-1 text-[13px] text-slate-400">今天只要完成一轮卡片。</p>
        </AppCard>
        <AppCard className="p-5">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-500"><Star size={16} /></div>
            <span className="text-[13px] font-bold text-slate-600">掌握率</span>
          </div>
          <p className="mt-4 text-3xl font-black">{progress}%</p>
          <p className="mt-1 text-[13px] text-slate-400">慢慢来，也算数。</p>
        </AppCard>
      </div>

      {/* Recommended Words */}
      <AppCard className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black">今日推荐词</h3>
          <button onClick={() => setActiveTab("learn")} className="text-xs font-bold text-pink-500">查看全部 →</button>
        </div>
        <div className="mt-4 space-y-2">
          {vocabWords.slice(0, 5).map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl bg-white/60 p-3.5 active:scale-[0.99] transition-transform"
              onClick={() => {
                setSelectedAlbum(item.album);
                setCurrentIndex(Math.max(0, vocabWords.findIndex((w) => w.id === item.id)));
                setActiveTab("learn");
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-xl shadow-sm ${albumCovers[item.album]}`} />
                <div>
                  <p className="text-[15px] font-bold">{item.word}</p>
                  <p className="text-[11px] text-slate-400">{item.album} · {item.song}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${albumThemes[item.album].chip}`}>
                {cnLevel(item.level)}
              </span>
            </div>
          ))}
        </div>
      </AppCard>
    </div>
  );

  const renderLearn = () => (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={17} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCurrentIndex(0); }}
            placeholder="搜索单词 / 歌曲 / 专辑"
            className="w-full rounded-2xl border border-white/60 bg-white/60 py-3.5 pl-10 pr-3 text-sm font-medium outline-none backdrop-blur-sm placeholder:text-slate-300 focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <select
          value={selectedAlbum}
          onChange={(e) => { setSelectedAlbum(e.target.value); setCurrentIndex(0); }}
          className="max-w-[130px] rounded-2xl border border-white/60 bg-white/60 px-3 text-sm font-medium outline-none backdrop-blur-sm focus:ring-2 focus:ring-pink-200"
        >
          <option>All</option>
          {Object.keys(albumThemes).map((album) => (
            <option key={album}>{album}</option>
          ))}
        </select>
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWord.id + String(flipped)}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {!flipped ? (
            /* ---- FRONT ---- */
            <AppCard className={`overflow-hidden bg-gradient-to-br ${activeTheme.gradient}`}>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${activeTheme.accent}`}>
                    {activeWord.album}
                  </span>
                  <span className="rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-slate-400">
                    {currentIndex + 1}/{filteredWords.length}
                  </span>
                </div>

                {/* Album Cover Visual */}
                <div className="mt-8 flex justify-center">
                  <div className={`h-32 w-32 rounded-[28px] shadow-2xl ${activeCover} flex items-center justify-center`}>
                    <Disc3 size={48} className="text-white/70" />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-[13px] font-semibold tracking-wide text-slate-400">{activeWord.phonetic}</p>
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <h2 className="text-6xl font-black tracking-tight text-slate-950">{activeWord.word}</h2>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakWord(activeWord.word); }}
                      className="rounded-2xl bg-white/80 p-3 text-pink-500 shadow-sm active:scale-90 transition-transform"
                      title="朗读发音"
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Song Match */}
                <div className="mt-6 rounded-[20px] bg-white/55 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-pink-100 p-2.5 text-pink-500">
                      <Music2 size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">关联歌曲</p>
                      <p className="text-base font-black">{activeWord.song}</p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-white/70 p-3">
                    <p className="text-[11px] font-bold text-slate-400">歌词触发词</p>
                    <p className="mt-0.5 text-[14px] font-bold text-slate-700">{activeWord.lyricCue}</p>
                  </div>
                </div>

                {/* Memory Scene */}
                <div className="mt-3 rounded-[20px] bg-white/55 p-4 backdrop-blur-sm">
                  <p className="text-[11px] font-bold text-slate-400">记忆场景</p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600">{activeWord.memoryScene}</p>
                </div>

                <button
                  onClick={() => setFlipped(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-[15px] font-bold text-white shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-transform"
                >
                  点击查看释义 <ChevronRight size={18} />
                </button>
              </div>
            </AppCard>
          ) : (
            /* ---- BACK ---- */
            <AppCard className={`overflow-hidden bg-gradient-to-br ${activeTheme.gradient}`}>
              <div className="p-5">
                {/* Word & Meaning */}
                <div className="text-center">
                  <h2 className="text-4xl font-black text-slate-950">{activeWord.word}</h2>
                  <p className="mt-2 text-2xl font-bold text-slate-700">{activeWord.meaningZh}</p>
                </div>

                {/* Example with TTS */}
                <div className="mt-5 rounded-[20px] bg-white/60 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-bold text-slate-400">四级例句</p>
                    <SentenceAudio text={activeWord.exampleEn} />
                  </div>
                  <p className="mt-1.5 text-[15px] font-bold leading-relaxed text-slate-800">{activeWord.exampleEn}</p>
                  <p className="mt-1 text-sm text-slate-500">{activeWord.exampleZh}</p>
                </div>

                {/* Song lyric player — Bilibili or iTunes fallback */}
                <div className="mt-3 rounded-[20px] bg-white/60 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-bold text-slate-400">
                      歌词原声 · {activeWord.song}
                    </p>
                    <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-600">
                      「{activeWord.lyricCue}」
                    </span>
                  </div>
                  {activeWord.bilibiliId ? (
                    <>
                      <div className="overflow-hidden rounded-xl bg-black">
                        <iframe
                          src={`//player.bilibili.com/player.html?bvid=${activeWord.bilibiliId}&t=${activeWord.lyricStart || 0}&autoplay=0&danmaku=0`}
                          width="100%"
                          height="120"
                          allowFullScreen
                          className="block"
                          title={activeWord.song}
                        />
                      </div>
                      <p className="mt-1.5 text-[10px] text-slate-400 leading-relaxed">
                        已定位到歌词出现位置（{activeWord.lyricStart || 0} 秒处）。如不对，可拖动 B 站进度条微调。
                      </p>
                    </>
                  ) : activeWord.previewUrl ? (
                    <LyricPlayer previewUrl={activeWord.previewUrl} lyricOffset={activeWord.lyricStart || 0} />
                  ) : null}
                </div>

                {/* Memory Tip */}
                <div className="mt-3 rounded-[20px] bg-white/60 p-4 backdrop-blur-sm">
                  <p className="text-[11px] font-bold text-slate-400">记忆提示</p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-600">{activeWord.memoryTip}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <button
                    onClick={handleKnow}
                    className="rounded-2xl bg-emerald-500 py-4 text-[13px] font-bold text-white shadow-lg shadow-emerald-500/25 active:scale-[0.97] transition-transform"
                  >
                    <CheckCircle2 className="mx-auto mb-0.5" size={20} /> 认识
                  </button>
                  <button
                    onClick={handleUnsure}
                    className="rounded-2xl bg-amber-400 py-4 text-[13px] font-bold text-white shadow-lg shadow-amber-400/25 active:scale-[0.97] transition-transform"
                  >
                    <RefreshCcw className="mx-auto mb-0.5" size={20} /> 模糊
                  </button>
                  <button
                    onClick={handleUnsure}
                    className="rounded-2xl bg-slate-800 py-4 text-[13px] font-bold text-white shadow-lg shadow-slate-800/25 active:scale-[0.97] transition-transform"
                  >
                    <XCircle className="mx-auto mb-0.5" size={20} /> 不会
                  </button>
                </div>

                <button
                  onClick={() => setFlipped(false)}
                  className="mt-3 w-full rounded-2xl bg-white/60 py-3 text-[13px] font-bold text-slate-500 backdrop-blur-sm active:scale-[0.98] transition-transform"
                >
                  返回卡片正面
                </button>
              </div>
            </AppCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const renderAlbums = () => (
    <div className="space-y-4">
      <div className="mb-1">
        <h2 className="text-3xl font-black">Album Eras</h2>
        <p className="mt-1 text-sm text-slate-400">每张专辑都是一个词汇记忆房间。</p>
      </div>
      {Object.entries(albumThemes).map(([album, info]) => {
        const words = vocabWords.filter((item) => item.album === album);
        const known = words.filter((item) => knownIds.includes(item.id)).length;
        const pct = words.length ? Math.round((known / words.length) * 100) : 0;
        return (
          <button
            key={album}
            onClick={() => { setSelectedAlbum(album); setCurrentIndex(0); setActiveTab("learn"); }}
            className={`w-full rounded-[24px] border border-white/60 bg-gradient-to-br ${info.gradient} p-4 text-left shadow-[0_8px_32px_rgba(15,23,42,0.05)] backdrop-blur-sm active:scale-[0.99] transition-transform`}
          >
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl shadow-lg ${albumCovers[album]} flex items-center justify-center shrink-0`}>
                <Disc3 size={24} className="text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-black truncate">{album}</h3>
                  <ChevronRight size={16} className="text-slate-300 shrink-0" />
                </div>
                <p className="mt-0.5 text-[12px] text-slate-500">{info.theme}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-white/60 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-slate-800 transition-all duration-500"
                      style={{ width: `${Math.max(pct, words.length ? 5 : 0)}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 shrink-0">{words.length}词 · {pct}%</span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderReview = () => {
    const reviewWords = vocabWords.filter((item) => reviewIds.includes(item.id));
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-black">Review</h2>
          <p className="mt-1 text-sm text-slate-400">模糊词不是失败，是最值得复习的词。</p>
        </div>
        {reviewWords.length === 0 && (
          <AppCard className="p-8 text-center">
            <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
            <p className="mt-3 text-lg font-bold">全部搞定啦</p>
            <p className="mt-1 text-sm text-slate-400">暂时没有需要复习的词。</p>
          </AppCard>
        )}
        {reviewWords.map((item) => (
          <AppCard key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-2xl font-black">{item.word}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${albumThemes[item.album].chip}`}>
                    {item.album}
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-slate-400">{item.song} · {item.lyricCue}</p>
                <p className="mt-3 text-[15px] font-bold text-slate-700">{item.meaningZh}</p>
                {item.previewUrl && (
                  <div className="mt-3">
                    <LyricPlayer previewUrl={item.previewUrl} lyricOffset={item.lyricStart || 0} />
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedAlbum(item.album);
                  setCurrentIndex(Math.max(0, filteredWords.findIndex((w) => w.id === item.id)));
                  setActiveTab("learn");
                }}
                className="rounded-xl bg-slate-900 p-3 text-white shadow-lg shadow-slate-900/20 active:scale-95 transition-transform shrink-0"
              >
                <BookOpen size={17} />
              </button>
            </div>
          </AppCard>
        ))}
      </div>
    );
  };

  const renderProgress = () => (
    <div className="space-y-5">
      <AppCard className="p-6 text-center">
        <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 shadow-inner">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
            <div>
              <p className="text-[56px] font-black leading-none text-slate-900">{progress}%</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">mastered</p>
            </div>
          </div>
        </div>
        <h2 className="mt-5 text-xl font-black">你已经开始了</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 max-w-64 mx-auto">
          真正能过四级的人，不是一天背很多的人，是每天愿意回来的人。
        </p>
      </AppCard>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "已掌握", value: knownIds.length, unit: "words", color: "text-emerald-500", bg: "bg-emerald-100" },
          { label: "待复习", value: reviewIds.length, unit: "words", color: "text-amber-500", bg: "bg-amber-100" },
          { label: "连续学习", value: 6, unit: "days", color: "text-rose-500", bg: "bg-rose-100" },
          { label: "本周学习", value: 145, unit: "分钟", color: "text-sky-500", bg: "bg-sky-100" },
        ].map((item) => (
          <AppCard key={item.label} className="p-4">
            <div className={`inline-flex rounded-xl p-2 ${item.bg}`}>
              <div className={`h-3 w-3 rounded-full ${item.color.replace("text-", "bg-")}`} />
            </div>
            <p className="mt-3 text-[12px] font-bold text-slate-400">{item.label}</p>
            <p className="mt-1 text-3xl font-black">{item.value}</p>
            <p className="text-[11px] text-slate-400">{item.unit}</p>
          </AppCard>
        ))}
      </div>

      <AppCard className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-violet-500" />
          <h3 className="text-base font-black">本周建议</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-500">
          你的 Reputation 和 Red 词汇容易进入复习区。今晚只要复习 5 个，不用补昨天的。
        </p>
      </AppCard>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "today": return renderToday();
      case "learn": return renderLearn();
      case "albums": return renderAlbums();
      case "review": return renderReview();
      case "progress": return renderProgress();
      default: return renderToday();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-sky-50 text-slate-900">
      <div className="mx-auto min-h-screen max-w-md px-4 pb-28 pt-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-white/80 p-1.5 shadow-sm backdrop-blur-sm">
                <Sparkles size={15} className="text-pink-500" />
              </div>
              <span className="text-[14px] font-black tracking-tight">Swiftie CET-4</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 ml-1">A cozy music diary for words</p>
          </div>
          <div className="rounded-xl bg-white/80 p-2.5 shadow-sm backdrop-blur-sm">
            <Headphones size={20} className="text-pink-500" />
          </div>
        </header>

        <main>{renderContent()}</main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/60 bg-white/75 px-3 pb-4 pt-2 backdrop-blur-2xl safe-area-bottom">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setFlipped(false);
                }}
                className={`flex flex-col items-center justify-center rounded-2xl py-2 text-[10px] font-bold transition-all duration-200 ${
                  active
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon size={19} className="mb-0.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
