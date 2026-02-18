import { Button, Modal, Tooltip } from "antd";
import { ArrowPos, SeatStatus, useTableStore } from "../stores/slices/cardSlice";
import SideArrow from "./SideArrow";
import { arrowPosList, tableItems } from "../lib/constants";
const ModalTable = () => {
  const {
    isModalOpen,
    selectedTable,
    draftSeats,
    draftArrows,
    toggleDraftArrow,
    closeModal,
    toggleDraftSeat,
    commitDraft
  } = useTableStore();


  const Seat = ({ seat, idx }: { seat: SeatStatus, idx: number }) => {
    const background = seat === "EMPTY"
      ? "#E6EEF9"
      : seat === "NEW_GUEST"
        ? "#8E44AD"
        : seat === "OCCUPIED"
          ? "#2ECC71"
          : seat === "WAITING"
            ? "#F1C40F"
            : "#1F6EE0"
    const color = seat === "EMPTY" ? "#1f2a44" : "white"

    return (
      <div>
        <Tooltip title={`Seat ${idx + 1}: ${seat}`} color={background}  >
          <div
            onClick={() => toggleDraftSeat(idx)}
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              border: "2px solid #1f2a44",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
              fontWeight: 800,
              background: background,
              color: color,
              boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
            }}
          >
            {idx + 1}
          </div>
        </Tooltip>

      </div>
    )
  };
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

  const fourSeatTable = tableItems.find((item) => item.name === selectedTable)?.seat === 4;
  const arrowsToRender: ArrowPos[] = fourSeatTable
    ? ["top", "bottom", ...arrowPosList]
    : [...arrowPosList];

  return (
    <Modal
      styles={{
        title: {
          fontSize: '20px'
        },
        footer: {
          display: "flex"
        }
      }}
      open={isModalOpen}
      onCancel={closeModal}
      footer={[
        <Button key="cancel"
          danger
          type="primary"
          style={{ width: "50%", height: "50px", fontSize: "18px" }}
          onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          style={{ width: "50%", height: "50px", fontSize: "18px" }}
          onClick={() => {
            if (!selectedTable) return;
            commitDraft();
            closeModal();
          }}
        >
          Ok
        </Button>,
      ]}
    >
      {selectedTable && (
        <>
          {(() => {
            const seats = draftSeats || [];
            const half = Math.ceil(seats.length / 2);
            const topSeats = seats.slice(0, half);
            const bottomSeats = seats.slice(half);

            return (
              <div
                style={{
                  width: 420,
                  margin: "0 auto",
                  position: "relative",
                  padding: 24,
                  display: "grid",
                  gridTemplateRows: "auto auto auto",
                  justifyItems: "center",
                  gap: 14,
                }}
              >

                {arrowsToRender.map((pos, i) => (
                  <SideArrow
                    map={map}
                    size={100}
                    key={pos}
                    pos={pos}
                    status={draftArrows[i] ?? "EMPTY"}
                    onClick={() => toggleDraftArrow(i)}
                  />
                ))}

                {/* بالا */}
                <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
                  {topSeats.map((seat, i) => (
                    <Seat key={i} seat={seat} idx={i} />
                  ))}
                </div>

                {/* میز */}
                <div
                  style={{
                    width: 280,
                    height: 150,
                    borderRadius: 24,
                    background: "#ddd",
                    border: "2px solid #1f2a44",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 20,
                    boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
                  }}
                >
                  Table {selectedTable}
                </div>

                {/* پایین */}
                <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
                  {bottomSeats.map((seat, i) => (
                    <Seat key={half + i} seat={seat} idx={half + i} />
                  ))}
                </div>
              </div>
            )
          })()}
          {/* <Alert
            title="Click seats to change"
            style={{ marginTop: "15px" }}
            description="EMPTY → NEW_GUEST → OCCUPIED → WAITING → DELIVER"
            type="info"
            showIcon
          /> */}

        </>
      )}

    </Modal>
  );
};

export default ModalTable;
