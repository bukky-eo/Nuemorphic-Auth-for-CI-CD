import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../lottie/login_animation.json";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js"; 

// === STYLED COMPONENTS ===

const Wrapper = styled.div`
  background: #e0e5ec;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LoginBox = styled.div`
  background: #e0e5ec;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff;
  width: 100%;
  max-width: 400px;
  min-width: 320px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AnimationWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  background: #e0e5ec;
  box-shadow: inset 5px 5px 10px #babecc, inset -5px -5px 10px #ffffff;
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  background: #e0e5ec;
  box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
  font-size: 1rem;
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
    color: #0077ff;
  }
`;

// === COMPONENT ===

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setFirebaseError("");
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.email) {
    newErrors.email = "Email is required.";
  }

  if (!formData.password) {
    newErrors.password = "Password is required.";
  }

  // If email/password fields are missing, set those errors immediately
  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  // Try signing in with Firebase
  try {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    navigate("/home");
  } catch (error) {
    // Firebase auth failed — let's give field-specific feedback
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-email"
    ) {
      setErrors({ email: "Email not found." });
    } else if (error.code === "auth/wrong-password") {
      setErrors({ password: "Incorrect password." });
    } else {
      setErrors({
        email: "Login failed. Check credentials.",
        password: "Login failed. Check credentials.",
      });
    }
  }
};


  return (
    <Wrapper>
      <LoginBox>
        <AnimationWrapper>
          <Lottie animationData={animationData} loop />
        </AnimationWrapper>
        <Title>Sign In</Title>

        <Form onSubmit={handleSubmit}>
          <Label>
            Email
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Label>

          <Label>
            Password
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </Label>

          {firebaseError && <ErrorText>{firebaseError}</ErrorText>}

          <Button type="submit">Login</Button>
        </Form>

        <LinkWrapper>
          <StyledLink to="/signup">Don't have an account? Create one</StyledLink>
        </LinkWrapper>
      </LoginBox>
    </Wrapper>
  );
};

export default LoginPage;

