export function HeroDevice() {
  const rows = [
    ["green:6", "gray:8", "violet:7", "white:10"],
    ["cyan:10", "gray:6", "green:8"],
    ["violet:7", "white:12", "gray:7"],
    ["green:8", "cyan:8", "gray:6", "white:7"],
    ["gray:10", "violet:9", "green:6"],
    ["white:7", "gray:6", "cyan:10", "green:8"],
    ["violet:8", "gray:5", "white:11"],
    ["green:11", "cyan:7", "gray:6"],
  ];

  return (
    <div className="device-stage" aria-hidden="true">
      <div className="device-screen">
        <div className="device-toolbar font-code">
          <div className="device-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="device-title">portfolio.tsx</div>
          <div className="device-actions">_ □ ×</div>
        </div>

        <div className="device-code font-code">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="code-row">
              <span className="code-index">{String(rowIndex + 1).padStart(2, "0")}</span>
              {row.map((segment, segmentIndex) => {
                const [tone, width] = segment.split(":");

                return (
                  <span
                    key={`${rowIndex}-${segmentIndex}`}
                    className={`code-pill pill-${tone}`}
                    style={{ width: `${Number(width) * 0.6}rem` }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="device-base" />
    </div>
  );
}
