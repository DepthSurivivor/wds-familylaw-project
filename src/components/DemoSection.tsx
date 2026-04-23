import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type DemoFieldKey =
  | 'name'
  | 'phone'
  | 'email'
  | 'matterType'
  | 'urgency'
  | 'representationStatus'
  | 'notes'
  | 'nextStep'
  | 'status';

type SystemStatus = 'idle' | 'listening' | 'extracting' | 'reviewing' | 'ready';

type FieldEvent = {
  time: number;
  type: 'field';
  field: DemoFieldKey;
  value: string;
  label: string;
};

type SignalEvent = {
  time: number;
  type: 'signal';
  label: string;
  status: SystemStatus;
};

type ScenarioEvent = FieldEvent | SignalEvent;

type ScenarioConfig = {
  id: string;
  label: string;
  title: string;
  shortDescription: string;
  audioSrc: string;
  durationLabel: string;
  finalBadge: string;
  events: ScenarioEvent[];
};

type FormState = Record<DemoFieldKey, string>;

const EMPTY_FORM: FormState = {
  name: '',
  phone: '',
  email: '',
  matterType: '',
  urgency: '',
  representationStatus: '',
  notes: '',
  nextStep: '',
  status: '',
};

const SCENARIOS: ScenarioConfig[] = [
  {
    id: 'qualified-intake',
    label: 'Qualified Intake',
    title: 'Qualified Family-Law Intake',
    shortDescription:
      'Caller provides complete details, confirms no current attorney, and presents a time-sensitive custody concern suitable for staff follow-up.',
    audioSrc: '/audio/scenario-1.mp3',
    durationLabel: '2:11',
    finalBadge: 'Ready for Staff Follow-Up',
    events: [
      { time: 1.0, type: 'signal', label: 'Call connected', status: 'listening' },
      { time: 7.0, type: 'signal', label: 'Matter identified: custody issue', status: 'extracting' },
      { time: 15.0, type: 'signal', label: 'Existing custody order detected', status: 'extracting' },
      { time: 32.0, type: 'signal', label: 'Jurisdiction identified: San Diego County', status: 'extracting' },
      {
        time: 51.0,
        type: 'field',
        field: 'urgency',
        value: 'Low urgency – no upcoming court dates',
        label: 'Urgency assessed',
      },
      { time: 71.0, type: 'field', field: 'name', value: 'Daniel Reyes', label: 'Caller name captured' },
      { time: 88.0, type: 'signal', label: 'Opposing party identified', status: 'extracting' },
      {
        time: 95.0,
        type: 'field',
        field: 'representationStatus',
        value: 'No current attorney',
        label: 'Representation status confirmed',
      },
      { time: 108.0, type: 'field', field: 'matterType', value: 'Custody Order Modification', label: 'Matter classified' },
      { time: 118.0, type: 'field', field: 'phone', value: '(619) 555-2387', label: 'Phone number captured' },
      { time: 124.0, type: 'field', field: 'email', value: 'daniel.reyes@email.com', label: 'Email captured' },
      {
        time: 140.0,
        type: 'field',
        field: 'notes',
        value:
          'Caller has an existing custody order in San Diego County and is seeking to modify it to obtain more parenting time. No current attorney and no urgent court deadlines.',
        label: 'Context summarized',
      },
      {
        time: 150.0,
        type: 'field',
        field: 'nextStep',
        value: 'Schedule free phone consultation with intake team for custody modification review.',
        label: 'Next step prepared',
      },
      {
        time: 155.0,
        type: 'field',
        field: 'status',
        value: 'Ready for Staff Follow-Up',
        label: 'Intake completed',
      },
      { time: 156.0, type: 'signal', label: 'Structured intake ready for staff review', status: 'ready' },
    ],
  },
  {
    id: 'needs-guidance',
    label: 'Needs Guidance',
    title: 'Custody Guidance Intake',
    shortDescription:
      'Caller is unsure how to proceed, describes rising tension with an unmarried co-parent, and is routed to a consultation for guidance before the situation worsens.',
    audioSrc: '/audio/scenario-2.mp3',
    durationLabel: '4:21',
    finalBadge: 'Ready for Staff Follow-Up',
    events: [
      { time: 1.0, type: 'signal', label: 'Caller uncertainty detected', status: 'listening' },
      { time: 15.0, type: 'signal', label: 'Family-law concern identified', status: 'extracting' },
      { time: 38.0, type: 'signal', label: 'Custody guidance request detected', status: 'extracting' },
      { time: 72.0, type: 'signal', label: 'Cohabitation status identified', status: 'extracting' },
      {
        time: 95.0,
        type: 'field',
        field: 'urgency',
        value: 'Low urgency – no safety issue or court date',
        label: 'Urgency assessed',
      },
      {
        time: 130.0,
        type: 'field',
        field: 'matterType',
        value: 'Custody / Parental Rights Guidance',
        label: 'Matter classified',
      },
      { time: 150.0, type: 'field', field: 'name', value: 'Ashley Martinez', label: 'Caller name captured' },
      { time: 157.0, type: 'signal', label: 'Co-parent identified', status: 'extracting' },
      { time: 168.0, type: 'field', field: 'phone', value: '(619) 555-3472', label: 'Phone number captured' },
      { time: 179.0, type: 'field', field: 'email', value: 'ashley.martinez@gmail.com', label: 'Email captured' },
      { time: 187.0, type: 'signal', label: 'Consult preference captured', status: 'reviewing' },
      {
        time: 198.0,
        type: 'field',
        field: 'representationStatus',
        value: 'No current attorney mentioned',
        label: 'Representation status noted',
      },
      {
        time: 205.0,
        type: 'field',
        field: 'notes',
        value:
          'Caller shares a child with an unmarried partner and is worried tensions may escalate. Both parties are still living together, there are no urgent safety concerns or court dates, and the caller wants guidance on custody rights and next steps before the situation gets worse.',
        label: 'Context summarized',
      },
      {
        time: 214.0,
        type: 'field',
        field: 'nextStep',
        value:
          'Schedule free phone consultation with an attorney to review custody rights, options, and possible next steps.',
        label: 'Next step prepared',
      },
      {
        time: 219.0,
        type: 'field',
        field: 'status',
        value: 'Ready for Staff Follow-Up',
        label: 'Intake completed',
      },
      { time: 220.0, type: 'signal', label: 'Structured intake ready for staff review', status: 'ready' },
    ],
  },
  {
    id: 'non-fit-filter',
    label: 'Non-Fit Filter',
    title: 'Non-Fit Inquiry Filtered Cleanly',
    shortDescription:
      'Caller already has active legal representation. Intake is documented professionally and marked as non-routed to protect staff time.',
    audioSrc: '/audio/scenario-3.mp3',
    durationLabel: '1:56',
    finalBadge: 'Processed — Non-Fit, No Staff Follow-Up Needed',
    events: [
      { time: 0.7, type: 'signal', label: 'Call connected', status: 'listening' },
      { time: 4.6, type: 'field', field: 'name', value: 'Robert Hale', label: 'Name identified' },
      { time: 9.7, type: 'field', field: 'phone', value: '(617) 555-0154', label: 'Phone captured' },
      { time: 13.8, type: 'field', field: 'email', value: 'robert.hale@gmail.com', label: 'Email captured' },
      { time: 18.2, type: 'signal', label: 'Evaluating fit criteria', status: 'extracting' },
      { time: 22.5, type: 'field', field: 'matterType', value: 'Post-decree enforcement question', label: 'Matter classified' },
      { time: 30.1, type: 'field', field: 'urgency', value: 'Low — informational inquiry', label: 'Urgency detected' },
      {
        time: 36.6,
        type: 'field',
        field: 'representationStatus',
        value: 'Already represented by counsel',
        label: 'Representation status updated',
      },
      {
        time: 46.8,
        type: 'field',
        field: 'notes',
        value:
          'Caller confirmed an existing attorney and requested procedural clarification. Inquiry logged and politely redirected to current counsel.',
        label: 'Context summary drafted',
      },
      { time: 53.2, type: 'signal', label: 'Final review in progress', status: 'reviewing' },
      {
        time: 60.4,
        type: 'field',
        field: 'nextStep',
        value: 'No consultation routing. Send courtesy follow-up message with referral guidance if requested.',
        label: 'Next step prepared',
      },
      {
        time: 67.3,
        type: 'field',
        field: 'status',
        value: 'Non-fit — documented and closed',
        label: 'Intake completed',
      },
    ],
  },
];

