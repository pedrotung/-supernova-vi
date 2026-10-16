# SUPERNOVA Brand Kit v1.0

供设计师、开发者和 AI 智能体接手后续工作使用的品牌包。

## 目录
```
brand-kit/
├─ README.md                       本说明
├─ BRAND_GUIDELINES.md             完整 VI 规范（机器可读）
├─ CLAUDE_PROJECT_INSTRUCTIONS.md  新开 Claude Project 时粘贴的指令
├─ tokens/
│  ├─ design-tokens.json           色彩 / 字体 / 标志 / 版式数据
│  └─ brand.css                    CSS 变量 + 字体加载
├─ logo/
│  ├─ svg/  icon-{standard|print|solid}-{positive|reversed|mono}.svg
│  │        lockup-{standard|simplified}-{positive|reversed|mono}.svg
│  │        favicon.svg
│  └─ png/  标志位图、社交头像（avatar-navy / avatar-yellow）
└─ templates/
   └─ letterhead-template.docx     A4 信纸 Word 模板
```

## 如何使用
- **让其他 AI 接手**：把整个文件夹上传到对话或项目知识库，并告诉它"先读 BRAND_GUIDELINES.md"。
- **在 Claude 新开项目（如设计官网）**：新建 Project → 上传本文件夹全部文件到 Project knowledge → 把 `CLAUDE_PROJECT_INSTRUCTIONS.md` 的内容粘贴到 Project instructions。
- **开发者**：直接引入 `tokens/brand.css`，或读取 `design-tokens.json`。

## 授权
- 字体：IBM Plex Mono / IBM Plex Sans / Noto Sans SC，均为 SIL Open Font License 1.1，可免费商用。
- 标志文件中的文字已转为矢量轮廓，不依赖字体。
- 图形元素（像素星、四角星、色块）均为原创矢量图形，不含第三方图标或符号字体。

## 待补充
中文名称 · 邮箱 · 网址 · 产品线中文名核对 · 印刷色打样确认 · SUPERNOVA 商标检索（第 2 类）
