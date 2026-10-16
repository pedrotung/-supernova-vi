# SUPERNOVA 品牌视觉识别规范 · Brand Guidelines v1.0

> 机器可读版。设计源文件：`SUPERNOVA VI Guidelines.dc.html`（18 页手册）。色值与规则以本文件和 `tokens/design-tokens.json` 为准。

## 1. 品牌关系 Brand Architecture
- **SUPERNOVA INDUSTRY CO., LIMITED**：United Star（联合星辰）在香港设立的离岸子公司。
- 产品结构、业务范围与母公司**完全一致**（颜料与染料），独立承接不同客户。
- 关系类型：**背书品牌**。正式场合使用带 "A UNITED STAR COMPANY" 的标准组合。
- 个性：比母品牌更年轻、更活泼，但同样专业、可靠、讲数据。

| 承袭自 United Star | Supernova 自己的演化 |
|---|---|
| 星形图形、破框结构 | 星与外框像素化 |
| IBM Plex 字体家族 | 等宽字标 IBM Plex Mono |
| CMYK 四色标 | 信号黄中心像素 |
| 产品线色码 | 像素色块 / 像素场辅助图形 |
| 直角、细线网格、无阴影 | — |

## 2. 标志 Logo
### 2.1 构成
- **图标**：10×10 像素线框（直角闭合，右上角留缺口）+ 7×7 像素四角星，星的上、右两角破框而出。
- 网格单元 1u；像素 0.88u，间隙 0.12u。图标 viewBox `0 -2 66 66`。
- **中心像素为信号黄 #FFCD00**，是标志唯一的强调色。
- **字标**：SUPERNOVA（一词连写），IBM Plex Mono 600，字距 -0.03em。
- **副线**：INDUSTRY CO., LIMITED（与字标合为公司全称），IBM Plex Mono 400，字距 0.15em。
- **背书**：细线分隔 + 母品牌四角小星 + "A UNITED STAR COMPANY"，字距 0.16em。
- 所有 logo 文件中的文字**已转曲**，不依赖字体。

### 2.2 组合与文件
| 组合 | 用途 | 文件 |
|---|---|---|
| 标准组合（含背书） | 正式文件、信纸、名片、合同 | `logo/svg/lockup-standard-*.svg` |
| 简化组合（无背书） | 网站顶栏、横幅、窄空间 | `logo/svg/lockup-simplified-*.svg` |
| 图标 | 头像、favicon、印章、封口 | `logo/svg/icon-*.svg` |
后缀：`positive` 浅底正色 · `reversed` 深蓝底反白 · `mono` 单色黑。PNG 位图见 `logo/png/`。

### 2.3 色彩版本
| 版本 | 外框 | 星 | 中心像素 | 文字 |
|---|---|---|---|---|
| 正色（首选，白底） | #0F2A4A | #0F2A4A | #FFCD00 | 字标 #0F2A4A，副线 #53565A |
| 反白（深蓝底） | #FFFFFF | #FFCD00 | #FFFFFF | 白，副线 #B9C6D6 |
| 信号黄底 | #0F2A4A | #0F2A4A | #FFFFFF | #0F2A4A |
| 单色 | #161815 | #161815 | 镂空 | #161815 |

### 2.4 安全空间与最小尺寸
- 安全空间 **X = 图标宽度的 1/4**，四周不得有其他元素。
- 最小宽度：标准组合 40 mm / 200 px；简化组合 25 mm / 120 px；图标 6 mm / 16 px。

### 2.5 印刷三档（防止像素间隙糊版）
| 版本 | 图标尺寸 | 像素 | 文件 |
|---|---|---|---|
| 标准版 | ≥ 18 mm / ≥ 32 px | 0.88u | `icon-standard-*` |
| 印刷版 | 11–18 mm / 24–32 px | 0.80u | `icon-print-*` |
| 实心版 | < 11 mm / < 24 px；烫金、丝印、刺绣、激光 | 1.0u（无间隙） | `icon-solid-*`、`favicon.svg` |
深蓝建议用专色或单色印刷；开印前请向印厂确认最小反白线宽并打样。

### 2.6 禁止
拉伸压扁 · 改色 · 改回圆角线框 · 旋转 · 加阴影/描边/渐变 · 更换字标字体或拆成 "SUPER NOVA" · 在低对比背景上使用。

