export default function Round({ questionNumber }) {
  return (
    <div style={{position: "absolute", top: 0, left: 0, transform: 'translate(-25%, -40%)'}}>
      <svg
        width="120"
        viewBox="0 0 249 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M3.00005 3L242.098 3L180.262 58L3.00005 58L3.00005 3Z"
            fill="#033D50"
          />
          <path
            d="M3.00005 3L242.098 3L180.262 58L3.00005 58L3.00005 3Z"
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
          transform: "translate(-40%, -40%)",
          fontSize: "small",
          fontWeight: 900
        }}
      >
        R - {questionNumber}
      </span>
    </div>
  );
}
