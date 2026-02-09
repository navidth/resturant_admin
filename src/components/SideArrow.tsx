import { TiArrowSortedDown } from "react-icons/ti";
const SideArrow = ({
      pos,
      onClick,
}: {
      pos:
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "topLeft"
      | "topRight"
      | "bottomLeft"
      | "bottomRight";
      onClick: () => void;
}) => {
      const map: Record<string, React.CSSProperties> = {
            top: { top: 5, left: "50%", transform: "translateX(-50%) rotate(0deg)" },
            bottom: { bottom: 5, left: "50%", transform: "translateX(-50%) rotate(180deg)" },
            left: { left: -10, top: "50%", transform: "translateY(-50%) rotate(-90deg)" },
            right: { right: -10, top: "50%", transform: "translateY(-50%) rotate(90deg)" },
            topLeft: { top: 45, left: 5, transform: "rotate(320deg)" },
            topRight: { top: 45, right: 5, transform: "rotate(50deg)" },
            bottomLeft: { bottom: 45, left: 5, transform: "rotate(220deg)" },
            bottomRight: { bottom: 45, right: 5, transform: "rotate(140deg)" },
      };

      return (
            <TiArrowSortedDown size={100} onClick={onClick}
                  className="fill-[#bbb] hover:fill-[#1f2a44]  duration-300 "
                  style={{
                        position: "absolute",
                        cursor: "pointer",
                        ...map[pos],
                  }} />
      );
};
export default SideArrow