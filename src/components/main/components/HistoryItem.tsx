import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HistoryItem as HistoryItemType } from "../../../types/type";

interface HistoryItemProps {
  item: HistoryItemType;
  onRename: (id: string, newTitle: string) => void;
}

const HistoryItem = ({ item, onRename }: HistoryItemProps) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleItemClick = () => {
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
    navigate("/translate", { state: item });
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
            isPlaying ? "bg-[#787878]" : "bg-[#5A5A5A]"
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
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] p-6 z-50 popup-slide-up">
            <div className="space-y-3">
              <button
                onClick={handleRename}
                className="w-full py-4 text-left px-4 hover:bg-[#F5F5F5] rounded-[15px] transition"
              >
                <span className="text-base font-medium text-gray-800">
                  이름 바꾸기
                </span>
              </button>
              <button
                onClick={handleViewDetail}
                className="w-full py-4 text-left px-4 hover:bg-[#F5F5F5] rounded-[15px] transition"
              >
                <span className="text-base font-medium text-gray-800">
                  자세히 보기
                </span>
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-4 text-center bg-[#EBEBEB] rounded-[15px] transition hover:bg-[#D4D4D4]"
              >
                <span className="text-base font-medium text-gray-600">취소</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HistoryItem;
