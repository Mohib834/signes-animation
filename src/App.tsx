import {
  AnimationPlaybackControls,
  cubicBezier,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  useAnimate,
} from "framer-motion";
import DownArrowIcon from "./assets/icons/DownArrowIcon";
import { useEffect, useRef, useState } from "react";
import DotCircleIcon from "./assets/icons/DotCircleIcon";
import SquarePathIcon from "./assets/icons/SquarePathIcon";

export default function App() {
  const [mainContainerScope, animateMainContainer] =
    useAnimate<HTMLDivElement>();

  const [pathScope, animatePath] = useAnimate();
  const [circleScope, animateCircle] = useAnimate<HTMLDivElement>();
  const [arrowScope, animateArrow] = useAnimate<HTMLDivElement>();
  const [lineScope, animateLine] = useAnimate<HTMLDivElement>();

  const [menuTextScope, animateMenuText] = useAnimate<HTMLDivElement>();
  const [mainTextScope, animateMainText] = useAnimate<HTMLDivElement>();

  const [menuCircle1Scope, animateMenuCircle1] = useAnimate<HTMLDivElement>();
  const [menuCircle2Scope, animateMenuCircle2] = useAnimate<HTMLDivElement>();
  const [menuCircle3Scope, animateMenuCircle3] = useAnimate<HTMLDivElement>();
  const [menuCircle4Scope, animateMenuCircle4] = useAnimate<HTMLDivElement>();

  const [dotCircleScope, animateDotCircle] = useAnimate<HTMLDivElement>();
  const dotCircleAnimationRef = useRef<AnimationPlaybackControls | null>(null);

  const [isMenuReady, setIsMenuReady] = useState(false);
  const [isMenuFullyOpen, setIsMenuFullyOpen] = useState(false); // when animation is fully done

  useEffect(() => {
    const sequence = async () => {
      await animatePath(
        pathScope.current,
        { pathLength: [0, 1] },
        { duration: 1.3, ease: cubicBezier(0.95, 0.05, 0.25, 0.99) }
      );

      animateCircle(
        circleScope.current,
        { scale: [0, 1] },
        { ease: cubicBezier(0.175, 0.885, 0.32, 1.275) }
      );

      animateArrow(
        arrowScope.current,
        { opacity: 1, y: [8, 0] },
        { duration: 0.35, ease: cubicBezier(0.34, 1.56, 0.64, 1) }
      );

      animateLine(
        lineScope.current,
        { opacity: 1, y: [12, -6, 0] },
        { duration: 0.4, ease: cubicBezier(0.05, 0, 0.35, 1) }
      );

      // Animating menu text opacity first
      animateMenuText(menuTextScope.current, { opacity: 1 }, { duration: 0.3 });

      await animateMenuText(
        menuTextScope.current,
        { opacity: [0, 1], y: [20, -6, 0] },
        { delay: 0.05, duration: 0.6, ease: cubicBezier(0.05, 0, 0.35, 1) }
      );

      await animateMainText(
        mainTextScope.current,
        { opacity: 1 },
        { duration: 0.6 }
      );

      setIsMenuReady(true);
    };

    sequence();
  }, []);

  const toggleMenu = () => {
    if (!isMenuReady) return;

    if (isMenuFullyOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = async () => {
    if (!isMenuReady || isMenuFullyOpen) return;

    animateCircle(circleScope.current, { display: "none" }, { duration: 0 });

    // Circle Dot animation ( Adding delay to let the circle fully open )
    // Putting it after the circle animation to avoid click interference
    animateDotCircle(
      dotCircleScope.current,
      { opacity: 1, display: "block" },
      { duration: 0.5, delay: 0.9 }
    );

    dotCircleAnimationRef.current = animateDotCircle(
      dotCircleScope.current,
      { rotate: 360 },
      { duration: 24, repeat: Infinity, repeatType: "loop", delay: 0.9 }
    );

    await Promise.all([
      animateMainContainer(
        mainContainerScope.current,
        {
          rotate: 90,
        },
        {
          duration: 0.8,
          ease: "easeOut",
        }
      ),
      animateMenuCircle4(
        menuCircle4Scope.current,
        {
          x: -352,
          y: -352,
          zIndex: 10,
        },
        { ease: "backOut", duration: 0.8, delay: 0.2 }
      ),
      animateMenuCircle3(
        menuCircle3Scope.current,
        {
          x: -352,
          y: 352,
          zIndex: 10,
        },
        { ease: "backOut", duration: 0.8, delay: 0.25 }
      ),
      animateMenuCircle2(
        menuCircle2Scope.current,
        {
          x: 352,
          y: 352,
          zIndex: 10,
        },
        { ease: "backOut", duration: 0.8, delay: 0.3 }
      ),
      animateMenuCircle1(
        menuCircle1Scope.current,
        {
          x: 352,
          y: -352,
          zIndex: 10,
        },
        { ease: "backOut", duration: 0.8, delay: 0.35 }
      ),
    ]);

    // Keep dot circle rotating

    setIsMenuFullyOpen(true);
  };

  const closeMenu = async () => {
    if (!isMenuFullyOpen) return;

    const reverseAnimation: DOMKeyframesDefinition = {
      x: -1,
      y: 1,
      zIndex: -10,
    };
    const reverseAnimationOpt: DynamicAnimationOptions = {
      duration: 0.8,
      ease: "backIn",
    };

    animateDotCircle(
      dotCircleScope.current,
      { display: "none", opacity: "0" },
      { duration: 0.5 }
    );

    await Promise.all([
      animateMenuCircle1(
        menuCircle1Scope.current,
        reverseAnimation,
        reverseAnimationOpt
      ),
      animateMenuCircle2(menuCircle2Scope.current, reverseAnimation, {
        ...reverseAnimationOpt,
        delay: 0.1,
      }),
      animateMenuCircle3(menuCircle3Scope.current, reverseAnimation, {
        ...reverseAnimationOpt,
        delay: 0.15,
      }),
      animateMenuCircle4(menuCircle4Scope.current, reverseAnimation, {
        ...reverseAnimationOpt,
        delay: 0.2,
      }),
    ]);

    animateCircle(circleScope.current, { display: "block" }, { duration: 0 });

    // Stop dot circle animation
    dotCircleAnimationRef.current?.cancel();

    // Animate main container back to 0
    animateMainContainer(
      mainContainerScope.current,
      { rotate: 0 },
      { duration: 0 }
    );

    setIsMenuFullyOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-y-scroll">
      <div className="min-w-96 mt-4 w-[704px] h-[704px] relative">
        <div ref={mainContainerScope} className="w-[704px] h-[704px]">
          <div className="w-36 h-36 rounded-full center-absolute flex justify-center items-center">
            {isMenuReady && (
              <>
                <div
                  ref={menuCircle1Scope}
                  className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#ffe27a] translate-x-[-1px] translate-y-[1px]"
                ></div>
                <div
                  ref={menuCircle2Scope}
                  className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#FFA27A] translate-x-[-1px] translate-y-[1px]"
                ></div>
                <div
                  ref={menuCircle3Scope}
                  className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#75a5eb] translate-x-[-1px] translate-y-[1px]"
                ></div>
                <div
                  ref={menuCircle4Scope}
                  className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#75ebb0] translate-x-[-1px] translate-y-[1px]"
                ></div>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 center-absolute">
          <div id="menu-container" className="w-36 h-36 relative mx-auto">
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
              <div className="opacity-0 translate-y-8" ref={arrowScope}>
                <DownArrowIcon />
              </div>
            </div>

            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={toggleMenu}
            >
              <div ref={dotCircleScope} className="hidden opacity-0">
                <DotCircleIcon width={56} height={56} />
              </div>

              <div
                ref={circleScope}
                className="pulse-animation relative w-[56px] h-[56px] rounded-full bg-[#0f0e0e] scale-0"
              ></div>
            </div>

            <SquarePathIcon ref={pathScope} />
          </div>

          <div className="mt-[19px]">
            <div ref={mainTextScope} className="text-center opacity-0">
              <h1 className="text-[27px] font-bold leading-normal">
                Signes du quotidien
              </h1>
              <h2 className="text-[13px] text-[#9c9c9c] uppercase font-bold">
                Atelier de design graphique
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
