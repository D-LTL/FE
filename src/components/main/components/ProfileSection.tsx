import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 right-4 z-20">
      <button onClick={() => navigate("/mypage")}>
        <img src="/profile.svg" alt="/profile_img" width={39} height={39} />
      </button>
    </div>
  );
}

export default ProfileSection;