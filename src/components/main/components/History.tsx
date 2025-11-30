import { useHistoryStore } from "../../../store/historyStore";
import HistoryItem from "./HistoryItem";

const History = ({ className }: { className?: string }) => {
  const { items, updateHistoryTitle } = useHistoryStore();

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="w-full px-6 py-3 text-sm font-normal border-b-2 border-[#D4D4D4]">
        히스토리
      </div>
      <div className="w-full bg-gray-300 flex flex-col flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-xs font-normal py-3 text-center">
            음성 목록이 없습니다
          </p>
        ) : (
          <div className="px-2 py-2">
            {items.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onRename={updateHistoryTitle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;