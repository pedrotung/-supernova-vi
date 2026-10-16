# SUPERNOVA 首页草图

| 文件 | 方向 | 在线预览 |
|---|---|---|
| `supernova-home-c-pixel-bento.html` | **C 像素积木（已选定）** | https://claude.ai/artifact/WZd8aX3RqNARfEACeNhYiF |
| `supernova-home-a-pixel-field.html` | A 像素场 | https://claude.ai/artifact/KZAoe57hNSoBh7YfZozS8j |
| `supernova-home-b-nova-burst.html` | B 超新星爆发 | https://claude.ai/artifact/8fAqE8UNKBPdAd3AHtxwTF |

- 直接用浏览器打开 HTML 即可预览（字体从 Google Fonts 加载）。
- `components/qc-lab-scanner.html`：像素样品 + 扫描横杠 + 型号轮换 + 检测条，留给 QC 子页面用。型号是示例。
- `src/`：源文件。`build.py` 把 `base.css`、`header.html`、`footer.html` 和 `brand-kit/logo/svg` 里的官方 LOGO 拼进 `a/b/c.html`（运行前需把去掉 metadata 的 LOGO SVG 放进 `logo/` 目录）。

待补：邮箱、网址、中文名；SUPERNOVA 实际持有的认证清单（目前沿用 United Star 的 SGS / ASTM / EN71）；英文文案为草稿。
