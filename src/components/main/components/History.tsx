import { useState, useEffect } from "react";
import type { HistoryItem as HistoryItemType } from "../../../types/type";
import HistoryItem from "./HistoryItem";

const History = ({ className }: { className?: string }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load history data from JSON file
    fetch("/data/history.json")
      .then((res) => res.json())
      .then((data) => {
        setHistoryItems(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load history:", err);
        setLoading(false);
      });
  }, []);

  const handleRename = (id: string, newTitle: string) => {
    setHistoryItems((items) =>
      items.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="w-full px-6 py-3 text-sm font-normal border-b-2 border-[#D4D4D4]">
        히스토리
      </div>
      <div className="w-full bg-gray-300 flex flex-col flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs font-normal py-3 text-center">로딩 중...</p>
        ) : historyItems.length === 0 ? (
          <p className="text-xs font-normal py-3 text-center">
            번역 목록이 없습니다.
          </p>
        ) : (
          <div className="px-2 py-2">
            {historyItems.map((item) => (
              <HistoryItem key={item.id} item={item} onRename={handleRename} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;