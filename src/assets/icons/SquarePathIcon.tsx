import { forwardRef, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const SquarePathIcon = forwardRef<SVGPathElement, Props>((props, ref) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        ref={ref}
        d="M 0 0 L 100 0 L 100 100 L 0 100 L 0 0"
        stroke="#2f2f2f"
        strokeWidth="19"
      />
    </svg>
  );
});

export default SquarePathIcon;
