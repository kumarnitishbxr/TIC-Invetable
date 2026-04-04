import { Mic, MicOff } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function VoiceComposerField({
  label,
  value,
  onChange,
  language = "hi-IN",
  placeholder = "Tap the microphone or type your note",
}) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      toast.error("Could not capture voice input");
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();

      onChange(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <label className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-base-content/80">{label}</span>
        <button
          className={listening ? "k-btn" : "k-btn-ghost"}
          type="button"
          onClick={listening ? stopListening : startListening}
        >
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {listening ? "Stop mic" : "Use mic"}
        </button>
      </div>
      <textarea
        className="k-textarea"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="text-xs uppercase tracking-[0.18em] text-base-content/40">
        Live speech capture fills the transcript that goes to the backend.
      </p>
    </label>
  );
}
