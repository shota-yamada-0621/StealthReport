import Button from 'react-bootstrap/Button';



function SizesExample(props) {
  return (
    <>
      <div className="mb-2">
        <Button variant="success" size="lg">
          AIに日報を書いてもらう
        </Button>{' '}
        <Button variant="primary" size="lg">
          日報を作成する
        </Button>{' '}
      </div>
    </>
  );
}

export default SizesExample;