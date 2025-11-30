import { useState } from "react";
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

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleItemClick = (e: React.MouseEvent) => {
    console.log('Item clicked');
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    console.log('Popup position:', { top: rect.top + rect.height / 2, left: rect.right + 10 });
    setPopupPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
    setShowPopup(true);
    console.log('Show popup set to true');
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
        {/* Play Button */}
        <button
          onClick={handlePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isPlaying ? "bg-[#357ABD]" : "bg-[#4A90E2]"
          } transition`}
        >
          <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
        </button>

        {/* Title */}
        {isEditing ? (
          <div className="flex-1 flex gap-2" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A5A]"
              autoFocus
            />
            <button
              onClick={handleSaveRename}
              className="px-3 py-1 bg-[#5A5A5A] text-white rounded-[10px] text-xs"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(item.title);
              }}
              className="px-3 py-1 border border-gray-300 rounded-[10px] text-xs"
            >
              취소
            </button>
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
            className="fixed inset-0 z-40"
            onClick={() => setShowPopup(false)}
          ></div>
          <div
            className="fixed z-50"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
              transform: 'translateY(-50%)',
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
