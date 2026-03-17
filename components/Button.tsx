
interface ButtonProps {
  children: React.ReactNode,
  className: string,
  link: string
}

const Button = ({ children, className, link }: ButtonProps) => {
  return (
    <a
      href={link}
      target="_blank"
      className={`inline-block p-2 lg:px-5 lg:py-2 rounded-full border text-white shadow-[0_4px_0_#f0f0f0] hover:translate-y-1 hover:shadow-[0_2px_0_#fff] active:translate-y-2 active:shadow-none transition-all duration-150 cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
