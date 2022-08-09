export default function Submit({ onClick }) {
  return (
    <div
      style={{
        transform: "translate(-25%, -40%)",
      }}
    >
      <svg
        viewBox="0 0 249 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <g>
          <path
            d="M246 58L6.90186 58L68.7376 3L246 3V58Z"
            fill="#033D50"
          />
          <path
            d="M246 58L6.90186 58L68.7376 3L246 3V58Z"
            stroke="#58A1B9"
            stroke-width="5"  
          />
        </g>
      </svg>

      <span
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-15%, -40%)",
          fontSize: "small",
          fontWeight: 900,
        }}
      >
        SUBMIT
      </span>
    </div>
  );
}
