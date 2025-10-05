import LoginTitle from "./LoginTitle";
import LoginForm from "./LoginForm";

const LoginTemplate = () => {
  return (
    <div className="z-10 flex flex-col items-center justify-center w-full h-screen">
      <LoginTitle />
      <LoginForm />
    </div>
  );
};

export default LoginTemplate;
