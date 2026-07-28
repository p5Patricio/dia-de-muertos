import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import type { Track } from '@/types/media';
import { t, type TranslationDict } from '@lib/i18n-shared';

interface AudioPlayerProps {
  tracks: Track[];
  translations: TranslationDict;
}

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ tracks, translations }: AudioPlayerProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audio = useRef<HTMLAudioElement>(null);
  const track = tracks[index];

  const playAt = (i: number) => { setIndex(i); setPlaying(true); };
  const toggle = () => setPlaying((p) => !p);
  const next = useCallback(() => { setIndex((i) => (i + 1) % tracks.length); setPlaying(true); }, [tracks.length]);
  const prev = useCallback(() => { setIndex((i) => (i - 1 + tracks.length) % tracks.length); setPlaying(true); }, [tracks.length]);

  useEffect(() => { if (playing) void audio.current?.play(); else audio.current?.pause(); }, [playing, index]);
  useEffect(() => { if (audio.current) audio.current.volume = volume; }, [volume]);
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnd = () => next();
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);
    return () => { el.removeEventListener('timeupdate', onTime); el.removeEventListener('loadedmetadata', onMeta); el.removeEventListener('ended', onEnd); };
  }, [next]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'BUTTON') return;
      if (e.code === 'Space') { e.preventDefault(); toggle(); }
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => { const el = audio.current; if (!el) return; el.currentTime = +e.target.value; setTime(el.currentTime); };
  const setVol = (e: React.ChangeEvent<HTMLInputElement>) => setVolume(+e.target.value);
  const iconBtn = 'inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const slider = 'h-2 cursor-pointer appearance-none rounded bg-muted accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const label = 'text-xs text-muted-foreground';

  if (!tracks.length) return null;
  return (
    <section aria-label={t(translations, 'audio.playerLabel', 'Audio player')} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <audio ref={audio} src={track.src} preload="metadata">
        <track kind="captions" srcLang="es" label={t(translations, 'audio.captions', 'Captions unavailable')} />
      </audio>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className={label}>{t(translations, 'audio.nowPlaying', 'Now playing')}</p>
          <h3 className="truncate font-display text-xl text-foreground">{track.title}</h3>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prev} aria-label={t(translations, 'audio.previous', 'Previous track')} className={iconBtn}><SkipBack className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={toggle} aria-label={playing ? t(translations, 'audio.pause', 'Pause') : t(translations, 'audio.play', 'Play')} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            {playing ? <Pause className="h-6 w-6" aria-hidden="true" /> : <Play className="h-6 w-6" aria-hidden="true" />}
          </button>
          <button type="button" onClick={next} aria-label={t(translations, 'audio.next', 'Next track')} className={iconBtn}><SkipForward className="h-5 w-5" aria-hidden="true" /></button>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className={label}>{fmt(time)}</span>
        <input type="range" min={0} max={duration || 0} step={0.1} value={time} onChange={seek} aria-label={t(translations, 'audio.seek', 'Seek')} className={`${slider} flex-1`} />
        <span className={label}>{fmt(duration)}</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={() => setVolume((v) => (v > 0 ? 0 : 1))} aria-label={t(translations, 'audio.mute', 'Mute')} className="inline-flex h-8 w-8 items-center justify-center rounded text-foreground/80 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {volume === 0 ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
        </button>
        <input type="range" min={0} max={1} step={0.05} value={volume} onChange={setVol} aria-label={t(translations, 'audio.volume', 'Volume')} className={`${slider} w-24`} />
      </div>
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-foreground">{t(translations, 'audio.playlist', 'Playlist')}</h4>
        <ul className="mt-2 divide-y divide-border" role="listbox" aria-label={t(translations, 'audio.playlist', 'Playlist')}>
          {tracks.map((item, i) => (
            <li key={item.id} role="option" aria-selected={i === index}>
              <button type="button" onClick={() => playAt(i)} className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${i === index ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}>
                <span>{item.title}</span>
                <span className={label}>{item.artist}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
