import 'bootstrap/dist/css/bootstrap.min.css';
import './static/App.css';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import AccordionPage from './Accordion';


function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <a className="navbar-brand text-blue" href="/">StealthReport</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active text-blue" aria-current="page" to={'/'}>トップページ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-blue" to={'/form'}>日報作成</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-blue" to={'/Impression'}>所感履歴</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h3>直近の日報</h3>
            <br></br>
            <AccordionPage />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h3>日報作成状況</h3>
            <br></br>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
