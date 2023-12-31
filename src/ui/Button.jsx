import { Link } from "react-router-dom";

function Button({ children, isDisabled, to }) {
  const className =
    "focus: sd:py-4 inline-block rounded-full bg-yellow-400 px-5 py-4 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6";

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={isDisabled} className={className}>
      {children}
    </button>
  );
}
export default Button;
