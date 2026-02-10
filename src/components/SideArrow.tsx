import { TiArrowSortedDown } from "react-icons/ti";
import type { SeatStatus } from "../stores/slices/cardSlice";

const statusToFill: Record<SeatStatus, string> = {
      EMPTY: "#bbb",
      NEW_GUEST: "#8E44AD",
      OCCUPIED: "#2ECC71",
      WAITING: "#F1C40F",
      DELIVER: "#1F6EE0",
};

const SideArrow = ({
      pos,
      status,
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
      status: SeatStatus;
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

      const fill = statusToFill[status];

      return (
            <TiArrowSortedDown
                  size={100}
                  onClick={onClick}
                  style={{
                        position: "absolute",
                        cursor: "pointer",
                        fill,
                        transition: "fill 300ms",
                        ...map[pos],
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.fill = "#1f2a44")}
                  onMouseLeave={(e) => (e.currentTarget.style.fill = fill)}
            />
      );
};

export default SideArrow;
