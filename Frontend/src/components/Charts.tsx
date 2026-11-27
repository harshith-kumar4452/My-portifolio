"use client";

import { useEased, useInView } from "./hooks";

export function Radar({ data }: { data: { label: string; value: number }[] }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const k = useEased(seen, 1300);
  const size = 360, c = size / 2, r = 120, n = data.length;
  const pt = (i: number, v: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [c + Math.cos(a) * r * v, c + Math.sin(a) * r * v];
  };
  const area = data.map((d, i) => pt(i, (d.value / 100) * k));

  return (
    <div ref={ref}>
      <svg className="radar" viewBox={`-40 -10 ${size + 80} ${size + 20}`} role="img" aria-label="Radar chart of average skill level per category">
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon key={s} className="grid-ring" points={data.map((_, i) => pt(i, s).join(",")).join(" ")} />
        ))}
        {data.map((_, i) => {
          const [x, y] = pt(i, 1);
          return <line key={i} className="axis" x1={c} y1={c} x2={x} y2={y} />;
        })}
        <polygon className="area" points={area.map((p) => p.join(",")).join(" ")} />
        {area.map((p, i) => (
          <circle key={i} className="dot" r={4} cx={p[0]} cy={p[1]} />
        ))}
        {data.map((d, i) => {
          const [lx, ly] = pt(i, 1.24);
          const anchor = Math.abs(lx - c) < 4 ? "middle" : lx > c ? "start" : "end";
          return (
            <g key={d.label}>
              <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle">{d.label}</text>
              <text className="val" x={lx} y={ly + 15} textAnchor={anchor} dominantBaseline="middle">{d.value}%</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Donut({ data }: { data: { label: string; value: number; color: string }[] }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 60, C = 2 * Math.PI * R;
  const segs = data.map((d, i) => {
    const before = data.slice(0, i).reduce((s, x) => s + (x.value / total) * C, 0);
    return { ...d, len: (d.value / total) * C - 2, offset: -before };
  });

  return (
    <div ref={ref}>
      <div className="donut-wrap">
        <svg className="donut" viewBox="0 0 160 160" role="img" aria-label="Share of projects by domain">
          <circle className="bg" cx={80} cy={80} r={R} />
          {segs.map((s) => (
            <circle
              key={s.label}
              className="seg"
              cx={80}
              cy={80}
              r={R}
              stroke={s.color}
              strokeDasharray={seen ? `${s.len} ${C}` : `0 ${C}`}
              strokeDashoffset={s.offset}
            />
          ))}
        </svg>
        <ul className="legend">
          {data.map((d) => (
            <li key={d.label}>
              <i style={{ background: d.color }} />
              {d.label}
              <span className="v">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
