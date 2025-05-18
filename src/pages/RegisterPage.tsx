
import { AuthForm } from "@/components/AuthForm";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <CircuitBackground className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-neural-accent hover:text-neural-pulse transition-colors">
          &larr; Back to home
        </Link>
      </div>
      <AuthForm />
    </CircuitBackground>
  );
};

export default RegisterPage;
