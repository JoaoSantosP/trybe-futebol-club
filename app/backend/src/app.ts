import * as express from 'express';
import loginR from './routes/loginRoute';
import loginValidate from './routes/loginValidateRoute';
import clubsR from './routes/clubsRoute';
import matchsR from './routes/matchsRoute';
import leaderBoarderR from './routes/leaderBoardRoute';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/', loginR);
    this.app.use('/', loginValidate);
    this.app.use('/', clubsR);
    this.app.use('/', matchsR);
    this.app.use('/', leaderBoarderR);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => { console.log(`ouvindo na porta ${PORT}`); });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
