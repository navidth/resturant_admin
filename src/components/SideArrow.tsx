import { TiArrowSortedDown } from "react-icons/ti";
import type { SeatStatus } from "../stores/slices/cardSlice";
import { Tooltip } from "antd";

const statusToFill: Record<SeatStatus, string> = {
      EMPTY: "#bbb",
      NEW_GUEST: "#64327a",
      OCCUPIED: "#25a95c",
      WAITING: "#ac8c0d",
      DELIVER: "#2461b6",
};

const SideArrow = ({
      pos,
      status,
      onClick,
      map,
      size,
      hideWhenEmpty = false,
}: {
      pos: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
      status: SeatStatus;
      onClick?: () => void;
      map: Record<string, React.CSSProperties>,
      size: number;
      hideWhenEmpty?: boolean;
}) => {


      const fill = statusToFill[status];
      if (hideWhenEmpty && status === "EMPTY") return null;
      return (
            <Tooltip title={status} color={fill} >
                  <TiArrowSortedDown
                        size={size}
                        onClick={onClick}
                        style={{
                              position: "absolute",
                              cursor: onClick ? "pointer" : "default",
                              fill,
                              zIndex: 20,
                              ...map[pos],
                        }}
                        onMouseEnter={(e) => (onClick ? e.currentTarget.style.fill = "#1f2a44" : null)}
                        onMouseLeave={(e) => (e.currentTarget.style.fill = fill)}
                  />
            </Tooltip>
      );
};

export default SideArrow;