## 3. 色彩 Colour
| 名称 | HEX | RGB | CMYK（参考） | Pantone（参考） | 角色 |
|---|---|---|---|---|---|
| Nova Navy 深海蓝 | #0F2A4A | 15 42 74 | 100 85 35 40 | 289 C | 主色 |
| Signal Yellow 信号黄 | #FFCD00 | 255 205 0 | 0 15 100 0 | 116 C | 强调色 |
| Cyan 青 | #00A3E0 | 0 163 224 | 80 15 0 0 | 299 C | 辅助 |
| Magenta 品红 | #CE0058 | 206 0 88 | 0 100 40 10 | 214 C | 辅助 |
中性色：White #FFFFFF · Mist #F4F5F6 · Line #D9DEE6 · Grey #6E7379 · Graphite #454A50 · Ink #161815。
其它：Steel #355F8F（深底上的像素）· Highlight #FFF3C4（关键数值底色）。
**用色比例**：白 60 · 深蓝 25 · 黄 10 · 辅助 5。黄色只做点缀，不大面积铺底（活动、展会除外）。
文字对比度不低于 4.5:1。黄底上只用深蓝文字；白底上不用黄色文字。

### 产品线色码（与 United Star 完全一致）
| 产品线 | 色码 |
|---|---|
| ORGANIC 有机颜料 | #00A3E0 |
| INORGANIC 无机颜料 | #CE0058 |
| FLUORESCENT 荧光颜料 | #FFCD00 |
| SOLVENT 溶剂染料 | #173A63 |
（中文名称待与母公司正式名称核对。）色码只标识产品线，不替代品牌主色。

## 4. 字体 Typography（全部 SIL OFL 1.1，可免费商用）
| 字体 | 用途 | 字重 |
|---|---|---|
| IBM Plex Mono | 字标、标签、表头、编号、金额、产品编码 | 400 / 500 / 600 |
| IBM Plex Sans | 英文标题与正文 | 400 / 500 / 600 |
| Noto Sans SC 思源黑体 | 中文标题与正文 | 400 / 500 / 600 |
- 下载：Google Fonts（fonts.google.com）或 IBM 官方 GitHub（github.com/IBM/plex）。
- CSS 字体栈：等宽 `'IBM Plex Mono','Noto Sans SC',monospace`；正文 `'IBM Plex Sans','Noto Sans SC',sans-serif`。
- **禁止**用微软雅黑、Arial、Helvetica、宋体等系统或商业字体替代（商业印刷与标志用途需另购授权）。
- 风格：标签用等宽大写、字距 0.14em；标题 600、字距 -0.02em；正文行距 1.6；数字用等宽、右对齐。

## 5. 辅助图形 Graphic Elements
- **像素色块**：8×2 固定排列，放在页眉右侧平衡标识。
  第 1 行：黄 · 深蓝 · 空 · 黄 · 空 · 青 · 深蓝 · 黄
  第 2 行：空 · 黄 · 深蓝 · 空 · 品红 · 黄 · 空 · 深蓝
  深蓝底上：深蓝格换成 Steel #355F8F，最后一格换成白色。
- **CMYK 四色条**：深蓝 · 青 · 品红 · 黄，四段等宽；用于页脚、名片底边，或作为章节标签的前缀（小号）。
- **背书小星**：母品牌四角星，只放在 "A UNITED STAR COMPANY" 前；浅底用品红，深底用黄。
- **像素场**：色块的大面积延展，用于封面、展板、包装；黄色占比不超过一半。
- 版式：全部直角、无圆角、无阴影；深蓝粗线 1.5px 起头，细线 1px rgba(23,58,99,.12) 分隔。

## 6. 应用 Applications
### 信纸（定稿 7a）
A4，左右边距 20 mm。白底页眉：左为标准组合（图标约 16 mm，标准版），右为像素色块，底部一条深蓝细线。页脚：公司全称 + 地址 + 四色条。**不放电话、邮箱、网址、税号。** Word 模板：`templates/letterhead-template.docx`。
### 名片 90 × 54 mm
正面：深蓝底，反白标准组合（印刷版图标 ≥ 13 mm），右下角像素色块。背面：白底，姓名/职位，角标为实心版图标（约 7 mm），公司全称、地址、电话、邮箱，底边四色条。
### 文件与表格
四色条 + 等宽大写类别标签（如 EXPENSE REPORT、QUOTATION）→ 大标题 → 三栏信息栏（深蓝粗线起头）→ 表格：浅灰 #F4F5F6 表头、深蓝顶线、行间细线、无竖线；金额用等宽字体右对齐，合计行加粗，关键金额底色 #FFF3C4。

## 7. 公司信息
- 法定名称：SUPERNOVA INDUSTRY CO., LIMITED
- 地址：Room A35, Unit 10, 2/F, Man Lee Industrial Building, 13 Kin Hong Street, Kwai Chung, New Territories, Hong Kong
- 电话：+852 3119 8808
- **待提供**：中文名称、邮箱、网址/域名。

## 8. 语气 Tone（建议）
简洁、具体、可验证。用数据和规格说话，少用形容词。英文为主要对外语言；中英并列时英文在前。
