import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Lottie from "lottie-react";
import animationData from "../lottie/login_animation.json";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js"; 


const Wrapper = styled.div`
  background: #e0e5ec;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const SignupBox = styled.div`
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

const CenteredForm = styled.form`
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
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 12px;
  background: #e0e5ec;
  box-shadow: inset 5px 5px 10px #babecc, inset -5px -5px 10px #ffffff;
  font-size: 1rem;
  margin-top: 0.25rem;
  color: #333;
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: red;
  margin-top: 0.25rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #555;
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

const AnimationWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem auto;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Must include uppercase, number, and special character.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.acceptedTerms)
      newErrors.terms = "You must agree to the terms.";

    setErrors(newErrors);
    setFirebaseError("");

    if (Object.keys(newErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // You could also save additional info to Firestore here (e.g., name/phone)

        alert("Account created successfully!");
        navigate("/home");
      } catch (err) {
        console.error("Firebase Error:", err.message);
        setFirebaseError(err.message);
      }
    }
  };

  return (
    <Wrapper>
      <SignupBox>
        <AnimationWrapper>
          <Lottie animationData={animationData} loop={true} />
        </AnimationWrapper>
        <Title>Create Account</Title>
        <CenteredForm onSubmit={handleSubmit}>
          <Label>
            Full Name
            <Input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </Label>

          <Label>
            Email
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Label>

          <Label>
            Phone Number
            <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </Label>

          <Label>
            Password
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </Label>

          <Label>
            Confirm Password
            <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </Label>

          <CheckboxWrapper>
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </CheckboxWrapper>
          {errors.terms && <ErrorText>{errors.terms}</ErrorText>}

          <Button type="submit">Create Account</Button>
        </CenteredForm>

        <LinkWrapper>
          <StyledLink to="/">Have an account? Sign in</StyledLink>
        </LinkWrapper>
      </SignupBox>
    </Wrapper>
  );
};

export default SignupPage;
