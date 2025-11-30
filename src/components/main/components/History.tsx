import { useHistoryStore } from "../../../store/historyStore";
import HistoryItem from "./HistoryItem";
import type { HistoryItem as HistoryItemType } from "../../../types/type";

interface HistoryProps {
  className?: string;
  onOpenTranslation: (historyData: HistoryItemType) => void;
}

const History = ({ className, onOpenTranslation }: HistoryProps) => {
  const { items, updateHistoryTitle } = useHistoryStore();

  return (
    <div className={`w-full flex flex-col bg-white rounded-t-[30px] shadow-lg ${className}`}>
      <div className="w-full px-6 py-4 text-base font-semibold border-b border-gray-200">
        음성 목록
      </div>
      <div className="w-full bg-white flex flex-col flex-1 overflow-y-auto">
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
                onOpenTranslation={onOpenTranslation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;