const FIELD_META: Array<{ key: DemoFieldKey; label: string; placeholder: string; longText?: boolean }> = [
  { key: 'name', label: 'Caller Name', placeholder: 'Waiting for caller identity...' },
  { key: 'phone', label: 'Phone', placeholder: 'Waiting for number capture...' },
  { key: 'email', label: 'Email', placeholder: 'Waiting for email capture...' },
  { key: 'matterType', label: 'Matter Type', placeholder: 'Analyzing legal matter...' },
  { key: 'urgency', label: 'Urgency', placeholder: 'Assessing urgency level...' },
  { key: 'representationStatus', label: 'Representation Status', placeholder: 'Checking representation status...' },
  { key: 'notes', label: 'Context Summary', placeholder: 'Building structured call summary...', longText: true },
  { key: 'nextStep', label: 'Recommended Next Step', placeholder: 'Preparing staff recommendation...', longText: true },
  { key: 'status', label: 'Intake Status', placeholder: 'Final status pending...' },
];

const STATUS_STYLES: Record<SystemStatus, string> = {
  idle: 'bg-slate-100 text-slate-600 border-slate-200',
  listening: 'bg-blue-50 text-blue-700 border-blue-200',
  extracting: 'bg-violet-50 text-violet-700 border-violet-200',
  reviewing: 'bg-amber-50 text-amber-700 border-amber-200',
  ready: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const KEY_PROGRESS_FIELDS: DemoFieldKey[] = ['name', 'phone', 'matterType', 'urgency', 'representationStatus', 'status'];

function ScenarioTabs({
  scenarios,
  activeId,
  onChange,
}: {
  scenarios: ScenarioConfig[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-black/10 bg-white p-1.5">
      {scenarios.map((scenario) => (
        <button
          key={scenario.id}
          type="button"
          onClick={() => onChange(scenario.id)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            activeId === scenario.id ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {scenario.label}
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status, isPlaying }: { status: SystemStatus; isPlaying: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[status]}`}>
      <span className={`h-2 w-2 rounded-full ${status === 'ready' ? 'bg-emerald-500' : 'bg-current'} ${isPlaying && status === 'listening' ? 'animate-pulse' : ''}`} />
      {status}
    </div>
  );
}

function ExtractionFeed({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Recent activity</p>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">No extraction events yet.</p>
        ) : (
          items.slice(0, 6).map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{item}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function LiveIntakeForm({
  values,
  highlightedField,
  finalBadge,
  showFinalBadge,
  progress,
}: {
  values: FormState;
  highlightedField: DemoFieldKey | null;
  finalBadge: string;
  showFinalBadge: boolean;
  progress: number;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-black">Live Intake Record</h3>
        <span className="text-xs font-medium text-slate-500">Progress {progress}%</span>
      </div>

      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="space-y-3">
        {FIELD_META.map((field) => {
          const hasValue = Boolean(values[field.key]);
          const isHighlighted = highlightedField === field.key;

          return (
            <div
              key={field.key}
              className={`rounded-xl border px-3 py-3 transition-all duration-500 ${
                hasValue ? 'border-slate-200 bg-slate-50' : 'border-slate-100 bg-white'
              } ${isHighlighted ? 'border-black/30 shadow-[0_0_0_2px_rgba(15,23,42,0.06)]' : ''}`}
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{field.label}</p>
              <p className={`text-sm ${hasValue ? 'text-slate-900' : 'text-slate-400'} ${field.longText ? 'leading-relaxed' : ''}`}>
                {hasValue ? values[field.key] : field.placeholder}
              </p>
            </div>
          );
        })}
      </div>

      {showFinalBadge && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {finalBadge}
        </div>
      )}
    </div>
  );
}

export default function DemoSection() {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SystemStatus>('idle');
  const [feed, setFeed] = useState<string[]>([]);
  const [processedEvents, setProcessedEvents] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedField, setHighlightedField] = useState<DemoFieldKey | null>(null);
  const [showFinalBadge, setShowFinalBadge] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scenario = useMemo(
    () => SCENARIOS.find((item) => item.id === activeScenarioId) ?? SCENARIOS[0],
    [activeScenarioId],
  );

  const progress = useMemo(() => {
    const completed = KEY_PROGRESS_FIELDS.filter((key) => formData[key]).length;
    return Math.round((completed / KEY_PROGRESS_FIELDS.length) * 100);
  }, [formData]);

  const resetPlaybackState = () => {
    setFormData(EMPTY_FORM);
    setFeed([]);
    setProcessedEvents([]);
    setStatus('idle');
    setShowFinalBadge(false);
    setHighlightedField(null);
  };

  const handleScenarioChange = (scenarioId: string) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveScenarioId(scenarioId);
    resetPlaybackState();
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio.ended) {
      audio.currentTime = 0;
      resetPlaybackState();
    }

    try {
      await audio.play();
      setIsPlaying(true);
      if (status === 'idle') {
        setStatus('listening');
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    resetPlaybackState();
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const dueEvents = scenario.events
      .map((event, index) => ({ event, index }))
      .filter(({ event, index }) => event.time <= audio.currentTime && !processedEvents.includes(index));

    if (dueEvents.length === 0) {
      return;
    }

    setProcessedEvents((prev) => [...prev, ...dueEvents.map(({ index }) => index)]);

    dueEvents.forEach(({ event }) => {
      if (event.type === 'signal') {
        setStatus(event.status);
        setFeed((prev) => [event.label, ...prev]);
        return;
      }

      setFormData((prev) => ({ ...prev, [event.field]: event.value }));
      setHighlightedField(event.field);
      setFeed((prev) => [event.label, ...prev]);
    });
  };

  useEffect(() => {
    if (!highlightedField) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setHighlightedField(null);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [highlightedField]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.load();
  }, [scenario.id]);

  const handleEnded = () => {
    setIsPlaying(false);
    setStatus('ready');
    setShowFinalBadge(true);
  };

  return (
    <section id="demo" className="bg-[#FAFAFA] px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-[36px] font-bold tracking-[-0.03em] text-black md:text-[48px]">
            Watch the Intake System Handle a Real Call
          </h2>
          <p className="mx-auto max-w-[760px] text-[18px] font-light text-slate-500">
            Play one of the recorded scenarios and see how the inquiry is structured for staff follow-up in real time.
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <ScenarioTabs scenarios={SCENARIOS} activeId={scenario.id} onChange={handleScenarioChange} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-5 md:p-6">
            <div className="mb-5 border-b border-black/5 pb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scenario</p>
              <h3 className="mt-2 text-xl font-semibold text-black">{scenario.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{scenario.shortDescription}</p>
              <p className="mt-3 text-xs font-medium text-slate-500">Recorded call length: {scenario.durationLabel}</p>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePlayPause}
                className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" /> Restart
              </button>
              <StatusBadge status={status} isPlaying={isPlaying} />
            </div>

            <audio
              ref={audioRef}
              src={scenario.audioSrc}
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onPause={() => setIsPlaying(false)}
              className="hidden"
            />

            <ExtractionFeed items={feed} />
          </div>

          <div>
            <LiveIntakeForm
              values={formData}
              highlightedField={highlightedField}
              finalBadge={scenario.finalBadge}
              showFinalBadge={showFinalBadge}
              progress={progress}
            />

            {showFinalBadge && (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#book"
                  className="inline-flex justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  Book a Call
                </a>
                <a href="#contact" className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline">
                  See How This Works For Your Firm
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
