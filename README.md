## DynamoDB-IO

DynamoDBに作成されているテーブルをエクスポート及びインポートします。

### 準備

- `aws-config.json` ファイルを作成してください。
- `aws-config.json.template` の内容をコピーし、REPLACEとなっている値を書き換えてください。

### エクスポート

```
$ node export.js {tableName}
```

```
$ node export.js SampleTableName
Successfully exported. -> SampleTableName.dynamodb
```

### インポート

```
$ node import.js {tableName}
```

```
$ node import.js SampleTableName
Successfully imported.
```
