# ai_travel
## 旅行コンシェルジュ（スマホアプリ）

* 休みが取れそうだけれど、行先調査から宿・レストラン・レンタカー・アクティビティの空き確認、旅程作成、予約までを手間なく行いたい人向けのアプリ。  

### アプリ機能のイメージ

* 生成AIで対話形式にユーザー要件（予算・日程・目的など）をヒアリング
* 要件に基づき行先やプランをレコメンド、空き検索から予約までワンストップで提供
* LLMと旅行サイトAPIを組み合わせ、UXを重視
* 利用者のフィードバックやSNS情報を活用し、Netflixのようにレコメンドアルゴリズムを随時更新
* ユーザーが増えるほど、また個人が使うほど、レコメンドの精度が高まり、類似サービスへの競争優位性を確立  


### ビジネスモデル

* 基本無料のフリーミアムモデル
* 有料オプション機能の提供
* 旅行サイトからのアフィリエイト収益
* プラットフォームが成長すれば広告収益も想定  


### 役割想定

* 私はPM兼データサイエンティストとして全体統括、MVP要件検討、レコメンドアルゴリズム構築を担当
* エンジニアの方にはチャットアプリ開発をお願いしたいと考えております。


---

## Project Resources

* [Developer Guide](docs/developer_guide.md)
* [Code of Conduct](CODE_OF_CONDUCT.md)

## 環境構築

以下の手順で実行環境を準備できます。Python や仮想環境に不慣れな方は
順番にコマンドを実行してみてください。

1. **Python 3.11 のインストール**

   Python が入っていない場合は [Python 公式サイト](https://www.python.org/) から
   インストーラを入手するか、各 OS のパッケージマネージャを利用して
   Python 3.11 をインストールしてください。

2. **Poetry のインストール**

   依存関係の管理には Poetry を使用します。以下のコマンドをターミナルで
   実行するとインストールできます。

   ```bash
   pip install --user poetry
   ```

3. **リポジトリの取得と依存関係のインストール**

   ```bash
   git clone <repository-url>
   cd ai_travel
   poetry install
   ```

4. **仮想環境の有効化（任意）**

   Poetry で作成された仮想環境に入るには次のコマンドを実行します。

   ```bash
   poetry shell
   ```

   仮想環境を使用せずにコマンドを実行したい場合は `poetry run` を
   各コマンドの前に付けてください。

## Running the CLI

A simple command line interface is provided for experimenting with the MVP features.

```
python -m ai_travel.main
```

## Running Tests

Use pytest with the repository root on `PYTHONPATH`:

```
PYTHONPATH=. pytest -q
```
