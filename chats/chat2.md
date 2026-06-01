# Enterprise SaaS Rebrand

_Started 2026-05-05 11:19 UTC_

---

## User

Visual direction: Think enterprise SaaS meets premium product company — structured and authoritative, but not cold or intimidating. The kind of site that reads as serious and credible at a glance, but draws people in with warmth and clarity.
Specific changes to make:

Colour palette: Shift to a deep navy or near-black as the primary tone, with a crisp white canvas for content sections. Add one sharp accent colour as we currently have— used sparingly for CTAs, highlights, and hover states.
Typography: Replace any rounded or casual fonts with a strong geometric sans-serif for headings (something like DM Sans, Syne, or Barlow) paired with a clean, readable body font. Increase heading weight and tracking for authority.
Layout: Introduce more structured grid systems — tighter alignment, deliberate use of ruled lines or subtle borders to section content. Add a stat/metrics bar or trust signal strip (logos, numbers, accreditations).
Backgrounds: Replace flat colour backgrounds with subtle depth — very fine grid or dot patterns, a low-opacity circuit or topographic overlay, or a soft gradient mesh in dark sections.
Components: Make buttons sharper (reduce border radius). Add micro-animations on hover for cards and CTAs. Use glassmorphism or frosted panels sparingly for featured sections.
Imagery/icons: Swap any illustrative or organic imagery for clean line icons, abstract geometric shapes, or dark-mode UI screenshots if relevant.

Keep: The current warmth in copy tone, the approachable spacing, and any imagery of real people. The goal is polished and professional, not sterile.

## Assistant

I'll take a look at the current site and then redesign it with the direction you've outlined.

_[tool: list_files]_

_[tool: read_file]_

I acknowledge. Let me read the rest of the file and then redesign it.

_[tool: read_file]_

I have a clear picture now. Let me save the original as v1 and create the redesigned version with the new direction: deep navy/near-black, geometric sans (DM Sans), structured grid with rules, subtle dot/grid backgrounds, sharper buttons, and trust signals.

_[tool: copy_files]_

_[tool: snip]_

Now I'll rewrite index.html with the enterprise-SaaS-meets-premium-product direction. Plan:

- **Palette**: `#0A0E1A` deep navy/black, `#FFFFFF` canvas, `#FF5B2E` sharp coral-orange accent (kept warm to honor the "keep warmth" note), with neutral grays.
- **Type**: DM Sans for headings (geometric, weight-flexible), Inter for body.
- **Backgrounds**: subtle dot grids on light, fine line grids + soft radial mesh on dark sections.
- **Layout**: hairline-rule dividers, ticked column markers, more deliberate grid structure.
- **Components**: sharper buttons (6px radius), micro-hover animations, frosted panel for featured case study, stats bar.
- **Imagery**: clean line iconography (inline SVG strokes), geometric placeholders.

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Redesigned with the new direction. Highlights:

- **Palette**: deep navy `#0A0E1A` primary, white canvas, `#FF5B2E` coral accent (kept warm to honor your "keep warmth" note) used sparingly on CTAs, hover, key numbers.
- **Type**: DM Sans for headings (geometric, weight 700), Inter body, JetBrains Mono for eyebrows/labels — gives the technical-credibility feel.
- **Layout**: hairline-rule dividers, side-tick column markers, numbered eyebrows (`// 01 — STRATEGY`), and a 4-column metrics bar replacing the old card grid.
- **Backgrounds**: subtle dot grids on light sections, fine line grids + soft accent radial mesh on dark sections, frosted glass panel on the hero side stat block and contact form.
- **Components**: 4px-radius buttons, micro-hover (icon flips, arrows shift, accent rule fills), line iconography throughout (no more emoji).
- **Trust**: dark logo strip with monospace label + the metrics bar acts as a stat/accreditation strip directly under the hero.

The original is preserved as `index-v1-warm.html` if you want to compare.

## User

Verifier agent check completed

## Assistant

Let me fix the hero title sizing.

_[tool: str_replace_edit]_

_[tool: done]_

Reduced the hero title clamp to `clamp(44px, 5.4vw, 80px)` so all four lines fit cleanly within the left column without wrapping into the sub copy.

## User

Save this design as a PDF: index.html

## Assistant

I'll create a print-ready version of the redesigned site.

_[tool: read_file]_

_[tool: snip]_

_[tool: copy_files]_

