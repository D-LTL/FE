import LoginTitle from "./LoginTitle";
import LoginForm from "./LoginForm";

const LoginTemplate = () => {
  return (
    <div className="z-10 flex flex-col items-center w-full h-screen bg-white">
      <LoginTitle />
      <LoginForm />
    </div>
  );
};

export default LoginTemplate;
