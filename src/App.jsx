import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Account from "components/Account";
import { Layout} from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Main from "components/Main"
const { Header} = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <div style={styles.headerRight}>
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/main">
                <Main/>
            </Route>
            <Route path="/nonauthenticated">
              <h3>Please login using the "Authenticate" button</h3>
            </Route>
          </Switch>
          {isAuthenticated ? <Redirect to="/main" /> : <Redirect to="/nonauthenticated" />}
        </div>
      </Router>
    </Layout>
  );
};

export const Logo = () => <h4>Decentradit</h4>

export default App;
