import SignInSide from "./Components/SignIn/SignIn";
import withoutAuth from "../../HOC/withoutAuth";
function App() {
  return (
    <div className="App">
      <SignInSide></SignInSide>
    </div>
  );
}

export default withoutAuth(App);
