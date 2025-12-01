const BottomGradient = () => {
  return (
    <div
      className="absolute bottom-0 w-full h-[150px] pointer-events-none z-10"
      style={{
        background: 'linear-gradient(to top, rgba(229, 255, 143, 0.4) 0%, rgba(229, 255, 143, 0) 100%)'
      }}
    />
  );
};

export default BottomGradient;
