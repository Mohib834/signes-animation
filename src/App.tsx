import { cubicBezier, useAnimate } from "framer-motion";
import DownArrowIcon from "./assets/icons/DownArrowIcon";
import { useEffect } from "react";

export default function App() {
  const [pathScope, animatePath] = useAnimate();
  const [circleScope, animateCircle] = useAnimate<HTMLDivElement>();
  const [arrowScope, animateArrow] = useAnimate<HTMLDivElement>();
  const [lineScope, animateLine] = useAnimate<HTMLDivElement>();
  const [menuTextScope, animateMenuText] = useAnimate<HTMLDivElement>();
  const [mainTextScope, animateMainText] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const sequence = async () => {
      await animatePath(
        pathScope.current,
        {
          pathLength: [0, 1],
        },
        {
          duration: 1.3,
          ease: cubicBezier(0.95, 0.05, 0.25, 0.99),
        }
      );

      animateCircle(
        circleScope.current,
        { scale: [0, 1] },
        {
          ease: cubicBezier(0.175, 0.885, 0.32, 1.275),
        }
      );

      animateArrow(
        arrowScope.current,
        {
          opacity: 1,
          y: [8, 0],
        },
        {
          duration: 0.35,
          ease: cubicBezier(0.34, 1.56, 0.64, 1),
        }
      );

      animateLine(
        lineScope.current,
        {
          opacity: 1,
          y: [12, -6, 0],
        },
        {
          duration: 0.4,
          ease: cubicBezier(0.05, 0, 0.35, 1),
        }
      );

      animateMenuText(
        menuTextScope.current,
        {
          opacity: 1,
        },
        {
          duration: 0.3,
        }
      );

      animateMenuText(
        menuTextScope.current,
        {
          opacity: [0, 1],
          y: [20, -6, 0],
        },
        {
          delay: 0.05,
          duration: 0.6,
          ease: cubicBezier(0.05, 0, 0.35, 1),
        }
      );
    };

    sequence();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="min-w-96">
        <div className="w-36 h-36 relative mx-auto">
          <div className="absolute left-1/2 -top-[45px] -translate-x-1/2">
            <div className="flex flex-col items-center gap-[2px]">
              <div
                className="text-[14.4px] font-bold opacity-0 translate-y-2"
                ref={menuTextScope}
              >
                Menu
              </div>

              <div
                className="h-[18px] w-[1.3px] bg-[#2f2d2d] opacity-0"
                ref={lineScope}
              ></div>
            </div>
          </div>

          <div className="absolute left-1/2 top-3 -translate-x-1/2">
            <div className="opacity-0 y-8" ref={arrowScope}>
              <DownArrowIcon />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              ref={circleScope}
              className="w-[53px] h-[53px] rounded-full bg-[#0f0e0e] scale-0"
            />
          </div>

          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathScope}
              d="M 0 0 L 100 0 L 100 100 L 0 100 L 0 0"
              stroke="#2f2f2f"
              strokeWidth="19"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
