import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { insertData } from "./apiInsertParticipant";
import toast from "react-hot-toast";
import   MemberNonMemberInput  from "./MemberNonMemberInput";

const Background = styled.div`
  background-image: url("/MRSP Website Phone Design.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
`;

const OuterContainer = styled.div`
  height: 100dvh;
  max-width: 300px;
  margin: auto;
  font-family: "Roboto";
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    margin-bottom: 1rem;
  }
`;
const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;
const Enter = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  margin: 5px;
  max-width: 80%;
  width: 100%;
  border-radius: 7px;
  background-color: #e0e4fc;
  border: none;
  padding: 5px;
  font-weight: 300;
  padding-left: 1rem;

  &::placeholder {
    font-size: 0.7rem;
  }
`;

const ButtonForm = styled.form`
  text-align: center;
`;

const GenerateQR = styled.button`
  background-color: #103cd4;
  border: none;
  border-radius: 10px;
  color: #e7f7ff;
  padding: 0.5rem;
  width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
`;
function Register() {
  const options = ["Mechatronics", "Robotics", "IOT Skills", "R&D Exhibit"];
   const options2 = ["Member", "Non Member"];
  const options3 = ["Participant", "Coach", "Visitor", "Officer", "VIP", "Judge", "Others"];
  
  let isSubmitted = false;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    schoolCompany: "",
    schoolCompanyAddress: "",
    competitionCategory: "",
    nonParticipant: "",
    chapter:"",
    role:"",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mutation = useMutation(insertData, {
    onSuccess: () => {
      toast.success("You are successfully registered!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        schoolCompany: "",
        schoolCompanyAddress: "",
        competitionCategory: "",
        nonParticipant: "",
        chapter:"",
        role:"",
      });

      isSubmitted = true;
      console.log(isSubmitted);
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  const DropdownInput = ({ options, placeholder }) => {
    return (
      <>
        <Input
          list="dropdown-options-1"
          placeholder={placeholder}
          onChange={handleChange}
          name="competitionCategory"
          value={formData.competitionCategory}
        />
        <datalist id="dropdown-options-1">
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </>
    );
  };
  
  const DropdownInput2 = ({ options2, placeholder }) => {
    return (
      <>
        <Input
          list="dropdown-options-2"
          placeholder={placeholder}
          onChange={handleChange}
          name="nonParticipant"
          value={formData.nonParticipant}
        />
        <datalist id="dropdown-options-2">
          {options2.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </>
    );
  };
  
  const DropdownInput3 = ({ options3, placeholder }) => {
    return (
      <>
        <Input
          list="dropdown-options-3"
          placeholder={placeholder}
          onChange={handleChange}
          name="role"
          value={formData.role}
        />
        <datalist id="dropdown-options-3">
          {options3.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </>
    );
  };


  return (
    <>
      <Background>
        <OuterContainer>
          <img src="/MRSP logo.png" alt="MRSP logo" height={100} width={100} />
          <Header>Registration</Header>
          <Enter>Enter your details to generate a QR code</Enter>
          <InputContainer>
            <Input
              placeholder="First name"
              name="firstName"
              type="text"
              onChange={handleChange}
              value={formData.firstName}></Input>
            <Input
              placeholder="Last name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}></Input>
            <Input
              placeholder="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}></Input>
            <Input
              placeholder="Phone number"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}></Input>
              <Input
              placeholder="MRSP Chapter"
              name="chapter"
              type="text"
              value={formData.chapter}
              onChange={handleChange}></Input>
            <Input
              placeholder="School/Company"
              name="schoolCompany"
              type="text"
              value={formData.schoolCompany}
              onChange={handleChange}></Input>
            <Input
              placeholder="Address (School/Company)"
              name="schoolCompanyAddress"
              type="text"
              value={formData.schoolCompanyAddress}
              onChange={handleChange}></Input>

            <DropdownInput3
              options3={options3}
              placeholder="Register as"
              onChange={handleChange}
              name="role"
            />
            <DropdownInput
              options={options}
              placeholder="Competition category"
              onChange={handleChange}
              name="competitionCategory"
            />
            <DropdownInput2
              options2={options2}
              placeholder="Join as"
              onChange={handleChange}
              name="nonParticipant"
            />

            
          </InputContainer>

          <ButtonForm onSubmit={handleSubmit}>
            <GenerateQR type="submit">Register</GenerateQR>
          </ButtonForm>
        </OuterContainer>
      </Background>
    </>
  );
}
export default Register;
