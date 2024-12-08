import DownArrowIcon from "./assets/icons/DownArrowIcon";
import DotCircleIcon from "./assets/icons/DotCircleIcon";
import SquarePathIcon from "./assets/icons/SquarePathIcon";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen overflow-y-scroll">
      <div className="min-w-96 mt-4 w-[704px] h-[704px] relative">
        <div className="w-[704px] h-[704px]">
          <div className="w-36 h-36 rounded-full center-absolute flex justify-center items-center">
            <div className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#ffe27a] translate-x-[-1px] translate-y-[1px]"></div>
            <div className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#FFA27A] translate-x-[-1px] translate-y-[1px]"></div>
            <div className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#75a5eb] translate-x-[-1px] translate-y-[1px]"></div>
            <div className="z-10 absolute min-w-[53px] min-h-[53px] rounded-full bg-[#75ebb0] translate-x-[-1px] translate-y-[1px]"></div>
          </div>
        </div>

        <div className="mt-10 center-absolute">
          <div id="menu-container" className="w-36 h-36 relative mx-auto">
            <div className="absolute left-1/2 -top-[45px] -translate-x-1/2">
              <div className="flex flex-col items-center gap-[2px]">
                <div className="text-[14.4px] font-bold translate-y-2">
                  Menu
                </div>

                <div className="h-[18px] w-[1.3px] bg-[#2f2d2d]"></div>
              </div>
            </div>

            <div className="absolute left-1/2 top-3 -translate-x-1/2">
              <div className="translate-y-8">
                <DownArrowIcon />
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              <div className="hidden ">
                <DotCircleIcon width={56} height={56} />
              </div>

              <div className="pulse-animation relative w-[56px] h-[56px] rounded-full bg-[#0f0e0e] scale-0"></div>
            </div>

            <SquarePathIcon />
          </div>

          <div className="mt-[19px]">
            <div className="text-center">
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
