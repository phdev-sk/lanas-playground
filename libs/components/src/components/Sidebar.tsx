import { motion, PanInfo, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Menu } from "react-feather";
import { usePrevious } from "../hooks/usePrevious";
import { DarkmodeSwitch } from "./DarkmodeSwitch";

export interface SidebarProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export const Sidebar = ({ onOpenChange }: SidebarProps) => {
  const [isOpen, setOpen] = useState(false);

  const animation = useAnimation();
  const prevIsOpen = usePrevious(isOpen);

  const dragEndHandler = useCallback((event: unknown, info: PanInfo) => {
    const shouldOpen =
      info.velocity.x > 20 || (info.velocity.x >= 0 && info.point.x > 45);
    if (shouldOpen) {
      animation.start("opened");
      setOpen(true);
    } else {
      animation.start("closed");
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    onOpenChange && onOpenChange(isOpen);
    if (prevIsOpen && !isOpen) {
      animation.start("closed");
    } else if (!prevIsOpen && isOpen) {
      animation.start("opened");
    }
  }, [animation, isOpen, prevIsOpen, onOpenChange]);

  return (
    <motion.div
      initial="hidden"
      drag="x"
      animate={animation}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      className="absolute left-[-272px] w-72 h-full pr-4"
      onDragEnd={dragEndHandler}
      dragConstraints={{ right: 272 }}
      variants={{
        opened: { x: 272 },
        closed: { x: 0 },
      }}
      dragElastic={0.1}
    >
      <div className="relative w-full h-full bg-white dark:bg-slate-800 dark:text-white shadow-[-271px_0_0_0_black] shadow-white dark:shadow-slate-700">
        <div className="p-4 w-full h-full flex flex-col justify-between border-r dark:border-slate-700">
          {/* sidebar button */}
          <button
            className="rounded-full w-12 h-12 absolute top-4 -right-16 bg-white dark:bg-slate-800 border dark:border-slate-700 flex items-center justify-center"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <ArrowLeft /> : <Menu />}
          </button>

          <div>
            {/* header */}
            <div></div>
            {/* body */}
            <div></div>
          </div>

          {/* footer */}
          <div>
            <DarkmodeSwitch />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
