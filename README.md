# RW Walker 3D Dynamics

受動歩行器の数値軌道を、GitHub Actions上のLinuxランナーで動画にする実行コードです。CAD原本、計測ログ、計算の元データはこの公開リポジトリの現行ファイルには置きません。

## 動画生成

`.github/workflows/render-video.yml` を手動起動し、`viewer_url` に実行用HTMLの一時的なHTTPS取得先を入力します。Actionsがその入力を実行中だけ取得し、Playwrightで8秒間のフレームを描画してFFmpegでMP4とGIFに変換します。結果はワークフローの `rear-hip-4mm-motion` artifactから取得できます。参照先はGitHubのランナーから到達できる必要があります。実験ログやCAD原本のURLを指定しないでください。

`viewer_url` を使う手動起動は、このワークフローがデフォルトブランチに入った後に利用できます。入力URLの発行・受け渡しの自動化は今後の作業です。URLが推測困難でも、公開ワークフローの入力として渡す際は非公開情報に使わないでください。

## 検証済みの試験

[Actionsの試験実行 #4](https://github.com/temesotejam/rw-walker-3d-dynamics/actions/runs/40286565915) で、脚付け根を後方へ4 mm移した8秒間の既存軌道からMP4とGIFを生成しました。この試験には公開ブランチに含めた表示用の簡略CADメッシュと計算軌道を使っており、過去のコミットには残っています。現在のブランチのファイルからは取り除いています。連続直進歩行が実証された結果ではありません。
