# SUPERNOVA 像素彩蛋方案库

2026-10-16 提出五个方案，Jason 全部认可，先做 **3 号 ΔE 色差挑战**，其余留作其他模块备用。
参考：United Star 官网的 Matrix 彩蛋（pedrotung/united-star-website `site/matrix-egg.js`）。

## 通用约束
- 品牌 VI 以 pedrotung/-supernova-vi 的 `brand-kit/BRAND_GUIDELINES.md` 为准：Nova Navy #0F2A4A 主色，黄色只做点缀，直角，无阴影，IBM Plex + Noto Sans SC。
- Logo 比例不可变形：任何像素化、动画 Logo 都按官方 `icon-standard-*.svg` 的网格（viewBox `0 -2 66 66`，6 单位一格，像素 5.28）还原，方格。
- 文案除地址外不出现地名。
- 必须兼顾手机端（触屏没有键盘）和"减少动态效果"设置。

## 统一触发方式（已在 3 号实现）
- 电脑：页面任意位置输入 `nova`
- 手机：2 秒内连点 8×2 像素色块（`#boom` 或 `.pxblocks`）5 次
- 网址末尾加 `#nova`
- Esc 或关闭按钮退出
- 若以后多个彩蛋同时上线，可改为不同口令（如 `boom`、`snake`、`invade`），或由开机画面（5 号）做入口菜单。

## 1. 超新星爆发 Supernova Burst
纯观赏，最贴公司名，体验最像 Matrix。
- Logo 星形像素先向中心黄色像素坍缩，黄色闪光后炸成满屏深蓝 / 青 / 品红 / 黄像素场（黄色不超过一半）。
- 像素碰到鼠标或手指会被推开，可以"搅动"星云。
- 结尾像素回飞，严格按官方 SVG 网格拼回图标，比例不变。
- 最后打出 SUPERNOVA 字标和 "Bright color. Proven data."
- 工作量最小，手机流畅。可用于：品牌页、404 页、加载动画。

## 2. Pigment Invaders 像素入侵者
致敬太空侵略者的小游戏。
- 四角星做炮台，敌人是四种产品线颜色的像素怪。
- 电脑方向键 + 空格，手机左右滑动、点击发射。
- 每关一条产品线：有机青 #00A3E0、无机品红 #CE0058、荧光黄 #FFCD00、溶剂深蓝 #173A63；打中掉出产品名和色号。
- 通关显示 MISSION PASSED 和"索取样品"按钮。
- 趣味最强，工作量最大。可用于：产品总览页、展会互动屏。

## 3. ΔE 色差挑战（已实现）
和 QC 实验室主题呼应，最有"讲数据"的品牌味。
- 代码：[`delta-e-egg.js`](delta-e-egg.js)（独立脚本，自带样式，无依赖；`window.SupernovaEgg.open()` 可由其他模块直接调用）。
- 预览：https://claude.ai/artifact/Vo897AGH4jbxkn1GdBKXsF （C 版首页 + 彩蛋）；本地预览 [`delta-e-egg-preview.html`](delta-e-egg-preview.html)（C 版首页副本 + 彩蛋）
- 玩法：用青 / 品红 / 黄三支滑块调色去匹配目标色块，点 Measure 后扫描条扫过两块样品，按 CIEDE2000 算出 ΔE 并盖 PASS / FAIL 章。
- 判定：ΔE ≤ 1.0 实验室级 PASS；≤ 2.0 商业级 PASS；≤ 3.5 接近但 FAIL；更高 FAIL。
- 目标色由同一套混色模型随机生成，保证一定调得出来；牌号（PR-122、PB-15:3、PY-83 等）是占位，需换成真实产品牌号。
- 可用于：QC 子页面的互动模块。

## 4. Pigment Snake 颜料贪吃蛇
- 蛇每吃一颗颜料像素，身体多一节那种颜色，越长越像一条色卡。
- 电脑方向键，手机滑动。
- 结束时把蛇身排成一条色卡并显示分数。
- 规则人人都懂，中等工作量。可用于：色卡 / 应用领域页。

## 5. NOVA OS 8-bit 开机画面
- 满屏复古 CRT 扫描线，像老电脑开机逐行打出自检信息（颜料库存、质检仪器、证书），如 `CHECKING SHADE ACCURACY... OK`。
- 最后像素 Logo 出现并闪 PRESS START。
- 气质最接近 Matrix 的终端感；按任意键或点击可进入 1 号或 3 号，适合做多个彩蛋的总入口。
