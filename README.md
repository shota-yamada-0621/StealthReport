# Stealth-Report

Stealth-Reportは、Excelで日報を書く際のケアレスミス防止を目的とした日報入力アプリです。 
AIで日報を書くことも可能です。 

# 開発環境

- Windows 10 / 11
- Python(3.11.0)
- SQlite
- Node.js(v18.12.1)

# 環境構築


## serverの環境構築

※各コマンドがエラーになってしまう場合は、下記コマンドを入力してください(windowsPCを使用している方)
- Set-ExecutionPolicy RemoteSigned -Scope Process -force



プロジェクト配下のserverディレクトリに移動してください。
- cd server

1. 仮想環境を作成してください。
- python -m venv myenv

2. 仮想環境の中に入って下さい。
- .\myenv\Scripts\Activate.ps1

3. 必要なパッケージをインストールします。
- pip install -r requirements.txt

4. マイグレーションファイルを作成してください。
- python manage.py makemigrations

5. マイグレーションを行います。
- python manage.py migrate

6. ローカルサーバーを起動してください。
- python manage.py runserver

## clientの環境構築

プロジェクト配下のclientディレクトリに移動してください。

1. npm installをしてください。
2. ローカルサーバーを起動します。 npm start

## DBの環境構築

- A5M2をインストールし起動します。
- A5M2を起動し、データベースの追加と削除から、「追加」を選択します。
- 専用接続デスクトップ向けデータベースのうち、SQliteを選択します。
- データベースをserver/db.sqlite3に設定してください。
- テスト接続を行い、問題が無ければOKを押し、DBを起動してください。

## openaiのAPIkeyに関して

openaiのapikeyを作成する必要があります。こちらのページを参考に作成をお願いします。
https://auto-worker.com/blog/?p=6988

作成後、server/api/.envファイルの下記、該当箇所に自身のAPIkeyをコピー＆ペーストしてください。

 openai account api key
 OPENAI_API_KEY="ここに自身のopenai API keyを貼り付けて下さい"


# アプリケーションの使い方

## サインイン/サインアップ

- アプリケーションが起動したら、サインイン画面が表示されます。初めて使用する場合は、
下に「Sign up」があるので、そこをクリックしてください。

- Sign up画面で「ユーザー名」「パスワード」を設定し、「Create User」を押してユーザーを作成してください。

## トップページ

- ログイン処理が完了するとトップページにリダイレクトします。過去に投稿した日報の「日付」が画面左側に青いアコーディオンで表示されており、
クリックすると、「所感」を読むことが出来ます。

- 日報を作成する場合は、ヘッダーの「日報作成」をクリックしてください。
日報作成画面にリダイレクトするので、全ての項目を入力して、「日報を作成する」を押してください。
この時、AIに所感を書かせる場合は、「AIに所感を書かせますか？」で「はい」を選択してください。

- トップページに投稿した日報が表示され、ヘッダーにある所感履歴でも投稿した日報の情報が分かります。
日報の内容を変更する際は「詳細」ボタンを押し、編集や削除を行ってください。

- 投稿した日報は、server/にあるExcelファイルに書き込まれます。
Excelに書き込む際は、作成する日報の日付を参照し、該当する日付があるシートに書き込まれます。
日付がない場合は自動でシートが作成されます。

# 参考コマンド

## server
- ライブラリインストール
  ```sh
  pip install -r requirements.txt
  ```
- ライブラリエクスポート
  ```sh
  pip freeze > requirements.txt
  ```
- マイグレーションファイルの作成
  ```sh
  python manage.py makemigrations
  ```
- マイグレーションの実行
  ```sh
  python manage.py migrate
  ```

## client

- 開発に必要なパッケージのみをリストに含め、dependencies.jsonファイルにリストを書き出す。
  ```sh
  npm ls --prod --json > dependencies.json
  ```

- dependencies.jsonファイルを使用して、パッケージを一括ダウンロードする。
  ```sh
  npm install --save-exact --no-audit --no-fund --no-package-lock
  ```

# トラブルシューティング

## server

- マイグレーションに失敗した、やり直したい場合
　下記順番でコマンドを実行してください。

- マイグレーションの初期化
  ```sh
  python manage.py migrate nippo zero
  ```
  初期化実施後、`nippo/migrations`フォルダ内の`__init__.py`以外のファイルを削除する。

- マイグレーションファイルの作成
  ```sh
  python manage.py makemigrations
  ```
- マイグレーションの実行
  ```sh
  python manage.py migrate
  ```

# 開発中の機能

- 日報作成完了時のモーダルウィンドウの実装

- ユーザーIDと日報データのリレーション構築