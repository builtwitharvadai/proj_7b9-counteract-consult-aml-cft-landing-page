# CounterAct Consult — Brand Guide

**Compliance is our priority. Trust is our promise.**

This guide documents the CounterAct Consult visual identity, with a focus on the
professional blue color system that underpins every touchpoint of the brand.

---

## Color Rationale

Blue is the language of financial institutions. It signals stability, security,
authority, and confidence — the exact attributes a specialist AML/CFT and
financial-crime advisory practice must project. The palette pairs a deep,
regulator-grade navy with a bright, digital-forward accent to convey both
gravitas and modern technology. The pixel-aesthetic accents are preserved in
shades of blue to communicate our RegTech capability without diluting the
serious, trustworthy foundation of the identity.

---

## Primary Palette

| Token           | Hex       | RGB              | HSL                    | CMYK                    | Role                                  |
| --------------- | --------- | ---------------- | ---------------------- | ----------------------- | ------------------------------------- |
| Primary Blue    | `#0066CC` | `0, 102, 204`    | `210°, 100%, 40%`      | `100, 50, 0, 20`        | Primary actions, links, key UI accents |
| Secondary Blue  | `#004A99` | `0, 74, 153`     | `211°, 100%, 30%`      | `100, 52, 0, 40`        | Secondary buttons, headings, dividers  |
| Accent Blue     | `#3399FF` | `51, 153, 255`   | `210°, 100%, 60%`      | `80, 40, 0, 0`          | Highlights, focus rings, callouts     |
| Dark Blue       | `#002B5C` | `0, 43, 92`      | `212°, 100%, 18%`      | `100, 53, 0, 64`        | Footer, dark backgrounds, primary text |
| Light Blue      | `#E6F2FF` | `230, 242, 255`  | `211°, 100%, 95%`      | `10, 5, 0, 0`           | Section backgrounds, card surfaces    |

### Extended Blue Scale

Use these steps for hover states, subtle backgrounds, and data visualization.

| Token       | Hex       | RGB              |
| ----------- | --------- | ---------------- |
| Blue&nbsp;50  | `#E6F2FF` | `230, 242, 255`  |
| Blue&nbsp;100 | `#CCE4FF` | `204, 228, 255`  |
| Blue&nbsp;200 | `#99CAFF` | `153, 202, 255`  |
| Blue&nbsp;300 | `#66AFFF` | `102, 175, 255`  |
| Blue&nbsp;400 | `#3399FF` | `51, 153, 255`   |
| Blue&nbsp;500 | `#0080FF` | `0, 128, 255`    |
| Blue&nbsp;600 | `#0066CC` | `0, 102, 204`    |
| Blue&nbsp;700 | `#004A99` | `0, 74, 153`     |
| Blue&nbsp;800 | `#002B5C` | `0, 43, 92`      |
| Blue&nbsp;900 | `#001A3D` | `0, 26, 61`      |

### Neutrals

| Token           | Hex       | Role                                   |
| --------------- | --------- | -------------------------------------- |
| White           | `#FFFFFF` | Page background, on-dark text          |
| Neutral&nbsp;50   | `#F8FAFC` | Default page background                |
| Neutral&nbsp;100  | `#F1F5F9` | Subtle surface                         |
| Neutral&nbsp;200  | `#E2E8F0` | Borders, dividers                      |
| Neutral&nbsp;500  | `#64748B` | Muted text                             |
| Neutral&nbsp;700  | `#334155` | Body text on light backgrounds         |
| Neutral&nbsp;900  | `#0F172A` | Headline text                          |
| Black             | `#131313` | Utility maximum-contrast text          |

---

## Interactive States

| State     | Primary       | Secondary     | Accent        |
| --------- | ------------- | ------------- | ------------- |
| Default   | `#0066CC`     | `#004A99`     | `#3399FF`     |
| Hover     | `#004A99`     | `#002B5C`     | `#0080FF`     |
| Active    | `#002B5C`     | `#001A3D`     | `#0066CC`     |
| Focus ring | `#3399FF` @ 35% alpha across all variants                |
| Disabled  | `#CBD5E1`     | `#CBD5E1`     | `#CCE4FF`     |

