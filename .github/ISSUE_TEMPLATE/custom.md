---
name: custom
about: QAレポート作成
description: QAレポート作成
title: "[QA]: "
labels: ["QA"]
assignees:
body:
  - type: input
    id: Version
    attributes:
      label: 発生バージョン
      default: 不明
  - type: dropdown
    id: os
    attributes:
      label: 不具合発生機種
      multiple: true
      options:
        - macintosh (PC)
        - windows (PC)
        - linux (PC)
        - iPhone (スマートフォン)
        - iPad (スマートフォン)
        - Android (スマートフォン)
    validations:
      required: true
  - type: input
    id: os-version
    attributes:
      label: os version
      description: OSのバージョンを記載してください（windows、スマホは必須）
    validations:
      required: false
  - type: dropdown
    id: browsers
    attributes:
      label: どのブラウザで問題が発生したか
      multiple: true
      options:
        - Chrome
        - Microsoft Edge
        - Safari
        - mobile Safari
        - Firefox
        - other
    validations:
      required: true
  - type: textarea
    id: what-happened
    attributes:
      label: 再現手順
      value: "1. 
2. 
3. 
4. 
5. 
"
    validations:
      required: true
  - type: textarea
    attributes:
      label: 補足・キャプチャ
      description: 何か気づいたことがあれば
      value: 
  - type: textarea
    id: logs
    attributes:
      label: 関連ログ出力
      description: 関連するログ出力をコピー＆ペーストしてください。これは自動的にコードにフォーマットされます。
      render: shell
---


