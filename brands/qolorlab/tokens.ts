import raw from "./tokens.json";

const colors = {
  background: {
    base:    raw.colors["Background/Base"],
    surface: raw.colors["Background/Surface"],
  },
  text: {
    primary:   raw.colors["Text/Primary"],
    secondary: raw.colors["Text/Secondary"],
  },
  accent: {
    red: raw.colors["Accent/Red"],
  },
  stroke: {
    default: raw.colors["Stroke/Default"],
  },
};

const typography = {
  display: raw.typography["Type/Display"],
  heading: raw.typography["Type/Heading"],
  body:    raw.typography["Type/Body"],
  small:   raw.typography["Type/Small"],
};

const spacing = {
  t1:  raw.spacing["t-1"],
  t2:  raw.spacing["t-2"],
  t3:  raw.spacing["t-3"],
  t4:  raw.spacing["t-4"],
  t5:  raw.spacing["t-5"],
  t6:  raw.spacing["t-6"],
  t7:  raw.spacing["t-7"],
  t8:  raw.spacing["t-8"],
  t9:  raw.spacing["t-9"],
  t10: raw.spacing["t-10"],
};

const radius = {
  none: raw.radius.none,
  sm:   raw.radius.sm,
  md:   raw.radius.md,
  lg:   raw.radius.lg,
  full: raw.radius.full,
};

export const Q = { colors, typography, spacing, radius };