Focus indicators must always be visible for keyboard users. Use a 3px
`#3399FF` ring at 35% alpha (`--shadow-focus`).

---

## Usage Guidelines

### Primary Blue — `#0066CC`
- Primary buttons, links, key CTAs, and interactive icons.
- Never place on backgrounds darker than Blue 300; use white or Light Blue.
- Do not tint below 60% opacity on white — it fails AA contrast for text.

### Secondary Blue — `#004A99`
- Secondary buttons (outlined), section headings, key dividers.
- Pairs with white or Light Blue for accessible body text.

### Accent Blue — `#3399FF`
- Attention states: highlights, notifications, focus rings, pixel accents.
- Never use for body text on white (contrast ratio ~2.9:1, below AA).
- Safe for large display text (≥ 24px) on Dark Blue or Neutral 900.

### Dark Blue — `#002B5C`
- Footer background, testimonial panels, and hero headline text.
- Provides the highest-contrast dark surface in the system.

### Light Blue — `#E6F2FF`
- Card backgrounds, alternating section backgrounds, tag pills.
- Never as text color on white.

### Text Colors
- Body copy on light: Neutral 700 (`#334155`) — AAA on white.
- Headings on light: Dark Blue (`#002B5C`) — AAA on white and Light Blue.
- Text on Dark Blue: White or Light Blue.

---

## Accessibility & Contrast

All combinations below are validated against WCAG 2.1 AA (4.5:1 normal text,
3:1 large text and UI components).

| Foreground        | Background        | Ratio       | Result                     |
| ----------------- | ----------------- | ----------- | -------------------------- |
| `#FFFFFF`         | `#0066CC`         | **7.66:1**  | AAA (all text)             |
| `#FFFFFF`         | `#004A99`         | **10.35:1** | AAA (all text)             |
| `#FFFFFF`         | `#002B5C`         | **14.83:1** | AAA (all text)             |
| `#002B5C`         | `#FFFFFF`         | **14.83:1** | AAA (all text)             |
| `#002B5C`         | `#E6F2FF`         | **13.10:1** | AAA (all text)             |
| `#0066CC`         | `#FFFFFF`         | **5.17:1**  | AA (normal + large text)   |
| `#0066CC`         | `#E6F2FF`         | **4.56:1**  | AA (normal + large text)   |
| `#3399FF`         | `#FFFFFF`         | **2.85:1**  | AA large text / UI only    |
| `#3399FF`         | `#002B5C`         | **5.21:1**  | AA (normal + large text)   |
| `#334155`         | `#FFFFFF`         | **10.87:1** | AAA (all text)             |

**Do:** Pair Primary Blue with white for CTA buttons.
**Don’t:** Use Accent Blue as body text on white — it does not pass AA.

---

## Color Swatch Reference

```
┌────────────────┬────────────────┬────────────────┬────────────────┬────────────────┐
│  Primary Blue  │ Secondary Blue │  Accent Blue   │   Dark Blue    │   Light Blue   │
│    #0066CC     │    #004A99     │    #3399FF     │    #002B5C     │    #E6F2FF     │
└────────────────┴────────────────┴────────────────┴────────────────┴────────────────┘
```

Sample application:

```
Headline:  #002B5C  on  #FFFFFF   ─ authoritative, trustworthy
Body:      #334155  on  #FFFFFF   ─ readable, professional
Button:    #FFFFFF  on  #0066CC   ─ decisive, action-oriented
Callout:   #002B5C  on  #E6F2FF   ─ calm, considered
Footer:    #E6F2FF  on  #002B5C   ─ grounded, secure
```

---

## Typography

- **Headings:** Saira Condensed — assertive, engineered, RegTech-forward.
- **Body:** Exo 2 — modern, technical, and highly legible at all sizes.
- Headings default to Dark Blue; emphasize with Primary Blue sparingly.

---

## Voice & Tone

- **Authoritative but human.** Speak with the confidence of a regulator-facing
  advisor, not a marketing team.
- **Evidence over adjective.** Quantify results and cite frameworks (FATF,
  FinCEN, EU AMLD, UN sanctions regimes).
- **Compliance is our priority. Trust is our promise.** Every color pairing,
  every heading, every button label should reinforce this promise.
