import styled from 'styled-components';


const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 80%;
  margin: 5px 0;

  label {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;
const CheckboxInput = ({ name, onChange, label }) => (
  <label>
    <input
      type="checkbox"
      name={name}
      onChange={onChange}
    />
    {label}
  </label>
);

const MemberNonMemberInput = (handleChange) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        name="nonParticipant"
        onChange={handleChange}
        value="Member"
        label="Member"
   
      />
      <CheckboxInput
        name="nonParticipant"
        onChange={handleChange}
        value="Non Member"
        label="Member"
      />
    </CheckboxContainer>
  );
};

export default MemberNonMemberInput;
