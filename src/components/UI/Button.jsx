const Button = ({ children }) => {
  return (
    <button
      className="button py-[0.5rem] px-[2rem] bg-[#0028ab] hover:bg-[#234edc]  active:bg-[#234edc]  text-white cursor-pointer border border-[#0028ab] hover:border-[#234edc] active:border-[#234edc] focus:outline-none"
      type={props.type}
    >
      {children}
    </button>
  );
};

export default Button;
