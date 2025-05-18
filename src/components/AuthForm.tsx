
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "./InputField";
import { CircuitButton } from "./CircuitButton";
import { NetworkLogo } from "./NetworkLogo";
import { useToast } from "@/hooks/use-toast";
import { validateEmail } from "../utils/validators";

type AuthMode = "login" | "register";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setEmailError("");
  };

  const validateForm = () => {
    let isValid = true;
    setEmailError("");

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid Gmail address");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === "login") {
        // In a real app, this would authenticate with the backend
        // const response = await fetch('http://localhost:5000/api/users/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ email, password }),
        // });
        
        // const data = await response.json();
        // if (response.ok) {
        //   localStorage.setItem('token', data.token);
        //   localStorage.setItem('user', JSON.stringify(data.user));
        // }

        toast({
          title: "Welcome back!",
          description: "You've successfully logged in."
        });
        
        // Redirect to feed page after successful login
        navigate("/feed");
      } else {
        // In a real app, this would register with the backend
        // const response = await fetch('http://localhost:5000/api/users/register', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ username, email, password }),
        // });
        
        // const data = await response.json();
        // if (response.ok) {
        //   localStorage.setItem('token', data.token);
        //   localStorage.setItem('user', JSON.stringify(data.user));
        // }

        toast({
          title: "Account created!",
          description: "Your account has been created successfully."
        });

        // Redirect to feed page after successful registration
        navigate("/feed");
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: "An error occurred during authentication.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto neural-card p-8 glow-border animate-fade-in">
      <div className="flex justify-center mb-6">
        <NetworkLogo size="lg" />
      </div>

      <h2 className="text-2xl font-mono text-center mb-6">
        {mode === "login" ? "Access The Network" : "Join The Network"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "register" && (
          <InputField
            label="Username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <div className="space-y-2">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your Gmail address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            required
          />
          {emailError && (
            <p className="text-sm text-red-500">{emailError}</p>
          )}
        </div>

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <CircuitButton type="submit" className="w-full">
          {mode === "login" ? "Login" : "Create Account"}
        </CircuitButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-neural-muted text-sm">
          {mode === "login" ? "New to The Network?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-1 text-neural-pulse hover:underline focus:outline-none"
          >
            {mode === "login" ? "Create an account" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
