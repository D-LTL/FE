import { useState, useRef } from "react";
import type { HistoryItem as HistoryItemType } from "../../../types/type";

interface HistoryItemProps {
  item: HistoryItemType;
  onRename: (id: string, newTitle: string) => void;
  onOpenTranslation: (historyData: HistoryItemType) => void;
}

const HistoryItem = ({ item, onRename, onOpenTranslation }: HistoryItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      // 재생 중이면 정지
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    } else {
      // 재생 시작
      setIsPlaying(true);

      // 언어에 따라 오디오 파일 경로 설정
      let audioPath = "";
      if (item.targetLang === "영어") {
        audioPath = "/audio/en.mp3";
      } else if (item.targetLang === "일본어") {
        audioPath = "/audio/jp.mp3";
      } else if (item.targetLang === "중국어") {
        audioPath = "/audio/ch.mp3";
      } else if (item.targetLang === "한국어") {
        audioPath = "/audio/kr.mp3";
      }

      if (audioPath) {
        const audio = new Audio(audioPath);
        audioRef.current = audio;

        audio.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });

        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
        };
      } else {
        // 언어 정보가 없으면 2초 후 자동으로 멈춤
        setTimeout(() => setIsPlaying(false), 2000);
      }
    }
  };

  const handleItemClick = (e: React.MouseEvent) => {
    if (isEditing) return; // 수정 중일 때는 팝업 안 띄움
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    // 아이템의 정중앙 좌표
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPopupPosition({
      top: centerY,
      left: centerX,
    });
    setShowPopup(true);
  };

  const handleRename = () => {
    setShowPopup(false);
    setIsEditing(true);
  };

  const handleSaveRename = () => {
    if (editTitle.trim()) {
      onRename(item.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleViewDetail = () => {
    setShowPopup(false);
    onOpenTranslation(item);
  };

  return (
    <>
      <div
        onClick={handleItemClick}
        className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F5] rounded-[15px] cursor-pointer transition"
      >
        {/* Play/Stop Button */}
        <button
          onClick={handlePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isPlaying ? "bg-[#357ABD]" : "bg-[#4A90E2]"
          } transition`}
        >
          {isPlaying ? (
            <div className="w-3 h-3 bg-white"></div>
          ) : (
            <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          )}
        </button>

        {/* Title */}
        {isEditing ? (
          <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A5A]"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={handleSaveRename}
                className="w-6 h-6 rounded-full bg-[#5A5A5A] text-white flex items-center justify-center text-xs hover:bg-[#787878] transition"
              >
                ✓
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(item.title);
                }}
                className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs hover:bg-gray-400 transition"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {item.title}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Popup Menu */}
      {showPopup && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setShowPopup(false)}
          ></div>
          <div
            className="fixed z-[70]"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
          >
            <div className="bg-[#B8B8B8] rounded-[10px] p-2 w-36 shadow-lg">
              <button
                onClick={handleRename}
                className="w-full py-2 text-white text-sm font-medium hover:bg-[#A0A0A0] rounded-[8px] transition"
              >
                이름 바꾸기
              </button>
              <button
                onClick={handleViewDetail}
                className="w-full py-2 text-white text-sm font-medium hover:bg-[#A0A0A0] rounded-[8px] transition"
              >
                자세히 보기
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HistoryItem;
