# 🌐 BaseJuggler - 基数変換計算機

## 🔗 公開URL

[https://yuka0055yuka-max.github.io/BaseJuggler/](https://yuka0055yuka-max.github.io/BaseJuggler/)


**BaseJuggler** は、10進数・2進数・8進数・16進数の相互変換をリアルタイムで行うWebアプリです。PWA対応で、スマホのホーム画面に追加してオフラインでも使用可能です。

入力された数値は、まず内部的に10進数に変換されてから、他の基数（2進数・8進数・16進数）へ変換されます。
そのため、変換精度は10進数を基準としています。

---

## 🧮 機能概要

- 任意の基数に数値を入力すると、他のすべての基数に即座に変換
- 入力欄は 10進数 / 2進数 / 8進数 / 16進数 に対応
- 「全クリア」ボタンで入力欄を一括リセット
- PWA対応：ホーム画面に追加してアプリのように使用可能
- オフライン対応：Service Workerによるキャッシュ機能

---

## 📱 使い方

1. 任意の欄に数値を入力（例：10進数で「26」）
2. 他の欄に自動で変換結果が表示されます
3. 「全クリア」ボタンで入力をリセット
4. スマホでアクセス → 共有 → ホーム画面に追加でPWA化

---

## ⚠️ 注意事項

- 入力は半角数字のみ対応
- 16進数は英字大文字推奨（例：1A）
- 使用は**自己責任**でお願いします
- 計算結果に誤りがある可能性もあります（特に特殊な入力時）

---

## 🧑‍🎨 クレジット

制作：**YUME**  
GitHub: [@yuka0055yuka-max](https://github.com/yuka0055yuka-max)

---

## 📄 ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。  
詳細は `LICENSE` ファイルをご確認ください。

---

---

# 🌐 BaseJuggler - Base Conversion Calculator

## 🔗 Live Demo

[https://yuka0055yuka-max.github.io/BaseJuggler/](https://yuka0055yuka-max.github.io/BaseJuggler/)


**BaseJuggler** is a real-time base conversion web app that supports decimal, binary, octal, and hexadecimal formats. It’s PWA-ready, allowing offline use and installation to your mobile home screen.

All input values are internally converted to decimal first, then re-converted to other bases (binary, octal, hexadecimal).
This ensures consistent conversion accuracy based on decimal as the core format.

---

## 🧮 Features

- Enter a number in any base and instantly see conversions in all others
- Supports Decimal / Binary / Octal / Hexadecimal input fields
- “Clear All” button resets all fields
- PWA support: Add to home screen and use like a native app
- Offline support via Service Worker caching

---

## 📱 How to Use

1. Enter a number in any field (e.g., Decimal: “26”)
2. Other fields will auto-update with converted values
3. Tap “Clear All” to reset inputs
4. On mobile: Open in browser → Share → Add to Home Screen

---

## ⚠️ Disclaimer

- Only half-width numeric input is supported
- Hexadecimal input should use uppercase letters (e.g., 1A)
- Use at your **own risk**
- Conversion results may contain errors, especially with unusual input

---

## 🧑‍🎨 Credits

Created by **YUME**  
GitHub: [@yuka0055yuka-max](https://github.com/yuka0055yuka-max)

---

## 📄 License

This project is released under the MIT License.  
See the `LICENSE` file for details.
