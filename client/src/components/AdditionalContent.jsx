import Alert from 'react-bootstrap/Alert';

function AdditionalContentExample() {
  return (
    <Alert variant="info" style={{height: '1RM'}}>
      <Alert.Heading>日報の作成ページ</Alert.Heading>
      <p>
        このページでは、日報を作成します。
        必要な項目を全て入力し、「日報を作成する」ボタンを押しましょう。
      </p>
      <hr />
      <p className="mb-0">

      </p>
    </Alert>
  );
}

export default AdditionalContentExample;