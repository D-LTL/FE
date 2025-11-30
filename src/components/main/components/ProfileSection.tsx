import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end pr-6 mt-[11px]">
      <button onClick={() => navigate("/mypage")}>
        <img src="/profile.svg" alt="/profile_img" width={39} height={39} />
      </button>
    </div>
  );
}

export default ProfileSection;