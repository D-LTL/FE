const History = ({ className }: { className?: string }) => {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="w-full px-6 py-3 text-sm font-normal border-b-2 border-[#D4D4D4]">히스토리</div>
      <div className="w-full bg-gray-300 flex flex-col items-center flex-1 overflow-hidden">
        <p className="text-xs font-normal py-3">번역 목록이 없습니다.</p>
      </div>
    </div>
  );
}

export default History;