Now I'll add print-specific styles + auto-print script. The page is a long scrolling site, so I'll let it flow naturally onto portrait pages and just suppress fixed nav, animations, and scroll-only behaviour.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: snip]_

Now I'll add the auto-print script and open the file.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: open_for_print]_

Print tab opened. If it didn't, use this link: [Open print view](https://019dddf1-0123-72b8-bad5-7f500372b32b.claudeusercontent.com/v1/design/projects/019dddf1-0123-72b8-bad5-7f500372b32b/serve/index-print.html?t=fd24ec8581c8516e089bbc6d3db8c896a9221fb5aa700b2804963de3ba0df824.c8962c28-8fa4-498d-bd46-0d0622505321.d5ae9967-7e6f-47bb-8c32-0a93d6bebff5.1777986559) — then save as PDF from the print dialog.

## User

section 01 What we do is not aligned with the other sections., ensure the titles, copy and content align left and right with the rest of the pages sections.

## Assistant

_[tool: snip]_

_[tool: grep]_

The issue is that the services section has its own `.services-grid` and `.services-cta` with `max-width: 1240px; padding: 0 48px;` while the section-head sits inside `.section.services` with `padding: 0 32px;` directly on it (different padding). Other sections use a consistent inner wrapper. Let me check the section-head padding and section structure.

_[tool: grep]_

_[tool: snip]_

The issue: the services section's `.section-head` is a direct child of `<section class="section services">` with no wrapper, so it inherits `.section-head`'s default `padding: 0 32px;`. But other sections wrap `.section-head` inside an `*-inner` div that has `padding: 0 48px;` — so its content aligns with the grid below. Services needs the same wrapper.

Let me wrap the services section content in `.services-inner` and remove duplicated padding.

_[tool: str_replace_edit]_

Now I also need to apply the same alignment fix to `.section-head` globally so other sections don't inherit residual 32px padding (they have `*-inner` wrappers but `.section-head` itself has `padding: 0 32px`). Let me check by looking at section-head default.

_[tool: snip]_

_[tool: str_replace_edit]_

I also need to apply the same fix to the print version, and the `services-cta` should not have its own padding now that it's inside the wrapper.

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

Section 01 "What we do" now aligns with the rest of the page — wrapped in `.services-inner` with the same `max-width: 1240px; padding: 0 48px;` as the other sections.

## User

next i'd like to build out the select work pages, so clicking on the Pocket Inspector page should open a new case study page, where we can discuss the client, the project and the results, with spaces for imagery, a client quote and all a technical case study page should include.

## Assistant

I'll ask a few quick questions to understand the structure before I build.

_[tool: snip]_

_[tool: questions_v2]_

## User

Questions answered:
- scope: Just Pocket Inspector for now, but we will use this as a template for all of the case study pages.
- sections: Hero with client, sector, year, services, The client / brand intro, The challenge, Our approach, What we built (feature breakdown), Imagery gallery, What's next / roadmap, Final results & metrics, At-a-glance results bar, Tech stack / architecture, Process timeline, Pull quote from client, CTA to start a project
- imagery: Mix of both
- tone: Mid-length, scannable (the default)
- nav: Both
- tweaks: None — keep it simple

## Assistant

_[tool: snip]_

_[tool: update_todos]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: update_todos]_

Now let me find the featured Pocket Inspector card on the homepage and wire the links.

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

I need to find the rendered card structure to know where to add the link.

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

I'll add a `slug` field to each case study so only Pocket Inspector links out, and update the homepage card to wire up "Discuss this project" + the title.

_[tool: snip]_

_[tool: str_replace_edit]_

I need to add some hover styles for the new linked title and visual, then verify.

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: update_todos]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

_[tool: snip]_

Pocket Inspector case study is live at `case-studies/pocket-inspector.html`. The homepage card now links from both the title and the CTA (which becomes "Read the case study →") — only on Pocket Inspector for now, since ProvaRISK and Annabel Karmel still point to `#contact`. When you're ready, I can duplicate the template for those two and swap in their content.

The page covers: hero with client/sector/year/services meta + device frame, at-a-glance stat bar, client intro, challenge & approach (split light/dark), six-feature build grid, tech stack + system architecture diagram, 5-row process timeline, mixed gallery (device frame + placeholders), pull quote with attribution, six-card results grid, three-stage roadmap, and CTA.

## User

remove sections below:
- The client
- Tech & architecture
- Final results
- What's next

## Assistant

